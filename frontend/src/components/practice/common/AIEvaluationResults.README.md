# AIEvaluationResults Component

## 📋 Overview

`AIEvaluationResults` is a **premium AI-powered evaluation display** component that presents detailed performance analysis with:
- Circular overall score visualization
- Individual metric scores (Pronunciation, Fluency, Content)
- Interactive audio playback with waveform
- Detailed feedback and improvement suggestions

## ✨ Design Features

### Visual Design
- **Two-column responsive layout** that adapts to mobile and desktop
- **Circular progress indicator** with gradient animation for overall score
- **Color-coded metrics** based on performance level
- **Interactive audio waveform** visualization
- **Premium gradients** (cyan to blue: #06b6d4 → #3b82f6)
- **Smooth animations** and transitions throughout
- **Dark theme** optimized (#000000, #0a0a0a backgrounds)

### Layout Structure

1. **Left Section - Scores & Audio**
   - AI Evaluation header with robot emoji 🤖
   - Circular score display (animated SVG)
   - Three metric bars: Pronunciation, Fluency, Content
   - Audio player with waveform visualization
   - Speed control and volume indicators

2. **Right Section - Feedback**
   - Feedback list with bullet points
   - Areas for Improvement section (highlighted in amber)
   - Syntax highlighting for specific words/phrases

## 📦 Installation

Import the component:

```typescript
import AIEvaluationResults from './components/practice/common/AIEvaluationResults';
```

## 🚀 Basic Usage

```typescript
import React, { useState } from 'react';
import AIEvaluationResults from './components/practice/common/AIEvaluationResults';

const MyComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);

  return (
    <AIEvaluationResults
      // Scores
      overallScore={90}
      pronunciationScore={90}
      fluencyScore={88}
      contentScore={92}

      // Feedback
      feedbackItems={[
        'Your response was well-articulated with clear pronunciation.',
        'Good pacing and natural flow throughout the answer.',
      ]}
      improvementAreas={[
        "Work on pronouncing 'environmental' more clearly.",
        'Try to reduce filler words like "um" and "uh".',
      ]}

      // Audio
      isAudioPlaying={isPlaying}
      onPlayAudio={() => setIsPlaying(!isPlaying)}
      playbackSpeed={speed}
      onSpeedChange={(newSpeed) => setSpeed(newSpeed)}
    />
  );
};
```

## 📖 Props Documentation

### Score Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `overallScore` | `number` | Yes | Overall score (0-100) displayed in circular indicator |
| `pronunciationScore` | `number` | Yes | Pronunciation score (0-100) |
| `fluencyScore` | `number` | Yes | Fluency score (0-100) |
| `contentScore` | `number` | Yes | Content score (0-100) |

### Feedback Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `feedbackItems` | `string[]` | Yes | Array of positive feedback messages |
| `improvementAreas` | `string[]` | Yes | Array of areas needing improvement |

### Audio Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `audioUrl` | `string` | No | URL to audio file |
| `audioWaveform` | `number[]` | No | Array of amplitudes (0-1) for waveform bars |
| `onPlayAudio` | `() => void` | No | Handler for play/pause button |
| `isAudioPlaying` | `boolean` | No | Audio playing state (default: false) |
| `playbackSpeed` | `number` | No | Current playback speed (default: 1.0) |
| `onSpeedChange` | `(speed: number) => void` | No | Handler for speed changes |

## 🎨 Color Scheme

### Score Color Coding

The component automatically color-codes metrics based on score:

```typescript
const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10b981';  // Green - Excellent
  if (score >= 60) return '#3b82f6';  // Blue - Good
  return '#f59e0b';                    // Amber - Needs Improvement
};
```

### Primary Colors

```typescript
const colors = {
  // Backgrounds
  mainBg: '#000000',
  cardBg: '#0a0a0a',

  // Gradients
  scoreGradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',

  // Score Colors
  excellent: '#10b981',    // Green (≥80)
  good: '#3b82f6',         // Blue (60-79)
  needsWork: '#f59e0b',    // Amber (<60)

  // Text
  primary: '#FFFFFF',
  secondary: '#9ca3af',
  muted: '#d1d5db',

  // Improvement Section
  improvementBg: 'rgba(245, 158, 11, 0.1)',
  improvementBorder: 'rgba(245, 158, 11, 0.3)',
  improvementText: '#f59e0b',
};
```

## 📊 Score Visualization

### Circular Progress Indicator

The circular score uses an animated SVG with:
- Radius: 80px
- Stroke width: 12px
- Gradient stroke color (cyan → blue)
- Smooth 1s animation on render
- Score displayed in center (56px font)

```typescript
const circumference = 2 * Math.PI * 80;
const offset = circumference - (score / 100) * circumference;
```

### Linear Progress Bars

Three horizontal bars for individual metrics:
- Height: 6px
- Border radius: 3px
- Dynamic color based on score
- Score displayed above (40px font)

## 🎵 Audio Waveform

### Waveform Data Format

```typescript
audioWaveform: number[]  // Array of amplitudes (0-1)

// Example
audioWaveform={[
  0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4,
  0.5, 0.7, 0.6, 0.4, 0.3, 0.5, 0.7, 0.6
]}
```

### Waveform Styling

- Each bar width: 3px
- Gap between bars: 4px (0.5 spacing)
- Height: 40px maximum
- Colors:
  - Playing: `#3b82f6` (blue)
  - Not playing: `#4b5563` (gray)
- Border radius: 2px
- Smooth transitions: 0.3s

## 💡 Feedback Formatting

### Basic Feedback

Simple bullet points with green dots:

```typescript
feedbackItems={[
  'Clear pronunciation throughout the response.',
  'Good vocabulary range and appropriate word choice.',
]}
```

### Improvement Areas with Highlighting

Use single quotes to highlight words:

```typescript
improvementAreas={[
  "Work on pronouncing 'environmental' more clearly.",
  "Practice the 'th' sound in words like 'think'.",
]}
```

Words in single quotes will be highlighted in green (`#10b981`).

## 📱 Responsive Design

### Breakpoints

```typescript
// Two-column layout on desktop (lg+)
flexDirection: { xs: 'column', lg: 'row' }

// Single column on mobile/tablet
// Stacks vertically with scores on top, feedback below
```

### Layout Adaptation

- **Desktop (lg+)**: Side-by-side columns (50/50)
- **Tablet (md)**: Side-by-side with adjusted padding
- **Mobile (xs-sm)**: Stacked vertically, full width

## 🔧 Advanced Usage

### With State Management

```typescript
const [evaluation, setEvaluation] = useState({
  scores: {
    overall: 0,
    pronunciation: 0,
    fluency: 0,
    content: 0,
  },
  feedback: [],
  improvements: [],
});

const [audioState, setAudioState] = useState({
  isPlaying: false,
  currentTime: 0,
  speed: 1.0,
});

// Fetch evaluation from API
useEffect(() => {
  async function fetchEvaluation() {
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      body: JSON.stringify({ recordingId: '...' }),
    });
    const data = await response.json();
    setEvaluation(data);
  }
  fetchEvaluation();
}, []);

return (
  <AIEvaluationResults
    overallScore={evaluation.scores.overall}
    pronunciationScore={evaluation.scores.pronunciation}
    fluencyScore={evaluation.scores.fluency}
    contentScore={evaluation.scores.content}
    feedbackItems={evaluation.feedback}
    improvementAreas={evaluation.improvements}
    isAudioPlaying={audioState.isPlaying}
    onPlayAudio={() => setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
    playbackSpeed={audioState.speed}
    onSpeedChange={(speed) => setAudioState(prev => ({ ...prev, speed }))}
  />
);
```

### Integration with ModernPracticeLayout

```typescript
import ModernPracticeLayout from './ModernPracticeLayout';
import AIEvaluationResults from './AIEvaluationResults';

// Show AI evaluation after submission
const [showAIResults, setShowAIResults] = useState(false);

const handleSubmit = async () => {
  const evaluation = await evaluateRecording();
  setShowAIResults(true);
};

// Render AI evaluation in a modal or separate section
{showAIResults && (
  <Box sx={{ mt: 4 }}>
    <AIEvaluationResults {...evaluationData} />
  </Box>
)}
```

## 🎯 Use Cases

### Speaking Tests
- Answer Short Questions (ASQ)
- Repeat Sentence (RS)
- Read Aloud (RA)
- Describe Image (DI)

### Writing Tests
- Summarize Written Text
- Essay evaluation

### Pronunciation Practice
- Word pronunciation drills
- Sentence practice

## 🔊 Audio Playback Integration

### Using HTML5 Audio

```typescript
const audioRef = useRef<HTMLAudioElement>(null);
const [isPlaying, setIsPlaying] = useState(false);
const [speed, setSpeed] = useState(1.0);

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.playbackRate = speed;
  }
}, [speed]);

const handlePlayPause = () => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
};

return (
  <>
    <audio ref={audioRef} src={audioUrl} />
    <AIEvaluationResults
      onPlayAudio={handlePlayPause}
      isAudioPlaying={isPlaying}
      playbackSpeed={speed}
      onSpeedChange={setSpeed}
      // ... other props
    />
  </>
);
```

## 🎨 Customization

### Custom Score Thresholds

```typescript
// Override the default color-coding logic
const getCustomScoreColor = (score: number): string => {
  if (score >= 90) return '#10b981';  // Excellent
  if (score >= 75) return '#3b82f6';  // Very Good
  if (score >= 60) return '#f59e0b';  // Good
  return '#ef4444';                    // Needs Work
};
```

### Custom Waveform

Generate waveform from audio analysis:

```typescript
const generateWaveform = (audioBuffer: AudioBuffer): number[] => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 30; // Number of bars
  const blockSize = Math.floor(rawData.length / samples);
  const waveform = [];

  for (let i = 0; i < samples; i++) {
    const start = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(rawData[start + j]);
    }
    waveform.push(sum / blockSize);
  }

  return waveform;
};
```

## 📝 Best Practices

1. **Feedback Quality**
   - Keep feedback items concise (1-2 sentences)
   - Focus on specific, actionable points
   - Balance positive feedback with improvements

2. **Score Calibration**
   - Use consistent scoring criteria
   - Calibrate AI model for fair evaluation
   - Provide context for scores

3. **Audio Quality**
   - Use high-quality audio recordings
   - Ensure waveform data is normalized (0-1)
   - Provide appropriate playback speeds

4. **Performance**
   - Lazy load audio files
   - Cache evaluation results
   - Optimize waveform data size

## 🐛 Troubleshooting

### Audio Not Playing

```typescript
// Ensure audio is loaded
<audio ref={audioRef} src={audioUrl} preload="auto" />

// Check browser autoplay policy
const playAudio = async () => {
  try {
    await audioRef.current?.play();
    setIsPlaying(true);
  } catch (error) {
    console.error('Autoplay prevented:', error);
  }
};
```

### Waveform Not Displaying

```typescript
// Ensure waveform data is valid
const validWaveform = audioWaveform.filter(amp => amp >= 0 && amp <= 1);

// Provide default if empty
audioWaveform={waveform.length > 0 ? waveform : [0.3, 0.6, 0.4, 0.7]}
```

### Score Animation Not Working

The circular progress uses CSS transitions. Ensure the score changes trigger a re-render:

```typescript
const [score, setScore] = useState(0);

// Animate score from 0 to final value
useEffect(() => {
  const timer = setTimeout(() => {
    setScore(finalScore);
  }, 100);
  return () => clearTimeout(timer);
}, [finalScore]);
```

## 📚 Related Components

- **ModernPracticeLayout** - Main practice interface
- **UnifiedPracticeLayout** - Generic practice layout
- **SpellingTest** - Spelling evaluation component

## 🤝 API Integration

### Expected API Response Format

```typescript
interface EvaluationResponse {
  overallScore: number;
  metrics: {
    pronunciation: number;
    fluency: number;
    content: number;
  };
  feedback: {
    positive: string[];
    improvements: string[];
  };
  audio: {
    url: string;
    waveform: number[];
    duration: number;
  };
}
```

### Example API Call

```typescript
const evaluateRecording = async (recordingBlob: Blob) => {
  const formData = new FormData();
  formData.append('audio', recordingBlob);

  const response = await fetch('/api/evaluate', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
};
```

---

**Created**: 2024
**Last Updated**: 2024
**Component Location**: `frontend/src/components/practice/common/AIEvaluationResults.tsx`
