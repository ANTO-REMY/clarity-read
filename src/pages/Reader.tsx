import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Settings } from "lucide-react";
import { AudioReader } from "@/components/AudioReader";
import { greatGatsbyChapter1 } from "@/lib/audioData";

const Reader = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();

  // In a real app, we'd fetch the chapter data based on ID
  // For now, we'll use our hardcoded chapter if it matches, otherwise default to it for demo
  const chapterData = chapterId === "gatsby-ch1" ? greatGatsbyChapter1 : greatGatsbyChapter1;

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
        <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Audio Reader Component */}
      <AudioReader chapterData={chapterData} />
    </div>
  );
};

export default Reader;
