import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import useTimeStamp from '../components/customHook/articleDate';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { anonymousLikeCntReadApi, likeCntReadApi } from '../axios/api';
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
    overflow: hidden;
    text-overflow: ellipsis;

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
    overflow: hidden;
    text-overflow: ellipsis;
    > p {
      height: 77px;
      color: #aaa;
    }
  }
  > .articleEctBox {
    display: flex;
    justify-content: space-between;
    .writer {
      margin-right: 10px;
    }
  }
`;

const ArticleListBox = ({ article }) => {
  const key = localStorage.getItem('accessToken');
  const { title, writer, createdDate, content, id } = article;
  const [timeAgo] = useTimeStamp(createdDate);
  let imageUrl = '';
  const trim = /<[^>]*>?/g;
  const urlRegex = /(https?:\/\/[^ ]*)/;
  if (content.match('<img')) {
    imageUrl = content.match(urlRegex)[1].replace(trim, '').replace(/">\D*/g, '');
  }
  const trimTagContent = content.replace(trim, '');
  const navigate = useNavigate();

  const likeCntRead = useQuery({
    queryKey: ['likeCnt', id, key],
    queryFn: likeCntReadApi,
    enabled: !!article.id && !!key,
  });

  const anonymousLikeCntRead = useQuery({
    queryKey: ['anonymousLikeCnt', id, key],
    queryFn: anonymousLikeCntReadApi,
    enabled: !!article.id && localStorage.getItem('accessToken') === null,
  });

  return (
    <>
      <ArticleListBoxStyle
        id={id}
        onClick={(evt) => {
          const postId = evt.target.id;
          console.log(postId);
          navigate(`/readPage/${postId}`);
        }}
      >
        <div id={id} className='articlePhotoBox'>
          {imageUrl !== '' ? (
            <img id={id} src={imageUrl} alt={`${writer}의 썸네일`} />
          ) : (
            <p id={id}>{trimTagContent}</p>
          )}
        </div>

        <div id={id}>
          <h1 id={id}>{title}</h1>
        </div>

        <div id={id} className='articleTxtBox'>
          <p id={id}>{trimTagContent}</p>
        </div>

        <div id={id} className='articleEctBox'>
          <p id={id}>{timeAgo}</p>

          <p id={id}>
            <span id={id} className='writer'>
              {writer}
            </span>
            <FaRegHeart id={id} />
            {localStorage.getItem('accessToken')
              ? likeCntRead.data.data.heartCount
              : anonymousLikeCntRead.data.data.heartCount}
          </p>
        </div>
      </ArticleListBoxStyle>
    </>
  );
};

export default ArticleListBox;
