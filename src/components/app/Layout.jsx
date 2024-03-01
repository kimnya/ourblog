import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Outlet } from 'react-router-dom';
import Shadow from './Shadow';
import { IsToggleCtx } from '../../context/IsToggleProvider';

const Layout = () => {
  const { toggle, setToggle } = useContext(IsToggleCtx);
  const reactIconsSize = '22px';
  return (
    <>
      <Shadow toggle={toggle}>
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
