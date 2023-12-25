import styled from 'styled-components';
import Button from './components/Button';
import Input from './components/Input';
import { GlobalStyle } from './styles/GlobalStyle';

const FlexBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  height: 500px;
  border: 1px solid black;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div style={{ display: 'flex' }}>
        <FlexBox>
          <Button width='155px' height='34px' $borderRadius='none'>
            회원가입
          </Button>
          <Button $fontColor='mainGray'>로그인</Button>
          <Button>수정</Button>
          <Button width='70px' $buttonColor='mainOrange'>
            회원탈퇴
          </Button>
        </FlexBox>
        <FlexBox>
          <Input $placeholder='userName' />
          <Input $placeholder='eamil' />
          <Input type='password' $placeholder='password' />
          <Input type='password' $placeholder='password확인' />
          <Input $placeholder='nickName' />
          <Button width='362px' height='29px' $borderRadius='none'>
            회원가입
          </Button>
        </FlexBox>
      </div>
    </>
  );
}

export default App;
