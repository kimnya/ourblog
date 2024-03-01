import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Outlet } from 'react-router-dom';
import Shadow from './Shadow';

const Layout = () => {
  const reactIconsSize = '22px';
  return (
    <>
      <Shadow>
        <Header reactIconsSize={reactIconsSize} />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </Shadow>
    </>
  );
};

export default Layout;
