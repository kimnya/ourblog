import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import { palette } from '../styles/palette';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getInfo, postContent } from '../axios/api';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import EditQuill from '../components/editQuill';

const EditBoxStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
  /* border: 1px solid #000; */
  > form {
    position: relative;
    > label {
      display: none;
    }
    > input {
      background-color: #ddd;
      font-size: 30px;
      padding: 5px;

      &:focus {
        border: none;
      }
    }
    > select {
      display: flex;
      font-size: 24px;
      width: 50vw;
      height: 4vh;
      background-color: #eee;

      > option {
        font-size: 24px;
      }
    }
    button {
      position: absolute;
      z-index: 10;
      left: 0;
      bottom: 0;
      width: 50vw;
      height: 4vh;
      background-color: ${palette.mainGreen};
      border: none;
    }
  }
`;

const EditPage = () => {
  const [selected, setSelected] = useState();
  const [values, setValues] = useState();
  const [title, setTitle] = useState();
  const navgate = useNavigate();

  const queryClient = useQueryClient();

  const postContentApi = useMutation({
    mutationFn: postContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
      await queryClient.invalidateQueries(['articleRead']);
    },
  });

  const getCategories = useQuery({
    queryKey: ['myInfo'],
    queryFn: getInfo,
    enabled: localStorage.getItem('accessToken') !== null,
  });

  const selectCategory = (evt) => {
    setSelected(evt.target.value);
  };

  const writeTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const preventSubmit = (evt) => {
    evt.preventDefault();
  };

  const { data } = getCategories;
  return (
    <EditBoxStyle>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          navgate('/');
          postContentApi.mutate({
            title: title,
            content: values,
            nickName: data.data.nickname,
            categoryId: selected,
          });
          console.log('d', {
            title: title,
            content: values,
            nickName: data.data.nickname,
            categoryId: selected,
          });
        }}
      >
        <label htmlFor='title'>title</label>
        <Input
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              preventSubmit(evt);
            }
          }}
          autoFocus
          name='title'
          value={title}
          onChange={writeTitle}
          $borderColor='editColor'
          width='50vw'
          height='8vh'
          $placeholder='제목을 입력해주세요 '
        />
        <select onChange={selectCategory} value={selected}>
          {data.data.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            );
          })}
        </select>

        <EditQuill values={values} setValues={setValues} />
        <Button
          onSubmit={(evt) => {
            evt.preventDefault();
            navgate('/');
            const data = {
              title: title,
              content: values,
              nickName: data.data.nickname,
              categoryId: selected,
            };

            postContentApi.mutate(data);
            console.log('d', {
              title: title,
              content: values,
              nickName: data.data.nickname,
              categoryId: selected,
            });
          }}
        >
          작성완료
        </Button>
      </form>
    </EditBoxStyle>
  );
};

export default EditPage;
