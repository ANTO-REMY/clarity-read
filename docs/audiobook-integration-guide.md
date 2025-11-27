# Audiobook Integration Guide

This guide explains how to integrate real audiobooks into your Clarity Read application for your final project.

## Free Audiobook Sources

### 1. LibriVox (Recommended)
**Website**: [librivox.org](https://librivox.org)

**What it is:**
- Public domain audiobooks read by volunteers
- Completely free to download and use
- Over 15,000 audiobooks available
- MP3 format (easy to integrate)

**Popular Books Available:**
- The Great Gatsby by F. Scott Fitzgerald
- Pride and Prejudice by Jane Austen
- Frankenstein by Mary Shelley
- Alice's Adventures in Wonderland by Lewis Carroll
- The Adventures of Sherlock Holmes by Arthur Conan Doyle

**How to Download:**
1. Go to librivox.org
2. Search for a book
3. Click on the book title
4. Download individual chapters as MP3 files
5. Or download the entire book as a ZIP file

### 2. Project Gutenberg
**Website**: [gutenberg.org](https://www.gutenberg.org)

**What it is:**
- Free text versions of public domain books
- Over 70,000 free ebooks
- Perfect for pairing with LibriVox audio

**How to Use:**
1. Find the same book on both LibriVox (audio) and Project Gutenberg (text)
2. Download the text version (plain text format recommended)
3. Use alignment tools to sync audio with text

## Audio-Text Alignment Tools

To create word-level timestamps like in your current demo, you need to align the audio with the text.

### Option 1: Gentle (Easiest for Beginners)
**GitHub**: [github.com/lowerquality/gentle](https://github.com/lowerquality/gentle)

**Pros:**
- User-friendly web interface
- Good accuracy for English
- Free and open source

**How to Use:**
1. Install Docker (required)
2. Run: `docker pull lowerquality/gentle`
3. Run: `docker run -p 8765:8765 lowerquality/gentle`
4. Open browser to `localhost:8765`
5. Upload your audio file and text file
6. Download the JSON output with word timestamps

**Output Format:**
```json
{
  "words": [
    {
      "word": "In",
      "start": 0.0,
      "end": 0.12
    },
    {
      "word": "my",
      "start": 0.12,
      "end": 0.24
    }
  ]
}
```

### Option 2: Aeneas
**GitHub**: [github.com/readbeyond/aeneas](https://github.com/readbeyond/aeneas)

**Pros:**
- Command-line tool
- Fast processing
- Multiple language support

**Installation:**
```bash
pip install aeneas
```

**Usage:**
```bash
python -m aeneas.tools.execute_task \
  audio.mp3 \
  text.txt \
  "task_language=eng|is_text_type=plain|os_task_file_format=json" \
  output.json
```

### Option 3: Montreal Forced Aligner (Advanced)
**Website**: [montreal-forced-aligner.readthedocs.io](https://montreal-forced-aligner.readthedocs.io)

**Pros:**
- Research-grade accuracy
- Best for high-quality results

**Cons:**
- More complex setup
- Steeper learning curve

## Step-by-Step Integration Process

### Step 1: Choose and Download Content
1. Pick a book from LibriVox (e.g., "The Great Gatsby")
2. Download the MP3 audio files
3. Download matching text from Project Gutenberg

### Step 2: Prepare Your Files
1. Convert audio to a single MP3 file if needed:
   ```bash
   # Using ffmpeg
   ffmpeg -i "concat:chapter1.mp3|chapter2.mp3" -acodec copy output.mp3
   ```
2. Clean up the text file:
   - Remove table of contents
   - Remove preface/introduction if not in audio
   - Ensure text matches what's spoken in audio

### Step 3: Run Alignment Tool
Using Gentle (recommended):
1. Start Gentle server
2. Upload your audio and text
3. Wait for processing (can take 5-30 minutes depending on length)
4. Download the JSON output

### Step 4: Convert to Your Format
Create a script to convert Gentle's output to your `ChapterData` format:

```typescript
// conversion-script.ts
interface GentleWord {
  word: string;
  start: number;
  end: number;
}

interface GentleOutput {
  words: GentleWord[];
}

function convertToChapterData(gentleData: GentleOutput, audioUrl: string) {
  // Group words into sentences (you'll need to implement sentence detection)
  const sentences = groupWordsIntoSentences(gentleData.words);
  
  return {
    title: "The Great Gatsby",
    chapter: "Chapter 1",
    audioUrl: audioUrl,
    duration: gentleData.words[gentleData.words.length - 1].end,
    sentences: sentences
  };
}

function groupWordsIntoSentences(words: GentleWord[]) {
  const sentences = [];
  let currentSentence = [];
  
  words.forEach((word, index) => {
    currentSentence.push(word);
    
    // End sentence on punctuation
    if (word.word.match(/[.!?]$/) || index === words.length - 1) {
      sentences.push({
        text: currentSentence.map(w => w.word).join(' '),
        start: currentSentence[0].start,
        end: currentSentence[currentSentence.length - 1].end,
        words: currentSentence.map(w => ({
          word: w.word,
          start: w.start,
          end: w.end
        }))
      });
      currentSentence = [];
    }
  });
  
  return sentences;
}
```

### Step 5: Update Your Data Files
1. Save the converted data to your `audioData.ts` file
2. Update the audio URL to point to your MP3 file
3. Test in your application

## Quick Start Example

Here's a complete example using "The Great Gatsby" Chapter 1:

1. **Download Audio:**
   - Go to: https://librivox.org/the-great-gatsby-by-f-scott-fitzgerald/
   - Download Chapter 1 MP3

2. **Download Text:**
   - Go to: https://www.gutenberg.org/ebooks/64317
   - Download as Plain Text

3. **Extract Chapter 1 Text:**
   - Open the text file
   - Copy only Chapter 1 content
   - Save as `chapter1.txt`

4. **Run Gentle:**
   ```bash
   docker run -p 8765:8765 lowerquality/gentle
   ```
   - Open http://localhost:8765
   - Upload `chapter1.mp3` and `chapter1.txt`
   - Download results

5. **Convert and Integrate:**
   - Use the conversion script above
   - Add to your `audioData.ts`
   - Update imports in your app

## Tips for Success

1. **Start Small**: Begin with a single short chapter to test the workflow
2. **Match Exactly**: Ensure your text matches the audio exactly (same edition)
3. **Clean Audio**: Better audio quality = better alignment accuracy
4. **Sentence Detection**: You may need to refine sentence boundary detection
5. **Test Thoroughly**: Play through the entire chapter to verify alignment

## Recommended Books for Your Project

**Easy to Integrate (Clear narration, good alignment):**
- Alice's Adventures in Wonderland (short, clear)
- The Great Gatsby (popular, well-narrated)
- A Christmas Carol (short, engaging)

**Avoid Initially:**
- Very long books (hard to process)
- Books with multiple narrators
- Books with songs or poetry (harder to align)

## Troubleshooting

**Problem**: Alignment is off by a few seconds
- **Solution**: Check if audio has intro music or silence at the start

**Problem**: Some words are missing in alignment
- **Solution**: Ensure text exactly matches what's spoken (no extra words)

**Problem**: Processing takes too long
- **Solution**: Split into smaller chunks (5-10 minute segments)

## Next Steps

1. Try the process with one chapter first
2. Verify the alignment quality
3. Build a library of multiple chapters
4. Consider creating a batch processing script
5. Add chapter navigation to your UI

Good luck with your final project! 🎉
