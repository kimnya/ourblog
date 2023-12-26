import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 800px;
`;

const Label = styled.label`
  display: none;
`;

const FormBox = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm();
  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <Label htmlFor='userName'>userName</Label>
        <Input
          {...register('userName', {
            required: '이름을 입력해주세요.',
            pattern: {
              value: /^[a-zA-z가-힣]{1,12}$/,
              message: '특수기호나 숫자는 사용할 수 없습니다.',
            },
          })}
          id='userName'
          $placeholder='userName'
        />
        {errors.userName && <small>{errors.userName.message}</small>}

        <Label htmlFor='email'>email</Label>
        <Input
          {...register('eamil', {
            required: 'email을 입력해주세요.',
            pattern: {
              value: /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
              message: 'email 형식을 맞춰 입력해주세요.',
            },
          })}
          type='email'
          id='eamil'
          $placeholder='eamil'
        />
        {errors.eamil && <small>{errors.eamil.message}</small>}

        <Label htmlFor='password'>password</Label>
        <Input
          {...register('password', {
            required: 'password를 입력해주세요.',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
              message: '숫자+영문자+특수문자 조합으로 8자리 이상 25자리 이하로 입력해주세요.',
            },
          })}
          type='password'
          id='password'
          $placeholder='password'
        />
        {errors.password && <small>{errors.password.message}</small>}

        <Label htmlFor='reEnterPassword'>reEnterPassword</Label>
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
          id='reEnterPassword'
          $placeholder='Re-enter password'
        />
        {errors.reEnterPassword && <small>{errors.reEnterPassword.message}</small>}

        <Label htmlFor='nickName'>nickName</Label>
        <Input
          {...register('nickName', {
            required: 'nickName을 입력해주세요.',
            pattern: {
              value: /^[a-zA-z가-힣]{1,30}$/,
              message: '특수기호나 숫자를 사용할 수 없습니다.',
            },
          })}
          id='nickName'
          $placeholder='nickName'
        />
        {errors.nickName && <small>{errors.nickName.message}</small>}
        <Button disabled={isSubmitting} width='362px' height='29px' $borderRadius='none'>
          회원가입
        </Button>
      </Form>
    </>
  );
};

export default FormBox;
