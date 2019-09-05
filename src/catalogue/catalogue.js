import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { loadProducts } from '../store/actions/actionsCreator';
import { getProducts } from '../store/selectors/selector';

const Container = styled.div`
  width: 100vw;
  overflow: auto;
`;
const ProductTable = styled.div`
  width: Calc(100% - 40px);
  min-width: 1000px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #444444;
`;
const HeaderRow = styled.div`
  flex-grow: 1;
  background-color: #444444;
  display: flex;
  color: white;
`;
const FilterRow = styled.div`
  flex-grow: 1;
  background-color: white;
  display: flex;
  color: #444444;
  border-bottom: 2px solid #444444;
`;
const TableRow = styled.div`
  flex-grow: 1;
  background-color: white;
  display: flex;
  color: #444444;
  :nth-child(odd) {
    background-color: #e2e2e2;
  }
`;
const Cell = styled.div`
  box-sizing: border-box;
  width: 70px;
  padding: 0.4em 0.6em;
  overflow: hidden; // Or flex might break
  list-style: none;
  brder: none
  border-right: 1px solid #444444;
  :last-child {
    border: none;
  }  background: fade(slategrey,20%);
  position: relative;
  word-break: break-word;
  > h1, > h2, > h3, > h4, > h5, > h6 { margin: 0; }
`;
const HeaderCell = styled(Cell)`
  padding: 0.8em 0.6em;
  text-align: center;
  font-weight: bold;
  brder: none
  border-right: 1px solid white;
  :last-child {
    border: none;
  }
`;
const GrowHeaderCell = styled(HeaderCell)`
  flex-grow: 1;
`
const GrowCell = styled(Cell)`
  flex-grow: 1;
`
const FilterCell = styled(Cell)`
  padding: 0;
  padding: 2px 5px;
`;
const ColummFilter = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
`;

const Catalogue = ({productList}) => {
  return <Container>

    <ProductTable>
      <HeaderRow>
        <HeaderCell>A</HeaderCell>
        <HeaderCell>B</HeaderCell>
        <HeaderCell>C</HeaderCell>
        <HeaderCell>D</HeaderCell>
        <HeaderCell>E</HeaderCell>
        <GrowHeaderCell>Descrizione</GrowHeaderCell>
        <GrowHeaderCell>Produttore</GrowHeaderCell>
        <GrowHeaderCell>Codice Produttore</GrowHeaderCell>    
        <GrowHeaderCell>Codice Fornitore</GrowHeaderCell>
        <GrowHeaderCell>Fornitore</GrowHeaderCell>
      </HeaderRow>
      <FilterRow>
          <FilterCell><ColummFilter type="text"></ColummFilter></FilterCell>
          <Cell><ColummFilter type="text"></ColummFilter></Cell>
          <Cell><ColummFilter type="text"></ColummFilter></Cell>
          <Cell><ColummFilter type="text"></ColummFilter></Cell>
          <Cell><ColummFilter type="text"></ColummFilter></Cell>
          <GrowCell><ColummFilter type="text"></ColummFilter></GrowCell>
          <GrowCell><ColummFilter type="text"></ColummFilter></GrowCell>
          <GrowCell><ColummFilter type="text"></ColummFilter></GrowCell>
          <GrowCell><ColummFilter type="text"></ColummFilter></GrowCell>
          <GrowCell><ColummFilter type="text"></ColummFilter></GrowCell>
      </FilterRow>
      {
        productList.map(p => 
        <TableRow>
          <Cell>{p.A}</Cell>
          <Cell>{p.B}</Cell>
          <Cell>{p.C}</Cell>
          <Cell>{p.D}</Cell>
          <Cell>{p.E}</Cell>
          <GrowCell>{p.descrizione}</GrowCell>
          <GrowCell>{p.produttore}</GrowCell>
          <GrowCell>{p.codiceProduttore}</GrowCell>
          <GrowCell>{p.codiceFornitore}</GrowCell>
          <GrowCell>{p.fornitore}</GrowCell>
        </TableRow>      
      )
    }
    </ProductTable>

    {productList.map(p => <div key={p.id}> {p.descrizione} </div>)}
  </Container>
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

export default connect(mapStateToProps, mapDispatchToProps) (Catalogue);