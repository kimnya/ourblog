import React from 'react';
import { BlogNameTag, UserArticleListStyle } from './article.styles';
import ArticleListBox from './ArticleListBox';

const CategoryArticleAll = ({ posts }) => {
  return (
    <>
      <BlogNameTag>나의 블로그</BlogNameTag>
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
