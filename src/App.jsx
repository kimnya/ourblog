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
  const navgate = useNavigate();
  const recallAccessToken = useMutation({
    mutationFn: recallToken,
    onError: () => {
      sessionStorage.removeItem('accessToken');
      navgate('/login');
    },
  });
  useEffect(() => {
    const SILENT_REFRESH_TIME = 1000 * 60 * 15;
    const timer = setInterval(() => {
      if (document.hasFocus()) {
        console.log('api호출');
        recallAccessToken.mutate();
      }
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
