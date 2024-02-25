import React from 'react';
import Input from '../../element/Input';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { searchArticleRead } from '../../axios/api';
import { useQuery } from '@tanstack/react-query';
import ArticleListBox from '../article/ArticleListBox';

const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  /* width: 1237px;
  height: 710px; */
  > div {
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  margin-bottom: 30px;
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const { register, handleSubmit } = useForm();

  const searchArticle = useQuery({
    queryKey: ['searchArticles'],
    queryFn: searchArticleRead,
    enabled: false,
  });
  const { data } = searchArticle;

  return (
    <>
      <ArticleListStyle>
        <Form
          onSubmit={handleSubmit((data) => {
            if (data !== '') {
              searchArticle.refetch();
            }
          })}
        >
          <label htmlFor='search'>검색창</label>
          <Input
            {...register('search', {})}
            width='450px'
            height='50px'
            $placeholder='검색할 단어를 입력해주세요.'
            autoFocus
          />
        </Form>

        {data &&
          data.data.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </ArticleListStyle>
    </>
  );
};

export default SearchBar;
