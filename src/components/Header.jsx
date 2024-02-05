import React, { useEffect, useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';
import SideBar from './SideBar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '../axios/api';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
        margin-right: 30px;
      }
    }
  }
`;

const Header = () => {
  const key = localStorage.getItem('accessToken');
  const [isTogle, setTogle] = useState({
    darkMode: false,
    logined: false,
  });

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setTogle((prev) => ({ ...prev, logined: !prev.logined }));
    }
  }, []);
  const darkModeToggleHandler = () => {
    setTogle((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };
  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key,
  });
  // console.log('header profile', getProfileApi);
  const navigate = useNavigate();

  const logoutSubmit = (evt) => {
    evt.preventDefault();
    localStorage.removeItem('accessToken');
    setTogle((prev) => ({ ...prev, logined: !prev.logined }));
  };
  const reactIconsSize = '22px';

  return (
    <>
      {/* 로그아웃 & 닉네임 띄우는 부분 더 이쁘게 */}

      <HeaderStyled>
        <Title />
        <div className='mainpageIcons'>
          {isTogle.darkMode ? (
            <IoSunny size={reactIconsSize} onClick={darkModeToggleHandler} />
          ) : (
            <FaMoon size={reactIconsSize} onClick={darkModeToggleHandler} />
          )}
          <IoSearch
            size={reactIconsSize}
            onClick={() => {
              navigate('/search');
            }}
          />
          {!!key ? (
            <p>
              {getProfileApi && getProfileApi.data.nickname}/<Link onClick={logoutSubmit}>로그아웃</Link>
              <Button
                width='80px'
                onClick={() => {
                  navigate('/articleAll');
                }}
              >
                내블로그
              </Button>
            </p>
          ) : (
            <Button
              width='50px'
              height='25px'
              $fontColor='mainGray'
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </Button>
          )}
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
