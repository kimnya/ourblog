import React from 'react';
import { ShadowBox } from './app.styles';

const Shadow = ({ toggle, sideBarToggleHandler, editToggleHandler }) => {
  return (
    <ShadowBox
      $toggle={toggle}
      onClick={() => {
        sideBarToggleHandler();
        if (!!toggle.edit) {
          editToggleHandler();
        }
      }}
    ></ShadowBox>
  );
};

export default Shadow;
