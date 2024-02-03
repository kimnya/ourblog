import React, { useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from './components/Router';
import EditDraft from './components/EditDraft';

function App() {
  return (
    <>
      <GlobalStyle />
      <EditDraft />
      {/* <Router /> */}
    </>
  );
}

export default App;
