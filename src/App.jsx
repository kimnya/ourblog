import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Register from './page/Register';
import Login from './page/Login';

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrap>
        {/* <Login /> */}
        <Register />
      </Wrap>
    </>
  );
}

export default App;
