import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import useTimeStamp from '../components/customHook/articleDate';
import { FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getArticle } from '../axios/api';
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

const SearchArticleBox = ({ searchItem }) => {
  const { title, writer, createdDate, content, likeCnt } = searchItem;
  const navigate = useNavigate();
  const [timeAgo] = useTimeStamp(createdDate);

  const getSearchedArticle = useQuery({
    queryKey: ['searchedArticle'],
    queryFn: getArticle,
  });

  const trim = /<[^>]*>?/g;
  const urlRegex = /(https?:\/\/[^ ]*)/;
  const trimTagContent = content.replace(trim, '');
  const imageUrl = content.match(urlRegex)[1].replace(trim, '').replace(/">\D*/g, '');

  return (
    <>
      <ArticleListBoxStyle
        onClick={() => {
          getSearchedArticle.mutate(searchItem.id);
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

export default SearchArticleBox;
