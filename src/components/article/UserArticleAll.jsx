import React from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import ArticleListBox from './ArticleListBox';

const BlogNameTag = styled.p`
  margin: 30px auto;
  color: ${palette.mainGreen};
  font-weight: bold;
  font-size: 22px;
`;

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;

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
const UserArticleAll = ({ posts }) => {
  return (
    <>
      <BlogNameTag>나의 블로그</BlogNameTag>
      <ArticleListStyle>
        {posts &&
          posts.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>
    </>
  );
};

export default UserArticleAll;
