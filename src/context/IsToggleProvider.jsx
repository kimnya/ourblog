import React, { createContext, useState } from 'react';

export const IsToggleCtx = createContext({});

const IsToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState({
    sideBar: false,
    edit: false,
    logined: false,
    nickname: false,
    email: false,
    password: false,
    image: false,
    admin: false,
  });
  return (
    <>
      <IsToggleCtx.Provider value={{ toggle, setToggle }}>{children}</IsToggleCtx.Provider>
    </>
  );
};

export default IsToggleProvider;
