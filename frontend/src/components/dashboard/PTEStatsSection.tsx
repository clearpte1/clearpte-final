import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SchoolIcon from '@mui/icons-material/School';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const stats = [
  {
    icon: <PublicIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    value: '120+',
    label: 'Countries',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    value: '28.000.000+',
    label: 'Test Takers',
  },
  {
    icon: <DesktopWindowsIcon sx={{ fontSize: 48, color: 'success.main' }} />,
    value: '7.000.000+',
    label: 'Completed Tests',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    value: '100+',
    label: 'Academic Tests',
  },
  {
    icon: <LiveTvIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    value: '20+',
    label: 'General Training Tests',
  },
  {
    icon: <HelpOutlineIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    value: '10,000+',
    label: 'Total Questions',
  },
];

const PTEStatsSection: React.FC = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 5, md: 8 },
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant={isSmDown ? 'h5' : 'h4'}
        sx={{
          fontWeight: 700,
          mb: { xs: 4, md: 6 },
          color: '#22334d',
          textAlign: 'center',
        }}
      >
        Number #1 for Clear PTE Preparation
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch',
          maxWidth: 1200,
          width: '100%',
          gap: { xs: 3, md: 5 },
        }}
      >
        {stats.map((stat, idx) => (
          <Box
            key={idx}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 47%',
                md: '1 1 30%',
              },
              minWidth: { xs: '90%', sm: '45%', md: '29%' },
              maxWidth: { xs: '100%', sm: '48%', md: '32%' },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: { xs: 3, md: 0 },
              background: 'transparent',
              px: { xs: 2, md: 3 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>{stat.icon}</Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: '#22334d', lineHeight: 1 }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: '#22334d', fontWeight: 500 }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PTEStatsSection;
