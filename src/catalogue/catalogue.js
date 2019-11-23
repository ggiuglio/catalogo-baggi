import React, { useEffect } from 'react';
import { connect } from "react-redux";
import styled,{ css } from 'styled-components';
import { loadProducts, setFilter, setLoading, deleteProduct, editProduct } from '../store/actions/actionsCreator';
import { getProducts, getUser, getProductsNumber } from '../store/selectors/selector';
import { history } from '../App';
import search from '../assets/search.png';
import deleteImg from '../assets/delete.png';
import editImg from '../assets/edit.png';
import x from '../assets/x.png';
import ConfirmDelete from '../common/confirmDelete';
import ConfirmEdit from '../common/confirmEdit';

const Container = styled.div`
  overflow: auto;
  box-sizing: border-box;
  max-height: Calc(100vh - 40px);
  margin-top: 40px;
  @media (max-width: 768px) {
    max-height: Calc(100vh - 80px);
    margin-top: 80px;
  }
`;
const TableContainer = styled.div`
  padding: 0 20px;
  width: max-content;
`;
const ProductTable = styled.div`
  min-width: 2200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
  ${props => props.disabled ? css`color: #bbbbbb` : css``}
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
  border-right: 1px solid #444444;
  :last-child {
    border: none;
  }  
  background: fade(slategrey,20%);
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
const SearchIcon = styled.img`
  position: absolute;
  top: 6px;
  left: 0;
  width: 20px;
  height: 20px;
`;
const ClearIcon = styled.img`
  position: absolute;
  top: 9px;
  right: 6px;
  width: 15px;
  height: 15px;
  opacity: 0.7;
  cursor: pointer;
`;
const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.7;
  cursor: pointer;
  margin: 8px 5px;
`;
const EditIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.7;
  cursor: pointer;
  margin: 8px 5px;
  margin-top: 0;
  opacity: 0.5;
`;
const ProductsFound = styled.div`
  margin: 20px 0 0 20px;
  font-weight: bold;
`;
const ActionCell = styled.div`
  box-sizing: border-box;
  width: 30px;
  border-right: 1px solid black;
`;

const MediumHeaderCell = styled(HeaderCell)`
  width: 200px;
`
const MediumFilterCell = styled(FilterCell)`
  width: 200px;
`
const MediumCell = styled(Cell)`
  width: 200px;
`

const filterValues = {};

