import styled from 'styled-components';

export const SearchArticleListStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;

  > div {
    margin-bottom: 30px;
  }
`;

export const SearchForm = styled.form`
  margin-bottom: 30px;
  > label {
    display: none;
  }
`;

export const SideBarStyle = styled.div`
  left: 0;
  z-index: 100;
`;

export const SideBarBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  position: absolute;
  left: ${(props) => {
    if (props.$toggle.sideBar) {
      return '0px';
    } else {
      return '-999px';
    }
  }};
  top: 0px;
  width: 15vw;
  height: 100vh;
  background-color: #fff;
  transition: all 0.5s;
  > svg {
    margin: 0px 0px 20px 20px;
  }
`;
