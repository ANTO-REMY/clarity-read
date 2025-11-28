# Design Document

## Overview

This design addresses the chapter navigation synchronization issue where the navbar and audio progress bar do not update when users select different chapters. The solution involves creating a centralized chapter data lookup system and ensuring that the Reader component properly loads and displays chapter-specific information based on the URL parameter.

The core problem is that the Reader component currently hardcodes the chapter data to always use `greatGatsbyChapter1`, regardless of which chapter ID is passed in the URL. This design will implement a chapter data registry and update the Reader component to dynamically load the correct chapter data.

## Architecture

### Component Flow

```
ChapterSelection Page
    ↓ (User clicks Chapter 3)
    ↓ navigate(`/reader/gatsby-ch3`)
    ↓
Reader Page
    ↓ (Extract chapterId from URL params)
    ↓ (Look up chapter data by ID)
    ↓
Chapter Data Registry
    ↓ (Return ChapterData for gatsby-ch3)
    ↓
Reader Component
    ├─→ Navbar (displays chapter title & number)
    └─→ AudioReader Component
        └─→ useAudioSync Hook (uses chapter duration)
```

### Data Flow

1. User clicks on a chapter in ChapterSelection page
2. Navigation occurs with chapter ID in URL (`/reader/{chapterId}`)
3. Reader component extracts `chapterId` from URL params
4. Reader component calls chapter lookup function with the ID
5. Chapter lookup function returns the corresponding ChapterData object
6. Reader component passes ChapterData to navbar and AudioReader
7. AudioReader receives updated ChapterData and re-initializes audio
8. useAudioSync hook updates duration based on new chapter data

## Components and Interfaces

### 1. Chapter Data Registry (New)

**File:** `src/lib/audioData.ts`

**Purpose:** Centralized lookup system for chapter data

**Interface:**
```typescript
// Add to existing audioData.ts
export const chapterRegistry: Record<string, ChapterData> = {
  'gatsby-ch1': greatGatsbyChapter1,
  'gatsby-ch2': greatGatsbyChapter2,
  'gatsby-ch3': greatGatsbyChapter3,
  // ... other chapters
};

export function getChapterById(chapterId: string): ChapterData | null {
  return chapterRegistry[chapterId] || null;
}
```

**Design Decisions:**
- Use a simple object lookup for O(1) access time
- Return null for missing chapters to allow fallback handling
- Keep registry in the same file as chapter data for maintainability

### 2. Reader Component Updates

**File:** `src/pages/Reader.tsx`

**Current Implementation Issue:**
```typescript
// Current - always uses greatGatsbyChapter1
const chapterData = chapterId === "gatsby-ch1" ? greatGatsbyChapter1 : greatGatsbyChapter1;
```

**New Implementation:**
```typescript
import { getChapterById, greatGatsbyChapter1 } from "@/lib/audioData";

const Reader = () => {
  const { chapterId } = useParams();
  
  // Look up chapter data by ID, fallback to chapter 1
  const chapterData = chapterId 
    ? getChapterById(chapterId) || greatGatsbyChapter1
    : greatGatsbyChapter1;
  
  // Rest of component...
};
```

**Design Decisions:**
- Use optional chaining to handle undefined chapterId
- Fallback to Chapter 1 if chapter not found (graceful degradation)
- Keep fallback logic simple and predictable

### 3. Navbar Display

**File:** `src/pages/Reader.tsx` (Header section)

**Current Implementation:**
```typescript
<h2 className="font-semibold text-card-foreground">{chapterData.title}</h2>
<p className="text-xs text-muted-foreground">{chapterData.chapter}</p>
```

**Design Decision:**
- No changes needed - already uses chapterData props
- Will automatically update when chapterData changes

### 4. AudioReader Component

**File:** `src/components/AudioReader.tsx`

**Current Implementation:**
```typescript
export const AudioReader = ({ chapterData }: AudioReaderProps) => {
  const {
    duration,
    // ... other hooks
  } = useAudioSync(chapterData);
  
  // Duration display
  <span>{formatTime(duration)}</span>
};
```

**Design Decision:**
- No changes needed - already receives chapterData as prop
- useAudioSync hook will handle duration updates

### 5. useAudioSync Hook

**File:** `src/hooks/useAudioSync.ts`

