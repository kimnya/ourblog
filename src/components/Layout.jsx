import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Outlet } from 'react-router-dom';
import Shadow from './Shadow';

const Layout = () => {
  return (
    <>
      {/* <Shadow> */}

      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />

      {/* </Shadow> */}
    </>
  );
};

export default Layout;
