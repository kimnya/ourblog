import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      suspense: true,
      retry: false,
    },

    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </>,
);
