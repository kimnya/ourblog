import React, { useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from './components/Router';
import EditDraft from './components/EditDraft';
import EditToastUi from './components/EditToastUi';

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
