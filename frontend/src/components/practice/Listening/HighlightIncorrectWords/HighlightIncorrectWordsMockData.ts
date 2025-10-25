import { HighlightIncorrectWordsQuestion, StudentProgress } from "./HighlightIncorrectWordsTypes";

export const mockHighlightIncorrectWordsQuestions: HighlightIncorrectWordsQuestion[] = [
  // Beginner Level - With Audio URL (MP3)
  {
    id: 1,
    title: 'Sotheby\'s Art Auction Market',
    difficulty: 'Beginner',
    timeLimit: 1200, // 20 minutes
    category: 'Business',
    tags: ['art', 'auction', 'market'],
    maxScore: 100,
    type: 'question',
    speaker: 'Business Analyst',
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      audioText: 'The world has changed. The emphasis of the world have changed, and the art market has come in behind that. Absolutely. And it is part of the reason why Christie\'s left Australia and no longer has an office here. And Sotheby\'s. It\'s basically a branch or a purchase, for want of a better word of Sotheby\'s International. So neither auction house has a really permanent international situation in Australia because they are focusing their attention on the places they can make money, which is the Middle East, India and Asia.',
      audioFormat: 'mp3',
      audioDuration: 45,
      audioTitle: 'Art Auction Market Analysis - Business Report'
    },
    displayText: `The world has changed. The emphasis of the world have changed, and the art market has come in behind that. Absolutely. And it is part of the reason why Christie's left Australia and no longer has an office here. And Sotheby's. It's basically a branch or a purchase, for want of a better word of Sotheby's International. So neither auction plan has a really permanent international situation in Australia because they are focusing their attention on the places they can make money, which is the Middle East, India and Asia.`,
    incorrectWords: [
      {
        id: 'word_1',
        word: 'plan',
        correctWord: 'house',
        position: 88 // Position in word array
      }
    ],
    instructions: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    explanation: 'The speaker said "auction house" not "auction plan". Auction houses like Christie\'s and Sotheby\'s are well-known art auction companies.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },

  // Intermediate Level - With Audio URL (WAV Format)
  {
    id: 2,
    title: 'Climate Change and Ocean Impact',
    difficulty: 'Intermediate',
    timeLimit: 1500, // 25 minutes
    category: 'Environment',
    tags: ['climate', 'ocean', 'environment'],
    maxScore: 150,
    type: 'question',
    speaker: 'Environmental Scientist',
    audio: {
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
      audioText: 'Climate change is profoundly affecting marine ecosystems around the globe. Rising ocean temperatures are causing widespread coral bleaching events, while increased carbon dioxide absorption is making seawater more acidic. These changes threaten marine biodiversity and disrupt food chains that millions of people depend on for sustenance. Coastal communities are particularly vulnerable as sea levels continue to rise, forcing many to relocate inland.',
      audioFormat: 'wav',
      audioDuration: 32,
      audioTitle: 'Climate Change Ocean Impact - Environmental Science'
    },
    displayText: `Climate change is profoundly affecting marine ecosystems around the globe. Rising ocean temperatures are causing widespread coral bleaching events, while increased carbon dioxide absorption is making seawater more basic. These changes threaten marine biodiversity and disrupt food chains that millions of people depend on for survival. Coastal communities are particularly vulnerable as sea levels continue to rise, forcing many to relocate inland.`,
    incorrectWords: [
      {
        id: 'word_2',
        word: 'basic',
        correctWord: 'acidic',
        position: 25
      },
      {
        id: 'word_3',
        word: 'survival',
        correctWord: 'sustenance',
        position: 42
      }
    ],
    instructions: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    explanation: 'The speaker said "acidic" not "basic" - ocean acidification is a well-known consequence of CO2 absorption. Also said "sustenance" not "survival".',
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },

  // Advanced Level - With Audio URL (OGG Format)
  {
    id: 3,
    title: 'Quantum Computing Developments',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Technology',
    tags: ['quantum', 'computing', 'technology'],
    maxScore: 200,
    type: 'question',
    speaker: 'Quantum Physicist',
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
      audioText: 'Quantum computing represents a paradigm shift in computational capabilities, leveraging quantum mechanical phenomena like superposition and entanglement to process information exponentially faster than classical computers. However, quantum systems are extremely sensitive to environmental interference, requiring sophisticated error correction algorithms and near absolute zero operating temperatures. Current quantum computers remain largely experimental, but recent breakthroughs in quantum supremacy suggest practical applications may emerge within the next decade.',
      audioFormat: 'ogg',
      audioDuration: 48,
      audioTitle: 'Quantum Computing Developments - Physics Lecture'
    },
    displayText: `Quantum computing represents a paradigm shift in computational capabilities, leveraging quantum mechanical phenomena like superposition and entanglement to process information exponentially faster than classical computers. However, quantum systems are extremely sensitive to environmental interference, requiring sophisticated error detection algorithms and near absolute zero operating temperatures. Current quantum computers remain largely theoretical, but recent breakthroughs in quantum supremacy suggest practical applications may emerge within the next decade.`,
    incorrectWords: [
      {
        id: 'word_4',
        word: 'detection',
        correctWord: 'correction',
        position: 35
      },
      {
        id: 'word_5',
        word: 'theoretical',
        correctWord: 'experimental',
        position: 48
      }
    ],
    instructions: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    explanation: 'The speaker said "error correction" not "error detection" and "experimental" not "theoretical" when describing current quantum computers.',
    isNew: false,
    isMarked: true,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },

  // Additional Beginner Level - Text-to-Speech Only
  {
    id: 4,
    title: 'Healthy Lifestyle Habits',
    difficulty: 'Beginner',
    timeLimit: 1200,
    category: 'Health',
    tags: ['health', 'lifestyle', 'wellness'],
    maxScore: 100,
    type: 'question',
    speaker: 'Health Expert',
    audio: {
      // No audioUrl - text-to-speech only
      audioText: 'Maintaining a healthy lifestyle requires consistent daily habits that support both physical and mental well-being. Regular exercise, balanced nutrition, adequate sleep, and stress management are fundamental pillars of good health. Even small changes like taking the stairs instead of the elevator or drinking more water throughout the day can make a significant difference over time.',
      audioTitle: 'Healthy Lifestyle Habits (Text-to-Speech)'
    },
    displayText: `Maintaining a healthy lifestyle requires consistent daily habits that support both physical and mental well-being. Regular exercise, balanced nutrition, adequate sleep, and stress management are fundamental pillars of good health. Even small changes like taking the stairs instead of the escalator or drinking more water throughout the day can make a significant difference over time.`,
    incorrectWords: [
      {
        id: 'word_6',
        word: 'escalator',
        correctWord: 'elevator',
        position: 45
      }
    ],
    instructions: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    explanation: 'The speaker said "elevator" not "escalator" when giving examples of healthy choices.',
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
    title: 'Urban Transportation Systems',
    difficulty: 'Intermediate',
    timeLimit: 1500,
    category: 'Urban Planning',
    tags: ['transportation', 'urban', 'infrastructure'],
    maxScore: 150,
    type: 'question',
    speaker: 'Urban Planner',
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
      audioText: 'Modern cities face unprecedented challenges in managing transportation networks that serve millions of commuters daily. Public transit systems must be efficient, accessible, and environmentally sustainable to reduce traffic congestion and air pollution. Investment in electric buses, bike-sharing programs, and pedestrian infrastructure creates more livable urban environments while promoting economic growth.',
      audioFormat: 'mp3',
      audioDuration: 28,
      audioTitle: 'Urban Transportation Systems - Planning Report'
    },
    displayText: `Modern cities face unprecedented challenges in managing transportation networks that serve millions of commuters daily. Public transit systems must be efficient, accessible, and environmentally sustainable to reduce traffic congestion and air pollution. Investment in electric buses, car-sharing programs, and pedestrian infrastructure creates more livable urban environments while promoting economic growth.`,
    incorrectWords: [
      {
        id: 'word_7',
        word: 'car-sharing',
        correctWord: 'bike-sharing',
        position: 38
      }
    ],
    instructions: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    explanation: 'The speaker mentioned "bike-sharing programs" not "car-sharing programs" as part of sustainable urban transportation.',
    isNew: true,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z'
  },

  // Advanced Level with Multiple Errors - Multiple Audio Format Example
  {
    id: 6,
    title: 'Artificial Intelligence Ethics',
    difficulty: 'Advanced',
    timeLimit: 1800,
    category: 'Technology',
    tags: ['AI', 'ethics', 'technology'],
    maxScore: 200,
    type: 'question',
    speaker: 'AI Ethics Researcher',
    audio: {
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      audioText: 'The rapid advancement of artificial intelligence technologies raises complex ethical questions about privacy, autonomy, and human agency. As AI systems become more sophisticated and pervasive, we must establish robust governance frameworks that protect individual rights while fostering innovation. The challenge lies in balancing technological progress with social responsibility, ensuring that AI development serves humanity\'s best interests rather than exacerbating existing inequalities.',
      audioFormat: 'mp3',
      audioDuration: 42,
      audioTitle: 'AI Ethics Discussion - Technology Ethics'
    },
    displayText: `The rapid advancement of artificial intelligence technologies raises complex ethical questions about privacy, autonomy, and human agency. As AI systems become more sophisticated and pervasive, we must establish robust governance frameworks that protect individual rights while fostering creativity. The challenge lies in balancing technological progress with social responsibility, ensuring that AI development serves humanity's best interests rather than exacerbating existing problems.`,
    incorrectWords: [
      {
        id: 'word_8',
        word: 'creativity',
        correctWord: 'innovation',
        position: 32
      },
      {
        id: 'word_9',
        word: 'problems',
        correctWord: 'inequalities',
        position: 58
      }
    ],
    instructions: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    explanation: 'The speaker said "innovation" not "creativity" and "inequalities" not "problems" when discussing AI ethics challenges.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-10T08:30:00Z'
  }
];

