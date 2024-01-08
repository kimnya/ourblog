import React, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';

const Form = styled.form`
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState();

  const searchEventHandler = (evt) => {
    setSearchValue(evt.target.value);
    console.log(evt.target.value);
  };
  return (
    <>
      <Form>
        <label htmlFor='search'>검색창</label>
        <Input
          onChange={searchEventHandler}
          value={searchValue}
          id='search'
          width='450px'
          height='50px'
          $placeholder='검색할 단어를 입력해주세요.'
          autoFocus
        />
      </Form>
    </>
  );
};

export default SearchBar;
