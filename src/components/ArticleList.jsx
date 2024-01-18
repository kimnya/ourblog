import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import a from './../asset/1.png';
import b from './../asset/2.png';
import c from './../asset/3.png';
import d from './../asset/4.png';
import e from './../asset/5.png';
import f from './../asset/6.png';
import g from './../asset/7.png';
import h from './../asset/8.png';
import axios from 'axios';
import ArticleListBox from './ArticleListBox';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
`;

const aticleList = [
  {
    articleId: 1,
    articleTitle: '누구보다',
    articlePhoto: a,
    articleTxt: 'sds',
    articleWriter: '김냐',
    articleDate: '2023.01.07',
  },
  {
    articleId: 2,
    articleTitle: '뭐라고',
    articlePhoto: b,
    articleTxt: 'ㄴㄹㄴ',
    articleWriter: '김구',
    articleDate: '2023.01.08',
  },
  {
    articleId: 3,
    articleTitle: '완돼',
    articlePhoto: c,
    articleTxt: '팔ㅇㅇ아ㅏ으팡',
    articleWriter: '하루',
    articleDate: '2023.01.09',
  },
  {
    articleId: 4,
    articleTitle: '므나두',
    articlePhoto: d,
    articleTxt: '로로로',
    articleWriter: '규로',
    articleDate: '2023.01.10',
  },
  {
    articleId: 5,
    articleTitle: '뭐?',
    articlePhoto: e,
    articleTxt: '갈ㅊ,치',
    articleWriter: '소냐',
    articleDate: '2023.01.11',
  },
  {
    articleId: 6,
    articleTitle: '누구보다',
    articlePhoto: f,
    articleTxt: 'sds',
    articleWriter: '김냐',
    articleDate: '2023.01.07',
  },
  {
    articleId: 7,
    articleTitle: '고우',
    articlePhoto: g,
    articleTxt: 'ㅊㅊㅊㅊ',
    articleWriter: '하고',
    articleDate: '2023.01.12',
  },
  {
    articleId: 8,
    articleTitle: '므ㅝㅏ',
    articlePhoto: h,
    articleTxt: 'ㅓ채즈루',
    articleWriter: '고구',
    articleDate: '2023.01.13',
  },
]; //목업데이터

const ArticleList = () => {
  const [articleList, setArticle] = useState([]);
  const articleListLoad = async () => {
    await axios
      .get('http://localhost:8081/posting/list', {
        params: {
          searchText: '',
        },
      })
      .then((response) => {
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
      {/* 리스트갯수에 따라 margin값 조절 */}
      <ArticleListStyle>
        {articleList.id !== null &&
          articleList.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
        ;
      </ArticleListStyle>
    </>
  );
};

export default ArticleList;
