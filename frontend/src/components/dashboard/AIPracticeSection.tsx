import React from 'react';
import { Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Button } from '../common/Button';
import { CheckCircle } from '@mui/icons-material';

const AIPracticeSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" sx={{ mb: 6 }}>
        PTE AI Practice Platform
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid 
        // item xs={12} md={6}
        >
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                Speaking & Writing AI Scorings
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Real-time AI feedback" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Evaluate speaking pronunciation & fluency" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Check writing grammar and spelling" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Synchronous practice without delay like a 4.0%" />
                </ListItem>
              </List>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Practice Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid 
        // item xs={12} md={6}
        >
          <Box
            component="img"
            src="https://images.pexels.com/photos/9783353/pexels-photo-9783353.jpeg"
            alt="AI Practice Interface"
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default AIPracticeSection;
