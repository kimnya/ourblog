import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../element/Input';
import Button from '../element/Button';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from '../utill/cookie';
import { loginSubmit } from '../axios/api';
import { useMutation } from '@tanstack/react-query';
import { LoginForm } from './page.styles';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setFocus,
  } = useForm();

  const loginSubmitApi = useMutation({
    mutationFn: loginSubmit,
    onSuccess: (response) => {
      alert('로그인이 완료됐습니다. 좋은하루 보내세요');
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('email', accessToken);
      setCookie('refreshToken', refreshToken);
      sessionStorage.setItem('email', response.data.email);
      if (response.data.email === 'admin@naver.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    },
    onError: () => {
      alert('로그인에 실패했습니다');
      setFocus('email');
    },
  });

  return (
    <>
      <h2>로그인</h2>
      <LoginForm
        onSubmit={handleSubmit((data) => {
          loginSubmitApi.mutate(data);
          reset();
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
      </LoginForm>
    </>
  );
};

export default Login;
