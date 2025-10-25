import { Theme } from '@mui/material/styles';

// Common button styles
export const buttonBaseStyles = {
  height: '36px',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: '6px',
  minWidth: '100px',
};

export const getButtonStyles = (theme: Theme) => ({
  contained: {
    ...buttonBaseStyles,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
    },
    '&:disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
  outlined: {
    ...buttonBaseStyles,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}10`,
      borderColor: theme.palette.primary.main,
    },
    '&:disabled': {
      borderColor: theme.palette.action.disabled,
      color: theme.palette.action.disabled,
    },
  },
});

// Common chip styles
export const getChipStyles = (theme: Theme) => ({
  small: {
    height: '24px',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '& .MuiChip-label': {
      px: 1,
    },
  },
});

// Common typography styles
export const typographyStyles = {
  body2: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};

// Common layout styles
export const layoutStyles = {
  responsiveStack: { xs: 'column' as const, sm: 'row' as const },
  fullWidthOnMobile: {
    width: { xs: '100%', md: 'auto' },
  },
};
