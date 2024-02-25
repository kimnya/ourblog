import React from 'react';
import CategryList from '../category/CategryList';
import { HiXMark } from 'react-icons/hi2';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SideBarBox, SideBarStyle } from './bar.styles';

const SideBar = ({ sideBarToggleHandler, isTogle, reactIconsSize, editToggleHandler }) => {
  return (
    <>
      <SideBarStyle id='sideBar' $isTogle={isTogle}>
        <RxHamburgerMenu size={reactIconsSize} onClick={sideBarToggleHandler} />
        <SideBarBox $isTogle={isTogle}>
          <HiXMark size={reactIconsSize} onClick={sideBarToggleHandler} />
          {!!isTogle.sideBar && (
            <CategryList
              sideBarToggleHandler={sideBarToggleHandler}
              isTogle={isTogle}
              editToggleHandler={editToggleHandler}
            />
          )}
        </SideBarBox>
      </SideBarStyle>
    </>
  );
};

export default SideBar;
