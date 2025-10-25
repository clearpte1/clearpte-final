// This file contains the images and text for the hero slider
export interface HeroSlide {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export const heroSlides: HeroSlide[] = [
  {
    image: require('../assets/slider1.png'),
    alt: 'Platinum Member Certificate',
    title: 'Proud to be PLATINUM MEMBER',
    subtitle: 'of the British Council Partnership Programme',
    buttonText: 'LEARN MORE',
  },
  {
    image: require('../assets/slider2.png'),
    alt: 'AI Scoring',
    title: 'Practice PTE Academic & PTE Core with AI Scorings',
    subtitle: 'Join 100,000+ PTE test takers to practice',
    buttonText: 'Practice Now',
  },
  {
    alt: 'Practice PTE Academic & PTE Core with AI Scorings',
    subtitle: 'Join 100,000 PTE test takers to practice',
    title: 'Get instant AI-powered feedback on your speaking, writing, reading, and listening skills',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b',
    buttonText: 'Start Practicing Now',
    // alt: 'NEW',
    // badgeColor: 'secondary',
  },
  {
    // id: 2,
    alt: 'Master PTE with Expert-Designed Practice Tests',
    subtitle: 'Comprehensive preparation for all PTE modules',
    title: 'Access thousands of practice questions with detailed explanations and scoring',
    image: 'https://images.pexels.com/photos/32848447/pexels-photo-32848447.jpeg',
    buttonText: 'Explore Practice Tests',
    // badge: 'POPULAR',
    // badgeColor: 'primary',
  },
  {
    // id: 3,
    alt: 'Achieve Your Dream Score with Personalized Learning',
    subtitle: 'Adaptive learning powered by AI',
    title: 'Track your progress and get personalized recommendations to improve your weak areas',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    buttonText: 'Get Started Free',
    // badge: 'FREE',
    // badgeColor: 'success',
  },
  {
    // id: 4,
    alt: 'Real-time Scoring & Detailed Analytics',
    subtitle: 'Know exactly where you stand',
    title: 'Get instant feedback with detailed performance analytics and improvement suggestions',
    image: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg',
    buttonText: 'Try AI Scoring',
    // badge: 'ADVANCED',
    // badgeColor: 'warning',
  },
  {
    // id: 5,
    alt: 'Success Stories - Join Our Alumni',
    subtitle: 'Thousands have achieved their PTE goals',
    title: 'Join successful candidates who achieved their target scores with our platform',
    image: 'https://images.unsplash.com/photo-1646107925382-fa80ac081f73',
    buttonText: 'View Success Stories',
    // badge: 'PROVEN',
    // badgeColor: 'info',
  },
  // Add more slides as needed
];
