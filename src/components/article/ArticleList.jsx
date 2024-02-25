import React from 'react';
import styled from 'styled-components';
import ArticleListBox from './ArticleListBox';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
`;

const ArticleList = ({ posts }) => {
  return (
    <>
      <ArticleListStyle>
        {posts &&
          posts.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>
    </>
  );
};
export default ArticleList;
