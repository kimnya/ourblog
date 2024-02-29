import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../../page/Login';
import Register from '../../page/Register';
import SearchPage from '../../page/SearchPage';
import Layout from './Layout';
import MainPage from '../../page/MainPage';
import EditPage from '../../page/EditPage';
import Articleread from '../../page/ArticleRead';
import MyInfoPage from '../../page/MyInfoPage';
import AllArticlePage from '../../page/AllArticlePage';
import PrivateRoute from '../../utill/PrivateRoute';
import ConfirmLogin from '../../utill/ConfirmLogin';
import AdminPage from '../../page/AdminPage';
import EditPostPage from '../../page/EditPostPage';
import CategoryArticlePage from '../../page/CategoryArticlePage';

const Router = () => {
  return (
    <>
      <Suspense fallback='..loading'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/readPage/:postId' element={<Articleread />} />
            <Route path='/category/:categoryId' element={<CategoryArticlePage />} />
            <Route path='/articleAll' element={<AllArticlePage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/myPage' element={<MyInfoPage />} />
              <Route path='/write' element={<EditPage />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/editPostPage/:postId' element={<EditPostPage />} />
            </Route>
            <Route element={<ConfirmLogin />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
