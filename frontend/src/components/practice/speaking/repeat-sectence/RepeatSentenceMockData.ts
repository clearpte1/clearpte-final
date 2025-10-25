import { RepeatSentenceFeedback, RepeatSentenceQuestion } from "./RepeatSentenceTypes";

export const instructionsSections = [
    {
        title: 'Task Overview',
        items: ['Listen to the sentence and repeat it exactly as you heard it.'],
    },
    {
        title: 'Time Allocation',
        items: ['Audio plays automatically', 'Recording: 15 seconds'],
    },
    {
        title: 'Tips',
        items: [
            'Listen carefully to every word',
            'Repeat immediately after audio',
            'Maintain the same intonation',
            'Don\'t add or omit words',
        ],
    },
    {
        title: 'Scoring',
        items: [
            'Content: All words repeated',
            'Pronunciation: Accuracy',
            'Fluency: Natural flow',
        ],
    },
];
