import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import FormBox from '../components/FormBox';

const Title = styled.h1`
  margin: 0 auto;
  font-weight: 1200px;
  color: ${palette.mainGreen};
`;

const Register = () => {
  //   const [inputValue, setInputValue] = useState({
  //     userName: '',
  //     eamil: '',
  //     password: '',
  //     reEnterPassword: '',
  //     nickName: '',
  //   });

  //   const changeInputValue = (evt) => {
  //     setInputValue((prev) => ({ ...prev, [evt.target.id]: evt.target.value }));
  //     console.log(inputValue);
  //   };
  return (
    <>
      <Title>our blog</Title>
      <FormBox />
      {/* <Input value={inputValue.userName} id='userName' $placeholder='userName' onChange={changeInputValue} />
      <Input value={inputValue.eamil} id='eamil' $placeholder='eamil' onChange={changeInputValue} />
      <Input
        value={inputValue.password}
        id='password'
        type='password'
        $placeholder='password'
        onChange={changeInputValue}
      />
      <Input
        value={inputValue.reEnterPassword}
        id='reEnterPassword'
        type='password'
        $placeholder='Re-enter password'
        onChange={changeInputValue}
      />
      <Input value={inputValue.nickName} id='nickName' $placeholder='nickName' onChange={changeInputValue} />
      <Button width='362px' height='29px' $borderRadius='none' onChange={changeInputValue}>
        회원가입
      </Button> */}
    </>
  );
};

export default Register;
