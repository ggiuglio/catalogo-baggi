import { 
    SET_USER,
    SET_PRODUCTS,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR,
    SET_FILTER,
    SET_FILTERD_PRODUCTS,
    SET_LOADING,
    SET_IMPORT_RESULTS
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
                Object.keys(action.products).forEach( p => {
                    products.push(action.products[p])
                });
            }
            
            // adding fake data for test
            // addFakeProducts(products, 1000);

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

        case SET_FILTERD_PRODUCTS: {
            const fp = state.products.filter( p => 
                (!state.productFilters.A || p.A.includes(state.productFilters.A)) &&
                (!state.productFilters.B || p.B.includes(state.productFilters.B)) &&
                (!state.productFilters.C || p.C.includes(state.productFilters.C)) &&
                (!state.productFilters.D || p.D.includes(state.productFilters.D)) &&
                (!state.productFilters.E || p.E.includes(state.productFilters.E)) &&
                (!state.productFilters.F || p.F.includes(state.productFilters.F)) &&
                (!state.productFilters.G || p.G.includes(state.productFilters.G)) &&
                (!state.productFilters.descrizione || p.descrizione.includes(state.productFilters.descrizione)) &&
                (!state.productFilters.produttore  || p.produttore.includes(state.productFilters.produttore)) &&
                (!state.productFilters.codiceProduttore || p.codiceProduttore.includes(state.productFilters.codiceProduttore)) &&
                (!state.productFilters.codiceFornitore  || p.codiceFornitore.includes(state.productFilters.codiceFornitore)) &&
                (!state.productFilters.fornitore || p.fornitore.includes(state.productFilters.fornitore))
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