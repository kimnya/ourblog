import React, { useEffect, useRef, useState } from 'react';
import TextBox from '../components/TextBox';
import styled from 'styled-components';

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
  const $textref = useRef([]);

  const addTextLine = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.key === 'Enter') {
      const idx = parseInt(e.target.dataset.idx);
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
  }, [focusIdx]);

  return (
    <>
      <ContentsBox onKeyUp={addTextLine} id='content'>
        {textBoxes.views.map((textbox, idx) => {
          return <TextBox key={idx} $idx={idx} $textref={$textref} $textbox={textbox} />;
        })}
        {/* TextBox를map으로 동적생성 하기위해 initialData가 필요함 */}
      </ContentsBox>
    </>
  );
};

export default ArticleWrite;
