import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../element/Input';
import styled from 'styled-components';
import Button from '../element/Button';
import Title from '../components/app/Title';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { checkEmail, checkNickname, registerSubmit } from '../axios/api';
import { RegisterForm } from './page.styles';

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    reset,
    resetField,
    setFocus,
  } = useForm();

  const RegisterApi = useMutation({
    mutationFn: registerSubmit,
    onSuccess: (response) => {
      alert(`반갑습니다. ${response.data.nickname}님`);
      navigate('/login');
    },
    onError: () => {
      alert('회원가입에 실패했습니다');
    },
  });

  const checkEmailApi = useMutation({
    mutationFn: checkEmail,
    onSuccess: (response) => {
      if (response.status === 200) {
        alert('사용가능한 이메일입니다.');
      }
    },
    onError: () => {
      alert('중복된 아이디가 존재합니다.');
      resetField('email');
      setFocus('email');
    },
  });

  const checkNicknameApi = useMutation({
    mutationFn: checkNickname,
    onSuccess: (response) => {
      if (response.status === 200) {
        alert('사용가능한 닉네임입니다.');
      }
    },
    onError: () => {
      alert('중복된 닉네임이 존재합니다.');
      resetField('nickname');
      setFocus('nickname');
    },
  });

  return (
    <>
      <h2>회원가입</h2>
      <RegisterForm
        onSubmit={handleSubmit((data) => {
          RegisterApi.mutate(data);
          reset();
        })}
      >
        <label htmlFor='userName'>userName</label>
        <Input
          {...register('userName', {
            required: '이름을 입력해주세요.',
            pattern: {
              value: /^[a-zA-z가-힣]{2,12}$/,
              message: '특수기호나 숫자는 사용할 수 없습니다.',
            },
          })}
          autoFocus
          $placeholder='userName'
        />
        {errors.userName && <small>{errors.userName.message}</small>}

        <label htmlFor='email'>email</label>
        <Input
          {...register('email', {
            required: 'email을 입력해주세요.',
            pattern: {
              value: /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
              message: 'email 형식을 맞춰 입력해주세요.',
            },
            onBlur: () => {
              const email = getValues('email');
              if (email !== '') {
                checkEmailApi.mutate(email);
              }
            },
          })}
          type='email'
          $placeholder='email'
        />
        {errors.email && <small>{errors.email.message}</small>}

        <label htmlFor='nickname'>nickname</label>
        <Input
          {...register('nickname', {
            required: 'nickname을 입력해주세요.',
            pattern: {
              value: /^[a-zA-z가-힣0-9]{1,8}$/,
              message: '8자까지 가능하며 특수기호나 숫자를 사용할 수 없습니다.',
            },
            onBlur: () => {
              const nickname = getValues('nickname');
              if (nickname !== '') {
                checkNicknameApi.mutate(nickname);
              }
            },
          })}
          $placeholder='nickname'
        />
        {errors.nickname && <small>{errors.nickname.message}</small>}

        <label htmlFor='password'>password</label>
        <Input
          {...register('password', {
            required: 'password를 입력해주세요.',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
              message: '숫자+영문자+특수문자 조합으로 8자리 이상 25자리 이하로 입력해주세요.',
            },
          })}
          type='password'
          $placeholder='password'
        />
        {errors.password && <small>{errors.password.message}</small>}

        <label htmlFor='reEnterPassword'>reEnterPassword</label>
        <Input
          {...register('reEnterPassword', {
            required: 'password를 한번 더 확인해주세요.',
            validate: {
              check: (val) => {
                if (getValues('password') !== val) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            },
          })}
          type='password'
          $placeholder='re-enter password'
        />
        {errors.reEnterPassword && <small>{errors.reEnterPassword.message}</small>}

        <Button disabled={isSubmitting} width='362px' height='29px' $borderRadius='none'>
          회원가입
        </Button>
      </RegisterForm>
    </>
  );
};

export default Register;
