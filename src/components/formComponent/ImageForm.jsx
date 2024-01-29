import React, { useRef, useState } from 'react';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Modal from '../Modal';
import { storage } from './../../Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editimageProfile } from '../../axios/api';

const ImageForm = ({ imagetoggleButton }) => {
  const queryClient = useQueryClient();
  const [attachment, setAttachment] = useState();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    reset,
    resetField,
    setFocus,
  } = useForm();

  const imageHandler = async () => {
    const file = document.getElementById('imageInput').files[0];
    try {
      const storageRef = ref(storage, `image/${Date.now()}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setAttachment(url);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editimage = useMutation({
    mutationFn: editimageProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data.imageFile);
          editimage.mutate(attachment);
          imagetoggleButton();
          console.log(attachment);
        })}
      >
        <label htmlFor='imageFile'>imageFile</label>
        <input
          autoFocus
          {...register('imageFile', {
            required: '이미지 파일을 입력해주세요.',
            onChange: () => {
              imageHandler();
            },
          })}
          type='file'
          accept='image/*'
          id='imageInput'
        />
        {errors.imageFile && <Modal>{errors.imageFile.message}</Modal>}
        <Button
          onSubmit={handleSubmit((data) => {
            // console.log(data.imageFile);
            editimage.mutate(attachment);
            imagetoggleButton();
            console.log(attachment);
          })}
        >
          저장
        </Button>
      </form>
    </>
  );
};

export default ImageForm;