**Current Implementation:**
```typescript
const [state, setState] = useState<AudioSyncState>({
  // ...
  duration: chapterData.duration,
  // ...
});

useEffect(() => {
  const audio = new Audio(chapterData.audioUrl);
  // ... audio setup
}, [chapterData]);
```

**Design Decision:**
- Hook already re-initializes when chapterData changes (dependency array)
- Initial duration set from chapterData.duration
- Audio metadata will override with actual file duration
- No changes needed

## Data Models

### ChapterData Interface (Existing)

```typescript
export interface ChapterData {
  id: string;              // Unique identifier (e.g., "gatsby-ch3")
  title: string;           // Book title
  chapter: string;         // Chapter display name (e.g., "Chapter 3")
  audioUrl: string;        // Path to audio file
  duration: number;        // Duration in seconds
  sentences: Sentence[];   // Synced sentences
  prep?: ChapterPrep;      // Optional prep content
  content?: string;        // Optional unsynced content
}
```

### Chapter Registry Type (New)

```typescript
type ChapterRegistry = Record<string, ChapterData>;
```

## Error Handling

### Missing Chapter ID

**Scenario:** User navigates to `/reader` without chapter ID

**Handling:**
```typescript
const chapterData = chapterId 
  ? getChapterById(chapterId) || greatGatsbyChapter1
  : greatGatsbyChapter1;
```

**Result:** Defaults to Chapter 1

### Invalid Chapter ID

**Scenario:** User navigates to `/reader/invalid-id`

**Handling:**
```typescript
getChapterById('invalid-id') // returns null
// Fallback to greatGatsbyChapter1
```

**Result:** Defaults to Chapter 1 with no error message

### Missing Audio File

**Scenario:** Chapter data exists but audio file is missing

**Handling:** Handled by existing audio element error events in useAudioSync

**Result:** Audio player shows error state (existing behavior)

## Testing Strategy

### Unit Tests

1. **Chapter Lookup Function**
   - Test valid chapter ID returns correct data
   - Test invalid chapter ID returns null
   - Test empty string returns null

2. **Reader Component**
   - Test component renders with valid chapter ID
   - Test component falls back to Chapter 1 with invalid ID
   - Test navbar displays correct chapter information

### Integration Tests

1. **Navigation Flow**
   - Test clicking Chapter 3 navigates to correct URL
   - Test Reader loads Chapter 3 data
   - Test navbar updates to show "Chapter 3"
   - Test audio progress bar shows Chapter 3 duration

2. **Audio Synchronization**
   - Test audio player initializes with correct duration
   - Test progress bar calculates correctly with new duration
   - Test switching chapters updates all UI elements

### Manual Testing Checklist

- [ ] Click Chapter 1 - verify navbar shows "Chapter 1" and correct duration
- [ ] Click Chapter 2 - verify navbar shows "Chapter 2" and correct duration
- [ ] Click Chapter 3 - verify navbar shows "Chapter 3" and correct duration
- [ ] Navigate directly to `/reader/gatsby-ch3` - verify correct chapter loads
- [ ] Navigate to `/reader/invalid` - verify fallback to Chapter 1
- [ ] Navigate to `/reader` - verify fallback to Chapter 1
- [ ] Switch between chapters - verify audio stops and restarts correctly

## Implementation Notes

### Phase 1: Create Chapter Data

For the MVP, we need to create placeholder chapter data for chapters 2-9 since only Chapter 1 currently has full sentence-level synchronization data.

**Approach:**
- Create minimal ChapterData objects for chapters 2-9
- Use placeholder audio URLs (can be same file for demo)
- Use actual durations from the book's chapter list
- Empty sentences array (will show only unsynced content)
- Add placeholder content text

### Phase 2: Update Registry

Add all chapter data objects to the registry for lookup.

### Phase 3: Update Reader Component

Modify Reader to use the lookup function instead of hardcoded data.

### Phase 4: Testing

Verify all navigation scenarios work correctly.

## Future Enhancements

1. **Loading States:** Add loading indicator while chapter data is being fetched
2. **Error Messages:** Show user-friendly error message for missing chapters
3. **Chapter Preloading:** Preload next chapter data for faster navigation
4. **URL Validation:** Validate chapter ID format before lookup
5. **Analytics:** Track which chapters users navigate to most frequently
