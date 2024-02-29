import React, { useState } from 'react';
import { categoryArticleRead } from '../axios/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserAllArticlePageStyle } from './page.styles';
import Pagination from '../element/Pagination';
import CategoryArticleAll from '../components/article/CategoryArticleAll';
import { useQuery } from '@tanstack/react-query';

const CategoryArticlePage = () => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { categoryId } = useParams();

  const categoryArticle = useQuery({
    queryKey: ['categoryArticle', categoryId],
    queryFn: categoryArticleRead,
    enabled: sessionStorage.getItem('accessToken') !== null,
  });

  const { data } = categoryArticle;
  const limit = 8;
  const offset = (page - 1) * limit;

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
      <UserAllArticlePageStyle>
        <CategoryArticleAll posts={postsData(data.data)} />
        <Link onClick={moveWritePge}>글 작성하기</Link>
        {data.data.length !== 0 && (
          <Pagination limit={limit} page={page} totalPosts={data.data.length} setPage={setPage} />
        )}
      </UserAllArticlePageStyle>
    </>
  );
};

export default CategoryArticlePage;
