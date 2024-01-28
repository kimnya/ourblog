import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import { FaPlus } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';
import { getInfo } from '../../axios/api';
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
  console.log('editcategory mount', categoryArray);
  const [editName, setName] = useState();
  // const [categories, setCategory] = useState([...categoryArray]);
  // console.log('categories mount', categories);

  // useEffect(() => {
  //   setCategory([...categoryArray]);
  // }, [categoryArray.length]);

  const creatingCategory = async () => {
    const response = await axios.post(
      'http://localhost:8081/category/create',
      { categoryName: '' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
    );

    // return response;
  };

  // const updateVideoData = (data, clickedTitleIndex) => {
  //   queryClient.setQueryData(['myInfo', data.categories, clickedTitleIndex], (oldData) => {
  //     return { ...oldData, ...data };
  //   });
  // };

  const createCategory = useMutation({
    mutationFn: creatingCategory,
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['myInfo']);
    },
  }); //mutation은 mutate()함수로 호출한다.

  // 수정 api 주소 변경 다른 api도 확인 해봐야함

  const deletingCategory = async (categoryId) => {
    const response = await axios.delete(`http://localhost:8081/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    // return response;
  };
  const deleteCategory = useMutation({
    queryKey: ['myInfo'],
    mutationFn: deletingCategory,
    enabled: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });

  const editValue = (evt, idx) => {
    const newCategryName = [...categoryArray];
    const { value } = evt.target;
    newCategryName[idx].categoryName = value;
    setName(value);
  };

  const submitingName = async (categoryId) => {
    axios.patch(
      `http://localhost:8081/category/${categoryId}`,
      {
        categoryName: editName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Access-Control-Allow-Origin': 'http://localhost:8081/', // 서버 domain
        },
      },
    );
  };

  const submitName = useMutation({
    mutationFn: submitingName,
    enabled: false,
  });

  return (
    <EditCtegoryStyile>
      {/* 카테고리 갯수만큼 map으로 리턴 */}
      <div>
        <span>카테고리</span>
        <FaPlus
          onClick={() => {
            const idx = categoryArray.at(-1).id;
            createCategory.mutate(idx);
            // setCategory((prev) => [...prev, { id: idx + 1, categoryName: '', postings: [] }]);
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
                          submitName.mutate(id);
                        }}
                      />
                    </span>
                    <span>
                      <FaRegCircleXmark
                        id={id}
                        onClick={() => {
                          if (confirm('정말로 삭제하시겠습니까?')) {
                            deleteCategory.mutate(id);

                            // setCategory((prev) => [
                            //   ...prev.filter((category) => {
                            //     return id !== category.id;
                            //   }),
                            // ]);
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