const Catalogue = ({ productList, productsNumber, loadProducts, setFilter, setLoading, user, deleteProd, editProd }) => {
  useEffect(() => {
    if (user) {
      loadProducts();
    }
    if (!user) {
      history.push('login');
    }
  }, [user, loadProducts]);

  const inputAref = React.createRef();
  const inputBref = React.createRef();
  const inputCref = React.createRef();
  const inputDref = React.createRef();
  const inputEref = React.createRef();
  const inputFref = React.createRef();
  const inputGref = React.createRef();
  const inputProduttoref = React.createRef();
  const inputDecrizioneref = React.createRef();
  const inputCodiceProduttoref = React.createRef();
  const inputCodiceFornitoreref = React.createRef();
  const inputFornitoreref = React.createRef();

  let debounce;
  let debounceLoad;

  const debouncedFilterChange = (filter, value) => {
    setFilter(filter, value);
  }
  const debounceLoadin = () => {
    setLoading();
  }

  const filterChange = (event, filter) => {
    const value = event.target.value;
    setFilterValue(filter, value);
  }

  const setFilterValue = (filter, value) => {
    filterValues[filter] = value;
    if (debounce && debounceLoad) {
      clearTimeout(debounce);
      clearTimeout(debounceLoad);
    }
    debounceLoad = setTimeout(() => debounceLoadin(), 400);
    debounce = setTimeout(() => debouncedFilterChange(filter, value), 500);
  }

  const resetFilter = (filter) => {
    setFilterValue(filter, '');
    switch (filter) {
      case 'A':
        inputAref.current.value = '';
        break;
      case 'B':
        inputBref.current.value = '';
        break;
      case 'C':
        inputCref.current.value = '';
        break;
      case 'D':
        inputDref.current.value = '';
        break;
      case 'E':
        inputEref.current.value = '';
        break;
      case 'F':
        inputFref.current.value = '';
        break;
      case 'G':
        inputGref.current.value = '';
        break;
      case 'produttore':
        inputProduttoref.current.value = '';
        break;
      case 'descrizione':
        inputDecrizioneref.current.value = '';
        break;
      case 'codiceProduttore':
        inputCodiceProduttoref.current.value = '';
        break;
      case 'codiceFornitore':
        inputCodiceFornitoreref.current.value = '';
        break;
      case 'fornitore':
        inputFornitoreref.current.value = '';
        break;
      default:
        break;
    };

  }

  return <Container>
    <ProductsFound>{productList.length} su {productsNumber} prodotti trovati</ProductsFound>
    <TableContainer>
      <ProductTable>
      <HeaderRow>
        <ActionCell></ActionCell>
        <HeaderCell>Divisione</HeaderCell>
        <HeaderCell>Stato</HeaderCell>
        <HeaderCell>Mercato</HeaderCell>
        <HeaderCell>Origine</HeaderCell>
        <HeaderCell>Famiglia</HeaderCell>
        <HeaderCell>Tipo</HeaderCell>
        <HeaderCell>Versione</HeaderCell>
        <GrowHeaderCell>Descrizione</GrowHeaderCell>
        <MediumHeaderCell>Produttore</MediumHeaderCell>
        <MediumHeaderCell>Codice Produttore</MediumHeaderCell>
        <MediumHeaderCell>Codice Fornitore</MediumHeaderCell>
        <MediumHeaderCell>Fornitore</MediumHeaderCell>
        <MediumHeaderCell>Codice BAGGI</MediumHeaderCell>
      </HeaderRow>
      <FilterRow>
        <ActionCell>
        </ActionCell>
        <FilterCell>
          <Filter type="text" ref={inputAref} onChange={(e) => filterChange(e, 'A')} />
          <SearchIcon src={search} />
          {filterValues.A ? <ClearIcon src={x} onClick={() => resetFilter('A')} /> : ''}
        </FilterCell>
        <FilterCell>
          <Filter type="text" ref={inputBref} onChange={(e) => filterChange(e, 'B')} />
          <SearchIcon src={search} />
          {filterValues.B ? <ClearIcon src={x} onClick={() => resetFilter('B')} /> : ''}
        </FilterCell>
        <FilterCell>
          <Filter type="text" ref={inputCref} onChange={(e) => filterChange(e, 'C')} />
          <SearchIcon src={search} />
          {filterValues.C ? <ClearIcon src={x} onClick={() => resetFilter('C')} /> : ''}
        </FilterCell>
        <FilterCell>
          <Filter type="text" ref={inputDref} onChange={(e) => filterChange(e, 'D')} />
          <SearchIcon src={search} />
          {filterValues.D ? <ClearIcon src={x} onClick={() => resetFilter('D')} /> : ''}
        </FilterCell>
        <FilterCell>
          <Filter type="text" ref={inputEref} onChange={(e) => filterChange(e, 'E')} />
          <SearchIcon src={search} />
          {filterValues.E ? <ClearIcon src={x} onClick={() => resetFilter('E')} /> : ''}
        </FilterCell>
        <FilterCell>
          <Filter type="text" ref={inputFref} onChange={(e) => filterChange(e, 'F')} />
          <SearchIcon src={search} />
          {filterValues.F ? <ClearIcon src={x} onClick={() => resetFilter('F')} /> : ''}
        </FilterCell>
        <FilterCell>
          <Filter type="text" ref={inputGref} onChange={(e) => filterChange(e, 'G')} />
          <SearchIcon src={search} />
          {filterValues.G ? <ClearIcon src={x} onClick={() => resetFilter('G')} /> : ''}
        </FilterCell>
        <GrowFilterCell>
          <Filter type="text" ref={inputDecrizioneref} onChange={(e) => filterChange(e, 'descrizione')} />
          <SearchIcon src={search} />
          {filterValues.descrizione ? <ClearIcon src={x} onClick={() => resetFilter('descrizione')} /> : ''}
        </GrowFilterCell>
        <MediumFilterCell>
          <Filter type="text" ref={inputProduttoref} onChange={(e) => filterChange(e, 'produttore')} />
          <SearchIcon src={search} />
          {filterValues.produttore ? <ClearIcon src={x} onClick={() => resetFilter('produttore')} /> : ''}
        </MediumFilterCell>
        <MediumFilterCell>
          <Filter type="text" ref={inputCodiceProduttoref} onChange={(e) => filterChange(e, 'codiceProduttore')} />
          <SearchIcon src={search} />
          {filterValues.codiceProduttore ? <ClearIcon src={x} onClick={() => resetFilter('codiceProduttore')} /> : ''}
        </MediumFilterCell>
        <MediumFilterCell>
          <Filter type="text" ref={inputCodiceFornitoreref} onChange={(e) => filterChange(e, 'codiceFornitore')} />
          <SearchIcon src={search} />
          {filterValues.codiceFornitore ? <ClearIcon src={x} onClick={() => resetFilter('codiceFornitore')} /> : ''}
        </MediumFilterCell>
        <MediumFilterCell>
          <Filter type="text" ref={inputFornitoreref} onChange={(e) => filterChange(e, 'fornitore')} />
          <SearchIcon src={search} />
          {filterValues.fornitore ? <ClearIcon src={x} onClick={() => resetFilter('fornitore')} /> : ''}
        </MediumFilterCell>
        <MediumFilterCell>
        </MediumFilterCell>

      </FilterRow>
      {
        productList.map(p =>
          <TableRow disabled={p.obsoleto} key={p.id}>
            <ActionCell>
              <DeleteIcon src={deleteImg} onClick={() => deleteProd(p)} />
              <EditIcon src={editImg} onClick={() => editProd(p)} />
            </ActionCell>
            <Cell>{p.A}</Cell>
            <Cell>{p.B}</Cell>
            <Cell>{p.C}</Cell>
            <Cell>{p.D}</Cell>
            <Cell>{p.E}</Cell>
            <Cell>{p.F}</Cell>
            <Cell>{p.G}</Cell>
            <GrowCell>{p.descrizione}</GrowCell>
            <MediumCell>{p.produttore}</MediumCell>
            <MediumCell>{p.codiceProduttore}</MediumCell>
            <MediumCell>{p.fornitori.map(f => f.codiceFornitore)}</MediumCell>
            <MediumCell>{p.fornitori.map(f => f.fornitore)}</MediumCell>
            <MediumCell>{p.id}</MediumCell>
          </TableRow>
        )
      }
    </ProductTable>
    </TableContainer>
    <ConfirmDelete />
    <ConfirmEdit />
  </Container >
}

const mapStateToProps = state => {
  return {
    productList: getProducts(state),
    user: getUser(state),
    productsNumber: getProductsNumber(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () => dispatch(loadProducts()),
    setFilter: (filter, value) => dispatch(setFilter(filter, value)),
    setLoading: () => dispatch(setLoading()),
    deleteProd: (product) => dispatch(deleteProduct(product)),
    editProd: (product) => dispatch(editProduct(product))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);