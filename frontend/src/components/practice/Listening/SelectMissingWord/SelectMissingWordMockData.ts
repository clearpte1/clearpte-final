import { SelectMissingWordQuestion, StudentProgress } from "./SelectMissingWordType";

export const mockSelectMissingWordQuestions: SelectMissingWordQuestion[] = [
  // Beginner Level - With Audio URL (MP3)
  {
    id: 1,
    title: 'Fiction Writing Techniques',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Writing',
    tags: ['fiction', 'writing', 'creativity'],
    maxScore: 100,
    type: 'question',
    speaker: 'Creative Writing Instructor',
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      audioText: 'Writing compelling fiction requires understanding several key elements that work together to create an engaging story. First, you need to develop interesting characters that readers can connect with emotionally. Your protagonist should have clear goals, face meaningful obstacles, and undergo some form of transformation throughout the narrative. Second, the plot structure should follow a logical progression with rising action, climax, and resolution. Third, the setting should feel authentic and contribute to the mood of your story. Finally, good fiction writing demonstrates strong attention to detail and uses vivid imagery to help readers visualize the scenes. The most important quality that separates great fiction from mediocre writing is CREATIVITY.',
      audioFormat: 'mp3',
      audioDuration: 45,
      audioTitle: 'Fiction Writing Techniques - Creative Writing'
    },
    missingWordPosition: 'CREATIVITY',
    instructions: 'You will hear a recording about fiction writing. At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    options: [
      {
        id: 'A',
        label: 'A',
        text: 'negativity',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'good',
        isCorrect: false
      },
      {
        id: 'C',
        label: 'C',
        text: 'positivity',
        isCorrect: false
      },
      {
        id: 'D',
        label: 'D',
        text: 'creativity',
        isCorrect: true
      }
    ],
    correctAnswer: 'D',
    explanation: 'The recording emphasizes that creativity is the most important quality that distinguishes great fiction from mediocre writing.',
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },

  // Intermediate Level - With Audio URL (WAV Format)
  {
    id: 2,
    title: 'Digital Marketing Strategies',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Business',
    tags: ['marketing', 'digital', 'strategy'],
    maxScore: 150,
    type: 'question',
    speaker: 'Marketing Expert',
    audio: {
      // audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
      audioText: 'In today\'s competitive business environment, effective digital marketing requires a multi-channel approach that reaches customers across various touchpoints. Social media platforms like Facebook, Instagram, and LinkedIn offer targeted advertising options that allow businesses to reach specific demographics with precision. Content marketing through blogs, videos, and podcasts helps establish thought leadership and builds trust with potential customers. Email marketing remains one of the most cost-effective channels, providing direct communication with subscribers who have already shown interest in your products or services. Search engine optimization ensures your website ranks well in Google searches, driving organic traffic to your business. The key to successful digital marketing campaigns is consistent MEASUREMENT and analysis of performance metrics.',
      // audioFormat: 'wav',
      // audioDuration: 38,
      audioTitle: 'Digital Marketing Strategies - Business Lecture'
    },
    missingWordPosition: 'MEASUREMENT',
    instructions: 'You will hear a recording about business marketing. At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    options: [
      {
        id: 'A',
        label: 'A',
        text: 'investment',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'measurement',
        isCorrect: true
      },
      {
        id: 'C',
        label: 'C',
        text: 'implementation',
        isCorrect: false
      },
      {
        id: 'D',
        label: 'D',
        text: 'development',
        isCorrect: false
      }
    ],
    correctAnswer: 'B',
    explanation: 'The recording concludes that measurement and analysis of performance metrics is key to successful digital marketing campaigns.',
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },

  // Advanced Level - With Audio URL (OGG Format)
  {
    id: 3,
    title: 'Renewable Energy Economics',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Environment',
    tags: ['energy', 'economics', 'renewable'],
    maxScore: 200,
    type: 'question',
    speaker: 'Energy Policy Analyst',
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
      audioText: 'The transition to renewable energy sources represents both a significant economic opportunity and a complex policy challenge for governments worldwide. Solar and wind power technologies have achieved grid parity in many markets, meaning they can generate electricity at costs competitive with fossil fuels without subsidies. However, the intermittent nature of renewable energy sources requires substantial investments in energy storage systems and smart grid infrastructure to ensure reliable power delivery. Government policies play a crucial role in accelerating adoption through tax incentives, feed-in tariffs, and renewable portfolio standards that mandate utilities to source a percentage of their power from clean sources. The economic benefits extend beyond just energy costs, as the renewable sector creates jobs in manufacturing, installation, and maintenance. Climate change mitigation efforts require unprecedented global COOPERATION and coordination among nations.',
      audioFormat: 'ogg',
      audioDuration: 52,
      audioTitle: 'Renewable Energy Economics - Policy Analysis'
    },
    missingWordPosition: 'COOPERATION',
    instructions: 'You will hear a recording about energy policy. At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    options: [
      {
        id: 'A',
        label: 'A',
        text: 'competition',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'cooperation',
        isCorrect: true
      },
      {
        id: 'C',
        label: 'C',
        text: 'regulation',
        isCorrect: false
      },
      {
        id: 'D',
        label: 'D',
        text: 'innovation',
        isCorrect: false
      }
    ],
    correctAnswer: 'B',
    explanation: 'The recording emphasizes that climate change mitigation requires global cooperation and coordination among nations.',
    isNew: false,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },

  // Additional Beginner Level - Text-to-Speech Only
  {
    id: 4,
    title: 'Effective Time Management',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Productivity',
    tags: ['time', 'management', 'productivity'],
    maxScore: 100,
    type: 'question',
    speaker: 'Productivity Coach',
    audio: {
      // No audioUrl - text-to-speech only
      audioText: 'Managing your time effectively is essential for achieving both personal and professional success. The first step is to identify your most important tasks and prioritize them based on urgency and impact. Many successful people use techniques like the Eisenhower Matrix to categorize tasks into four quadrants: urgent and important, important but not urgent, urgent but not important, and neither urgent nor important. Time blocking is another powerful strategy where you assign specific time slots to different activities throughout your day. This prevents multitasking and helps maintain focus on one task at a time. Eliminating distractions such as social media notifications and unnecessary meetings can significantly boost your productivity. The foundation of good time management is developing strong DISCIPLINE.',
      audioTitle: 'Time Management Techniques (Text-to-Speech)'
    },
    missingWordPosition: 'DISCIPLINE',
    instructions: 'You will hear a recording about productivity. At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    options: [
      {
        id: 'A',
        label: 'A',
        text: 'creativity',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'flexibility',
        isCorrect: false
      },
      {
        id: 'C',
        label: 'C',
        text: 'discipline',
        isCorrect: true
      },
      {
        id: 'D',
        label: 'D',
        text: 'motivation',
        isCorrect: false
      }
    ],
    correctAnswer: 'C',
    explanation: 'The recording concludes that discipline is the foundation of good time management.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },

  // Intermediate Level - Mixed Audio (URL + comprehensive audioText)
  {
    id: 5,
    title: 'Sustainable Urban Planning',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Urban Development',
    tags: ['urban', 'planning', 'sustainability'],
    maxScore: 150,
    type: 'question',
    speaker: 'Urban Planning Specialist',
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
      audioText: 'Creating sustainable cities requires careful planning that balances economic growth with environmental protection and social equity. Modern urban planners focus on developing mixed-use neighborhoods where residents can live, work, and shop within walking distance, reducing dependence on private vehicles. Green infrastructure, including parks, green roofs, and urban forests, helps manage stormwater runoff while improving air quality and providing recreational spaces for residents. Public transportation systems must be efficient, affordable, and accessible to encourage ridership and reduce traffic congestion. Affordable housing policies ensure that cities remain inclusive and don\'t displace long-term residents through gentrification. The success of sustainable urban development depends on meaningful community ENGAGEMENT throughout the planning process.',
      audioFormat: 'mp3',
      audioDuration: 42,
      audioTitle: 'Sustainable Urban Planning - Development Strategies'
    },
    missingWordPosition: 'ENGAGEMENT',
    instructions: 'You will hear a recording about city planning. At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    options: [
      {
        id: 'A',
        label: 'A',
        text: 'investment',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'engagement',
        isCorrect: true
      },
      {
        id: 'C',
        label: 'C',
        text: 'enforcement',
        isCorrect: false
      },
      {
        id: 'D',
        label: 'D',
        text: 'assessment',
        isCorrect: false
      }
    ],
    correctAnswer: 'B',
    explanation: 'The recording emphasizes that community engagement throughout the planning process is essential for sustainable urban development.',
    isNew: true,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z'
  },

  // Advanced Level - Multiple Audio Format Example
  {
    id: 6,
    title: 'Quantum Computing Applications',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Technology',
    tags: ['quantum', 'computing', 'technology'],
    maxScore: 200,
    type: 'question',
    speaker: 'Dr. Sarah Chen',
    audio: {
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      audioText: 'Quantum computing represents a paradigm shift in computational technology, leveraging quantum mechanical phenomena to process information in fundamentally different ways. Unlike classical computers that use bits, quantum computers utilize quantum bits or qubits that can exist in multiple states simultaneously. This superposition enables quantum computers to perform certain calculations exponentially faster than classical systems. The potential applications include cryptography, drug discovery, and optimization problems that are currently intractable for conventional computers. However, quantum computers face significant challenges including quantum decoherence, error rates, and the need for extremely low temperatures. The field requires continued research and development to overcome these obstacles and realize the full potential of quantum TECHNOLOGIES.',
      audioFormat: 'mp3',
      audioDuration: 48,
      audioTitle: 'Quantum Computing Applications - Technology Lecture'
    },
    missingWordPosition: 'TECHNOLOGIES',
    instructions: 'You will hear a recording about advanced computing. At the end of the recording the lost word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    options: [
      {
        id: 'A',
        label: 'A',
        text: 'mathematics',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'theories',
        isCorrect: false
      },
      {
        id: 'C',
        label: 'C',
        text: 'technologies',
        isCorrect: true
      },
      {
        id: 'D',
        label: 'D',
        text: 'algorithms',
        isCorrect: false
      }
    ],
    correctAnswer: 'C',
    explanation: 'The recording discusses the need for continued research to realize the full potential of quantum technologies.',
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-25T08:30:00Z',
    updatedAt: '2024-01-25T08:30:00Z'
  }
];

