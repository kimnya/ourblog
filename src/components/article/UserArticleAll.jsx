import React from 'react';
import ArticleListBox from './ArticleListBox';
import { BlogNameTag, UserArticleListStyle } from './article.styles';

const UserArticleAll = ({ posts }) => {
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

export default UserArticleAll;
