import React from 'react';
import { ShadowBox } from './app.styles';

const Shadow = ({ children, toggle }) => {
  return <ShadowBox toggle={toggle}>{children}</ShadowBox>;
};

export default Shadow;
