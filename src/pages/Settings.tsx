import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Type, 
  Palette, 
  Volume2, 
  Zap,
  Eye,
  ChevronRight
} from "lucide-react";
import { ReadingCustomizerModal } from "@/components/ReadingCustomizerModal";

const settingsSections = [
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    items: [
      { label: "Font Style", value: "Lexend", action: "/font-selection" },
      { label: "Color Theme", value: "Warm Cream", action: "/color-theme" },
      { label: "Text Size", value: "Large" },
    ]
  },
  {
    id: "reading",
    title: "Reading Experience",
    icon: Eye,
    items: [
      { label: "Highlight Speed", value: "Medium" },
      { label: "Lines Visible", value: "3 lines" },
      { label: "Highlight Color", value: "Soft Yellow" },
    ]
  },
  {
    id: "audio",
    title: "Audio Settings",
    icon: Volume2,
    items: [
      { label: "Playback Speed", value: "1.0x" },
      { label: "Voice", value: "Natural (Female)" },
      { label: "Volume", value: "70%" },
    ]
  },
  {
    id: "clarify",
    title: "Clarify Features",
    icon: Zap,
    items: [
      { label: "Auto-pause on Clarify", value: "On" },
      { label: "Definition Complexity", value: "Simple" },
      { label: "Show Examples", value: "On" },
    ]
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [customizerOpen, setCustomizerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3 sticky top-0 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/library")}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Reading Customizer Modal */}
      <ReadingCustomizerModal open={customizerOpen} onOpenChange={setCustomizerOpen} />

      {/* Settings List */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Reading Customization Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <Type className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">
              Reading Customization
            </h2>
          </div>

          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Customize fonts, spacing, and colors to make reading more comfortable.
            </p>
            <Button 
              onClick={() => setCustomizerOpen(true)}
              className="w-full"
            >
              Customize Reading Experience
            </Button>
          </Card>
        </div>

        {settingsSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.id} className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <IconComponent className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg text-foreground">
                  {section.title}
                </h2>
              </div>

              <Card className="divide-y divide-border">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => item.action && navigate(item.action)}
                  >
                    <span className="text-card-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {item.value}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          );
        })}

        {/* About Section */}
        <Card className="p-6 space-y-2 text-center">
          <h3 className="font-semibold text-card-foreground">About Clarify</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Clarify is designed to make reading more accessible and engaging 
            for everyone, with a special focus on dyslexic readers.
          </p>
          <p className="text-xs text-muted-foreground pt-2">
            Version 1.0.0
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
