import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../page/Login';
import Register from '../page/Register';
import SearchPage from '../page/SearchPage';
import Layout from './Layout';
import MainPage from '../page/MainPage';
import EditPage from '../page/EditPage';
import Articleread from '../page/ArticleRead';
import MyInfoPage from '../page/myInfoPage';
import AllArticlePage from '../page/AllArticlePage';
import PrivateRoute from '../utill/PrivateRoute';
import ConfirmLogin from '../utill/ConfirmLogin';

const Router = () => {
  return (
    <>
      <Suspense fallback='..loading'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route element={<ConfirmLogin />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/search' element={<SearchPage />} />
            <Route path='/readPage/:postId' element={<Articleread />} />
            <Route path='/category/:categoryName' element={<AllArticlePage />} />
            <Route path='/articleAll' element={<AllArticlePage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/myPage' element={<MyInfoPage />} />
              <Route path='/write' element={<EditPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
