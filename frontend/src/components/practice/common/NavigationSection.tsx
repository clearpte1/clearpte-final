import React from 'react';
import { Stack, Chip, Typography, Box, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { getButtonStyles, getChipStyles, layoutStyles, typographyStyles } from '../../../styles/common';
import { Button } from '../../common/Button';

interface NavigationSectionProps {
  onSearch: () => void;
  onPrevious: () => void;
  onNext: () => void;
  questionNumber: number;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({
  onSearch,
  onPrevious,
  onNext,
  questionNumber,
}) => {
  const theme = useTheme();
  const buttonStyles = getButtonStyles(theme);
  const chipStyles = getChipStyles(theme);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Mobile: Stack vertically, Desktop: Stack horizontally */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        alignItems={{ xs: 'stretch', md: 'center' }} 
        justifyContent={{ xs: 'center', md: 'space-between' }}
        spacing={{ xs: 2, md: 0 }}
      >
        {/* Question Counter - Always visible */}
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Chip 
            onClick={() => { }} 
            label="× 5" 
            variant="outlined" 
            size="small"
            sx={chipStyles.small}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              ...typographyStyles.body2,
              color: theme.palette.text.secondary,
              display: 'flex', 
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            Question Counter
          </Typography>
        </Stack>

        {/* Navigation Buttons */}
        <Stack 
          direction={layoutStyles.responsiveStack}
          spacing={{ xs: 1, sm: 1 }}
          sx={{ 
            ...layoutStyles.fullWidthOnMobile,
            alignItems: 'stretch'
          }}
        >
          <Button 
            variant="outlined"
            onClick={onSearch}
            sx={{
              ...buttonStyles.outlined,
              minWidth: { xs: '100%', sm: '100px' }
            }}
          >
            Search
          </Button>
          <Button 
            variant="outlined"
            onClick={onPrevious}
            disabled={questionNumber <= 1}
            sx={{
              ...buttonStyles.outlined,
              minWidth: { xs: '100%', sm: '100px' }
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={onNext}
            endIcon={<ArrowForward sx={{ fontSize: 20 }} />}
            sx={{
              ...buttonStyles.contained,
              minWidth: { xs: '100%', sm: '100px' }
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NavigationSection;