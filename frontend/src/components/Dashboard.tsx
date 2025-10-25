import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, Box, Chip, LinearProgress } from '@mui/material';
import { Button } from './common/Button';
import {Grid} from '@mui/material';
import { Quiz, CheckCircle, Star, Timer, PlayArrow, Book, TrendingUp, Psychology } from '@mui/icons-material';
import { User } from '../types';
import FillInBlanks from './practice/Reading/fillin-blanks/FillInBlanks';

interface DashboardProps {
  user: User | null;
}

export const Dashboard = ({ user }:DashboardProps) => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Tests', value: user?.progress?.totalTests || 0, icon: <Quiz color="primary" /> },
    { title: 'Completed', value: user?.progress?.completedTests || 0, icon: <CheckCircle color="success" /> },
    { title: 'Average Score', value: `${user?.progress?.averageScore || 0}%`, icon: <Star color="warning" /> },
    { title: 'Time Saved', value: '24h', icon: <Timer color="info" /> },
  ];

  const quickActions = [
    { title: 'Start Practice Test', icon: <PlayArrow />, action: () => navigate('/practice') },
    { title: 'Study Materials', icon: <Book />, action: () => navigate('/materials') },
    { title: 'View Progress', icon: <TrendingUp />, action: () => navigate('/progress') },
    { title: 'AI Analysis', icon: <Psychology />, action: () => navigate('/practice') },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Welcome back, {user?.name}!
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid
          //  item xs={12} sm={6} md={3} key={index}
           >
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>{stat.icon}</Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid 
        // item xs={12} md={8}
        >
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid 
                // item xs={12} sm={6} key={index}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={action.action}
                    sx={{ p: 2, justifyContent: 'flex-start' }}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        
        <Grid 
        // item xs={12} md={4}
        >
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Progress Overview
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Overall Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={((user?.progress?.completedTests|| 1) / (user?.progress?.totalTests||1)) * 100} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                Strong Areas
              </Typography>
              {user?.progress?.strongAreas?.map((area, index) => (
                <Chip onClick={() => { }} key={index} label={area} size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: 'warning.main', mb: 1 }}>
                Areas for Improvement
              </Typography>
              {user?.progress?.weakAreas?.map((area, index) => (
                <Chip onClick={() => { }} key={index} label={area} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
