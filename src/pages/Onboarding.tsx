import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <BookOpen className="w-20 h-20 text-primary" strokeWidth={1.5} />
            <Sparkles className="w-8 h-8 text-accent absolute -top-2 -right-2" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground tracking-wide">
            Welcome to Clarify
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed px-4">
            An audiobook experience designed for active reading and comprehension
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <div className="bg-card border border-border rounded-lg p-6 text-left space-y-3">
            <h3 className="font-semibold text-lg text-card-foreground">
              ✨ What makes Clarify different?
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Synchronized text highlighting as you listen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Instant definitions and sentence breakdowns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Fully customizable reading experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Designed with dyslexic readers in mind</span>
              </li>
            </ul>
          </div>

          <Button 
            onClick={() => navigate("/font-selection")}
            className="w-full h-14 text-lg"
            size="lg"
          >
            Get Started
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          Let's personalize your reading experience
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
