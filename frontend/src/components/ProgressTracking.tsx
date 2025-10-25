import React from 'react';
import { Container, Typography, Grid, Card, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Star, CheckCircle } from '@mui/icons-material';
import { User } from '../types';

interface ProgressTrackingProps {
  user: User | null;
}

export const ProgressTracking = ({ user }: ProgressTrackingProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Progress Tracking
      </Typography>
      
      <Grid container spacing={3}>
        <Grid 
        // item xs={12} md={8}
        >
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Score Progress Over Time
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography color="text.secondary">Chart visualization would be displayed here</Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid 
        // item xs={12} md={4}
        >
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Current Statistics
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Overall Score</Typography>
              <Typography variant="h4" color="primary.main">78/90</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Tests Completed</Typography>
              <Typography variant="h6">8 of 15</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Study Streak</Typography>
              <Typography variant="h6">12 days</Typography>
            </Box>
          </Card>
          
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Next Goals
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><Star color="warning" /></ListItemIcon>
                <ListItemText primary="Reach 80+ overall score" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Complete 5 more tests" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProgressTracking;
