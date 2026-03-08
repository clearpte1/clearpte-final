# ModernPracticeLayout Component

## 📋 Overview

`ModernPracticeLayout` is a **premium, pixel-perfect** practice interface component created to match the exact design shown in the provided screenshot. It features a centered, dark-themed UI with sophisticated gradients, smooth transitions, and professional-grade styling.

## ✨ Premium Design Features

### Visual Design
- **Pure black background** (`#000000`) for maximum contrast and modern aesthetic
- **Centered layout** with Container component (xl breakpoint) for optimal viewing
- **Sophisticated card-based layout** with premium shadows and borders
- **Gradient backgrounds** for buttons and badges with depth and dimension
- **Smooth transitions** using cubic-bezier timing functions for premium feel
- **Hover effects** with transform animations and enhanced shadows
- **Color-coded elements** with gradients:
  - Green gradients for primary actions (Play, Start Recording)
  - Blue gradients for Submit button
  - Amber/Orange gradients for Show Answer button
  - Gradient badges for difficulty levels with shadows
  - Amber accent for time display with pulsing animation

### Layout Structure
1. **Centered Container** (xl breakpoint)
   - Content centered on page for optimal viewing
   - Responsive padding and spacing
   - Maximum width for comfortable reading

2. **Premium Header Section**
   - Gradient text on title for depth
   - Icon badge with subtle border and shadow
   - Boxed instructions with dark background
   - Pulsing animation on time indicator when running
   - Gradient difficulty badges with shadows
   - Responsive layout that stacks on mobile

3. **Two-Column Premium Content Area**
   - **Left: Audio Question Card**
     - Enhanced shadows with hover effects
     - Gradient borders that glow on interaction
     - Nested dark sections for depth
     - Time display with indicator dot
     - Premium audio slider with gradient track
     - Large gradient play button (72x72px) with shadow
     - Interactive speed control with hover lift
     - Voice information in boxed section

   - **Right: Record Your Answer Card**
     - Matching shadow and border styling
     - Large gradient recording button with dynamic colors
     - Boxed recording status for clarity
     - Gradient action buttons with hover animations
     - Submit button with blue gradient
     - Show Answer button with amber gradient
     - **Simple Results Display** (shown after submit):
       - Color-coded status badge with emojis
       - Large score display (e.g., "8/10")
       - Percentage calculation
       - Custom feedback message
       - Try Again button with green gradient
       - Auto-switches between recording interface and results
     - **AI Evaluation Display** (advanced, when useAIEvaluation is true):
       - Replaces entire right column with AI Evaluation UI
       - Circular animated score indicator
       - Three metric bars (Pronunciation, Fluency, Content)
       - Interactive audio waveform player
       - Detailed feedback and improvement areas
       - Color-coded metrics based on performance

4. **Bottom Navigation**
   - Centered button group (max 900px width)
   - Responsive: stack on mobile, row on desktop
   - Subtle borders with hover glow effects
   - Transform animations on hover
   - Disabled states with reduced opacity

## 📦 Installation

The component is already exported from the common folder:

```typescript
import { ModernPracticeLayout } from './components/practice/common';
// or
import ModernPracticeLayout from './components/practice/common/ModernPracticeLayout';
```

## 🚀 Basic Usage

```typescript
import React, { useState } from 'react';
import { ModernPracticeLayout } from './components/practice/common';

const MyPracticeComponent = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  return (
    <ModernPracticeLayout
      // Header props
      icon="ASQ"
      title="Speaking: Answer Short Question"
      progress="1/3 questions attempted"
      instructions="You will hear a question. Please give a simple and short answer."
      time="9:59"
      timeRunning={true}
      difficulty="Hard"
      questionInfo="Question 1 of 82."

      // Audio props
      audioTime="00:00"
      audioTotal="0:10"
      audioCurrentTime={audioCurrentTime}
      audioDuration={10}
      isAudioPlaying={isAudioPlaying}
      playbackSpeed={1.0}
      volume={70}
      onAudioPlayPause={() => setIsAudioPlaying(!isAudioPlaying)}
      onAudioSeek={(value) => setAudioCurrentTime(value)}
      onSpeedChange={(speed) => console.log('Speed:', speed)}
      onVolumeChange={(vol) => console.log('Volume:', vol)}
      audioVoiceInfo="Microsoft David · English (en-US)"

      // Recording props
      recordingButtonText={isRecording ? 'Stop Recording' : 'Start Recording'}
      recordingStatus="0 of 1 recording completed"
      isRecording={isRecording}
      onStartRecording={() => setIsRecording(!isRecording)}
      onSubmit={() => console.log('Submit')}
      onShowAnswer={() => console.log('Show Answer')}
      submitDisabled={!hasRecorded}

      // Navigation props
      onPrevious={() => console.log('Previous')}
      onRedo={() => console.log('Redo')}
      onNext={() => console.log('Next')}
    />
  );
};
```

## 📖 Props Documentation

### Header Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | `string` | Yes | Icon/badge text (e.g., "ASQ", "RA") |
| `title` | `string` | Yes | Main title (e.g., "Speaking: Answer Short Question") |
| `progress` | `string` | Yes | Progress text (e.g., "1/3 questions attempted") |
| `instructions` | `string` | Yes | Instruction text displayed below progress |
| `time` | `string` | Yes | Time display (e.g., "9:59") |
| `timeRunning` | `boolean` | No | Shows green dot indicator when true |
| `difficulty` | `'Beginner' \| 'Intermediate' \| 'Hard'` | Yes | Difficulty level |
| `questionInfo` | `string` | Yes | Question information (e.g., "Question 1 of 82.") |

### Audio Section Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `audioTime` | `string` | Yes | Current time formatted (e.g., "00:00") |
| `audioTotal` | `string` | Yes | Total duration formatted (e.g., "0:10") |
| `audioCurrentTime` | `number` | Yes | Current time in seconds |
| `audioDuration` | `number` | Yes | Total duration in seconds |
| `isAudioPlaying` | `boolean` | Yes | Audio playing state |
| `playbackSpeed` | `number` | Yes | Playback speed (0.5, 0.75, 1.0, 1.25, 1.5, 2.0) |
| `volume` | `number` | Yes | Volume level (0-100) |
| `onAudioPlayPause` | `() => void` | Yes | Play/pause handler |
| `onAudioSeek` | `(value: number) => void` | Yes | Seek handler |
| `onSpeedChange` | `(value: number) => void` | Yes | Speed change handler |
| `onVolumeChange` | `(value: number) => void` | Yes | Volume change handler |
| `audioVoiceInfo` | `string` | Yes | Voice information text |

### Recording Section Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `recordingButtonText` | `string` | Yes | Recording button text |
| `recordingStatus` | `string` | Yes | Recording status text |
| `isRecording` | `boolean` | Yes | Recording state |
| `onStartRecording` | `() => void` | Yes | Start/stop recording handler |
| `onSubmit` | `() => void` | Yes | Submit button handler |
| `onShowAnswer` | `() => void` | Yes | Show answer button handler |
| `submitDisabled` | `boolean` | No | Disables submit button when true |

### Results Section Props (Shown After Submit)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `showResults` | `boolean` | No | When true, displays results instead of recording interface |
| `resultScore` | `number` | No | Score achieved (default: 0) |
| `resultTotal` | `number` | No | Total possible score (default: 10) |
| `resultFeedback` | `string` | No | Feedback message to display |
| `resultStatus` | `'excellent' \| 'good' \| 'needsImprovement'` | No | Result status for color coding (default: 'good') |
| `onTryAgain` | `() => void` | No | Handler for "Try Again" button |

### AI Evaluation Props (Advanced Results Display)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `useAIEvaluation` | `boolean` | No | When true with showResults, displays AI Evaluation UI |
| `aiOverallScore` | `number` | No | Overall AI score (0-100, default: 90) |
| `aiPronunciationScore` | `number` | No | Pronunciation score (0-100, default: 90) |
| `aiFluencyScore` | `number` | No | Fluency score (0-100, default: 90) |
| `aiContentScore` | `number` | No | Content score (0-100, default: 90) |
| `aiFeedbackItems` | `string[]` | No | Array of positive feedback messages |
| `aiImprovementAreas` | `string[]` | No | Array of improvement suggestions |
| `aiAudioUrl` | `string` | No | URL to recorded audio file |
| `aiAudioWaveform` | `number[]` | No | Waveform data (0-1 amplitudes) |
| `aiAudioPlaying` | `boolean` | No | AI audio playing state |
| `aiPlaybackSpeed` | `number` | No | AI audio playback speed |
| `onAIPlayAudio` | `() => void` | No | AI audio play/pause handler |
| `onAISpeedChange` | `(speed: number) => void` | No | AI audio speed change handler |

### Navigation Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPrevious` | `() => void` | Yes | Previous button handler |
| `onRedo` | `() => void` | Yes | Re-do button handler |
| `onNext` | `() => void` | Yes | Next button handler |
| `previousDisabled` | `boolean` | No | Disables previous button when true |
| `nextDisabled` | `boolean` | No | Disables next button when true |

## 🎨 Premium Color Palette

The component uses sophisticated gradient colors and premium styling:

```typescript
const colors = {
  // Backgrounds
  background: '#000000',        // Pure black background
  cardBg: '#0a0a0a',           // Card background (darker)
  innerCardBg: '#000000',      // Inner sections
  borderLight: 'rgba(255,255,255,0.08)',  // Subtle borders
  text: '#FFFFFF',             // Primary text
  textSecondary: '#9ca3af',    // Secondary text (improved gray)
  textMuted: '#d1d5db',        // Muted text for instructions

  // Premium Gradients
  greenGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',  // Play, Record
  blueGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',   // Submit
  amberGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',  // Show Answer
  redGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',    // Stop Recording

  // Difficulty Gradients with Shadows
  beginner: {
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    shadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
  },
  intermediate: {
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    shadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
  },
  hard: {
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    shadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
  },

  // Premium Shadows
  cardShadow: '0 8px 32px rgba(0,0,0,0.6)',
  buttonShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
  insetShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
};
```

### Animation Details
- **Pulsing time indicator**: 2s cubic-bezier animation
- **Hover transforms**: translateY(-2px) with enhanced shadows
- **Active states**: translateY(0) for button press feedback
- **Smooth transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## 🎯 Results Display Features

### Simple Results Display

After a user submits their answer, you can display a simple results card with their score and feedback:

```typescript
import React, { useState } from 'react';
import { ModernPracticeLayout } from './components/practice/common';

const MyPracticeComponent = () => {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = async () => {
    // Process the recording and get results
    const result = await evaluateAnswer();

    setScore(result.score);
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setScore(0);
    // Reset recording state
  };

  return (
    <ModernPracticeLayout
      // ... other props

      // Results props
      showResults={showResults}
      resultScore={score}
      resultTotal={10}
      resultFeedback="Great pronunciation! Keep practicing fluency."
      resultStatus={score >= 8 ? 'excellent' : score >= 6 ? 'good' : 'needsImprovement'}
      onTryAgain={handleTryAgain}

      onSubmit={handleSubmit}
      // ... other handlers
    />
  );
};
```

### Result Status Colors

The results card uses color-coded gradients based on the `resultStatus`:

- **excellent**: 🎉 Green gradient (`#10b981` → `#059669`)
  - Use for scores ≥80%
  - Shows "Excellent!" badge

- **good**: 👍 Blue gradient (`#3b82f6` → `#2563eb`)
  - Use for scores 60-79%
  - Shows "Good Job!" badge

- **needsImprovement**: 💡 Amber gradient (`#f59e0b` → `#d97706`)
  - Use for scores <60%
  - Shows "Keep Practicing!" badge

### AI Evaluation Display

For advanced AI-powered evaluation with detailed feedback, use the AI Evaluation feature:

```typescript
import React, { useState } from 'react';
import { ModernPracticeLayout } from './components/practice/common';

const MyAIPracticeComponent = () => {
  const [showResults, setShowResults] = useState(false);
  const [aiAudioPlaying, setAIAudioPlaying] = useState(false);
  const [aiSpeed, setAISpeed] = useState(1.0);

  const handleSubmit = async () => {
    // Process the recording with AI
    const aiResult = await evaluateWithAI();

    // Show AI evaluation results
    setShowResults(true);
  };

  return (
    <ModernPracticeLayout
      // ... other props

      // Enable AI Evaluation
      showResults={showResults}
      useAIEvaluation={true}

      // AI Scores
      aiOverallScore={90}
      aiPronunciationScore={90}
      aiFluencyScore={88}
      aiContentScore={92}

      // AI Feedback
      aiFeedbackItems={[
        'Your response was well-articulated with clear pronunciation.',
        'Good pacing and natural flow throughout the answer.',
      ]}
      aiImprovementAreas={[
        "You missed mentioning 'environmental' in your transcription.",
      ]}

      // AI Audio
      aiAudioWaveform={[0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4]}
      aiAudioPlaying={aiAudioPlaying}
      aiPlaybackSpeed={aiSpeed}
      onAIPlayAudio={() => setAIAudioPlaying(!aiAudioPlaying)}
      onAISpeedChange={(speed) => setAISpeed(speed)}

      onSubmit={handleSubmit}
      // ... other handlers
    />
  );
};
```

The AI Evaluation display includes:
- **Circular overall score** with animated gradient
- **Three metric bars**: Pronunciation, Fluency, Content
- **Interactive audio player** with waveform visualization
- **Detailed feedback** section with bullet points
- **Areas for improvement** highlighted in amber
- **Speed control** for audio playback (0.5× - 2.0×)

## 🔄 State Management Example

```typescript
const [state, setState] = useState({
  // Audio state
  isAudioPlaying: false,
  audioCurrentTime: 0,
  audioDuration: 10,
  playbackSpeed: 1.0,
  volume: 70,

  // Recording state
  isRecording: false,
  recordedBlob: null,
  recordingCount: 0,

  // Results state
  showResults: false,
  score: 0,

  // Question state
  currentQuestion: 0,
  completedQuestions: 0,
  totalQuestions: 82,
});

// Audio handlers
const handleAudioPlayPause = () => {
  setState(prev => ({ ...prev, isAudioPlaying: !prev.isAudioPlaying }));
};

const handleAudioSeek = (value: number) => {
  setState(prev => ({ ...prev, audioCurrentTime: value }));
};

// Recording handlers
const handleStartRecording = async () => {
  if (!state.isRecording) {
    // Start recording logic
    setState(prev => ({ ...prev, isRecording: true }));
  } else {
    // Stop recording logic
    setState(prev => ({
      ...prev,
      isRecording: false,
      recordingCount: prev.recordingCount + 1,
    }));
  }
};

// Navigation handlers
const handleNext = () => {
  if (state.currentQuestion < state.totalQuestions - 1) {
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      // Reset recording state
      isRecording: false,
      recordedBlob: null,
    }));
  }
};
```

## 📱 Responsive Design

The component is fully responsive with premium breakpoints:

- **Desktop (lg+)**: Two columns side by side, centered in xl container
- **Tablet (md-lg)**: Two columns with adjusted spacing
- **Mobile (xs-sm)**: Single column, stacked layout, full-width buttons

```typescript
// Container centering
<Container maxWidth="xl" disableGutters>

// Responsive two-column layout
sx={{
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  gap: 4,
}}

// Responsive button layout
<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
```

## 💎 Premium Enhancements

### Visual Polish
1. **Gradient Backgrounds**: All buttons use linear gradients (135deg) for depth
2. **Layered Shadows**: Multiple shadow levels create depth hierarchy
3. **Smooth Transitions**: cubic-bezier(0.4, 0, 0.2, 1) for natural motion
4. **Hover Transforms**: -2px translateY with enhanced shadows
5. **Border Glow**: Borders lighten on hover for interactive feedback
6. **Inset Shadows**: Inner sections use inset shadows for depth
7. **Pulsing Animation**: Time indicator pulses when timer is running
8. **Gradient Text**: Title uses gradient with clip for premium look

### Interaction Details
- **Button Press Feedback**: Active state returns to translateY(0)
- **Hover Scale**: Play button scales to 1.05 on hover
- **Speed Toggle**: Click to cycle through speeds with visual feedback
- **Disabled States**: Reduced opacity (0.4) with no hover effects
- **Recording State**: Dynamic gradient changes (green ↔ red)

