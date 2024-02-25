import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const reactIconsSize = '22px';
  return (
    <>
      <Header reactIconsSize={reactIconsSize} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
