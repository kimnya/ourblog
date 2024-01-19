import React, { useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { Link } from 'react-router-dom';
import EditCtegory from './category/EditCtegory';
import { FaGear } from 'react-icons/fa6';

const CategoryBox = styled.div`
  height: 92vh;
  border-top: 1px solid ${palette.mainGreen};
  box-sizing: border-box;
  > div {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 15px 15px 20px;
    padding-top: 20px;
    font-size: 18px;
    > a,
    p {
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
      margin: 0 15px 15px 20px;
    }
  }
`;

const CategryList = ({ myInfo, isTogle, editToggleHandler }) => {
  return (
    <>
      <CategoryBox>
        <div>
          <Link to={'/'}>Home</Link>
          {isTogle.logined === false ? (
            <p>로그인을 하시면 개인 카테고리가 나옵니다.</p>
          ) : (
            <>
              <p>
                {myInfo.nickname}의 카테고리{' '}
                <span>
                  <FaGear size={'24px'} onClick={editToggleHandler} />
                </span>
              </p>
              <span>전체보기</span>
              {isTogle.edit === true && <EditCtegory myInfo={myInfo} />}
              {myInfo.categories.map((category) => {
                const { id, categoryName } = category; //백엔드코드 업데이트 되면 categoryName으로 바꿔야함

                return (
                  <>
                    <ul key={id}>
                      <li key={id}>{categoryName}</li>
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
