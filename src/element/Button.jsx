import React from 'react';
import { ButtonStyle } from './element.styles';

const Button = ({ onClick = undefined, children, ...rest }) => {
  return (
    <>
      <ButtonStyle onClick={onClick} {...rest}>
        {children}
      </ButtonStyle>
    </>
  );
};

export default Button;
