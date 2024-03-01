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
  const [selected, setSelected] = useState();
  const [title, setTitle] = useState();
  const navgate = useNavigate();
  const editorRef = useRef();
  const queryClient = useQueryClient();

  const postContentApi = useMutation({
    mutationFn: postContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['articleRead']);
    },
    onError: () => {
      alert('게시물 작성에 오류가 있었습니다.');
    },
  });

  const getCategory = useQuery({
    queryKey: ['getCategory'],
    queryFn: getCategories,
  });

  const key = sessionStorage.getItem('accessToken');
  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key,
  });

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
          <option>'카테고리를 선택해 주세요'</option>;
          {getCategory.data.data.categories.map((category) => {
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
