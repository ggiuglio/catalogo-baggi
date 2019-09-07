import { 
    SET_USER,
    SET_PRODUCTS,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR,
    SET_FILTER
} from '../actions/actionsTypes'
import store from '../store';

export const INITIAL_STATE = {
   products: [],
   productFilters: {},
   loginError: "",
   user: null
};


const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return {
                ...state,
                products: action.products
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
            const newState = {
                ...state,
                filters: {...state.filters, [action.filter]: action.value}
            };
            return {
                ...state,
                filters: {...state.filters, [action.filter]: action.value}
            }
        }
        default: 
            return state
    }
}

export default Reducer