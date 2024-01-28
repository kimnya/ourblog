import React, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import SearchArticleBox from './SearchArticleBox';
import { searchArticleRead } from '../axios/api';
import { useQuery } from '@tanstack/react-query';
import ArticleListBox from './ArticleListBox';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  /* width: 1237px;
  height: 710px; */
`;

const Form = styled.form`
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const [searchData, setData] = useState();
  const { register, getValues, handleSubmit } = useForm();

  const searchArticle = useQuery({
    queryKey: ['searchArticles', searchData],
    queryFn: searchArticleRead,
    enabled: searchData !== null,
  });
  const { data } = searchArticle;
  console.log(searchArticle);

  return (
    <>
      <ArticleListStyle>
        <Form
          onSubmit={handleSubmit((data) => {
            setData(data.search);
            searchArticle.refetch();
          })}
        >
          <label htmlFor='search'>검색창</label>
          <Input
            {...register('search', {
              // onChange: (evt) => {
              //   setData(getValues('search'));
              // },
            })}
            width='450px'
            height='50px'
            $placeholder='검색할 단어를 입력해주세요.'
            autoFocus
          />
        </Form>

        {/* 리스트갯수에 따라 margin값 조절 */}

        {data &&
          data.data.map((article) => {
            // articleList는 객체 그 안에 데이터 객체가 있고 그안에 데이터 배열이 있다. 내가 원하는 건 배열
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>

      {/* 검색기능 searchText 빈문자열이라면 메시지 띄우기 */}
    </>
  );
};

export default SearchBar;
