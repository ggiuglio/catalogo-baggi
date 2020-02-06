import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import styled,{ css } from 'styled-components';
import { loadProducts, setFilter, setLoading, deleteProduct, editProduct } from '../store/actions/actionsCreator';
import { getProducts, getUser, getProductsNumber, getProductFilters } from '../store/selectors/selector';
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
  max-height: Calc(100vh - 90px);
  @media (max-width: 768px) {
    max-height: Calc(100vh - 80px);
    margin-top: 80px;
  }
`;
const TableContainer = styled.div`
  padding: 0 10px;
  width: auto;
  font-size: 12px;
`;
const ProductTable = styled.div`
  min-width: 1460px;
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
  ${props => props.disabled ? css`background-color: #ebd59b !important` : css``}
  :nth-child(odd) {
    background-color: #e2e2e2;
  }
`;
const Cell = styled.div`
  box-sizing: border-box;
  width: 75px;
  padding: 12px 4px;
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
  padding: 12px 4px;
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
  width: 15px;
  height: 15px;
  opacity: 0.7;
  cursor: pointer;
  margin: 8px 5px;
`;
const EditIcon = styled.img`
  width: 15px;
  height: 15px;
  opacity: 0.7;
  cursor: pointer;
  margin: 8px 5px;
  margin-top: 0;
  opacity: 0.5;
`;
const ProductsFound = styled.div`
  width: Calc(100vw - 40px);
  margin: 60px 20px 0 10px;
  font-weight: bold;
  display: inline-flex;
`;
const ActionCell = styled.div`
  box-sizing: border-box;
  width: 30px;
  border-right: 1px solid black;
`;
const MediumHeaderCell = styled(HeaderCell)`
  width: 120px;
`;
const MediumFilterCell = styled(FilterCell)`
  width: 120px;
`;
const MediumCell = styled(Cell)`
  width: 120px;
