import React, { useEffect } from 'react';
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

const CategryList = ({ myInfo, isTogle }) => {
  useEffect(() => {
    console.log('mydata', myInfo);
    // const { categories } = myInfo;
    console.log('mytype', typeof myInfo.categories);
    console.log('log', isTogle.logined);
  }, [myInfo]);

  return (
    <>
      <CategoryBox>
        <div>
          <Link to={'/'}>Home</Link>
          {isTogle.logined === false ? (
            <p>로그인을 하시면 개인 카테고리가 나옵니다.</p>
          ) : (
            <>
              <p>{myInfo.nickname}의 카테고리</p>
              {/* <p> {myInfo.categories} </p> */}

              {myInfo.categories.map((category) => {
                const { id, name } = category;
                return (
                  <>
                    <ul>
                      <li key={id}>{name}</li>
                    </ul>
                  </>
                );
              })}
            </>
          )}
        </div>
      </CategoryBox>
    </>
  );
};

export default CategryList;
