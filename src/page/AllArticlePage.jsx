import React, { useState } from 'react';
import UserArticleAll from './UserArticleAll';
import ArticleList from '../components/ArticleList';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import { userArticleRead } from '../axios/api';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../components/Pagination';

const AllArticleStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;

  margin-top: 30px;

  a {
    margin: 60px auto;
    color: ${({ theme }) => theme.txtColor};
  }
`;

const AllArticlePage = () => {
  const [page, setPage] = useState(1); //페이지
  const navigate = useNavigate();

  const userArticle = useQuery({
    queryKey: ['userArticle'],
    queryFn: userArticleRead,
    enabled: sessionStorage.getItem('accessToken') !== null,
  });

  const { data } = userArticle;

  console.log(data);

  const limit = 8; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const moveWritePge = (evt) => {
    evt.preventDefault();
    if (sessionStorage.getItem('accessToken')) {
      navigate('/write');
    } else {
      alert('로그인 해주세요');
      navigate('/login');
    }
  };

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };
  return (
    <>
      <AllArticleStyle>
        {/* <SideBar
        isTogle={isTogle}
        reactIconsSize={reactIconsSize}
        sideBarToggleHandler={sideBarToggleHandler}
        editToggleHandler={editToggleHandler}
      /> */}
        <UserArticleAll posts={postsData(data.data)} />
        <Link onClick={moveWritePge}>글 작성하기</Link>
        {data.data.length !== 0 && (
          <Pagination limit={limit} page={page} totalPosts={data.data.length} setPage={setPage} />
        )}
      </AllArticleStyle>
    </>
  );
};

export default AllArticlePage;
