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
      <div className="bg-card border-b border-border p-4 flex items-center justify-between min-h-[72px]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/book/great-gatsby")}
            className="h-12 px-4 gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium text-base hidden sm:inline">Back</span>
          </Button>
          <div>
            <h2 className="font-semibold text-card-foreground text-base sm:text-lg">{chapterData.title}</h2>
            <p className="text-sm text-muted-foreground">{chapterData.chapter}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            onClick={() => setCustomizerOpen(true)}
            className="h-12 px-4 gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            title="Customize Reading"
          >
            <Type className="w-5 h-5" />
            <span className="font-medium text-base hidden sm:inline">Customize</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/settings")}
            className="h-12 px-4 gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-base hidden sm:inline">Settings</span>
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
