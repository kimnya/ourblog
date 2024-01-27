import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import useTimeStamp from '../components/customHook/articleDate';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    border: 1px solid #000;
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
  const { title, writer, createdDate, content, id } = article;
  const [heartCnt, setHeart] = useState({
    check: false,
    heartCount: 0,
  });
  const navigate = useNavigate();
  const [timeAgo] = useTimeStamp(createdDate);
  const trim = /<[^>]*>?/g;
  const urlRegex = /(https?:\/\/[^ ]*)/;
  const trimTagContent = content.replace(trim, '');
  const imageUrl = content.match(urlRegex)[1].replace(trim, '').replace(/">\D*/g, '');

  const anonymousLikeCntRead = async (postId) => {
    axios
      .get(`http://localhost:8081/heart/anonymous/${postId}`)
      .then((response) => {
        console.log('res', response.data);
        setHeart((prev) => ({
          ...prev,
          check: response.data.check,
          heartCount: response.data.heartCount,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const likeCntRead = (postId) => {
    axios
      .get(`http://localhost:8081/heart/user/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        console.log('res', response.data);
        setHeart((prev) => ({
          ...prev,
          check: response.data.check,
          heartCount: response.data.heartCount,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      likeCntRead(id);
    } else {
      anonymousLikeCntRead(id);
    }
  }, [heartCnt.heartCount]);
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
          <img id={id} src={imageUrl} alt={`${writer}의 썸네일`} />
          {/* {console.log(url)} */}
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
            {heartCnt.heartCount}
          </p>
        </div>
      </ArticleListBoxStyle>
    </>
  );
};

export default ArticleListBox;
