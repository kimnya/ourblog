import React, { useContext, useEffect } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from './components/Router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, recallToken } from './axios/api';
import SetTop from './utill/setTop';
import { useNavigate } from 'react-router-dom';
import { IsToggleCtx } from './context/IsToggleProvider';
import AdminPage from './page/AdminPage';

function App() {
  const { setToggle } = useContext(IsToggleCtx);
  const navigate = useNavigate();
  const recallAccessToken = useMutation({
    mutationFn: recallToken,
    onError: () => {
      console.log('에러');
      setToggle((prev) => ({ ...prev, logined: false }));
      sessionStorage.clear();
      navigate('/login');
    },
  });
  useEffect(() => {
    const SILENT_REFRESH_TIME = 1000 * 60 * 25;
    const timer = setInterval(() => {
      recallAccessToken.mutate();
    }, SILENT_REFRESH_TIME);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <SetTop />
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
