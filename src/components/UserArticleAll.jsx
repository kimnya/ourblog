import React, { useEffect } from 'react';
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

const UserArticleAll = () => {
  const navigate = useNavigate();
  // const [timeAgo] = useTimeStamp(createdDate);

  // const trim = /<[^>]*>?/g;
  // const urlRegex = /(https?:\/\/[^ ]*)/;
  // const trimTagContent = content.replace(trim, '');
  // const imageUrl = content.match(urlRegex)[1].replace(trim, '').replace(/">\D*/g, '');

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
      <ArticleListBoxStyle
        onClick={() => {
          getArticle(searchItem.id);
        }}
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

export default UserArticleAll;
