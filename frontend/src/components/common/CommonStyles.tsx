import { styled } from '@mui/material/styles';
import { Card, Box, Button, Paper } from '@mui/material';

// Common styled components for consistent styling across the app

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

export const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const PulseAnimation = styled(Box)(() => ({
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.05)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

export const GlowEffect = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

export const FadeIn = styled(Box)(() => ({
  animation: 'fadeIn 0.5s ease-in',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export const SlideIn = styled(Box)(() => ({
  animation: 'slideIn 0.3s ease-out',
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(-100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
}));

// Responsive typography variants
export const responsiveTypography = {
  h1: {
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
    fontWeight: 'bold',
    lineHeight: 1.3,
  },
  h3: {
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  h4: {
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  h5: {
    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  h6: {
    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  body1: {
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
    lineHeight: 1.6,
  },
  body2: {
    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
    lineHeight: 1.5,
  },
};

// Common spacing patterns
export const spacing = {
  section: { xs: 2, sm: 3, md: 4 },
  component: { xs: 1, sm: 2, md: 3 },
  element: { xs: 0.5, sm: 1, md: 1.5 },
};

// Common breakpoint patterns
export const breakpoints = {
  mobile: 'xs',
  tablet: 'sm',
  desktop: 'md',
  large: 'lg',
  xl: 'xl',
};

// Color variations
export const colors = {
  success: {
    light: '#e8f5e9',
    main: '#4caf50',
    dark: '#2e7d32',
  },
  warning: {
    light: '#fff3e0',
    main: '#ff9800',
    dark: '#f57c00',
  },
  error: {
    light: '#ffebee',
    main: '#f44336',
    dark: '#c62828',
  },
  info: {
    light: '#e3f2fd',
    main: '#2196f3',
    dark: '#1565c0',
  },
  neutral: {
    light: '#f5f5f5',
    main: '#9e9e9e',
    dark: '#424242',
  },
};