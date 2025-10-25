import { HighlightSummaryQuestion, StudentProgress } from "./HighlightCorrectSummaryType";

export const mockHighlightSummaryQuestions: HighlightSummaryQuestion[] = [
  // Beginner Level
  {
    id: 1,
    title: 'Communication between Couples',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Relationships',
    tags: ['communication', 'couples', 'relationships'],
    maxScore: 100,
    type: 'question',
    speaker: 'Dr. Sarah Johnson',
    audioText: `Effective communication is the foundation of any healthy relationship. When couples struggle with communication, it often leads to misunderstandings and conflicts. The key to better communication is active listening - truly hearing what your partner is saying without immediately thinking about your response. It's also important to express your feelings using "I" statements rather than "you" statements, which can sound accusatory. For example, instead of saying "You never listen to me," try saying "I feel unheard when we discuss important topics." This approach helps prevent your partner from becoming defensive and creates a safer space for open dialogue.`,
    instructions: 'You will hear a recording. Click on the paragraph that best relates to the recording.',
    summaryOptions: [
      {
        id: 'A',
        label: 'A',
        text: 'When you feel that your partner doesn\'t care about you or respect you, you may simply write down your feelings to let him or her know. This can handle your conflicts in a peaceful way, because both parties will not feel so overwhelmed.',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'People raised by caregivers instead of their parents tend to avoid communication with their partners. In this case, their partners are encouraged to communicate with them more actively to let them feel safe and finally become willing to communicate.',
        isCorrect: false
      },
      {
        id: 'C',
        label: 'C',
        text: 'Different people have different communication styles, so you need to understand your partner\'s style. You can even write down your feelings if you have difficulties in communicating verbally. Communication also needs compromise, so make sure you are patient when seeking for the best way to communicate with her or him.',
        isCorrect: true
      },
      {
        id: 'D',
        label: 'D',
        text: 'Some people struggle with verbal communication, because they lack the confidence to communicate with others, especially with their partners. To solve this issue, they are suggested to communicate less frequently to reduce the stress caused by communication.',
        isCorrect: false
      }
    ],
    correctAnswer: 'C',
    explanation: 'Option C best captures the essence of the recording, which emphasizes understanding different communication styles, the importance of patience in communication, and finding ways to express feelings effectively - whether verbally or in writing.',
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },

  // Intermediate Level
  {
    id: 2,
    title: 'Climate Change and Ocean Ecosystems',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Environment',
    tags: ['climate', 'ocean', 'ecosystem'],
    maxScore: 150,
    type: 'question',
    speaker: 'Prof. Michael Chen',
    audioText: `Climate change is having profound effects on ocean ecosystems worldwide. Rising sea temperatures are causing coral bleaching events to occur more frequently and with greater intensity. As waters warm, coral polyps expel the colorful algae living in their tissues, leaving behind white, lifeless skeletons. This process not only affects the corals themselves but has cascading effects throughout the marine food web. Many fish species that depend on coral reefs for shelter and food are forced to migrate to cooler waters or face population decline. Additionally, ocean acidification - caused by increased absorption of atmospheric carbon dioxide - makes it difficult for shellfish and other calcifying organisms to build and maintain their protective shells. The combined impact of these changes threatens the biodiversity and productivity of marine ecosystems that millions of people depend on for food and livelihood.`,
    instructions: 'You will hear a recording about environmental issues. Select the paragraph that best summarizes the main points.',
    summaryOptions: [
      {
        id: 'A',
        label: 'A',
        text: 'Ocean pollution from plastic waste is the primary threat to marine life. Microplastics are ingested by fish and other sea creatures, causing internal damage and death. This pollution also affects human health when we consume contaminated seafood.',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'Rising sea temperatures and ocean acidification caused by climate change are severely impacting marine ecosystems. Coral bleaching events are becoming more frequent, fish populations are declining, and shellfish struggle to maintain their protective shells, threatening ocean biodiversity.',
        isCorrect: true
      },
      {
        id: 'C',
        label: 'C',
        text: 'Overfishing has led to the depletion of many fish species in the ocean. Commercial fishing operations are taking more fish than the ocean can naturally replenish, leading to ecosystem imbalance and economic losses for fishing communities.',
        isCorrect: false
      },
      {
        id: 'D',
        label: 'D',
        text: 'Coastal development and urban expansion are destroying natural habitats along shorelines. Mangrove forests and wetlands are being cleared for construction, eliminating important breeding grounds for marine species.',
        isCorrect: false
      }
    ],
    correctAnswer: 'B',
    explanation: 'Option B accurately summarizes the key points from the recording: rising sea temperatures causing coral bleaching, ocean acidification affecting shellfish, and the overall threat to marine biodiversity and food webs.',
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },

  // Advanced Level
  {
    id: 3,
    title: 'Artificial Intelligence in Healthcare',
    difficulty: 'Advanced',
    timeLimit: 1800, // 30 minutes
    category: 'Technology',
    tags: ['AI', 'healthcare', 'medical'],
    maxScore: 200,
    type: 'question',
    speaker: 'Dr. Elena Rodriguez',
    audioText: `The integration of artificial intelligence in healthcare represents a paradigm shift in medical practice, offering unprecedented opportunities for diagnosis, treatment, and patient care. Machine learning algorithms can analyze vast amounts of medical data, including imaging scans, genetic information, and patient histories, to identify patterns that might escape human observation. For instance, AI systems have demonstrated remarkable accuracy in detecting early-stage cancers in mammograms and CT scans, often outperforming experienced radiologists. However, the implementation of AI in healthcare is not without challenges. Issues of data privacy, algorithm bias, and the need for extensive validation pose significant hurdles. Moreover, there's an ongoing debate about the balance between AI automation and human judgment in critical medical decisions. While AI can process information at extraordinary speed and scale, the nuanced understanding of patient context, emotional intelligence, and ethical considerations remain uniquely human capabilities. The future of healthcare likely lies in a collaborative model where AI enhances rather than replaces human expertise, creating a more efficient and accurate medical system while preserving the essential human elements of healthcare delivery.`,
    instructions: 'Listen to this advanced discussion about technology in healthcare. Choose the paragraph that best captures the main argument.',
    summaryOptions: [
      {
        id: 'A',
        label: 'A',
        text: 'Artificial intelligence is rapidly replacing human doctors in many medical fields. AI systems can perform surgeries, diagnose diseases, and prescribe medications with perfect accuracy, making human medical professionals obsolete in most clinical settings.',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'While AI shows promise in medical data analysis and diagnostic accuracy, particularly in imaging, its healthcare implementation faces challenges including privacy concerns and algorithm bias. The optimal approach combines AI capabilities with human expertise rather than complete automation.',
        isCorrect: true
      },
      {
        id: 'C',
        label: 'C',
        text: 'The high cost of implementing AI systems in hospitals and clinics makes this technology inaccessible to most healthcare providers. Only wealthy medical institutions can afford the expensive hardware and software required for AI-assisted medical care.',
        isCorrect: false
      },
      {
        id: 'D',
        label: 'D',
        text: 'Patient resistance to AI-assisted healthcare is the primary barrier to adoption of these technologies. Most patients prefer human doctors and are unwilling to trust AI systems with their medical care, regardless of the technology\'s proven capabilities.',
        isCorrect: false
      }
    ],
    correctAnswer: 'B',
    explanation: 'Option B correctly identifies the balanced perspective presented in the recording: acknowledging AI\'s diagnostic capabilities while recognizing implementation challenges and emphasizing the need for human-AI collaboration rather than replacement.',
    isNew: false,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },

  // Additional Beginner Level
  {
    id: 4,
    title: 'Healthy Eating Habits',
    difficulty: 'Beginner',
    timeLimit: 900, // 15 minutes
    category: 'Health',
    tags: ['nutrition', 'health', 'diet'],
    maxScore: 100,
    type: 'question',
    speaker: 'Nutritionist Amy Parker',
    audioText: `Developing healthy eating habits is one of the most important things you can do for your overall wellbeing. A balanced diet should include a variety of foods from all food groups: fruits, vegetables, whole grains, lean proteins, and healthy fats. It's recommended to eat at least five servings of fruits and vegetables daily, as they provide essential vitamins, minerals, and fiber that your body needs. Whole grains like brown rice, quinoa, and oats are better choices than refined grains because they contain more nutrients and help you feel full longer. When it comes to protein, choose lean options like fish, chicken, beans, and nuts. It's also important to stay hydrated by drinking plenty of water throughout the day. Avoiding processed foods, sugary drinks, and excessive amounts of salt and sugar can help prevent many health problems including obesity, diabetes, and heart disease. Remember, small changes in your daily eating habits can make a big difference in your long-term health.`,
    instructions: 'You will hear advice about nutrition. Select the paragraph that best summarizes the key recommendations.',
    summaryOptions: [
      {
        id: 'A',
        label: 'A',
        text: 'The most important aspect of healthy eating is counting calories and restricting portion sizes. People should weigh their food and track every meal to ensure they don\'t exceed their daily caloric needs.',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'Expensive organic foods and supplements are necessary for good health. Without these premium products, it\'s impossible to get the nutrients your body needs from regular grocery store foods.',
        isCorrect: false
      },
      {
        id: 'C',
        label: 'C',
        text: 'A healthy diet includes variety from all food groups: fruits, vegetables, whole grains, lean proteins, and healthy fats. It\'s important to stay hydrated, limit processed foods and sugar, and remember that small daily changes can improve long-term health.',
        isCorrect: true
      },
      {
        id: 'D',
        label: 'D',
        text: 'Following strict dietary restrictions and eliminating entire food groups is the best way to maintain good health. Carbohydrates and fats should be completely avoided to prevent weight gain and disease.',
        isCorrect: false
      }
    ],
    correctAnswer: 'C',
    explanation: 'Option C accurately captures the main points of the recording: eating from all food groups, staying hydrated, limiting processed foods, and making gradual changes for better health.',
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },

  // Intermediate Level
  {
    id: 5,
    title: 'Remote Work Productivity',
    difficulty: 'Intermediate',
    timeLimit: 1200, // 20 minutes
    category: 'Business',
    tags: ['remote work', 'productivity', 'workplace'],
    maxScore: 150,
    type: 'question',
    speaker: 'Business Consultant Mark Williams',
    audioText: `The shift to remote work has fundamentally changed how we think about productivity and workplace efficiency. While working from home offers flexibility and eliminates commuting time, it also presents unique challenges that can impact performance. One of the biggest obstacles is the blurring of boundaries between work and personal life. Without the physical separation of an office, many remote workers find themselves working longer hours or struggling to disconnect from work-related tasks. Distractions at home, such as household chores, family members, or personal responsibilities, can significantly reduce focus and productivity. However, successful remote workers have developed strategies to overcome these challenges. Creating a dedicated workspace, establishing clear work hours, and maintaining regular communication with colleagues are essential practices. Additionally, using productivity tools and techniques like time-blocking, the Pomodoro Technique, and regular breaks can help maintain focus and prevent burnout. Companies that support remote work with proper technology, clear expectations, and regular check-ins tend to see better results from their distributed teams.`,
    instructions: 'Listen to this discussion about modern work arrangements. Choose the paragraph that best reflects the main points.',
    summaryOptions: [
      {
        id: 'A',
        label: 'A',
        text: 'Remote work always leads to decreased productivity because employees cannot be properly supervised. Companies should return to office-based work to ensure maximum efficiency and control over their workforce.',
        isCorrect: false
      },
      {
        id: 'B',
        label: 'B',
        text: 'Working from home is universally beneficial, eliminating all workplace stress and automatically increasing productivity. All companies should immediately switch to fully remote operations without any concerns.',
        isCorrect: false
      },
      {
        id: 'C',
        label: 'C',
        text: 'Remote work offers flexibility but creates challenges like blurred work-life boundaries and home distractions. Success requires strategies such as dedicated workspaces, clear schedules, productivity techniques, and company support with technology and communication.',
        isCorrect: true
      },
      {
        id: 'D',
        label: 'D',
        text: 'The main problem with remote work is the lack of advanced technology. Once companies invest in better computers and software, all productivity issues will be automatically resolved without any other changes needed.',
        isCorrect: false
      }
    ],
    correctAnswer: 'C',
    explanation: 'Option C correctly summarizes the balanced view presented: acknowledging both benefits and challenges of remote work while highlighting the strategies and support systems needed for success.',
    isNew: true,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z'
  }
];

export const mockStudentProgress: StudentProgress = {
  studentName: 'Communication between Couples',
  questionNumber: 350,
  testedCount: 12,
  totalQuestions: 1500,
  currentStreak: 7,
  averageScore: 78.5
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