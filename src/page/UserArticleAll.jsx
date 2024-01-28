import React, { useEffect, useState } from 'react';
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
  const navigate = useNavigate();
  const [timeAgo] = useTimeStamp(createdDate);
  const [heartCnt, setHeart] = useState({
    check: false,
    heartCount: 0,
  });
  const trim = /<[^>]*>?/g;
  const urlRegex = /(https?:\/\/[^ ]*)/;
  const trimTagContent = content.replace(trim, '');
  const imageUrl = content.match(urlRegex)[1].replace(trim, '').replace(/">\D*/g, '');

  const likeCntRead = async (postId) => {
    await axios
      .get(`http://localhost:8081/heart/get/${postId}`, {
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

  const anonymousLikeCntRead = async (postId) => {
    await axios
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

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      likeCntRead(id);
    } else {
      anonymousLikeCntRead(id);
    }
  }, []);
  return (
    <>
      <ArticleListBoxStyle
        onClick={() => {
          navigate(`/readPage/${id}`);
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
            {heartCnt.heartCount}
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
      {articleList.map((article) => {
        return (
          <>
            <UserArticleAllBox key={article.id} article={article} />;
          </>
        );
      })}
    </>
  );
};
export default UserArticleAll;
