import React, { useContext, useState } from 'react';
import UserArticleAll from '../components/article/UserArticleAll';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../components/bar/SideBar';
import { userArticleRead } from '../axios/api';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../element/Pagination';
import { UserAllArticlePageStyle } from './page.styles';
import { IsToggleCtx } from '../context/IsToggleProvider';

const AllArticlePage = () => {
  const [page, setPage] = useState(1);
  const { toggle, setToggle } = useContext(IsToggleCtx);
  const navigate = useNavigate();

  const userArticle = useQuery({
    queryKey: ['userArticle'],
    queryFn: userArticleRead,
    enabled: sessionStorage.getItem('accessToken') !== null,
  });

  const { data } = userArticle;
  const limit = 8;
  const offset = (page - 1) * limit;

  const moveWritePge = (evt) => {
    evt.preventDefault();
    if (sessionStorage.getItem('accessToken')) {
      navigate('/write');
    } else {
      alert('로그인 해주세요');
      navigate('/login');
    }
  };

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  const editToggleHandler = () => {
    setToggle((prev) => ({ ...prev, edit: !prev.edit }));
  };
  const sideBarToggleHandler = () => {
    setToggle((prev) => ({ ...prev, sideBar: !prev.sideBar }));
  };

  const reactIconsSize = '22px';
  return (
    <>
      <UserAllArticlePageStyle>
        <SideBar
          toggle={toggle}
          reactIconsSize={reactIconsSize}
          sideBarToggleHandler={sideBarToggleHandler}
          editToggleHandler={editToggleHandler}
        />
        <UserArticleAll posts={postsData(data.data)} />
        <Link onClick={moveWritePge}>글 작성하기</Link>
        {data.data.length !== 0 && (
          <Pagination limit={limit} page={page} totalPosts={data.data.length} setPage={setPage} />
        )}
      </UserAllArticlePageStyle>
    </>
  );
};

export default AllArticlePage;
