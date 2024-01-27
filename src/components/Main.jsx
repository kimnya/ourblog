import React from 'react';
import styled from 'styled-components';

const MainStlye = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 800px;
  justify-content: center;
  align-items: center;
`;

const Main = ({ children }) => {
  return (
    <>
      <MainStlye>{children}</MainStlye>
    </>
  );
};

export default Main;
