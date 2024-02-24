import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { lighten, opacity } from '../styles/ColorMixin';

const Modalstyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20%;
  top: -146px;
  width: 300px;
  height: 50px;
  background-color: #eee;
  color: #333;
  border-radius: 5px;
  z-index: 100;

  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;
`;

const Modal = ({ children }) => {
  return <Modalstyle>{children}</Modalstyle>;
};

export default Modal;
