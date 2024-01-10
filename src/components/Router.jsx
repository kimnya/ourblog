import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../page/Login';
import Register from '../page/Register';
import SearchPage from '../page/SearchPage';
import Layout from './Layout';
import MainPage from '../page/MainPage';
import ArticleWrite from '../page/ArticleWrite';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>
        <Route path='/write' element={<ArticleWrite />} />
      </Routes>
    </>
  );
};

export default Router;
