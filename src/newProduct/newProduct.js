import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUser, getLatestVersion } from '../store/selectors/selector';
import { getLatestProductVersion, cancelLatestProductVersion } from '../store/actions/actionsCreator';
import { history } from '../App';

const NewProductContainer = styled.div`
  overflow: auto;
  box-sizing: border-box;
  max-height: Calc(100vh - 40px);
  margin-top: 40px;
  @media (max-width: 768px) {
    max-height: Calc(100vh - 80px);
    margin-top: 80px;
  }
`;
const NewProductInstruction = styled.div`
  margin: 20px;
  border 1px solid black;
  padding: 20px;
  box-sizing: border-box;
`;
const NewProductTable = styled.div`
  width: Calc(100% - 40px);
  margin: 20px;
`;
const NewProductTableHeader = styled.div`
  width: 100%;
  font-weight: bold;
  display: inline-flex;
`;
const NewProductTableRow = styled.div`
  width: 100%;
  display: inline-flex;
`;
const NewProductTableHeaderCell = styled.div`
  padding: 10px;
  flex-grow: 1;
  color: white;
  background-color: #444444;
  border: 1px solid #444444;
  border-right-color: white;
  :last-child {
    border-right-color: #444444;
  }
`;
const NewProductTableCell = styled.div`
  padding: 0;
  flex-grow: 1;
  border: 1px solid #444444;
`;
const NewProductInput = styled.input`
  height: 20px;
  outline: none;
  height: 20px;
  width: Calc(100% - 14px);
  padding: 1px 5px;
`;
const NewProductDetailsTable = styled.div`
  width: Calc(100% - 40px);
  margin: 10px 20px;
  display: inline-flex;
`;
const NewProductDetailsTableHeaderCell = styled(NewProductTableHeaderCell)`
  width: 250px;
  flex-grow: 0;
`;
const NewProductTextArea = styled.textarea`
  outline: none;
  height: 40px;
  resize: none;
  width: Calc(100% - 14px);
  padding: 5px;
  border: none;
`;
const CreateButton = styled.div`
    width: Calc(100% - 40px);
    margin: 10px 20px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    background: #cccccc;
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border: 1px solid black;
    :hover {
      background-color: #444444;
      color: white;
    }
`;

const NewProduct = ({user}) => {
  if (!user) {
    history.push('login');
  }
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [e, setE] = useState('');
  const [f, setF] = useState('');
  const [g, setG] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [produttore, setProduttore] = useState('');
  const [codiceProduttore, setCodiceProduttore] = useState('');
  const [codiceFornitore, setCodiceFornitore] = useState('');
  const [fornitore, setFornitore] = useState('');

  useEffect(() => {
    if(a && b && c && d && e && f) {

    }
  }, [a,b,c,d,e,f]);

  const setValue = (filed, e) => {
    switch (filed) {
      case 'A':
        setA(e.target.value);
        break;
      case 'B':
        setB(e.target.value);
        break;
      case 'C':
        setC(e.target.value);
        break;
      case 'D':
        setD(e.target.value);
        break;
      case 'E':
        setE(e.target.value);
        break;
      case 'F':
        setF(e.target.value);
        break;
      case 'descrizione':
            setDescrizione(e.target.value);
            break;
      case 'produttore':
          setProduttore(e.target.value);
        break;
      case 'codiceProduttore':
        setCodiceProduttore(e.target.value);
        break;
      case 'codiceFornitore':
        setCodiceFornitore(e.target.value);
        break;
      case 'fornitore':
        setFornitore(e.target.value);
        break;
      default:
        break;
    };
  }

  const createBAGGICode = () => {
   
  }

  return <NewProductContainer>
    <NewProductInstruction>
      <div>Per creare un nuovo prodotto inserire i primi 6 elementi del codice B.A.G.G.I. e descrizione, produttore e fornitore.</div>
      <div>L'ultimo campo del codice B.A.G.G.I. (il progressivo) verra' calcolato dal sistema.</div>
    </NewProductInstruction>
    <NewProductTable>
      <NewProductTableHeader>
        <NewProductTableHeaderCell>A</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>B</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>C</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>D</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>E</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>F</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>G</NewProductTableHeaderCell>
      </NewProductTableHeader>
      <NewProductTableRow>
        <NewProductTableCell> <NewProductInput value={a} onChange={e => setValue('A', e)}/> </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={b} onChange={e => setValue('B', e)}/> </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={c} onChange={e => setValue('C', e)}/> </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={d} onChange={e => setValue('D', e)}/> </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={e} onChange={e => setValue('E', e)}/> </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={f} onChange={e => setValue('F', e)}/> </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={g} disabled /> </NewProductTableCell>
      </NewProductTableRow>
    </NewProductTable>

    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>Descrizione</NewProductDetailsTableHeaderCell>
      <NewProductTableCell> 
        <NewProductTextArea value={descrizione} onChange={e => setValue('descrizione', e)}/> 
      </NewProductTableCell>
    </NewProductDetailsTable>
    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>produttore</NewProductDetailsTableHeaderCell>
      <NewProductTableCell> 
        <NewProductTextArea value={produttore} onChange={e => setValue('produttore', e)}/> 
      </NewProductTableCell>
    </NewProductDetailsTable>
    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>Codice Produttore</NewProductDetailsTableHeaderCell>
      <NewProductTableCell> 
        <NewProductTextArea value={codiceProduttore} onChange={e => setValue('codiceProduttore', e)}/> 
      </NewProductTableCell>
    </NewProductDetailsTable>
    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>Codice Fornitore</NewProductDetailsTableHeaderCell>
      <NewProductTableCell> 
        <NewProductTextArea value={codiceFornitore} onChange={e => setValue('codiceFornitore', e)}/> 
      </NewProductTableCell>
    </NewProductDetailsTable>
    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>Forintore</NewProductDetailsTableHeaderCell>
      <NewProductTableCell> 
        <NewProductTextArea value={fornitore} onChange={e => setValue('fornitore', e)}/> 
      </NewProductTableCell>
    </NewProductDetailsTable>
  
    <CreateButton>Create Product</CreateButton>
  </NewProductContainer>
}

const mapStateToProps = state => {
  return { 
    user: getUser(state),
    latestVersion: getLatestVersion(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (NewProduct);