export const mockStudentProgress: StudentProgress = {
  studentName: 'Select Missing Word Practice',
  questionNumber: 119,
  testedCount: 68,
  totalQuestions: 1200,
  currentStreak: 5,
  averageScore: 82.3
};

export const difficultySettings = {
  Beginner: {
    timeLimit: 900, // 15 minutes
    maxScore: 100,
    passingScore: 70
  },
  Intermediate: {
    timeLimit: 1200, // 20 minutes
    maxScore: 150,
    passingScore: 75
  },
  Advanced: {
    timeLimit: 1800, // 30 minutes
    maxScore: 200,
    passingScore: 80
  }
};

// Helper function for backward compatibility and migration
export const convertLegacyQuestion = (question: any): SelectMissingWordQuestion => {
  if (question.audio && typeof question.audio === 'object') {
    return question; // Already in new format
  }
  
  // Convert legacy format
  return {
    ...question,
    audio: {
      audioUrl: undefined,
      audioText: question.audioText || 'This is a sample audio for the select missing word exercise. Listen carefully and select the missing word.',
      audioTitle: question.title || 'Listening Audio'
    }
  };
};

// Export template for Excel import/export
export const getExcelTemplate = () => ({
  headers: [
    'id',
    'title',
    'audioUrl',
    'audioText',
    'audioFormat',
    'audioDuration',
    'missingWordPosition',
    'options',
    'correctAnswer',
    'explanation',
    'difficulty',
    'category',
    'tags',
    'timeLimit',
    'maxScore'
  ],
  sampleData: [
    {
      id: 1,
      title: 'Sample Question',
      audioUrl: 'https://example.com/audio.mp3',
      audioText: 'Sample audio text with MISSING word for text-to-speech fallback',
      audioFormat: 'mp3',
      audioDuration: 30,
      missingWordPosition: 'MISSING',
      options: 'option1; option2; option3; missing',
      correctAnswer: 'D',
      explanation: 'Sample explanation for the correct answer',
      difficulty: 'Intermediate',
      category: 'General',
      tags: 'sample; test; exercise',
      timeLimit: 1200,
      maxScore: 150
    }
  ]
});