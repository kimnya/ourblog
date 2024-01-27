import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import useTimeStamp from './customHook/articleDate';
import { FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleListBoxStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 282px;
  height: 339px;
  background-color: #fff;
  border: 1px solid ${palette.mainGreen};

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

const UserArticleAllBox = ({ article }) => {
  const { title, writer, createdDate, content, id } = article;
  // const navigate = useNavigate();
  const [timeAgo] = useTimeStamp(createdDate);
  const trim = /<[^>]*>?/g;
  const urlRegex = /(https?:\/\/[^ ]*)/;
  const trimTagContent = content.replace(trim, '');
  const imageUrl = content.match(urlRegex)[1].replace(trim, '').replace(/">\D*/g, '');
  return (
    <>
      <ArticleListBoxStyle
      // onClick={() => {
      //   getArticle(searchItem.id);
      // }}
      >
        <img src={imageUrl} alt={`${writer}의 썸네일`} />
        <div>
          <h1>{title}</h1>
        </div>
        <div className='articleTxtBox'>
          <p>{trimTagContent}</p>
        </div>
        <div className='articleEctBox'>
          <p>{timeAgo}</p>
          <p>
            {writer}
            <FaRegHeart />
            {likeCnt}
          </p>
        </div>
      </ArticleListBoxStyle>
    </>
  );
};

const UserArticleAll = () => {
  const [articleList, setArticle] = useState([]);
  const articleListLoad = async () => {
    axios
      .get('http://localhost:8081/category/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
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
      전인배
      {articleList.map((article) => {
        <UserArticleAllBox key={article.id} article={article} />;
      })}
    </>
  );
};
export default UserArticleAll;
