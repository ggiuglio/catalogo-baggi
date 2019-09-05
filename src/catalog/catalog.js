import React, {Component} from 'react';
import { connect } from "react-redux";
import { loadProducts } from '../store/actions/actionsCreator';
import { getProducts } from '../store/selectors/selector';

const Catalog = ({productList}) => {
  return <div>
    catalog
    {productList.map(p => <div key={p.id}> {p.descrizione} </div>)}
  </div>
}

const mapStateToProps = state => {
  return { 
    productList: getProducts(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () =>  dispatch(loadProducts())
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Catalog);