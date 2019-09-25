import { 
  SET_PRODUCTS,
  SET_USER,
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_FILTER,
  SET_LOADING,
  SET_FILTERD_PRODUCTS
} from './actionsTypes.js'
import {FirebaseInstance} from '../../App';

export const loadProducts = () => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      value: true
    });

    return FirebaseInstance.products.on('value', snapshot => {
      const prod = JSON.parse(JSON.stringify(snapshot.val()));
      return dispatch({
        type: SET_PRODUCTS,
        products: prod
      });
    });
  }
}

export const login = (username, password) => {
  return dispatch => {
    FirebaseInstance.doSignInWithEmailAndPassword(username, password)
    .then(() => {})
    .catch(() => {
      dispatch({
        type: LOGIN_ERROR,
        error: "Wrong username or password"
      })
    });
  }
}

export const resetLoginError = () => {
  return dispatch => {
    dispatch({
      type: RESET_LOGIN_ERROR
    }); 
  }
};

export const logout = () => {
  return dispatch => {
    FirebaseInstance.doSignOut()
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user: user ? {email: user.email} : null
    });
  }
}

export const setLoading = () => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      value: true
    })
  }
}

export const setFilter = (filter, value) => {
  return dispatch => {
    dispatch({
      type: SET_FILTER,
      filter: filter,
      value: value
    })
    dispatch({
      type: SET_FILTERD_PRODUCTS
    }); 
  }
}
