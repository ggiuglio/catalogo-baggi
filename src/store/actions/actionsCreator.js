import {
  SET_PRODUCTS,
  SET_USER,
  LOGIN_ERROR,
  RESET_LOGIN_ERROR,
  SET_FILTER,
  SET_LOADING,
  SET_FILTERD_PRODUCTS,
  SET_IMPORT_RESULTS,
} from './actionsTypes.js'
import { FirebaseInstance } from '../../App';
import { history } from '../../App';

export const clearImportResults = () => {
  return dispatch => {
    return dispatch({
      type: SET_IMPORT_RESULTS,
      importResults: null
    })
  }
}

export const importProductData = (textData) => {
  textData.replace((/  |\r\n|\n|\r/gm),"");
  let productsData = textData.split(';');
  productsData.pop();

  let products = productsData.map(p => parseProduct(p));

  return dispatch => {
    dispatch(checkforProdcutDuplications(products))
  }   
}

export const importProdcuts = (products) => {
  return dispatch => {
    dispatch(setImportResults(products));
    products.forEach(p => {
      if (p.valid && !p.duplicated) {
        dispatch(insertProductInDB(p.product))
      }
    });
  }
}

export const setImportResults = (products) => {
  const results = {
    found: products.length,
    good: 0,
    wrong: 0,
    duplicated: 0,
    errors: []
  }
  products.forEach( p => {
    if (!p.valid) {
      results.wrong++;
      results.errors.push(...p.errors); 
    }
    if (p.duplicated) {
      results.duplicated++;
    }
  });
  results.good = results.found - results.wrong - results.duplicated; 

  return dispatch => {
    return dispatch({
      type: SET_IMPORT_RESULTS,
      importResults: results
    });
  }
}

export const loadProducts = () => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      value: true
    });
    return FirebaseInstance.products.orderByChild('id').on('value', snapshot => {
      const prod = JSON.parse(JSON.stringify(snapshot.val()));
      return dispatch({
        type: SET_PRODUCTS,
        products: prod
      });
    });
  }
}

export const insertProductInDB = (product) => {
  return dispatch => {
    return FirebaseInstance.products.push(product).then(s => {

    })
      .catch((r) => {
        console.log('catch', r);
      })
  }
}

export const login = (username, password) => {
  return dispatch => {
    FirebaseInstance.doSignInWithEmailAndPassword(username, password)
      .then(() => {
        history.push('/prodotti')
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
}

export const logout = () => {
  return dispatch => {
    FirebaseInstance.doSignOut()
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user: user ? { email: user.email } : null
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

const parseProduct = (productString) => {
  const productProperties = productString.split(',');
  const result = {
    valid: true,
    errors: [],
    product: null
  }

  if (!productProperties || productProperties.length !== 12) {
    result.valid = false;
    result.errors.push('Il prodotto non constiene il giusto nuermo di campi separati da /",/"');
    return result;
  }

  const mappedProduct = {
    A: productProperties[0].trim(),
    B: productProperties[1].trim(),
    C: productProperties[2].trim(),
    D: productProperties[3].trim(),
    E: productProperties[4].trim(),
    F: productProperties[5].trim(),
    G: productProperties[6].trim(),
    descrizione: productProperties[7].trim(),
    produttore: productProperties[8].trim(),
    codiceProduttore: productProperties[9].trim(),
    codiceFornitore: productProperties[10].trim(),
    fornitore: productProperties[11].trim(),
  };
  mappedProduct.id = createProductId(productProperties);

  result.product = mappedProduct;

  // valiate product paramenters
  if (mappedProduct.A.length != 1) {
    result.valid = false;
    result.errors.push('Il campo A deve essere un carattere');
  }
  if (mappedProduct.B.length !== 1 || parseInt(mappedProduct.B) === NaN) {
    result.valid = false;
    result.errors.push('Il campo B deve essere un numero di una cifra');
  }
  if (mappedProduct.C.length !== 2 || parseInt(mappedProduct.C) === NaN) {
    result.valid = false;
    result.errors.push('Il campo C deve essere un numero di due cifre ');
  }
  if (mappedProduct.D.length !== 2) {
    result.valid = false;
    result.errors.push('Il campo D deve essere due caratteri');
  }
  if (mappedProduct.E.length !== 3) {
    result.valid = false;
    result.errors.push('Il campo E deve essere di 3 caratteri');
  }
  if (mappedProduct.F.length != 1 || parseInt(mappedProduct.F) === NaN) {
    result.valid = false;
    result.errors.push('Il campo F deve essere un numero di una cifra');
  }
  if (mappedProduct.G.length !== 3 || parseInt(mappedProduct.G) === NaN) {
    result.valid = false;
    result.errors.push('Il campo G deve essere un numero do tre cifre');
  }

  return result;
}

const checkforProdcutDuplications = (productList) => {
  return (dispatch, getState) => {
     productList.forEach(product => {
      if (product.valid) {
        const inStore = getState().products.find(p => p.id === product.product.id);
        const inSameList = productList.filter(p => (p.id === product.id && !p.duplicated)).length > 1;

        if (inStore || inSameList) {
          product.duplicated = true;
        }
      }
    });

    return dispatch(importProdcuts(productList));
  }
}

const createProductId = (productDataArray) => {
  let id = '';
  for (let i = 0; i < 12; i++) {
    id = id + productDataArray[i];
  }

  return id;
}

// test product
// S,0,00,PA,FLT,0,005,UN NUOVO PRODOTTO DI PROVA Tee filter 12mm A-Lock - 250 micron,Parker,M12A-FT8-250-S,ERN0009,RTI;
// just an example