import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import { FaPlus } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';
import { createCategory, deleteCategory, submitName } from '../../axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const EditCtegoryStyile = styled.div`
  position: absolute;
  left: 0;
  top: 158px;
  width: 100%;
  background-color: #fff;
  /* opacity: 50%; */
  font-size: 18px;
  > div {
    display: flex;
    align-items: center;
    margin-left: 15px;
    > span {
      margin-right: 5px;
    }
  }
  li {
    display: flex;
    justify-content: center;
    align-items: baseline;
    > span {
      align-self: center;
      margin-left: 5px;
    }
  }
  > div {
    margin: 20px 15px 15px 20px;
  }
  > form {
    width: 100%;
    label {
      display: none;
    }
  }
`;

const EditCtegory = () => {
  const queryClient = useQueryClient();
  const categoryArray = queryClient.getQueryData(['myInfo']).data.categories;
  const [editName, setName] = useState();

  const editValue = (evt, idx) => {
    const newCategryName = [...categoryArray];
    newCategryName[idx].categoryName = evt.target.value;
    setName(newCategryName[idx].categoryName);
    console.log(newCategryName[idx]);
  };

  const useCreateCategory = useMutation({
    mutationFn: createCategory,
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  }); //mutation은 mutate()함수로 호출한다.

  const useDeleteCategory = useMutation({
    mutationFn: deleteCategory,
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });

  const useSubmitName = useMutation({
    mutationFn: submitName,
    enabled: false,
  });

  return (
    <EditCtegoryStyile>
      {/* 카테고리 갯수만큼 map으로 리턴 */}
      <div>
        <span>카테고리</span>
        <FaPlus
          onClick={() => {
            useCreateCategory.mutate();
          }}
        />
      </div>
      {categoryArray &&
        categoryArray.map((category, idx) => {
          const { id, categoryName } = category;

          return (
            <>
              <form key={id}>
                <ul>
                  <li>
                    <label htmlFor='category'>category</label>
                    <Input
                      id={id}
                      name='category'
                      defaultValue={categoryArray.categoryName !== '' ? categoryName : ''}
                      placeholder='제목을 입력하세요'
                      onChange={(evt) => {
                        editValue(evt, idx);
                      }}
                      width='100%'
                    />
                    <span>
                      <FaRegCircleCheck
                        onClick={() => {
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
                    {/* map으로 돌렸더니 밸류값이 똑같이 적용되서 수정삭제가 함께 일어남  */}
                  </li>
                </ul>
              </form>
            </>
          );
        })}
    </EditCtegoryStyile>
  );
};

export default EditCtegory;
