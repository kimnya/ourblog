import React from 'react';
import ArticleListBox from './ArticleListBox';
import { BlogNameTag, UserArticleListStyle } from './article.styles';

const UserArticleAll = ({ posts }) => {
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

export default UserArticleAll;
