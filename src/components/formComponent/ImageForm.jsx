import React, { useEffect, useRef, useState } from 'react';
import Input from '../../element/Input';
import { useForm } from 'react-hook-form';
import Button from '../../element/Button';
import Modal from '../../element/Modal';
import { storage } from '../../fireBase/Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editimageProfile } from '../../axios/api';
import { ImageInputStyle } from './editForm.styles';

const ImageForm = ({ imagetoggleButton }) => {
  const queryClient = useQueryClient();
  const [attachment, setAttachment] = useState();
  const [save, setSave] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHandler = async () => {
    const file = document.getElementById('imageInput').files[0];
    try {
      const storageRef = ref(storage, `image/${Date.now()}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setAttachment(url);
          setSave(false);
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
      <ImageInputStyle>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data.imageFile);
            editimage.mutate(attachment);
            imagetoggleButton();
            console.log(attachment);
          })}
        >
          <label htmlFor='imageFile'>imageFile</label>
          <Input
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
            placehoder='사진을 선택해주세요.'
          />
          {errors.imageFile && <Modal>{errors.imageFile.message}</Modal>}
          <Button disabled={save}>저장</Button>
        </form>
      </ImageInputStyle>
    </>
  );
};

export default ImageForm;
