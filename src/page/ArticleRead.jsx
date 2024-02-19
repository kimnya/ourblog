import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import { darken } from '../styles/ColorMixin';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import Markdown from 'react-markdown';
import { Viewer } from '@toast-ui/react-editor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from '../components/CommentList';
import {
  AnonymousLikeCntRead,
  articleDetailRead,
  deletePost,
  minusLikeCnt,
  plusLikeCnt,
  userLikeCntRead,
} from '../axios/api';

const ReadPageStyle = styled.div`
  width: 70vw;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 80px;
  border: 3px solid ${palette.mainGreen};
  border-radius: 25px;
  > p {
    display: inline;
  }
  .contentsBox {
    display: flex;
    justify-content: space-between;
    .postInfoBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 33%;
      #writer {
        font-size: 16px;
        font-weight: bold;
      }
      #date {
        font-size: 12px;
      }
      .heartBox {
        font-size: 18px;
        font-weight: bold;
        color: ${palette.mainGreen};

        svg {
          font-size: 32px;
        }
      }
    }

    .editBox {
      display: flex;
      align-items: center;
      font-weight: bold;
      ${darken(0.1)}
      font-size: 16px;
      > a {
        color: ${palette.mainGreen};
        margin-right: 15px;
      }
    }
  }
  .contentBox {
    margin-top: 50px;
    p {
      display: block;
      width: 100%;
      color: ${({ theme }) => theme.txtColor};
      border: 1px solid ${({ theme }) => theme.txtColor};
      > img {
        width: 100%;
      }
    }
  }
`;
const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  font-size: 32px;
`;

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
  console.log('a', articleDetail);

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
        <ReadPageStyle>
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
            {posting.email === localStorage.getItem('email') ? (
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
          {/* <Viewer initialValue={posting.content || ''} /> */}
          <Markdown className='contentBox'>{posting.content}</Markdown>
        </ReadPageStyle>
      )}
      {!edit && <Comment />}
    </>
  );
};

export default Articleread;
