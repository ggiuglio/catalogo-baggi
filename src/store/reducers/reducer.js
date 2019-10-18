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
    DELETE_PRODUCT_SUCCESS
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
            
            // adding fake data for test
            // addFakeProducts(products, 100000);

            return {
                ...state,
                ...{
                    products: products,
                    filterdProducts: JSON.parse(JSON.stringify(products)),
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
        case SET_FILTERD_PRODUCTS: {
            const fp = state.products.filter( p => 
                (!state.productFilters.A || p.A.toLowerCase().includes(state.productFilters.A.toLowerCase())) &&
                (!state.productFilters.B || p.B.toLowerCase().includes(state.productFilters.B.toLowerCase())) &&
                (!state.productFilters.C || p.C.toLowerCase().includes(state.productFilters.C.toLowerCase())) &&
                (!state.productFilters.D || p.D.toLowerCase().includes(state.productFilters.D.toLowerCase())) &&
                (!state.productFilters.E || p.E.toLowerCase().includes(state.productFilters.E.toLowerCase())) &&
                (!state.productFilters.F || p.F.toLowerCase().includes(state.productFilters.F.toLowerCase())) &&
                (!state.productFilters.G || p.G.toLowerCase().includes(state.productFilters.G.toLowerCase())) &&
                (!state.productFilters.descrizione || p.descrizione.toLowerCase().includes(state.productFilters.descrizione.toLowerCase())) &&
                (!state.productFilters.produttore || p.produttore.toLowerCase().includes(state.productFilters.produttore.toLowerCase())) &&
                (!state.productFilters.codiceProduttore || p.codiceProduttore.toLowerCase().includes(state.productFilters.codiceProduttore.toLowerCase())) &&
                (!state.productFilters.codiceFornitore || p.codiceFornitore.toLowerCase().includes(state.productFilters.codiceFornitore.toLowerCase())) &&
                (!state.productFilters.fornitore || p.fornitore.toLowerCase().includes(state.productFilters.fornitore.toLowerCase()))
            );

            return {
                ...state, 
                ...{
                    filterdProducts: fp, 
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
        default: 
            return state
    }
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

export default Reducer