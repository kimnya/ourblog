import React, { useState } from 'react';
import UserArticleAll from './UserArticleAll';
import ArticleList from '../components/ArticleList';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';

const AllArticlePage = () => {
  const navigate = useNavigate();

  const [isTogle, setTogle] = useState({
    sideBar: false,
    darkMode: false,
    edit: false,
  });
  const reactIconsSize = '22px';

  const sideBarToggleHandler = () => {
    setTogle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
  };

  const editToggleHandler = () => {
    setTogle((prev) => ({ ...prev, edit: !prev.edit }));
  };

  const moveWritePge = (evt) => {
    evt.preventDefault();
    if (sessionStorage.getItem('accessToken')) {
      navigate('/write');
    } else {
      alert('로그인 해주세요');
      navigate('/login');
    }
  };
  return (
    <>
      {/* <SideBar
        isTogle={isTogle}
        reactIconsSize={reactIconsSize}
        sideBarToggleHandler={sideBarToggleHandler}
        editToggleHandler={editToggleHandler}
      /> */}
      <UserArticleAll />
      <Link onClick={moveWritePge}>글 작성하기</Link>
    </>
  );
};

export default AllArticlePage;
