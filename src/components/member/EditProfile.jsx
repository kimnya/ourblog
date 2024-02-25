import React from 'react';
import styled from 'styled-components';
import NicknameForm from '../formComponent/NicknameForm';
import EmailForm from '../formComponent/EmailForm';
import PasswordForm from '../formComponent/PasswordForm';
import ImageForm from '../formComponent/ImageForm';
import { EditBoxStyle } from './member.styles';

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
