import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Chip, IconButton, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { heroSlides } from '../heroSlides';
import { Button } from '../common/Button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds
const FADE_DURATION = 400; // Fade transition duration in ms

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [fade, setFade] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);

  // Function to start the auto-slide timer
  const startAutoSlide = () => {
    if (isHovered.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setFade(false);
      setTimeout(() => {
        setPrev(current);
        setCurrent((prevIdx) => (prevIdx === heroSlides.length - 1 ? 0 : prevIdx + 1));
        setFade(true);
        setTimeout(() => setIsTransitioning(false), FADE_DURATION);
      }, FADE_DURATION);
    }, AUTO_SLIDE_INTERVAL);
  };

  // Auto-slide logic
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  // Handle manual slide navigation
  const goToSlide = (idx: number) => {
    if (idx === current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTransitioning(true);
    setFade(false);
    setTimeout(() => {
      setPrev(current);
      setCurrent(idx);
      setFade(true);
      setTimeout(() => setIsTransitioning(false), FADE_DURATION);
    }, FADE_DURATION);
  };

  const handlePrev = () => goToSlide(current === 0 ? heroSlides.length - 1 : current - 1);
  const handleNext = () => goToSlide(current === heroSlides.length - 1 ? 0 : current + 1);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    isHovered.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Resume auto-slide on hover out
  const handleMouseLeave = () => {
    isHovered.current = false;
    startAutoSlide();
  };

  return (
    <Box
      sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}40 0%, ${theme.palette.primary.main}40 100%)`,
        py: 0,
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 340, md: 400 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: { xs: 6, md: 0.5 },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fullscreen Image Crossfade */}
      {[prev, current].filter((v, i, arr) => arr.indexOf(v) === i).map((idx, i) => (
        <Box
          key={idx + '-' + i + (idx === current ? '-current' : '-prev')}
          component="img"
          src={heroSlides[idx].image}
          alt={heroSlides[idx].alt}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity:
              idx === current
                ? fade
                  ? 1
                  : 0
                : fade
                ? 0
                : 1,
            transition: `opacity ${FADE_DURATION}ms`,
            filter: 'brightness(0.55) blur(0px)',
            pointerEvents: 'none',
          }}
        />
      ))}
      {/* Overlay Content Crossfade */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {[prev, current].filter((v, i, arr) => arr.indexOf(v) === i).map((idx, i) => (
          <Box
            key={idx + '-' + i + (idx === current ? '-content-current' : '-content-prev')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
              minHeight: { xs: 340, md: 400 },
              py: { xs: 4, md: 8 },
              px: { xs: 2, md: 6 },
              borderRadius: 0,
              maxWidth: { xs: '95vw', md: 600 },
              mx: { xs: 'auto', md: 0 },
              boxShadow: 'none',
              opacity:
                idx === current
                  ? fade
                    ? 1
                    : 0
                  : fade
                  ? 0
                  : 1,
              transform:
                idx === current
                  ? fade
                    ? 'translateY(0)'
                    : 'translateY(20px)'
                  : fade
                  ? 'translateY(20px)'
                  : 'translateY(0)',
              transition: `opacity ${FADE_DURATION}ms, transform ${FADE_DURATION}ms`,
              position: idx === current ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              pointerEvents: idx === current ? 'auto' : 'none',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 1.2,
                fontWeight: 700,
                fontSize: { xs: '1.3rem', md: '2rem' },
                letterSpacing: '-0.5px',
                textAlign: { xs: 'center', md: 'left' },
                color: 'common.white',
                textShadow: (theme) => `0 2px 12px ${theme.palette.common.black}8C`,
              }}
            >
              {heroSlides[idx].title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: 'common.white',
                fontSize: { xs: '1rem', md: '1.15rem' },
                textAlign: { xs: 'center', md: 'left' },
                textShadow: (theme) => `0 2px 12px ${theme.palette.common.black}8C`,
              }}
            >
              {heroSlides[idx].subtitle}
            </Typography>
            {heroSlides[idx].buttonText && (
              <Button
                variant="contained"
                size="medium"
                onClick={onGetStarted}
                sx={{
                  py: 1.1,
                  px: 3,
                  fontSize: '1rem',
                  mb: 1.5,
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  border: '2px solid',
                  borderColor: 'common.white',
                  fontWeight: 700,
                  letterSpacing: 1,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    color: 'common.white',
                    borderColor: 'common.white',
                  },
                }}
              >
                {heroSlides[idx].buttonText}
              </Button>
            )}
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Chip label="NEW" color="secondary" size="small" sx={{ color: 'common.white', bgcolor: (theme) => `${theme.palette.common.black}B3`, textShadow: (theme) => `0 2px 8px ${theme.palette.common.black}` }} />
              <Typography variant="body2" sx={{ color: 'common.white', textShadow: (theme) => `0 2px 8px ${theme.palette.common.black}` }}>
                AI-powered instant scoring
              </Typography>
            </Box>
          </Box>
        ))}
      </Container>
      {/* Slider Arrows */}
      <IconButton
        onClick={handlePrev}
        disabled={isTransitioning}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          background: (theme) => `${theme.palette.common.black}80`,
          color: 'common.white',
          boxShadow: 2,
          zIndex: 3,
          display: { xs: 'flex', md: 'flex' },
          '&:hover': { 
            background: (theme) => `${theme.palette.common.black}B3`
          },
        }}
        aria-label="Previous slide"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
                disabled={isTransitioning}

        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          background: (theme) => `${theme.palette.common.black}80`,
          color: 'common.white',
          boxShadow: 2,
          zIndex: 3,
          display: { xs: 'flex', md: 'flex' },
          '&:hover': { 
            background: (theme) => `${theme.palette.common.black}B3`
          },
        }}
        aria-label="Next slide"
      >
        <ArrowForwardIosIcon />
      </IconButton>
      {/* Dots */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 24,
        zIndex: 4,
        gap: 1,
        pointerEvents: 'auto',
      }}>
         {heroSlides.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === current ? 'primary.main' : 'common.white',
              border: '1.5px solid',
              borderColor: 'common.white',
              transition: 'background 0.3s',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              opacity: isTransitioning ? 0.5 : 1,
            }}
            onClick={() => {
              if (!isTransitioning) goToSlide(idx);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;