import React from 'react';
import Button from '../../element/Button';
import Input from '../../element/Input';
import { useForm } from 'react-hook-form';
import Modal from '../../element/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNicknameProfile, editPasswordProfile } from '../../axios/api';
import { PasswordInputStyle } from './editForm.styles';

const PasswordForm = ({ passwordtoggleButton }) => {
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

  const editPassword = useMutation({
    mutationFn: editPasswordProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  });

  return (
    <>
      <PasswordInputStyle>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            editPassword.mutate(data.password);
            passwordtoggleButton();
          })}
        >
          <label htmlFor='password'>password</label>
          <Input
            autoFocus
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
          <Button> 저장</Button>
        </form>
      </PasswordInputStyle>
    </>
  );
};

export default PasswordForm;
