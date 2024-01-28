import React from 'react';
import UserArticleAll from './UserArticleAll';
import ArticleList from '../components/ArticleList';
import { Link, useNavigate } from 'react-router-dom';

const AllArticlePage = () => {
  const navigate = useNavigate();

  const moveWritePge = (evt) => {
    evt.preventDefault();
    if (localStorage.getItem('accessToken')) {
      navigate('/write');
    } else {
      alert('로그인 해주세요');
      navigate('/login');
    }
  };
  return (
    <div>
      <UserArticleAll />
      <Link onClick={moveWritePge}>글 작성하기</Link>
    </div>
  );
};

export default AllArticlePage;
