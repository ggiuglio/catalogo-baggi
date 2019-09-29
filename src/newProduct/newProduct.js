import React from 'react';
import { connect } from "react-redux";
import { getUser } from '../store/selectors/selector';
import { history } from '../App';

const NewProduct = ({user}) => {
  if (!user) {
    history.push('login');
  }
  return <div>
    new product
  </div>
}

const mapStateToProps = state => {
  return { 
    user: getUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (NewProduct);