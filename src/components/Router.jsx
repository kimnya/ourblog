import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../page/Login';
import Register from '../page/Register';
import SearchPage from '../page/SearchPage';
import Layout from './Layout';
import MainPage from '../page/MainPage';
import EditPage from '../page/EditPage';
import Articleread from '../page/ArticleRead';
import MyInfoPage from '../page/myInfoPage';
import UserArticleAll from './UserArticleAll';
import AllArticlePage from '../page/AllArticlePage';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/readPage/:postId' element={<Articleread />} />
          <Route path='/category/:categoryName' element={<AllArticlePage />} />
          <Route path='/myInfo' element={<MyInfoPage />} />
          <Route path='/articleAll' element={<AllArticlePage />} />
        </Route>
        <Route path='/write' element={<EditPage />} />
      </Routes>
    </>
  );
};

export default Router;
