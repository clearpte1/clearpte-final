import { ListeningPassage, StudentProgress } from "./FillinTheBlanksTypes";

export const mockListeningPassages: ListeningPassage[] = [
  // Beginner Level - With Audio URL
  {
    id: 1,
    title: 'Javelin Competition',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Sports',
    tags: ['javelin', 'competition', 'athletics'],
    maxScore: 100,
    type: 'question',
    speaker: 'Sports Commentator',
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      audioText: "The main event at the sports festival was the javelin competition. Athletes from all over the country came to participate. Many athletes were excited to show their skills in throwing the javelin as far as possible. They were organized into different groups to compete against each other. The biggest team, which had the most experienced members, took the lead. They won the competition with an impressive throw.",
      audioFormat: 'mp3',
      audioDuration: 24,
      audioTitle: 'Javelin Competition - Sports Report'
    },
    duration: "24",
    instructions: 'You will hear a recording. Type the missing words in each blank.',
    text: `The [BLANK_0] event at the sports festival was the javelin competition. Athletes from all over the country came to participate. Many [BLANK_1] were excited to show their skills in [BLANK_2] the javelin as far as possible. They were organized into different [BLANK_3] to compete against each other. The biggest team, which had the most experienced members, took the lead. They [BLANK_4] the competition with an impressive throw.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'main'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'athletes'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'throwing'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'groups'
      },
      {
        id: 'blank_4',
        position: 4,
        correctAnswer: 'won'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'main', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'athletes', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'throwing', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'groups', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'won', isUsed: false, correctPosition: 4 },
      { id: 'word_6', word: 'secondary', isUsed: false },
      { id: 'word_7', word: 'spectators', isUsed: false },
      { id: 'word_8', word: 'catching', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  
  // Intermediate Level - With Audio URL (Different Format)
  {
    id: 2,
    title: 'Urban Development and Transportation',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Urban Planning',
    tags: ['transportation', 'urban', 'development'],
    maxScore: 150,
    type: 'question',
    speaker: 'Dr. Elizabeth Green',
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
      audioText: "Modern cities face significant challenges in managing transportation systems as populations continue to grow. Urban planners must develop innovative solutions that balance efficiency with environmental sustainability. Public transportation networks require substantial investment to maintain and upgrade aging infrastructure. Many cities are now implementing electric buses and trains to reduce carbon emissions. The integration between different modes of transport is crucial for creating a seamless urban mobility experience.",
      audioFormat: 'mp3',
      audioDuration: 18,
      audioTitle: 'Urban Transportation Planning - Academic Lecture'
    },
    duration: "18",
    instructions: 'Listen to the recording about urban transportation and fill in the blanks.',
    text: `Modern cities face significant challenges in managing transportation systems as populations continue to grow. Urban planners must [BLANK_0] innovative solutions that balance efficiency with environmental sustainability. Public transportation networks require substantial [BLANK_1] to maintain and upgrade aging infrastructure. Many cities are now [BLANK_2] electric buses and trains to reduce carbon emissions. The [BLANK_3] between different modes of transport is crucial for creating a seamless urban mobility experience.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'develop'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'investment'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'implementing'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'integration'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'develop', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'investment', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'implementing', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'integration', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'create', isUsed: false },
      { id: 'word_6', word: 'funding', isUsed: false },
      { id: 'word_7', word: 'removing', isUsed: false },
      { id: 'word_8', word: 'separation', isUsed: false }
    ],
    isNew: true,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: true,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16"
  },

  // Advanced Level - With Audio URL (OGG Format)
  {
    id: 3,
    title: 'Climate Science and Ocean Acidification',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Environmental Science',
    tags: ['climate', 'ocean', 'acidification'],
    maxScore: 200,
    type: 'question',
    speaker: 'Prof. David Martinez',
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
      audioText: "Ocean acidification represents one of the most significant consequences of anthropogenic carbon dioxide emissions. As atmospheric CO2 concentrations increase, the ocean absorbs approximately 25% of these emissions, leading to chemical changes that lower seawater pH. This process threatens marine ecosystems, particularly affecting calcifying organisms such as corals and mollusks. The ecological implications include the potential collapse of marine food webs and significant economic impacts on fisheries and coastal communities that depend on ocean resources.",
      audioFormat: 'ogg',
      audioDuration: 22,
      audioTitle: 'Ocean Acidification - Environmental Science Lecture'
    },
    duration: "22",
    instructions: 'Complete this advanced passage about ocean acidification by listening carefully.',
    text: `Ocean acidification represents one of the most [BLANK_0] consequences of anthropogenic carbon dioxide emissions. As atmospheric CO2 concentrations increase, the ocean [BLANK_1] approximately 25% of these emissions, leading to chemical changes that lower seawater pH. This process [BLANK_2] marine ecosystems, particularly affecting calcifying organisms such as corals and mollusks. The [BLANK_3] implications include the potential collapse of marine food webs and significant economic impacts on fisheries and coastal communities that depend on ocean resources.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'significant'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'absorbs'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'threatens'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'ecological'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'significant', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'absorbs', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'threatens', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'ecological', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'minor', isUsed: false },
      { id: 'word_6', word: 'releases', isUsed: false },
      { id: 'word_7', word: 'protects', isUsed: false },
      { id: 'word_8', word: 'economic', isUsed: false }
    ],
    isNew: false,
    isMarked: true,
    pracStatus: "In Progress",
    hasExplanation: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-20"
  },

  // Additional Beginner Level - Text-to-Speech Only
  {
    id: 4,
    title: 'Daily Weather Report',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Weather',
    tags: ['weather', 'daily', 'forecast'],
    maxScore: 100,
    type: 'question',
    speaker: 'Weather Reporter',
    audio: {
      // No audioUrl - text-to-speech only
      audioText: "Today's weather forecast shows a sunny day with temperatures reaching 25 degrees Celsius. There will be some clouds in the morning, but the afternoon should be mostly clear. Tomorrow, we expect some rain in the evening, so don't forget to bring an umbrella.",
      audioTitle: 'Daily Weather Report (Text-to-Speech)'
    },
    duration: "15",
    instructions: 'Listen to the weather report and complete the blanks.',
    text: `Today's weather forecast shows a [BLANK_0] day with temperatures reaching 25 degrees Celsius. There will be [BLANK_1] clouds in the morning, but the afternoon should be mostly [BLANK_2]. Tomorrow, we expect some [BLANK_3] in the evening, so don't forget to bring an umbrella.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'sunny'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'some'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'clear'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'rain'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'sunny', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'some', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'clear', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'rain', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'cloudy', isUsed: false },
      { id: 'word_6', word: 'all', isUsed: false },
      { id: 'word_7', word: 'foggy', isUsed: false },
      { id: 'word_8', word: 'snow', isUsed: false }
    ],
    isNew: true,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22"
  },

  // Intermediate Level - WAV Format
  {
    id: 5,
    title: 'Digital Marketing Strategies',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Business',
    tags: ['marketing', 'digital', 'strategy'],
    maxScore: 150,
    type: 'question',
    speaker: 'Marketing Expert',
    audio: {
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
      audioText: "Digital marketing has revolutionized how businesses connect with their customers. Social media platforms provide unprecedented opportunities for targeted advertising and customer engagement. Companies must analyze consumer behavior data to create personalized marketing campaigns. The integration of artificial intelligence in marketing tools enables businesses to optimize their strategies in real-time.",
      audioFormat: 'wav',
      audioDuration: 20,
      audioTitle: 'Digital Marketing Revolution - Business Lecture'
    },
    duration: "20",
    instructions: 'Listen to the marketing lecture and fill in the missing words.',
    text: `Digital marketing has [BLANK_0] how businesses connect with their customers. Social media platforms provide unprecedented opportunities for targeted advertising and customer [BLANK_1]. Companies must analyze consumer behavior data to create [BLANK_2] marketing campaigns. The [BLANK_3] of artificial intelligence in marketing tools enables businesses to optimize their strategies in real-time.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'revolutionized'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'engagement'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'personalized'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'integration'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'revolutionized', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'engagement', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'personalized', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'integration', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'changed', isUsed: false },
      { id: 'word_6', word: 'interaction', isUsed: false },
      { id: 'word_7', word: 'generic', isUsed: false },
      { id: 'word_8', word: 'separation', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Done",
    hasExplanation: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18"
  },

  // Advanced Level - Mixed Audio (URL + comprehensive audioText)
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
      audioText: "Quantum computing represents a paradigm shift in computational technology, leveraging quantum mechanical phenomena to process information in fundamentally different ways. Unlike classical computers that use bits, quantum computers utilize quantum bits or qubits that can exist in multiple states simultaneously. This superposition enables quantum computers to perform certain calculations exponentially faster than classical systems. The potential applications include cryptography, drug discovery, and optimization problems that are currently intractable for conventional computers.",
      audioFormat: 'mp3',
      audioDuration: 26,
      audioTitle: 'Quantum Computing Fundamentals - Technology Lecture'
    },
    duration: "26",
    instructions: 'Listen to this advanced technology lecture and complete the missing terms.',
    text: `Quantum computing represents a [BLANK_0] shift in computational technology, leveraging quantum mechanical phenomena to process information in fundamentally different ways. Unlike classical computers that use bits, quantum computers utilize quantum bits or qubits that can exist in multiple states [BLANK_1]. This superposition enables quantum computers to perform certain calculations [BLANK_2] faster than classical systems. The potential applications include cryptography, drug discovery, and [BLANK_3] problems that are currently intractable for conventional computers.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'paradigm'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'simultaneously'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'exponentially'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'optimization'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'paradigm', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'simultaneously', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'exponentially', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'optimization', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'model', isUsed: false },
      { id: 'word_6', word: 'sequentially', isUsed: false },
      { id: 'word_7', word: 'linearly', isUsed: false },
      { id: 'word_8', word: 'simplification', isUsed: false }
    ],
    isNew: true,
    isMarked: true,
    pracStatus: "Undone",
    hasExplanation: true,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25"
  }
];

