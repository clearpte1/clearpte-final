# Unified Practice Layout Component - Usage Guide

## Overview
The `UnifiedPracticeLayout` component is a highly reusable component designed to create consistent practice interfaces across all PTE practice types (Speaking, Listening, Reading, Writing).

## Features
- **Two-column or single-column layout**
- **Dark theme consistent** with the application design
- **Fully responsive** (mobile, tablet, desktop)
- **Flexible content areas** for different practice types
- **Integrated components**: Timer, Question Header, Navigation, Action Buttons
- **Customizable** through props

## Props Interface

```typescript
interface UnifiedPracticeLayoutProps {
  // Header section
  icon: string;
  title: string;
  subtitle?: string;
  instructions: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  instructionsConfig?: {
    sections: InstructionSection[];
    size?: 'small' | 'medium' | 'large';
    color?: 'default' | 'primary' | 'secondary';
    tooltipTitle?: string;
  };

  // Question header
  questionNumber: number;
  studentName: string;
  testedCount: number;

  // Timer (optional)
  showTimer?: boolean;
  timerProps?: {
    timeRemaining: number;
    isRunning: boolean;
    warningThreshold: number;
    autoSubmit: boolean;
    showStartMessage?: boolean;
    startMessage?: string;
  };

  // Layout configuration
  layoutMode?: 'two-column' | 'single-column';

  // Left section (Audio Question / Content)
  leftSection: {
    title: string;
    content: ReactNode;
    showAudioInfo?: boolean;
    audioInfo?: {
      time: string;
      voice?: string;
    };
  };

  // Right section (Response Area)
  rightSection: {
    title: string;
    content: ReactNode;
    subtitle?: string;
  };

  // Action buttons
  actionButtonsProps?: {
    recordedBlob?: Blob | null;
    hasResponse?: boolean;
    onSubmit: () => void;
    onRedo: () => void;
    onTranslate: () => void;
    onShowAnswer: () => void;
    handleViewAttempts?: () => void;
  };

  // Navigation
  navigationProps: {
    onSearch: () => void;
    onPrevious: () => void;
    onNext: () => void;
    questionNumber: number;
  };

  // Additional content (optional)
  additionalContent?: ReactNode;

  // Stage goal banner
  showStageGoalBanner?: boolean;

  // Loading state
  loading?: boolean;
  loadingMessage?: string;
}
```

## Usage Examples

### 1. Speaking: Answer Short Questions (Two-Column Layout)

```tsx
import UnifiedPracticeLayout from '../common/UnifiedPracticeLayout';
import TextToSpeech from '../common/TextToSpeech';
import RecordingSection from '../common/RecordingSection';

const AnswerShortQuestionsWithLayout = () => {
  // ... your state and handlers

  return (
    <UnifiedPracticeLayout
      icon="ASQ"
      title="Answer Short Questions"
      subtitle={`Progress: ${completedQuestions}/${totalQuestions} questions`}
      instructions="Listen to the question and provide a concise answer."
      difficulty={selectedQuestion.difficulty}
      instructionsConfig={{
        sections: instructionsSections,
        tooltipTitle: 'View detailed instructions',
      }}

      questionNumber={questionNumber}
      studentName="Rachel Carson"
      testedCount={33}

      showTimer={preparationTime !== null}
      timerProps={{
        timeRemaining: timer.timeRemaining,
        isRunning: timer.isRunning,
        warningThreshold: 1,
        autoSubmit: false,
      }}

      layoutMode="two-column"

      leftSection={{
        title: "Audio Question",
        showAudioInfo: true,
        audioInfo: {
          time: formatTime(currentTime),
          voice: "Blake (US)",
        },
        content: (
          <Box>
            <TextToSpeech
              text={selectedQuestion.audioText}
              autoPlay={false}
              onStart={() => console.log('Audio started')}
              onEnd={handleAudioEnd}
            />
            <Box sx={{ mt: 2, p: 2, bgcolor: '#2a2a2a', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Transcript: {selectedQuestion.audioText}
              </Typography>
            </Box>
          </Box>
        ),
      }}

      rightSection={{
        title: "Record Your Answer",
        subtitle: "Click 'Start Recording' when ready",
        content: (
          <RecordingSection
            isRecording={isRecording}
            recordedBlob={recordedBlob}
            recordedAudioUrl={recordedAudioUrl}
            micPermission={micPermission}
            showRecordingPrompt={showRecordingPrompt}
            preparationTime={preparationTime}
            recordingType="answer"
            recordingTime={10}
            onToggleRecording={toggleRecording}
          />
        ),
      }}

      actionButtonsProps={{
        recordedBlob: recordedBlob,
        onSubmit: handleSubmit,
        onRedo: handleRedo,
        onTranslate: () => setShowTranslate(true),
        onShowAnswer: () => setShowAnswer(true),
        handleViewAttempts: () => setShowAttempts(true),
      }}

      navigationProps={{
        onSearch: handleSearch,
        onPrevious: handlePrevious,
        onNext: handleNext,
        questionNumber: questionNumber,
      }}

      additionalContent={
        <Box>
          {/* Score display or other additional content */}
        </Box>
      }
    />
  );
};
```

