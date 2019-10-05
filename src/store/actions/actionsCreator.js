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
  textData.replace((/  |\r\n|\r/gm), "");
  let productsData = textData.split('\n');

  let products = productsData.reduce((list, p, i) => {
    if (p.charAt(p.length - 1) === ';') {
      p = p.slice(0, -1);
    }
    if (p.length > 0) {
      list.push(parseProduct(p, i));
    }
    return list;
  }, []);

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
    errors: [],
    badProducts: []
  }
  products.forEach(p => {
    if (!p.valid) {
      results.wrong++;
      results.errors.push(...p.errors);
      results.badProducts.push(p.productString);
      
      if (p.duplicated) {
        results.duplicated++;
      }
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
        console.log('error', r);
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

const parseProduct = (productString, line) => {
  const productProperties = productString.split(';');
  const result = {
    valid: true,
    errors: [],
    product: null,
    productString: productString
  }

  if (!productProperties || productProperties.length !== 10) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il prodotto contiene ${productProperties.length} campi invece di 10;`);
    return result;
  }

  const mappedProduct = {
    A: productProperties[0].trim(),
    B: productProperties[1].trim(),
    C: productProperties[2].trim(),
    D: productProperties[3].trim().substring(0, 2),
    E: productProperties[3].trim().substring(2, 5),
    F: productProperties[4].trim().substring(0, 1),
    G: productProperties[4].trim().substring(1, 4),
    descrizione: productProperties[5].trim(),
    produttore: productProperties[6].trim(),
    codiceProduttore: productProperties[7].trim(),
    codiceFornitore: productProperties[8].trim(),
    fornitore: productProperties[9].trim(),
  };

  // valiate product paramenters
  if (mappedProduct.A.length != 1) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo A deve essere un carattere`);
  }
  if (mappedProduct.B.length !== 1 || parseInt(mappedProduct.B) === NaN) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo B deve essere un numero di una cifra`);
  }
  if (mappedProduct.C.length !== 2 || parseInt(mappedProduct.C) === NaN) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo C deve essere un numero di due cifre`);
  }
  if (mappedProduct.D.length !== 2) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo D deve essere due caratteri`);
  }
  if (mappedProduct.E.length !== 3) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo E deve essere di 3 caratteri`);
  }
  if (productProperties[3].length !== 5) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: I campi D e E devono provenire da un campo di 5 caratteri`);
  }
  if (productProperties[4].length !== 4 || parseInt(productProperties[4]) === NaN) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: I campi F e G devono provenire da un campo di 4 cifre`);

  }
  if (mappedProduct.F.length != 1 || parseInt(mappedProduct.F) === NaN) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo F deve essere un numero di una cifra`);
  }
  if (mappedProduct.G.length !== 3 || parseInt(mappedProduct.G) === NaN) {
    result.valid = false;
    result.errors.push(`linea: ${line + 1}: Il campo G deve essere un numero do tre cifre`);
  }

  mappedProduct.id = createProductId(mappedProduct);
  result.product = mappedProduct;

  return result;
}

const checkforProdcutDuplications = (productList) => {
  return (dispatch, getState) => {
    productList.forEach(product => {
      if (product.valid) {
        const inStore = getState().products.find(p => p.id === product.product.id);
        const inSameList = productList.filter(p => (p.id === product.product.id && !p.duplicated && p.valid)).length > 1;

        if (inStore || inSameList) {
          product.duplicated = true;
        }
      }
    });

    return dispatch(importProdcuts(productList));
  }
}

const createProductId = (product) => {
  const id = product.A + product.B + product.C + product.D + product.E + product.F + product.G;
  return id;
}

// test product
// S,0,00,PA,FLT,0,005,UN NUOVO PRODOTTO DI PROVA Tee filter 12mm A-Lock - 250 micron,Parker,M12A-FT8-250-S,ERN0009,RTI;
// just an example