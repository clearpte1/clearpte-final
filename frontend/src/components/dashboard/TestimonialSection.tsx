import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { Button } from '../common/Button';

const testimonials = [
  {
    name: 'Rafi Refinaldi',
    avatar: '', // blank for default avatar
    text: 'Alhamdulillah ! I want to thank Clear PTE Online Test for helping me get my score higher, especially on listening and reading skills! I only...'
  },
  {
    name: 'SOLOMON BILLA',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Hello, I send this message to tell the entire iot team of my success in the Clear PTE academic exam in Ghana. To have such...'
  },
  {
    name: 'Elizabeth',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'I am really grateful to the creators of this website for their efforts to teach us free of cost . The mock tests and sample tests...'
  },
  {
    name: 'Rafi Refinaldi',
    avatar: '', // blank for default avatar
    text: 'Alhamdulillah ! I want to thank Clear PTE Online Test for helping me get my score higher, especially on listening and reading skills! I only...'
  },
  {
    name: 'SOLOMON BILLA',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Hello, I send this message to tell the entire iot team of my success in the Clear PTE academic exam in Ghana. To have such...'
  },
  {
    name: 'Elizabeth',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'I am really grateful to the creators of this website for their efforts to teach us free of cost . The mock tests and sample tests...'
  },
  // Add more testimonials if needed
];

const SLIDES_TO_SHOW = 3;


const AUTO_SLIDE_INTERVAL = 2200; // 4 seconds

const TestimonialSection: React.FC = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const maxSlide = testimonials.length > SLIDES_TO_SHOW ? testimonials.length - SLIDES_TO_SHOW : 0;
  const visibleTestimonials = testimonials.slice(slide, slide + SLIDES_TO_SHOW);

  // Auto-slide logic
  useEffect(() => {
    if (maxSlide === 0) return; // No auto-slide if not enough testimonials
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
    }, AUTO_SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slide, maxSlide]);

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 5, md: 8 },
        background: '#f5f6f7',
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
        What Clear PTE test takers say about us
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmDown ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: { xs: 4, md: 6 },
          width: '100%',
          maxWidth: 1200,
          mb: 3,
        }}
      >
        {visibleTestimonials.map((t, idx) => (
          <Box
            key={t.name}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              px: { xs: 2, md: 4 },
              minWidth: 0,
            }}
          >
            <Avatar
              src={t.avatar}
              sx={{ width: 72, height: 72, mb: 1, bgcolor: t.avatar ? undefined : '#90caf9', fontSize: 40 }}
            >
              {!t.avatar && t.name[0]}
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#22334d', mb: 1 }}>
              {t.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#888',
                fontStyle: 'italic',
                fontSize: { xs: '1.05rem', md: '1.15rem' },
                mb: 2,
                maxWidth: 340,
              }}
            >
              “ {t.text} ”
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Dots for sliding */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 4 }}>
        {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === slide ? theme.palette.primary.main : '#bbb',
              transition: 'background 0.3s',
              cursor: 'pointer',
            }}
            onClick={() => setSlide(idx)}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{
          background: '#22334d',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.1rem',
          px: 5,
          py: 1.5,
          borderRadius: 2,
          boxShadow: 2,
          '&:hover': { background: '#1a253b' },
        }}
      >
        View all
      </Button>
    </Box>
  );
};

export default TestimonialSection;
