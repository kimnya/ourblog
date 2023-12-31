import React from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';

import styled from 'styled-components';
import Button from '../components/Button';

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  height: 320px;
  & label {
    display: none;
  }
  & small {
    width: 362px;
    color: red;
    font-size: 12px;
  }
`;

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


const registSubmit = (data) => {
  alert(data);
};


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm();

  return (
    <>
      <Title />

      <Form
        onSubmit={handleSubmit((data) => {
          registerSubmit(data);

          console.log(data);
        })}
      >
        <>
          <label htmlFor='userName'>userName</label>
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
          {errors.userName && <small>{errors.userName.message}</small>}
        </>

        <label htmlFor='email'>email</label>
        <Input
          {...register('email', {
            required: 'email을 입력해주세요.',
            pattern: {
              value: /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
              message: 'email 형식을 맞춰 입력해주세요.',
            },
            onBlur: async () => {
              await axios
                .get(`http://localhost:8081/api/member/checkEmail`, {
                  headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8081', // 서버 domain
                  },
                  params: { email: getValues('email') },
                })
                .then((response) => {
                  if (response.status === 200) {
                    alert('사용가능한 아이디입니다.');
                  }
                })
                .catch((err) => {
                  const resp = err.response;
                  if (resp.status === 400) {
                    alert(resp.data);
                  }
                });
            },
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
          id='reEnterPassword'
          $placeholder='re-enter password'
        />
        {errors.reEnterPassword && <small>{errors.reEnterPassword.message}</small>}

        <label htmlFor='nickname'>nickname</label>
        <Input
          {...register('nickname', {
            required: 'nickname을 입력해주세요.',
            pattern: {
              value: /^[a-zA-z가-힣]{1,30}$/,
              message: '특수기호나 숫자를 사용할 수 없습니다.',
            },
            onBlur: async () => {
              await axios
                .get(`http://localhost:8081/api/member/nickName`, {
                  headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8081', // 서버 domain
                  },
                  params: { nickName: getValues('nickName') },
                })
                .then((response) => {
                  if (response.status === 200) {
                    alert('사용가능한 닉네임입니다.');
                  }
                })
                .catch((err) => {
                  const resp = err.response;
                  if (resp.status === 400) {
                    alert(resp.data);
                  }
                });
            },
          })}
          id='nickname'
          $placeholder='nickname'
        />
        {errors.nickname && <small>{errors.nickname.message}</small>}

        <Button disabled={isSubmitting} width='362px' height='29px' $borderRadius='none'>
          회원가입
        </Button>
      </Form>

    </>
  );
};

export default Register;
