import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';

const TitleLogo = styled.h1`
  color: ${palette.mainGreen};
  font-weight: bold;
  font-size: 52px;
`;

const Title = () => {
  return <TitleLogo>ourblog</TitleLogo>;
};

export default Title;
