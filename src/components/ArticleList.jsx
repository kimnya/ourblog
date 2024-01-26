import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ArticleListBox from './ArticleListBox';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
`;

const ArticleList = () => {
  const [articleList, setArticle] = useState([]);

  const articleListLoad = async () => {
    await axios
      .get('http://localhost:8081/posting/list', {
        params: {
          searchText: '',
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(typeof response.data);
        setArticle(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    articleListLoad();
  }, []);

  return (
    <>
      {/* 리스트갯수에 따라 margin값 조절 */}
      <ArticleListStyle>
        {articleList.id !== null &&
          articleList.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>
    </>
  );
};

export default ArticleList;
