import { MultipleChoiceQuestion } from './mutlipleChoiceSingleType';

export const multipleChoiceQuestions: MultipleChoiceQuestion[] = [
  // Science - Biology
  {
    id: 1,
    title: "Cell Structure and Function",
    questionText: "Which organelle is primarily responsible for producing ATP (energy) in eukaryotic cells?",
    options: [
      "Nucleus",
      "Mitochondria", 
      "Endoplasmic Reticulum",
      "Ribosome"
    ],
    correctAnswer: 1,
    explanation: "Mitochondria are known as the powerhouses of the cell because they produce most of the cell's ATP through cellular respiration.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Biology',
    tags: ['cell biology', 'organelles', 'ATP'],
    timeLimit: 30,
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: "Photosynthesis Process",
    questionText: "In photosynthesis, what is the primary function of chlorophyll?",
    options: [
      "To absorb light energy",
      "To produce glucose directly",
      "To release oxygen",
      "To store water"
    ],
    correctAnswer: 0,
    explanation: "Chlorophyll is the green pigment that absorbs light energy, particularly red and blue wavelengths, which is essential for photosynthesis.",
    difficulty: 'Intermediate',
    type: 'question',
    questionType: 'MCQ',
    category: 'Biology',
    tags: ['photosynthesis', 'chlorophyll', 'plants'],
    timeLimit: 45,
    isNew: false,
    isMarked: true,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20'
  },
  // Science - Chemistry
  {
    id: 3,
    title: "Atomic Structure",
    questionText: "What determines the chemical properties of an element?",
    options: [
      "Number of neutrons",
      "Number of protons",
      "Number of electrons in the outermost shell",
      "Atomic mass"
    ],
    correctAnswer: 2,
    explanation: "The number of electrons in the outermost shell (valence electrons) determines how an element will react chemically with other elements.",
    difficulty: 'Intermediate',
    type: 'question',
    questionType: 'MCQ',
    category: 'Chemistry',
    tags: ['atomic structure', 'electrons', 'chemical properties'],
    timeLimit: 40,
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: 4,
    title: "Chemical Bonding",
    questionText: "What type of bond is formed when electrons are shared between atoms?",
    options: [
      "Ionic bond",
      "Covalent bond",
      "Metallic bond",
      "Hydrogen bond"
    ],
    correctAnswer: 1,
    explanation: "Covalent bonds form when atoms share electrons to achieve a stable electron configuration.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Chemistry',
    tags: ['chemical bonding', 'covalent bonds', 'electrons'],
    timeLimit: 35,
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  },
  // Science - Physics
  {
    id: 5,
    title: "Laws of Motion",
    questionText: "According to Newton's First Law of Motion, an object at rest will remain at rest unless acted upon by:",
    options: [
      "Gravity",
      "An unbalanced force",
      "Friction",
      "Momentum"
    ],
    correctAnswer: 1,
    explanation: "Newton's First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Physics',
    tags: ['Newton\'s laws', 'motion', 'force'],
    timeLimit: 30,
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12'
  },
  // Mathematics
  {
    id: 6,
    title: "Algebra Basics",
    questionText: "If 3x + 5 = 17, what is the value of x?",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    correctAnswer: 1,
    explanation: "To solve: 3x + 5 = 17, subtract 5 from both sides: 3x = 12, then divide by 3: x = 4.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Mathematics',
    tags: ['algebra', 'equations', 'solving'],
    timeLimit: 40,
    isNew: true,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22'
  },
  {
    id: 7,
    title: "Geometry - Circles",
    questionText: "What is the formula for the area of a circle?",
    options: [
      "πr",
      "2πr",
      "πr²",
      "2πr²"
    ],
    correctAnswer: 2,
    explanation: "The area of a circle is calculated using the formula A = πr², where r is the radius of the circle.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Mathematics',
    tags: ['geometry', 'circles', 'area'],
    timeLimit: 35,
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10'
  },
  // History
  {
    id: 8,
    title: "World War II",
    questionText: "In which year did World War II officially end?",
    options: [
      "1944",
      "1945",
      "1946",
      "1947"
    ],
    correctAnswer: 1,
    explanation: "World War II officially ended in 1945 with the surrender of Japan in September, following the atomic bombings and Soviet invasion.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'History',
    tags: ['world war ii', 'dates', 'global history'],
    timeLimit: 30,
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: 9,
    title: "Ancient Civilizations",
    questionText: "Which ancient civilization built the pyramids of Giza?",
    options: [
      "Mesopotamians",
      "Greeks",
      "Egyptians",
      "Romans"
    ],
    correctAnswer: 2,
    explanation: "The pyramids of Giza were built by the ancient Egyptians during the Old Kingdom period, around 2580-2510 BCE.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'History',
    tags: ['ancient civilizations', 'egypt', 'pyramids'],
    timeLimit: 35,
    isNew: true,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  // Literature
  {
    id: 10,
    title: "Shakespeare's Works",
    questionText: "Who wrote the famous play 'Romeo and Juliet'?",
    options: [
      "Christopher Marlowe",
      "William Shakespeare",
      "Ben Jonson",
      "John Webster"
    ],
    correctAnswer: 1,
    explanation: "Romeo and Juliet is one of William Shakespeare's most famous tragedies, written in the early part of his career.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Literature',
    tags: ['shakespeare', 'plays', 'tragedy'],
    timeLimit: 30,
    isNew: false,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  }
];

// Add more questions to reach 100+ - continuing the pattern...
const additionalQuestions: MultipleChoiceQuestion[] = [
  // More Biology Questions
  {
    id: 11,
    title: "DNA Structure",
    questionText: "What are the four bases found in DNA?",
    options: [
      "A, T, G, C",
      "A, U, G, C", 
      "A, T, G, U",
      "T, G, C, U"
    ],
    correctAnswer: 0,
    explanation: "DNA contains four bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). RNA contains Uracil (U) instead of Thymine.",
    difficulty: 'Intermediate',
    type: 'question',
    questionType: 'MCQ',
    category: 'Biology',
    tags: ['DNA', 'genetics', 'bases'],
    timeLimit: 40,
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: 12,
    title: "Ecosystem Dynamics",
    questionText: "What is the primary source of energy for most ecosystems?",
    options: [
      "Wind",
      "Sunlight",
      "Water",
      "Soil nutrients"
    ],
    correctAnswer: 1,
    explanation: "Sunlight is the primary source of energy for most ecosystems, captured by producers through photosynthesis.",
    difficulty: 'Beginner',
    type: 'question',
    questionType: 'MCQ',
    category: 'Biology',
    tags: ['ecology', 'energy flow', 'ecosystems'],
    timeLimit: 35,
    isNew: false,
    isMarked: true,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-14',
    updatedAt: '2024-01-21'
  }
];

// Merge all questions
export const allQuestions = [...multipleChoiceQuestions, ...additionalQuestions];

// Continue adding more questions to reach 100+... 
// I'll create a function to generate more questions programmatically
const generateMoreQuestions = (): MultipleChoiceQuestion[] => {
  const categories = ['Biology', 'Chemistry', 'Physics', 'Mathematics', 'History', 'Literature', 'Geography', 'Economics'];
  const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses: ('Undone' | 'Done' | 'In Progress')[] = ['Undone', 'Done', 'In Progress'];
  
  const questionTemplates = [
    {
      title: "Advanced Concepts",
      questionText: "Which of the following best describes the concept discussed?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: "This is a detailed explanation of the correct answer and why other options are incorrect."
    }
  ];

  const moreQuestions: MultipleChoiceQuestion[] = [];
  
  for (let i = 13; i <= 120; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    moreQuestions.push({
      id: i,
      title: `${category} Question ${i}`,
      questionText: `This is a ${difficulty.toLowerCase()} level question about ${category.toLowerCase()}. What is the correct answer?`,
      options: [
        `${category} Option A`,
        `${category} Option B`,
        `${category} Option C`, 
        `${category} Option D`
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This is the explanation for ${category} question ${i}. The correct answer demonstrates understanding of ${difficulty.toLowerCase()} concepts in ${category.toLowerCase()}.`,
      difficulty,
      type: 'question',
      questionType: 'MCQ',
      category,
      tags: [category.toLowerCase(), 'test', 'practice'],
      timeLimit: 30 + Math.floor(Math.random() * 30),
      isNew: Math.random() > 0.7,
      isMarked: Math.random() > 0.8,
      pracStatus: status,
      hasExplanation: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    });
  }
  
  return moreQuestions;
};

export const allMultipleChoiceQuestions = [...allQuestions, ...generateMoreQuestions()];