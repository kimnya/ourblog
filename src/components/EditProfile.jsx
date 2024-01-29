import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { useForm } from 'react-hook-form';
import NicknameForm from './formComponent/NicknameForm';
import EmailForm from './formComponent/EmailForm';
import PasswordForm from './formComponent/PasswordForm';
import { storage } from '../Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import ImageForm from './formComponent/ImageForm';

const EditBoxStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  > input {
    width: 200px;
    /* border-radius: 20%; */
    &:nth-child(2) {
      left: -450px;
    }
  }
  label {
    display: none;
  }
`;

const EditProfile = ({ type, imagetoggleButton, nicknametoggleButton, emailtoggleButton, passwordtoggleButton }) => {
  return (
    <>
      <EditBoxStyle type={type}>
        {(type === 'image' && <ImageForm imagetoggleButton={imagetoggleButton} />) ||
          (type === 'nickname' && <NicknameForm nicknametoggleButton={nicknametoggleButton} />) ||
          (type === 'email' && <EmailForm emailtoggleButton={emailtoggleButton} />) ||
          (type === 'password' && <PasswordForm passwordtoggleButton={passwordtoggleButton} />)}
      </EditBoxStyle>
    </>
  );
};

export default EditProfile;
