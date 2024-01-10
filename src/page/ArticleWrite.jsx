import React, { useEffect, useRef, useState } from 'react';
import TextBox from '../components/TextBox';
import styled from 'styled-components';

const ContentsBox = styled.div`
  height: 100vh;
  background-color: #d2e42f;
`;

const initTextBox = [
  {
    id: 0,
    type: 'title',
    text: '기본페이지',
  },
  {
    id: 1,
    type: 'h1',
    text: '안녕하세요.',
  },
  {
    id: 2,
    type: 'title',
    text: 'page1',
  },
];

const ArticleWrite = () => {
  const [textBoxes, setTextBoxes] = useState(initTextBox);
  const $textref = useRef([]);

  const addTextLine = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.key === 'Enter') {
      const idx = parseInt(e.target.dataset.idx);
      console.log(idx);
      setTextBoxes((prev) => [...prev.slice(0, idx + 1), { id: idx + 1, type: 'p', text: '성공' }]); //배열에 객체를 추가하는 이벤트로직

      console.log(textBoxes);
      $textref.current.focus();
    }
  };

  return (
    <>
      <ContentsBox onKeyUp={addTextLine} id='content'>
        {textBoxes.map((textbox) => {
          return <TextBox key={textbox.id} $textref={$textref} textbox={textbox} />;
        })}
        {/* TextBox를map으로 동적생성 하기위해 initialData가 필요함 */}
      </ContentsBox>
    </>
  );
};

export default ArticleWrite;
