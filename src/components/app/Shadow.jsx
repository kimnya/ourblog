import React from 'react';
import { ShadowBox } from './app.styles';

const Shadow = ({ toggle, sideBarToggleHandler }) => {
  return <ShadowBox $toggle={toggle} onClick={sideBarToggleHandler}></ShadowBox>;
};

export default Shadow;
