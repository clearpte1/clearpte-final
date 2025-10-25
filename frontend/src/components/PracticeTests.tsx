import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, Grid, Card, CardContent, Avatar, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, LinearProgress } from '@mui/material';
import { Quiz, Mic, Edit, Book, VolumeUp, PlayArrow, ArrowBack, Psychology, Visibility } from '@mui/icons-material';
import { Button } from './common/Button';
import { User } from '../types';

interface PracticeTestsProps {
  user: User | null;
}

// Interface for the subTest object
interface SubTest {
  name: string;
  description: string;
  aiScore?: boolean;
  core?: boolean;
}

// Interface for the main test type object
interface TestType {
  title: string;
  duration: string;
  questions: number;
  description: string;
  color: string;
  subTests?: SubTest[];
}

export const PracticeTests = ({ user }:PracticeTestsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTestType, setSelectedTestType] = useState<TestType|null>();

  const testTypes = [
    { 
      title: 'Full Length Test', 
      duration: '3 hours', 
      questions: 79, 
      description: 'Complete PTE Academic test simulation',
      color: '#4DB6AC'
    },
    { 
      title: 'Speaking Test', 
      duration: '30 mins', 
      questions: 15, 
      description: 'Focus on speaking skills',
      color: '#FF5722',
      subTests: [
        { name: 'Read Aloud', aiScore: true, description: 'Read text aloud with proper pronunciation' },
        { name: 'Repeat Sentence', aiScore: true, description: 'Listen and repeat sentences accurately' },
        { name: 'Describe Image', aiScore: true, description: 'Describe the image shown in detail' },
        { name: 'Re-tell Lecture', aiScore: true, description: 'Summarize academic lecture content' },
        { name: 'Answer Short Question', aiScore: true, description: 'Answer factual questions briefly' },
        { name: 'Respond to a situation', aiScore: false, core: true, description: 'Respond to given situation appropriately' }
      ]
    },
    { 
      title: 'Writing Test', 
      duration: '60 mins', 
      questions: 12, 
      description: 'Essay and summarize tasks',
      color: '#2196F3',
      subTests: [
        { name: 'Summarize Written Text', aiScore: true, description: 'Summarize academic text in one sentence' },
        { name: 'Write Essay', aiScore: true, description: 'Write 200-300 word argumentative essay' },
        { name: 'Summarize Written Text', aiScore: false, core: true, description: 'Core version summarization task' },
        { name: 'Write Email', aiScore: false, core: true, description: 'Write formal or informal email response' }
      ]
    },
    { 
      title: 'Reading Test', 
      duration: '45 mins', 
      questions: 20, 
      description: 'Reading comprehension',
      color: '#4CAF50',
      subTests: [
        { name: 'Reading & Writing: Fill in the blanks', description: 'Complete text with appropriate words' },
        { name: 'Multiple Choice (Multiple)', description: 'Select multiple correct answers' },
        { name: 'Re-order Paragraphs', description: 'Arrange paragraphs in correct sequence' },
        { name: 'Reading: Fill in the Blanks', description: 'Complete text with drag-and-drop words' },
        { name: 'Multiple Choice (Single)', description: 'Select one correct answer' }
      ]
    },
    { 
      title: 'Listening Test', 
      duration: '45 mins', 
      questions: 18, 
      description: 'Audio-based questions',
      color: '#FF9800',
      subTests: [
        { name: 'Summarize Spoken Text', aiScore: true, description: 'Write summary of spoken content' },
        { name: 'Multiple Choice (Multiple)', description: 'Select multiple correct answers from audio' },
        { name: 'Fill in the Blanks', description: 'Complete transcript while listening' },
        { name: 'Highlight Correct Summary', description: 'Choose best summary of audio content' },
        { name: 'Multiple Choice (Single)', description: 'Select one correct answer from audio' },
        { name: 'Select Missing Word', description: 'Choose word that completes the audio' },
        { name: 'Highlight Incorrect Words', description: 'Identify words that differ from audio' },
        { name: 'Write From Dictation', description: 'Type the sentence you hear' },
        { name: 'Summarize Spoken Text', aiScore: false, core: true, description: 'Core version spoken summary' }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Practice Tests
      </Typography>

      <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Available Tests" />
        <Tab label="My Results" />
        <Tab label="AI Analysis" />
      </Tabs>

      {selectedTab === 0 && (
        <Box>
          {selectedTestType ? (
            // Show detailed sub-tests for selected test type
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => setSelectedTestType(null)} sx={{ mr: 2 }}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h4" sx={{ color: selectedTestType.color }}>
                  {selectedTestType.title}
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {selectedTestType?.subTests?.map((subTest, index) => (
                  <Grid 
                  // item xs={12} md={6} lg={4} key={index}
                  >
                    <Card sx={{ 
                      p: 2, 
                      height: '100%',
                      border: `2px solid ${selectedTestType.color}20`,
                      borderRadius: 2
                    }}>
                      <CardContent sx={{ pb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {subTest.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {subTest.aiScore && (
                              <Chip 
                              onClick={() => { }}
                                label="AI Score" 
                                size="small" 
                                sx={{ 
                                  bgcolor: 'primary.main', 
                                  color: 'white',
                                  fontSize: '0.7rem',
                                  height: 20
                                }} 
                              />
                            )}
                            {subTest.core && (
                              <Chip 
                              onClick={() => { }}
                                label="Core" 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                  borderColor: 'secondary.main',
                                  color: 'secondary.main',
                                  fontSize: '0.7rem',
                                  height: 20
                                }} 
                              />
                            )}
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4 }}>
                          {subTest.description}
                        </Typography>
                        <Button 
                          variant="contained" 
                          startIcon={<PlayArrow />} 
                          size="small"
                          fullWidth
                          sx={{ 
                            bgcolor: selectedTestType.color,
                            '&:hover': { bgcolor: selectedTestType.color + 'CC' }
                          }}
                        >
                          Start Practice
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              {selectedTestType.title === 'Full Length Test' && (
                <Card sx={{ mt: 3, p: 4, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Complete PTE Academic Test
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Take the full 3-hour PTE Academic test with all sections including Speaking, Writing, Reading, and Listening
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<PlayArrow />}
                    sx={{ py: 2, px: 4 }}
                  >
                    Start Full Test
                  </Button>
                </Card>
              )}
            </Box>
          ) : (
            // Show main test type selection
            <Grid container spacing={3}>
              {testTypes.map((test, index) => (
                <Grid 
                // item xs={12} md={6} key={index}
                >
                  <Card 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      cursor: 'pointer',
                      border: `2px solid ${test.color}20`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `2px solid ${test.color}`,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 25px ${test.color}30`
                      }
                    }}
                    onClick={() => setSelectedTestType(test)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: test.color, mr: 2, width: 48, height: 48 }}>
                          {test.title === 'Full Length Test' ? <Quiz /> :
                           test.title === 'Speaking Test' ? <Mic /> :
                           test.title === 'Writing Test' ? <Edit /> :
                           test.title === 'Reading Test' ? <Book /> :
                           <VolumeUp />}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {test.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip onClick={() => { }} label={test.duration} size="small" sx={{ bgcolor: test.color + '20' }} />
                            <Chip onClick={() => { }} label={`${test.questions} questions`} size="small" variant="outlined" />
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {test.description}
                      </Typography>
                      {test.subTests && (
                        <Typography variant="body2" sx={{ color: test.color, fontWeight: 500 }}>
                          {test.subTests.length} question types available →
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {selectedTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Test Results
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test Type</TableCell>
                    <TableCell>Question Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { type: 'Speaking Test', questionType: 'Read Aloud', date: '2024-01-15', score: 78, status: 'Completed' },
                    { type: 'Speaking Test', questionType: 'Describe Image', date: '2024-01-15', score: 82, status: 'Completed' },
                    { type: 'Writing Test', questionType: 'Write Essay', date: '2024-01-12', score: 75, status: 'Completed' },
                    { type: 'Listening Test', questionType: 'Summarize Spoken Text', date: '2024-01-10', score: 80, status: 'Completed' },
                    { type: 'Reading Test', questionType: 'Multiple Choice (Single)', date: '2024-01-08', score: 85, status: 'Completed' },
                    { type: 'Speaking Test', questionType: 'Repeat Sentence', date: '2024-01-07', score: 72, status: 'Completed' },
                    { type: 'Writing Test', questionType: 'Summarize Written Text', date: '2024-01-05', score: 88, status: 'Completed' },
                    { type: 'Listening Test', questionType: 'Write From Dictation', date: '2024-01-03', score: 91, status: 'Completed' },
                  ].map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.type}</TableCell>
                      <TableCell>{result.questionType}</TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">{result.score}/90</Typography>
                          <Chip 
                          onClick={() => { }}
                            label={result.score >= 85 ? 'Excellent' : result.score >= 75 ? 'Good' : 'Needs Practice'} 
                            size="small"
                            color={result.score >= 85 ? 'success' : result.score >= 75 ? 'warning' : 'error'}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip onClick={() => { }} label={result.status} color="success" size="small" />
                      </TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<Visibility />}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid 
          // item xs={12} md={6}
          >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                AI Performance Analysis by Section
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Speaking</Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Read Aloud - Fluency</Typography>
                  <LinearProgress variant="determinate" value={85} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">85/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Read Aloud - Pronunciation</Typography>
                  <LinearProgress variant="determinate" value={78} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">78/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Describe Image - Content</Typography>
                  <LinearProgress variant="determinate" value={82} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">82/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Repeat Sentence - Accuracy</Typography>
                  <LinearProgress variant="determinate" value={90} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">90/100</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Writing</Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Essay - Grammar</Typography>
                  <LinearProgress variant="determinate" value={82} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">82/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Essay - Vocabulary</Typography>
                  <LinearProgress variant="determinate" value={90} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">90/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Summarize Written Text - Accuracy</Typography>
                  <LinearProgress variant="determinate" value={88} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">88/100</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Reading & Listening</Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Reading Comprehension</Typography>
                  <LinearProgress variant="determinate" value={88} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">88/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Fill in the Blanks</Typography>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">75/100</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">Write From Dictation</Typography>
                  <LinearProgress variant="determinate" value={92} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">92/100</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          
          <Grid
          //  item xs={12} md={6}
           >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                AI Recommendations by Question Type
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Mic color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Read Aloud - Pronunciation"
                    secondary="Focus on word stress patterns in academic vocabulary"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Edit color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Essay Writing - Structure"
                    secondary="Work on clear topic sentences and transitions"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VolumeUp color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Listening Fill in Blanks"
                    secondary="Practice note-taking with academic lectures"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Psychology color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Describe Image - Content"
                    secondary="Include more specific details and comparisons"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Book color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Re-order Paragraphs"
                    secondary="Focus on logical connectors and coherence"
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Weekly Practice Plan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • <strong>Monday</strong>: Read Aloud + Pronunciation drills<br/>
                • <strong>Tuesday</strong>: Essay writing + Grammar review<br/>
                • <strong>Wednesday</strong>: Listening practice + Note-taking<br/>
                • <strong>Thursday</strong>: Describe Image + Vocabulary<br/>
                • <strong>Friday</strong>: Reading comprehension + Speed<br/>
                • <strong>Weekend</strong>: Full mock tests + Review
              </Typography>
            </Card>
          </Grid>

          {/* Question Type Performance Chart */}
          <Grid 
          // item xs={12}
          >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Performance by Question Type (Last 30 Days)
              </Typography>
              <Grid container spacing={2}>
                {[
                  { type: 'Read Aloud', score: 78, attempts: 12, trend: 'up' },
                  { type: 'Describe Image', score: 82, attempts: 8, trend: 'up' },
                  { type: 'Write Essay', score: 75, attempts: 6, trend: 'stable' },
                  { type: 'Summarize Written Text', score: 88, attempts: 10, trend: 'up' },
                  { type: 'Multiple Choice (Reading)', score: 85, attempts: 15, trend: 'up' },
                  { type: 'Fill in Blanks (Listening)', score: 72, attempts: 14, trend: 'down' },
                  { type: 'Write From Dictation', score: 92, attempts: 20, trend: 'up' },
                  { type: 'Repeat Sentence', score: 90, attempts: 18, trend: 'stable' },
                ].map((item, index) => (
                  <Grid
                  //  item xs={12} sm={6} md={3} key={index}
                   >
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        {item.type}
                      </Typography>
                      <Typography variant="h5" sx={{ color: 'primary.main', mb: 1 }}>
                        {item.score}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.attempts} attempts
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                        onClick={() => { }}
                          label={item.trend === 'up' ? '↗ Improving' : item.trend === 'down' ? '↘ Declining' : '→ Stable'}
                          size="small"
                          color={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'error' : 'default'}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default PracticeTests;
