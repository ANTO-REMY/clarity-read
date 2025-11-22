import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Check } from "lucide-react";

const themes = [
  {
    id: "cream",
    name: "Warm Cream",
    description: "Easy on the eyes, reduces glare",
    bg: "bg-[#f9f5ed]",
    text: "text-[#2d3436]",
    highlight: "bg-[#fff3cd]",
    sample: "The gentle reader discovers meaning in every word."
  },
  {
    id: "blue",
    name: "Soft Blue",
    description: "Calming and focused",
    bg: "bg-[#e3f2fd]",
    text: "text-[#1a237e]",
    highlight: "bg-[#fff9c4]",
    sample: "The gentle reader discovers meaning in every word."
  },
  {
    id: "mint",
    name: "Mint Fresh",
    description: "Refreshing and clear",
    bg: "bg-[#e8f5e9]",
    text: "text-[#1b5e20]",
    highlight: "bg-[#ffecb3]",
    sample: "The gentle reader discovers meaning in every word."
  },
  {
    id: "dark",
    name: "High Contrast Dark",
    description: "OLED-friendly, reduces eye strain",
    bg: "bg-[#1a1a1a]",
    text: "text-[#f5f5f5]",
    highlight: "bg-[#ffd54f]",
    sample: "The gentle reader discovers meaning in every word."
  },
];

const ColorTheme = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("cream");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Choose Your Color Theme
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick the background color that's most comfortable
          </p>
        </div>

        <div className="space-y-4">
          {themes.map((theme) => (
            <Card
              key={theme.id}
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedTheme === theme.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTheme === theme.id 
                      ? "border-primary bg-primary" 
                      : "border-muted-foreground"
                  }`}>
                    {selectedTheme === theme.id && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>
                  <div className={`${theme.bg} p-6 rounded-md space-y-2`}>
                    <p className={`${theme.text} text-lg leading-relaxed`}>
                      {theme.sample}
                    </p>
                    <div className={`${theme.highlight} ${theme.text} px-3 py-1 rounded inline-block`}>
                      Highlighted text
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/font-selection")}
            className="flex-1"
          >
            Back
          </Button>
          <Button 
            onClick={() => navigate("/library")}
            className="flex-1"
          >
            Start Reading
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;
