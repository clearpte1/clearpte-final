import React, { useEffect, useState } from 'react';
import { Stack, Box, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { Help, Refresh, Send, Translate } from '@mui/icons-material';
import { Button } from '../../common/Button';

interface ActionButtonsProps {
  hasResponse?: boolean
  recordedBlob: Blob | null;
  onSubmit: () => void;
  onRedo: () => void;
  onTranslate: () => void;
  onShowAnswer: () => void;
  handleViewAttempts?: () => void;
  additionalActions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error';
  }>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  hasResponse,
  recordedBlob,
  onSubmit,
  onRedo,
  onTranslate,
  onShowAnswer,
  handleViewAttempts,
  additionalActions = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const [disableSave, setDisableSave] = useState<boolean>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (recordedBlob == null && hasResponse) {
      setDisableSave(!hasResponse)
    } else if (recordedBlob) {
      setDisableSave(!recordedBlob)
    }
  }, [recordedBlob, hasResponse]);

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 1 : 1.5}
      sx={{ flexWrap: 'wrap' }}
    >
      <Button
        variant="contained"
        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send sx={{ fontSize: 20 }} />}
        onClick={() => {
          console.log('Submit button clicked');
          setIsSubmitting(true);
          onSubmit();
          setTimeout(() => setIsSubmitting(false), 2000); // Simulate async action
        }}
        disabled={disableSave || isSubmitting}
        aria-label="Submit recording"
        fullWidthOnMobile
        sx={{
          opacity: (disableSave || isSubmitting) ? 0.6 : 1,
          minWidth: '120px'
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      <Button
        variant="outlined"
        startIcon={<Refresh sx={{ fontSize: 20 }} />}
        onClick={() => {
          console.log('Redo button clicked');
          onRedo();
        }}
        aria-label="Redo recording"
        fullWidthOnMobile
        sx={{ minWidth: '120px' }}
      >
        Re-do
      </Button>
      <Button
        variant="outlined"
        startIcon={<Translate sx={{ fontSize: 20 }} />}
        onClick={() => {
          console.log('Translate button clicked');
          onTranslate();
        }}
        aria-label="Translate question"
        fullWidthOnMobile
        sx={{ minWidth: '120px' }}
      >
        Translate
      </Button>
      <Button
        variant="outlined"
        startIcon={<Help sx={{ fontSize: 20 }} />}
        onClick={() => {
          console.log('Show Answer button clicked');
          onShowAnswer();
        }}
        aria-label="Show sample answer"
        fullWidthOnMobile
        sx={{
          py: isMobile ? 1.5 : 1,
        }}
      >
        Show Answer
      </Button>
      {/* View Attempts Button */}
      {handleViewAttempts && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewAttempts}
          fullWidthOnMobile
        >
          View Attempts
        </Button>
      )}
      {/* Additional Actions */}
      {additionalActions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'outlined'}
          color={action.color || 'info'}
          onClick={action.onClick}
          fullWidthOnMobile
          sx={{ py: isMobile ? 1.5 : 1 }}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
};

export default ActionButtons;