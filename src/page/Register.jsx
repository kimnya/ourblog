import React from 'react';
import FormBox from '../components/FormBox';
import Title from '../components/Title';
import axios from 'axios';

const registerSubmit = async (data) => {
  await axios
    .post('http://localhost:8081/api/member/join', {
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8081/', // 서버 domain
      },
      name: data.userName,
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    })
    .then(function (response) {
      if (response.status === 200) {
        alert(`반갑습니다. ${data.userName}님`);
      } else if (response.status === 400) {
        alert('사용중인 아이디입니다.');
      }
    })
    .catch(function (error) {
      console.log('회원가입에 실패했습니다');
    });
};

const Register = () => {
  return (
    <>
      <Title />
      <FormBox type='register' registerSubmit={registerSubmit} />
    </>
  );
};

export default Register;
