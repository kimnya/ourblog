import React from 'react';
import Register from './Register';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = () => {
  return (
    <>
      <div>메인페이지입니다.</div> <br />
      <Link to='/register'>회원가입</Link>
      <Link to='/login'>로그인</Link>
    </>
  );
};

export default Main;
