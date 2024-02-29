import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import Markdown from 'react-markdown';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from '../components/comment/CommentList';
import {
  AnonymousLikeCntRead,
  articleDetailRead,
  deletePost,
  minusLikeCnt,
  plusLikeCnt,
  userLikeCntRead,
} from '../axios/api';
import { ArticleReadPageStyle, Title } from './page.styles';

const Articleread = () => {
  const key = sessionStorage.getItem('accessToken');
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();

  const articleDetail = useQuery({
    queryKey: ['articleDetail', postId],
    queryFn: articleDetailRead,
  });

  const likeCntUser = useQuery({
    queryKey: ['userLikeCnt', postId, key],
    queryFn: userLikeCntRead,
    enabled: !!key,
  });

  const likeCntAnonimous = useQuery({
    queryKey: ['AnonimousLikeCnt', postId],
    queryFn: AnonymousLikeCntRead,
    enabled: !key,
  });

  const plusLikeCntApi = useMutation({
    mutationFn: plusLikeCnt,
    onError: () => {
      alert('로그인 후 이용할 수 있습니다.');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userLikeCnt', postId] });
      await queryClient.invalidateQueries({ queryKey: ['likeCnt'] });
    },
  });

  const minusLikeCntApi = useMutation({
    mutationFn: minusLikeCnt,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userLikeCnt', postId] });
      await queryClient.invalidateQueries({ queryKey: ['likeCnt'] });
    },
  });

  const deletePostApi = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articleRead'] });
      navigate('/articleAll');
    },
  });

  const posting = articleDetail.data.data.find((post) => {
    if (post.postId == postId) {
      return true;
    }
  });
  const postingDate = posting.createdDate.slice(0, 16);

  return (
    <>
      {edit ? (
        // <EditPostPage
        //   postId={posting.postId}
        //   setEdit={setEdit}
        //   edit={edit}
        //   prevTitle={posting.title}
        //   contents={posting.content}
        // />
        <Navigate to={`/editPostPage/${postId}`} />
      ) : (
        <ArticleReadPageStyle>
          <Title>{posting.title}</Title>

          <div className='contentsBox'>
            <div className='postInfoBox'>
              <p id='writer'>{posting.writer}</p>
              <p id='date'>{postingDate}</p>
              {sessionStorage.getItem('accessToken') === null ? (
                <p className='heartBox'>
                  <FaRegHeart onClick={() => alert('로그인 후 이용할 수 있습니다.')} />
                  {likeCntAnonimous.data.data.heartCount}
                </p>
              ) : (
                (!likeCntUser.data.data.check && (
                  <p className='heartBox'>
                    <FaRegHeart onClick={() => plusLikeCntApi.mutate(postId)} /> {likeCntUser.data.data.heartCount}
                  </p>
                )) ||
                (!!likeCntUser.data.data.check && (
                  <p className='heartBox'>
                    <FaHeart onClick={() => minusLikeCntApi.mutate(postId)} />
                    {likeCntUser.data.data.heartCount}
                  </p>
                ))
              )}
            </div>
            {posting.email === sessionStorage.getItem('email') ? (
              <div className='editBox'>
                <Link
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  수정
                </Link>
                <Link
                  onClick={() => {
                    deletePostApi.mutate(postId);
                  }}
                >
                  삭제
                </Link>
              </div>
            ) : null}
          </div>
          <Markdown className='contentBox'>{posting.content}</Markdown>
        </ArticleReadPageStyle>
      )}
      {!edit && <Comment />}
    </>
  );
};

export default Articleread;
