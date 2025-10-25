import React, { useState } from 'react';
import { Box, Typography, ButtonBase, useTheme, useMediaQuery } from '@mui/material';

const features = [
  {
    label: 'Clear PTE Locate and Explain',
    image: 'https://i.imgur.com/0y8Ftya.png',
    title: 'Clear PTE Locate and Explain',
    description: 'Quickly find and understand answers with our unique locate and explain feature. Get instant feedback and explanations for every question.'
  },
  {
    label: 'Mock Clear PTE Band Scores',
    image: 'https://i.imgur.com/8Q1Qw1w.png',
    title: 'Mock Clear PTE Band Scores',
    description: 'Receive realistic band scores for your mock tests, helping you track your progress and target your preparation.'
  },
  {
    label: 'Clear PTE Side by Side',
    image: 'https://i.imgur.com/1Q9Qw1w.png',
    title: 'Clear PTE Side by Side',
    description: 'Compare your answers with model answers and see detailed side-by-side analysis for every section.'
  },
  {
    label: 'Clear PTE Question Palette',
    image: 'https://i.imgur.com/2Q9Qw1w.png',
    title: 'Clear PTE Question Palette',
    description: 'Navigate through questions easily with our interactive palette, allowing you to jump to any question instantly.'
  },
  {
    label: 'IOT Analytics',
    image: 'https://i.imgur.com/3Q9Qw1w.png',
    title: 'IOT Analytics',
    description: 'A brand new feature allowing Clear PTE test takers to track their Clear PTE learning and achievement progress. View all data like average Clear PTE band scores and time spent. It even shows what type of questions you need to improve on and for which elements you need to study more.'
  },
];

const FeaturesTabsSection: React.FC = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selected, setSelected] = useState(features.length - 1);

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
        Our Clear PTE tests features
      </Typography>
      {/* Tabs */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmDown ? 'column' : 'row',
          width: '100%',
          maxWidth: 1200,
          mb: 4,
          borderRadius: 1,
          overflow: 'hidden',
          boxShadow: 'none',
        }}
      >
        {features.map((f, idx) => (
          <ButtonBase
            key={f.label}
            onClick={() => setSelected(idx)}
            sx={{
              flex: 1,
              py: 2,
              px: 2,
              width: isSmDown ? '100%' : `${100 / features.length}%`,
              minWidth: 0,
              maxWidth: '100%',
              background: selected === idx ? '#ffbb6c' : '#22334d',
              color: selected === idx ? '#22334d' : '#fff',
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '1.1rem' },
              borderRight: isSmDown ? 'none' : idx !== features.length - 1 ? '2px solid #fff' : 'none',
              borderBottom: isSmDown && idx !== features.length - 1 ? '2px solid #fff' : 'none',
              transition: 'background 0.2s, color 0.2s',
              borderRadius: 0,
              justifyContent: 'center',
              textAlign: 'center',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {f.label}
          </ButtonBase>
        ))}
      </Box>
      {/* Content */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1400,
          background: '#f5f6f7',
          borderRadius: 2,
          display: 'flex',
          flexDirection: isSmDown ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 5 },
          gap: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src={features[selected].image}
            alt={features[selected].label}
            sx={{
              width: { xs: '100%', md: 400 },
              maxWidth: 500,
              borderRadius: 2,
              boxShadow: 1,
              background: '#fff',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: { xs: 1, md: 4 },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#22334d', mb: 2 }}>
            {features[selected].title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#22334d', fontSize: { xs: '1.05rem', md: '1.15rem' } }}>
            {features[selected].description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesTabsSection;