### 2. Listening: Summarize Spoken Text (Two-Column Layout)

```tsx
import UnifiedPracticeLayout from '../common/UnifiedPracticeLayout';
import { DualAudioPlayer } from '../../common';

const SummarizeSpokenTextWithLayout = () => {
  // ... your state and handlers

  return (
    <UnifiedPracticeLayout
      icon="SST"
      title="Summarize Spoken Text"
      subtitle={`Progress: ${attempts.length}/${topics.length} completed`}
      instructions="Listen to the audio and write a summary in 50-70 words."
      difficulty={selectedTopic.difficulty}

      questionNumber={currentQuestionIndex + 1}
      studentName="Rachel Carson"
      testedCount={33}

      showTimer={true}
      timerProps={{
        timeRemaining: timer.timeRemaining,
        isRunning: timer.isRunning,
        warningThreshold: 60,
        autoSubmit: true,
      }}

      layoutMode="two-column"

      leftSection={{
        title: "Audio Lecture",
        showAudioInfo: true,
        audioInfo: {
          time: formatTime(currentTime),
          voice: "Female (US)",
        },
        content: (
          <DualAudioPlayer
            audio={selectedTopic.audio}
            onError={setAudioError}
          />
        ),
      }}

      rightSection={{
        title: "Write Your Summary",
        subtitle: `Word count: ${wordCount}/70 (Min: 50)`,
        content: (
          <TextField
            fullWidth
            multiline
            rows={10}
            value={summaryText}
            onChange={handleTextChange}
            placeholder="Type your summary here..."
            disabled={isSubmitted}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#2a2a2a',
                color: '#FFFFFF',
              },
            }}
          />
        ),
      }}

      actionButtonsProps={{
        hasResponse: summaryText.trim().length > 0,
        onSubmit: handleSubmit,
        onRedo: handleRedo,
        onTranslate: () => setShowTranslate(true),
        onShowAnswer: () => setShowAnswer(true),
      }}

      navigationProps={{
        onSearch: handleSearch,
        onPrevious: handlePrevious,
        onNext: handleNext,
        questionNumber: currentQuestionIndex + 1,
      }}
    />
  );
};
```

### 3. Reading: Multiple Choice (Single-Column Layout)

```tsx
import UnifiedPracticeLayout from '../common/UnifiedPracticeLayout';
import ContentDisplay from '../../common/ContentDisplay';

const ReadingMultipleChoiceWithLayout = () => {
  // ... your state and handlers

  return (
    <UnifiedPracticeLayout
      icon="RMC"
      title="Reading: Multiple Choice"
      subtitle="Select the correct answer"
      instructions="Read the text and select the best answer."
      difficulty={selectedQuestion.difficulty}

      questionNumber={currentQuestionIndex + 1}
      studentName="Rachel Carson"
      testedCount={33}

      showTimer={true}
      timerProps={{
        timeRemaining: timer.timeRemaining,
        isRunning: timer.isRunning,
        warningThreshold: 30,
        autoSubmit: false,
      }}

      layoutMode="single-column"

      leftSection={{
        title: "Reading Passage",
        content: (
          <ContentDisplay
            content={selectedQuestion.passage}
            category={selectedQuestion.category}
            difficulty={selectedQuestion.difficulty}
            tags={selectedQuestion.tags}
          />
        ),
      }}

      rightSection={{
        title: "Select Your Answer",
        content: (
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          >
            {selectedQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<Radio />}
                label={option.text}
                sx={{ color: '#FFFFFF' }}
              />
            ))}
          </RadioGroup>
        ),
      }}

      actionButtonsProps={{
        hasResponse: selectedAnswer !== null,
        onSubmit: handleSubmit,
        onRedo: handleRedo,
        onTranslate: () => setShowTranslate(true),
        onShowAnswer: () => setShowAnswer(true),
      }}

      navigationProps={{
        onSearch: handleSearch,
        onPrevious: handlePrevious,
        onNext: handleNext,
        questionNumber: currentQuestionIndex + 1,
      }}
    />
  );
};
```

