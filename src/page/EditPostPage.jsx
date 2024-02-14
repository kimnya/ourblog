import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import { palette } from '../styles/palette';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { articleDetailRead, editPost, getCategories, getProfile, postContent } from '../axios/api';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import EditToastUi from '../components/EditToastUi';
import { onUploadImage } from '../utill/makeShortImageUrl';
import { useTheme } from '../context/ThemeProvider';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { toggleDark } from '../utill/toggleDark';

const EditBoxStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 130vh;
  border: 1px solid #ccc;
  > form {
    position: relative;
    width: 70vw;
    height: 100%;

    > label {
      display: none;
    }

    > input {
      background: ${({ theme }) => theme.inputColor};
      font-size: 30px;
      padding: 5px;
      width: 100%;

      &:focus {
        border: none;
      }
    }
    > select {
      display: flex;
      font-size: 24px;
      width: 100%;
      height: 4vh;
      background-color: #eee;

      > option {
        font-size: 24px;
      }
    }
    > .submitBtn {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4vh;
      background-color: ${palette.mainGreen};
      z-index: 10;
    }
  }
`;

const EditPostPage = () => {
  const { postId } = useParams();
  const articleDetail = useQuery({
    queryKey: ['articleDetail', postId],
    queryFn: articleDetailRead,
  });
  console.log(articleDetail);
  const posting = articleDetail.data.data.find((post) => {
    if (post.postId == postId) {
      return true;
    }
  });
  const [ThemeMode] = useTheme();
  //   const [selected, setSelected] = useState(); //카테고리 아이디 담는 스테이트
  const [title, setTitle] = useState(posting.title);
  const ediPageRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    toggleDark();
  }, [ThemeMode]);

  useEffect(() => {
    ediPageRef.current.getInstance().removeHook('addImageBlobHook');
    ediPageRef.current.getInstance().addHook('addImageBlobHook', onUploadImage);
    ediPageRef.current.getInstance().setMarkdown(posting.content);
  }, []);

  const editPostApi = useMutation({
    mutationFn: editPost,
    onSuccess: async () => {
      navigate(`/readPage/${postId}`);
      await queryClient.invalidateQueries({ queryKey: ['articleDetail'] });
      await queryClient.invalidateQueries({ queryKey: ['userArticle'] });
      await queryClient.invalidateQueries({ queryKey: ['articleRead'] });
    },
  });
  // const getCategory = useQuery({
  //   queryKey: ['getCategory'],
  //   queryFn: getCategories,
  // });
  // console.log('editpageGetCategory', getCategory); //getCategory.data.categories
  // const selectCategory = (evt) => {
  //   setSelected(evt.target.value);
  // };

  const preventSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <>
      <EditBoxStyle>
        <form
          onSubmit={(evt) => {
            const content = ediPageRef.current.getInstance().getMarkdown();
            preventSubmit(evt);
            const data = { postId: postId, title: title, content: content };
            editPostApi.mutate(data);
          }}
        >
          <label htmlFor='title'>title</label>
          <Input
            autoFocus
            name='title'
            $borderColor='editColor'
            width='50vw'
            height='8vh'
            defaultValue={posting.title}
            $placeholder='제목을 입력해주세요 '
            onChange={(evt) => {
              setTitle(evt.target.value);
            }}
          />
          {/* <select onChange={selectCategory} value={selected}>
              {getCategory.data.categories.map((category) => {
                  return (
                      <option key={category.id} value={category.id}>
                      {category.categoryName}
                      </option>
                      );
                    })}
                </select> */}

          <Editor
            usageStatistics={false} //구글 통계수집거부
            previewStyle='vertical' // 옆에 프리뷰 생성
            previewHighlight={false} //프리뷰에 바탕색 입히기
            hideModeSwitch={true} //마크다운,wiswig탭 숨김
            ref={ediPageRef}
            initialEditType='markdown' // wysiwyg & markdown
            theme={ThemeMode === 'dark' ? 'defaultt' : 'dark'}
            width={'50vw'}
            height={'90%'}
            plugins={[colorSyntax]}
          />

          <Button className='submitBtn'>작성완료</Button>
        </form>
      </EditBoxStyle>
    </>
  );
};

export default EditPostPage;
