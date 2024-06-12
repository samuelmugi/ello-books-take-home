import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react'; // Note: React is no longer needed to be imported explicitly
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './index.css';

const container = document.getElementById('root')

createRoot(container as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
