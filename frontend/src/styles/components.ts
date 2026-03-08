// import { Theme } from '@mui/material/styles';
// import { colors } from './constants';

// // Common component-specific styles
// export const componentStyles = {
//   button: (theme: Theme) => ({
//     root: {
//       height: '36px',
//       fontSize: '0.875rem',
//       fontWeight: 500,
//       textTransform: 'none',
//       borderRadius: '6px',
//       minWidth: '100px',
//     },
//     contained: {
//       backgroundColor: colors.primary.main,
//       color: 'white',
//       boxShadow: 'none',
//       '&:hover': {
//         backgroundColor: colors.primary.dark,
//         boxShadow: `0 4px 12px ${colors.primary.main}30`,
//       },
//       '&:disabled': {
//         backgroundColor: theme.palette.action.disabledBackground,
//         color: theme.palette.action.disabled,
//       },
//     },
//     outlined: {
//       borderColor: colors.primary.main,
//       color: colors.primary.main,
//       backgroundColor: 'transparent',
//       '&:hover': {
//         backgroundColor: `${colors.primary.main}10`,
//         borderColor: colors.primary.main,
//       },
//       '&:disabled': {
//         borderColor: theme.palette.action.disabled,
//         color: theme.palette.action.disabled,
//       },
//     },
//   }),

//   chip: (theme: Theme) => ({
//     root: {
//       height: '24px',
//       fontSize: '0.75rem',
//       fontWeight: 500,
//     },
//     outlined: {
//       borderColor: colors.primary.main,
//       color: colors.primary.main,
//     },
//     filled: {
//       backgroundColor: colors.primary.main,
//       color: 'white',
//       '&:hover': {
//         backgroundColor: colors.primary.dark,
//       },
//     },
//   }),

//   iconButton: (theme: Theme) => ({
//     root: {
//       padding: '8px',
//       '&:hover': {
//         backgroundColor: `${colors.primary.main}10`,
//       },
//     },
//     primary: {
//       color: colors.primary.main,
//       '&:hover': {
//         backgroundColor: `${colors.primary.main}10`,
//       },
//     },
//   }),

//   card: {
//     root: {
//       borderRadius: '12px',
//       boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
//         transform: 'translateY(-2px)',
//       },
//     },
//   },
// };

import { Theme } from '@mui/material/styles';
import { colors } from './constants';

export const componentStyles = {
  button: (theme: Theme) => ({
    root: {
      height: '36px',
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
      borderRadius: '6px',
      minWidth: '100px',
    },
    contained: {
      backgroundColor: colors.primary.main,
      color: '#FFFFFF',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: colors.primary.dark,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.12)',
      },
      '&:disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },
    },
    outlined: {
      borderColor: 'rgba(255,255,255,0.3)',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.06)',
      },
    },
  }),

  chip: (theme: Theme) => ({
    root: {
      height: '24px',
      fontSize: '0.75rem',
      fontWeight: 500,
      backgroundColor: 'rgba(255,255,255,0.08)',
      color: '#FFFFFF',
    },
    outlined: {
      borderColor: 'rgba(255,255,255,0.3)',
      color: '#FFFFFF',
    },
    filled: {
      backgroundColor: colors.primary.main,
      color: '#FFFFFF',
    },
  }),

  iconButton: (theme: Theme) => ({
    root: {
      padding: '8px',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.08)',
      },
    },
    primary: {
      color: colors.primary.main,
    },
  }),

  card: {
    root: {
      borderRadius: '12px',
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: 'rgba(255,255,255,0.16)',
        transform: 'translateY(-2px)',
      },
    },
  },
};
