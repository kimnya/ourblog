import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html';

const Container = styled.div`
  width: 100%;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
`;

const Viewer = styled.div`
  width: calc(50% - 40px);
  height: 400px;
  padding: 20px;
  margin-top: 20px;
  border: 2px solid gray;
`;

const EditDraft = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };
  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append('img', file);
        console.log('reader');
        await uploadImage('03', formData)
          .then(({ DATA, MESSAGE }) => {
            resolve({ data: { link: `/image/03/${DATA.refKey}.${DATA.exts}` } });
          })
          .catch(({ MESSAGE, status }) => {
            alert(MESSAGE);
            // alert('지원하는 파일 확장자가 아닙니다.(.png, jpeg, jpg)')
          });
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Editor
        placeholder='내용을 작성해주세요.'
        localization={{
          locale: 'ko',
        }}
        toolbar={{
          image: { uploadCallback: uploadCallback },
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorStyle={{
          height: '400px',
          width: '100%',
          border: '3px solid lightgray',
          padding: '20px',
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    </>
  );
};

export default EditDraft;
