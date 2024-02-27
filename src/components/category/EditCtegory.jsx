import React, { useState } from 'react';
import Input from '../../element/Input';
import { FaPlus } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';
import { createCategory, deleteCategory, getCategories, submitName } from '../../axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditCtegoryStyle } from './category.styles';
import { baseUrl } from '../../utill/baseUrl';

const EditCtegory = ({ setFocus, queryArgument }) => {
  const [editName, setName] = useState();
  const queryClient = useQueryClient();

  const categoryArray = useQuery({
    queryKey: ['getCategory', queryArgument],
    queryFn: getCategories,
    enabled: !!queryArgument,
  });

  const editValue = (evt, idx) => {
    const newCategryName = [...categoryArray.data.data.categories];
    newCategryName[idx].categoryName = evt.target.value;
    setName(evt.target.value);
  };

  const useCreateCategory = useMutation({
    mutationFn: createCategory,
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getCategory']);
    },
  });

  const useDeleteCategory = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getCategory'] });
    },
  });

  const useSubmitName = useMutation({
    mutationFn: submitName,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getCategory'] });
    },
  });

  return (
    <EditCtegoryStyle>
      <div>
        <span>카테고리</span>
        <FaPlus
          onClick={() => {
            useCreateCategory.mutate();
          }}
        />
      </div>

      <ul>
        {!!categoryArray &&
          categoryArray.data.data.categories.map((category, idx) => {
            const { id, categoryName } = category;
            return (
              <li key={id}>
                <label htmlFor='category'>category</label>
                <Input
                  key={id}
                  ref={setFocus}
                  id={id}
                  name='category'
                  defaultValue={!!categoryName ? categoryName : ''}
                  placeholder='제목을 입력하세요'
                  onChange={(evt) => {
                    editValue(evt, idx);
                  }}
                  width='100%'
                />
                <span>
                  <FaRegCircleCheck
                    onClick={() => {
                      console.log(editName);
                      useSubmitName.mutate(id, editName);
                    }}
                  />
                </span>
                <span>
                  <FaRegCircleXmark
                    id={id}
                    onClick={() => {
                      if (confirm('정말로 삭제하시겠습니까?')) {
                        useDeleteCategory.mutate(id);
                      }
                    }}
                  />
                </span>
              </li>
            );
          })}
      </ul>
    </EditCtegoryStyle>
  );
};

export default EditCtegory;
