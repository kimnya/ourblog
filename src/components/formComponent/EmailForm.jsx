import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../element/Input';
import Button from '../../element/Button';
import Modal from '../../element/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkEmail, editEmailProfile } from '../../axios/api';
import { EmailInputStyle } from './editForm.styles';

const EmailForm = ({ emailtoggleButton }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    resetField,
    setFocus,
  } = useForm();

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

  const editEmail = useMutation({
    mutationFn: editEmailProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  });

  return (
    <>
      <EmailInputStyle>
        <form
          onSubmit={handleSubmit((data) => {
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
          <Button className='submitBtn'>저장</Button>
          {errors.email && <Modal>{errors.email.message}</Modal>}
        </form>
      </EmailInputStyle>
    </>
  );
};

export default EmailForm;
