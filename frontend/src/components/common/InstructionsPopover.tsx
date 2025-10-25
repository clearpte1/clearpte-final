import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  Paper
} from '@mui/material';
import { InfoOutlined, Close } from '@mui/icons-material';

export interface InstructionSection {
  title: string;
  items: string[];
}

export interface InstructionsPopoverProps {
  title: string;
  sections: InstructionSection[];
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'primary' | 'secondary';
  tooltipTitle?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
}

const InstructionsPopover: React.FC<InstructionsPopoverProps> = ({
  title,
  sections,
  size = 'medium',
  color = 'primary',
  tooltipTitle = 'View Instructions',
  placement = 'bottom-start'
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={tooltipTitle} arrow>
        <IconButton
          onClick={handleClick}
          size={size}
          sx={{
            color: color === 'primary' ? 'primary.main' : 
                   color === 'secondary' ? 'secondary.main' : 'text.secondary',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: color === 'primary' ? 'primary.light' : 
                        color === 'secondary' ? 'secondary.light' : 'divider',
            boxShadow: theme.shadows[2],
            '&:hover': {
              bgcolor: color === 'primary' ? 'primary.light' : 
                       color === 'secondary' ? 'secondary.light' : 'action.hover',
              color: color !== 'default' ? 'white' : 'text.primary',
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[4]
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <InfoOutlined fontSize={size} />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: placement.includes('top') ? 'top' : 'bottom',
          horizontal: placement.includes('start') ? 'left' : placement.includes('end') ? 'right' : 'center',
        }}
        transformOrigin={{
          vertical: placement.includes('top') ? 'bottom' : 'top',
          horizontal: placement.includes('start') ? 'left' : placement.includes('end') ? 'right' : 'center',
        }}
        PaperProps={{
          sx: {
            maxWidth: { xs: '90vw', sm: 400, md: 500 },
            maxHeight: { xs: '70vh', sm: 600 },
            borderRadius: 3,
            boxShadow: theme.shadows[8],
            border: `1px solid ${theme.palette.divider}`
          }
        }}
      >
        <Paper elevation={0} sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            pb: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: 'primary.main',
            color: 'white'
          }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}>
                <InfoOutlined fontSize="small" />
              </Box>
              <Typography 
                variant={isMobile ? 'subtitle1' : 'h6'} 
                sx={{ 
                  fontWeight: 'bold',
                  flexGrow: 1,
                  fontSize: { xs: '14px', sm: '16px' }
                }}
              >
                📝 {title}
              </Typography>
              <IconButton 
                onClick={handleClose}
                size="small"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Content */}
          <Box sx={{ 
            p: 2, 
            maxHeight: { xs: '50vh', sm: 400 },
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 3,
            },
          }}>
            <Stack spacing={2}>
              {sections.map((section, index) => (
                <Box key={index}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mb: 1,
                      fontSize: { xs: '13px', sm: '14px' }
                    }}
                  >
                    {section.title}
                  </Typography>
                  
                  <List dense sx={{ p: 0 }}>
                    {section.items.map((item, itemIndex) => (
                      <ListItem 
                        key={itemIndex}
                        sx={{ 
                          px: 0,
                          py: 0.25,
                          alignItems: 'flex-start'
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography 
                              variant="body2"
                              sx={{ 
                                color: 'text.secondary',
                                lineHeight: 1.5,
                                fontSize: { xs: '12px', sm: '13px' }
                              }}
                            >
                              • {item}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  {index < sections.length - 1 && (
                    <Divider sx={{ mt: 1 }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Popover>
    </>
  );
};

export default InstructionsPopover;