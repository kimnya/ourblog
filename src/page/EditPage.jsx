import React, { useEffect, useRef, useState } from 'react';
import Input from '../element/Input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories, getProfile, postContent } from '../axios/api';
import Button from '../element/Button';
import { useNavigate } from 'react-router-dom';
import EditToastUi from '../element/EditToastUi';
import { onUploadImage } from '../utill/makeShortImageUrl';
import { useTheme } from '../context/ThemeProvider';
import { EditBoxStyle } from './page.styles';

const EditPage = () => {
  const [ThemeMode] = useTheme();
  const [selected, setSelected] = useState(); //카테고리 아이디 담는 스테이트
  const [title, setTitle] = useState();
  const navgate = useNavigate();
  const editorRef = useRef();
  const queryClient = useQueryClient();
  console.log('제목', title);

  const postContentApi = useMutation({
    mutationFn: postContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['articleRead']);
    },
  });

  const getCategory = useQuery({
    queryKey: ['getCategory'],
    queryFn: getCategories,
  });
  console.log('editpageGetCategory', getCategory);

  const key = sessionStorage.getItem('accessToken');
  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key,
  });
  console.log('editpageGetProfileApi', getProfileApi);

  const selectCategory = (evt) => {
    setSelected(evt.target.value);
  };

  const preventSubmit = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    editorRef.current.getInstance().removeHook('addImageBlobHook');
    editorRef.current.getInstance().addHook('addImageBlobHook', onUploadImage);
  }, []);

  return (
    <EditBoxStyle>
      <form
        onSubmit={(evt) => {
          const content = editorRef.current.getInstance().getMarkdown();
          console.log('본문', content);

          if (content === '' || title === undefined) {
            alert('을 입력해주세요.');
          } else {
            preventSubmit(evt);
            navgate('/articleAll');
            const data = {
              title: title,
              content: content,
              nickname: getProfileApi.data.data.nickname,
              categoryId: selected,
            };
            postContentApi.mutate(data);
          }
        }}
      >
        <label htmlFor='title'>title</label>
        <Input
          autoFocus
          name='title'
          $borderColor='editColor'
          width='50vw'
          height='8vh'
          $placeholder='제목을 입력해주세요 '
          onChange={(evt) => {
            setTitle(evt.target.value);
          }}
          value={title || ''}
        />
        <select onChange={selectCategory} value={selected}>
          {getCategory.data.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            );
          })}
        </select>

        <EditToastUi ThemeMode={ThemeMode} editorRef={editorRef} />
        <Button className='submitBtn'>작성완료</Button>
      </form>
    </EditBoxStyle>
  );
};

export default EditPage;
