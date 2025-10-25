import { createTheme } from '@mui/material/styles';
import { colors } from './constants';
import { componentStyles } from './components';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    grey: colors.grey,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: colors.text.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.text.primary,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.text.primary,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: colors.text.primary,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.text.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...componentStyles.button(createTheme()).root,
          textTransform: 'uppercase' as const, // Ensure type matches MUI's TextTransform
        },
        contained: componentStyles.button(createTheme()).contained,
        outlined: componentStyles.button(createTheme()).outlined,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: componentStyles.chip(createTheme()).root,
        outlined: componentStyles.chip(createTheme()).outlined,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: componentStyles.iconButton(createTheme()).root,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: componentStyles.card.root,
      },
    },
  },
});

export default theme;
