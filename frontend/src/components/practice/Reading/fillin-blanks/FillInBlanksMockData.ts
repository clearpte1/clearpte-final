import { BaseTopic } from "../../common/types";


export const instructionsSections = [
  {
    title: 'Task Overview',
    items: ['Drag words from the box below to the appropriate place in the text.'],
  },
  {
    title: 'Strategy Tips:',
    items: [
      'Read the entire text first',
      'Consider grammar and meaning',
      'Look for context clues',
      'Check subject-verb agreement',
      'Consider collocations',
    ],
  },
  {
    title: 'What to Consider:',
    items: ['Parts of speech', 'Logical meaning', 'Grammatical correctness', 'Sentence flow', 'Overall coherence'],
  },
  {
    title: 'Scoring',
    items: ['1 point per correct answer', 'No negative marking', 'All blanks must be filled'],
  },
];
export const questions: Question[] = [
  {
    id: 1,
    title: 'Renewable Energy Sources',
    text: 'Solar energy has become increasingly _____(1)_____ as a renewable energy source in recent years. The technology has _____(2)_____ significantly, making it more _____(3)_____ for both residential and commercial applications. Many governments are now _____(4)_____ substantial investments in solar infrastructure to reduce their carbon _____(5)_____.',
    blanks: [
      { id: 1, correctAnswer: 'popular', options: ['popular', 'expensive', 'dangerous', 'complicated'], userAnswer: '' },
      { id: 2, correctAnswer: 'improved', options: ['improved', 'declined', 'stagnated', 'disappeared'], userAnswer: '' },
      { id: 3, correctAnswer: 'affordable', options: ['affordable', 'difficult', 'unreliable', 'temporary'], userAnswer: '' },
      { id: 4, correctAnswer: 'making', options: ['making', 'avoiding', 'preventing', 'reducing'], userAnswer: '' },
      { id: 5, correctAnswer: 'footprint', options: ['footprint', 'emissions', 'pollution', 'waste'], userAnswer: '' },
    ],
    difficulty: "Beginner",
    category: "",
    tags: [],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 2,
    title: 'Artificial Intelligence in Healthcare',
    text: 'Artificial intelligence is _____(1)_____ the healthcare industry in unprecedented ways. Machine learning algorithms can now _____(2)_____ medical images with greater _____(3)_____ than human doctors in some cases. This technology has the _____(4)_____ to revolutionize medical diagnosis and _____(5)_____ patient outcomes significantly.',
    blanks: [
      { id: 1, correctAnswer: 'transforming', options: ['transforming', 'destroying', 'limiting', 'complicating'], userAnswer: '' },
      { id: 2, correctAnswer: 'analyze', options: ['analyze', 'ignore', 'delete', 'corrupt'], userAnswer: '' },
      { id: 3, correctAnswer: 'accuracy', options: ['accuracy', 'difficulty', 'confusion', 'delay'], userAnswer: '' },
      { id: 4, correctAnswer: 'potential', options: ['potential', 'inability', 'restriction', 'disadvantage'], userAnswer: '' },
      { id: 5, correctAnswer: 'improve', options: ['improve', 'worsen', 'maintain', 'ignore'], userAnswer: '' },
    ],
    difficulty: "Beginner",
    category: "",
    tags: [],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 3,
    title: 'Climate Change Mitigation',
    text: 'Global efforts to combat climate change include _____(1)_____ deforestation and promoting _____(2)_____ energy sources. Scientists argue that these measures can _____(3)_____ greenhouse gas emissions if implemented _____(4)_____. Public awareness has also _____(5)_____ significantly in recent decades.',
    blanks: [
      { id: 1, correctAnswer: 'reducing', options: ['reducing', 'increasing', 'ignoring', 'supporting'], userAnswer: '' },
      { id: 2, correctAnswer: 'renewable', options: ['renewable', 'fossil', 'nuclear', 'traditional'], userAnswer: '' },
      { id: 3, correctAnswer: 'decrease', options: ['decrease', 'increase', 'stabilize', 'eliminate'], userAnswer: '' },
      { id: 4, correctAnswer: 'effectively', options: ['effectively', 'poorly', 'rarely', 'slowly'], userAnswer: '' },
      { id: 5, correctAnswer: 'grown', options: ['grown', 'declined', 'remained', 'disappeared'], userAnswer: '' },
    ],
    difficulty: "Beginner",
    category: "",
    tags: [],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 4,
    title: 'Urban Development Trends',
    text: 'Modern cities are focusing on _____(1)_____ transportation systems to reduce traffic _____(2)_____. This includes the development of _____(3)_____ bike lanes and _____(4)_____ public transit options. Such initiatives aim to _____(5)_____ air quality in urban areas.',
    blanks: [
      { id: 1, correctAnswer: 'sustainable', options: ['sustainable', 'expensive', 'inefficient', 'traditional'], userAnswer: '' },
      { id: 2, correctAnswer: 'congestion', options: ['congestion', 'speed', 'safety', 'expansion'], userAnswer: '' },
      { id: 3, correctAnswer: 'dedicated', options: ['dedicated', 'narrow', 'dangerous', 'temporary'], userAnswer: '' },
      { id: 4, correctAnswer: 'improved', options: ['improved', 'reduced', 'outdated', 'limited'], userAnswer: '' },
      { id: 5, correctAnswer: 'enhance', options: ['enhance', 'worsen', 'ignore', 'maintain'], userAnswer: '' },
    ],
    difficulty: "Beginner",
    category: "",
    tags: [],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 5,
    title: 'Educational Technology',
    text: 'The integration of technology in education has _____(1)_____ learning experiences by providing _____(2)_____ resources. Online platforms now offer _____(3)_____ courses that are _____(4)_____ to a wider audience. However, this shift requires _____(5)_____ infrastructure to be effective.',
    blanks: [
      { id: 1, correctAnswer: 'transformed', options: ['transformed', 'limited', 'complicated', 'reduced'], userAnswer: '' },
      { id: 2, correctAnswer: 'interactive', options: ['interactive', 'static', 'expensive', 'unreliable'], userAnswer: '' },
      { id: 3, correctAnswer: 'accessible', options: ['accessible', 'restricted', 'difficult', 'unpopular'], userAnswer: '' },
      { id: 4, correctAnswer: 'available', options: ['available', 'unavailable', 'costly', 'rare'], userAnswer: '' },
      { id: 5, correctAnswer: 'robust', options: ['robust', 'weak', 'old', 'insufficient'], userAnswer: '' },
    ],
    difficulty: "Beginner",
    category: "",
    tags: [],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },
];

  
 export interface BlankAnswer {
    id: number;
    userAnswer: string;
    correctAnswer: string;
    options: string[];
  }
  
  export interface Question extends BaseTopic{
    id: number;
    title: string;
    text: string;
    blanks: BlankAnswer[];
  }
  
  // Define props for FeedbackCard to include isCorrect
  export interface FeedbackCardProps {
    isCorrect: boolean;
  }

  
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
  totalBlanks: number;
  completedAt: Date;
  timeSpent: number;
  answers: any[];
}
