import React from 'react';
import { Container, Box } from '@mui/material';
import { User } from '../types';
import SpeakingSection from './dashboard/SpeakingSection';
import WritingSection from './dashboard/WritingSection';
import ListeningSection from './dashboard/ListeningSection';
import ReadingSection from './dashboard/ReadingSection';
import ExamCountdown from './dashboard/ExamCountdown';
import TodaysTasks from './dashboard/TodaysTasks';

interface DashboardProps {
  user: User | null;
}

export const Dashboard = ({ user }: DashboardProps) => {
  // Calculate exam date (30 days from now as default)
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + 30);
  examDate.setHours(examDate.getHours() + 12);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {/* Top Row */}
        <SpeakingSection score="62/90" />
        <WritingSection score="55/90" />
        <ExamCountdown examDate={examDate} />

        {/* Bottom Row */}
        <ListeningSection score="55/90" />
        <ReadingSection score="64/90" />
        <TodaysTasks day="Tue" />
      </Box>
    </Container>
  );
};

export default Dashboard;
