import React, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SearchArticleBox from './SearchArticleBox';

const Form = styled.form`
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const { register, getValues, handleSubmit } = useForm();
  const [searchList, setSearchList] = useState([]);
  const searchArticle = async (data) => {
    await axios
      .get('http://localhost:8081/posting/list', {
        params: { searchText: data.search },
      })
      .then((response) => {
        console.log(response.data);
        setSearchList(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit((data) => {
          searchArticle(data);
        })}
      >
        <label htmlFor='search'>검색창</label>
        <Input
          {...register('search', {
            onChange: () => {
              console.log(getValues('search'));
            },
          })}
          width='450px'
          height='50px'
          $placeholder='검색할 단어를 입력해주세요.'
          autoFocus
        />
      </Form>
      {searchList &&
        searchList.map((item) => {
          console.log(item);
          return (
            <>
              <div>
                <SearchArticleBox id={item.id} searchItem={item} />;
              </div>
            </>
          );
        })}

      {/* 검색기능 searchText 빈문자열이라면 메시지 띄우기 */}
    </>
  );
};

export default SearchBar;
