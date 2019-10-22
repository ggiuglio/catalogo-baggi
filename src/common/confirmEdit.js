import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { getProductToEdit } from '../store/selectors/selector';
import { editProductConfirm, editProductCancel } from '../store/actions/actionsCreator';

const ConfirmEditContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  opacity: 0.9;
  position: fixed;
  z-index: 3;
  top: 0px
`;
const ConfirmEditModal = styled.div`
  width: 80vw;
  position: fixed;
  top: Calc(50vh - 150px);
  left: 10vw;
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
const ConfirmEditMessage = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
`;
const ConfirmEditProductDetails = styled.div`
  padding: 20px;
  text-align: center;
`;
const ProductDetails = styled.div`
  margin: 10px 20px;
  text-algin: left;
  display: inline-flex;
`;
const ProductDetailsLabel = styled.div`
  width: 150px;
`;
const ProductDetailsValue = styled.input`
  flex-grow: 1;
  padding: 5px 8px;
  outline: none;
`;
const ConfirmEditActions = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: inline-flex;
`;
const ConfirmEditButton = styled.div`
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
const ConfirmEditFiller = styled.div`
  height: 20px; 
  flex-grow: 1;
`;

const ConfirmEdit = ({productToEdit, editProductCancel, editProductConfirm}) => {  
  const [descrizione, setDescrizione] = useState('');
  const [produttore, setProduttore] = useState('');
  const [codiceProduttore, setCodiceProduttore] = useState('');
  const [codiceFornitore, setCodiceFornitore] = useState('');
  const [fornitore, setFornitore] = useState('');

  React.useEffect(() => {
    if(productToEdit) {
      setDescrizione(productToEdit.descrizione);
      setProduttore(productToEdit.produttore);
      setCodiceProduttore(productToEdit.codiceProduttore);
      setCodiceFornitore(productToEdit.codiceFornitore);
      setFornitore(productToEdit.fornitore);
    }
  }, [productToEdit])

  const saveEditedProduct = () => {
    const prod = JSON.parse(JSON.stringify(productToEdit));
    prod.descrizione = descrizione;
    prod.produttore = produttore;
    prod.codiceProduttore = codiceProduttore;
    prod.codiceFornitore = codiceFornitore;
    prod.fornitore = fornitore;
    editProductConfirm(prod);
  }

  return <div>
    { productToEdit ? <div>
        <ConfirmEditContainer></ConfirmEditContainer>  
        <ConfirmEditModal>
          <ConfirmEditMessage>
            Modifica dettagli del prodotto <span>{productToEdit.id}</span>
          </ConfirmEditMessage>
      
          <ProductDetails>
            <ProductDetailsLabel>Descrizione</ProductDetailsLabel>
            <ProductDetailsValue value={descrizione} onChange={ e => setDescrizione(e.target.value)} type="text" />
          </ProductDetails>
          <ProductDetails>
            <ProductDetailsLabel>produttore</ProductDetailsLabel>
            <ProductDetailsValue type="text" value={produttore} onChange={ e => setProduttore(e.target.value)} type="text"/>
          </ProductDetails>
          <ProductDetails>
            <ProductDetailsLabel>codice producttore</ProductDetailsLabel>
            <ProductDetailsValue type="text" value={codiceProduttore} onChange={ e => setCodiceProduttore(e.target.value)} type="text"/>
          </ProductDetails>
          <ProductDetails>
            <ProductDetailsLabel>codice fornitore</ProductDetailsLabel>
            <ProductDetailsValue type="text" value={codiceFornitore} onChange={ e => setCodiceFornitore(e.target.value)} type="text"/>
          </ProductDetails>
          <ProductDetails>
            <ProductDetailsLabel>fornitore</ProductDetailsLabel>
            <ProductDetailsValue type="text" value={fornitore} onChange={ e => setFornitore(e.target.value)} type="text"/>
          </ProductDetails>
          <ProductDetails>
            <span>Modificato da: &nbsp;</span>
            <span>{productToEdit.modificatoDa} &nbsp;</span>
            <span> il: &nbsp;</span>
            <span>{productToEdit.modificatoIl}</span>
          </ProductDetails>
          <ConfirmEditActions>
            <ConfirmEditButton onClick={() => editProductCancel()}>CANCELLA</ConfirmEditButton>
            <ConfirmEditFiller></ConfirmEditFiller>
            <ConfirmEditButton onClick={() => saveEditedProduct()}>MODIFICA</ConfirmEditButton>            
          </ConfirmEditActions>
        </ConfirmEditModal> 
      </div>: ''}
  </div>
} 

const mapStateToProps = state => {
return { 
    productToEdit: getProductToEdit(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editProductConfirm: product => dispatch(editProductConfirm(product)),
    editProductCancel: () => dispatch(editProductCancel()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEdit)