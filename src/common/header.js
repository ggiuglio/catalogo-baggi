import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { logout } from '../store/actions/actionsCreator';
import { getUser } from '../store/selectors/selector';

const HeaderContainer = styled.div`
  width: 100vw;
  height: 40px;
  border-bottom: 1px solid #cccccc;
  display: inline-flex;
`;
const Logout = styled.div`
  float: right;
  padding: 8px 15px;
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
  width: 200px;
  margin-right: 20px;
  padding: 8px;
  text-align: right;
`;

const Header = ({logout, user}) => {
  const Title = styled.div`
  text-align: center;
  flex-grow: 1;
  padding: 8px;
  padding-left: ${user ? '324px' : '8px'};
  font-weight: bold;
`;

  return <HeaderContainer>
    <Title> Catalogo B.A.G.G.I </Title>
    {user ? <UserName> {user.email} </UserName> : ''}
    {user ? <Logout onClick={() => logout()}>Logout</Logout> : ''}
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