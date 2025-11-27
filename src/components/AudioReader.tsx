import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Lightbulb
} from "lucide-react";
import { useAudioSync } from "@/hooks/useAudioSync";
import { ChapterData } from "@/lib/audioData";
import { useState } from "react";

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
    formatTime,
    goToSentence
  } = useAudioSync(chapterData);

  const [showClarify, setShowClarify] = useState(false);
  const [volume, setVolumeState] = useState(70);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  const renderSentenceWithHighlighting = (sentence: any, index: number) => {
    const isActive = currentSentenceIndex === index;

    if (!sentence.words || sentence.words.length === 0) {
      return (
        <p
          key={index}
          onClick={() => goToSentence(index)}
          className={`text-lg sm:text-xl leading-relaxed transition-all duration-300 cursor-pointer ${
            isActive
              ? "bg-highlight text-highlight-foreground px-3 py-2 rounded-md font-semibold scale-[1.02]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {sentence.text}
        </p>
      );
    }

    return (
      <p
        key={index}
        onClick={() => goToSentence(index)}
        className="text-lg sm:text-xl leading-relaxed cursor-pointer py-2"
      >
        {sentence.words.map((word: any, wordIdx: number) => {
          const isWordActive = isActive && currentWordIndex === wordIdx;

          return (
            <span
              key={wordIdx}
              className={`transition-all duration-150 inline-block mx-0.5 ${
                isWordActive
                  ? "bg-highlight text-highlight-foreground px-1 rounded font-semibold scale-105"
                  : isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {word.word}
            </span>
          );
        })}
      </p>
    );
  };

  const getClarifyContent = () => {
    if (currentSentenceIndex < 0) return null;

    const sentence = chapterData.sentences[currentSentenceIndex];

    const definitions: Record<string, string> = {
      "Science": "The study of the natural world through observation and experiment",
      "physics": "The science that studies matter, energy, force, and motion",
      "electricity": "A form of energy that powers many devices we use every day",
      "biology": "The science of living things, including plants, animals, and humans",
      "chemistry": "The science that studies what things are made of and how they change",
      "nutrients": "Substances in food that help your body grow and stay healthy"
    };

    const explanations: Record<string, string> = {
      0: "This sentence tells us that science is everywhere in our daily lives. From morning to night, scientific principles are at work all around us.",
      1: "Science helps us make sense of our world. It answers questions about why things happen and how they work.",
      2: "This is an example of electricity, which is a type of energy. When you flip a switch, you complete an electrical circuit that allows power to flow.",
      3: "Physics is one branch of science. It studies things like energy, forces, and how objects move.",
      4: "Your body is like a chemistry lab. It breaks down food into smaller parts that give you the energy to think, move, and grow.",
      5: "Biology studies living things, and chemistry studies what things are made of. Together, they help us understand how our bodies work."
    };

    const wordsInSentence = sentence.text.split(' ');
    const foundWord = wordsInSentence.find(w => {
      const cleanWord = w.replace(/[.,]/g, '');
      return definitions[cleanWord];
    });

    return (
      <Card className="p-6 space-y-4 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Understanding this passage
        </h3>

        <div className="space-y-3">
          {foundWord && (
            <div className="bg-card p-4 rounded-md">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Word: "{foundWord.replace(/[.,]/g, '')}"
              </p>
              <p className="text-base">
                {definitions[foundWord.replace(/[.,]/g, '')]}
              </p>
            </div>
          )}

          {explanations[currentSentenceIndex] && (
            <div className="bg-card p-4 rounded-md">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                What this means:
              </p>
              <p className="text-base leading-relaxed">
                {explanations[currentSentenceIndex]}
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
        <div className="max-w-3xl w-full space-y-6">
          <Card className="p-6 sm:p-8 space-y-3 bg-card/80 backdrop-blur">
            {chapterData.sentences.map((sentence, index) =>
              renderSentenceWithHighlighting(sentence, index)
            )}
          </Card>

          <Button
            onClick={() => setShowClarify(!showClarify)}
            variant={showClarify ? "default" : "outline"}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            {showClarify ? "Hide Help" : "Need Help? Tap to Clarify"}
          </Button>

          {showClarify && getClarifyContent()}
        </div>
      </div>

      <div className="bg-card border-t border-border p-4 sm:p-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="space-y-2">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(value) => seekToProgress(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 sm:h-12 sm:w-12"
              onClick={() => skipBackward(5)}
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              className="h-14 w-14 sm:h-16 sm:w-16"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 sm:h-12 sm:w-12"
              onClick={() => skipForward(5)}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="flex-1"
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
