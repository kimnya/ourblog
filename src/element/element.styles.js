import styled, { css } from 'styled-components';
import { palette } from '../styles/palette';
import { darken } from '../styles/ColorMixin';

export const ButtonStyle = styled.button`
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

export const InputStyle = styled.input`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  ${({ width = '362px', height = '30px', $borderColor = 'mainGreen', $fontColor = 'maingray' }) => css`
    width: ${width};
    height: ${height};
    color: ${({ theme }) => theme.txtColor};
    border: 1px solid ${palette[$borderColor]};
    &:focus {
      border: 4px solid ${palette[$borderColor]};
    }
    background-color: ${({ theme }) => theme.inputColor};
  `}
`;

export const Modalstyle = styled.div`
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

export const PageStyle = styled.div`
  display: flex;
  margin: 0 auto;
  [aria-current] {
    ${darken(0.2)};
  }
`;
