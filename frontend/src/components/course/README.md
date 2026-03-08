# Course Page Documentation

## 📋 Overview

The Course Page is a comprehensive learning management interface designed to display structured educational content with progress tracking. It features a three-column layout optimized for desktop and responsive for mobile devices.

## 🎨 Design Features

### Visual Design (Based on Screenshot)
- **Clean, minimal interface** with white cards on light gray background (#f5f7fa)
- **Three-column layout**:
  - Left: Quick outline navigation (280px)
  - Center: Main course content (flexible)
  - Right: Progress tracking (300px)
- **Expandable accordion sections** for course modules
- **Progress visualization** with percentage and stats
- **Color-coded status indicators**:
  - Blue (#3b82f6): Available/Active lessons
  - Green (#10b981): Completed lessons
  - Gray (#9ca3af): Locked lessons

## 📦 Components Created

### 1. **CoursePage.tsx**
Main container component that orchestrates the entire course interface.

**Props**: None (uses internal state)

**Features**:
- Three-column responsive layout
- Module and lesson state management
- Progress calculation
- Mock data integration (ready for API)

**State**:
```typescript
- modules: CourseModule[] - All course modules with lessons
- selectedModuleId: string - Currently selected module
```

### 2. **QuickOutline.tsx**
Left sidebar component showing a quick navigation outline of all modules.

**Props**:
```typescript
{
  modules: CourseModule[];
  selectedModuleId: string;
  onModuleSelect: (moduleId: string) => void;
}
```

**Features**:
- Sticky positioning (stays visible on scroll)
- Numbered module list
- Click to navigate to module
- Active module highlighting
- Module count display

### 3. **CourseSyllabus.tsx**
Main content area with expandable accordion sections for each module.

**Props**:
```typescript
{
  modules: CourseModule[];
  onLessonComplete: (moduleId: string, lessonId: string) => void;
}
```

**Features**:
- Accordion expansion/collapse
- Module title and metadata (lesson count, duration)
- Lesson list with status icons
- Action buttons (Open lessons, Practice)
- Only shows modules with lessons

### 4. **LessonItem.tsx**
Individual lesson row component within modules.

**Props**:
```typescript
{
  lesson: Lesson;
  moduleId: string;
  onLessonComplete: (moduleId: string, lessonId: string) => void;
}
```

**Features**:
- Status icons (Play, Check, Lock)
- Lesson title and duration
- Click to complete (if unlocked)
- Hover effects
- Locked state handling

### 5. **CourseProgress.tsx**
Right sidebar showing user progress and statistics.

**Props**:
```typescript
{
  completedLessons: number;
  totalLessons: number;
}
```

**Features**:
- Large progress display (X/Y completed)
- Progress bar with percentage
- Continue button
- Stats grid (Remaining, Done)
- Achievement badge for progress
- Sticky positioning

### 6. **types.ts**
TypeScript type definitions for the course module.

**Types**:
```typescript
interface Lesson {
  id: string;
  title: string;
  duration: number; // minutes
  completed: boolean;
  locked: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  lessonsCount: number;
  duration: number; // minutes
  lessons?: Lesson[];
}
```

## 🚀 Usage

### Basic Implementation

```tsx
import CoursePage from './components/course/CoursePage';

function App() {
  return <CoursePage />;
}
```

### With Custom Data

```tsx
import { CoursePage } from './components/course';

const customModules = [
  {
    id: '1',
    title: 'Introduction to React',
    lessonsCount: 5,
    duration: 30,
    lessons: [
      {
        id: '1-1',
        title: 'What is React?',
        duration: 10,
        completed: false,
        locked: false
      },
      // ... more lessons
    ],
  },
  // ... more modules
];

<CoursePage modules={customModules} />
```

## 📁 File Structure

```
frontend/src/components/course/
├── CoursePage.tsx              # Main container
├── QuickOutline.tsx            # Left sidebar navigation
├── CourseSyllabus.tsx          # Center content area
├── CourseProgress.tsx          # Right sidebar progress
├── LessonItem.tsx              # Individual lesson component
├── types.ts                    # TypeScript types
├── index.ts                    # Barrel exports
└── README.md                   # This file
```

## 🎯 Integration with App

### 1. Header Navigation
The "Course" menu item has been added to the Header component:

```tsx
// In Header.tsx
const menuItems = [
  { label: 'Home', path: '/' },
  ...(isLoggedIn ? [
    { label: 'PTE Practice', path: '/practice', hasSubMenu: true },
    { label: 'Mock Test', path: '/mock-tests' },
    { label: 'Course', path: '/course' }, // ✨ New
  ] : []),
];
```

### 2. Route Configuration
Route added in App.tsx:

```tsx
<Route
  path="/course"
  element={isLoggedIn ? <CoursePage /> : <Navigate to="/" replace />}
/>
```

## 🔌 API Integration (Ready)

The component is structured to easily integrate with a backend API:

```typescript
// Example API integration
useEffect(() => {
  async function fetchCourseData() {
    const response = await fetch('/api/courses/grammar');
    const data = await response.json();
    setModules(data.modules);
  }
  fetchCourseData();
}, []);
```

**Expected API Response Format**:
```json
{
  "modules": [
    {
      "id": "1",
      "title": "Parts of Speech",
      "lessonsCount": 9,
      "duration": 18,
      "lessons": [
        {
          "id": "1-1",
          "title": "Nouns",
          "duration": 3,
          "completed": false,
          "locked": false
        }
      ]
    }
  ]
}
```

## 🎨 Color Palette

```typescript
const colors = {
  // Background
  pageBg: '#f5f7fa',
  cardBg: '#FFFFFF',
  sectionBg: '#f9fafb',

  // Text
  textPrimary: '#1a1a1a',
  textSecondary: '#374151',
  textMuted: '#6b7280',

  // Actions
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  success: '#10b981',

  // Borders
  border: '#e5e7eb',
  borderLight: 'rgba(0,0,0,0.08)',
};
```

## 📱 Responsive Design

### Breakpoints
- **Desktop (lg+)**: Three-column layout
- **Tablet (md-lg)**: Two-column or stacked
- **Mobile (xs-sm)**: Single column, stacked

### Layout Behavior
```tsx
sx={{
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  gap: 3,
}}
```

## ✨ Features

### ✅ Implemented
- [x] Three-column layout matching screenshot
- [x] Quick outline navigation
- [x] Expandable course modules
- [x] Lesson status tracking (play, completed, locked)
- [x] Progress visualization
- [x] Responsive design
- [x] Header navigation integration
- [x] Route protection (login required)
- [x] TypeScript types
- [x] Mock data structure

### 🔄 Ready for Enhancement
- [ ] API integration
- [ ] Lesson content viewer
- [ ] Video player integration
- [ ] Quiz/practice integration
- [ ] Certificate generation
- [ ] User notes feature
- [ ] Bookmark lessons
- [ ] Search functionality
- [ ] Filter by completion status

## 🧪 Testing

### Manual Testing Checklist
- [ ] Course page loads successfully
- [ ] Quick outline shows all modules
- [ ] Clicking module in outline scrolls to it
- [ ] Accordion expands/collapses
- [ ] Lesson status icons display correctly
- [ ] Progress calculation is accurate
- [ ] Progress bar updates on completion
- [ ] Locked lessons cannot be clicked
- [ ] Responsive layout works on mobile
- [ ] Navigation "Course" link works
- [ ] Login protection works

## 🔧 Customization

### Change Course Title
```tsx
// In CourseSyllabus.tsx
<Typography variant="h4">
  Your Course Title Here
</Typography>
```

### Modify Module Data
```tsx
// In CoursePage.tsx
const mockModules: CourseModule[] = [
  {
    id: '1',
    title: 'Your Module Title',
    lessonsCount: 10,
    duration: 30,
    lessons: [...],
  },
];
```

### Adjust Layout Widths
```tsx
// In CoursePage.tsx
<Box sx={{ width: { xs: '100%', lg: '320px' } }}> // Left sidebar
<Box sx={{ width: { xs: '100%', lg: '350px' } }}> // Right sidebar
```

## 🐛 Troubleshooting

### Issue: Modules not showing
**Solution**: Ensure modules have `lessons` array populated. Empty modules are filtered out.

### Issue: Progress not updating
**Solution**: Check that `onLessonComplete` handler is properly updating state in parent component.

### Issue: Layout breaks on mobile
**Solution**: Verify responsive `sx` props use correct breakpoints: `{ xs, sm, md, lg, xl }`.

## 📚 Related Components

- **Header.tsx** - Navigation integration
- **App.tsx** - Route configuration
- **ModernPracticeLayout** - Similar dark-themed layout
- **UnifiedPracticeLayout** - Alternative practice layout

## 🎓 Learning Path Example

The current implementation showcases a "Grammar Course" with 11 modules covering:

1. Parts of Speech (9 lessons)
2. Sentence Structure (5 lessons)
3. Punctuation (8 lessons)
4. Subject-Verb Agreement (6 lessons)
5. Tenses (12 lessons)
6. Active and Passive Voice (4 lessons)
7. Direct and Indirect Speech (5 lessons)
8. Clauses and Phrases (7 lessons)
9. Common Grammar Mistakes (10 lessons)
10. Writing Style and Tone (6 lessons)
11. Advanced Grammar Topics (8 lessons)

**Total**: 80 lessons, 160 minutes

## 📝 Notes

- Module 1 (Parts of Speech) is fully expanded by default
- First 3 lessons are unlocked by default
- Subsequent lessons unlock after completing previous ones
- Progress persists in component state (ready for localStorage/API)

---

**Created**: 2024
**Last Updated**: 2024
**Component Location**: `frontend/src/components/course/`
**Route**: `/course`
**Protected**: Yes (Login required)
