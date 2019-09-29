import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { importProductData, clearImportResults } from '../store/actions/actionsCreator';
import { getImportResults } from '../store/selectors/selector';

const Container = styled.div`
  box-sizing: border-box;
  max-height: Calc(100vh - 40px);
  margin-top: 40px;
  @media (max-width: 768px) {
    max-height: Calc(100vh - 80px);
    margin-top: 80px;
  }
`;
const ImportTextContainer = styled.div`
  padding: 20px 50px;
  width: 100%;
  height: Calc(100vh - 200px);
  box-sizing: border-box;
  text-align: center;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const ImportText = styled.textarea`
  width: Calc(100% - 8px);
  height: 100%;
  resize: none;
  outline: none;
`;
const InstructionText = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
`;
const LoadButtonContainer = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 50px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
const LoadButton = styled.div`
    width: 100%;
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
const ImportResultsPanel = styled.div`
  width: 60vw;
  height: 70vh;
  background: white;
  position: absolute;
  top: 20vh;
  left: 20vw;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const ImportResults = styled.div`
  padding: 20px;
  width: 100;
  flex-grow: 1;
`;
const Okbutton = styled.div`
  width: 150px;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  text-align: center;
  background: #cccccc;
  color: black;
  border: 1px solid black;
  margin: 15px auto;
  :hover {
    background-color: #444444;
    color: white;
  }
`;
const ResultsTitle = styled.div`
  text-allign: center;
  font-weight: bold;
`;
const Result = styled.div`
  padding: 10px;
  border-bottom: 1px solid black;
`;
const Good = styled.span`
  color: green;
`;
const Bad = styled.span`
  color: red;
`;

const ImportData = ({ importProductData, importResutls, clearImportResults }) => {

  const productDataText = React.createRef();

  return <Container>
    <InstructionText>
      Inserisci i dati contenuti nei file excell esportati in formato .csv. I campi di un prodotto devono essere separati
      da una "," i diversi prodotti devono essere separati da ";"
      <div>
        Ad esempio: S,0,00,PA,FLT,0,005,UN NUOVO PRODOTTO DI PROVA Tee filter 12mm A-Lock - 250 micron,Parker,M12A-FT8-250-S,ERN0009,RTI;
      </div>
    </InstructionText>
    <ImportTextContainer>
      <ImportText ref={productDataText} />
    </ImportTextContainer>
    <LoadButtonContainer>
      <LoadButton onClick={() => importProductData(productDataText.current.value)}>
        Carica prodotti nel database
      </LoadButton>
    </LoadButtonContainer>
    {importResutls ?
      <ImportResultsPanel>

        <ImportResults>
          <ResultsTitle>
            Risultati del caricamento dati
          </ResultsTitle>
          <Result>
            {importResutls.found} prodotti trovati
          </Result>
          {importResutls.good ?
            <Result>
              <Good>
                {importResutls.good} prodotti caricati
              </Good>
            </Result> : ''}
          {importResutls.wrong ?
            <Result>
              <Bad>
                {importResutls.wrong} prodotti incorretti
             </Bad>
            </Result> : ''}
          {importResutls.duplicated ?
            <Result>
              <Bad>
                {importResutls.duplicated} prodotti duplicati
              </Bad>
            </Result> : ''}
        </ImportResults>
        <Okbutton onClick={() => clearImportResults()}>ok</Okbutton>
      </ImportResultsPanel> : ''}
  </Container>
}

const mapStateToProps = state => {
  return {
    importResutls: getImportResults(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    importProductData: (product) => dispatch(importProductData(product)),
    clearImportResults: () => dispatch(clearImportResults())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportData);