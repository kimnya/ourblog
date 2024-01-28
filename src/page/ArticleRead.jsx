import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { darken, lighten } from '../styles/ColorMixin';
import { AnonymousLikeCntRead, articleDetailRead, minusLikeCnt, plusLikeCnt, userLikeCntRead } from '../axios/api';

const ReadPageStyle = styled.div`
  width: 70vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0 80px;
  border: 3px solid ${palette.mainGreen};
  border-radius: 25px;
  > p {
    display: inline;
  }
  .contentsBox {
    display: flex;
    justify-content: space-between;
    .postInfoBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 22%;
      #writer {
        font-size: 16px;
        font-weight: bold;
      }
      #date {
        font-size: 12px;
      }
      .heartBox {
        font-size: 18px;
        font-weight: bold;
        color: ${palette.mainGreen};

        svg {
          font-size: 32px;
        }
      }
    }

    .editBox {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: ${palette.mainGreen};
      ${darken(0.1)}
      font-size: 16px;
      > p {
        margin-right: 15px;
      }
    }
  }
`;
const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  font-size: 32px;
`;

const Articleread = () => {
  const { postId } = useParams();

  const articleDetail = useQuery({
    queryKey: ['articleDetail', postId],
    queryFn: articleDetailRead,
  });
  console.log('a', articleDetail);

  const likeCntUser = useQuery({
    queryKey: ['userLikeCnt', postId],
    queryFn: userLikeCntRead,
    enabled: localStorage.getItem('accessToken') !== null,
  });

  const likeCntAnonimous = useQuery({
    queryKey: ['AnonimousLikeCnt', postId],
    queryFn: AnonymousLikeCntRead,
    enabled: localStorage.getItem('accessToken') == null,
  });

  const plusLikeCntApi = useQuery({
    queryKey: ['plusLikeCnt', postId],
    queryFn: plusLikeCnt,
    enabled: false,
  });

  const minusLikeCntApi = useQuery({
    queryKey: ['minusLikeCnt', postId],
    queryFn: minusLikeCnt,
    enabled: false,
  });

  const { content } = articleDetail.data.data[postId - 1];

  const posting = articleDetail.data.data.find((post) => {
    if (post.postId == postId) {
      return true;
    }
  });
  const postingDate = posting.createdDate.slice(0, 16);

  return (
    <>
      <ReadPageStyle>
        <Title>{posting.title}</Title>

        <div className='contentsBox'>
          <div className='postInfoBox'>
            <p id='writer'>{posting.writer}</p>
            <p id='date'>{postingDate}</p>
            {localStorage.getItem('accessToken') == null ? (
              <p className='heartBox'>
                <FaRegHeart onClick={() => plusLikeCntApi.refetch()} /> {likeCntAnonimous.data.data.heartCount}
              </p>
            ) : (
              (likeCntUser.data.data.check !== true && (
                <p className='heartBox'>
                  <FaRegHeart onClick={() => plusLikeCntApi.refetch()} /> {likeCntUser.data.data.heartCount}
                </p>
              )) ||
              (likeCntUser.data.data.check == true && (
                <p className='heartBox'>
                  <FaHeart onClick={() => minusLikeCntApi.refetch()} /> {likeCntUser.data.data.heartCount}
                </p>
              ))
            )}
          </div>
          <div className='editBox'>
            <p>수정</p>
            <p>삭제</p>
          </div>
        </div>
        {posting && <div id='contents' dangerouslySetInnerHTML={{ __html: content }} />}
      </ReadPageStyle>
    </>
  );
};

export default Articleread;
