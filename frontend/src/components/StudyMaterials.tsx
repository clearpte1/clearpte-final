import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Chip, CardActions } from '@mui/material';
import { Download } from '@mui/icons-material';
import { User } from '../types';
import { Button } from './common/Button';

interface StudyMaterialsProps {
  user: User | null;
}

export const StudyMaterials = ({ user }:StudyMaterialsProps) => {
  const materials = [
    {
      title: 'PTE Academic Official Guide',
      type: 'PDF',
      size: '15.2 MB',
      downloads: 1250,
      image: 'https://images.pexels.com/photos/5185074/pexels-photo-5185074.jpeg'
    },
    {
      title: 'Speaking Practice Templates',
      type: 'PDF',
      size: '3.1 MB', 
      downloads: 890,
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg'
    },
    {
      title: 'Vocabulary Builder',
      type: 'PDF',
      size: '8.5 MB',
      downloads: 2100,
      image: 'https://images.pexels.com/photos/5303547/pexels-photo-5303547.jpeg'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Study Materials
      </Typography>
      
      <Grid container spacing={3}>
        {materials.map((material, index) => (
          <Grid 
          // item xs={12} md={4} key={index}
          >
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={material.image}
                alt={material.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {material.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip onClick={() => { }} label={material.type} size="small" />
                  <Chip onClick={() => { }} label={material.size} size="small" variant="outlined" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {material.downloads} downloads
                </Typography>
              </CardContent>
              <CardActions>
                <Button startIcon={<Download />} fullWidth variant="contained">
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default StudyMaterials;
