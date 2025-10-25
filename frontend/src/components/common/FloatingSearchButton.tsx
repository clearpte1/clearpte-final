import React, { useState } from 'react';
import {
  Fab,
  Zoom,
  useTheme,
  useMediaQuery,
  Box,
  IconButton,
} from '@mui/material';
import { Search, ChevronLeft, ChevronRight } from '@mui/icons-material';
import TopicSelectionDrawer from './TopicSelectionDrawer';

interface FloatingSearchButtonProps {
  topics?: any[];
  title?: string;
  type?: string;
  onTopicSelect?: (topic: any) => void;
  disabled?: boolean;
}

const FloatingSearchButton: React.FC<FloatingSearchButtonProps> = ({
  topics = [],
  title = 'Search Topics',
  type = 'general',
  onTopicSelect,
  disabled = false,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleTopicSelect = (topic: any) => {
    if (onTopicSelect) {
      onTopicSelect(topic);
    }
    setSearchOpen(false);
  };

  if (disabled || topics.length === 0) {
    return null;
  }

  // Calculate drawer width based on responsive breakpoints
  const getDrawerWidth = () => {
    if (isMobile) return '95%';
    if (isMd) return '60%';
    return '60%';
  };

  // Calculate the left position for close button (at left edge of drawer)
  const getCloseButtonLeft = () => {
    const drawerWidth = getDrawerWidth();
    if (drawerWidth === '95%') return '5%';
    if (drawerWidth === '60%') return '38%';
    return '38%';
  };

  return (
    <>
      {/* Floating Search Button - Fixed to viewport edge */}
      <Zoom in={!searchOpen} timeout={400} unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            right: -32,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1400,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            // '&:hover': {
            //   right: -8,
            // }
          }}
        >
          <Fab
            onClick={handleSearchOpen}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'scale(1.05)',
                boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 4px 14px ${theme.palette.primary.main}30`,
            }}
            size={isMobile ? 'small' : 'medium'}
          >
            <ChevronLeft
              sx={{
                fontSize: { xs: '24px', sm: '24px' }, // Ensure visibility in mobile
                position: 'absolute', // Remove absolute positioning
                 left:2, 

              }}
            />
          </Fab>
        </Box>
      </Zoom>

      {/* Close Button - Appears with drawer */}
      <Zoom in={searchOpen} timeout={300} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            left: getCloseButtonLeft(),
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1400,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <IconButton
            onClick={handleSearchClose}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'scale(1.05)',
                boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 4px 14px ${theme.palette.primary.main}30`,
            }}
          >
            <ChevronRight
              sx={{
                fontSize: { xs: '24px', sm: '24px' }, // Consistent size for visibility
              }}
            />
          </IconButton>
        </Box>
      </Zoom>

      {/* Search Drawer */}
      <TopicSelectionDrawer
        open={searchOpen}
        onClose={handleSearchClose}
        onSelect={handleTopicSelect}
        topics={topics}
        title={title}
        type={type}
        // sx={{
        //   '& .MuiDrawer-paper': {
        //     transition: 'transform 0.3s ease-in-out', // Smooth drawer animation
        //     width: getDrawerWidth(),
        //   },
        // }}
      />
    </>
  );
};

export default FloatingSearchButton;