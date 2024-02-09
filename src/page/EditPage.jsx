import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import { palette } from '../styles/palette';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories, getProfile, postContent } from '../axios/api';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import EditToastUi from '../components/EditToastUi';
import { onUploadImage } from '../utill/makeShortImageUrl';
import { useTheme } from '../context/ThemeProvider';

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

const EditPage = () => {
  const [ThemeMode] = useTheme();
  const [selected, setSelected] = useState(); //카테고리 아이디 담는 스테이트
  const [title, setTitle] = useState();
  const navgate = useNavigate();
  const editorRef = useRef();
  const queryClient = useQueryClient();

  const postContentApi = useMutation({
    mutationFn: postContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['articleRead']);
    },
  });

  // const getCategory = useQuery({
  //   queryKey: ['getCategory'],
  //   queryFn: getCategories,
  // });
  // console.log('editpageGetCategory', getCategory); //getCategory.data.categories

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
          preventSubmit(evt);
          navgate('/');
          const data = {
            title: title,
            content: content,
            nickName: getProfileApi.data.data.nickname,
            categoryId: (getProfileApi.data.data.memberId - 1) * getProfileApi.data.data.memberId,
          };
          console.log(data.categoryId);
          postContentApi.mutate(data);

          console.log('d', data);
          console.log('title', typeof data.title);
          console.log('content', typeof data.content);
          console.log('nickname', typeof data.nickName);
          // console.log('categoryId', typeof data.categoryId);
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
        {/* <select onChange={selectCategory} value={selected}>
          {getCategory.data.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            );
          })}
        </select> */}

        <EditToastUi ThemeMode={ThemeMode} editorRef={editorRef} />
        <Button className='submitBtn'>작성완료</Button>
      </form>
    </EditBoxStyle>
  );
};

export default EditPage;
