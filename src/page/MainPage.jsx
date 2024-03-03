import React from 'react';
import ArticleList from '../components/article/ArticleList';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { articleListRead } from '../axios/api';
import { MainpageStyle } from './page.styles';

const MainPage = () => {
  const articleAll = useQuery({
    queryKey: ['articleRead'],
    queryFn: articleListRead,
  });

  const { data } = articleAll;

  // const postsData = (posts) => {
  //   let limit = 8;
  //   if (posts) {
  //     let result = posts.slice(0, limit);
  //     return result;
  //   }
  // };

  const navigate = useNavigate();

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
      <MainpageStyle>
        <ArticleList posts={data.data.content} />
        <Link onClick={moveWritePge}>글 작성하기</Link>
      </MainpageStyle>
    </>
  );
};

export default MainPage;
