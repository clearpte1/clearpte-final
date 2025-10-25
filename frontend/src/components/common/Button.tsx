import React from 'react';
import { Button as MuiButton, ButtonProps, SxProps, Theme, useTheme } from '@mui/material';
import { componentStyles } from '../../styles/components';

interface CustomButtonProps extends Omit<ButtonProps, 'sx'> {
  fullWidthOnMobile?: boolean;
  sx?: SxProps<Theme>;
}

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'contained',
  fullWidthOnMobile = true,
  sx = {},
  children,
  ...props
}) => {
  const theme = useTheme();
  const { button } = componentStyles;
  const buttonStyles = button(theme);
  const baseStyles = variant === 'contained' ? buttonStyles.contained : buttonStyles.outlined;

  const combinedSx: SxProps<Theme> = {
    ...buttonStyles.root,
    ...baseStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '36px',
    fontSize: '0.875rem',
    width: fullWidthOnMobile ? {
      xs: '100%',
      sm: 'auto'
    } : 'auto',
    padding: {
      xs: '10px 16px',
      sm: '8px 16px'
    }
  };

  return (
    <MuiButton
      variant={variant}
      sx={{ ...combinedSx, ...sx }}
      {...props}
    >
      {children}
    </MuiButton>
  );

//   return (
//     <MuiButton
//       variant={variant}
//       sx={responsiveStyles}
//       {...props}
//     >
//       {children}
//     </MuiButton>
//   );
};
