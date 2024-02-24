import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  address {
    color: ${({ theme }) => theme.txtColor};
  }
`;
const Footer = () => {
  return (
    <>
      <FooterStyled>
        <address>COPYRIGHTⓒ All rights reserved ㅣ Designed by our.</address>
      </FooterStyled>
    </>
  );
};

export default Footer;
