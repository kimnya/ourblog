import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { Link } from 'react-router-dom';

const CategoryBox = styled.div`
  height: 92vh;
  border-top: 1px solid ${palette.mainGreen};
  box-sizing: border-box;
  > div {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    > a,
    p {
      margin: 0 15px 15px 20px;
      font-size: 24px;
    }
    ul > li {
      margin: 0 15px 15px 20px;
      font-size: 18px;
    }
  }
`;

let nickname = JSON.parse(localStorage.getItem('myInfo')).nickname;
const categories = JSON.parse(localStorage.getItem('myInfo')).categories;

const CategryList = () => {
  return (
    <>
      <CategoryBox>
        <div>
          <Link to={'/'}>Home</Link>
          {nickname === '' ? <p>로그인을 하시면 개인 카테고리가 나옵니다.</p> : <p>{nickname}의 카테고리</p>}
          {categories.map((category) => {
            const { id, name, posting } = category;
            return (
              <>
                <ul>
                  <li key={id}>{name}</li>
                </ul>
              </>
            );
          })}
        </div>
      </CategoryBox>
    </>
  );
};

export default CategryList;
