import axios from 'axios';
import store from '../store';
import {
   doSignInWithEmailAndPassword 
} from "../../firebase/firbase.js"
import { 
  SET_PRODUCTS,
  SET_USER,
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_FILTER
} from './actionsTypes.js'
import { checkServerIdentity } from 'tls';
import {FirebaseInstance} from '../../App';
import history from '../../common/history';


export const loadProducts = () => {
  return dispatch => {
    FirebaseInstance.products.on('value', snapshot => {
      const prod = JSON.parse(JSON.stringify(snapshot.val()));
      console.log('prod', prod);
      dispatch({
        type: SET_PRODUCTS,
        products: prod
      });
    });
  }
}

export const login = (username, password) => {
  return dispatch => {
    FirebaseInstance.doSignInWithEmailAndPassword(username, password)
    .then(() => {
      history.push('/home');
    })
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

export const setFilter = (filter, value) => {
  return dispatch => {
    dispatch({
      type: SET_FILTER,
      filter: filter,
      value: value
    });
  }
  
}
