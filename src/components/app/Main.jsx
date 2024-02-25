import React from 'react';
import { MainStlye } from './app.styles';

const Main = ({ children }) => {
  return (
    <>
      <MainStlye>{children}</MainStlye>
    </>
  );
};

export default Main;
