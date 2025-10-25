import { WriteFromDictationQuestion, StudentProgress } from "./WriteFromDictationTypes";
import { AudioConfig } from "../../../common/AudioTypes";

export const mockWriteFromDictationQuestions: WriteFromDictationQuestion[] = [
  // Beginner Level
  {
    id: 1,
    title: 'Simple Daily Activities',
    difficulty: 'Beginner',
    timeLimit: 600, // 10 minutes
    category: 'Daily Life',
    tags: ['daily', 'routine', 'simple'],
    maxScore: 100,
    speaker: 'Native Speaker',
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Sample URL
      audioText: `I usually wake up at seven o'clock in the morning and have breakfast with my family.`,
      audioFormat: 'mp3',
      audioDuration: 8,
      audioTitle: 'Daily Routine - Morning Schedule'
    },
    audioText: `I usually wake up at seven o'clock in the morning and have breakfast with my family.`, // Backward compatibility
    keyWords: ['wake', 'seven', 'morning', 'breakfast', 'family'],
    acceptableVariations: {
      'seven': ['7', 'seven'],
      "o'clock": ['oclock', 'o clock'],
      'breakfast': ['break fast']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence tests basic daily routine vocabulary and simple present tense structure.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },

  // Beginner Level - Text-to-Speech only
  {
    id: 2,
    title: 'Weather Description',
    difficulty: 'Beginner',
    timeLimit: 600,
    category: 'Weather',
    tags: ['weather', 'description', 'simple'],
    maxScore: 100,
    speaker: 'Native Speaker',
    audio: {
      // No audioUrl - will use text-to-speech only
      audioText: `Today is sunny and warm, perfect weather for a picnic in the park.`,
      audioTitle: 'Weather Description (Text-to-Speech)'
    },
    audioText: `Today is sunny and warm, perfect weather for a picnic in the park.`, // Backward compatibility
    keyWords: ['sunny', 'warm', 'perfect', 'picnic', 'park'],
    acceptableVariations: {
      'picnic': ['pic nic'],
      'weather': ['wheather']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence focuses on weather adjectives and common outdoor activity vocabulary.',
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },

  // Intermediate Level
  {
    id: 3,
    title: 'Academic Discussion',
    difficulty: 'Intermediate',
    timeLimit: 900, // 15 minutes
    category: 'Education',
    tags: ['academic', 'education', 'complex'],
    maxScore: 150,
    type: 'question',
    speaker: 'Professor',
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3', // Sample URL
      audioText: `The research methodology employed in this study demonstrates a comprehensive approach to analyzing contemporary socioeconomic patterns.`,
      audioFormat: 'mp3',
      audioDuration: 12,
      audioTitle: 'Academic Research Methodology'
    },
    audioText: `The research methodology employed in this study demonstrates a comprehensive approach to analyzing contemporary socioeconomic patterns.`, // Backward compatibility
    keyWords: ['research', 'methodology', 'comprehensive', 'analyzing', 'socioeconomic', 'patterns'],
    acceptableVariations: {
      'methodology': ['methodolgy'],
      'comprehensive': ['comprehnsive'],
      'socioeconomic': ['socio-economic', 'socio economic'],
      'analyzing': ['analysing']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence tests academic vocabulary and complex sentence structure with formal register.',
    isNew: false,
    isMarked: true,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },

  // Intermediate Level
  {
    id: 4,
    title: 'Technology and Society',
    difficulty: 'Intermediate',
    timeLimit: 900,
    category: 'Technology',
    tags: ['technology', 'society', 'modern'],
    maxScore: 150,
    type: 'question',
    speaker: 'Technology Expert',
    audio: {
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Sample URL (different format)
      audioText: `Digital transformation has revolutionized business operations, enabling companies to streamline processes and enhance customer experiences significantly.`,
      audioFormat: 'mp3',
      audioDuration: 15,
      audioTitle: 'Digital Transformation in Business'
    },
    audioText: `Digital transformation has revolutionized business operations, enabling companies to streamline processes and enhance customer experiences significantly.`, // Backward compatibility
    keyWords: ['digital', 'transformation', 'revolutionized', 'operations', 'streamline', 'enhance', 'experiences'],
    acceptableVariations: {
      'revolutionized': ['revolutionised'],
      'streamline': ['stream line'],
      'significantly': ['significently']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence focuses on business and technology vocabulary with complex grammatical structures.',
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },

  // Advanced Level
  {
    id: 5,
    title: 'Environmental Policy',
    difficulty: 'Advanced',
    timeLimit: 1200, // 20 minutes
    category: 'Environment',
    tags: ['environment', 'policy', 'complex'],
    maxScore: 200,
    type: 'question',
    speaker: 'Policy Analyst',
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg', // OGG format sample
      audioText: `The implementation of stringent environmental regulations necessitates unprecedented collaboration between governmental agencies, multinational corporations, and grassroots environmental organizations.`,
      audioFormat: 'ogg',
      audioDuration: 18,
      audioTitle: 'Environmental Policy Implementation'
    },
    audioText: `The implementation of stringent environmental regulations necessitates unprecedented collaboration between governmental agencies, multinational corporations, and grassroots environmental organizations.`, // Backward compatibility
    keyWords: ['implementation', 'stringent', 'regulations', 'necessitates', 'unprecedented', 'collaboration', 'governmental', 'multinational', 'grassroots'],
    acceptableVariations: {
      'stringent': ['stringant'],
      'necessitates': ['necesitates'],
      'unprecedented': ['unprecidented'],
      'governmental': ['govermental'],
      'multinational': ['multi-national', 'multi national'],
      'grassroots': ['grass-roots', 'grass roots']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This advanced sentence tests complex vocabulary, formal register, and sophisticated grammatical structures.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z'
  },

  // Advanced Level - Audio file with different format
  {
    id: 6,
    title: 'Scientific Research',
    difficulty: 'Advanced',
    timeLimit: 1200,
    category: 'Science',
    tags: ['science', 'research', 'academic'],
    maxScore: 200,
    type: 'question',
    speaker: 'Research Scientist',
    audio: {
      audioUrl: 'https://file-examples.com/storage/fef2cc3a8df74e7da8b4e5a/2017/11/file_example_MP3_700KB.mp3', // Different sample URL
      audioText: `The paradigmatic shift in quantum mechanics fundamentally challenged conventional understanding of physical reality, prompting extensive philosophical debates about the nature of observation and measurement.`,
      audioFormat: 'mp3',
      audioDuration: 20,
      audioTitle: 'Quantum Mechanics and Philosophy'
    },
    audioText: `The paradigmatic shift in quantum mechanics fundamentally challenged conventional understanding of physical reality, prompting extensive philosophical debates about the nature of observation and measurement.`, // Backward compatibility
    keyWords: ['paradigmatic', 'quantum', 'mechanics', 'fundamentally', 'challenged', 'conventional', 'philosophical', 'observation', 'measurement'],
    acceptableVariations: {
      'paradigmatic': ['paradigmattic'],
      'quantum': ['quantam'],
      'fundamentally': ['fundementally'],
      'conventional': ['convential'],
      'philosophical': ['philosofical'],
      'observation': ['observasion']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence tests advanced scientific vocabulary and complex abstract concepts.',
    isNew: true,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-10T08:30:00Z'
  },

  // Beginner Level
  {
    id: 7,
    title: 'Shopping Experience',
    difficulty: 'Beginner',
    timeLimit: 600,
    category: 'Shopping',
    tags: ['shopping', 'daily', 'routine'],
    maxScore: 100,
    speaker: 'Native Speaker',
    audio: {
      // Text-to-speech only example
      audioText: `She bought three apples, two bananas, and a bottle of orange juice at the supermarket.`,
      audioTitle: 'Shopping Trip (Text-to-Speech)'
    },
    audioText: `She bought three apples, two bananas, and a bottle of orange juice at the supermarket.`, // Backward compatibility
    keyWords: ['bought', 'three', 'apples', 'bananas', 'bottle', 'orange', 'juice', 'supermarket'],
    acceptableVariations: {
      'three': ['3'],
      'two': ['2'],
      'orange': ['ornge'],
      'supermarket': ['super market']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence tests numbers, food vocabulary, and past tense verbs.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-09T15:45:00Z',
    updatedAt: '2024-01-09T15:45:00Z'
  },

  // Intermediate Level
  {
    id: 8,
    title: 'Cultural Heritage',
    difficulty: 'Intermediate',
    timeLimit: 900,
    category: 'Culture',
    tags: ['culture', 'heritage', 'history'],
    maxScore: 150,
    type: 'question',
    speaker: 'Cultural Historian',
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Reusing URL for variety
      audioText: `The preservation of cultural heritage sites requires delicate balance between accessibility for tourists and protection of irreplaceable historical artifacts.`,
      audioFormat: 'mp3',
      audioDuration: 16,
      audioTitle: 'Cultural Heritage Preservation'
    },
    audioText: `The preservation of cultural heritage sites requires delicate balance between accessibility for tourists and protection of irreplaceable historical artifacts.`, // Backward compatibility
    keyWords: ['preservation', 'heritage', 'requires', 'delicate', 'balance', 'accessibility', 'tourists', 'protection', 'irreplaceable', 'artifacts'],
    acceptableVariations: {
      'preservation': ['preservasion'],
      'heritage': ['herritage'],
      'delicate': ['delecate'],
      'accessibility': ['accesibility'],
      'irreplaceable': ['ireplaceable'],
      'artifacts': ['artefacts']
    },
    instructions: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
    explanation: 'This sentence focuses on cultural and historical vocabulary with complex ideas.',
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-08T12:15:00Z',
    updatedAt: '2024-01-08T12:15:00Z'
  }
];

export const mockStudentProgress: StudentProgress = {
  studentName: 'Simple Daily Activities',
  questionNumber: 448,
  testedCount: 23,
  totalQuestions: 800,
  currentStreak: 4,
  averageScore: 84.7
};

export const difficultySettings = {
  Beginner: {
    timeLimit: 600, // 10 minutes
    maxScore: 100,
    passingScore: 70,
    keyWordWeight: 2.0,
    regularWordWeight: 1.0
  },
  Intermediate: {
    timeLimit: 900, // 15 minutes
    maxScore: 150,
    passingScore: 75,
    keyWordWeight: 2.5,
    regularWordWeight: 1.0
  },
  Advanced: {
    timeLimit: 1200, // 20 minutes
    maxScore: 200,
    passingScore: 80,
    keyWordWeight: 3.0,
    regularWordWeight: 1.0
  }
};

// Backward compatibility helpers
export const getAudioText = (question: WriteFromDictationQuestion): string => {
  return question.audio?.audioText || question.audioText;
};

export const hasAudioUrl = (question: WriteFromDictationQuestion): boolean => {
  return Boolean(question.audio?.audioUrl && question.audio.audioUrl.trim().length > 0);
};

export const getAudioSource = (question: WriteFromDictationQuestion): 'url' | 'tts' => {
  return hasAudioUrl(question) ? 'url' : 'tts';
};

// Migration helper for legacy question format
export const migrateQuestionFormat = (legacyQuestion: any): WriteFromDictationQuestion => {
  // If already has audio config, return as is
  if (legacyQuestion.audio) {
    return legacyQuestion;
  }
  
  // Convert legacy format
  return {
    ...legacyQuestion,
    audio: {
      audioText: legacyQuestion.audioText,
      audioTitle: `${legacyQuestion.title} (Text-to-Speech)`
    }
  };
};