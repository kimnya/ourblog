import { GlobalStyle } from './styles/GlobalStyle';
import Register from './page/Register';
import Login from './page/Login';
import MainPage from './page/MainPage';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './page/SearchPage';
import Footer from './components/Footer';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
        <Footer />
      </Wrap>
    </>
  );
}

export default App;
