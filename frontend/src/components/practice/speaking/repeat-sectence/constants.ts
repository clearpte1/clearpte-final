// export interface RepeatSentenceQuestion {
//   id: number;
//   audio: string;
//   difficulty: 'Easy' | 'Medium' | 'Hard';
// }

// export interface Feedback {
//   overallScore: number;
//   pronunciation: number;
//   fluency: number;
//   content: number;
//   wordsRepeated: number;
//   totalWords: number;
//   feedback: string[];
//   improvements: string[];
// }

// export const REPEAT_SENTENCE_QUESTIONS: RepeatSentenceQuestion[] = [
//   {
//     id: 1,
//     audio: 'The university library will be closed for renovation during the summer break.',
//     difficulty: 'Easy',
//   },
//   {
//     id: 2,
//     audio:
//       'Researchers have discovered that regular exercise significantly improves cognitive function and memory retention.',
//     difficulty: 'Medium',
//   },
//   {
//     id: 3,
//     audio:
//       'The implementation of sustainable agricultural practices requires collaboration between farmers, scientists, and policymakers.',
//     difficulty: 'Hard',
//   },
// ];

// export const MOCK_FEEDBACK: Feedback = {
//   overallScore: 82,
//   pronunciation: 85,
//   fluency: 80,
//   content: 90,
//   wordsRepeated: 12,
//   totalWords: 14,
//   feedback: [
//     'Excellent pronunciation of complex words',
//     'Good sentence stress and intonation',
//     'Minor pause before "significantly"',
//     'Clear articulation throughout',
//   ],
//   improvements: [
//     'Try to repeat the sentence without any hesitation',
//     'Focus on maintaining consistent volume',
//     'Practice linking words smoothly',
//   ],
// };

// Constants for timing
export const RECORDING_DURATION_MS = 15000; // 15 seconds
export const AUDIO_DURATION_MS = 3000; // 3 seconds