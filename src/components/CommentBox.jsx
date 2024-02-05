import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import EditCommentBox from './EditcommentBox';
import { articleCommentDelete, articleCommentEdit } from '../axios/api';

const CommentBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 30vw;
  padding: 20px;
  border-bottom: 1px solid ${palette.mainGreen};

  .container {
    .pofileBox {
      display: flex;

      > img {
        display: inline-block;
        width: 80px;
        height: 80px;
      }
      .author {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .comment {
      padding: 15px;
      font-size: 16px;
    }
    .authorBox {
      margin-left: 10px;
      > p {
        margin-top: 10px;
      }
    }
  }
  textarea {
    width: 30vw;
  }
  > .linkBox {
    min-width: 80px;
    display: flex;
    a {
      color: ${palette.mainGreen};
      font-weight: bold;
      margin-left: 10px;
      align-self: center;
    }
  }
  > textarea {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const CommentBox = ({ postId, setComments, comment, id }) => {
  const [type, setType] = useState(false);
  const [editConmmentValue, setEditComment] = useState();

  const editComment = (evt) => {
    setEditComment(evt.target.value);
  };

  const editHandler = (evt) => {
    if (evt.target.id == commentId) {
      setType(true);
      console.log('성공');
    }
  };

  const { commentId, reply, createdDate, author, imageUrl } = comment;
  return (
    <>
      <CommentBoxStyle>
        <div className='container'>
          <div className='pofileBox'>
            <img src={imageUrl.match('http') ? `${imageUrl}` : `/${imageUrl}`} alt={`${author}의 썸네일`} />
            {/* 첫 기본 프로필사진은 상대경로로 잡아오고 프로필사진이 바껴서 firebase에 있다면 절대경로에서 잡아온다.  */}
            <div className='authorBox'>
              <p className='author'> {author}</p>
              <p className='date'> {createdDate}</p>
            </div>
          </div>
          <p className='comment'> {!!type ? <textarea onChange={editComment} defaultValue={reply} /> : reply}</p>
        </div>
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
      </CommentBoxStyle>
    </>
  );
};

export default CommentBox;
