// Tema personalizado de Material UI basado en Material Design 3 (MD3)

import { createTheme } from '@mui/material/styles';

const md3Palette = {
  primary: {
    main: '#1976D2',      // Azul principal (Material Blue 700)
    light: '#BBDEFB',     // Azul claro (Material Blue 100)
    dark: '#0D47A1',      // Azul oscuro (Material Blue 900)
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#1565C0',      // Azul secundario (Material Blue 800)
    light: '#90CAF9',     // Azul secundario claro (Material Blue 200)
    dark: '#003c8f',      // Azul secundario oscuro (Material Blue 900)
    contrastText: '#FFFFFF',
  },
  tertiary: {
    main: '#0288D1',      // Azul celeste (Material Light Blue 700)
    light: '#B3E5FC',     // Azul celeste claro (Material Light Blue 100)
    dark: '#01579B',      // Azul celeste oscuro (Material Light Blue 900)
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#BA1A1A',
    light: '#FFDAD6',
    dark: '#410002',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F5FAFF',   // Fondo muy claro azulado
    paper: '#FFFFFF',     // Fondo de tarjetas blanco
  },
  text: {
    primary: '#102027',   // Azul grisáceo oscuro
    secondary: '#1976D2', // Azul principal para textos secundarios
    disabled: '#90A4AE',  // Azul grisáceo claro
  },
};

/**
 * Tema principal de la aplicación.
 * - Define la paleta de colores, tipografía y estilos globales de componentes.
 * - Aplica bordes redondeados, colores y sombras suaves siguiendo la guía MD3.
 * - Personaliza botones, inputs, tarjetas, checkboxes y elementos de lista.
 */
const theme = createTheme({
  palette: md3Palette,
  typography: {
    fontFamily: [
      'Roboto', // Fuente principal recomendada por Material UI
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // Forma redondeada de los botones MD3
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: md3Palette.primary.light,
          color: md3Palette.primary.dark,
          '&:hover': {
            backgroundColor: md3Palette.primary.main,
            color: md3Palette.primary.contrastText,
          },
        },
        outlined: {
          borderColor: md3Palette.text.disabled,
          color: md3Palette.text.secondary,
          '&:hover': {
            backgroundColor: md3Palette.background.paper,
            borderColor: md3Palette.text.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
        },
        elevation1: { boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.04)' },
        elevation2: { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.10), 0px 4px 8px rgba(0, 0, 0, 0.06)' },
        elevation3: { boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 8px 16px rgba(0, 0, 0, 0.08)' },
      },
      defaultProps: {
        elevation: 1,
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 100,
            backgroundColor: md3Palette.background.paper,
            '& fieldset': {
              borderColor: md3Palette.text.disabled,
            },
            '&:hover fieldset': {
              borderColor: md3Palette.text.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: md3Palette.primary.main,
              borderWidth: '2px',
            },
          },
          '& .MuiInputBase-input': {
            color: md3Palette.text.primary,
          },
          '& .MuiInputLabel-root': {
            color: md3Palette.text.secondary,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: md3Palette.text.disabled,
          '&.Mui-checked': {
            color: md3Palette.primary.main,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: md3Palette.background.paper,
          boxShadow: '0px 1px 2px rgba(25, 118, 210, 0.08), 0px 1px 3px rgba(25, 118, 210, 0.04)',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(25, 118, 210, 0.10), 0px 4px 8px rgba(25, 118, 210, 0.06)',
          },
          marginBottom: '12px',
        },
      },
    }
  }
});

export default theme;