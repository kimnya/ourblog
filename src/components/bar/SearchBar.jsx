import React from 'react';
import Input from '../../element/Input';
import { useForm } from 'react-hook-form';
import { searchArticleRead } from '../../axios/api';
import { useQuery } from '@tanstack/react-query';
import ArticleListBox from '../article/ArticleListBox';
import { SearchArticleListStyle, SearchForm } from './bar.styles';

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
      <SearchArticleListStyle>
        <SearchForm
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
        </SearchForm>

        {data &&
          data.data.map((article) => {
            return <ArticleListBox key={article.id} article={article} />;
          })}
      </SearchArticleListStyle>
    </>
  );
};

export default SearchBar;
