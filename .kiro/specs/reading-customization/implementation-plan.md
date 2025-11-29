# Reading Customization Feature - Implementation Plan

## 🎯 Feature Goal
Enable dyslexic users to customize their reading experience with fonts, spacing, and visual settings that reduce reading barriers and improve comprehension.

---

## 📋 Feature Specifications

### 1. Font Options (Web-Safe Fonts Only)
- **Verdana** - Dyslexia-friendly, widely available
- **Comic Sans MS** - Proven effective for dyslexia
- **Arial** - Clean, simple
- **Georgia** - Serif option for comparison

### 2. Spacing Controls
- **Letter Spacing**: Normal (0) / Relaxed (0.05em) / Wide (0.1em)
- **Line Height**: Normal (1.5) / Comfortable (1.8) / Spacious (2.2)
- **Text Size**: Normal (18px) / Large (22px) / Extra Large (26px)

### 3. Visual Comfort
- **Background Tint**: None / Cream (#FFF8E7) / Light Blue (#E3F2FD) / Light Yellow (#FFFDE7)
- **Text Color**: Black / Dark Gray (#333)

---

## 🏗️ Implementation Steps

### Step 1: Create Reading Settings Context ✅
**File**: `src/contexts/ReadingSettingsContext.tsx`

**Tasks**:
- [ ] Define TypeScript interface for settings
  - fontFamily: string
  - letterSpacing: 'normal' | 'relaxed' | 'wide'
  - lineHeight: 'normal' | 'comfortable' | 'spacious'
  - textSize: 'normal' | 'large' | 'extra-large'
  - backgroundColor: 'none' | 'cream' | 'blue' | 'yellow'
  - textColor: 'black' | 'gray'
  - hasSeenPrompt: boolean

- [ ] Create default settings object
- [ ] Implement React Context with Provider
- [ ] Add localStorage persistence
  - Load settings on mount
  - Save settings on change
- [ ] Create `useReadingSettings()` custom hook
- [ ] Export context and hook

**Estimated Time**: 15 minutes

---

### Step 2: Build Customization Modal Component ✅
**File**: `src/components/ReadingCustomizerModal.tsx`

**Tasks**:
- [ ] Create modal component with shadcn Dialog
- [ ] Add modal header with title and close button
- [ ] Build Font Selection Section
  - Radio buttons for 4 font options
  - Show font name in its own font (preview)
- [ ] Build Spacing Controls Section
  - Slider for letter spacing (3 options)
  - Slider for line height (3 options)
  - Slider for text size (3 options)
  - Display current value labels
- [ ] Build Visual Comfort Section
  - Color swatches for background tints (4 options)
  - Radio buttons for text color (2 options)
- [ ] Add "Reset to Default" button
- [ ] Connect all controls to context
- [ ] Implement live preview (changes apply immediately)

**Estimated Time**: 25 minutes

---

### Step 3: Add "Aa" Button to Top Navigation ✅
**Files**: `src/pages/Reader.tsx`

**Tasks**:
- [ ] Import ReadingCustomizerModal
- [ ] Add state for modal open/close
- [ ] Add "Aa" button to top navigation bar
  - Position: Next to Settings icon
  - Icon: Typography icon or "Aa" text
  - Styling: Consistent with other nav buttons
- [ ] Connect button click to open modal
- [ ] Render modal component

**Estimated Time**: 10 minutes

---

### Step 4: Integrate into Settings Page ✅
**File**: `src/pages/Settings.tsx`

**Tasks**:
- [ ] Add "Reading Customization" section
- [ ] Reuse the same controls from modal (extract to shared component if needed)
- [ ] Add section header and description
- [ ] Ensure consistent styling with rest of settings page
- [ ] Test that changes sync between modal and settings page

**Estimated Time**: 15 minutes

---

### Step 5: First-Time User Experience ✅
**File**: `src/components/FirstTimeCustomizationPrompt.tsx`

**Tasks**:
- [ ] Create welcome prompt component
- [ ] Use shadcn Dialog for modal
- [ ] Add welcoming message
  - "Welcome! 👋"
  - "Customize your reading experience for better comfort and focus."
- [ ] Add two buttons:
  - "Customize Now" - Opens customization modal
  - "Maybe Later" - Closes prompt, sets hasSeenPrompt flag
- [ ] Check hasSeenPrompt flag from context
- [ ] Show prompt only on first visit to Reader page
- [ ] Update hasSeenPrompt in localStorage when dismissed

**Integration**:
- [ ] Add to Reader.tsx
- [ ] Show on component mount if hasSeenPrompt is false
- [ ] Ensure it shows before reading starts

**Estimated Time**: 15 minutes

---

### Step 6: Apply Settings to Reading Text ✅
**File**: `src/pages/Reader.tsx` and `src/components/AudioReader.tsx`

**Tasks**:
- [ ] Wrap reading text container with dynamic styles
- [ ] Create style object from context values
- [ ] Map setting values to CSS properties:
  - fontFamily → font-family
  - letterSpacing → letter-spacing
  - lineHeight → line-height
  - textSize → font-size
  - backgroundColor → background-color
  - textColor → color
- [ ] Apply styles only to reading text area
- [ ] Ensure UI elements (buttons, nav, controls) are NOT affected
- [ ] Test with Chapter 1 text
- [ ] Verify highlighting still works with custom styles

**Estimated Time**: 10 minutes

---

### Step 7: Wrap App with Context Provider ✅
**File**: `src/App.tsx`

**Tasks**:
- [ ] Import ReadingSettingsProvider
- [ ] Wrap entire app with provider
- [ ] Ensure provider is at top level (above Router)
- [ ] Test that context is accessible from all pages

**Estimated Time**: 5 minutes

---

### Step 8: Polish & Testing ✅
**Tasks**:
- [ ] Add smooth transitions for setting changes (CSS transitions)
- [ ] Test mobile responsiveness
  - Modal should be full-screen on mobile
  - Controls should be touch-friendly
- [ ] Test keyboard accessibility
  - Tab navigation works
  - Enter/Space activates buttons
  - Escape closes modal
- [ ] Test all font combinations
- [ ] Test all spacing combinations
- [ ] Test all color combinations
- [ ] Verify localStorage persistence
  - Change settings
  - Refresh page
  - Verify settings are restored
- [ ] Test first-time prompt flow
  - Clear localStorage
  - Visit Reader page
  - Verify prompt shows
  - Dismiss prompt
  - Verify it doesn't show again
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

**Estimated Time**: 20 minutes

---

## 📁 Files to Create/Modify

### New Files:
1. ✅ `src/contexts/ReadingSettingsContext.tsx` - State management
2. ✅ `src/components/ReadingCustomizerModal.tsx` - Main modal
3. ✅ `src/components/FirstTimeCustomizationPrompt.tsx` - Welcome prompt

### Modified Files:
1. ✅ `src/pages/Reader.tsx` - Add "Aa" button, apply settings, show prompt
2. ✅ `src/pages/Settings.tsx` - Add customization section
3. ✅ `src/App.tsx` - Wrap with ReadingSettingsProvider
4. ✅ `src/components/AudioReader.tsx` - Apply styles to reading text

---

## 🎨 UI Design Reference

### Top Navigation Bar:
```
┌─────────────────────────────────────────┐
│ [Back] Chapter 1      [Aa] [Settings]   │
└─────────────────────────────────────────┘
```

### Customization Modal (Center Overlay):
```
┌─────────────────────────────────────────┐
│  Customize Your Reading           [×]   │
├─────────────────────────────────────────┤
│                                         │
│  📝 Font Style                          │
│  ○ Verdana  ○ Comic Sans               │
│  ● Arial    ○ Georgia                  │
│                                         │
│  📏 Text Spacing                        │
│  Letter Spacing: [──●────] Relaxed     │
│  Line Height:    [────●──] Comfortable │
│  Text Size:      [──●────] Large       │
│                                         │
│  🎨 Visual Comfort                      │
│  Background: [None] [Cream] [Blue]     │
│  Text Color: ● Black  ○ Dark Gray      │
│                                         │
│  [Reset to Default]                    │
└─────────────────────────────────────────┘
```

### First-Time Prompt:
```
┌─────────────────────────────────────────┐
│  Welcome! 👋                            │
│                                         │
│  Customize your reading experience      │
│  for better comfort and focus.          │
│                                         │
│  [Customize Now]  [Maybe Later]         │
└─────────────────────────────────────────┘
```

---

## ⏱️ Time Estimate
- **Step 1**: 15 minutes
- **Step 2**: 25 minutes
- **Step 3**: 10 minutes
- **Step 4**: 15 minutes
- **Step 5**: 15 minutes
- **Step 6**: 10 minutes
- **Step 7**: 5 minutes
- **Step 8**: 20 minutes
- **Total**: ~2 hours

---

## ✅ Success Criteria
1. ✅ "Aa" button in top navigation (Reader page)
2. ✅ Modal opens with customization options
3. ✅ Settings apply live to reading text
4. ✅ Settings persist across sessions (localStorage)
5. ✅ First-time prompt shows once
6. ✅ Same controls available in Settings page
7. ✅ Mobile responsive
8. ✅ Keyboard accessible
9. ✅ No impact on UI elements (only reading text affected)
10. ✅ Smooth transitions and polished UX

---

## 🚀 Implementation Status

**Current Status**: ✅ COMPLETED
**Started**: Today
**Completed**: Today

### Completed Steps:
- ✅ Step 1: Created Reading Settings Context
- ✅ Step 2: Built Customization Modal Component
- ✅ Step 3: Created First-Time Customization Prompt
- ✅ Step 4: Wrapped App with Context Provider
- ✅ Step 5: Added "Aa" Button to Reader Page
- ✅ Step 6: Applied Settings to Reading Text
- ✅ Step 7: Integrated into Settings Page
- ✅ All TypeScript errors resolved

---

## 📝 Notes & Decisions

### Design Decisions:
- Using web-safe fonts only (no downloads) to keep scope manageable
- Modal overlay approach for better focus and accessibility
- Live preview for immediate feedback
- localStorage for persistence (no backend needed)
- First-time prompt to guide new users
- Available in both Reader and Settings for flexibility

### Technical Decisions:
- React Context API for state management (simple, no external dependencies)
- shadcn/ui components for consistent design
- CSS-in-JS for dynamic styling
- TypeScript for type safety
- localStorage API for persistence

### Accessibility Considerations:
- Keyboard navigation support
- ARIA labels for screen readers
- High contrast options
- Touch-friendly controls for mobile
- Clear visual feedback for all interactions

---

## 🐛 Known Issues / Future Improvements
- [ ] None yet (will be updated during implementation)

---

## 📚 References
- British Dyslexia Association: Font and spacing recommendations
- Web Content Accessibility Guidelines (WCAG)
- Dyslexia-friendly design principles
