# Implementation Plan

- [x] 1. Create chapter data for chapters 2-9










  - Create ChapterData objects for gatsby-ch2 through gatsby-ch9 with placeholder content
  - Use actual durations from greatGatsbyBook.chapters array (25:00, 30:00, 27:00, etc.)
  - Convert duration strings to seconds (e.g., "25:00" → 1500)
  - Use empty sentences array for chapters without audio sync data
  - Add placeholder content text for each chapter
  - _Requirements: 1.1, 4.1, 4.2_

- [x] 2. Implement chapter registry and lookup function





  - Create chapterRegistry object mapping chapter IDs to ChapterData objects
  - Implement getChapterById function that returns ChapterData or null
  - Export both from audioData.ts
  - _Requirements: 1.1, 4.3, 4.4_

- [x] 3. Update Reader component to use dynamic chapter loading









  - Import getChapterById function in Reader.tsx
  - Replace hardcoded chapter logic with getChapterById lookup
  - Implement fallback to greatGatsbyChapter1 when chapter not found
  - Handle undefined chapterId from URL params
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.4_

- [ ]* 4. Test chapter navigation functionality
  - Verify clicking different chapters updates navbar correctly
  - Verify audio progress bar shows correct duration for each chapter
  - Test fallback behavior with invalid chapter IDs
  - Test direct URL navigation to specific chapters
  - _Requirements: 2.3, 3.3, 3.4_
