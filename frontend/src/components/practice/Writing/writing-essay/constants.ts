export interface EssayQuestion {
  id: number;
  prompt: string;
  type: string;
  timeLimit: number; // in minutes
  wordLimit: string;
}

// export interface EssayFeedback {
//   overallScore: number;
//   contentScore: number;
//   formScore: number;
//   grammarScore: number;
//   vocabularyScore: number;
//   spellingScore: number;
//   wordCount: number;
//   feedback: {
//     strengths: string[];
//     improvements: string[];
//     grammar: string[];
//     vocabulary: string[];
//   };
// }


export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  warningThreshold: number;
  autoSubmit: boolean;
}

export interface QuestionResult {
  questionId: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number;
  answers: any[];
  percentage: number;
}

export interface EssayFeedback {
  overallScore: number;
  contentScore: number;
  formScore: number;
  grammarScore: number;
  vocabularyScore: number;
  spellingScore: number;
  wordCount: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    grammar: string[];
    vocabulary: string[];
  };
}


export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 1,
    prompt:
      'Some people think that universities should accept equal numbers of male and female students in every subject. To what extent do you agree or disagree?',
    type: 'Argumentative Essay',
    timeLimit: 20,
    wordLimit: '200-300 words',
  },
  {
    id: 2,
    prompt:
      'Technology has made it possible for people to work from home. Discuss the advantages and disadvantages of working from home.',
    type: 'Discussion Essay',
    timeLimit: 20,
    wordLimit: '200-300 words',
  },
  {
    id: 3,
    prompt:
      'Environmental problems are becoming a global issue. What are the causes of environmental problems and what measures can be taken to tackle them?',
    type: 'Problem-Solution Essay',
    timeLimit: 20,
    wordLimit: '200-300 words',
  },
];

export const ESSAY_MOCK_FEEDBACK: EssayFeedback = {
  overallScore: 79,
  contentScore: 82,
  formScore: 75,
  grammarScore: 80,
  vocabularyScore: 78,
  spellingScore: 85,
  wordCount: 0, // Will be calculated dynamically
  feedback: {
    strengths: [
      'Clear thesis statement in introduction',
      'Good use of examples to support arguments',
      'Logical paragraph structure maintained',
      'Appropriate conclusion that summarizes main points',
    ],
    improvements: [
      'Use more varied sentence structures',
      'Include more sophisticated vocabulary',
      'Better transitions between paragraphs',
      'Address counterarguments more thoroughly',
    ],
    grammar: [
      'Minor article usage errors (2 instances)',
      'One subject-verb agreement error',
      'Generally good use of complex sentences',
    ],
    vocabulary: [
      'Good range of topic-specific vocabulary',
      'Some repetition of common words',
      'Could benefit from more precise word choices',
    ],
  },
};

// Constants for timing
export const ESSAY_TIME_LIMIT_SECONDS = 1200; // 20 minutes
export const ESSAY_MIN_WORDS = 200;
export const ESSAY_MAX_WORDS = 300;

export 
  const instructionsSections = [
    {
      title: 'Task Overview',
      items: ['Write an essay of 200-300 words based on the prompt.'],
    },
    {
      title: 'Time Allocation',
      items: ['20 minutes total.'],
    },
    {
      title: 'Tips',
      items: [
        'Plan your essay before writing.',
        'Use clear paragraphs.',
        'Support arguments with examples.',
        'Proofread for grammar.',
      ],
    },
    {
      title: 'Scoring',
      items: [
        'Content (40%)',
        'Form & Development (25%)',
        'Grammar (25%)',
        'Vocabulary (5%)',
        'Spelling (5%)',
      ],
    },
  ];
