import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { Link } from 'react-router-dom';
import EditCtegory from './category/EditCtegory';
import { FaGear } from 'react-icons/fa6';
import { CtxMyInfo } from './Header';
import { FaCheck } from 'react-icons/fa6';

const CategoryBox = styled.div`
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

    > div {
      margin-left: 15px;
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
  }
  #all {
    margin-left: 15px;
  }
`;

const CategryList = ({ isTogle, editToggleHandler }) => {
  const myInfo = useContext(CtxMyInfo);

  return (
    <>
      <CategoryBox>
        <div>
          <div>
            <Link to={'/'}>Home</Link>
            {isTogle.logined === false ? (
              <p>로그인을 하시면 개인 카테고리가 나옵니다.</p>
            ) : (
              <>
                <p>
                  {myInfo.nickname}의 카테고리
                  <span>
                    <FaGear size={'24px'} onClick={editToggleHandler} />
                  </span>
                  {isTogle.edit === true && (
                    <span>
                      <FaCheck
                        color={palette.mainGreen}
                        size={'24px'}
                        onClick={() => {
                          if (isTogle.edit) {
                            editToggleHandler();
                          }
                        }}
                      />
                    </span>
                  )}
                </p>

                <span id='all'>전체보기</span>
                {isTogle.edit === true && <EditCtegory />}
                {myInfo.nickname !== '' &&
                  myInfo.categories.map((category) => {
                    const { id, categoryName } = category;

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
        </div>
      </CategoryBox>
    </>
  );
};

export default CategryList;
