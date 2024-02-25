import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const ConfirmLogin = () => {
  const auth = sessionStorage.getItem('accessToken');

  if (!!auth) {
    return <div>이미 로그인 상태입니다.</div>;
  }

  return auth ? <Navigate to='/' /> : <Outlet />;
};

export default ConfirmLogin;
