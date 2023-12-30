import React from 'react';
import FormBox from '../components/FormBox';
import Title from '../components/Title';

const loginSubmit = () => {
  alert('로그인 완료!');
};

const Login = () => {
  return (
    <>
      <Title />
      <FormBox type='login' loginSubmit={loginSubmit} />
    </>
  );
};

export default Login;
