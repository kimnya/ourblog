import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const ReadPageStyle = styled.div`
  width: 98vw;
  margin: 0 auto;
  border: 3px solid ${palette.mainGreen};
  border-radius: 25px;
  > p {
    display: inline;
  }
`;

const Title = styled.span`
  border: 1px solid #000;
  display: inline-block;
  margin: 0 auto;
`;

const Articleread = () => {
  const [articleDetail, setDetail] = useState();
  const [heartCnt, setheart] = useState();
  const [isHeartPush, setpush] = useState(false);
  const [content, setContent] = useState();
  const { postId } = useParams();

  const articleDetailread = async (postId) => {
    await axios
      .get(`http://localhost:8081/posting/${postId}`)
      .then((response) => {
        setDetail(response.data);
        console.log('response', response.data);

        setContent(response.data[parseInt(postId) - 1].content);

        console.log(postId);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const pushHeart = () => {
    setpush(!isHeartPush);
  };

  const likeCntRead = async (postId) => {
    await axios
      .get(`http://localhost:8081/heart/get/${postId}`)
      .then((response) => {
        console.log('res', response.data);
        setheart(response.data.heartCount);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const plusLikeCnt = async (postId) => {
    await axios
      .post(`http://localhost:8081/heart/post/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        // console.log(response.status);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const minusLikeCnt = async (postId) => {
    await axios
      .delete(`http://localhost:8081/heart/delete/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        // console.log(response.status);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  useEffect(() => {
    articleDetailread(postId);
    likeCntRead(postId);
  }, []);
  // useEffect(() => {
  //   likeCntRead(postId);
  // }, [heartCnt]);

  return (
    <>
      <ReadPageStyle>
        <p onClick={pushHeart}>
          {!isHeartPush ? (
            <FaRegHeart
              onClick={() => {
                plusLikeCnt(postId);
              }}
              size='24px'
            />
          ) : (
            <FaHeart
              onClick={() => {
                minusLikeCnt(postId);
              }}
              size='24px'
            />
          )}
          {heartCnt}
        </p>

        <Title></Title>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </ReadPageStyle>
    </>
  );
};
export default Articleread;
