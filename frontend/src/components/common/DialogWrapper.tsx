import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from './Button';

export interface DialogWrapperProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
  actions?: React.ReactNode;
  defaultActions?: {
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    variant?: 'text' | 'outlined' | 'contained';
  };
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  fullWidth = true,
  showCloseButton = true,
  actions,
  defaultActions
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonStyles = {
    height: '36px',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: '6px',
    minWidth: '100px',
    '&:hover': {
      boxShadow: 'none',
    },
  };

  const containedButtonStyles = {
    ...buttonStyles,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
    },
  };

  const outlinedButtonStyles = {
    ...buttonStyles,
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
      borderColor: theme.palette.grey[400],
    },
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '18px', sm: '20px' }
            }}
          >
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton 
              onClick={onClose}
              size={isMobile ? 'small' : 'medium'}
              sx={{ 
                color: 'grey.500',
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              <Close />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      
      <DialogContent sx={{ py: 2 }}>
        {children}
      </DialogContent>
      
      {(actions || defaultActions) && (
        <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
          {actions ? (
            actions
          ) : defaultActions ? (
            <Stack direction="row" spacing={2}>
              {defaultActions.onCancel && (
                <Button 
                  onClick={defaultActions.onCancel}
                  variant="outlined"
                  sx={{
                    ...outlinedButtonStyles,
                    minWidth: isMobile ? '100%' : '100px',
                  }}
                >
                  {defaultActions.cancelText || 'Cancel'}
                </Button>
              )}
              {defaultActions.onConfirm && (
                <Button 
                  onClick={defaultActions.onConfirm}
                  variant="contained"
                  color={defaultActions.confirmColor || 'primary'}
                  sx={{
                    ...containedButtonStyles,
                    minWidth: isMobile ? '100%' : '100px',
                    ...(defaultActions.confirmColor === 'error' && {
                      backgroundColor: theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: theme.palette.error.dark,
                        boxShadow: `0 4px 12px ${theme.palette.error.main}30`,
                      },
                    }),
                  }}
                >
                  {defaultActions.confirmText || 'Confirm'}
                </Button>
              )}
            </Stack>
          ) : null}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogWrapper;