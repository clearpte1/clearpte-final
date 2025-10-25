import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Button } from '../common/Button';

const KnowledgeSections = () => {
  const sections = [
    {
      title: 'PTE Academic Guide',
      description: 'What is the meaning of PTE? The full form of PTE is the Pearson Test of English, normally referring to the academic version. It is also known as PTE-A: Pearson Academic.',
      link: 'View more'
    },
    {
      title: 'PTE Speaking Guide',
      description: 'Read Aloud tips: Read Aloud (RA) is one of the most difficult question types in PTE Speaking. Pronunciation and fluency are much more important in scoring than content.',
      link: 'View more'
    },
    {
      title: 'PTE Writing Guide',
      description: 'Summarise Written Text exam tips: Summarise Written Text is a simple question type. There are two keys in answering it: first key points in the passage, and is to construct the key points into a grammatically correct sentence.',
      link: 'View more'
    },
    {
      title: 'PTE Reading Guide',
      description: 'Multiple Choice Single Answer exam tips: The Reading Multiple Choice Single Answer (MCSA) question type requires you to only a very small proportion of the MCSA question type.',
      link: 'View more'
    },
    {
      title: 'PTE Listening Guide',
      description: 'Summarise Spoken Text exam tips: Summarise Spoken Text (SST) is actually a very simple question type in PTE. Focus on the grammar and spelling of your written answer.',
      link: 'View more'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        PTE Knowledge
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section, index) => (
          <Grid 
          // item xs={12} md={6} key={index}
          >
            <Card sx={{ height: '100%', p: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  {section.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {section.description}
                </Typography>
                <Button size="small" color="primary">
                  {section.link} →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default KnowledgeSections;
