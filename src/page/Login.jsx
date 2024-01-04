import React from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  height: 160px;
  & label {
    display: none;
  }
  & small {
    width: 362px;
    color: red;
    font-size: 12px;
  }
`;
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
          const token = response.data.token;
          window.localStorage.setItem('token', token);
        }
      });
  } catch (e) {
    console.log('토큰요청이 실패했습니다');
  }
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  return (
    <>
      <Title />
      <Form
        onSubmit={handleSubmit((data) => {
          loginSubmit(data);
        })}
      >
        <label htmlFor='email'>email</label>
        <Input
          {...register('email', {
            required: 'email을 입력해주세요.',
          })}
          type='email'
          id='email'
          $placeholder='email'
        />

        {errors.email && <small>{errors.email.message}</small>}
        <label htmlFor='password'>password</label>
        <Input
          {...register('password', {
            required: 'password를 입력해주세요.',
          })}
          type='password'
          id='password'
          $placeholder='password'
        />
        {errors.password && <small>{errors.password.message}</small>}

        <Button disabled={isSubmitting} width='362px' height='29px' $borderRadius='none'>
          로그인
        </Button>
      </Form>
    </>
  );
};

export default Login;
