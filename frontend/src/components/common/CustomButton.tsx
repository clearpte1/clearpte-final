import React from 'react';
import { Button, ButtonProps, CircularProgress, Box } from '@mui/material';

interface CustomButtonProps extends Omit<ButtonProps, 'loading'> {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  to?: string; // Optional for routing
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading = false,
  loadingText,
  children,
  disabled,
  icon,
  ...props
}) => {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? undefined : icon}
      {...props}
    >
      {loading ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CircularProgress size={16} color="inherit" />
          {loadingText || 'Loading...'}
        </Box>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
