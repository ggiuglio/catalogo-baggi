import React from 'react';
import { connect } from "react-redux";

const NewProduct = ({}) => {

  return <div>
    new product
  </div>
}

const mapStateToProps = state => {
  return { 
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (NewProduct);