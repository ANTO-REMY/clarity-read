import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Settings,
  Volume2,
  Lightbulb
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef } from "react";
import { AudiobookPlayer } from "@/utils/speechSynthesis";

const Reader = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClarify, setShowClarify] = useState(false);
  const [volume, setVolume] = useState(70);
  const playerRef = useRef<AudiobookPlayer | null>(null);

  // Sample text - in reality this would be dynamic
  const currentParagraph = [
    "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
    "\"Whenever you feel like criticizing any one,\" he told me, \"just remember that all the people in this world haven't had the advantages that you've had.\"",
    "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.",
    "In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.",
    "The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person.",
    "And so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men."
  ];

  const [highlightedLine, setHighlightedLine] = useState(0);
  const [progress, setProgress] = useState(0);

  // Initialize audio player
  useEffect(() => {
    playerRef.current = new AudiobookPlayer(
      setHighlightedLine,
      setIsPlaying,
      setProgress
    );
    playerRef.current.loadText(currentParagraph);

    return () => {
      playerRef.current?.stop();
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Volume is handled per utterance, but we can store it
      playerRef.current?.setRate(0.9);
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/library")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-card-foreground">The Great Gatsby</h2>
            <p className="text-xs text-muted-foreground">Chapter 1</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Reading Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
        <div className="max-w-3xl w-full space-y-6">
          {/* Text Display with Highlighting */}
          <Card className="p-6 sm:p-8 space-y-3 bg-card/80 backdrop-blur">
            {currentParagraph.map((line, index) => (
              <p
                key={index}
                onClick={() => {
                  playerRef.current?.jumpToLine(index);
                }}
                className={`text-lg sm:text-xl leading-relaxed transition-all duration-300 cursor-pointer ${
                  highlightedLine === index
                    ? "bg-highlight text-highlight-foreground px-3 py-2 rounded-md font-semibold scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {line}
              </p>
            ))}
          </Card>

          {/* Clarify Button - Prominent and accessible */}
          <Button
            onClick={() => setShowClarify(!showClarify)}
            variant={showClarify ? "default" : "outline"}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            {showClarify ? "Hide Help" : "Need Help? Tap to Clarify"}
          </Button>

          {/* Clarify Panel */}
          {showClarify && (
            <Card className="p-6 space-y-4 bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Understanding this passage
              </h3>
              
              <div className="space-y-3">
                <div className="bg-card p-4 rounded-md">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Word: "vulnerable"
                  </p>
                  <p className="text-base">
                    Easily hurt or influenced; open to being harmed
                  </p>
                </div>

                <div className="bg-card p-4 rounded-md">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    What this means:
                  </p>
                  <p className="text-base leading-relaxed">
                    The narrator is saying that when he was younger and more easily influenced, 
                    his father gave him important advice that he still thinks about today.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="bg-card border-t border-border p-4 sm:p-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider 
              value={[progress]} 
              max={100} 
              step={1} 
              onValueChange={(value) => setProgress(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2:15</span>
              <span>9:00</span>
            </div>
          </div>

          {/* Playback Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-11 w-11 sm:h-12 sm:w-12"
              onClick={() => {
                playerRef.current?.skipBackward();
              }}
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button 
              size="icon" 
              className="h-14 w-14 sm:h-16 sm:w-16"
              onClick={() => {
                if (isPlaying) {
                  playerRef.current?.pause();
                } else {
                  playerRef.current?.play();
                }
              }}
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
              onClick={() => {
                playerRef.current?.skipForward();
              }}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Reading Speed */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider 
              value={[volume]} 
              max={100} 
              step={10} 
              onValueChange={(value) => setVolume(value[0])}
              className="flex-1" 
            />
            <span className="text-xs text-muted-foreground w-12">{volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
