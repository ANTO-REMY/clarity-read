import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Lightbulb,
  X,
  BookOpen,
  ChevronRight,
  Settings
} from "lucide-react";
import { useAudioSync } from "@/hooks/useAudioSync";
import { ChapterData } from "@/lib/audioData";
import { useReadingSettings } from "@/contexts/ReadingSettingsContext";

interface AudioReaderProps {
  chapterData: ChapterData;
}

export const AudioReader = ({ chapterData }: AudioReaderProps) => {
  const {
    isPlaying,
    currentTime,
    duration,
    currentSentenceIndex,
    currentWordIndex,
    progress,
    togglePlayPause,
    seekToProgress,
    skipForward,
    skipBackward,
    setVolume,
    setPlaybackRate,
    formatTime,
    goToSentence,
    play,
    pause
  } = useAudioSync(chapterData);

  const { getTextStyles } = useReadingSettings();

  const [showClarify, setShowClarify] = useState(false);
  const [volume, setVolumeState] = useState(70);
  const [speed, setSpeed] = useState(1);
  const [wasPlayingBeforeClarify, setWasPlayingBeforeClarify] = useState(false);
  const [clarifyContent, setClarifyContent] = useState<{ word: string; definition: string; explanation: string } | null>(null);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    setPlaybackRate(newSpeed);
  };

  // Helper function to determine if sentence is in the visible reading window (3-4 lines around current)
  const getVisibleRange = () => {
    const rangeSize = 2; // Show 2 sentences before and after current (total ~4-5 sentences)
    const start = Math.max(0, currentSentenceIndex - rangeSize);
    const end = Math.min(chapterData.sentences.length - 1, currentSentenceIndex + rangeSize);
    return { start, end };
  };

  const extractComplexWords = (sentence: string) => {
    const words = sentence.split(' ').map(w => w.replace(/[.,!?;:"']/g, ''));

    // Common word dictionary for filtering
    const commonWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
      'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
      'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
      'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
      'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
      'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
      'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
      'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
      'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
      'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did',
      'am', 'may', 'might', 'must', 'shall', 'should', 'very', 'more', 'much', 'many'
    ]);

    // Extended definitions for complex words
    const definitions: Record<string, string> = {
      "vulnerable": "Easily hurt or influenced; open to being harmed",
      "Science": "The study of the natural world through observation and experiment",
      "physics": "The science that studies matter, energy, force, and motion",
      "electricity": "A form of energy that powers many devices we use every day",
      "biology": "The science of living things, including plants, animals, and humans",
      "chemistry": "The science that studies what things are made of and how they change",
      "nutrients": "Substances in food that help your body grow and stay healthy",
      "consequence": "The result or effect of an action or condition",
      "inclined": "Having a tendency or preference toward something",
      "judgments": "Opinions or decisions formed after careful thought",
      "curious": "Eager to know or learn something; showing interest",
      "veteran": "A person with long experience in a particular field",
      "bores": "People or things that are dull and uninteresting",
      "abnormal": "Different from what is usual or expected; not normal",
      "detect": "To discover or notice something, especially something hidden",
      "attach": "To fasten or join one thing to another",
      "quality": "A distinctive characteristic or feature of something",
      "appears": "Seems to be; comes into view",
      "normal": "Conforming to a standard; usual or typical",
      "accused": "Charged with doing something wrong or illegal",
      "politician": "A person involved in government or politics",
      "privy": "Sharing in the knowledge of something secret or private",
      "secret": "Something kept hidden or unknown to others",
      "griefs": "Deep sorrows or sadness, especially caused by loss",
      "wild": "Living in nature; not tamed or controlled",
      "unknown": "Not known or familiar; mysterious",
      "advice": "Guidance or recommendations offered for future action",
      "turning": "Rotating or changing direction; considering repeatedly",
      "criticizing": "Expressing disapproval or finding fault with something",
      "advantages": "Beneficial features or favorable circumstances",
      "communicative": "Willing and able to talk and share information",
      "reserved": "Slow to reveal emotions or opinions; keeping back",
      "understood": "Grasped the meaning of; comprehended",
      "unjustly": "In an unfair or wrong manner"
    };

    const complexWords: Array<{ word: string; definition: string }> = [];

    words.forEach(word => {
      const lowerWord = word.toLowerCase();
      const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

      if (definitions[word] || definitions[lowerWord] || definitions[capitalizedWord]) {
        const definition = definitions[word] || definitions[lowerWord] || definitions[capitalizedWord];
        complexWords.push({ word, definition });
      } else if (
        word.length > 7 &&
        !commonWords.has(lowerWord) &&
        /^[a-zA-Z]+$/.test(word)
      ) {
        complexWords.push({
          word,
          definition: `A word that may need clarification. Consider looking it up for better understanding.`
        });
      }
    });

    return complexWords;
  };

  // Generate contextual explanation for a sentence
  const generateSentenceExplanation = (sentence: any, index: number): string => {
    const specificExplanations: Record<number, string> = {
      0: "Nick is reflecting on advice from his father that he received when he was young and impressionable. This advice has stayed with him throughout his life.",
      1: "Nick's father taught him not to judge others harshly, reminding him that not everyone has had the same opportunities and advantages in life.",
      2: "Nick's father didn't explain further, but Nick understood the deeper meaning: his father valued thoughtful communication and wanted Nick to be empathetic.",
      3: "Because of this advice, Nick tends to listen without judging, which has led many people to confide in him - though some have been boring.",
      4: "People who are unusual or troubled can sense when someone won't judge them, and they're drawn to that quality.",
      5: "In college, Nick's non-judgmental listening made people think he was politically minded, when really he was just being a good listener to troubled classmates."
    };

    if (specificExplanations[index]) {
      return specificExplanations[index];
    }

    const text = sentence.text.toLowerCase();

    if (text.includes('father') || text.includes('mother') || text.includes('parent')) {
      return "This passage discusses advice or wisdom passed down from a parent, which often shapes how we think and behave.";
    }
    if (text.includes('advice') || text.includes('told me')) {
      return "The narrator is reflecting on guidance they received, showing how words from others can influence our lives.";
    }
    if (text.includes('always') || text.includes('never')) {
      return "This sentence describes a pattern or habit, something that happens consistently over time.";
    }
    if (text.includes('college') || text.includes('school') || text.includes('university')) {
      return "This passage refers to an educational experience and what the narrator learned during that time.";
    }

    return "This sentence adds important context to the story. Think about how it connects to what came before and what might come after.";
  };

  const getClarifyContent = () => {
    if (currentSentenceIndex < 0 || currentSentenceIndex >= chapterData.sentences.length) {
      return null;
    }

    const sentence = chapterData.sentences[currentSentenceIndex];
    const complexWords = extractComplexWords(sentence.text);
    const explanation = generateSentenceExplanation(sentence, currentSentenceIndex);

    if (complexWords.length === 0 && !explanation) {
      return (
        <Card className="p-6 space-y-4 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Understanding this passage
          </h3>
          <div className="bg-card p-4 rounded-md">
            <p className="text-base leading-relaxed text-muted-foreground">
              This sentence seems clear! If you need help understanding any specific words or concepts, feel free to pause and think about the context.
            </p>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-6 space-y-4 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Understanding this passage
        </h3>

        <div className="space-y-3">
          {complexWords.length > 0 && (
            <div className="bg-card p-4 rounded-md space-y-3">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                {complexWords.length === 1 ? 'Key word:' : 'Key words:'}
              </p>
              {complexWords.map((item, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <p className="text-sm font-semibold text-primary">
                    "{item.word}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}

          {explanation && (
            <div className="bg-card p-4 rounded-md">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Context:
              </p>
              <p className="text-base leading-relaxed text-foreground">
                {explanation}
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const handleClarifyClick = () => {
    if (isPlaying) {
      setWasPlayingBeforeClarify(true);
      pause();
    } else {
      setWasPlayingBeforeClarify(false);
    }
    setShowClarify(true);
  };

  const handleCloseClarify = () => {
    setShowClarify(false);
    if (wasPlayingBeforeClarify) {
      play();
    }
  };

  const renderSentenceWithHighlighting = (sentence: any, index: number) => {
    const isActive = currentSentenceIndex === index;
    const visibleRange = getVisibleRange();
    const isInVisibleRange = index >= visibleRange.start && index <= visibleRange.end;

    return (
      <p
        key={index}
        onClick={() => goToSentence(index)}
        style={customTextStyles}
        className={`transition-all duration-300 cursor-pointer px-3 py-2 rounded-md ${isActive
          ? "bg-highlight text-highlight-foreground font-semibold scale-[1.02]"
          : isInVisibleRange
            ? "bg-muted/20 text-foreground"
            : "text-muted-foreground hover:text-foreground"
          }`}
      >
        {sentence.text}
      </p>
    );
  };

  // Get custom reading styles
  const customTextStyles = getTextStyles();

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 gap-6">
      <div className="flex-1 relative">
        <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border p-4">
          <div className="space-y-6 pb-20 p-4 rounded-lg transition-all duration-300" style={customTextStyles}>
            {chapterData.sentences.map((sentence, index) =>
              renderSentenceWithHighlighting(sentence, index)
            )}

            {/* Unsynced Content */}
            {chapterData.content && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Continue Reading</span>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {chapterData.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} style={customTextStyles} className="text-muted-foreground mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Clarify Overlay/Panel */}
        {showClarify && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 p-4 animate-in fade-in duration-200">
            <div className="h-full flex flex-col">
              <div className="flex justify-end mb-4">
                <Button variant="ghost" size="icon" onClick={handleCloseClarify}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                {getClarifyContent()}
              </ScrollArea>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <Card className="p-6 space-y-4 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 sticky bottom-0 z-10 shadow-lg border-t">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={(value) => seekToProgress(value[0])}
            className="cursor-pointer h-2"
          />
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVolumeState(v => Math.max(0, v - 10))}
              className="hidden sm:flex h-11 w-11"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
            <Slider
              value={[volume]}
              max={100}
              onValueChange={handleVolumeChange}
              className="w-24 hidden sm:flex h-2"
            />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => skipBackward()}
            >
              <SkipBack className="w-6 h-6" />
            </Button>

            <Button
              size="icon"
              className="h-16 w-16 rounded-full shadow-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => skipForward()}
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={showClarify ? "default" : "outline"}
              onClick={handleClarifyClick}
              className="hidden sm:flex gap-2 h-12 px-5 text-base font-medium focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Lightbulb className="w-5 h-5" />
              Clarify
            </Button>

            <div className="flex items-center gap-1.5 bg-secondary/50 rounded-lg p-1.5">
              {[0.85, 1, 1.15, 1.3].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-3 py-2 min-w-[44px] text-base font-medium rounded-md transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-1 ${speed === s
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {s === 0.85 ? "0.5x" : s === 1 ? "1x" : s === 1.15 ? "1.5x" : "2x"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
