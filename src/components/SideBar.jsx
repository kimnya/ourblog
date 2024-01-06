import React, { useState } from 'react';
import styled from 'styled-components';
import CategryList from './CategryList';
import { HiXMark } from 'react-icons/hi2';

const SideBarStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  /* position: absolute; */
  /* left: ${(props) => {
    if (props.$isTogle.sideBar) {
      return '15vw';
    } else {
      return '-999px';
    }
  }}; */
  width: 15vw;
  height: 100vh;
  background-color: aqua;
  transition: all 0.5s;
  & > svg {
    margin: 10px;
  }
`;

const SideBar = ({ sideBarToggleHandler, isTogle }) => {
  return (
    <SideBarStyle $isTogle={isTogle}>
      <HiXMark size={'40px'} onClick={sideBarToggleHandler} />
      <CategryList />
    </SideBarStyle>
  );
};

export default SideBar;
