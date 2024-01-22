import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import { FaPlus } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';
import { CtxMyInfo, CtxSetMyInfo } from '../Header';

const EditCtegoryStyile = styled.div`
  position: absolute;
  left: 0;
  top: 136px;
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
  const [editName, setName] = useState();
  const myInfo = useContext(CtxMyInfo);
  const setMyInfo = useContext(CtxSetMyInfo);

  const creatingCategory = async (idx) => {
    axios.post(
      'http://localhost:8081/category/create',
      // {
      //   data: {
      //     categoryName: 'category',
      //   },
      // }, //이렇게 쓰면 데이터를 못받는다.
      {
        categoryName: '',
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Access-Control-Allow-Origin': 'http://localhost:8081/', // 서버 domain
        },
      },
    );
    setMyInfo((prev) => ({
      ...prev,
      categories: [...myInfo.categories, { id: idx + 1, categoryName: '', postings: [] }],
    }));
    console.log('create', myInfo);
  };
  // 수정 api 주소 변경 다른 api도 확인 해봐야함

  const deletingCategory = async (categoryId) => {
    axios.delete(`http://localhost:8081/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:8081/', // 서버 domain
      },
    });

    setMyInfo((prev) => ({
      ...prev,
      categories: [
        ...myInfo.categories.filter((category) => {
          return categoryId !== category.id;
        }),
      ],
    }));
  };

  const editingValue = (evt, idx) => {
    const newCategryName = [...myInfo.categories];
    const { value } = evt.target;
    newCategryName[idx].categoryName = value;
    setName(value);
  };

  const submitingName = async (evt, categoryId) => {
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

  return (
    <EditCtegoryStyile>
      {/* 카테고리 갯수만큼 map으로 리턴 */}
      <div>
        <span>카테고리</span>{' '}
        <FaPlus
          onClick={() => {
            const idx = myInfo.categories.at(-1).id;
            creatingCategory(idx);
          }}
        />
      </div>
      {myInfo.categories.map((category, idx) => {
        const { id, categoryName } = category;

        return (
          <>
            <form
              // submitingName={(evt) => {
              //   submitValue(evt, id, editName);
              //   console.log(evt.target.value);
              // }}
              key={id}
            >
              <ul>
                <li>
                  <label htmlFor='category'>category</label>
                  <Input
                    id={id}
                    name='category'
                    defaultValue={categoryName !== '' ? categoryName : ''}
                    placeholder={'제목을 입력하세요'}
                    onChange={(evt) => {
                      editingValue(evt, idx);
                    }}
                    width='100%'
                  />
                  <span>
                    <FaRegCircleCheck
                      onClick={(evt) => {
                        submitingName(evt, id);
                        console.log('v', editName);
                        console.log('i', id);
                      }}
                    />
                  </span>
                  <span>
                    <FaRegCircleXmark
                      onClick={() => {
                        if (confirm('정말로 삭제하시겠습니까?')) {
                          deletingCategory(id);
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
