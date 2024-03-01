import React, { useContext } from 'react';
import { ShadowBox } from './app.styles';
import { IsToggleCtx } from '../../context/IsToggleProvider';

const Shadow = ({ children }) => {
  const { toggle, setToggle } = useContext(IsToggleCtx);
  return <ShadowBox toggle={toggle}>{children}</ShadowBox>;
};

export default Shadow;
