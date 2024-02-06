import React, { useEffect } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from './components/Router';
import { useMutation } from '@tanstack/react-query';
import { recallToken } from './axios/api';

function App() {
  const recallAccessToken = useMutation({
    mutationFn: recallToken,
  });
  useEffect(() => {
    const SILENT_REFRESH_TIME = 1000 * 60 * 20;
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
      <GlobalStyle />

      <Router />
    </>
  );
}

export default App;
