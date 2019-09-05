import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { loadProducts, login, resetLoginError } from '../store/actions/actionsCreator';
import { getProducts, getLoginError} from '../store/selectors/selector';

const LoginPanelStyled = styled.div`
  width: 400px;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
  display: flex-box;
  @media (max-width: 768px) {
   margin: 10px;
   width: calc(100vw - 20px);
   border: none;
  }
`;
const InputFieldStyled = styled.input`
  font-size: 16px;
  box-sizing: border-box;
  padding: 2px 5px;
  width: 100%;
  margin-bottom: 10px;
`;
const LabelStyled = styled.label`
  font-size: 14px;
`;
const ErrorLabel = styled.label`
  font-size: 14px;
  color: red;
`;
const ButtonStyled = styled.input`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  color: black;
  :hover {
    background-color: #444444;
    color: white;
  }
  :disabled {
    color: #cccccc;
    cursor: pointer;
    :hover {
      background-color: #eeeeee;
      color: #cccccc;
    }
  }
`;

const Login = ({login, loginError, resetLoginError}) => {
  const [username, setUsername] = useState('test@test.com');
  const [password, setPassword] = useState('provola');

  const userChange = (event) => {
    setUsername(event.target.value);
    resetLoginError();
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    resetLoginError();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  }

  const checkDisable = !username || !password;
  
  return <div>
    <LoginPanelStyled>
      <form onSubmit={(e) => handleSubmit(e)}>
      <LabelStyled>
        Username
      </LabelStyled>
      <InputFieldStyled type="text" value={username} onChange={userChange} ></InputFieldStyled>
     
      <LabelStyled>
        Password
      </LabelStyled>
      <InputFieldStyled type="password" value={password} onChange={passwordChange} ></InputFieldStyled>

      <ErrorLabel> {loginError} </ErrorLabel>
      <ButtonStyled type="submit" value="Login" disabled={checkDisable}></ButtonStyled>
      </form>
    </LoginPanelStyled>
  </div>
}

const mapStateToProps = state => {
  return { 
    productList: getProducts(state),
    loginError: getLoginError(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () => dispatch(loadProducts()),
    //login: () => dispatch(login('test@test,com', 'provola'))
    login: (username, password) => dispatch(login(username, password)),
    resetLoginError: () => dispatch(resetLoginError())
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);