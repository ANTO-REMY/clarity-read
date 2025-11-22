import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Check } from "lucide-react";

const fonts = [
  { 
    id: "lexend", 
    name: "Lexend", 
    description: "Clean and highly readable",
    sample: "The quick brown fox jumps over the lazy dog",
    style: { fontFamily: "Lexend, sans-serif" }
  },
  { 
    id: "comic-sans", 
    name: "Comic Sans", 
    description: "Popular for dyslexia support",
    sample: "The quick brown fox jumps over the lazy dog",
    style: { fontFamily: "'Comic Sans MS', sans-serif" }
  },
  { 
    id: "verdana", 
    name: "Verdana", 
    description: "Wide spacing, clear letterforms",
    sample: "The quick brown fox jumps over the lazy dog",
    style: { fontFamily: "Verdana, sans-serif" }
  },
  { 
    id: "arial", 
    name: "Arial", 
    description: "Simple and familiar",
    sample: "The quick brown fox jumps over the lazy dog",
    style: { fontFamily: "Arial, sans-serif" }
  },
];

const FontSelection = () => {
  const navigate = useNavigate();
  const [selectedFont, setSelectedFont] = useState("lexend");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Choose Your Font
          </h1>
          <p className="text-muted-foreground text-lg">
            Select the font that feels most comfortable for you
          </p>
        </div>

        <div className="space-y-4">
          {fonts.map((font) => (
            <Card
              key={font.id}
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedFont === font.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedFont(font.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedFont === font.id 
                      ? "border-primary bg-primary" 
                      : "border-muted-foreground"
                  }`}>
                    {selectedFont === font.id && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">
                      {font.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {font.description}
                    </p>
                  </div>
                  <div 
                    className="text-xl leading-relaxed text-foreground p-4 bg-muted/30 rounded-md"
                    style={font.style}
                  >
                    {font.sample}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="flex-1"
          >
            Back
          </Button>
          <Button 
            onClick={() => navigate("/color-theme")}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FontSelection;
