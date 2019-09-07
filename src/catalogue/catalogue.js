import React, { useState } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { loadProducts, setFilter } from '../store/actions/actionsCreator';
import { getProducts, getProductFilters } from '../store/selectors/selector';
import search from '../assets/search.png';

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
  width: 100px;
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
  border: none
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
  padding: 5px 0;
`;
const Filter = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  padding: 2px 5px;
  padding-left: 22px;
  font-size: 16px;
  outline: none;
`;
const GrowFilterCell = styled(FilterCell)`
  flex-grow: 1;
`;
const Icon = styled.img`
  position: absolute;
  top: 6px;
  left: 0;
  width: 20px;
  height: 20px;
`;

const Catalogue = ({productList, filters, setFilter}) => {

  const filterChange = (event, filter) => {
    setFilter(filter, event.target.value)
  }

  return <Container>
    <ProductTable>
      <HeaderRow>
        <HeaderCell>A</HeaderCell>
        <HeaderCell>B</HeaderCell>
        <HeaderCell>C</HeaderCell>
        <HeaderCell>D</HeaderCell>
        <HeaderCell>E</HeaderCell>
        <HeaderCell>F</HeaderCell>
        <HeaderCell>G</HeaderCell>
        <GrowHeaderCell>Descrizione</GrowHeaderCell>
        <GrowHeaderCell>Produttore</GrowHeaderCell>
        <GrowHeaderCell>Codice Produttore</GrowHeaderCell>    
        <GrowHeaderCell>Codice Fornitore</GrowHeaderCell>
        <GrowHeaderCell>Fornitore</GrowHeaderCell>
      </HeaderRow>
      <FilterRow>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'A')} />
            <Icon src={search} />
          </FilterCell>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'B')} />
            <Icon src={search} />
          </FilterCell>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'C')}/>
            <Icon src={search} />
          </FilterCell>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'D')}/>
            <Icon src={search} />
          </FilterCell>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'E')}/>
            <Icon src={search} />
          </FilterCell>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'F')}/>
            <Icon src={search} />
          </FilterCell>
          <FilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'G')}/>
            <Icon src={search} />
          </FilterCell>
          <GrowFilterCell>
            <Filter type="text" />
            <Icon src={search} onChange={(e) => filterChange(e, 'descrizione')}/>
          </GrowFilterCell>
          <GrowFilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'producttore')}/>
            <Icon src={search} />
          </GrowFilterCell>
          <GrowFilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'codice')}/>
            <Icon src={search} />
          </GrowFilterCell>
          <GrowFilterCell>
            <Filter type="text" onChange={(e) => filterChange(e, 'A')}/>
            <Icon src={search} />
          </GrowFilterCell>
          <GrowFilterCell>
            <Filter type="text"  onChange={(e) => filterChange(e, 'A')}/>
            <Icon src={search} />
          </GrowFilterCell>
      </FilterRow>
      {
        productList.map(p => 
        <TableRow key={p.id}>
          <Cell>{p.A}</Cell>
          <Cell>{p.B}</Cell>
          <Cell>{p.C}</Cell>
          <Cell>{p.D}</Cell>
          <Cell>{p.E}</Cell>
          <Cell>{p.F}</Cell>
          <Cell>{p.G}</Cell>
          <GrowCell>{p.descrizione}</GrowCell>
          <GrowCell>{p.produttore}</GrowCell>
          <GrowCell>{p.codiceProduttore}</GrowCell>
          <GrowCell>{p.codiceFornitore}</GrowCell>
          <GrowCell>{p.fornitore}</GrowCell>
        </TableRow>      
      )
    }
    </ProductTable>

 </Container>
}

const mapStateToProps = state => {
  return { 
    productList: getProducts(state),
    filters: getProductFilters(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () =>  dispatch(loadProducts()),
    setFilter: (filter, value) => dispatch(setFilter(filter, value))
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Catalogue);