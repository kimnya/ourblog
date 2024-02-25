import React, { forwardRef } from 'react';
import { InputStyle } from './element.styles';

const Input = forwardRef(
  ({ type = 'text', $placeholder = 'placeholder를 입력해주세요', autoComplete = 'off', ...rest }, ref) => {
    return <InputStyle type={type} placeholder={$placeholder} ref={ref} autoComplete={autoComplete} {...rest} />;
  },
);

export default Input;
