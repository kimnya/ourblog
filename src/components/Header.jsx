import React, { useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';
import SideBar from './SideBar';

import { useQuery } from '@tanstack/react-query';
import { getInfo } from '../axios/api';
import axios from 'axios';

const HeaderStyled = styled.div`
  position: relative;
  min-height: 100px;
  > * {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  > a {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  > div {
  }
  > .mainpageIcons {
    display: flex;
    right: 20px;
    > * {
      margin-left: 20px;
    }
  }
`;

const Header = () => {
  const [isTogle, setTogle] = useState({
    sideBar: false,
    darkMode: false,
    searchBar: false,
    logined: false,
    edit: false,
    update: false,
  });

  const myInfo = useQuery({
    queryKey: ['myInfo'],
    queryFn: getInfo,
    enabled: localStorage.getItem('accessToken') !== null,
  });

  // localStorage.setItem('nickname', myInfo.data.data['nickname']);

  const navigate = useNavigate();

  const reactIconsSize = '22px';

  const sideBarToggleHandler = () => {
    setTogle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
  };

  const darkModeToggleHandler = () => {
    setTogle((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };
  const serchBarToggleHandler = () => {
    setTogle((prev) => ({ ...prev, searchBar: !prev.searchBar }));
    navigate('/search');
  };

  const editToggleHandler = () => {
    setTogle((prev) => ({ ...prev, edit: !prev.edit }));
  };

  const moveLogin = () => navigate('/login');

  const logoutSubmit = (evt) => {
    evt.preventDefault();
    setTogle((prev) => ({ ...prev, logined: !prev.logined }));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('nickname');
  };

  return (
    <>
      {/* 로그아웃 & 닉네임 띄우는 부분 더 이쁘게 */}

      <HeaderStyled>
        <SideBar
          isTogle={isTogle}
          sideBarToggleHandler={sideBarToggleHandler}
          reactIconsSize={reactIconsSize}
          editToggleHandler={editToggleHandler}
        />
        <Title />
        <div className='mainpageIcons'>
          {isTogle.darkMode ? (
            <IoSunny size={reactIconsSize} onClick={darkModeToggleHandler} />
          ) : (
            <FaMoon size={reactIconsSize} onClick={darkModeToggleHandler} />
          )}
          <IoSearch size={reactIconsSize} onClick={serchBarToggleHandler} />
          {!localStorage.getItem('accessToken') ? (
            <Button width='50px' height='25px' $fontColor='mainGray' onClick={moveLogin}>
              로그인
            </Button>
          ) : (
            <p>
              {myInfo.data.data.nickname}/<Link onClick={logoutSubmit}>로그아웃</Link>{' '}
            </p>
          )}
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
