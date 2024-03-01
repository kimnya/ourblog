import React from 'react';
import { MainStyle } from './app.styles';

const Main = ({ children }) => {
  return (
    <>
      <MainStyle>{children}</MainStyle>
    </>
  );
};

export default Main;
