import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  AudioFile as AudioIcon,
  TextFields as TextIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  CheckCircle as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  VolumeUp as VolumeIcon,
  Link as LinkIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import AudioInputComponent from './common/AudioInputComponent';

const EnhancedAdminDemo: React.FC = () => {
  // Import AudioData type from AudioInputComponent or define it here if not exported
  // import type { AudioData } from './common/AudioInputComponent';
  type AudioData = {
    audioUrl?: string;
    audioText?: string;
    audioFormat?: string;
    audioDuration?: number;
    audioTitle?: string;
  };

  const [audioSample, setAudioSample] = useState<AudioData>({
    audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    audioText: 'Climate change is having profound effects on ocean currents around the world. The global ocean conveyor belt, which helps regulate our planet\'s temperature and weather patterns, is being disrupted by rising temperatures and melting ice caps.',
    audioFormat: 'mp3',
    audioDuration: 75,
    audioTitle: 'Climate Change and Ocean Currents'
  });

  const listeningModules = [
    { name: 'Summarize Spoken Text', supported: true, description: 'Audio passage summary with word limits' },
    { name: 'Multiple Choice (Multiple)', supported: true, description: 'Select multiple correct answers' },
    { name: 'Multiple Choice (Single)', supported: true, description: 'Select single correct answer' },
    { name: 'Fill in the Blanks', supported: true, description: 'Complete missing words from audio' },
    { name: 'Select Missing Word', supported: true, description: 'Choose the missing word from options' },
    { name: 'Highlight Incorrect Words', supported: true, description: 'Identify words that differ from audio' },
    { name: 'Write from Dictation', supported: true, description: 'Write down exactly what you hear' }
  ];

  const audioFeatures = [
    { feature: 'Direct Audio URL', description: 'Support for mp3, wav, ogg, m4a, aac files', icon: <AudioIcon /> },
    { feature: 'Text-to-Speech', description: 'Automatic speech synthesis from text', icon: <TextIcon /> },
    { feature: 'Dual Mode Support', description: 'Audio URL with text fallback', icon: <VolumeIcon /> },
    { feature: 'URL Validation', description: 'Real-time validation of audio URLs', icon: <LinkIcon /> },
    { feature: 'Audio Preview', description: 'Play audio directly in admin interface', icon: <CheckIcon /> },
    { feature: 'Format Detection', description: 'Automatic audio format recognition', icon: <AssessmentIcon /> }
  ];

  const excelColumns = [
    { column: 'audioUrl', type: 'Text', required: 'Optional*', description: 'Direct URL to audio file' },
    { column: 'audioText', type: 'Text', required: 'Optional*', description: 'Text for speech synthesis' },
    { column: 'audioFormat', type: 'Text', required: 'Auto', description: 'Audio format (auto-detected)' },
    { column: 'audioDuration', type: 'Number', required: 'Optional', description: 'Duration in seconds' },
    { column: 'audioTitle', type: 'Text', required: 'Optional', description: 'Descriptive audio title' },
    { column: 'transcript', type: 'Text', required: 'Yes', description: 'Full audio transcript' },
    { column: 'difficulty', type: 'Text', required: 'Yes', description: 'Beginner/Intermediate/Advanced' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h3" gutterBottom>
          Enhanced PTE Admin System
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Advanced audio management for Listening module questions
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
          Now supports both direct audio files and text-to-speech synthesis with comprehensive validation and preview capabilities.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {/* Audio Input Demo */}
        <Box sx={{ flex: { xs: '100%', md: 'calc(50% - 16px)' } }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VolumeIcon color="primary" />
                Audio Configuration Demo
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Interactive demo of the new audio input component with dual mode support.
              </Typography>
              
              <AudioInputComponent
                value={audioSample}
                onChange={setAudioSample}
                label="Demo Audio Configuration"
                helperText="Try switching between different audio modes to see the functionality"
              />
            </CardContent>
          </Card>
        </Box>

        {/* Supported Modules */}
        <Box sx={{ flex: { xs: '100%', md: 'calc(50% - 16px)' } }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon color="success" />
                Supported Listening Modules
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                All Listening modules now support enhanced audio functionality.
              </Typography>
              
              <List dense>
                {listeningModules.map((module, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={module.name}
                      secondary={module.description}
                    />
                    <Chip label="Enhanced" color="primary" size="small" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Features Overview */}
        <Box sx={{ flex: '100%' }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Enhanced Features Overview
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {audioFeatures.map((feature, index) => (
                  <Box key={index} sx={{ 
                    flex: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
                    p: 2, 
                    border: 1, 
                    borderColor: 'divider', 
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {feature.icon}
                      <Typography variant="h6" fontSize="1rem">
                        {feature.feature}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Excel Template Information */}
        <Box sx={{ flex: '100%' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Excel Template Structure for Listening Modules</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Audio Configuration Requirements:</Typography>
                <Typography variant="body2">
                  • At least one of <strong>audioUrl</strong> or <strong>audioText</strong> must be provided<br/>
                  • audioUrl takes priority if both are provided<br/>
                  • audioText serves as fallback when audioUrl is invalid or unavailable
                </Typography>
              </Alert>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Column Name</strong></TableCell>
                      <TableCell><strong>Type</strong></TableCell>
                      <TableCell><strong>Required</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {excelColumns.map((col, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography fontFamily="monospace" fontSize="0.875rem">
                            {col.column}
                          </Typography>
                        </TableCell>
                        <TableCell>{col.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={col.required} 
                            size="small"
                            color={col.required === 'Yes' ? 'error' : col.required === 'Optional*' ? 'warning' : 'default'}
                          />
                        </TableCell>
                        <TableCell>{col.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                * At least one of audioUrl or audioText is required for Listening module questions
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Workflow Steps */}
        <Box sx={{ flex: '100%' }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Enhanced Admin Workflow
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: { xs: '100%', md: 'calc(33.33% - 16px)' }, textAlign: 'center', p: 3 }}>
                  <DownloadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>1. Download Template</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get Excel templates with audio-specific columns for Listening modules
                  </Typography>
                </Box>
                <Box sx={{ flex: { xs: '100%', md: 'calc(33.33% - 16px)' }, textAlign: 'center', p: 3 }}>
                  <AudioIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>2. Configure Audio</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add audioUrl for direct files or audioText for speech synthesis
                  </Typography>
                </Box>
                <Box sx={{ flex: { xs: '100%', md: 'calc(33.33% - 16px)' }, textAlign: 'center', p: 3 }}>
                  <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>3. Upload & Validate</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload Excel with automatic validation and audio configuration preview
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Sample Data Display */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Current Audio Configuration Sample
        </Typography>
        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
            {JSON.stringify(audioSample, null, 2)}
          </pre>
        </Paper>
      </Box>
    </Container>
  );
};

export default EnhancedAdminDemo;