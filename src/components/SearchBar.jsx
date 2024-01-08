import React from 'react';
import Input from './Input';
import styled from 'styled-components';

const Form = styled.form`
  > label {
    display: none;
  }
`;

const SearchBar = () => {
  const [searchVelue, setSearchVelue] = useState();
  return (
    <>
      <Form>
        <label htmlFor='searchVelue'>검색창</label>
        <Input width='450px' height='50px' $placeHoder='검색할 단어를 입력해주세요.' autoFocus />;
      </Form>
    </>
  );
};

export default SearchBar;