export const mockStudentProgress: StudentProgress = {
  studentName: 'Highlight Incorrect Words Practice',
  questionNumber: 326,
  testedCount: 179,
  totalQuestions: 1500,
  currentStreak: 8,
  averageScore: 76.4
};

export const difficultySettings = {
  Beginner: {
    timeLimit: 1200, // 20 minutes
    maxScore: 100,
    passingScore: 70,
    maxIncorrectWords: 2
  },
  Intermediate: {
    timeLimit: 1500, // 25 minutes
    maxScore: 150,
    passingScore: 75,
    maxIncorrectWords: 3
  },
  Advanced: {
    timeLimit: 1800, // 30 minutes
    maxScore: 200,
    passingScore: 80,
    maxIncorrectWords: 4
  }
};

// Helper function for backward compatibility and migration
export const convertLegacyQuestion = (question: any): HighlightIncorrectWordsQuestion => {
  if (question.audio && typeof question.audio === 'object') {
    return question; // Already in new format
  }
  
  // Convert legacy format
  return {
    ...question,
    audio: {
      audioUrl: undefined,
      audioText: question.audioText || 'This is a sample audio for the highlight incorrect words exercise. Listen carefully and identify incorrect words.',
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
    'displayText',
    'incorrectWords',
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
      audioText: 'Sample audio text with correct words for text-to-speech fallback',
      audioFormat: 'mp3',
      audioDuration: 30,
      displayText: 'Sample audio text with incorrect words shown to user',
      incorrectWords: 'incorrect:correct; wrong:right',
      explanation: 'Sample explanation for the incorrect words',
      difficulty: 'Intermediate',
      category: 'General',
      tags: 'sample; test; exercise',
      timeLimit: 1500,
      maxScore: 150
    }
  ]
});