import React, { useContext, useEffect } from 'react';
import { IoSunny } from 'react-icons/io5';
import Title from './Title';
import { FaMoon } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../element/Button';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../axios/api';
import { useTheme } from '../../context/ThemeProvider';
import { IsToggleCtx } from '../../context/IsToggleProvider';
import { HeaderStyle } from './app.styles';
import SideBar from '../bar/SideBar';
import Shadow from './Shadow';

const Header = () => {
  const [ThemeMode, toggleTheme] = useTheme();
  const { toggle, setToggle } = useContext(IsToggleCtx);

  const navigate = useNavigate();
  const key = sessionStorage.getItem('accessToken');

  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key && sessionStorage.getItem('email') !== 'admin@naver.com',
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

  const editToggleHandler = () => {
    setToggle((prev) => ({ ...prev, edit: !prev.edit }));
  };
  const sideBarToggleHandler = () => {
    setToggle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
  };
  const reactIconsSize = '22px';

  return (
    <>
      <HeaderStyle>
        <Shadow toggle={toggle} onClick={sideBarToggleHandler} />
        {sessionStorage.getItem('email') !== 'admin@naver.com' && (
          <SideBar
            toggle={toggle}
            reactIconsSize={reactIconsSize}
            sideBarToggleHandler={sideBarToggleHandler}
            editToggleHandler={editToggleHandler}
          />
        )}

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
      </HeaderStyle>
    </>
  );
};

export default Header;
