import React from 'react';
import FormBox from '../components/FormBox';
import Title from '../components/Title';
import axios from 'axios';

const loginSubmit = async (data) => {
  try {
    await axios
      .post('http://localhost:8081/api/member/login', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.status === 200) {
          alert('토큰요청 성공');
          const token = response.headers.authorization;
          window.localStorage.setItem('token', token);
        }
      });
  } catch (e) {
    console.log('토큰요청이 실패했습니다');
  }
  window.localStorage.getItem('token');
  try {
    await axios
      .get('http://localhost:8081/api/member/me', {
        headers: {
          Authorization: token,
          request: token,
        },
      })
      .then((data) => {
        alert(`안녕하세요 ${data.name}님`);
      });
  } catch (e) {
    console.error(e);
  }
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
