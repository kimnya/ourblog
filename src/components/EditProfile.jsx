import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { useForm } from 'react-hook-form';
import NicknameForm from './formComponent/NicknameForm';
import EmailForm from './formComponent/EmailForm';
import PasswordForm from './formComponent/PasswordForm';

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

const EditProfile = ({ type }) => {
  return (
    <>
      <EditBoxStyle type={type}>
        {(type === 'nickname' && <NicknameForm />) ||
          (type === 'email' && <EmailForm />) ||
          (type === 'password' && <PasswordForm />)}
      </EditBoxStyle>
    </>
  );
};

export default EditProfile;
