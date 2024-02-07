import React, { useEffect } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from './components/Router';
import { useMutation } from '@tanstack/react-query';
import { getProfile, recallToken } from './axios/api';
import SetTop from './utill/setTop';

function App() {
  const recallAccessToken = useMutation({
    mutationFn: recallToken,
    onSuccess: () => {
      getProfile();
    },
  });
  useEffect(() => {
    const SILENT_REFRESH_TIME = 1000 * 60 * 10;
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
