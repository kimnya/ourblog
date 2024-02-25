import React from 'react';
import styled from 'styled-components';

const MainStlye = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 800px;
  justify-content: center;
  align-items: center;
  position: relative;

  #sideBar {
    position: absolute;
    left: 50px;
    top: 80px;
  }
`;

const Main = ({ children }) => {
  return (
    <>
      <MainStlye>{children}</MainStlye>
    </>
  );
};

export default Main;
