import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Register from './page/Register';
import Login from './page/Login';
import MainPage from './page/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Router from './components/Router';

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
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Wrap>
    </>
  );
}

export default App;
