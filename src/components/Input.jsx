import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../styles/palette';

const InputStyled = styled.input`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  ${({ width = '362px', height = '30px', $borderColor = 'mainGreen', $fontColor = 'maingray' }) => css`
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
const Input = forwardRef(

  ({ type = 'text', $placeholder = 'placeholder를 입력해주세요', autoComplete = 'off', ...rest }, ref) => {
    return (
      <>
        <InputStyled type={type} placeholder={$placeholder} ref={ref} autoComplete={autoComplete} {...rest} />

 
      </>
    );
  },
);

export default Input;
