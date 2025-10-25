import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery, Paper } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const features = [
  {
    icon: <ComputerIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Take recent actual Clear-PTE Tests',
    description:
      'Real Clear-PTE Listening and Clear-PTE Reading tests based on actual Clear-PTE tests and following the Cambridge Clear-PTE book format.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Community-driven',
    description:
      'Created by our community of Clear-PTE teachers, previous Clear-PTE examiners and Clear-PTE exam takers.',
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Comprehensive analytics tool',
    description:
      'Our Clear-PTE Analytics is a tool that allows you to set a target Clear-PTE band score, analyse your progress and find how to improve.',
  },
  {
    icon: <ListAltIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'View Clear-PTE Score and Answer Explanations',
    description:
      'After taking our Clear-PTE mock tests with real audio, you can check your Listening or Reading band score and view your answer sheets.',
  },
  {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'FREE to use',
    description:
      'Our online Clear-PTE tests are always free. We are here to help users for study abroad, immigration and finding jobs.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Increase your Clear-PTE band score',
    description:
      'Using our online tests for Clear-PTE preparation is proven to help students improve by 0.5 - 1.5 .',
  },
];

const WhyUsePTECoreOnlineTests: React.FC = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 5, md: 8 },
        background: '#f8fafc',
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
        Why use Clear-PTE Online Tests?
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
        {features.map((feature, idx) => (
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
              justifyContent: 'center',
              mb: { xs: 3, md: 0 },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
                borderRadius: 3,
                background: '#fff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: 220,
                transition: 'box-shadow 0.2s',
                width: '100%',
                '&:hover': {
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                },
              }}
            >
              {feature.icon}
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mt: 2, mb: 1, color: '#22334d' }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#4b5563', fontSize: { xs: '0.98rem', md: '1.05rem' } }}
              >
                {feature.description}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhyUsePTECoreOnlineTests;
