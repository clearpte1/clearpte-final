export const PTE_SKILLS = [
  { name: "Speaking", icon: "🎤", color: "bg-blue-500" },
  { name: "Writing", icon: "✍️", color: "bg-green-500" },
  { name: "Reading", icon: "📖", color: "bg-purple-500" },
  { name: "Listening", icon: "👂", color: "bg-orange-500" },
];

export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner", color: "text-green-600" },
  { value: "intermediate", label: "Intermediate", color: "text-yellow-600" },
  { value: "advanced", label: "Advanced", color: "text-red-600" },
];

export const MOCK_PRACTICE_TESTS = [
  {
    id: "1",
    title: "Reading Comprehension - Academic Texts",
    type: "reading" as const,
    duration: 30,
    questions: 15,
    difficulty: "intermediate" as const,
    description:
      "Practice reading academic passages and answer comprehension questions",
    completedBy: 1250,
    averageScore: 78,
  },
  {
    id: "2",
    title: "Speaking - Describe Image",
    type: "speaking" as const,
    duration: 20,
    questions: 10,
    difficulty: "advanced" as const,
    description: "Practice describing images and charts with proper vocabulary",
    completedBy: 890,
    averageScore: 72,
  },
  {
    id: "3",
    title: "Writing - Essay Writing",
    type: "writing" as const,
    duration: 45,
    questions: 2,
    difficulty: "intermediate" as const,
    description: "Practice writing argumentative and descriptive essays",
    completedBy: 2100,
    averageScore: 82,
  },
  {
    id: "4",
    title: "Listening - Academic Lectures",
    type: "listening" as const,
    duration: 25,
    questions: 12,
    difficulty: "advanced" as const,
    description: "Listen to academic lectures and answer related questions",
    completedBy: 1680,
    averageScore: 75,
  },
];

export const MOCK_STUDY_MATERIALS = [
  {
    id: "1",
    title: "PTE Speaking Strategies",
    type: "video" as const,
    category: "speaking" as const,
    duration: 15,
    difficulty: "beginner" as const,
    url: "#",
    description: "Learn effective speaking strategies for PTE Academic",
    thumbnail:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    title: "Academic Writing Guide",
    type: "pdf" as const,
    category: "writing" as const,
    difficulty: "intermediate" as const,
    url: "#",
    description: "Comprehensive guide to academic writing for PTE",
    thumbnail:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=300&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Reading Comprehension Tips",
    type: "article" as const,
    category: "reading" as const,
    difficulty: "beginner" as const,
    url: "#",
    description: "Essential tips for improving reading comprehension",
    thumbnail:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
  },
];

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/", icon: "🏠" },
  {
    name: "PTE Practice",
    href: "/practice-tests",
    icon: "📝",
    hasDropdown: true,
  },
  { name: "Study Materials", href: "/study-materials", icon: "📚" },
  { name: "AI Practice", href: "/ai-practice", icon: "🤖" },
  { name: "Progress", href: "/progress", icon: "📊" },
  { name: "Dashboard", href: "/dashboard", icon: "📈" },
];

export const PTE_PRACTICE_MENU = {
  speaking: {
    title: "Speaking",
    items: [
      {
        name: "Read Aloud",
        href: "/practice/speaking/read-aloud",
        hasAI: true,
      },
      {
        name: "Repeat Sentence",
        href: "/practice/speaking/repeat-sentence",
        hasAI: true,
      },
      {
        name: "Describe Image",
        href: "/practice/speaking/describe-image",
        hasAI: true,
      },
      {
        name: "Answer Short Question",
        href: "/practice/speaking/answer-short-question",
        hasAI: true,
      },
      {
        name: "Respond to a situation",
        href: "/practice/speaking/respond-situation",
        hasAI: true,
      },
      {
        name: "Re-tell Lecture (PTA)",
        href: "/practice/speaking/retell-lecture",
        isPTA: true,
      },
    ],
  },
  writing: {
    title: "Writing",
    items: [
      {
        name: "Summarize Written Text",
        href: "/practice/writing/summarize-text",
        hasAI: true,
      },
      {
        name: "Write Email",
        href: "/practice/writing/write-email",
        hasAI: true,
      },
      {
        name: "Summarize Written Text (PTA)",
        href: "/practice/writing/summarize-text-pta",
        isPTA: true,
      },
      {
        name: "Write Essay (PTA)",
        href: "/practice/writing/write-essay",
        isPTA: true,
      },
    ],
  },
  reading: {
    title: "Reading",
    items: [
      {
        name: "Reading & Writing: Fill in the blanks",
        href: "/practice/reading/fill-blanks-rw",
      },
      {
        name: "Multiple Choice (Multiple)",
        href: "/practice/reading/multiple-choice-multiple",
      },
      {
        name: "Re-order Paragraphs",
        href: "/practice/reading/reorder-paragraphs",
      },
      {
        name: "Reading: Fill in the blanks",
        href: "/practice/reading/fill-blanks",
      },
      {
        name: "Multiple Choice (Single)",
        href: "/practice/reading/multiple-choice-single",
      },
    ],
  },
  listening: {
    title: "Listening",
    items: [
      {
        name: "Summarize Spoken Text",
        href: "/practice/listening/summarize-spoken",
        hasAI: true,
      },
      {
        name: "Multiple Choice (Multiple)",
        href: "/practice/listening/multiple-choice-multiple",
      },
      { name: "Fill in the Blanks", href: "/practice/listening/fill-blanks" },
      {
        name: "Multiple Choice (Single)",
        href: "/practice/listening/multiple-choice-single",
      },
      {
        name: "Select Missing Word",
        href: "/practice/listening/select-missing-word",
      },
      {
        name: "Highlight Incorrect Words",
        href: "/practice/listening/highlight-incorrect",
      },
      {
        name: "Write From Dictation",
        href: "/practice/listening/write-dictation",
      },
      {
        name: "Summarize Spoken Text (PTA)",
        href: "/practice/listening/summarize-spoken-pta",
        isPTA: true,
      },
      {
        name: "Highlight Correct Summary (PTA)",
        href: "/practice/listening/highlight-summary-pta",
        isPTA: true,
      },
    ],
  },
  // more: {
  //   title: 'More',
  //   items: [
  //     { name: 'Vocab Books', href: '/vocab-books', icon: '📚' },
  //     { name: 'Shadowing', href: '/shadowing', icon: '🎭' },
  //     { name: 'AI Score Report Analysis', href: '/ai-analysis', icon: '📊' },
  //     { name: 'AI Study Plan', href: '/ai-study-plan', icon: '🎯' },
  //     { name: 'Mock Tests', href: '/mock-tests', icon: '📝' },
  //     { name: 'Study Materials Download', href: '/downloads', icon: '⬇️' }
  //   ]
  // }
};
