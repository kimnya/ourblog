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
  const [textBoxes, setTextBoxes] = useState(initTextBox); //
  const [focusIdx, setFocusIdx] = useState(); //evt.data-idx+1 값 저장
  const $textref = useRef([]);
  const $content = useRef();

  const addTextLine = (evt) => {
    evt.target.style.height = 'auto';
    evt.target.style.height = `${evt.target.scrollHeight}px`;
    if (evt.key === 'Enter') {
      // $content.current.innerText = '';
      const idx = parseInt(evt.target.dataset.idx);
      console.log(idx);
      setTextBoxes((prev) => ({
        ...prev,
        views: [
          ...prev.views.slice(0, idx + 1),
          { type: 'p', text: '' },
          ...prev.views.slice(idx + 1, prev.views.length),
        ],
      })); //배열에 객체를 추가하는 이벤트로직
      //
      console.log(textBoxes);
      setFocusIdx(idx + 1);
    }
  };

  const articleWrite = (evt, idx) => {
    const newViews = [...textBoxes.views];
    newViews[idx].text = evt.target.value;
  }; //onChange 이벤트

  useEffect(() => {
    console.log(focusIdx);
    $textref.current[focusIdx]?.focus();
  }, [focusIdx]);

  const articlePost = async (evt) => {
    evt.preventDefault();
    let idx = 0;
    for (let i = 0; i < textBoxes.views.length; i++) {
      idx = i;
      console.log(textBoxes.views[idx].text);

      // console.log('idx2', idx);
    }
  }; // 게시물 포스트 호출 보류

  //   await axios
  //     .post(
  //       'http://localhost:8081/posting/create',
  //       {
  //         content: textBoxes.views[idx].text,
  //       },
  //       { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
  //     )
  //     .then((response) => {
  //       alert('게시물작성 성공 ');
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }

  return (
    <>
      <form onSubmit={articlePost}>
        <ContentsBox ref={$content} onKeyUp={addTextLine} id='content'>
          {textBoxes.views.map((textbox, idx) => {
            return (
              <>
                <TextBox key={idx} idx={idx} articleWrite={articleWrite} $textref={$textref} textbox={textbox} />;
              </>
            );
          })}
          {/* TextBox를map으로 동적생성 하기위해 initialData에 데이터 추가가 필요함 */}
        </ContentsBox>
        <Button onClick={articlePost} width='200px' height='50px'>
          제출
        </Button>
      </form>
    </>
  );
};

export default ArticleWrite;
