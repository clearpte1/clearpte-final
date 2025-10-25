import { SummarizeSpokenTextTopic } from "./SummarizeSpokenTextType";
import { migrateLegacyAudio, createSampleAudioConfig } from "../../../common/AudioValidationUtils";

export const summarizeSpokenTextTopics: SummarizeSpokenTextTopic[] = [
  {
    id: 1,
    title: "Self-domestication",
    taskType: 'SST',
    type: 'listening',
    audio: {
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Sample URL
      audioText: "Self-domestication is a fascinating concept in human evolution. Research suggests that early humans underwent a process similar to animal domestication, but without an external domesticator. This process led to reduced aggression, increased cooperation, and physical changes such as smaller teeth and jaws. Scientists believe this self-domestication may have been crucial in the development of language and complex societies. The evidence includes fossil records showing these physical changes and behavioral studies of modern humans compared to our closest primate relatives.",
      audioFormat: 'mp3',
      audioDuration: 75,
      audioTitle: 'Self-domestication Lecture'
    },
    wordLimit: {
      min: 50,
      max: 70
    },
    timeLimit: 10, // 10 minutes
    sampleSummary: "Self-domestication is the process by which early humans developed traits similar to domesticated animals, including reduced aggression, increased cooperation, and physical changes like smaller teeth and jaws. This evolutionary process may have contributed to the development of complex human societies and language.",
    keyPoints: [
      "Self-domestication refers to evolutionary changes in early humans",
      "Similar traits to domesticated animals emerged",
      "Reduced aggression and increased cooperation",
      "Physical changes included smaller teeth and jaws",
      "May have contributed to language development",
      "Important for complex society formation"
    ],
    transcript: "Self-domestication is a fascinating concept in human evolution. Research suggests that early humans underwent a process similar to animal domestication, but without an external domesticator. This process led to reduced aggression, increased cooperation, and physical changes such as smaller teeth and jaws. Scientists believe this self-domestication may have been crucial in the development of language and complex societies. The evidence includes fossil records showing these physical changes and behavioral studies of modern humans compared to our closest primate relatives.",
    difficulty: 'Intermediate',
    category: 'Anthropology',
    tags: ['evolution', 'anthropology', 'human development'],
    isNew: false,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: "Climate Change and Ocean Currents",
    taskType: 'SST',
    type: 'listening',
    audio: {
      audioUrl: 'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3', // Sample URL
      audioText: "Climate change is having profound effects on ocean currents around the world. The global ocean conveyor belt, which helps regulate our planet's temperature and weather patterns, is being disrupted by rising temperatures and melting ice caps. This disruption could lead to more frequent and severe weather events, including storms and droughts. Additionally, changes in ocean currents affect marine ecosystems, potentially disrupting food chains and threatening species that depend on specific water temperatures and nutrient levels.",
      audioFormat: 'mp3',
      audioDuration: 82,
      audioTitle: 'Climate Change and Ocean Systems'
    },
    wordLimit: {
      min: 50,
      max: 70
    },
    timeLimit: 10,
    sampleSummary: "Climate change is significantly affecting ocean currents worldwide, disrupting the global conveyor belt system that regulates temperature and weather patterns. These changes could lead to more extreme weather events and affect marine ecosystems and food chains globally.",
    keyPoints: [
      "Ocean currents are changing due to climate change",
      "Global conveyor belt system is being disrupted",
      "Temperature and weather patterns are affected",
      "More extreme weather events expected",
      "Marine ecosystems are at risk",
      "Global food chains could be impacted"
    ],
    transcript: "Climate change is having profound effects on ocean currents around the world. The global ocean conveyor belt, which helps regulate our planet's temperature and weather patterns, is being disrupted by rising temperatures and melting ice caps. This disruption could lead to more frequent and severe weather events, including storms and droughts. Additionally, changes in ocean currents affect marine ecosystems, potentially disrupting food chains and threatening species that depend on specific water temperatures and nutrient levels.",
    difficulty: 'Advanced',
    category: 'Environmental Science',
    tags: ['climate change', 'oceanography', 'environment'],
    isNew: true,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 3,
    title: "The Impact of Social Media on Learning",
    taskType: 'SST',
    type: 'listening',
    audio: {
      // No audioUrl - will use text-to-speech only
      audioText: "Social media's impact on learning is complex and multifaceted. On the positive side, these platforms can enhance collaboration among students and provide access to vast educational resources and expert knowledge. However, social media also presents significant challenges for learning. The constant notifications and entertainment content can be highly distracting, making it difficult for students to focus on their studies. Research suggests that frequent social media use may also contribute to shortened attention spans, potentially affecting students' ability to engage in deep, concentrated learning.",
      audioTitle: 'Social Media and Education (Text-to-Speech)'
    },
    wordLimit: {
      min: 50,
      max: 70
    },
    timeLimit: 10,
    sampleSummary: "Social media has both positive and negative effects on student learning. While it can enhance collaboration and provide access to educational resources, it also creates distractions and may reduce deep learning capabilities due to shortened attention spans.",
    keyPoints: [
      "Social media has mixed effects on learning",
      "Positive: enhances collaboration between students",
      "Positive: provides access to educational resources",
      "Negative: creates significant distractions",
      "Negative: may reduce attention spans",
      "Impact on deep learning capabilities"
    ],
    transcript: "Social media's impact on learning is complex and multifaceted. On the positive side, these platforms can enhance collaboration among students and provide access to vast educational resources and expert knowledge. However, social media also presents significant challenges for learning. The constant notifications and entertainment content can be highly distracting, making it difficult for students to focus on their studies. Research suggests that frequent social media use may also contribute to shortened attention spans, potentially affecting students' ability to engage in deep, concentrated learning.",
    difficulty: 'Intermediate',
    category: 'Education Technology',
    tags: ['social media', 'education', 'technology'],
    isNew: false,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-22'
  },
  {
    id: 4,
    title: "Artificial Intelligence in Healthcare",
    taskType: 'SST',
    type: 'listening',
    audio: {
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Sample URL
      audioText: "Artificial intelligence is revolutionizing healthcare in unprecedented ways. AI systems can now analyze medical images with greater accuracy than human radiologists in some cases, leading to earlier disease detection and better patient outcomes. Additionally, AI enables personalized medicine by analyzing patient data to create customized treatment plans. The technology is also accelerating drug discovery, reducing the time and cost of bringing new medications to market. However, implementation faces challenges including data privacy concerns, the need to train medical professionals in AI use, and ensuring these systems remain free from bias that could affect patient care.",
      audioFormat: 'mp3',
      audioDuration: 95,
      audioTitle: 'AI in Healthcare Revolution'
    },
    wordLimit: {
      min: 50,
      max: 70
    },
    timeLimit: 10,
    sampleSummary: "Artificial intelligence is revolutionizing healthcare through improved diagnostic accuracy, personalized treatment plans, and drug discovery acceleration. However, implementation challenges include data privacy concerns, training requirements for medical professionals, and ensuring AI systems remain unbiased.",
    keyPoints: [
      "AI is transforming healthcare delivery",
      "Improved diagnostic accuracy and speed",
      "Enables personalized treatment plans",
      "Accelerates drug discovery processes",
      "Data privacy and security concerns",
      "Need for medical professional training"
    ],
    transcript: "Artificial intelligence is revolutionizing healthcare in unprecedented ways. AI systems can now analyze medical images with greater accuracy than human radiologists in some cases, leading to earlier disease detection and better patient outcomes. Additionally, AI enables personalized medicine by analyzing patient data to create customized treatment plans. The technology is also accelerating drug discovery, reducing the time and cost of bringing new medications to market. However, implementation faces challenges including data privacy concerns, the need to train medical professionals in AI use, and ensuring these systems remain free from bias that could affect patient care.",
    difficulty: 'Advanced',
    category: 'Technology',
    tags: ['artificial intelligence', 'healthcare', 'medicine'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },
  {
    id: 5,
    title: "Urban Planning and Sustainable Cities",
    taskType: 'SST',
    type: 'listening',
    audio: {
      audioUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg', // Sample URL
      audioText: "Modern urban planning is increasingly focused on sustainability and creating cities that can support growing populations while minimizing environmental impact. This involves implementing green building standards, developing efficient public transportation systems to reduce car dependency, and integrating renewable energy sources throughout the urban infrastructure. Planners also prioritize creating community spaces that encourage social interaction and improve quality of life for residents. The goal is to build cities that are not only environmentally sustainable but also socially and economically viable for future generations.",
      audioFormat: 'ogg',
      audioDuration: 78,
      audioTitle: 'Sustainable Urban Development'
    },
    wordLimit: {
      min: 50,
      max: 70
    },
    timeLimit: 10,
    sampleSummary: "Modern urban planning focuses on creating sustainable cities through green building design, efficient public transportation, renewable energy integration, and community spaces that promote social interaction while reducing environmental impact.",
    keyPoints: [
      "Urban planning emphasizes sustainability",
      "Green building design principles",
      "Efficient public transportation systems",
      "Integration of renewable energy sources",
      "Community spaces for social interaction",
      "Focus on reducing environmental impact"
    ],
    transcript: "Modern urban planning is increasingly focused on sustainability and creating cities that can support growing populations while minimizing environmental impact. This involves implementing green building standards, developing efficient public transportation systems to reduce car dependency, and integrating renewable energy sources throughout the urban infrastructure. Planners also prioritize creating community spaces that encourage social interaction and improve quality of life for residents. The goal is to build cities that are not only environmentally sustainable but also socially and economically viable for future generations.",
    difficulty: 'Intermediate',
    category: 'Urban Studies',
    tags: ['urban planning', 'sustainability', 'environment'],
    isNew: false,
    isMarked: true,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-20'
  }
];

const generateMoreSSTTopics = (): SummarizeSpokenTextTopic[] => {
  const categories = ['Science', 'Technology', 'Environment', 'Education', 'Healthcare', 'Economics', 'Psychology', 'Literature'];
  const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses: ('Undone' | 'Done' | 'In Progress')[] = ['Undone', 'Done', 'In Progress'];
  
  const sampleAudioUrls = [
    'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    'https://filesamples.com/samples/audio/mp3/SampleAudio_0.4mb_mp3.mp3',
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg'
  ];
  
  const moreTopics: SummarizeSpokenTextTopic[] = [];
  
  for (let i = 6; i <= 25; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const transcript = `This is the transcript for ${category.toLowerCase()} topic ${i}. It contains detailed information about the subject matter, including key concepts, research findings, and their implications. The content is designed to test the listener's ability to identify and summarize the most important points within the given word limit.`;
    
    // 50% chance of having audio URL, otherwise text-to-speech only
    const hasAudioUrl = Math.random() > 0.5;
    const audioUrl = hasAudioUrl ? sampleAudioUrls[Math.floor(Math.random() * sampleAudioUrls.length)] : undefined;
    
    moreTopics.push({
      id: i,
      title: `${category} Research Topic ${i}`,
      taskType: 'SST',
      type: 'listening',
      audio: {
        audioUrl: audioUrl,
        audioText: transcript,
        audioFormat: audioUrl ? (audioUrl.includes('.ogg') ? 'ogg' : 'mp3') : undefined,
        audioDuration: hasAudioUrl ? Math.floor(Math.random() * 60) + 45 : undefined, // 45-105 seconds
        audioTitle: `${category} Topic ${i} - ${hasAudioUrl ? 'Audio File' : 'Text-to-Speech'}`
      },
      wordLimit: {
        min: 50,
        max: 70
      },
      timeLimit: 10,
      sampleSummary: `This is a sample summary for ${category.toLowerCase()} topic ${i}. It demonstrates the key concepts and main points that should be covered in a good summary response. The summary maintains focus on the most important information while staying within the word limit.`,
      keyPoints: [
        `Main concept about ${category.toLowerCase()}`,
        `Key research findings`,
        `Important implications`,
        `Future considerations`,
        `Related applications`,
        `Concluding insights`
      ],
      transcript,
      difficulty,
      category,
      tags: [category.toLowerCase(), 'research', 'academic'],
      isNew: Math.random() > 0.7,
      isMarked: Math.random() > 0.8,
      pracStatus: status,
      hasExplanation: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    });
  }
  
  return moreTopics;
};

export const allSummarizeSpokenTextTopics = [...summarizeSpokenTextTopics, ...generateMoreSSTTopics()];

// Export helper functions for backward compatibility and migration
export const convertLegacyTopic = (topic: any): SummarizeSpokenTextTopic => {
  if (topic.audio) {
    return topic; // Already in new format
  }
  
  // Convert legacy format
  return {
    ...topic,
    audio: migrateLegacyAudio(topic.audioText || '', topic.audioUrl),
    // Keep audioText for backward compatibility
    audioText: topic.audioText
  };
};

// Template for Excel import/export
export const getExcelTemplate = () => ({
  headers: [
    'id',
    'title', 
    'audioUrl',
    'audioText',
    'audioFormat',
    'audioDuration',
    'wordLimitMin',
    'wordLimitMax', 
    'timeLimit',
    'sampleSummary',
    'keyPoints',
    'transcript',
    'difficulty',
    'category',
    'tags'
  ],
  sampleData: [
    {
      id: 1,
      title: 'Sample Topic',
      audioUrl: 'https://example.com/audio.mp3',
      audioText: 'Sample audio text for text-to-speech fallback',
      audioFormat: 'mp3',
      audioDuration: 60,
      wordLimitMin: 50,
      wordLimitMax: 70,
      timeLimit: 10,
      sampleSummary: 'Sample summary response',
      keyPoints: 'Point 1; Point 2; Point 3',
      transcript: 'Full transcript of the audio',
      difficulty: 'Intermediate',
      category: 'Science',
      tags: 'science; research; academic'
    }
  ]
});