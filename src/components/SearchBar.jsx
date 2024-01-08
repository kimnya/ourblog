import React, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Form = styled.form`
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const { register, getValues } = useForm();

  return (
    <>
      <Form>
        <label htmlFor='search'>검색창</label>
        <Input
          {...register('search', {
            onChange: () => {
              console.log(getValues('search'));
            },
          })}
          width='450px'
          height='50px'
          $placeholder='검색할 단어를 입력해주세요.'
          autoFocus
        />
      </Form>
    </>
  );
};

export default SearchBar;
