import axios from 'axios';
import React, { ReactChild, ReactFragment, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//모듈을 useMemo로 감싸지 않으면 렌더링이 발생할 때마다 모듈 객체가 새로 생성되면서 focus가 에디터에서 벗어난다. 위 코드처럼 module 객체를 useMemo로 감싸주도록 하자.

const QuillEditor = () => {
  const [values, setValues] = useState();
  const quillRef = useRef(null);

  const handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];

      // 현재 커서 위치 저장
      const range = getEditor().getSelection(true);

      // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
      getEditor().insertEmbed(range.index, 'image', `/images/loading.gif`);

      try {
        // 필자는 파이어 스토어에 저장하기 때문에 이런식으로 유틸함수를 따로 만들어줬다
        // 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다
        const filePath = `contents/temp/${Date.now()}`;
        const url = await uploadImage(file, filePath);

        // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
        getEditor().deleteText(range.index, 1);
        // 받아온 url을 이미지 태그에 삽입
        getEditor().insertEmbed(range.index, 'image', url);

        // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
        getEditor().setSelection(range.index + 1);
      } catch (e) {
        getEditor().deleteText(range.index, 1);
      }
    };
  };

  const modules = useCallback(
    {
      toolbar: {
        container: [
          ['link', 'image', 'video'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: handleImage,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      clipboard: {
        matchVisual: false,
      },
    },
    [],
  );

  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];

  const postContent = async (values) => {
    axios
      .post(
        'http//localhost:8081/posting/create',
        { content: values },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
      )
      .then((response) => {
        alert(response.mesage);
      })
      .catch((error) => {
        alert(error.mesage);
      });
  };

  return (
    <>
      <button onClick={() => postContent(values)}>Value</button>
      <ReactQuill
        ref={quillRef}
        style={{ height: '100vh' }}
        theme='snow'
        modules={modules}
        formats={formats}
        onChange={setValues}
      />
    </>
  );
};

export default QuillEditor;
