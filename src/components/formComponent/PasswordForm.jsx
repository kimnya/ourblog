import React from 'react';
import Button from '../Button';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNicknameProfile, editPasswordProfile } from '../../axios/api';

const PasswordForm = () => {
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

  const editPassword = useMutation({
    mutationFn: editPasswordProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          editPassword.mutate(data.password);
        })}
      >
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
        {errors.password && <Modal>{errors.password.message}</Modal>}
        <Button
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          {' '}
          저장
        </Button>
      </form>
    </>
  );
};

export default PasswordForm;
