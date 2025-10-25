import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4DB6AC',
      light: '#82E9DE',
      dark: '#00695C',
    },
    secondary: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#333333',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#333333',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '36px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: '6px',
          minWidth: '100px',
        },
        contained: {
          backgroundColor: '#4DB6AC',
          color: 'white',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#00695C',
            boxShadow: '0 4px 12px rgba(77, 182, 172, 0.3)',
          },
          '&:disabled': {
            backgroundColor: 'action.disabledBackground',
            color: 'action.disabled',
          },
        },
        outlined: {
          borderColor: '#4DB6AC',
          color: '#4DB6AC',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(77, 182, 172, 0.1)',
            borderColor: '#4DB6AC',
          },
          '&:disabled': {
            borderColor: 'action.disabled',
            color: 'action.disabled',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '24px',
          fontSize: '0.75rem',
          fontWeight: 500,
        },
        outlined: {
          borderColor: '#4DB6AC',
          color: '#4DB6AC',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});

export default theme;
