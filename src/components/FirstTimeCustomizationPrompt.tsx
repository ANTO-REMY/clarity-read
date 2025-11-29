import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReadingSettings } from "@/contexts/ReadingSettingsContext";

interface FirstTimeCustomizationPromptProps {
  onCustomizeNow: () => void;
}

export const FirstTimeCustomizationPrompt = ({ onCustomizeNow }: FirstTimeCustomizationPromptProps) => {
  const { settings, updateSettings } = useReadingSettings();

  const handleMaybeLater = () => {
    updateSettings({ hasSeenPrompt: true });
  };

  const handleCustomizeNow = () => {
    updateSettings({ hasSeenPrompt: true });
    onCustomizeNow();
  };

  // Don't show if user has already seen the prompt
  if (settings.hasSeenPrompt) {
    return null;
  }

  return (
    <Dialog open={!settings.hasSeenPrompt} onOpenChange={(open) => {
      if (!open) handleMaybeLater();
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            Welcome! 👋
          </DialogTitle>
          <DialogDescription className="text-base pt-4">
            Customize your reading experience for better comfort and focus. 
            Choose fonts, spacing, and colors that work best for you.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleCustomizeNow}
            size="lg"
            className="w-full"
          >
            Customize Now
          </Button>
          <Button
            onClick={handleMaybeLater}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
