import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../Modal';
import Button from '../Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNicknameProfile } from '../../axios/api';

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

const NicknameForm = ({ nicknametoggleButton }) => {
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

  const editNickname = useMutation({
    mutationFn: editNicknameProfile,
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
            editNickname.mutate(data.nickname);
            nicknametoggleButton();
          })}
        >
          <label htmlFor='nickname'>nickname</label>
          <Input
            autoFocus
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

          {errors.nickname && <Modal>{errors.nickname.message}</Modal>}
          <Button
            onSubmit={handleSubmit((data) => {
              console.log(data);
              nicknametoggleButton();
            })}
          >
            저장
          </Button>
        </form>
      </InputStyle>
    </>
  );
};

export default NicknameForm;
