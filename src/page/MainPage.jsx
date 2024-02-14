import React, { Suspense } from 'react';
import ArticleList from '../components/ArticleList';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { palette } from '../styles/palette';
import { useQuery } from '@tanstack/react-query';
import { articleListRead } from '../axios/api';

const MainpageStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-top: 30px;
  > a {
    margin: 60px auto;
    color: ${({ theme }) => theme.txtColor};
  }
`;
const MainPage = () => {
  const articleAll = useQuery({
    queryKey: ['articleRead'],
    queryFn: articleListRead,
  });
  // console.log('article', articleAll);

  const { data } = articleAll;

  const postsData = (posts) => {
    let limit = 8;
    if (posts) {
      let result = posts.slice(0, limit);
      return result;
    }
  };

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
        <ArticleList posts={postsData(data.data)} />
        <Link onClick={moveWritePge}>글 작성하기</Link>
      </MainpageStyle>
    </>
  );
};

export default MainPage;
