import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { useQuery } from '@tanstack/react-query';
import { userArticleRead } from '../axios/api';
import ArticleListBox from '../components/ArticleListBox';

const BlogNameTag = styled.p`
  margin: 0 auto;
  color: ${palette.mainGreen};
  font-weight: bold;
  font-size: 22px;
`;

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;

  > .articlePhotoBox {
    width: 282px;
    height: 154px;

    > img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    > p {
      display: flex;

      align-items: center;
      width: 100%;
      height: 100%;
      color: #aaa;
    }
  }
  > .articleTxtBox {
    > p {
      height: 77px;
      color: #aaa;
    }
  }
  > .articleEctBox {
    display: flex;
    justify-content: space-between;
  }
`;
const UserArticleAll = () => {
  const userArticle = useQuery({
    queryKey: ['userArticle'],
    queryFn: userArticleRead,
    enabled: sessionStorage.getItem('accessToken') !== null,
  });

  const { data } = userArticle;

  return (
    <>
      <BlogNameTag>나의 블로그</BlogNameTag>
      <ArticleListStyle>
        {data.data.map((article) => {
          return <ArticleListBox key={article.id} article={article} />;
        })}
      </ArticleListStyle>
    </>
  );
};

export default UserArticleAll;
