import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

const TextBoxStyle = styled.p`
  width: 98vw;
  margin-top: 12px;
  padding: 0 8px;
  &:hover button {
    opacity: 0.8;
  }
`;

const TextInput = styled.textarea`
  width: 95vw;
  padding: 0;
  background: none;
  border: none;
  border-bottom: 1px solid #4d4a4a3d;
  outline: none;
  resize: none; //사용자 임의로 영역크기 수정 방지
  overflow: hidden; //스크롤 표시 없애고 전체영역 렌더링

  &::placeholder {
    opacity: 0;
  }
  &:focus::placeholder {
    opacity: 1;
  }
`;

const Text = forwardRef(({ $idx, setContentsValue }, ref) => {
  const [articleContent, setArticleContent] = useState();

  const articleWrite = (evt) => {
    setArticleContent(evt.target.value);
    setContentsValue(articleContent);
  }; //onChange 이벤트
  return (
    <TextInput
      onChange={articleWrite}
      value={articleContent}
      data-idx={$idx}
      ref={ref}
      placeholder='메모작성'
    ></TextInput>
  );
});

const TextBox = ({ $textbox, $textref, $idx, setContentsValue }) => {
  return (
    <>
      <TextBoxStyle data-idx={$idx} $textbox={$textbox}>
        <Text setContentsValue={setContentsValue} $idx={$idx} ref={(element) => ($textref.current[$idx] = element)} />
      </TextBoxStyle>
    </>
  );
};

export default TextBox;
