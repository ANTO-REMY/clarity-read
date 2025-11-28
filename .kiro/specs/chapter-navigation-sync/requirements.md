# Requirements Document

## Introduction

This feature addresses the issue where clicking on different chapters in the audiobook reader does not properly update the navbar title, chapter information, or audio progress bar duration. Currently, when a user selects Chapter 3 (or any chapter other than Chapter 1), the navbar still displays "Chapter 1" information and the audio progress bar shows the duration for Chapter 1 (43 minutes) instead of the selected chapter's actual duration.

The goal is to ensure that when users navigate between chapters, all UI elements update correctly to reflect the selected chapter's information, including the navbar title, chapter number, and the audio progress bar's total duration.

## Requirements

### Requirement 1: Chapter Data Loading

**User Story:** As a user, I want the correct chapter data to load when I select a specific chapter, so that I can read and listen to the chapter I chose.

#### Acceptance Criteria

1. WHEN a user clicks on a chapter from the chapter selection page THEN the Reader page SHALL load with the correct chapter data based on the chapter ID from the URL
2. WHEN the chapter ID in the URL does not match any available chapter THEN the system SHALL display Chapter 1 as a fallback
3. WHEN the Reader component receives chapter data THEN it SHALL pass the correct chapter information to all child components

### Requirement 2: Navbar Chapter Information Update

**User Story:** As a user, I want the navbar to display the correct chapter title and number when I navigate to a chapter, so that I know which chapter I'm currently reading.

#### Acceptance Criteria

1. WHEN a user navigates to a specific chapter THEN the navbar SHALL display the correct chapter title
2. WHEN a user navigates to a specific chapter THEN the navbar SHALL display the correct chapter number (e.g., "Chapter 3")
3. WHEN the chapter changes THEN the navbar information SHALL update immediately without requiring a page refresh

### Requirement 3: Audio Progress Bar Duration Update

**User Story:** As a user, I want the audio progress bar to show the correct total duration for the chapter I'm listening to, so that I can see how long the chapter is and track my progress accurately.

#### Acceptance Criteria

1. WHEN a user navigates to a specific chapter THEN the audio progress bar SHALL display the correct total duration for that chapter
2. WHEN the chapter data includes a duration property THEN the progress bar SHALL use that duration value
3. WHEN the audio player calculates the time remaining THEN it SHALL be based on the current chapter's actual duration
4. WHEN a user switches between chapters THEN the progress bar duration SHALL update to reflect the new chapter's duration

### Requirement 4: Chapter Data Structure Support

**User Story:** As a developer, I want the system to support multiple chapters with different durations, so that the audiobook reader can handle books with varying chapter lengths.

#### Acceptance Criteria

1. WHEN chapter data is defined in the audioData file THEN each chapter SHALL have a unique ID
2. WHEN chapter data is defined THEN each chapter SHALL include title, chapter number, and duration properties
3. WHEN the system needs to retrieve chapter data THEN it SHALL be able to look up chapters by their ID
4. IF a chapter ID is not found THEN the system SHALL gracefully fall back to a default chapter
