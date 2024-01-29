import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import Modal from '../Modal';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEmailProfile } from '../../axios/api';
import styled from 'styled-components';

const InputStyle = styled.div`
  > form {
    display: flex;
    position: relative;

    > input {
      width: 200px;
    }
    > button {
      position: absolute;
      top: 0;
      right: -200px;
    }
  }
  > label {
    display: none;
  }
`;

const EmailForm = ({ emailtoggleButton }) => {
  const queryClient = useQueryClient();
  const preventSubmit = (evt) => {
    evt.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    reset,
    resetField,
    setFocus,
  } = useForm();

  const editEmail = useMutation({
    mutationFn: editEmailProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  });

  return (
    <>
      <InputStyle>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            editEmail.mutate(data.email);
            emailtoggleButton();
          })}
        >
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
                  .get(`http://localhost:8081/member/checkEmail`, {
                    headers: {
                      'Content-type': 'application/json',
                      'Access-Control-Allow-Origin': 'http://localhost:8081', // 서버 domain
                    },
                    params: { email: getValues('email') },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      if (getValues('email') !== '') {
                        alert('사용가능한 이메일입니다.');
                      }
                    }
                  })
                  .catch((err) => {
                    const resp = err.response;
                    if (resp.status === 400) {
                      alert(resp.data);
                      resetField('email');
                      setFocus('email');
                    }
                  });
              },
            })}
            autoFocus
            type='email'
            id='email'
            $placeholder='email'
          />
          <Button
            calssName='submitBtn'
            onSubmit={handleSubmit((data) => {
              console.log(data);
              emailtoggleButton();
            })}
          >
            저장
          </Button>
          {errors.email && <Modal>{errors.email.message}</Modal>}
        </form>
      </InputStyle>
    </>
  );
};

export default EmailForm;
