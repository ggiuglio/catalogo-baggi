import React, { useState } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { logout } from '../store/actions/actionsCreator';
import { getUser } from '../store/selectors/selector';
import { history } from '../App';

const HeaderContainer = styled.div`
  width: 100vw;
  height: 44px;
  background-color: white;
  z-index: 999;
  position: fixed;
  top: 0;
`;
const HeaderContent = styled.div`
  width: 100vw;
  height: 40px;
  border-bottom: 2px solid #444444;
  display: inline-flex;
  @media (max-width: 768px) {
    display: block;
  }
`;
const Logout = styled.div`
  padding: 9px 15px;
  background-color: #eeeeee;
  :hover {
    background-color: #444444;
    color: white;
    cursor: pointer;
  }
`;
const Title = styled.div`
  text-align: center;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 8px;
  font-weight: bold;
`;
const UserName = styled.div`
  margin-right: 20px;
  padding: 8px;
  text-align: right;
  @media (max-width: 768px) {
    display: none;
  }
`;
const UserControls = styled.div`
  display: flex;
`;
const Tabs = styled.div`
  display: flex;
  @media (max-width: 768px) {
    min-width: 100Vw;
    height: 40px;
  }
`;

const Name = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tab = styled.div`
  width: 120px;
  padding: 10px;
  border-right: 1px solid black;
  text-align: center;
  cursor: pointer;
  background-color: ${({selected}) => selected ? '#cccccc' : '#ffffff' };
  @media (max-width: 768px) {
    width: fit-content;
    flex-grow: 1;
  }
`;
const Bar = styled.div`
  display: inline-flex; 
  flex-grow: 1;
  @media (max-width: 768px) {
    height: 40px;
    width: 100vw;
    margin-top: 10px;
  }
`;

const Header = ({logout, user}) => {
  const [selectedTab, changeTab] = useState(history.location.pathname);

  

  const goToPage = (page) => {
    changeTab(`/${page}`);
    setTimeout(() =>  history.push(page), 100);
  };

  const selectedTabName = () => {
    switch (selectedTab) {
      case '/prodotti':
        return 'Prodotti';
      case '/nuovo-prodotto':
        return 'Nuovo Prodotto';
      case '/import':
        return 'Caricameto da Excell';
      default:
        return '';
    }
  }

  return <HeaderContainer>
    <HeaderContent>
      <Tabs>
        <Tab selected={selectedTab === '/prodotti'} onClick={() => goToPage('prodotti')}>
          Prodotti
        </Tab>
        <Tab selected={selectedTab === '/nuovo-prodotto'} onClick={() => goToPage('nuovo-prodotto')}>
          Nuovo prodotto
        </Tab>
        <Tab selected={selectedTab === '/import'} onClick={() => goToPage('import')}>
          Caricameto Dati
        </Tab>
      </Tabs>
      <Bar>
        <Title> 
          <Name>Catalogo B.A.G.G.I - </Name>{selectedTabName()} </Title>
        <UserControls>
          {user ? <UserName> {user.email} </UserName> : ''}
          {user ? <Logout onClick={() => logout()}>Logout</Logout> : ''}
        </UserControls>
      </Bar>
    </HeaderContent>
  </HeaderContainer>
} 

const mapStateToProps = state => {
  return { 
    user: getUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)