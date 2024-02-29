import React, { useContext, useRef } from 'react';
import { palette } from '../../styles/palette';
import { Link, useNavigate } from 'react-router-dom';
import EditCtegory from './EditCtegory';
import { FaGear } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProfile } from '../../axios/api';
import { CategoryBox } from './category.styles';
import { IsToggleCtx } from '../../context/IsToggleProvider';

const CategryList = () => {
  const { toggle, setToggle } = useContext(IsToggleCtx);
  const key = sessionStorage.getItem('accessToken');

  const categoryArray = useQuery({
    queryKey: ['getCategory', key],
    queryFn: getCategories,
    enabled: !!key,
  });

  const getProfileApi = useQuery({
    queryKey: ['getProfile', key],
    queryFn: getProfile,
    enabled: !!key,
  });

  const setFocus = useRef();

  const preventEditToggleHandler = () => {
    if (!toggle.edit) {
      setToggle((prev) => ({ ...prev, edit: true }));
    } else if (!!toggle.edit) {
      const boolean = categoryArray.data.data.categories.map((category) => {
        console.log(category.categoryName);
        if (category.categoryName !== '' || category.categoryName !== null) {
          return true;
        } else if (category.categoryName === '' || category.categoryName === null) {
          alert('카테고리 이름을 작성해주세요.');
          setToggle((prev) => ({ ...prev, edit: true }));
          console.log(toggle);
          return false;
        }
      });
      if (boolean) {
        setToggle((prev) => ({ ...prev, edit: false }));
      }
    } else {
      setToggle((prev) => ({ ...prev, edit: false }));
    }
  };

  return (
    <>
      <CategoryBox>
        <div>
          <Link
            onClick={() => {
              setToggle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
            }}
            to='/'
          >
            Home
          </Link>
          {!sessionStorage.getItem('accessToken') ? (
            <p>로그인을 하시면 개인 카테고리가 나옵니다.</p>
          ) : (
            <>
              <p>
                {!!getProfileApi && getProfileApi.data.data.nickname}의 카테고리
                <span>
                  <FaGear size={'24px'} onClick={preventEditToggleHandler} />
                </span>
                {!!toggle.edit && (
                  <span>
                    <FaCheck color={palette.mainGreen} size={'24px'} onClick={preventEditToggleHandler} />
                  </span>
                )}
              </p>

              <Link
                onClick={() => {
                  setToggle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
                }}
                to='/articleAll'
                id='all'
              >
                전체보기
              </Link>
              {!!toggle.edit && <EditCtegory queryArgument={key} setFocus={setFocus} />}
              <ul>
                {!!categoryArray &&
                  categoryArray.data.data.categories.map((category) => {
                    const { id, categoryName } = category;
                    return (
                      <li
                        key={id}
                        onClick={() => {
                          setToggle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
                        }}
                      >
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
