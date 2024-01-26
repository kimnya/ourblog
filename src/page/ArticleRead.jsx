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

// {
//   check: false,
//   heartCount: 0,
// }
const Articleread = () => {
  const [articleDetail, setDetail] = useState();
  const [content, setContent] = useState();
  const [heartCnt, setHeart] = useState({
    check: false,
    heartCount: 0,
  });
  {
    console.log(heartCnt);
  }
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

  const likeCntRead = async (postId) => {
    await axios
      .get(`http://localhost:8081/heart/get/${postId}`)
      .then((response) => {
        console.log('res', response.data);
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setHeart((prev) => ({
          ...prev,
          check: data.check,
          heartCount: data.heartCount,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const plusLikeCnt = async (postId) => {
    await axios
      .post(
        `http://localhost:8081/heart/post/${postId}`,
        {}, //get이외의 api호출에서는 body부분 명시해야함 안하면 500에러
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        },
      )
      .then((response) => {
        console.log(response.status);
        setHeart((prev) => ({
          ...prev,
          check: !prev.check,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const minusLikeCnt = async (postId) => {
    await axios
      .delete(
        `http://localhost:8081/heart/delete/${postId}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        },
      )
      .then((response) => {
        console.log(response.status);
        setHeart((prev) => ({
          ...prev,
          check: !prev.check,
          heartCount: prev.heartCount - 1,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    articleDetailread(postId);
  }, []);
  useEffect(() => {
    likeCntRead(postId);
  }, [heartCnt.check]);

  return (
    <>
      <ReadPageStyle>
        <p>
          {heartCnt.check !== true ? (
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
          {heartCnt.heartCount}
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
