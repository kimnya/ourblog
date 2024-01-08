import React, { useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';
import SideBar from './SideBar';

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
  });

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

  const moveLogin = () => navigate('/login');
  const userName = '김냐'; //목업데이터

  return (
    <>
      {/* 로그아웃 & 닉네임 띄우는 부분 더 이쁘게 */}
      <HeaderStyled>
        <SideBar isTogle={isTogle} sideBarToggleHandler={sideBarToggleHandler} reactIconsSize={reactIconsSize} />
        <Title />
        <div className='mainpageIcons'>
          {isTogle.darkMode ? (
            <IoSunny size={reactIconsSize} onClick={darkModeToggleHandler} />
          ) : (
            <FaMoon size={reactIconsSize} onClick={darkModeToggleHandler} />
          )}

          <IoSearch size={reactIconsSize} onClick={serchBarToggleHandler} />
          {isTogle.logined === false ? (
            <p>{userName}/로그아웃</p>
          ) : (
            <Button width='50px' height='25px' $fontColor='mainGray' onClick={moveLogin}>
              로그인
            </Button>
          )}
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
