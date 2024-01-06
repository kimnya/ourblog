import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../page/Login';
import Register from '../page/Register';
import Main from '../page/MainPage';
import SearchPage from '../page/SearchPage';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </>
  );
};

export default Router;
