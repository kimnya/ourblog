import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';

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

const FormBox = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm();
  return (
    <>
      <Form type={type}></Form>
    </>
  );
};

export default FormBox;
