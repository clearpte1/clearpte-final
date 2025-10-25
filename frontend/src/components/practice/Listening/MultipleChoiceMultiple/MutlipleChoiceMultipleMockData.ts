import { ListeningMultipleChoiceQuestion } from './MultipleChoiceMultipleType';
import { createSampleAudioConfig } from '../../../common/AudioValidationUtils';

export const listeningMultipleChoiceQuestions: ListeningMultipleChoiceQuestion[] = [
  {
    id: 1,
    title: 'Weight Gain After Marriage',
    category: 'Health & Psychology',
    difficulty: 'Intermediate',
    timeLimit: 5,
    testSensitivity: 'Audio',
    type: 'question',
    speaker: 'Dr. Sarah Johnson',
    duration: "10",
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Sample audio
      audioText: 'Research suggests that married people are more likely to gain weight due to several factors. First, they have regular dining partners and probably have more meals together. Second, people\'s life becomes less stressful after marriage, which can lead to increased appetite. Third, they don\'t need to find a mate anymore and may care less about their weight. Finally, they are generally happier after marriage and tend to eat more as a result of their improved mood.',
      audioFormat: 'mp3',
      audioDuration: 78,
      audioTitle: 'Weight Gain After Marriage - Research Study'
    },
    question: 'Why are married people more likely to gain weight?',
    options: [
      {
        id: 'A',
        text: 'Because they have regular dining partners and probably have more meals.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Because people\'s life is less stressful after marriage.',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'Because they don\'t need to find a mate anymore and care less about their weight.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Because they are happier after marriage and eat more.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'Because their partners require them to eat more.',
        isCorrect: false
      }
    ],
    explanation: 'According to the audio, married people gain weight due to having regular dining partners (A), less stressful life (B), not needing to attract mates (C), and being happier (D). Option E is not mentioned in the recording.',
    tags: ['marriage', 'health', 'psychology', 'weight gain'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Climate Change Impacts on Arctic Wildlife',
    category: 'Environment & Science',
    difficulty: 'Advanced',
    timeLimit: 5,
    testSensitivity: 'Audio',
    type: 'question',
    speaker: 'Prof. Michael Chen',
    duration: "12",
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3', // Sample audio
      audioText: 'Climate change is having devastating effects on Arctic wildlife. Polar bears are struggling to find food due to melting sea ice, which reduces their hunting grounds. Seal populations are declining due to habitat loss, as they depend on ice floes for breeding and resting. Walrus populations are being forced to gather in larger groups on land, creating overcrowding and stress. However, Arctic foxes are actually struggling with warmer temperatures, not benefiting from them. Migration patterns of Arctic birds have changed significantly, not remained unchanged. The Arctic ecosystem is not adapting quickly to these rapid temperature changes.',
      audioFormat: 'mp3',
      audioDuration: 95,
      audioTitle: 'Climate Change and Arctic Wildlife Impact Study'
    },
    question: 'According to the lecture, which statements about Arctic wildlife and climate change are correct?',
    options: [
      {
        id: 'A',
        text: 'Polar bears are struggling to find food due to melting sea ice.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Arctic foxes are benefiting from warmer temperatures.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Seal populations are declining due to habitat loss.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Migration patterns of Arctic birds have remained unchanged.',
        isCorrect: false
      },
      {
        id: 'E',
        text: 'Walrus populations are forced to gather in larger groups on land.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'The Arctic ecosystem is adapting quickly to temperature changes.',
        isCorrect: false
      }
    ],
    explanation: 'The correct answers are A, C, and E. The lecture discusses how polar bears struggle with hunting due to melting ice, seal habitat loss, and walruses being forced to congregate on land in larger numbers.',
    tags: ['climate change', 'arctic', 'wildlife', 'ecology'],
    isNew: false,
    isMarked: true,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-20'
  },
  {
    id: 3,
    title: 'Online Learning Effectiveness',
    category: 'Education & Technology',
    difficulty: 'Beginner',
    timeLimit: 5,
    testSensitivity: 'Audio',
    type: 'question',
    speaker: 'Dr. Lisa Rodriguez',
    duration: "9",
    audio: {
      // No audioUrl - will use text-to-speech only
      audioText: 'Online learning has both advantages and challenges. Students can learn at their own pace with online courses, which is a significant benefit. However, technology barriers can affect learning outcomes, especially for students with limited access to reliable internet or devices. Online learning requires more self-discipline from students compared to traditional classroom settings. Interaction with instructors is often limited in online formats, which can impact the learning experience. It\'s important to note that online learning is not always less effective than classroom learning, and not all students prefer online methods to traditional approaches.',
      audioTitle: 'Online Learning Effectiveness (Text-to-Speech)'
    },
    question: 'What does the speaker say about online learning?',
    options: [
      {
        id: 'A',
        text: 'Online learning is always less effective than classroom learning.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Students can learn at their own pace with online courses.',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'Technology barriers can affect learning outcomes.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Online learning requires more self-discipline from students.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'All students prefer online learning to traditional methods.',
        isCorrect: false
      },
      {
        id: 'F',
        text: 'Interaction with instructors is limited in online formats.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are B, C, D, and F. The speaker mentions self-paced learning, technology barriers, need for self-discipline, and limited instructor interaction as key aspects of online learning.',
    tags: ['online learning', 'education', 'technology', 'self-discipline'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: 4,
    title: 'Urban Pollution Solutions',
    category: 'Urban Development',
    difficulty: 'Advanced',
    timeLimit: 5,
    testSensitivity: 'Audio',
    type: 'question',
    speaker: 'Dr. Ahmed Hassan',
    duration: "11",
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg', // Sample audio in OGG format
      audioText: 'Cities around the world are implementing various strategies to reduce urban pollution. Expanding public transportation systems is one of the most effective approaches, as it reduces the number of private vehicles on the road. Implementing stricter vehicle emission standards helps control air pollution from existing traffic. Creating more green spaces and urban forests not only improves air quality but also provides recreational areas for residents. Encouraging remote work has become increasingly popular, as it reduces commuting and associated emissions. However, increasing private parking spaces and building more highways actually worsen pollution problems rather than solving them.',
      audioFormat: 'ogg',
      audioDuration: 88,
      audioTitle: 'Urban Pollution Solutions - City Planning Strategies'
    },
    question: 'According to the discussion, which approaches to reducing urban pollution are mentioned?',
    options: [
      {
        id: 'A',
        text: 'Expanding public transportation systems.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Increasing the number of private parking spaces.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Implementing stricter vehicle emission standards.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Creating more green spaces and urban forests.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'Encouraging remote work to reduce commuting.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Building more highways to reduce traffic congestion.',
        isCorrect: false
      }
    ],
    explanation: 'The correct answers are A, C, D, and E. The speaker discusses public transportation expansion, stricter emission standards, urban green spaces, and remote work as effective pollution reduction strategies.',
    tags: ['urban planning', 'pollution', 'environment', 'transportation'],
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  },
  {
    id: 5,
    title: 'Artificial Intelligence in Medical Diagnosis',
    category: 'Technology & Medicine',
    difficulty: 'Intermediate',
    timeLimit: 5,
    testSensitivity: 'Audio',
    type: 'question',
    speaker: 'Dr. Jennifer Park',
    duration: "10",
    audio: {
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Sample audio
      audioText: 'Artificial intelligence is transforming medical diagnosis in remarkable ways. AI systems can analyze medical images faster than human radiologists in many cases, improving efficiency in healthcare settings. Machine learning algorithms require large amounts of medical data to train effectively and provide accurate results. While AI shows tremendous promise, human oversight is still necessary for AI medical systems to ensure patient safety and accuracy. AI can help identify patterns in medical data that humans might miss, leading to earlier detection of diseases. However, it\'s important to note that AI will not completely replace human doctors, and AI diagnosis is not always 100% accurate.',
      audioFormat: 'wav',
      audioDuration: 82,
      audioTitle: 'AI in Medical Diagnosis - Healthcare Technology'
    },
    question: 'What does the speaker say about AI in medical diagnosis?',
    options: [
      {
        id: 'A',
        text: 'AI will completely replace human doctors in the future.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'AI can analyze medical images faster than human radiologists.',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'Machine learning algorithms require large amounts of medical data.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'AI diagnosis is always 100% accurate.',
        isCorrect: false
      },
      {
        id: 'E',
        text: 'Human oversight is still necessary for AI medical systems.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'AI can help identify patterns humans might miss.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are B, C, E, and F. The speaker discusses AI\'s speed in image analysis, need for large datasets, importance of human oversight, and ability to identify missed patterns.',
    tags: ['artificial intelligence', 'medical diagnosis', 'radiology', 'machine learning'],
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Renewable Energy Investment Trends',
    category: 'Economics & Environment',
    difficulty: 'Beginner',
    timeLimit: 5,
    testSensitivity: 'Audio',
    type: 'question',
    speaker: 'Prof. Robert Kim',
    duration: "8",
    audio: {
      // Mixed audio support - has both audioUrl and comprehensive audioText
      // audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav', // Sample audio
      audioText: 'Global investment in renewable energy has been increasing significantly over the past decade. Solar energy projects currently receive the most funding among all renewable sources due to decreasing costs and improving efficiency. Private investors are increasingly interested in clean energy opportunities, seeing them as both profitable and sustainable investments. Wind energy projects are becoming more cost-effective, particularly offshore wind installations. Battery storage technology is attracting significant investment as it addresses the intermittency issues of renewable sources. Government subsidies continue to play a crucial role in investment decisions, contrary to what some might think. The trend shows no signs of slowing down as countries commit to carbon neutrality goals.',
      // audioFormat: 'wav',
      audioDuration: 65,
      audioTitle: 'Renewable Energy Investment Trends - Economic Analysis'
    },
    question: 'What trends in renewable energy investment does the speaker mention?',
    options: [
      {
        id: 'A',
        text: 'Investment in renewable energy has been declining globally.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Solar energy projects receive the most funding.',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'Government subsidies have no impact on investment decisions.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Private investors are increasingly interested in clean energy.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'Wind energy projects are becoming more cost-effective.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Battery storage technology is attracting significant investment.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are B, D, E, and F. The speaker discusses high solar funding, growing private investor interest, cost-effective wind projects, and significant battery storage investments.',
    tags: ['renewable energy', 'investment', 'economics', 'clean energy'],
    isNew: true,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22'
  }
];

// Generate additional questions with mixed audio configurations
const generateAdditionalQuestions = (): ListeningMultipleChoiceQuestion[] => {
  const categories = ['Science', 'Technology', 'Business', 'Health', 'Education'];
  const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses: ('Undone' | 'Done' | 'In Progress')[] = ['Undone', 'Done', 'In Progress'];
  
  const sampleAudioUrls = [
    'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg'
  ];
  
  const additionalQuestions: ListeningMultipleChoiceQuestion[] = [];
  
  for (let i = 7; i <= 15; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // 70% chance of having audio URL, 30% text-to-speech only
    const hasAudioUrl = Math.random() > 0.3;
    const audioUrl = hasAudioUrl ? sampleAudioUrls[Math.floor(Math.random() * sampleAudioUrls.length)] : undefined;
    
    const audioText = `This is a comprehensive ${category.toLowerCase()} lecture about topic ${i}. The content includes detailed information about the subject matter, research findings, and practical applications. Listen carefully to identify the correct statements from the multiple choice options provided. This audio demonstrates the dual audio support system with both file-based audio and text-to-speech capabilities.`;
    
    additionalQuestions.push({
      id: i,
      title: `${category} Research Topic ${i}`,
      category: `${category} & Research`,
      difficulty,
      timeLimit: 5,
      testSensitivity: 'Audio',
      type: 'question',
      speaker: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][Math.floor(Math.random() * 5)]}`,
      duration: hasAudioUrl ? `${Math.floor(Math.random() * 5) + 8}` : undefined,
      audio: createSampleAudioConfig(audioText, hasAudioUrl),
      question: `According to the ${category.toLowerCase()} lecture, which statements are correct?`,
      options: [
        { id: 'A', text: `${category} research shows significant progress in recent years.`, isCorrect: true },
        { id: 'B', text: `Traditional methods are always more effective than modern approaches.`, isCorrect: false },
        { id: 'C', text: `Technology integration has improved research outcomes.`, isCorrect: true },
        { id: 'D', text: `International collaboration is becoming less important.`, isCorrect: false },
        { id: 'E', text: `Future developments in this field look promising.`, isCorrect: true },
        { id: 'F', text: `Current research methodologies are fundamentally flawed.`, isCorrect: false }
      ],
      explanation: `The correct answers are A, C, and E. The lecture emphasizes progress in ${category.toLowerCase()}, technology integration benefits, and promising future developments.`,
      tags: [category.toLowerCase(), 'research', 'technology', 'progress'],
      isNew: Math.random() > 0.7,
      isMarked: Math.random() > 0.8,
      pracStatus: status,
      hasExplanation: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    });
  }
  
  return additionalQuestions;
};

export const allListeningMultipleChoiceQuestions = [...listeningMultipleChoiceQuestions, ...generateAdditionalQuestions()];

// Export helper function for backward compatibility and migration
export const convertLegacyQuestion = (question: any): ListeningMultipleChoiceQuestion => {
  if (question.audio) {
    return question; // Already in new format
  }
  
  // Convert legacy format - migrate old audioUrl/audioText to new audio object
  return {
    ...question,
    audio: {
      audioUrl: question.audioUrl,
      audioText: question.audioText || 'This is a sample audio for the listening multiple choice question. Listen carefully and select all correct options.',
      audioFormat: question.audioUrl ? (question.audioUrl.includes('.ogg') ? 'ogg' : question.audioUrl.includes('.wav') ? 'wav' : 'mp3') : undefined,
      audioTitle: question.title || 'Listening Audio'
    }
  };
};