import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { toggleDark } from '../utill/toggleDark';

const EditToastUi = ({ editorRef, ThemeMode }) => {
  useEffect(() => {
    toggleDark();
    console.log(localStorage.getItem('theme'));
  }, [ThemeMode]);
  return (
    <Editor
      placeholder='당신의 이야기를 적어보세요...'
      usageStatistics={false} //구글 통계수집거부
      previewStyle='vertical' // 옆에 프리뷰 생성
      previewHighlight={false} //프리뷰에 바탕색 입히기
      hideModeSwitch={true} //마크다운,wiswig탭 숨김
      ref={editorRef}
      initialValue={' '} // 글 수정 시 사용
      initialEditType='markdown' // wysiwyg & markdown
      theme={ThemeMode === 'dark' ? 'defaultt' : 'dark'}
      width={'50vw'}
      height={'90%'}
      plugins={[colorSyntax]}
    />
  );
};

export default EditToastUi;