### 4. Writing: Essay (Single-Column Layout)

```tsx
import UnifiedPracticeLayout from '../common/UnifiedPracticeLayout';

const WriteEssayWithLayout = () => {
  // ... your state and handlers

  return (
    <UnifiedPracticeLayout
      icon="WE"
      title="Write Essay"
      subtitle={`Word count: ${wordCount}/300 (Min: 200)`}
      instructions="Write an essay on the given topic in 200-300 words."
      difficulty="Intermediate"

      questionNumber={1}
      studentName="Rachel Carson"
      testedCount={33}

      showTimer={true}
      timerProps={{
        timeRemaining: timer.timeRemaining,
        isRunning: timer.isRunning,
        warningThreshold: 120,
        autoSubmit: true,
      }}

      layoutMode="single-column"

      leftSection={{
        title: "Essay Topic",
        content: (
          <Box>
            <Typography variant="body1" sx={{ color: '#FFFFFF', lineHeight: 1.8 }}>
              {essayTopic}
            </Typography>
          </Box>
        ),
      }}

      rightSection={{
        title: "Write Your Essay",
        subtitle: `Time remaining: ${formatTime(timer.timeRemaining)}`,
        content: (
          <TextField
            fullWidth
            multiline
            rows={15}
            value={essayText}
            onChange={handleEssayChange}
            placeholder="Start typing your essay here..."
            disabled={isSubmitted}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#2a2a2a',
                color: '#FFFFFF',
              },
            }}
          />
        ),
      }}

      actionButtonsProps={{
        hasResponse: essayText.trim().length > 0,
        onSubmit: handleSubmit,
        onRedo: handleRedo,
        onTranslate: () => setShowTranslate(true),
        onShowAnswer: () => setShowAnswer(true),
      }}

      navigationProps={{
        onSearch: handleSearch,
        onPrevious: handlePrevious,
        onNext: handleNext,
        questionNumber: 1,
      }}
    />
  );
};
```

## Key Features & Benefits

### 1. **Consistent Dark Theme**
All sections use the dark color scheme:
- Background: `#1a1a1a`
- Borders: `rgba(255,255,255,0.1)`
- Text: `#FFFFFF` (primary), `#B0B0B0` (secondary)

### 2. **Responsive Layout**
- Two-column layout on desktop (md breakpoint and above)
- Stacks vertically on mobile/tablet
- Equal height columns with flexbox

### 3. **Flexible Content Areas**
- `leftSection.content` - Pass any ReactNode (Audio player, Text, Images, etc.)
- `rightSection.content` - Pass any ReactNode (Recording section, Text input, Multiple choice, etc.)

### 4. **Optional Components**
- Timer display (show/hide with `showTimer`)
- Stage goal banner (show/hide with `showStageGoalBanner`)
- Additional content area (pass any ReactNode to `additionalContent`)

### 5. **Integrated Navigation**
- Consistent Previous/Search/Next navigation
- Disabled state for Previous button on first question

### 6. **Loading State**
Built-in loading screen with customizable message.

## Best Practices

1. **Use existing common components** inside `leftSection.content` and `rightSection.content`:
   - `TextToSpeech`, `DualAudioPlayer` for audio playback
   - `RecordingSection` for recording functionality
   - `ContentDisplay` for text content with metadata
   - Material-UI components for forms and inputs

2. **Keep sections focused**:
   - Left section: Question/Content presentation
   - Right section: User response/interaction

3. **Consistent naming**: Use descriptive titles like "Audio Question", "Record Your Answer", "Write Your Summary"

4. **Error handling**: Handle errors within the content components and display appropriate messages

5. **Accessibility**: Ensure all interactive elements within content areas have proper ARIA labels

## Component Dependencies

The layout requires these existing components:
- `PracticeCardWithInstructionsPopover`
- `QuestionHeader`
- `NavigationSection`
- `ActionButtons`
- `StageGoalBanner`
- `TimerDisplay`
- `GradientBackground`

All these components are already available in the codebase.

## Migration Guide

To migrate an existing practice component to use `UnifiedPracticeLayout`:

1. Import the component
2. Map your existing props to the layout props structure
3. Move your left/right section JSX into the respective content props
4. Remove redundant wrapper components
5. Test the responsive behavior

## Notes

- The component is fully typed with TypeScript for better IDE support
- All styling uses Material-UI's `sx` prop for consistency
- Mobile-first approach with responsive breakpoints
- Optimized for performance with React.ReactNode for flexible content
