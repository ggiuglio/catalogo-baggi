import React, {Component} from 'react';
import { connect } from "react-redux";
import { Router, Route } from 'react-router-dom';
import './App.css';
import { 
  loadProducts, 
  logout,
  setUser
} from './store/actions/actionsCreator';
import { getProducts } from './store/selectors/selector';
import Catalogue from './catalogue/catalogue';
import Login from './login/login';
import Firebase from './firebase/firbase';
import Header from './common/header';
import Loader from './common/loader';
import createHistory from 'history/createBrowserHistory';
import ImportData from './importData/importData';
import NewProduct from './newProduct/newProduct';

export const history = createHistory()

export const FirebaseInstance = new Firebase();

class App extends Component {
componentDidMount() {
  FirebaseInstance.auth.onAuthStateChanged((user) => {
    this.props.setUser(user);
    user ? history.push('prodotti') : history.push('login')
  });
}

  render() {
    return (
      <div>
        <Header />
        <Loader />
        <Router history={history}>
          <Route path={'/login'} component={Login} />
          <Route path={'/prodotti'} component={Catalogue} />
          <Route path={'/nuovo-prodotto'} component={NewProduct} />
          <Route path={'/import'} component={ImportData} />
          <Route exact path={'/'} component={Catalogue} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    productList: getProducts(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () =>  dispatch(loadProducts()),
    logout: () => dispatch(logout()),
    setUser: (user) => dispatch(setUser(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
