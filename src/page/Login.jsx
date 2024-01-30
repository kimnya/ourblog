import React from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getInfo } from '../axios/api';
import { useQuery } from '@tanstack/react-query';

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
  & a {
    align-self: flex-end;
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setFocus,
  } = useForm();

  const myInfo = useQuery({
    queryKey: ['myInfo'],
    queryFn: getInfo,
    enabled: false,
  });

  const loginSubmit = async (data) => {
    try {
      await axios
        .post('http://localhost:8081/member/login', {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          if (response.status === 200) {
            alert('로그인이 완료됐습니다. 좋은하루 보내세요');
            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            myInfo.refetch();
            navigate('/');
          }
        });
    } catch (e) {
      alert('로그인에 실패했습니다');
      setFocus('email');
    }
  };

  return (
    <>
      <h2>로그인</h2>
      <Form
        onSubmit={handleSubmit((data) => {
          loginSubmit(data);
          reset();
          setFocus('email');
        })}
      >
        <label htmlFor='email'>email</label>
        <Input
          {...register('email', {
            required: 'email을 입력해주세요.',
          })}
          autoFocus
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
        <Link to='/register'>회원가입</Link>
      </Form>
    </>
  );
};

export default Login;
