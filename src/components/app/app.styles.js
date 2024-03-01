import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { lighten } from '../../styles/ColorMixin';

export const FooterStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  address {
    color: ${({ theme }) => theme.txtColor};
  }
`;
export const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  position: relative;
  padding: 0 50px;
  min-height: 80px;

  > div {
  }
  > .mainpageIcons {
    display: flex;
    right: 20px;
    > * {
      margin-left: 20px;
    }
    > p {
      > a {
        &:nth-child(2) {
          margin-right: 30px;
        }
        color: ${({ theme }) => theme.txtColor};
      }
    }
  }
  .adminLogoutBtn {
    margin-right: 10px;
  }
`;

export const MainStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 800px;
  justify-content: center;
  align-items: center;
  position: relative;

  #sideBar {
    position: absolute;
    left: 50px;
    top: 80px;
  }
`;

export const ShadowBox = styled.div`
  display: ${(props) => {
    if (props.$toggle.sideBar) {
      return 'block';
    } else {
      return 'none';
    }
  }};
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${palette.mainGray};
  opacity: 90%;
`;

export const TitleLogo = styled.h1`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  color: ${palette.mainGreen};
  font-weight: bold;
  font-size: 52px;
`;
