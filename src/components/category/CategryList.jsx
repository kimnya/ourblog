import React, { useRef } from 'react';
import { palette } from '../../styles/palette';
import { Link } from 'react-router-dom';
import EditCtegory from './EditCtegory';
import { FaGear } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProfile } from '../../axios/api';
import { CategoryBox } from './category.styles';

const CategryList = ({ toggle, editToggleHandler, sideBarToggleHandler }) => {
  const key = sessionStorage.getItem('accessToken');

  const categoryArray = useQuery({
    queryKey: ['getCategory'],
    queryFn: getCategories,
  });

  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key,
  });
  console.log(categoryArray);

  const setFocus = useRef();
  return (
    <>
      <CategoryBox>
        <div>
          <Link onClick={sideBarToggleHandler} to='/'>
            Home
          </Link>
          {!sessionStorage.getItem('accessToken') ? (
            <p>로그인을 하시면 개인 카테고리가 나옵니다.</p>
          ) : (
            <>
              <p>
                {!!getProfileApi && getProfileApi.data.data.nickname}의 카테고리
                <span>
                  <FaGear
                    size={'24px'}
                    onClick={() => {
                      editToggleHandler();
                    }}
                  />
                </span>
                {!!toggle.edit && (
                  <span>
                    <FaCheck
                      color={palette.mainGreen}
                      size={'24px'}
                      onClick={() => {
                        editToggleHandler();
                      }}
                    />
                  </span>
                )}
              </p>

              <Link onClick={sideBarToggleHandler} to={'/articleAll'} id='all'>
                전체보기
              </Link>
              {!!toggle.edit && <EditCtegory queryArgument={key} setFocus={setFocus} />}
              <ul>
                {!!categoryArray &&
                  categoryArray.data.categories.map((category) => {
                    const { id, categoryName } = category;
                    return (
                      <li key={id} onClick={sideBarToggleHandler}>
                        <Link key={id} to={`/category${categoryName}`}>
                          {categoryName}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
        </div>
      </CategoryBox>
    </>
  );
};

export default CategryList;
