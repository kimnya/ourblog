import React from 'react';
import FormBox from '../components/FormBox';
import Title from '../components/Title';

const registSubmit = (data) => {
  alert(data);
};

const Register = () => {
  return (
    <>
      <Title />
      <FormBox type='register' onSubmit={registSubmit} />
    </>
  );
};

export default Register;
