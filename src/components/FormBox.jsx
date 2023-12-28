import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { darken } from './../styles/ColorMixin';

const CheckInputBox = styled.div`
  display: flex;
  flex-flow: column nowrap;

  > a {
    align-self: flex-end;
    margin-top: 5px;
    text-decoration: underline;

    &:hover {
      color: ${palette.mainGreen};
      ${darken(0.4)}
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  height: ${({ type }) => (type === 'register' ? '320px' : '160px')};
  & small {
    width: 362px;
    color: red;
    font-size: 12px;
  }
`;

const Label = styled.label`
  display: none;
`;

const FormBox = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm();

  return (
    <>
      <Form type={type} onSubmit={handleSubmit(() => alert(getValues('eamil')))}>
        {type === 'register' && (
          <>
            <Label htmlFor='userName'>userName</Label>
            <Input
              {...register('userName', {
                required: '이름을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-z가-힣]{2,12}$/,
                  message: '특수기호나 숫자는 사용할 수 없습니다.',
                },
              })}
              id='userName'
              $placeholder='userName'
            />
            {type === 'register' && errors.userName && <small>{errors.userName.message}</small>}
          </>
        )}

        <CheckInputBox>
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
          {type === 'register' && <a href='#'>email 중복체크 </a>}
        </CheckInputBox>
        {type === 'register' && errors.eamil && <small>{errors.eamil.message}</small>}
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
        {type === 'register' && errors.password && <small>{errors.password.message}</small>}

        {type === 'register' && (
          <>
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
              $placeholder='re-enter password'
            />
            {errors.reEnterPassword && <small>{errors.reEnterPassword.message}</small>}

            <Label htmlFor='nickname'>nickname</Label>
            <Input
              {...register('nickname', {
                required: 'nickname을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-z가-힣]{1,30}$/,
                  message: '특수기호나 숫자를 사용할 수 없습니다.',
                },
              })}
              id='nickname'
              $placeholder='nickname'
            />
            {errors.nickname && <small>{errors.nickname.message}</small>}
          </>
        )}

        <Button disabled={isSubmitting} width='362px' height='29px' $borderRadius='none'>
          {type === 'register' ? '회원가입' : '로그인'}
        </Button>
      </Form>
    </>
  );
};

export default FormBox;
