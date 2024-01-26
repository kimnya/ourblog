import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { storage } from './../Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';

//모듈을 useMemo로 감싸지 않으면 렌더링이 발생할 때마다 모듈 객체가 새로 생성되면서 focus가 에디터에서 벗어난다. 위 코드처럼 module 객체를 useMemo로 감싸주도록 하자.

const QuillEditor = () => {
  const [values, setValues] = useState();
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(storage, `image/${Date.now()}`);

        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, 'image', url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
            console.log(url);
          });
        });
      } catch (error) {
        alert('오류');
      }
    });
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
          image: imageHandler,
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
    console.log(values);
    console.log(localStorage.getItem('nickname'));
    axios
      .post(
        'http://localhost:8081/posting/create',
        {
          title: '테스트제목',
          content: values,
          nickName: localStorage.getItem('nickname'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Access-Control-Allow-Origin': 'http://localhost:8081/',
          },
        },
      )
      .then((response) => {
        alert(response.data.content);
      })
      .catch((error) => {
        alert('에러');
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
