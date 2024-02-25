import { darken } from '../styles/ColorMixin';
import { palette } from '../styles/palette';

export const UserAllArticlePageStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;

  margin-top: 30px;

  a {
    margin: 60px auto;
    color: ${({ theme }) => theme.txtColor};
  }
`;

export const ArticleReadPageStyle = styled.div`
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

      > img {
        width: 100%;
      }
    }
  }
`;

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  font-size: 32px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  height: 320px;
  & label {
    display: none;
  }
  & small {
    width: 362px;
    color: red;
    font-size: 12px;
  }
`;
