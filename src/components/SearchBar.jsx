import React, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SearchArticleBox from './SearchArticleBox';
import { searchArticle } from '../axios/api';
import { useQuery } from '@tanstack/react-query';

const Form = styled.form`
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const [searchData, setData] = useState();
  const { register, getValues, handleSubmit } = useForm();

  const searchList = useQuery({
    queryKey: ['searchedArticle', searchData],
    queryFn: searchArticle,
    enabled: searchData !== null,
  });
  console.log(searchList);

  return (
    <>
      <Form
        onSubmit={handleSubmit((data) => {
          setData(data.search);
          console.log(data.search);
        })}
      >
        <label htmlFor='search'>검색창</label>
        <Input
          {...register('search')}
          width='450px'
          height='50px'
          $placeholder='검색할 단어를 입력해주세요.'
          autoFocus
        />
      </Form>
      {/* {searchList &&
        searchList.data.map((item) => {
          console.log(item);
          return (
            <>
              <div>
                <SearchArticleBox id={item.id} searchItem={item} />;
              </div>
            </>
          );
        })} */}

      {/* 검색기능 searchText 빈문자열이라면 메시지 띄우기 */}
    </>
  );
};

export default SearchBar;
