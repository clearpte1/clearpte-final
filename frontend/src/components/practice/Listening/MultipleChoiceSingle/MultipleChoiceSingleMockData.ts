import { MultipleChoiceQuestion } from "./MutlipleChoiceSingleType";

export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
  {
    id: 1,
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      audioText: "The capital city of France is Paris, which is known as a major cultural and artistic hub in Europe. The city is famous for its museums, galleries, and historic landmarks that attract millions of visitors each year.",
      audioFormat: 'mp3',
      audioDuration: 15,
      audioTitle: 'Capital of France - Geography Question'
    },
    question: "What is the capital city of France?",
    options: [
      { id: "A", text: "London", isCorrect: false },
      { id: "B", text: "Paris", isCorrect: true },
      { id: "C", text: "Berlin", isCorrect: false },
      { id: "D", text: "Madrid", isCorrect: false },
    ],
    explanation: "Paris is the capital and largest city of France, located in the north-central part of the country.",
    title: "Capital of France",
    difficulty: "Beginner",
    category: "Geography",
    tags: ["geography", "Europe", "capitals"],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
      audioText: "Jupiter is the largest planet in our solar system and is known for its prominent ring system and many moons. It's a gas giant composed primarily of hydrogen and helium.",
      audioFormat: 'mp3',
      audioDuration: 18,
      audioTitle: 'Largest Planet - Astronomy Question'
    },
    question: "Which is the largest planet in our solar system?",
    options: [
      { id: "A", text: "Earth", isCorrect: false },
      { id: "B", text: "Jupiter", isCorrect: true },
      { id: "C", text: "Mars", isCorrect: false },
      { id: "D", text: "Saturn", isCorrect: false },
    ],
    explanation: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.",
    title: "Largest Planet",
    difficulty: "Beginner",
    category: "Astronomy",
    tags: ["space", "planets", "solar system"],
    isNew: true,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: true,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: 3,
    audio: {
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      audioText: "The Amazon River is the longest river in South America and one of the longest rivers in the world. It flows through several countries including Brazil, Peru, and Colombia.",
      audioFormat: 'mp3',
      audioDuration: 20,
      audioTitle: 'Amazon River - Geography Question'
    },
    question: "Which river is the longest in South America?",
    options: [
      { id: "A", text: "Nile", isCorrect: false },
      { id: "B", text: "Amazon", isCorrect: true },
      { id: "C", text: "Mississippi", isCorrect: false },
      { id: "D", text: "Yangtze", isCorrect: false },
    ],
    explanation: "The Amazon River is the longest river in South America and flows through the Amazon rainforest.",
    title: "Longest River in South America",
    difficulty: "Intermediate",
    category: "Geography",
    tags: ["rivers", "South America", "Amazon"],
    isNew: false,
    isMarked: true,
    pracStatus: "In Progress",
    hasExplanation: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-20",
  },
  {
    id: 4,
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
      audioText: "Alexander Graham Bell is credited with inventing the telephone in 1876. This invention revolutionized communication and changed the way people connect with each other across distances.",
      audioFormat: 'ogg',
      audioDuration: 22,
      audioTitle: 'Telephone Invention - History Question'
    },
    question: "Who invented the telephone?",
    options: [
      { id: "A", text: "Thomas Edison", isCorrect: false },
      { id: "B", text: "Alexander Graham Bell", isCorrect: true },
      { id: "C", text: "Nikola Tesla", isCorrect: false },
      { id: "D", text: "Guglielmo Marconi", isCorrect: false },
    ],
    explanation: "Alexander Graham Bell patented the first practical telephone in 1876, though other inventors were working on similar devices.",
    title: "Telephone Inventor",
    difficulty: "Intermediate",
    category: "History",
    tags: ["invention", "communication", "19th century"],
    isNew: false,
    isMarked: false,
    pracStatus: "Done",
    hasExplanation: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: 5,
    audio: {
      // No audioUrl - text-to-speech only
      audioText: "The lion is traditionally known as the king of the jungle, though lions actually live in grasslands and savannas rather than jungles. They are apex predators and live in social groups called prides.",
      audioTitle: 'King of Jungle - Animal Question (Text-to-Speech)'
    },
    question: "Which animal is known as the king of the jungle?",
    options: [
      { id: "A", text: "Tiger", isCorrect: false },
      { id: "B", text: "Lion", isCorrect: true },
      { id: "C", text: "Elephant", isCorrect: false },
      { id: "D", text: "Bear", isCorrect: false },
    ],
    explanation: "Lions are called the 'king of the jungle' due to their status as apex predators, though they primarily live in savannas.",
    title: "King of the Jungle",
    difficulty: "Beginner",
    category: "Animals",
    tags: ["animals", "wildlife", "predators"],
    isNew: true,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
  },
  {
    id: 6,
    audio: {
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
      audioText: "Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. This process is essential for life on Earth as it produces the oxygen we breathe.",
      audioFormat: 'wav',
      audioDuration: 25,
      audioTitle: 'Photosynthesis Process - Biology Question'
    },
    question: "What is the process by which plants make their food?",
    options: [
      { id: "A", text: "Respiration", isCorrect: false },
      { id: "B", text: "Photosynthesis", isCorrect: true },
      { id: "C", text: "Digestion", isCorrect: false },
      { id: "D", text: "Fermentation", isCorrect: false },
    ],
    explanation: "Photosynthesis is the process where plants use sunlight to convert carbon dioxide and water into glucose and oxygen.",
    title: "Plant Food Production",
    difficulty: "Advanced",
    category: "Biology",
    tags: ["biology", "plants", "photosynthesis"],
    isNew: false,
    isMarked: true,
    pracStatus: "Undone",
    hasExplanation: true,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-15",
  },
  {
    id: 7,
    audio: {
      // Mixed: audioUrl + comprehensive audioText
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      audioText: "Mount Everest is the highest mountain peak in the world, located in the Himalayas on the border between Nepal and Tibet. It stands at 8,848.86 meters above sea level and continues to attract climbers from around the world despite its dangerous conditions.",
      audioFormat: 'mp3',
      audioDuration: 28,
      audioTitle: 'Highest Mountain - Geography Question'
    },
    question: "What is the highest mountain in the world?",
    options: [
      { id: "A", text: "K2", isCorrect: false },
      { id: "B", text: "Mount Everest", isCorrect: true },
      { id: "C", text: "Kangchenjunga", isCorrect: false },
      { id: "D", text: "Lhotse", isCorrect: false },
    ],
    explanation: "Mount Everest, at 8,848.86 meters, is the highest mountain peak in the world, located in the Himalayas.",
    title: "Highest Mountain Peak",
    difficulty: "Intermediate",
    category: "Geography",
    tags: ["mountains", "Himalayas", "records"],
    isNew: false,
    isMarked: false,
    pracStatus: "In Progress",
    hasExplanation: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
];

