import React, { Suspense } from 'react';
import ArticleList from '../components/ArticleList';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { palette } from '../styles/palette';

const BlogNameTag = styled.p`
  margin: 0 auto;
  color: ${palette.mainGreen};
  font-weight: bold;
  font-size: 22px;
`;
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
      <BlogNameTag>Home</BlogNameTag>
      <MainpageStyle>
        <ArticleList />
        <Link onClick={moveWritePge}>글 작성하기</Link>
      </MainpageStyle>
    </>
  );
};

export default MainPage;
