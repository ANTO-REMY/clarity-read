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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center gap-2">
            Welcome! 👋
          </DialogTitle>
          <DialogDescription className="text-lg pt-6 leading-relaxed">
            Customize your reading experience for better comfort and focus. 
            Choose fonts, spacing, and colors that work best for you.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-6">
          <Button
            onClick={handleCustomizeNow}
            className="w-full h-14 text-lg font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Customize Now
          </Button>
          <Button
            onClick={handleMaybeLater}
            variant="outline"
            className="w-full h-14 text-lg font-medium focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
