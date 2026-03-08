/**
 * QuickOutline Component
 *
 * Left sidebar showing quick outline of all course modules
 */

import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { CourseModule } from './types';

interface QuickOutlineProps {
  modules: CourseModule[];
  selectedModuleId: string;
  onModuleSelect: (moduleId: string) => void;
}

const QuickOutline: React.FC<QuickOutlineProps> = ({
  modules,
  selectedModuleId,
  onModuleSelect,
}) => {
  return (
    <Box
      sx={{
        bgcolor: '#1a1a1a',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 80,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '20px',
          mb: 2,
          color: '#FFFFFF',
        }}
      >
        Quick outline
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#B0B0B0',
          mb: 3,
          fontSize: '14px',
        }}
      >
        {modules.length} modules
      </Typography>

      <List sx={{ p: 0 }}>
        {modules.map((module, index) => (
          <ListItemButton
            key={module.id}
            onClick={() => onModuleSelect(module.id)}
            sx={{
              borderRadius: '8px',
              mb: 0.5,
              px: 2,
              py: 1.5,
              bgcolor: selectedModuleId === module.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#9ca3af',
                  mr: 1.5,
                  minWidth: '20px',
                }}
              >
                {index + 1}
              </Typography>
              <ListItemText
                primary={module.title}
                primaryTypographyProps={{
                  fontSize: '14px',
                  fontWeight: selectedModuleId === module.id ? 600 : 500,
                  color: selectedModuleId === module.id ? '#3b82f6' : '#e5e7eb',
                  lineHeight: 1.4,
                }}
              />
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default QuickOutline;
