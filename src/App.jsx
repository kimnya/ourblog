import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import Layout from './components/Layout';
import { Outlet } from 'react-router-dom';
import Router from './components/Router';

function App() {
  return (
    <>
      <GlobalStyle />

      <Router />
    </>
  );
}

export default App;
