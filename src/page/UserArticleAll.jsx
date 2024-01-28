import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { useQuery } from '@tanstack/react-query';
import { userArticleRead } from '../axios/api';
import ArticleListBox from '../components/ArticleListBox';

const ArticleListBoxStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 282px;
  height: 339px;
  background-color: #fff;
  border: 1px solid ${palette.mainGreen};

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
    enabled: localStorage.getItem('accessToken') !== null,
  });

  const { data } = userArticle;

  return (
    <ArticleListBoxStyle>
      <>
        {data.data.map((article) => {
          return (
            <>
              <ArticleListBox key={article.id} article={article} />;
            </>
          );
        })}
      </>
    </ArticleListBoxStyle>
  );
};

export default UserArticleAll;
