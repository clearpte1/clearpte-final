import React from 'react';
import AIPracticeSection from './AIPracticeSection';
import StudyToolsSection from './StudyToolsSection';
import StudyMaterialsSection from './StudyMaterialsSection';
import KnowledgeSections from './KnowledgeSections';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import WhyUsePTECoreOnlineTests from './WhyUsePTECoreOnlineTests';
import PTEStatsSection from './PTEStatsSection';
import TestimonialSection from './TestimonialSection';
import FeaturesTabsSection from './FeaturesTabsSection';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => (
  <Box>
    <HeroSection onGetStarted={onGetStarted} />
    <WhyUsePTECoreOnlineTests />
    <PTEStatsSection />
    <TestimonialSection />
    <FeaturesTabsSection />
    {/* <AIPracticeSection />
    <StudyToolsSection />
    <StudyMaterialsSection />
    <KnowledgeSections /> */}
  </Box>
);

export default HomePage;