
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // CSS global o resets básicos
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Reset de estilos base de MUI
import theme from './theme.ts'; // Tema personalizado de MUI

/**
 * Renderiza la aplicación principal dentro del elemento con id 'root'.
 * - Usa React.StrictMode para advertencias y buenas prácticas.
 * - ThemeProvider aplica el tema personalizado de MUI a toda la app.
 * - CssBaseline aplica un reset de estilos consistente.
 * - App es el componente raíz de la aplicación.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica un CSS Reset de MUI */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);