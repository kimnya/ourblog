import React, { useContext, useEffect, useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../element/Button';
import styled from 'styled-components';
import SideBar from '../bar/SideBar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '../../axios/api';
import { useTheme } from '../../context/ThemeProvider';
import { IsToggleCtx } from '../../context/IsToggleProvider';

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

const Header = () => {
  const [ThemeMode, toggleTheme] = useTheme();
  const { isToggle, setToggle } = useContext(IsToggleCtx);

  const navigate = useNavigate();
  const key = sessionStorage.getItem('accessToken');

  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key && localStorage.getItem('email') !== 'admin@naver.com',
  });

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      setToggle((prev) => ({ ...prev, logined: !prev.logined }));
    } else {
      setToggle((prev) => ({ ...prev, logined: false }));
    }
  }, []);

  const logoutSubmit = (evt) => {
    evt.preventDefault();
    navigate('/');
    sessionStorage.clear();
    setToggle((prev) => ({ ...prev, logined: !prev.logined }));
    localStorage.clear();
  };
  const reactIconsSize = '22px';

  return (
    <>
      {/* 로그아웃 & 닉네임 띄우는 부분 더 이쁘게 */}

      <HeaderStyled>
        <Title />
        <div className='mainpageIcons'>
          {ThemeMode === 'light' ? (
            <IoSunny size={reactIconsSize} onClick={toggleTheme} />
          ) : (
            <FaMoon size={reactIconsSize} onClick={toggleTheme} />
          )}
          <IoSearch
            size={reactIconsSize}
            onClick={() => {
              navigate('/search');
            }}
          />
          {!!key && sessionStorage.getItem('email') !== 'admin@naver.com' ? (
            <p>
              {getProfileApi && <Link to='/myPage'>{getProfileApi.data.data.nickname}</Link>}/
              <Link className='adminLogout' onClick={logoutSubmit}>
                로그아웃
              </Link>
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
            <p>
              {sessionStorage.getItem('email') === 'admin@naver.com' && (
                <Link className='adminLogoutBtn' onClick={logoutSubmit}>
                  로그아웃
                </Link>
              )}
              <Button
                width='50px'
                height='25px'
                $fontColor='mainGray'
                onClick={() => {
                  if (sessionStorage.getItem('email') !== 'admin@naver.com') {
                    navigate('/login');
                  }
                }}
              >
                {sessionStorage.getItem('email') === 'admin@naver.com' ? '관리자' : '로그인'}
              </Button>
            </p>
          )}
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
