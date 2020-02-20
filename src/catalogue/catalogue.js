import React, { useEffect } from 'react';
import { connect } from "react-redux";
import styled,{ css } from 'styled-components';
import { loadProducts, setFilter, setLoading, deleteProduct, editProduct, loadMoreResults } from '../store/actions/actionsCreator';
import { getProducts, getUser, getProductsNumber, getProductFilters, getResultNumberLimit } from '../store/selectors/selector';
import { history } from '../App';
import search from '../assets/search.png';
import deleteImg from '../assets/delete.png';
import editImg from '../assets/edit.png';
import x from '../assets/x.png';
import ConfirmDelete from '../common/confirmDelete';
import ConfirmEdit from '../common/confirmEdit';
import { FilterInput } from '../common/filterInput';

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
  min-width: 1455px;
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
const LoadMorebutton = styled.div`
  width: 150px;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  text-align: center;
  background: #cccccc;
  color: black;
  border: 1px solid black;
  margin: 15px auto;
  cursor: pointer;
  :hover {
    background-color: #444444;
    color: white;
  }
`;

const Catalogue = ({ productList, productsNumber, resultNumberLimit, getMoreResults, filters, loadProducts, setFilter, setLoading, user, deleteProd, editProd }) => {
  
  useEffect(() => {
    if (user) {
      loadProducts();
    }
    if (!user) {
      history.push('login');
    }
  }, [user, loadProducts]);

  const setDuplicated = (value) => {
    setFilter('onlyDuplicated', value);
  }

  const changeA = (value) => {
    setFilter('A', value);
  };
  const changeB = (value) => {
    setFilter('B', value);
  };
  const changeC= (value) => {
    setFilter('C', value);
  };
  const changeD = (value) => {
    setFilter('D', value);
  };
  const changeE = (value) => {
    setFilter('E', value);
  };
  const changeF = (value) => {
    setFilter('F', value);
  };
  const changeG = (value) => {
    setFilter('G', value);
  };
  const changeDescrizione = (value) => {
    setFilter('descrizione', value);
  };
  const changeProduttore = (value) => {
    setFilter('produttore', value);
  };
  const changeCodiceProduttore = (value) => {
    setFilter('codiceProduttore', value);
  };
  const changeFornitore = (value) => {
    setFilter('fornitore', value);
  };
  const changeCodiceFornitore = (value) => {
    setFilter('codiceFornitore', value);
  };

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
            <FilterInput filterValue={filters.A || ''} updateValue={changeA} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.A ? <ClearIcon src={x} onClick={() => changeA('')} /> : ''}
          </FilterCell>
          <FilterCell>
            <FilterInput filterValue={filters.B || ''} updateValue={changeB} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.B ? <ClearIcon src={x} onClick={() => changeB('')} /> : ''}
          </FilterCell>
          <FilterCell>
            <FilterInput filterValue={filters.C || ''} updateValue={changeC} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.C ? <ClearIcon src={x} onClick={() => changeC('')} /> : ''}
          </FilterCell>
          <FilterCell>
            <FilterInput filterValue={filters.D || ''} updateValue={changeD} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.D ? <ClearIcon src={x} onClick={() => changeD('')} /> : ''}
          </FilterCell>
          <FilterCell>
            <FilterInput filterValue={filters.E || ''} updateValue={changeE} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.E ? <ClearIcon src={x} onClick={() => changeE('')} /> : ''}
          </FilterCell>
          <FilterCell>
            <FilterInput filterValue={filters.F || ''} updateValue={changeF} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.F ? <ClearIcon src={x} onClick={() => changeF('')} /> : ''}
          </FilterCell>
          <FilterCell>
          <FilterInput filterValue={filters.G || ''} updateValue={changeG} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.G ? <ClearIcon src={x} onClick={() => changeG('')} /> : ''}
          </FilterCell>
          <GrowFilterCell>
            <FilterInput filterValue={filters.descrizione || ''} updateValue={changeDescrizione} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.descrizione ? <ClearIcon src={x} onClick={() => changeDescrizione('')} /> : ''}
          </GrowFilterCell>
          <MediumFilterCell>
            <FilterInput filterValue={filters.produttore || ''} updateValue={changeProduttore} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.produttore ? <ClearIcon src={x} onClick={() => changeProduttore('')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
          <FilterInput filterValue={filters.codiceProduttore || ''} updateValue={changeCodiceProduttore} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.codiceProduttore ? <ClearIcon src={x} onClick={() => changeCodiceProduttore('')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
          <FilterInput filterValue={filters.codiceFornitore || ''} updateValue={changeCodiceFornitore} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.codiceFornitore ? <ClearIcon src={x} onClick={() => changeCodiceFornitore('')} /> : ''}
          </MediumFilterCell>
          <MediumFilterCell>
          <FilterInput filterValue={filters.fornitore || ''} updateValue={changeFornitore} setLoading={setLoading} />
            <SearchIcon src={search} />
            {filters.fornitore ? <ClearIcon src={x} onClick={() => changeFornitore('')} /> : ''}
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
      {
        productsNumber > resultNumberLimit ? 
        <LoadMorebutton onClick={() => getMoreResults()}>Carica altri prodotti</LoadMorebutton> : 
        <div></div>
      }
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
    filters: getProductFilters(state),
    resultNumberLimit: getResultNumberLimit(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () => dispatch(loadProducts()),
    setFilter: (filter, value) => dispatch(setFilter(filter, value)),
    setLoading: () => dispatch(setLoading()),
    deleteProd: (product) => dispatch(deleteProduct(product)),
    editProd: (product) => dispatch(editProduct(product)),
    getMoreResults: () => dispatch(loadMoreResults()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);