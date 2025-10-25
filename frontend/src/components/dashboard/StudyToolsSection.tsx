import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box } from '@mui/material';
import { Book, VolumeUp, Psychology, Add } from '@mui/icons-material';

const StudyToolsSection = () => {
  const tools = [
    {
      title: 'Vocab Book',
      icon: <Book color="primary" />,
      description: 'comprehensive vocabulary',
      color: '#FF5722'
    },
    {
      title: 'Shadowing',
      icon: <VolumeUp color="primary" />,
      description: 'improve fluency by mimicking',
      color: '#4DB6AC'
    },
    {
      title: 'AI Analysis',
      icon: <Psychology color="primary" />,
      description: 'smart practice analytics',
      color: '#FF9800'
    },
    {
      title: 'View More',
      icon: <Add color="primary" />,
      description: 'explore more tools',
      color: '#9C27B0'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        PTE Study Tools
      </Typography>
      <Grid container spacing={3}>
        {tools.map((tool, index) => (
          <Grid 
          // item xs={12} sm={6} md={3} key={index}
          >
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <Box sx={{ mb: 2 }}>
                <Avatar sx={{ bgcolor: tool.color, mx: 'auto', width: 56, height: 56 }}>
                  {tool.icon}
                </Avatar>
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {tool.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tool.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default StudyToolsSection;
