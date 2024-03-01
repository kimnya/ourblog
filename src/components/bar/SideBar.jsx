import React from 'react';
import CategryList from '../category/CategryList';
import { HiXMark } from 'react-icons/hi2';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SideBarBox, SideBarStyle } from './bar.styles';

const SideBar = ({ sideBarToggleHandler, toggle, reactIconsSize, editToggleHandler }) => {
  return (
    <>
      <SideBarStyle id='sideBar' $toggle={toggle}>
        <RxHamburgerMenu
          size={reactIconsSize}
          onClick={() => {
            sideBarToggleHandler();
            editToggleHandler();
          }}
        />
        <SideBarBox $toggle={toggle}>
          <HiXMark
            size={reactIconsSize}
            onClick={() => {
              sideBarToggleHandler();
              if (!!toggle.edit) {
                editToggleHandler();
              }
            }}
          />
          {!!toggle.sideBar && (
            <CategryList
              sideBarToggleHandler={sideBarToggleHandler}
              toggle={toggle}
              editToggleHandler={editToggleHandler}
            />
          )}
        </SideBarBox>
      </SideBarStyle>
    </>
  );
};

export default SideBar;
