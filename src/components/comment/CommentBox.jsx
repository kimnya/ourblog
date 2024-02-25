import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articleCommentDelete, articleCommentEdit } from '../../axios/api';
import { CommentBoxStyle } from './comment.styles';

const CommentBox = ({ postId, setComments, comment, id }) => {
  const [type, setType] = useState(false);
  const [editConmmentValue, setEditComment] = useState();

  const editComment = (evt) => {
    setEditComment(evt.target.value);
  };

  const editHandler = (evt) => {
    if (evt.target.id == commentId) {
      setType(true);
    }
  };

  const { commentId, reply, createdDate, author, imageUrl, email } = comment;

  return (
    <>
      <CommentBoxStyle>
        <div className='container'>
          <div className='pofileBox'>
            <img src={imageUrl.match('http') ? `${imageUrl}` : `/${imageUrl}`} alt={`${author}의 썸네일`} />
            <div className='authorBox'>
              <p className='author'> {author}</p>
              <p className='date'> {createdDate}</p>
            </div>
          </div>
          <p className='comment'>
            {!!type ? <textarea className='editArea' onChange={editComment} defaultValue={reply} /> : reply}
          </p>
        </div>

        {email !== localStorage.getItem('email') ? null : (
          <div className='linkBox'>
            {!!type ? (
              <Link
                id={id}
                onClick={() => {
                  if (editConmmentValue == '') {
                    alert('댓글을 작성해주세요');
                  } else {
                    articleCommentEdit(commentId, editConmmentValue, setComments, postId);
                    setType(false);
                    setEditComment('');
                  }
                }}
              >
                저장
              </Link>
            ) : (
              <Link id={id} onClick={editHandler}>
                수정
              </Link>
            )}
            <Link
              id={id}
              onClick={(evt) => {
                articleCommentDelete(commentId, setComments, postId);
              }}
            >
              삭제
            </Link>
          </div>
        )}
      </CommentBoxStyle>
    </>
  );
};

export default CommentBox;
