import React, { useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from './components/Router';

function App() {
  return (
    <>
      <GlobalStyle />

      <Router />
      {/* <EditToastUi /> */}
    </>
  );
}

export default App;
