# Spelling Test Component

## 📋 Overview

The Spelling Test is an interactive audio-based spelling practice tool designed with a modern black theme. It features text-to-speech word playback, real-time input validation, and automatic progress tracking.

## 🎨 Design Features

### Visual Design (Based on Screenshot)
- **Pure black background** (#000000) for modern appearance
- **Google-inspired colorful title** with gradient text
- **Large, clean input field** with embedded submit button
- **Color-coded buttons**:
  - Blue (#3b82f6): Primary actions (Start Test, Submit)
  - Green (#10b981): Success actions (Replay Word, Add Word)
  - Gray (#2a2a2a): Navigation (Previous, Next)
- **Progress tracking** with linear progress bar

## 📦 Component Structure

### Main File
**[SpellingTest.tsx](./SpellingTest.tsx)** - Complete spelling test implementation

### Key Features
✅ 15 words per test
✅ 5-second gap between words
✅ Text-to-Speech audio playback
✅ Real-time input validation
✅ Automatic word advancement
✅ Previous/Next navigation
✅ Progress tracking
✅ Test results display
✅ Test selection dropdown
✅ Black theme design

## 🚀 Usage

### Basic Implementation

```tsx
import SpellingTest from './components/spelling/SpellingTest';

function App() {
  return <SpellingTest />;
}
```

### Access Route
- **URL**: `/spelling-test`
- **Navigation**: Header → "Spelling Test"
- **Protected**: Login required

## 🎯 Features

### 1. **Test Selection**
```tsx
// Dropdown with test IDs
<Select value={selectedTest.id}>
  <MenuItem value="ST3362">Question: #ST3362</MenuItem>
</Select>
```

### 2. **Audio Playback**
- Uses browser's built-in **Speech Synthesis API**
- Adjustable speech rate (0.8x for clarity)
- Replay button available anytime
- "Playing..." indicator during playback

```tsx
const utterance = new SpeechSynthesisUtterance(word);
utterance.rate = 0.8;
utterance.pitch = 1;
speechSynthesis.speak(utterance);
```

### 3. **Input System**
- Large, rounded text field
- Embedded submit button
- Enter key support
- Disabled until test starts
- Auto-clear after submit

### 4. **Navigation**
- **Previous**: Go to previous word
- **Start Test/Replay Word**: Play audio
- **Next**: Move to next word
- Buttons disabled appropriately based on state

### 5. **Progress Tracking**
- Live word counter: "Word: X / 15"
- Visual progress bar
- Percentage display
- Completion tracking

### 6. **Results Display**
```tsx
// Shown after completing all 15 words
<Box>
  Score: 12 / 15 (80%)
  [Start New Test Button]
</Box>
```

## 📊 State Management

### Core State Variables

```typescript
const [selectedTest, setSelectedTest] = useState<SpellingTestData>();
const [currentWordIndex, setCurrentWordIndex] = useState(0);
const [userAnswers, setUserAnswers] = useState<string[]>(Array(15).fill(''));
const [currentInput, setCurrentInput] = useState('');
const [isTestStarted, setIsTestStarted] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const [testCompleted, setTestCompleted] = useState(false);
```

### Key Functions

```typescript
// Start the test
handleStartTest(): void

// Play current word audio
playCurrentWord(): void

// Submit current answer
handleSubmit(): void

// Navigate between words
handlePrevious(): void
handleNext(): void

// Reset everything
handleReset(): void

// Calculate final score
calculateResults(): { correct, total, percentage }
```

## 🎨 Color Palette

```typescript
const colors = {
  // Background
  pageBg: '#000000',           // Pure black
  cardBg: '#1a1a1a',           // Dark gray

  // Buttons
  primary: '#3b82f6',          // Blue (Start, Submit)
  success: '#10b981',          // Green (Replay, Add)
  secondary: '#2a2a2a',        // Gray (Navigation)

  // Text
  textPrimary: '#FFFFFF',      // White
  textSecondary: '#B0B0B0',    // Light gray
  textMuted: '#9ca3af',        // Muted gray
  placeholder: '#6b7280',      // Placeholder

  // States
  disabled: '#1e3a5f',         // Disabled blue
  disabledText: '#6b7280',     // Disabled text

  // Borders
  border: 'rgba(255,255,255,0.2)',
  borderFocus: '#3b82f6',
};
```

## 🎯 Mock Data Structure

```typescript
interface SpellingWord {
  id: string;
  word: string;
  audioUrl?: string;  // Optional URL (using TTS instead)
}

interface SpellingTestData {
  id: string;         // e.g., "ST3362"
  name: string;       // e.g., "Test #ST3362"
  words: SpellingWord[];  // 15 words
}
```

### Sample Test Data

```typescript
{
  id: 'ST3362',
  name: 'Test #ST3362',
  words: [
    { id: '1', word: 'accommodation' },
    { id: '2', word: 'embarrass' },
    { id: '3', word: 'definitely' },
    // ... 12 more words
  ]
}
```

## 📱 Responsive Design

### Breakpoints
```tsx
sx={{
  fontSize: { xs: '48px', md: '72px' }  // Title
}}
```

- **Desktop**: Full-sized interface
- **Mobile**: Adjusted font sizes and spacing

## ✨ User Flow

### Step-by-Step Experience

1. **Load Page**
   - See "Spelling Test" title with gradient
   - Read instructions
   - Select test from dropdown
   - See "Word: 0 / 15"

2. **Start Test**
   - Click "Start Test" button
   - Hear first word via TTS
   - Input field becomes active

3. **Answer Words**
   - Type spelling in input field
   - Press Enter or click "Submit"
   - Auto-advance to next word
   - Hear next word automatically

4. **Navigation Options**
   - Use "Previous" to go back
   - Use "Replay Word" to hear again
   - Use "Next" to skip forward

5. **Complete Test**
   - After 15th word submission
   - See results card with score
   - Option to start new test

## 🔧 Customization

### Change Number of Words

```tsx
const totalWords = 15;  // Change to desired number
const [userAnswers, setUserAnswers] = useState<string[]>(
  Array(totalWords).fill('')
);
```

### Adjust Speech Settings

```tsx
const utterance = new SpeechSynthesisUtterance(word);
utterance.rate = 0.8;   // Speed (0.1 to 10)
utterance.pitch = 1;    // Pitch (0 to 2)
utterance.volume = 1;   // Volume (0 to 1)
```

### Modify Gap Time

The 5-second gap is implemented via the auto-advance delay:

```tsx
setTimeout(() => {
  setCurrentWordIndex(currentWordIndex + 1);
  setTimeout(() => {
    playCurrentWord();
  }, 5000);  // Change this value (milliseconds)
}, 300);
```

### Add Custom Words

```tsx
// Click "Add your own word" button
// Implementation would connect to backend API
onClick={() => {
  // Open modal/dialog to add custom word
  // Save to database
  // Refresh test list
}}
```

## 🔌 API Integration (Ready)

### Fetch Tests

```typescript
useEffect(() => {
  async function fetchSpellingTests() {
    const response = await fetch('/api/spelling-tests');
    const data = await response.json();
    setTests(data);
  }
  fetchSpellingTests();
}, []);
```

### Submit Results

```typescript
const handleSubmitResults = async () => {
  const results = calculateResults();
  await fetch('/api/spelling-tests/results', {
    method: 'POST',
    body: JSON.stringify({
      testId: selectedTest.id,
      answers: userAnswers,
      score: results.correct,
      total: results.total,
    }),
  });
};
```

## 🎓 Educational Value

### Difficulty Levels
The component supports words of varying difficulty:

- **Easy**: believe, receive, achieve
- **Medium**: necessary, separate, maintenance
- **Hard**: accommodation, embarrass, conscience

### Common Misspellings
The test includes commonly misspelled words:

1. accommodation (not accomodation)
2. embarrass (not embarass)
3. definitely (not definately)
4. maintenance (not maintainance)
5. privilege (not priviledge)

## 📊 Progress Calculation

```typescript
const calculateResults = () => {
  let correct = 0;
  userAnswers.forEach((answer, index) => {
    if (answer.toLowerCase() === words[index].word.toLowerCase()) {
      correct++;
    }
  });
  return {
    correct,
    total: totalWords,
    percentage: Math.round((correct / totalWords) * 100)
  };
};
```

## 🔊 Audio Features

### Text-to-Speech Benefits
- No audio file storage needed
- Works offline
- Adjustable speed and pitch
- Multiple voice options (browser-dependent)

### Browser Compatibility
- ✅ Chrome/Edge: Excellent TTS support
- ✅ Safari: Good TTS support
- ✅ Firefox: Basic TTS support
- ⚠️ Older browsers: May need polyfill

## 🐛 Troubleshooting

### Issue: Audio not playing
**Solution**: Ensure browser supports Speech Synthesis API
```typescript
if (!('speechSynthesis' in window)) {
  alert('Text-to-Speech not supported in this browser');
}
```

### Issue: Words not advancing
**Solution**: Check that `handleSubmit` is called and input is not empty

### Issue: Enter key not working
**Solution**: Verify `onKeyPress` handler is attached to TextField

## 📚 Related Components

- **ReadAloud** - Similar audio practice for reading
- **WriteFromDictation** - Listening and writing practice
- **CoursePage** - Learning module with lessons

## 🎯 Future Enhancements

Potential additions:

- [ ] Custom word lists
- [ ] Difficulty levels
- [ ] Timed mode
- [ ] Hint system
- [ ] Voice recording comparison
- [ ] Leaderboard
- [ ] Achievement badges
- [ ] Word definitions
- [ ] Practice mode (show hints)
- [ ] Export results to PDF

---

**Created**: 2024
**Component Location**: `frontend/src/components/spelling/`
**Route**: `/spelling-test`
**Protected**: Yes (Login required)
**Theme**: Black/Dark
