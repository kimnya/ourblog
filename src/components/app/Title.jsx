import React from 'react';
import { Link } from 'react-router-dom';
import { TitleLogo } from './app.styles';

const Title = () => {
  return (
    <Link to={'/'}>
      <TitleLogo>ourblog</TitleLogo>
    </Link>
  );
};

export default Title;
