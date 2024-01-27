import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ArticleListBox from './ArticleListBox';
import { useQuery } from '@tanstack/react-query';
import { articleListLoad } from '../axios/api';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
`;

const ArticleList = () => {
  const articleList = useQuery({
    queryKey: ['articleList'],
    queryFn: articleListLoad,
  });

  return (
    <>
      {/* 리스트갯수에 따라 margin값 조절 */}
      <ArticleListStyle>
        {articleList.data &&
          articleList.data.data.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>
    </>
  );
};

export default ArticleList;
