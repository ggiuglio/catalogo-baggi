import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { getProductToEdit } from '../store/selectors/selector';
import { editProductConfirm, editProductCancel } from '../store/actions/actionsCreator';
import xImg from '../assets/x.png';
import addImg from '../assets/add.png';

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
  top: Calc(50vh - 300px);
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
const ProductDetails = styled.div`
  margin: 10px 20px;
  text-align: left;
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
const FornitoriContainer = styled.div`
  margin: 0 20px;
`;
const ProductDetailsTitle = styled(ProductDetailsLabel)`
  font-weight: bold;
`;
const ObsoletoCheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 1px;
  cursor: pointer;
`;
const ListFornitori = styled.div`
  max-height: 150px;
  overflow: auto;
`;
const DeleteIcon = styled.img`
  width: 15px;
  height: 15px;
  opacity: 0.7;
  cursor: pointer;
  margin: -4px 0px;
`;
const AddIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.7;
  cursor: pointer;
  margin: -5px 6px;
`;

const ConfirmEdit = ({productToEdit, editProductCancel, editProductConfirm}) => {  
  const [descrizione, setDescrizione] = useState('');
  const [produttore, setProduttore] = useState('');
  const [codiceProduttore, setCodiceProduttore] = useState('');
  const [fornitori, setFornitori] = useState('');
  const [obsoleto, setObsoleto] = useState(false);

  useEffect(() => {
    if(productToEdit) {
      setDescrizione(productToEdit.descrizione);
      setProduttore(productToEdit.produttore);
      setCodiceProduttore(productToEdit.codiceProduttore);
      setFornitori(productToEdit.fornitori);
      setObsoleto(productToEdit.obsoleto !== undefined ? productToEdit.obsoleto : false);
    }
  }, [productToEdit])

  const saveEditedProduct = () => {
    const prod = JSON.parse(JSON.stringify(productToEdit));
    prod.descrizione = descrizione;
    prod.produttore = produttore;
    prod.codiceProduttore = codiceProduttore;
    prod.fornitori = fornitori;
    prod.obsoleto = obsoleto;

    editProductConfirm(prod);
  }

  const editCodiceFornitore = (codiceFornitore, id) => {
    const fornitoreList = JSON.parse(JSON.stringify(fornitori));
    fornitoreList.forEach((f, i) => {
      if (i === id) {
        f.codiceFornitore = codiceFornitore;
      }
    });
    setFornitori(fornitoreList);
  };
  const editFornitore = (fornitore, id) => {
    const fornitoreList = JSON.parse(JSON.stringify(fornitori));
    fornitoreList.forEach((f, i) => {
      if (i === id) {
        f.fornitore = fornitore;
      }
    });
    setFornitori(fornitoreList);
  };

  const addFornitore = () => {
    const fornitoreList = JSON.parse(JSON.stringify(fornitori));
    fornitoreList.push({codiceFornitore: '', fornitore: ''});
    setFornitori(fornitoreList);
  };

  const removeFornitore = (i) => {
    const fornitoreList = JSON.parse(JSON.stringify(fornitori));
    fornitoreList.splice(i, 1);
    setFornitori(fornitoreList);
  };

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
            <ProductDetailsValue type="text" value={produttore} onChange={ e => setProduttore(e.target.value)} />
          </ProductDetails>
          <ProductDetails>
            <ProductDetailsLabel>codice producttore</ProductDetailsLabel>
            <ProductDetailsValue type="text" value={codiceProduttore} onChange={ e => setCodiceProduttore(e.target.value)} />
          </ProductDetails>
          <ProductDetails>
            <ProductDetailsTitle>Elenco fornitori</ProductDetailsTitle> 
            <div onClick={() => addFornitore()}><AddIcon src={addImg} />Aggiungi fornitore</div>
          </ProductDetails>
          <ListFornitori>
              {
                fornitori ? fornitori.map((f, i) =>
                  <FornitoriContainer key={i}>
                    <ProductDetails>
                      <ProductDetailsLabel>codice fornitore</ProductDetailsLabel>
                      <ProductDetailsValue type="text" value={f.codiceFornitore} onChange={ e => editCodiceFornitore(e.target.value, i)} />
                    </ProductDetails>
                    <ProductDetails>
                      <ProductDetailsLabel>fornitore</ProductDetailsLabel>
                      <ProductDetailsValue type="text" value={f.fornitore} onChange={ e => editFornitore(e.target.value, i)} />
                    </ProductDetails>
                    {i > 0 ? <DeleteIcon src={xImg} onClick={() => removeFornitore(i)} /> : '' }
                  </FornitoriContainer>
                ) : '' }
          </ListFornitori>
          <ProductDetails>
            <span>Modificato da: &nbsp;</span>
            <span>{productToEdit.modificatoDa} &nbsp;</span>
            <span> il: &nbsp;</span>
            <span>{productToEdit.modificatoIl}</span>
          </ProductDetails>
          <ProductDetails>
            <ObsoletoCheckBox type="checkbox" checked={obsoleto} onChange={ e => setObsoleto(e.target.checked)} /> Prodotto obsoleto
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