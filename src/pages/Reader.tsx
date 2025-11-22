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
import { useState } from "react";

const Reader = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClarify, setShowClarify] = useState(false);

  // Sample text - in reality this would be dynamic
  const currentParagraph = [
    "In my younger and more vulnerable years",
    "my father gave me some advice",
    "that I've been turning over in my mind ever since."
  ];

  const [highlightedLine, setHighlightedLine] = useState(0);

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
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-2xl w-full space-y-6">
          {/* Text Display with Highlighting */}
          <Card className="p-8 space-y-4 bg-card/80 backdrop-blur">
            {currentParagraph.map((line, index) => (
              <p
                key={index}
                className={`text-2xl leading-relaxed transition-all duration-300 ${
                  highlightedLine === index
                    ? "bg-highlight text-highlight-foreground px-3 py-2 rounded-md font-semibold"
                    : "text-muted-foreground"
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
            className="w-full h-14 text-lg font-semibold"
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
      <div className="bg-card border-t border-border p-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider defaultValue={[45]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2:15</span>
              <span>4:30</span>
            </div>
          </div>

          {/* Playback Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12"
              onClick={() => setHighlightedLine(Math.max(0, highlightedLine - 1))}
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button 
              size="icon" 
              className="h-16 w-16"
              onClick={() => {
                setIsPlaying(!isPlaying);
                if (!isPlaying) {
                  // Simulate highlighting progression
                  const interval = setInterval(() => {
                    setHighlightedLine(prev => {
                      if (prev >= currentParagraph.length - 1) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return 0;
                      }
                      return prev + 1;
                    });
                  }, 2000);
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
              className="h-12 w-12"
              onClick={() => setHighlightedLine(Math.min(currentParagraph.length - 1, highlightedLine + 1))}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
