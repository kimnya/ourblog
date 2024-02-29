import styled from 'styled-components';
import { darken } from '../styles/ColorMixin';
import { palette } from '../styles/palette';

export const UserAllArticlePageStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
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

export const EditBoxStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 130vh;
  border: 1px solid #ccc;
  > form {
    position: relative;
    width: 70vw;
    height: 100%;

    > label {
      display: none;
    }

    > input {
      width: 100%;
      padding: 5px;
      font-size: 30px;
      background: ${({ theme }) => theme.inputColor};

      &:focus {
        border: none;
      }
    }
    > select {
      display: flex;
      width: 100%;
      height: 4vh;
      font-size: 24px;
      background: ${({ theme }) => theme.inputColor};

      > option {
        font-size: 24px;
      }
    }
    > .submitBtn {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4vh;
      background-color: ${palette.mainGreen};
      z-index: 10;
    }
  }
`;

export const EditPostBoxStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 130vh;
  border: 1px solid #ccc;
  > form {
    position: relative;
    width: 70vw;
    height: 100%;

    > label {
      display: none;
    }

    > input {
      background: ${({ theme }) => theme.inputColor};
      font-size: 30px;
      padding: 5px;
      width: 100%;

      &:focus {
        border: none;
      }
    }
    > select {
      display: flex;
      font-size: 24px;
      width: 100%;
      height: 4vh;
      background-color: #eee;

      > option {
        font-size: 24px;
      }
    }
    > .submitBtn {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4vh;
      background-color: ${palette.mainGreen};
      z-index: 10;
    }
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  height: 160px;
  & label {
    display: none;
  }
  & small {
    width: 362px;
    color: red;
    font-size: 12px;
  }
  & a {
    align-self: flex-end;
    text-decoration: underline;
  }
`;

export const MainpageStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-top: 30px;
  > a {
    margin: 60px auto;
    color: ${({ theme }) => theme.txtColor};
  }
`;

export const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyInfoStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 506px;
  height: 428px;

  > form {
    .submitButton {
      margin-top: 30px;
      align-self: flex-end;
    }
  }
`;
export const ProfileTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${palette.mainGreen};
  font-weight: bold;
`;

export const MyBox1 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  height: 372px;
  background-color: ${palette.mainGreen};
  border-radius: 16px 16px 0 0;
`;
export const Mybox2 = styled(MyBox1)`
  height: 312px;
  padding: 15px;
  background-color: ${({ theme }) => theme.myPageColor};
  border-radius: 0;
  color: #fff;
  > .profileBox {
    font-size: 32px;
    font-weight: bold;
    > div {
      width: 33.333333%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        display: inline-block;
        width: 84px;
        height: 57px;
      }
    }
  }
  > .profileBox,
  .nicknameBox,
  .emailBox,
  .passwordBox,
  .deleteBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 25px;
  }

  .profileBox {
    > div {
      width: 100%;

      > p {
        width: 100%;
        margin-left: 10px;
      }
    }
  }
`;
