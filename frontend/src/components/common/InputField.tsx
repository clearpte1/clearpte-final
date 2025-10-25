import React from 'react';
import {
  TextField,
  TextFieldProps,
  useTheme
} from '@mui/material';

export interface InputFieldProps extends Omit<TextFieldProps, 'sx'> {
  isCorrect?: boolean;
  showValidation?: boolean;
  customWidth?: string | number;
  fontSize?: string | object;
  textAlign?: 'left' | 'center' | 'right';
}

const InputField: React.FC<InputFieldProps> = ({
  isCorrect,
  showValidation = false,
  customWidth = '120px',
  fontSize = '14px',
  textAlign = 'center',
  disabled = false,
  placeholder,
  value,
  onChange,
  variant = 'outlined',
  size = 'small',
  ...otherProps
}) => {
  const theme = useTheme();

  const getValidationStyles = () => {
    if (!showValidation || isCorrect === undefined) {
      return {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: '1px'
      };
    }

    if (isCorrect === true) {
      return {
        backgroundColor: theme.palette.success.light + '20',
        borderColor: theme.palette.success.main,
        borderWidth: '2px'
      };
    } else {
      return {
        backgroundColor: theme.palette.error.light + '20',
        borderColor: theme.palette.error.main,
        borderWidth: '2px'
      };
    }
  };

  const validationStyles = getValidationStyles();

  return (
    <TextField
      {...otherProps}
      variant={variant}
      size={size}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      sx={{
        mx: 0.5,
        width: customWidth,
        '& .MuiOutlinedInput-root': {
          backgroundColor: validationStyles.backgroundColor,
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: validationStyles.borderColor,
            borderWidth: validationStyles.borderWidth,
            transition: 'all 0.2s ease',
          },
          '&:hover fieldset': {
            borderColor: disabled ? validationStyles.borderColor : theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: disabled ? validationStyles.borderColor : theme.palette.primary.main,
            borderWidth: '2px',
          },
          '&.Mui-disabled': {
            opacity: 0.7,
          },
        },
        '& .MuiInputBase-input': {
          textAlign: textAlign,
          padding: '8px 12px',
          fontSize: fontSize,
          fontWeight: 'medium',
          '&::placeholder': {
            fontSize: typeof fontSize === 'string' ? fontSize : '12px',
            opacity: 0.6,
          },
        },
        // Responsive width
        '@media (max-width: 600px)': {
          width: typeof customWidth === 'string' && customWidth.includes('px') 
            ? `${parseInt(customWidth) * 0.8}px` 
            : customWidth,
        },
      }}
    />
  );
};

export default InputField;