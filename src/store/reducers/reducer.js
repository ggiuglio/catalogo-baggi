import { 
    SET_USER,
    SET_PRODUCTS,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR,
    SET_FILTER,
    SET_FILTERD_PRODUCTS,
    SET_LOADING,
    SET_IMPORT_RESULTS,
    DELETE_PRODUCT,
    DELETE_PRODUCT_CANCEL,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_CANCEL,
    CALCULATE_LATEST_PRODUCT_VERSION,
    CALCULATE_LATEST_OI_PRODUCT_VERSION,
    CANCEL_LATEST_PRODUCT_VERSION
} from '../actions/actionsTypes'

export const INITIAL_STATE = {
   products: [],
   productFilters: {},
   filterdProducts: [],
   loginError: "",
   user: null,
   loading: false,
   importResults: null,
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            const products = [];
            if (action.products) {
                Object.keys(action.products).forEach( k => {
                    action.products[k].firebaseId = k;
                    products.push(action.products[k])
                });
            }
            const filteredProducts = filterProducts(products, state.productFilters);

            // adding fake data for test
            // addFakeProducts(products, 100000);
            
            // checking duplicated or null ids
            //findDuplicatedIds(products);

            return {
                ...state,
                ...{
                    products: products,
                    filterdProducts: filteredProducts,
                    loading: false
                }
            }
        case SET_USER: 
            return {
                ...state,
                user: action.user
            }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: action.error
            }
        }
        case RESET_LOGIN_ERROR: {
            return {
                ...state,
                loginError: ''
            }
        }
        case SET_FILTER: {
            return {
                ...state,
                productFilters: {...state.productFilters, [action.filter]: action.value},
            }
        }
        case DELETE_PRODUCT: {
            return {
                ...state,
                productToDelete: action.product
            }
        }
        case DELETE_PRODUCT_CANCEL: {
            return {
                ...state,
                productToDelete: null
            }
        }
        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                productToDelete: null
            }
        }
        case EDIT_PRODUCT: {
            return {
                ...state,
                productToEdit: action.product
            }
        }
        case EDIT_PRODUCT_CANCEL: {
            return {
                ...state,
                productToEdit: null
            }
        }
        case EDIT_PRODUCT_SUCCESS: {
            return {
                ...state,
                productToEdit: null
            }
        }
        case SET_FILTERD_PRODUCTS: {
            const filteredProduct = filterProducts(state.products, state.productFilters);

            return {
                ...state, 
                ...{
                    filterdProducts: filteredProduct, 
                    loading: false
                }
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.value
            }
        }
        case SET_IMPORT_RESULTS: {
            return {
                ...state,
                ...{ importResults: action.importResults }
            }
        }
        case CALCULATE_LATEST_PRODUCT_VERSION: {
            let latestVersion = null;
            let versions = state.products.filter(p => 
                ( p.A.toLowerCase() === action.productDetails.A.toLowerCase()) &&
                ( p.C.toLowerCase() === action.productDetails.C.toLowerCase()) &&
                ( p.D.toLowerCase() === action.productDetails.D.toLowerCase()) &&
                ( p.E.toLowerCase() === action.productDetails.E.toLowerCase()) &&
                ( p.F.toLowerCase() === action.productDetails.F.toLowerCase()));

            versions = versions.sort((a, b) => a.G > b.G ? -1 : 1 );
            if(versions.length > 0) {
                latestVersion = '000' + (parseInt(versions[0].G) + 1);
                latestVersion = latestVersion.substr(latestVersion.length - 3)
            } else {
                latestVersion = '001';
            }

            return {
                ...state,
                latestVersion: latestVersion
            }
        }
        case CALCULATE_LATEST_OI_PRODUCT_VERSION: {
            let latestVersion = null;
            let latestTipo = null; 
            let versions = state.products.filter(p => 
                ( p.A.toLowerCase() === action.productDetails.A.toLowerCase()) &&
                ( p.C.toLowerCase() === action.productDetails.C.toLowerCase()) &&
                ( p.D.toLowerCase() === action.productDetails.D.toLowerCase()) &&
                ( p.E.toLowerCase() === action.productDetails.E.toLowerCase()));

            versions = versions.sort((a, b) => {
                const verA = a.F + a.G;
                const verB = b.F + b.G;

                return verA > verB ? -1 : 1 
            });
            if(versions.length > 0) {
                latestVersion = '000' + (parseInt(versions[0].G) + 1);
                latestVersion = latestVersion.substr(latestVersion.length - 3)
                latestTipo = versions[0].F;
            } else {
                latestVersion = '001';
                latestTipo = '0';
            }

            return {
                ...state,
                latestVersion: latestVersion,
                latestTipo: latestTipo
            }
        }
        case CANCEL_LATEST_PRODUCT_VERSION: {
            return {
                ...state,
                latestVersion: null,
                latestTipo: null
            }
        }
        default: 
            return state
    }
}

const fornitoreDetailsMatcher = (fornitoriList, field, value) => {
    let match = false;
    fornitoriList.forEach(f => {
        if (field === 'fornitore' && f.fornitore.toLowerCase().includes(value.toLowerCase())) {
            match = true;
        }
        if (field === 'codiceFornitore' && f.codiceFornitore.toLowerCase().includes(value.toLowerCase())) {
            match = true;
        }
    });

    return match;
}

const filterProducts = (products, productFilters) => {
    let fp = products.filter( p => 
        (!productFilters.A || p.A.toLowerCase().includes(productFilters.A.toLowerCase())) &&
        (!productFilters.B || p.B.toLowerCase().includes(productFilters.B.toLowerCase())) &&
        (!productFilters.C || p.C.toLowerCase().includes(productFilters.C.toLowerCase())) &&
        (!productFilters.D || p.D.toLowerCase().includes(productFilters.D.toLowerCase())) &&
        (!productFilters.E || p.E.toLowerCase().includes(productFilters.E.toLowerCase())) &&
        (!productFilters.F || p.F.toLowerCase().includes(productFilters.F.toLowerCase())) &&
        (!productFilters.G || p.G.toLowerCase().includes(productFilters.G.toLowerCase())) &&
        (!productFilters.descrizione || p.descrizione.toLowerCase().includes(productFilters.descrizione.toLowerCase())) &&
        (!productFilters.produttore || p.produttore.toLowerCase().includes(productFilters.produttore.toLowerCase())) &&
        (!productFilters.codiceProduttore || p.codiceProduttore.toLowerCase().includes(productFilters.codiceProduttore.toLowerCase())) &&
        (!productFilters.codiceFornitore || fornitoreDetailsMatcher(p.fornitori, 'codiceFornitore', productFilters.codiceFornitore)) &&
        (!productFilters.fornitore || fornitoreDetailsMatcher(p.fornitori, 'fornitore', productFilters.fornitore))
    );
    
    if (productFilters.onlyDuplicated) {
        const duplicatedMatrix = {};
    
        fp.forEach(p => {
            if(p.codiceProduttore) {
                duplicatedMatrix[p.codiceProduttore.trim()] = duplicatedMatrix[p.codiceProduttore] ? [...duplicatedMatrix[p.codiceProduttore], p] : [p];  
            }
        });
        fp = [];
        Object.keys(duplicatedMatrix).map(k => {
            if(duplicatedMatrix[k].length >= 2) {
                fp = [...fp, ...duplicatedMatrix[k]];
            }
        });
    }
    return fp;
} 

// temp stuff for testing

const addFakeProducts = (products, quantity) => {
    for (let i = 4; i < quantity; i++) {
        const p = {
            id: i,
            A: 'S',
            B: Math.floor(Math.random() * (9 - 0)).toString(),
            C: Math.floor(Math.random() * (99 - 0)).toString(),
            D: makeString(2),
            E: makeString(3),
            F: Math.floor(Math.random() * (9 - 0)).toString(),
            G: Math.floor(Math.random() * (999 - 0)).toString(),
            descrizione: makeString(30),
            produttore: makeString(10),
            codiceProduttore: makeString(6),
            codiceFornitore: makeString(4),
            fornitore: makeString(12)
        }
        p.id = p.A + p.B + p.C + p.D + p.E + p.F + p.G;
        products.push(p);
    }
};

const makeString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const findDuplicatedIds = (products) => {
    const duplicatedMatrix = {};
    products.forEach( p => {
        if (!p.id) {
            console.log('null id');
        }
        if (duplicatedMatrix[p.id]) {
            duplicatedMatrix[p.id]++;
        }
        else {
            duplicatedMatrix[p.id] = 1;
        }
    });

    Object.keys(duplicatedMatrix).map(k => {
        if(duplicatedMatrix[k] >= 2) {
            console.log('duplicated id: ', k)
        }
    });

 }

export default Reducer