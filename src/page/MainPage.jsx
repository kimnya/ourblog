import React, { Suspense } from 'react';
import ArticleList from '../components/ArticleList';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const MainpageStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;

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
      <MainpageStyle>
        <ArticleList />
        <Link onClick={moveWritePge}>글 작성하기</Link>
      </MainpageStyle>
    </>
  );
};

export default MainPage;
