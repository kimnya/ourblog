import React, { useState } from 'react';
import Input from '../../element/Input';
import { FaPlus } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';
import { createCategory, deleteCategory, getCategories } from '../../axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditCtegoryStyle } from './category.styles';

const EditCtegory = ({ setFocus, queryArgument }) => {
  const [editName, setName] = useState();
  const queryClient = useQueryClient();

  const categoryArray = useQuery({
    queryKey: ['getCategory', queryArgument],
    queryFn: getCategories,
    enabled: !!queryArgument,
  });

  const editValue = (evt, idx) => {
    const newCategryName = [...categoryArray.data.categories];
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
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getCategory'] });
    },
  });

  const submitName = async (categoryId) => {
    const response = await axios.patch(
      `http://localhost:8081/category/${categoryId}`,
      { categoryName: editName },
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
    );
    return response;
  };

  const useSubmitName = useMutation({
    mutationFn: submitName,
    enabled: false,
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
          categoryArray.data.categories.map((category, idx) => {
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
                      useSubmitName.mutate(id);
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
