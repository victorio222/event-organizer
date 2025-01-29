import React from 'react';
import ReactDOM from 'react-dom/client';
import router from 'routes/router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from 'theme/theme.ts';
import './index.css';
// import App from './App';
import { UserProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserProvider>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
  </React.StrictMode>,
);