import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { Link } from 'react-router-dom';

const CategoryBox = styled.div`
  height: 92vh;
  border-top: 3px solid ${palette.mainGreen};
  background-color: bisque;
  > div {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    > a,
    p {
      margin: 0 15px 15px 20px;
      font-size: 24px;
    }
  }
`;

let username = '';

const CategryList = () => {
  return (
    <>
      <CategoryBox>
        <div>
          <Link to={'/'}>Home</Link>
          {username === '' && <p>로그인을 하시면 개인 카테고리가 나옵니다.</p>}
        </div>
      </CategoryBox>
    </>
  );
};

export default CategryList;
