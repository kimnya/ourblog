import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ArticleListBox from './ArticleListBox';
import { useQuery } from '@tanstack/react-query';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
`;

const ArticleList = () => {
  // const [articleList, setArticle] = useState([]);

  const articleListLoad = async () => {
    const articleList = await axios.get('http://localhost:8081/posting/list', {
      params: {
        searchText: '',
      },
    });
    console.log(articleList.data);
    return articleList;
  };

  const { data } = useQuery({
    queryKey: ['ArticleList'],
    queryFn: articleListLoad,
  });

  // useEffect(() => {
  //   articleListLoad();
  // }, []);

  return (
    <>
      {/* 리스트갯수에 따라 margin값 조절 */}
      <ArticleListStyle>
        {data.id !== null &&
          data.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>
    </>
  );
};

export default ArticleList;
