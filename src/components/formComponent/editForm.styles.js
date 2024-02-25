import styled from 'styled-components';

export const EmailInputStyle = styled.div`
  > form {
    display: flex;
    position: relative;

    > input {
      width: 200px;
    }
    > button {
      position: absolute;
      top: 0;
      right: -200px;
    }
  }
  > label {
    display: none;
  }
`;

export const ImageInputStyle = styled.div`
  position: absolute;
  > form {
    display: flex;

    > input {
      width: 88px;

      &:focus {
        border: none;
      }
    }
    > button {
      position: absolute;
      top: 0;
      left: 100px;
    }
  }
  > label {
    display: none;
  }
`;

export const NicknameInputStyle = styled.div`
  > form {
    display: flex;
    position: relative;

    > input {
      width: 200px;
    }
    > button {
      position: absolute;
      top: 0;
      right: -200px;
    }
  }
  > label {
    display: none;
  }
`;

export const PasswordInputStyle = styled.div`
  > form {
    display: flex;
    position: relative;

    > input {
      width: 200px;
    }
    > button {
      position: absolute;
      top: 0;
      right: -200px;
    }
  }
  > label {
    display: none;
  }
`;
