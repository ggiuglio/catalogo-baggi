import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUser, getLatestVersion, getLatestTipo } from '../store/selectors/selector';
import { calculateLatestProductVersion,
         calculateLatestOiProductVersion,
         cancelLatestProductVersion, 
         createNewProduct 
        } from '../store/actions/actionsCreator';
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
  width: inherit;
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
  width: inherit;
`;
const NewProductInput = styled.input`
  outline: none;
  height: 25px;
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
  min-width: 200px;
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
const NewProductSelect = styled.select`
  height: 30px;
  outline: none;
  width: 100%;
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

const NewProduct = ({user, getVersion, cancelVersion, newVersion, createProduct, getOiVersion, newTipo}) => {
  if (!user) {
    history.push('login');
  }
  const [a, setA] = useState('S');
  const [b, setB] = useState('0');
  const [c, setC] = useState('00');
  const [d, setD] = useState('');
  const [e, setE] = useState('');
  const [f, setF] = useState('0');
  const [descrizione, setDescrizione] = useState('');
  const [produttore, setProduttore] = useState('');
  const [codiceProduttore, setCodiceProduttore] = useState('');
  const [fornitori, setFornitori] = useState([{codiceFornitore: '', fornitore: ''}]);

  useEffect(() => {
    if(a && b && c && d && e && f) {
      const productDetials = {
        A: a,
        B: b,
        C: c,
        D: d,
        E: e,
        F: f
      };
      if(d.toLowerCase() === 'oi') {
        getOiVersion(productDetials);
      } else {
        getVersion(productDetials);
      }
    } else {
      cancelVersion()
    }
  }, [a,b,c,d,e,f, getVersion, getOiVersion, cancelVersion]);
 // A: S, V
 // B: 0, S, L, G
 // C: 00, 01, 02...
 // D: 2 caratteri solo lettere o numeri
 // E: 3 caratterei solo lettere o numeri
 // F: drop down list un numero 0-6
  const setValue = (filed, e) => {
    switch (filed) {
      case 'A':
        setA(e.target.value);
        break;
      case 'B':
        setB(e.target.value);
        break;
      case 'C':
        setC(e.target.value.replace(/[^\d]/gi, '').substr(0, 2).toUpperCase());
        break;
      case 'D':
        setD(e.target.value.replace(/[^A-Z\d]/gi, '').substr(0, 2).toUpperCase());
        break;
      case 'E':
        setE(e.target.value.replace(/[^A-Z\d]/gi, '').substr(0, 3).toUpperCase());
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
      default:
        break;
    };
  }
  
  const setFronitoreValue = (value, type, id) => {
    const fornitoriList = JSON.parse(JSON.stringify(fornitori));
    fornitoriList.forEach((f, i) => {
      if(i === id && type === 'fornitore') {
        f.fornitore = value;
      }
      if(i === id && type === 'codiceFornitore') {
        f.codiceFornitore = value;
      }
    });
    setFornitori(fornitoriList);
  }

  const createBAGGICode = () => {
    if(c.length === 2 && d.length === 2 && e.length === 3) {
      const newProd = {
        A: a,
        B: b,
        C: c,
        D: d,
        E: e,
        F: f,
        G: newVersion,
        descrizione: descrizione,
        produttore: produttore,
        codiceProduttore: codiceProduttore,
        fornitori: fornitori
      }
      createProduct(newProd);
      history.push('/prodotti');
    }
  }

  return <NewProductContainer>
    <NewProductInstruction>
      <div>Per creare un nuovo prodotto inserire i primi 6 elementi del codice B.A.G.G.I. e descrizione, produttore e fornitore.</div>
      <div>L'ultimo campo del codice B.A.G.G.I. (il progressivo) verra' calcolato dal sistema.</div>
    </NewProductInstruction>
    <NewProductTable>
      <NewProductTableHeader>
        <NewProductTableHeaderCell>Divisione</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>Stato</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>Mercato</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>Origine</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>Famiglia</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>Tipo</NewProductTableHeaderCell>
        <NewProductTableHeaderCell>Versione</NewProductTableHeaderCell>
      </NewProductTableHeader>
      <NewProductTableRow>
        <NewProductTableCell> 
          <NewProductSelect value={a} onChange={e => setValue('A', e)}>
            <option value="S">Sensevolution</option>
            <option value="V">Voicevolution</option>
            <option value="C">Cibus</option>
          </NewProductSelect> 
        </NewProductTableCell>
        <NewProductTableCell> 
          <NewProductSelect value={b} onChange={e => setValue('B', e)}>
            <option value="0">Generico</option>
            <option value="S">Solido</option>
            <option value="L">Liquido</option>
            <option value="G">Gas</option>
          </NewProductSelect> 
        </NewProductTableCell>
        <NewProductTableCell>
          <NewProductSelect value={c} onChange={e => setValue('C', e)}>
            <option value="00">Tutti i mercati</option>
            <option value="01">Tabacco</option>
            <option value="02">Energetico</option>
            <option value="03">Tessile, Carta, Plastica, varie</option>
            <option value="04">Chimico</option>
            <option value="05">Alimentare</option>
            <option value="06">Bioenergie</option>
            <option value="07">Farmaceutico</option>
            <option value="09">Petrolchimico</option>
            <option value="12">Siderurgico</option>
          </NewProductSelect> 
        </NewProductTableCell>
        <NewProductTableCell> 
          <NewProductInput maxlength="2" value={d} onChange={e => setValue('D', e)}/> 
        </NewProductTableCell>
        <NewProductTableCell> 
          <NewProductInput maxlength="3" value={e} onChange={e => setValue('E', e)}/> 
        </NewProductTableCell>
        <NewProductTableCell> 
          <NewProductSelect value={newTipo ? newTipo : f} onChange={e => setValue('F', e)}>
            <option value="0">Prodotti</option>
            <option value="1">Ricambi</option>
            <option value="2">Certificati/Documenti</option>
            <option value="3">Service</option>
            <option value="4">Consumabili</option>
            <option value="5">Demo</option>
            <option value="6">Distinte non prodotto</option>
          </NewProductSelect> 
        </NewProductTableCell>
        <NewProductTableCell> <NewProductInput value={newVersion ? newVersion : ''} disabled /> </NewProductTableCell>
      </NewProductTableRow>
    </NewProductTable>

    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>Descrizione</NewProductDetailsTableHeaderCell>
      <NewProductTableCell> 
        <NewProductTextArea value={descrizione} onChange={e => setValue('descrizione', e)}/> 
      </NewProductTableCell>
    </NewProductDetailsTable>
    <NewProductDetailsTable>
      <NewProductDetailsTableHeaderCell>Produttore</NewProductDetailsTableHeaderCell>
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

    <NewProductDetailsTableHeaderCell>Elenco Fornitori</NewProductDetailsTableHeaderCell>
    { fornitori ? fornitori.map( (f, i) =>
      <NewProductDetailsTable key={i}>
        <NewProductDetailsTableHeaderCell>Codice Fornitore</NewProductDetailsTableHeaderCell>
        <NewProductTableCell> 
          <NewProductTextArea value={f.codiceFornitore} onChange={e => setFronitoreValue(e.target.value, 'codiceFornitore', i)}/> 
        </NewProductTableCell>
        <NewProductDetailsTableHeaderCell>Fornitore</NewProductDetailsTableHeaderCell>
        <NewProductTableCell> 
          <NewProductTextArea value={f.fornitore} onChange={e => setFronitoreValue(e.target.value, 'fornitore', i)}/> 
        </NewProductTableCell>
      </NewProductDetailsTable>
    ) : '' }
  
    <CreateButton onClick={() => createBAGGICode()}>Crea Prodotto</CreateButton>
  </NewProductContainer>
}

const mapStateToProps = state => {
  return { 
    user: getUser(state),
    newVersion: getLatestVersion(state),
    newTipo: getLatestTipo(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getVersion: product => dispatch(calculateLatestProductVersion(product)),
    getOiVersion: product => dispatch(calculateLatestOiProductVersion(product)),
    cancelVersion: () => dispatch(cancelLatestProductVersion()),
    createProduct: (product) => dispatch(createNewProduct(product))
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (NewProduct);