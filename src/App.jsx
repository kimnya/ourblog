import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Register from './page/Register';

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
`;

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
      <Wrap>
        <FlexBox>
          <Register />
        </FlexBox>
      </Wrap>
    </>
  );
}

export default App;
