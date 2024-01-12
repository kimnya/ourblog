import React, { useEffect, useRef, useState } from 'react';
import TextBox from '../components/TextBox';
import styled from 'styled-components';
import Button from '../components/Button';
import axios from 'axios';

const ContentsBox = styled.div`
  height: 100vh;
  background-color: #d2e42f;
`;

const initTextBox = {
  views: [
    {
      type: 'title',
      text: '기본페이지',
    },
    {
      type: 'h1',
      text: '안녕하세요.',
    },
    {
      type: 'title',
      text: 'page1',
    },
  ],
};

const ArticleWrite = () => {
  const [textBoxes, setTextBoxes] = useState(initTextBox);
  const [focusIdx, setFocusIdx] = useState();
  const [contentsValue, setContentsValue] = useState();
  const $textref = useRef([]);

  const addTextLine = (evt) => {
    evt.target.style.height = 'auto';
    evt.target.style.height = `${evt.target.scrollHeight}px`;
    if (evt.key === 'Enter') {
      const idx = parseInt(evt.target.dataset.idx);
      console.log(idx);
      setTextBoxes((prev) => ({
        ...prev,
        views: [
          ...prev.views.slice(0, idx + 1),
          { type: 'p', text: '성공' },
          ...prev.views.slice(idx + 1, prev.views.length),
        ],
      })); //배열에 객체를 추가하는 이벤트로직

      console.log(textBoxes);
      setFocusIdx(idx + 1);
    }
  };

  useEffect(() => {
    console.log(focusIdx);
    $textref.current[focusIdx]?.focus();
    console.log(contentsValue);
  }, [focusIdx]);

  // const articlePost = async (evt) => {
  //   evt.preventDefault();
  //   await axios
  //     .post('http://localhost:8081/posting/create', {
  //       content: contentsValue,
  //     })
  //     .then((response) => {
  //       alert('게시물작성 성공 ');
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };// 게시물 포스트 호출 보류
  return (
    <>
      <form>
        <ContentsBox onKeyUp={addTextLine} id='content'>
          {textBoxes.views.map((textbox, idx) => {
            return (
              <TextBox
                key={idx}
                $idx={idx}
                $textref={$textref}
                setContentsValue={setContentsValue}
                $textbox={textbox}
              />
            );
          })}
          {/* TextBox를map으로 동적생성 하기위해 initialData가 필요함 */}
        </ContentsBox>
        <Button width='200px' height='50px'>
          제출
        </Button>
      </form>
    </>
  );
};

export default ArticleWrite;
