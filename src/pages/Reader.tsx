import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Settings, Type } from "lucide-react";
import { AudioReader } from "@/components/AudioReader";
import { getChapterById, greatGatsbyChapter1 } from "@/lib/audioData";
import { ReadingCustomizerModal } from "@/components/ReadingCustomizerModal";
import { FirstTimeCustomizationPrompt } from "@/components/FirstTimeCustomizationPrompt";

const Reader = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Look up chapter data by ID, fallback to chapter 1
  const chapterData = chapterId 
    ? getChapterById(chapterId) || greatGatsbyChapter1
    : greatGatsbyChapter1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/book/great-gatsby")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-card-foreground">{chapterData.title}</h2>
            <p className="text-xs text-muted-foreground">{chapterData.chapter}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCustomizerOpen(true)}
            title="Customize Reading"
          >
            <Type className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* First-Time Customization Prompt */}
      <FirstTimeCustomizationPrompt onCustomizeNow={() => setCustomizerOpen(true)} />

      {/* Reading Customizer Modal */}
      <ReadingCustomizerModal open={customizerOpen} onOpenChange={setCustomizerOpen} />

      {/* Audio Reader Component */}
      <AudioReader chapterData={chapterData} />
    </div>
  );
};

export default Reader;
