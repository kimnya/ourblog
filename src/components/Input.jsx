import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../styles/palette';

const InputStyled = styled.input`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  ${({ width = '362px', height = '29px', $borderColor = 'mainGreen', $fontColor = 'maingray' }) => css`
    width: ${width};
    height: ${height};
    color: ${palette[$fontColor]};
    border: 1px solid ${palette[$borderColor]};
    &:focus {
      border: 4px solid ${palette[$borderColor]};
    }
  `}
`;
// placehoder를 쓰지 말자는 반응도 있다. 고려해볼것
const Input = ({ type = 'text', $placeholder = 'placeholder를 입력해주세요', ...rest }) => {
  return (
    <>
      <InputStyled type={type} placeholder={$placeholder} {...rest} />
    </>
  );
};

export default Input;
