import styled from 'styled-components';
import { palette } from '../../styles/palette';

export const CommentBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 50vw;

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
  .editArea {
    background: ${({ theme }) => theme.inputColor};
    color: ${({ theme }) => theme.txtColor};
  }
`;