// Helper function for backward compatibility and migration
export const convertLegacyQuestion = (question: any): MultipleChoiceQuestion => {
  if (question.audio && typeof question.audio === 'object') {
    return question; // Already in new format
  }
  
  // Convert legacy format
  return {
    ...question,
    audio: {
      audioText: question.audioText || 'This is a sample audio for the listening multiple choice single question. Listen carefully and select the correct option.',
      audioTitle: question.title || 'Listening Audio'
    }
  };
};

// Export template for Excel import/export
export const getExcelTemplate = () => ({
  headers: [
    'id',
    'audioUrl',
    'audioText', 
    'audioFormat',
    'audioDuration',
    'question',
    'optionA',
    'optionB', 
    'optionC',
    'optionD',
    'correctAnswer',
    'explanation',
    'title',
    'difficulty',
    'category',
    'tags'
  ],
  sampleData: [
    {
      id: 1,
      audioUrl: 'https://example.com/audio.mp3',
      audioText: 'Sample audio text for text-to-speech fallback',
      audioFormat: 'mp3',
      audioDuration: 15,
      question: 'Sample question?',
      optionA: 'Option A text',
      optionB: 'Option B text',
      optionC: 'Option C text', 
      optionD: 'Option D text',
      correctAnswer: 'B',
      explanation: 'Sample explanation',
      title: 'Sample Question',
      difficulty: 'Intermediate',
      category: 'General',
      tags: 'sample; test; question'
    }
  ]
});