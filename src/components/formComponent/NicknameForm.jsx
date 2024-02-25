import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../element/Input';
import Modal from '../../element/Modal';
import Button from '../../element/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkNickname, editNicknameProfile } from '../../axios/api';
import { NicknameInputStyle } from './editForm.styles';

const NicknameForm = ({ nicknametoggleButton }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
    setFocus,
  } = useForm();

  const checkNicknameApi = useMutation({
    mutationFn: checkNickname,
    onSuccess: (response) => {
      if (response.status === 200) {
        alert('사용가능한 닉네임입니다.');
      }
    },
    onError: () => {
      alert('중복된 닉네임이 존재합니다.');
      resetField('nickname');
      setFocus('nickname');
    },
  });

  const editNickname = useMutation({
    mutationFn: editNicknameProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  });

  return (
    <>
      <NicknameInputStyle>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            editNickname.mutate(data.nickname);
            nicknametoggleButton();
          })}
        >
          <label htmlFor='nickname'>nickname</label>
          <Input
            {...register('nickname', {
              required: 'nickname을 입력해주세요.',
              pattern: {
                value: /^[a-zA-z가-힣0-9]{1,8}$/,
                message: '8자까지 가능하며 특수기호나 숫자를 사용할 수 없습니다.',
              },
              onBlur: () => {
                const nickname = getValues('nickname');
                if (nickname !== '') {
                  checkNicknameApi.mutate(nickname);
                }
              },
            })}
            $placeholder='nickname'
          />

          {errors.nickname && <Modal>{errors.nickname.message}</Modal>}
          <Button>저장</Button>
        </form>
      </NicknameInputStyle>
    </>
  );
};

export default NicknameForm;
