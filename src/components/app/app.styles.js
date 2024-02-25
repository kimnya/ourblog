import styled from 'styled-components';

export const FooterStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  address {
    color: ${({ theme }) => theme.txtColor};
  }
`;
