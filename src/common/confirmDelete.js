import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { getProductToDelete } from '../store/selectors/selector';
import { deleteProductConfirm, deleteProductCancel } from '../store/actions/actionsCreator';

const ConfirmDeleteContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  opacity: 0.9;
  position: fixed;
  z-index: 3;
  top: 0px
`;
const ConfirmDeleteModal = styled.div`
  width: 50vw;
  position: fixed;
  top: Calc(50vh - 150px);
  left: 25vw;
  margin-right: auto;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 4;
  background-color: white;
  @media (max-width: 768px) {
    margin: 10px;
    margin-top: Calc(50vh - 150px);
    width: calc(100vw - 20px);
    border: none;
    z-index: 4;
  }
`;
const ConfirmDeleteMessage = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
`;
const ConfirmDeleteProductDetails = styled.div`
  padding: 20px;
  text-align: center;
`;
const ConfirmDeleteActions = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: inline-flex;
`;
const ConfirmDeleteButton = styled.div`
  width: 150px;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  text-align: center;
  background: #cccccc;
  color: black;
  border: 1px solid black;
  cursor: pointer;
  :hover {
    background-color: #444444;
    color: white;
  }
`;
const ConfirmDeleteFiller = styled.div`
  height: 20px; 
  flex-grow: 1;
`;

const ConfirmDelete = ({productToDelete, deleteProductCancel, deleteProductConfirm}) => {  
    return <div>
    { productToDelete ? <div>
        <ConfirmDeleteContainer></ConfirmDeleteContainer>  
        <ConfirmDeleteModal>
          <ConfirmDeleteMessage>
            Sei sicuro di voler eliminare questo prodotto?
          </ConfirmDeleteMessage>
          <ConfirmDeleteProductDetails>
            <span>{productToDelete.id}</span> - <span>{productToDelete.descrizione}</span>
          </ConfirmDeleteProductDetails>
          <ConfirmDeleteActions>
            <ConfirmDeleteButton onClick={() => deleteProductCancel()}>CANCELLA</ConfirmDeleteButton>
            <ConfirmDeleteFiller></ConfirmDeleteFiller>
            <ConfirmDeleteButton onClick={() => deleteProductConfirm(productToDelete)}>ELIMINA</ConfirmDeleteButton>            
          </ConfirmDeleteActions>
        </ConfirmDeleteModal> 
      </div>: ''}
  </div>
} 

const mapStateToProps = state => {
return { 
    productToDelete: getProductToDelete(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProductConfirm: product => dispatch(deleteProductConfirm(product)),
    deleteProductCancel: () => dispatch(deleteProductCancel()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDelete)