import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import useTimeStamp from '../components/customHook/articleDate';
import { FaRegHeart } from 'react-icons/fa';
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
  const { title, writer, createDate, content, likeCnt, imageUrl } = searchItem;

  const [timeAgo] = useTimeStamp(createDate);

  return (
    <>
      <ArticleListBoxStyle>
        <div className='articlePhotoBox'>{imageUrl ? <img src='#' alt={`의 썸네일`} /> : <p>{content}</p>}</div>
        <div>
          <h1>{title}</h1>
        </div>
        <div className='articleTxtBox'>
          <p>{content}</p>
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

export default SearchArticleBox;
