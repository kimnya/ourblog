import React from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
const CommentBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30vw;
  padding: 20px;
  border-bottom: 1px solid ${palette.mainGreen};
`;

const EditCommentBox = ({ comment }) => {
  return (
    <>
      <CommentBoxStyle>
        <textarea />
      </CommentBoxStyle>
    </>
  );
};

export default EditCommentBox;
