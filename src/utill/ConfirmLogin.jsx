import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const ConfirmLogin = () => {
  const auth = sessionStorage.getItem('accessToken');

  if (!!auth) {
    alert('로그아웃을 해주세요.');
  }

  return !!auth ? <Outlet /> : <Navigate to='/' />;
};

export default ConfirmLogin;
