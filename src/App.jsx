import styled from "styled-components";
import Button from "./components/Button";

const FlexBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

function App() {
  return (
    <>
      <div>
        <FlexBox>
          <Button width="155px" height="34px" $borderRadius="none">
            회원가입
          </Button>
          <Button $fontColor="mainGray">로그인</Button>
          <Button>수정</Button>
          <Button width="70px" $buttonColor="mainOrange">
            회원탈퇴
          </Button>
        </FlexBox>
      </div>
    </>
  );
}

export default App;
