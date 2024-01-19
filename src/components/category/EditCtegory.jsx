import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import { FaPlus } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';

const EditCtegoryStyile = styled.div`
  position: absolute;
  left: 0;
  top: 120px;
  width: 100%;
  background-color: #fff;
  /* opacity: 50%; */
  font-size: 18px;
  > div {
    display: flex;
    align-items: center;
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

const creatingCategory = async () => {
  axios.post(
    'http://localhost:8081/category/create',
    // {
    //   data: {
    //     categoryName: 'category',
    //   },
    // }, //이렇게 쓰면 데이터를 못받는다.
    {
      categoryName: 'category',
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    },
  );
};

const deletingCategory = async (categoryId, evt) => {
  axios.delete(
    `http://localhost:8081//category/${categoryId}`,
    {
      categoryName: evt.target.defaultValue,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:8081/',
      },
    },
  );
};
const EditCtegory = ({ myInfo }) => {
  const [editValue, setValue] = useState();

  const editingValue = (evt) => {
    setValue(evt.target.value);
  };
  return (
    <EditCtegoryStyile>
      {/* 카테고리 갯수만큼 map으로 리턴 */}
      <div>
        <span>카테고리</span> <FaPlus onClick={creatingCategory} />
      </div>
      {myInfo.categories.map((category) => {
        const { id, categoryName } = category; //백엔드코드 업데이트 되면 categoryName으로 바꿔야함
        return (
          <>
            <form>
              <ul>
                <li>
                  <label htmlFor='category'>category</label>
                  <Input
                    id={id}
                    name='category'
                    defaultValue={categoryName}
                    value={editValue}
                    onChange={editingValue}
                    width='100%'
                  />
                  <span>
                    <FaRegCircleCheck />
                  </span>
                  <span>
                    <FaRegCircleXmark
                      onClick={(evt) => {
                        deletingCategory(id, evt);
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
