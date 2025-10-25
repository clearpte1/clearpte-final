import React from 'react';
import { Box, Container, Typography, Card } from '@mui/material';
import { Button } from '../common/Button';
import { Download } from '@mui/icons-material';

const StudyMaterialsSection = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ mb: 4 }}>
          Download PTE Study Materials
        </Typography>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Study Materials
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Useful study materials created by Clear PTE's teaching experts.
          </Typography>
          <Button variant="contained" startIcon={<Download />}>
            Download
          </Button>
        </Card>
      </Container>
    </Box>
  );
};
export default StudyMaterialsSection;
