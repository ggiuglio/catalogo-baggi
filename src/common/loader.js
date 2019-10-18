import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import loader from '../assets/loading.gif';
import { isLoading } from '../store/selectors/selector';
const LoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f4f4f4;
    opacity: 0.9;
    position: fixed;
    z-index: 99999;
  `;
 
  const Image = styled.img`
    height: 100px;
    width: 100px;
    margin-top: 200px;
    margin-left: Calc(50% - 50px);
  `;
  const Label = styled.div`
    width: 100%;
    text-align: center;
    font-size: 22px;
  `;

const Loader = ({loading}) => {  
  return <div>
    { loading ? <LoaderContainer>
      <Image src={loader} />
      <Label>Loading...</Label>
    </LoaderContainer> : ''}
  </div>
} 

const mapStateToProps = state => {
return { 
    loading: isLoading(state)
  }
};

const mapDispatchToProps = dispatch => {
return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader)