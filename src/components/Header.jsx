import React, { createContext, useCallback, useEffect, useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';
import SideBar from './SideBar';
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

export const CtxMyInfo = createContext(null);
export const CtxSetMyInfo = createContext(null);

const Header = () => {
  const [myInfo, setMyInfo] = useState([]);

  const [isTogle, setTogle] = useState({
    sideBar: false,
    darkMode: false,
    searchBar: false,
    logined: false,
    edit: false,
    update: false,
  });

  const getInfo = async () => {
    await axios
      .get('http://localhost:8081/member/info', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        setMyInfo(response.data);
        setTogle((prev) => ({ ...prev, logined: true }));
        // console.log(response.data);
        localStorage.setItem('nickname', response.data['nickname']);
        // console.log(response.data['categories']);
      })
      .catch((error) => {
        error.message;
      });
  };

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
    setMyInfo([]);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('nickname');
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getInfo();
    }
  }, [localStorage.getItem('accessToken')]);

  return (
    <>
      {/* 로그아웃 & 닉네임 띄우는 부분 더 이쁘게 */}

      <CtxSetMyInfo.Provider value={setMyInfo}>
        <CtxMyInfo.Provider value={myInfo}>
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
              {isTogle.logined === false ? (
                <Button width='50px' height='25px' $fontColor='mainGray' onClick={moveLogin}>
                  로그인
                </Button>
              ) : (
                <p>
                  {myInfo.nickname}/<Link onClick={logoutSubmit}>로그아웃</Link>{' '}
                </p>
              )}
            </div>
          </HeaderStyled>
        </CtxMyInfo.Provider>
      </CtxSetMyInfo.Provider>
    </>
  );
};

export default Header;
