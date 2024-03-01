import React from 'react';
import { UserArticleListStyle } from './article.styles';
import ArticleListBox from './ArticleListBox';

const CategoryArticleAll = ({ posts }) => {
  return (
    <>
      <UserArticleListStyle>
        {posts &&
          posts.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </UserArticleListStyle>
    </>
  );
};

export default CategoryArticleAll;
