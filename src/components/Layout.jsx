import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Outlet } from 'react-router-dom';
import Shadow from './Shadow';

const Layout = () => {
  const [isTogle, setTogle] = useState({
    sideBar: false,
    edit: false,
  });

  const sideBarToggleHandler = () => {
    setTogle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
  };

  const editToggleHandler = () => {
    setTogle((prev) => ({ ...prev, edit: !prev.edit }));
  };

  const darkModeToggleHandler = () => {
    setTogle((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const reactIconsSize = '22px';
  return (
    <>
      {/* <Shadow> */}
      <Header isTogle={isTogle} reactIconsSize={reactIconsSize} darkModeToggleHandler={darkModeToggleHandler} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      {/* </Shadow> */}
    </>
  );
};

export default Layout;
