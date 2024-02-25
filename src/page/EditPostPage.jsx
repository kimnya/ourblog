import React, { useEffect, useRef, useState } from 'react';
import Input from '../element/Input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { articleDetailRead, editPost, getCategories } from '../axios/api';
import Button from '../element/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { onUploadImage } from '../utill/makeShortImageUrl';
import { useTheme } from '../context/ThemeProvider';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { toggleDark } from '../utill/toggleDark';
import { EditPostBoxStyle } from './page.styles';

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
      <EditPostBoxStyle>
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
      </EditPostBoxStyle>
    </>
  );
};

export default EditPostPage;
