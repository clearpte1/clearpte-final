import React from 'react';
import { Paper, Stack, Box, Typography, IconButton } from '@mui/material';
import { Button } from '../../common/Button';
import { Close } from '@mui/icons-material';

const StageGoalBanner = () => {
  return (
    <Paper 
      sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        bgcolor: '#fff3e0', 
        borderLeft: '4px solid #ff9800',
        maxWidth: 1200, mx: 'auto', mb: 3 
      }}
    >
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        alignItems={{ xs: 'flex-start', md: 'center' }} 
        justifyContent="space-between"
        spacing={{ xs: 2, md: 0 }}
      >
        <Stack 
          direction="row" 
          alignItems={{ xs: 'flex-start', sm: 'center' }} 
          spacing={2}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          <Box
            sx={{
              width: { xs: 35, sm: 40 },
              height: { xs: 35, sm: 40 },
              bgcolor: '#ff9800',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '16px', sm: '18px' },
              flexShrink: 0
            }}
          >
            🎯
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#e65100', 
                fontWeight: 'bold',
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                lineHeight: 1.3
              }}
            >
              Stage Goal
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#bf360c',
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                lineHeight: 1.4,
                wordBreak: 'break-word'
              }}
            >
              Ask the teacher for your current stage goal to clarify your current learning priorities and methods.
            </Typography>
          </Box>
        </Stack>
        <Stack 
          direction="row" 
          spacing={1}
          sx={{ 
            alignSelf: { xs: 'flex-end', md: 'center' },
            flexShrink: 0
          }}
        >
          <Button 
            variant="contained" 
            size="small"
            sx={{ 
              bgcolor: '#ff9800', 
              '&:hover': { bgcolor: '#f57c00' },
              fontSize: { xs: '12px', sm: '14px' },
              px: { xs: 1.5, sm: 2 }
            }}
          >
            Ask Now
          </Button>
          <IconButton size="small" sx={{ p: { xs: 0.5, sm: 1 } }}>
            <Close sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default StageGoalBanner;