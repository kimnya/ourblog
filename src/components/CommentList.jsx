import React, { useEffect, useState } from 'react';
import { articleCommentCreate, articleCommentDelete, articleCommentEdit, articleCommentRead } from '../axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Button from './Button';
import Input from './Input';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CommentBox from './CommentBox';
import { palette } from '../styles/palette';
import Modal from './Modal';

const CommentListStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  > form {
    display: flex;
    flex-flow: column nowrap;
    > button {
      align-self: flex-end;
      width: 150px;
      height: 40px;
      margin-top: 15px;
    }
  }

  label {
    display: none;
  }
  .commentEditBox {
    display: flex;

    > a {
      align-self: center;
      color: ${palette.mainGreen};
      font-weight: bold;
      margin-left: 10px;
    }
  }
  small {
    color: ${palette.mainOrange};
    font-size: 14px;
  }
`;

const CommentArea = styled.textarea`
  width: 50vw;
  min-height: 80px;
  padding: 20px;
  border: 1px solid ${palette.mainGreen};
  outline: none;
`;

const CommentList = () => {
  const [comments, setComments] = useState([]);
  console.log(comments);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { postId } = useParams();

  useEffect(() => {
    articleCommentRead(postId, setComments);
  }, [comments.length]);

  // const commentCreate = useMutation({
  //   queryFn: articleCommentCreate,
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({ queryKey: ['aticleComment'] });
  //   },
  // });
  // 왜 호출이 안되는지 모르겠음

  return (
    <CommentListStyle>
      <form
        onSubmit={handleSubmit((data) => {
          const commentData = { postId: postId, reply: data.comment, setComments: setComments };
          articleCommentCreate(commentData);

          reset();
        })}
      >
        <label htmlFor='comment'>comment</label>
        <CommentArea
          {...register('comment', {
            required: '댓글을 입력해주세요.',
          })}
          placeholder='댓글을 입력해주세요.'
        />
        {errors.comment && <small>{errors.comment.message}</small>}
        <Button>댓글작성</Button>
      </form>

      {!!comments &&
        comments.map((comment) => {
          return (
            <CommentBox
              comments={comments}
              setComments={setComments}
              key={comment.commentId}
              id={comment.commentId}
              comment={comment}
              postId={postId}
            />
          );
        })}
    </CommentListStyle>
  );
};

export default CommentList;
