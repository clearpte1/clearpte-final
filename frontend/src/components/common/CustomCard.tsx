import React from 'react';
import { Card, CardContent, CardActions, CardHeader, Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface CustomCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  elevation?: number;
  sx?: SxProps<Theme>;
  headerAction?: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  subtitle,
  children,
  actions,
  icon,
  elevation = 1,
  sx,
  headerAction,
  onClick,
  hover = false
}) => {
  return (
    <Card
      elevation={elevation}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': hover ? {
          transform: 'translateY(-2px)',
          boxShadow: 4
        } : {},
        ...sx
      }}
    >
      {(title || icon || headerAction) && (
        <CardHeader
          avatar={icon}
          title={
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          }
          subheader={subtitle}
          action={headerAction}
        />
      )}
      
      <CardContent>
        {children}
      </CardContent>

      {actions && (
        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
          {actions}
        </CardActions>
      )}
    </Card>
  );
};

export default CustomCard;