export const mockStudentProgress: StudentProgress = {
  studentName: 'Listening Fill Blanks Practice',
  questionNumber: 300,
  testedCount: 5,
  totalQuestions: 1200,
  currentStreak: 3,
  averageScore: 85.7
};

export const difficultySettings = {
  Beginner: {
    timeLimit: 900, // 15 minutes
    maxBlanks: 4,
    wordBankSize: 8,
    passingScore: 70
  },
  Intermediate: {
    timeLimit: 1200, // 20 minutes
    maxBlanks: 5,
    wordBankSize: 8,
    passingScore: 75
  },
  Advanced: {
    timeLimit: 1800, // 30 minutes
    maxBlanks: 6,
    wordBankSize: 8,
    passingScore: 80
  }
};

// Helper function for backward compatibility and migration
export const convertLegacyPassage = (passage: any): ListeningPassage => {
  if (passage.audio && typeof passage.audio === 'object') {
    return passage; // Already in new format
  }
  
  // Convert legacy format
  return {
    ...passage,
    audio: {
      audioUrl: passage.audioUrl,
      audioText: passage.audioText || 'This is a sample audio for the listening fill in the blanks exercise. Listen carefully and fill in the missing words.',
      audioTitle: passage.title || 'Listening Audio'
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
    'text',
    'blanks',
    'wordBank',
    'difficulty',
    'category',
    'tags',
    'timeLimit',
    'maxScore'
  ],
  sampleData: [
    {
      id: 1,
      title: 'Sample Passage',
      audioUrl: 'https://example.com/audio.mp3',
      audioText: 'Sample audio text for text-to-speech fallback',
      audioFormat: 'mp3',
      audioDuration: 20,
      text: 'This is a [BLANK_0] passage with [BLANK_1] blanks.',
      blanks: 'sample; missing',
      wordBank: 'sample; missing; test; example',
      difficulty: 'Intermediate',
      category: 'General',
      tags: 'sample; test; exercise',
      timeLimit: 1200,
      maxScore: 100
    }
  ]
});