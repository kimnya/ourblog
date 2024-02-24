import React, { Children } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

const ShadowBox = styled.div`
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: ${palette.mainGray};
  opacity: 60%;
`;

const Shadow = ({ children }) => {
  return <ShadowBox>{children}</ShadowBox>;
};

export default Shadow;
