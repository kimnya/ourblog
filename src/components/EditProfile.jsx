import React from 'react';
import styled from 'styled-components';
import NicknameForm from './formComponent/NicknameForm';
import EmailForm from './formComponent/EmailForm';
import PasswordForm from './formComponent/PasswordForm';
import ImageForm from './formComponent/ImageForm';

const EditBoxStyle = styled.div`
  position: absolute;
  left: ${(props) => {
    if (props.type === 'image') {
      return '180px';
    }
  }};
  top: ${(props) => {
    if (props.type === 'image') {
      return '30px';
    }
  }};

  > input {
    width: 200px;
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
