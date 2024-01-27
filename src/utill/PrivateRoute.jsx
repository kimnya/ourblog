import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const auth = localStorage.getItem('accessToken');

  if (!auth) {
    alert('로그인이 필요한 기능입니다.');
  }

  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
