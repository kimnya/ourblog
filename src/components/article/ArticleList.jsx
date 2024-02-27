import React from 'react';
import ArticleListBox from './ArticleListBox';
import { ArticleListStyle } from './article.styles';

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