### Typography
- **Font Weights**: 800 for titles, 700 for buttons, 600 for labels
- **Letter Spacing**: -0.5px for large text, 0.5px for buttons
- **Font Sizes**: Responsive scaling (xs: 24px, md: 30px for headers)
- **Tabular Numbers**: Used for time displays for consistent width

## 🎯 Use Cases

### With AI Evaluation (Recommended)
```typescript
<ModernPracticeLayout
  icon="ASQ"
  title="Speaking: Answer Short Question"
  difficulty="Hard"

  // Enable AI Evaluation
  showResults={true}
  useAIEvaluation={true}
  aiOverallScore={90}
  aiPronunciationScore={90}
  aiFluencyScore={88}
  aiContentScore={92}
  aiFeedbackItems={['Great pronunciation!', 'Natural flow.']}
  aiImprovementAreas={['Work on word stress.']}
  // ... other AI props
/>
```

### Answer Short Questions (ASQ)
```typescript
<ModernPracticeLayout
  icon="ASQ"
  title="Speaking: Answer Short Question"
  difficulty="Hard"
  // ... other props
/>
```

### Repeat Sentence (RS)
```typescript
<ModernPracticeLayout
  icon="RS"
  title="Speaking: Repeat Sentence"
  difficulty="Intermediate"
  // ... other props
/>
```

### Read Aloud (RA)
```typescript
<ModernPracticeLayout
  icon="RA"
  title="Speaking: Read Aloud"
  difficulty="Beginner"
  // ... other props
/>
```

## 🔧 Customization

### Custom Recording Button Colors

The recording button automatically changes color based on state:
- **Not Recording**: Green (`#4caf50`)
- **Recording**: Red (`#f44336`)

### Speed Control

The speed control cycles through predefined speeds:
- 0.5×, 0.75×, 1.0×, 1.25×, 1.5×, 2.0×

Click the speed badge to cycle through speeds.

### Disabled States

Buttons can be disabled:
```typescript
submitDisabled={!hasRecorded}
previousDisabled={currentQuestion === 0}
nextDisabled={currentQuestion === totalQuestions - 1}
```

## 🆚 Comparison with UnifiedPracticeLayout

| Feature | ModernPracticeLayout | UnifiedPracticeLayout |
|---------|---------------------|----------------------|
| Design | Screenshot-based, modern | Generic, flexible |
| Background | Pure black (#000000) | Gradient |
| Header | Fixed design with badges | Customizable |
| Audio Player | Custom built-in | Component prop |
| Recording UI | Custom built-in | Component prop |
| Flexibility | Fixed structure | Highly flexible |
| Use Case | Exact screenshot match | General purpose |

## 📄 Files

- `ModernPracticeLayout.tsx` - Main component
- `ModernPracticeLayout.example.tsx` - Example implementation
- `ModernPracticeLayout.README.md` - This documentation

## 🐛 Troubleshooting

### Button Click Not Working
Ensure handlers are properly defined:
```typescript
onSubmit={() => handleSubmit()}  // ✅ Correct
onSubmit={handleSubmit()}        // ❌ Wrong (calls immediately)
```

### Audio Progress Not Updating
Make sure to update state in the parent component:
```typescript
const [audioCurrentTime, setAudioCurrentTime] = useState(0);

useEffect(() => {
  if (isPlaying) {
    const interval = setInterval(() => {
      setAudioCurrentTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }
}, [isPlaying]);
```

### Styling Issues
The component uses `sx` props extensively. Make sure your theme supports Material-UI's `sx` prop system.

## 📚 Related Components

- `UnifiedPracticeLayout` - Generic practice layout
- `AudioQuestionContent` - Audio player helper
- `RecordingAnswerContent` - Recording interface helper

## 🤝 Contributing

When modifying this component:
1. Maintain the exact color scheme to match the screenshot
2. Keep the pure black background (`#000000`)
3. Test on mobile, tablet, and desktop
4. Ensure all interactive elements have hover states
5. Update this README with any changes

---

**Created**: 2024
**Last Updated**: 2024
**Component Location**: `frontend/src/components/practice/common/ModernPracticeLayout.tsx`
