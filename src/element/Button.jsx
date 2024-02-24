import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../styles/palette';
import { darken } from '../styles/ColorMixin';

const ButtonStyled = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;

  ${({
    width = '50px',
    $height = '25px',
    $buttonColor = 'mainGreen',
    $fontColor = 'white',
    $fontSize = '12px',
    $fontWeight = 'bold',
    $borderRadius = '4px',
  }) => css`
    width: ${width};
    height: ${$height};
    color: ${palette[$fontColor]};
    font-weight: ${$fontWeight};
    font-size: ${$fontSize};
    background-color: ${palette[$buttonColor]};
    border-radius: ${$borderRadius};
    &:disabled {
      ${darken(0.2)};
    }
  `}
`;

const Button = ({ onClick = undefined, children, ...rest }) => {
  return (
    <>
      <ButtonStyled onClick={onClick} {...rest}>
        {children}
      </ButtonStyled>
    </>
  );
};

export default Button;
