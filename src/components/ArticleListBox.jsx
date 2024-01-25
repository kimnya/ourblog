import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import useTimeStamp from '../components/customHook/articleDate';
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
  /* border: 1px solid ${palette.mainGreen}; */

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

const ArticleListBox = ({ article }) => {
  const { title, writer, createdDate, content, likeCnt, imageUrl } = article;
  const navigate = useNavigate();
  const [timeAgo] = useTimeStamp(createdDate);
  const trimTagContent = content.replace(/<[^>]*>?/g, '');
  // const setImageUrl = content;

  const getArticle = async (postId) => {
    await axios
      .get(`http://localhost:8081/posting/${postId}`)
      .then((response) => {
        console.log(response.data);
        navigate('/readPage');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <ArticleListBoxStyle
        onClick={() => {
          getArticle(article.id);
        }}
      >
        <div className='articlePhotoBox'>{imageUrl ? <img src='#' alt={`의 썸네일`} /> : <p>{trimTagContent}</p>}</div>

        <div>
          <h1>{title}</h1>
        </div>

        <div className='articleTxtBox'>
          <p>{trimTagContent}</p>
        </div>

        <div className='articleEctBox'>
          <p>{timeAgo}</p>
          <p>{writer}</p>
          <p>
            <FaRegHeart />
            {likeCnt}
          </p>
        </div>
      </ArticleListBoxStyle>
    </>
  );
};

export default ArticleListBox;
