import React from 'react';
import useTimeStamp from '../../customHook/articleDate';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import { anonymousLikeCntReadApi, likeCntReadApi } from '../../axios/api';
import { ArticleListBoxStyle } from './article.styles';

const ArticleListBox = ({ article }) => {
  const key = sessionStorage.getItem('accessToken');
  const { title, writer, createdDate, content, id } = article;
  const [timeAgo] = useTimeStamp(createdDate);
  const navigate = useNavigate();

  const markDownTrim = /[#*~!()]*/g;
  const urlRegex = /(https?:\/\/[^ )]*)/;
  const urlTrim = /(?<=!)(.*?)(?=\))/g;
  const imageUrl = content.match(urlRegex);
  const trimTagContent = content.replace(urlTrim, '').replace(markDownTrim, '');

  const likeCntRead = useQuery({
    queryKey: ['likeCnt', id, key],
    queryFn: likeCntReadApi,
    enabled: id && !!key,
  });

  const anonymousLikeCntRead = useQuery({
    queryKey: ['anonymousLikeCnt', id, key],
    queryFn: anonymousLikeCntReadApi,
    enabled: id && !sessionStorage.getItem('accessToken'),
  });

  return (
    <>
      <ArticleListBoxStyle
        id={id}
        onClick={(evt) => {
          const postId = evt.target.id;
          navigate(`/readPage/${postId}`);
        }}
      >
        <div id={id} className='articlePhotoBox'>
          {imageUrl ? <img id={id} src={imageUrl} alt={`${writer}의 썸네일`} /> : <p id={id}>{trimTagContent}</p>}
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
            <FaHeart id={id} />
            {sessionStorage.getItem('accessToken')
              ? likeCntRead.data.data.heartCount
              : anonymousLikeCntRead.data.data.heartCount}
          </p>
        </div>
      </ArticleListBoxStyle>
    </>
  );
};

export default ArticleListBox;