`;
const Separator = styled.div`
  flex-grow: 1;
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
`;

const filterValues = {};

const Catalogue = ({ productList, productsNumber, filters, loadProducts, setFilter, setLoading, user, deleteProd, editProd }) => {
  useEffect(() => {
    if (user) {
      loadProducts();
    }
    if (!user) {
      history.push('login');
    }
  }, [user, loadProducts]);

  useEffect(() => { 
    if(inputA !== filters.A) setInputA(filters.A);
    if(inputB !== filters.B) setInputB(filters.B);
    if(inputC !== filters.C) setInputC(filters.C);
    if(inputD !== filters.D) setInputD(filters.D);
    if(inputE !== filters.E) setInputE(filters.E);
    if(inputF !== filters.F) setInputF(filters.F);
    if(inputG !== filters.G) setInputG(filters.G);
    if(inputDescrizione !== filters.descrizione) setInputDescrizione(filters.descrizione);
    if(inputProduttore !== filters.produttore) setInputDescrizione(filters.produttore);
    if(inputCodiceProduttore !== filters.codiceProduttore) setInputDescrizione(filters.codiceProduttore);
    if(inputFornitore!== filters.fornitore) setInputDescrizione(filters.fornitore);
    if(inputCodiceFornitore !== filters.codiceFornitore) setInputDescrizione(filters.codiceFornitore);

  }, [filters]);


  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [inputC, setInputC] = useState('');
  const [inputD, setInputD] = useState('');
  const [inputE, setInputE] = useState('');
  const [inputF, setInputF] = useState('');
  const [inputG, setInputG] = useState('');
  const [inputDescrizione, setInputDescrizione] = useState('');
  const [inputProduttore, setInputProduttore] = useState('');
  const [inputCodiceProduttore, setInputCodiceProduttore] = useState('');
  const [inputFornitore, setInputFornitore] = useState('');
  const [inputCodiceFornitore, setInputCodiceFornitore] = useState('');


  let debounce;
  let debounceLoad;

  const debouncedFilterChange = (filter, value) => {
    setFilter(filter, value);
  }
  const debounceLoadin = () => {
    setLoading();
  }

  const setDuplicated = (value) => {
    setFilterValue('onlyDuplicated', value);
  }

  const setFilterValue = (filter, value) => {
    if (debounce && debounceLoad) {
      clearTimeout(debounce);
      clearTimeout(debounceLoad);
    }
    debounceLoad = setTimeout(() => debounceLoadin(), 400);
    debounce = setTimeout(() => debouncedFilterChange(filter, value), 500);
  }


  return <div>
    <ProductsFound>{productList.length} su {productsNumber} prodotti trovati
      <Separator></Separator>
      <Checkbox type="checkbox" onChange={ e => setDuplicated(e.target.checked)}/> Mostra solo codici produttore duplicati
    </ProductsFound>
  
    <Container>
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
            <Filter type="text" value={inputA} onChange={(e) => setFilterValue('A', e.target.value)} />
            <SearchIcon src={search} />
            {inputA ? <ClearIcon src={x} onClick={() => setFilterValue('A', '')} /> : ''}
          </FilterCell>
          <FilterCell>
            <Filter type="text" value={inputB} onChange={(e) => setFilterValue('B', e.target.value)} />
            <SearchIcon src={search} />
            {inputB ? <ClearIcon src={x} onClick={() => setFilterValue('B', '')} /> : ''}
          </FilterCell>
          <FilterCell>
            <Filter type="text" value={inputC} onChange={(e) => setFilterValue('C', e.target.value)} />
            <SearchIcon src={search} />
            {inputC ? <ClearIcon src={x} onClick={() => setFilterValue('C', '')} /> : ''}
          </FilterCell>
          <FilterCell>
            <Filter type="text" value={inputD} onChange={(e) => setFilterValue('D', e.target.value)} />
            <SearchIcon src={search} />
            {inputD ? <ClearIcon src={x} onClick={() => setFilterValue('D', '')} /> : ''}
          </FilterCell>
          <FilterCell>
            <Filter type="text" value={inputE} onChange={(e) => setFilterValue('E', e.target.value)} />
            <SearchIcon src={search} />
            {inputE ? <ClearIcon src={x} onClick={() => setFilterValue('E', '')} /> : ''}
          </FilterCell>
          <FilterCell>
            <Filter type="text" value={inputF} onChange={(e) => setFilterValue('F', e.target.value)} />
            <SearchIcon src={search} />
            {inputF ? <ClearIcon src={x} onClick={() => setFilterValue('F', '')} /> : ''}
          </FilterCell>
          <FilterCell>
            <Filter type="text" value={inputG} onChange={(e) => setFilterValue('G', e.target.value)} />
            <SearchIcon src={search} />
            {inputG ? <ClearIcon src={x} onClick={() => setFilterValue('G', '')} /> : ''}
          </FilterCell>
          <GrowFilterCell>
            <Filter type="text" value={inputDescrizione} onChange={(e) => setFilterValue('descrizione', e.target.value)} />
            <SearchIcon src={search} />
            {inputDescrizione ? <ClearIcon src={x} onClick={() => setFilterValue('descrizione', '')} /> : ''}
          </GrowFilterCell>
          <MediumFilterCell>
            <Filter type="text" value={inputProduttore} onChange={(e) => setFilterValue('produttore', e.target.value)} />
            <SearchIcon src={search} />
            {inputProduttore ? <ClearIcon src={x} onClick={() => setFilterValue('produttore', '')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
            <Filter type="text" value={inputCodiceProduttore} onChange={(e) => setFilterValue('codiceProduttore', e.target.value)} />
            <SearchIcon src={search} />
            {inputCodiceProduttore ? <ClearIcon src={x} onClick={() => setFilterValue('codiceProduttore', '')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
            <Filter type="text" value={inputCodiceFornitore} onChange={(e) => setFilterValue('codiceFornitore', e.target.value)} />
            <SearchIcon src={search} />
            {inputCodiceFornitore ? <ClearIcon src={x} onClick={() => setFilterValue('codiceFornitore', '')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
            <Filter type="text" value={inputFornitore} onChange={(e) => setFilterValue('fornitore', e.target.value)} />
            <SearchIcon src={search} />
            {inputFornitore ? <ClearIcon src={x} onClick={() => setFilterValue('fornitore', '')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
          </MediumFilterCell>

        </FilterRow>
        {
          productList.map((p, i) =>
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
              <MediumCell>{p.fornitori.map((f, i) => <div key={i}>{f.codiceFornitore}</div>)}</MediumCell>
              <MediumCell>{p.fornitori.map((f, i) => <div key={i}>{f.fornitore}</div>)}</MediumCell>
              <MediumCell>{p.id}</MediumCell>
            </TableRow>
          )
        }
      </ProductTable>
      </TableContainer>
      <ConfirmDelete />
      <ConfirmEdit />
    </Container >
  </div>

}

const mapStateToProps = state => {
  return {
    productList: getProducts(state),
    user: getUser(state),
    productsNumber: getProductsNumber(state),
    filters: getProductFilters(state)
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