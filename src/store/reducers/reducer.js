import { 
    SET_USER,
    SET_PRODUCTS,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR
} from '../actions/actionsTypes'
import store from '../store';

export const INITIAL_STATE = {
   products: [],
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
        default: 
            return state
    }
}

export default Reducer