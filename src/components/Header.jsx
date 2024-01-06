import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSunny } from 'react-icons/io5';
import SideBar from './SideBar';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  margin-top: 15px;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
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
      {/* <SideBar isTogle={isTogle} sideBarToggleHandler={sideBarToggleHandler} /> */}
      <HeaderStyled>
        <RxHamburgerMenu size={reactIconsSize} onClick={sideBarToggleHandler} />
        <Title />
        <div>
          {isTogle.darkMode ? (
            <IoSunny size={reactIconsSize} onClick={darkModeToggleHandler} />
          ) : (
            <FaMoon size={reactIconsSize} onClick={darkModeToggleHandler} />
          )}

          <IoSearch size={reactIconsSize} onClick={serchBarToggleHandler} />
          {isTogle.logined === true ? (
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
