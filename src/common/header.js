import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { logout } from '../store/actions/actionsCreator';
import { getUser } from '../store/selectors/selector';

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
`;
const Logout = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
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
  position: fixed;
  top: 0px;
  right: 70px;
  margin-right: 20px;
  padding: 8px;
  text-align: right;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = ({logout, user}) => {

  return <HeaderContainer>
    <HeaderContent>
      <Title> Catalogo B.A.G.G.I </Title>
      {user ? <UserName> {user.email} </UserName> : ''}
      {user ? <Logout onClick={() => logout()}>Logout</Logout> : ''}
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