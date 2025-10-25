import { ReadingPassage, StudentProgress } from "./ReadingFillInTheBlanksTypes";

export const mockReadingPassages: ReadingPassage[] = [
  // Existing Beginner Level
  {
    id: 1,
    title: 'Mercury and Its Uses',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Science',
    tags: ['chemistry', 'elements', 'safety'],
    maxScore: 100,
    instructions: 'Read the passage and fill in the blanks by dragging words from the word bank.',
    text: `Mercury is not found in many common products that we buy because it can be very dangerous. The most common products that contain mercury are batteries, powerful outdoor lights, disinfectants and thermometers, which are used to measure our body's temperature. It can also be found in barometers, which are used to measure air pressure and [BLANK_0] changes in weather; and thermostats, which [BLANK_1] the temperature of buildings. Mercury can also be found in printer and photocopy toners.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'predict'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'regulate'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'predict', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'regulate', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'contain', isUsed: false },
      { id: 'word_4', word: 'show', isUsed: false },
      { id: 'word_5', word: 'cover', isUsed: false },
      { id: 'word_6', word: 'constrain', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },
  
  // Existing Intermediate Level
  {
    id: 2,
    title: 'Climate Change and Ocean Currents',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Environmental Science',
    tags: ['climate', 'ocean', 'temperature'],
    maxScore: 150,
    instructions: 'Fill in the blanks with the most appropriate words from the word bank.',
    text: `Ocean currents play a crucial role in regulating Earth's climate by [BLANK_0] heat around the globe. These massive movements of water are driven by differences in temperature and salinity, creating a complex system that [BLANK_1] weather patterns across continents. When climate change [BLANK_2] ocean temperatures, it can disrupt these currents, leading to [BLANK_3] changes in regional climates that scientists are still working to understand and predict.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'distributing'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'influences'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'alters'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'dramatic'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'distributing', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'influences', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'alters', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'dramatic', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'collecting', isUsed: false },
      { id: 'word_6', word: 'affects', isUsed: false },
      { id: 'word_7', word: 'changes', isUsed: false },
      { id: 'word_8', word: 'minor', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },

  // Existing Advanced Level
  {
    id: 3,
    title: 'Quantum Computing Principles',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Technology',
    tags: ['quantum', 'computing', 'physics'],
    maxScore: 200,
    instructions: 'Complete this advanced passage about quantum computing by selecting the most precise technical terms.',
    text: `Quantum computing represents a fundamental [BLANK_0] from classical computing paradigms by leveraging quantum mechanical phenomena such as superposition and entanglement. Unlike classical bits that exist in definitive states of 0 or 1, quantum bits or qubits can exist in a [BLANK_1] of both states simultaneously. This property enables quantum computers to [BLANK_2] certain calculations exponentially faster than their classical counterparts. However, quantum systems are extremely [BLANK_3] to environmental interference, requiring sophisticated error correction mechanisms and [BLANK_4] cooling systems to maintain quantum coherence during computation processes.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'departure'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'superposition'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'execute'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'susceptible'
      },
      {
        id: 'blank_4',
        position: 4,
        correctAnswer: 'cryogenic'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'departure', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'superposition', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'execute', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'susceptible', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'cryogenic', isUsed: false, correctPosition: 4 },
      { id: 'word_6', word: 'transition', isUsed: false },
      { id: 'word_7', word: 'combination', isUsed: false },
      { id: 'word_8', word: 'perform', isUsed: false },
      { id: 'word_9', word: 'resistant', isUsed: false },
      { id: 'word_10', word: 'heating', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },

  // New Beginner Level
  {
    id: 4,
    title: 'The Water Cycle',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Science',
    tags: ['water', 'cycle', 'nature'],
    maxScore: 100,
    instructions: 'Read the passage and fill in the blanks by dragging words from the word bank.',
    text: `The water cycle is a natural process that keeps water moving around the Earth. When the sun heats the oceans, water turns into vapor through a process called [BLANK_0]. This vapor rises into the air and cools down to form clouds in a step called [BLANK_1]. Eventually, the water falls back to the ground as rain or snow, which is known as [BLANK_2].`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'evaporation'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'condensation'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'precipitation'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'evaporation', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'condensation', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'precipitation', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'freezing', isUsed: false },
      { id: 'word_5', word: 'melting', isUsed: false },
      { id: 'word_6', word: 'flowing', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },

  // New Intermediate Level
  {
    id: 5,
    title: 'The Industrial Revolution',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'History',
    tags: ['industry', 'revolution', 'technology'],
    maxScore: 150,
    instructions: 'Fill in the blanks with the most appropriate words from the word bank.',
    text: `The Industrial Revolution, which began in the late 18th century, marked a major [BLANK_0] in human history. It started in Britain and was driven by the invention of machines that could [BLANK_1] goods much faster than manual labor. The steam engine [BLANK_2] transportation and manufacturing, making factories more efficient. However, this period also led to [BLANK_3] working conditions for many laborers, prompting the rise of labor unions to [BLANK_4] better rights.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'turning point'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'produce'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'transformed'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'harsh'
      },
      {
        id: 'blank_4',
        position: 4,
        correctAnswer: 'demand'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'turning point', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'produce', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'transformed', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'harsh', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'demand', isUsed: false, correctPosition: 4 },
      { id: 'word_6', word: 'event', isUsed: false },
      { id: 'word_7', word: 'create', isUsed: false },
      { id: 'word_8', word: 'improved', isUsed: false },
      { id: 'word_9', word: 'comfortable', isUsed: false },
      { id: 'word_10', word: 'request', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  },

  // New Advanced Level
  {
    id: 6,
    title: 'Neuroplasticity and Learning',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Neuroscience',
    tags: ['brain', 'learning', 'neuroscience'],
    maxScore: 200,
    instructions: 'Complete this advanced passage about neuroplasticity by selecting the most precise terms.',
    text: `Neuroplasticity refers to the brain's ability to [BLANK_0] its structure and function in response to experience and learning. This process involves the [BLANK_1] of new neural connections and the strengthening of existing ones, particularly during early development. However, neuroplasticity persists into adulthood, enabling the brain to [BLANK_2] to injuries such as strokes by reorganizing neural pathways. Research shows that [BLANK_3] activities, such as learning a new language, can enhance cognitive [BLANK_4], demonstrating the brain's remarkable capacity for change.`,
    blanks: [
      {
        id: 'blank_0',
        position: 0,
        correctAnswer: 'adapt'
      },
      {
        id: 'blank_1',
        position: 1,
        correctAnswer: 'formation'
      },
      {
        id: 'blank_2',
        position: 2,
        correctAnswer: 'recover'
      },
      {
        id: 'blank_3',
        position: 3,
        correctAnswer: 'challenging'
      },
      {
        id: 'blank_4',
        position: 4,
        correctAnswer: 'flexibility'
      }
    ],
    wordBank: [
      { id: 'word_1', word: 'adapt', isUsed: false, correctPosition: 0 },
      { id: 'word_2', word: 'formation', isUsed: false, correctPosition: 1 },
      { id: 'word_3', word: 'recover', isUsed: false, correctPosition: 2 },
      { id: 'word_4', word: 'challenging', isUsed: false, correctPosition: 3 },
      { id: 'word_5', word: 'flexibility', isUsed: false, correctPosition: 4 },
      { id: 'word_6', word: 'change', isUsed: false },
      { id: 'word_7', word: 'creation', isUsed: false },
      { id: 'word_8', word: 'heal', isUsed: false },
      { id: 'word_9', word: 'simple', isUsed: false },
      { id: 'word_10', word: 'rigidity', isUsed: false }
    ],
    isNew: false,
    isMarked: false,
    pracStatus: "Undone",
    hasExplanation: false,
    createdAt: "",
    updatedAt: ""
  }
];

export const mockStudentProgress: StudentProgress = {
  studentName: 'Rachel Carson',
  questionNumber: 1087,
  testedCount: 33,
  totalQuestions: 2349,
  currentStreak: 5,
  averageScore: 87.3
};

export const difficultySettings = {
  Beginner: {
    timeLimit: 900, // 15 minutes
    maxBlanks: 3,
    wordBankSize: 6,
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
    maxBlanks: 7,
    wordBankSize: 10,
    passingScore: 80
  }
};