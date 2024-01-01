import React from 'react';
import FormBox from '../components/FormBox';
import Title from '../components/Title';
import axios from 'axios';

const loginSubmit = async (data) => {
  await axios
    .post(`/api/member/login`, {
      email: data.email,
      password: data.password,
    })
    .then(function (response) {
      if (response.status === 200) {
        alert(`반갑습니다. ${data.email}님`);
      } else if (response.status === 400) {
        console.log('아이디와 비밀번호를 확인해주세요.');
      }
    })
    .catch(function (error) {
      console.log('로그인에 실패했습니다');
    });
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
