import styled from 'styled-components';
import { palette } from '../../styles/palette';

export const CategoryBox = styled.div`
  position: relative;
  height: 92vh;
  border-top: 1px solid ${palette.mainGreen};
  box-sizing: border-box;

  > div {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    margin: 0 15px 15px 0;
    padding-top: 20px;
    font-size: 18px;

    > a,
    p {
      margin: 15px;
      font-size: 24px;
    }
    > span {
      margin: 15px 0px;
    }
    > p {
      display: flex;
      align-items: center;
      > span {
        margin-left: 5px;
        transition: all 0.8s;
      }
      > span:hover {
        transform: scale(1.2);
      }
    }

    ul > li {
      margin: 15px 15px 15px 25px;
    }
  }

  #all {
    margin-left: 15px;
  }
`;

export const EditCtegoryStyle = styled.div`
  position: absolute;
  left: 0;
  top: 184px;
  width: 100%;
  background-color: #fff;
  font-size: 18px;
  > div {
    display: flex;
    align-items: center;
    margin-left: 15px;
    > span {
      margin-right: 5px;
    }
  }
  li {
    display: flex;
    justify-content: center;
    align-items: baseline;
    > span {
      align-self: center;
      margin-left: 5px;
    }
  }
  > div {
    margin: 20px 15px 15px 20px;
  }
  > form {
    width: 100%;
    label {
      display: none;
    }
  }
`;
