import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useReadingSettings } from "@/contexts/ReadingSettingsContext";

interface ReadingCustomizerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReadingCustomizerModal = ({ open, onOpenChange }: ReadingCustomizerModalProps) => {
  const { settings, updateSettings, resetSettings } = useReadingSettings();

  const fonts = [
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Comic Sans MS', label: 'Comic Sans' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Georgia', label: 'Georgia' },
  ] as const;

  const letterSpacingOptions = [
    { value: 'normal', label: 'Normal', numValue: 0 },
    { value: 'relaxed', label: 'Relaxed', numValue: 1 },
    { value: 'wide', label: 'Wide', numValue: 2 },
  ] as const;

  const lineHeightOptions = [
    { value: 'normal', label: 'Normal', numValue: 0 },
    { value: 'comfortable', label: 'Comfortable', numValue: 1 },
    { value: 'spacious', label: 'Spacious', numValue: 2 },
  ] as const;

  const textSizeOptions = [
    { value: 'normal', label: 'Normal', numValue: 0 },
    { value: 'large', label: 'Large', numValue: 1 },
    { value: 'extra-large', label: 'Extra Large', numValue: 2 },
  ] as const;

  const backgroundColors = [
    { value: 'none', label: 'None', color: 'transparent', border: true as const },
    { value: 'cream', label: 'Cream', color: '#FFF8E7', border: false as const },
    { value: 'blue', label: 'Blue', color: '#E3F2FD', border: false as const },
    { value: 'yellow', label: 'Yellow', color: '#FFFDE7', border: false as const },
  ] as const;

  const textColors = [
    { value: 'black', label: 'Black', color: '#000000' },
    { value: 'gray', label: 'Dark Gray', color: '#333333' },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Reading</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Font Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              📝 Font Style
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {fonts.map((font) => (
                <button
                  key={font.value}
                  onClick={() => updateSettings({ fontFamily: font.value })}
                  className={`p-3 rounded-md border-2 transition-all ${
                    settings.fontFamily === font.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Spacing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              📏 Text Spacing
            </h3>

            {/* Letter Spacing */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Letter Spacing</span>
                <span className="text-muted-foreground">
                  {letterSpacingOptions.find(o => o.value === settings.letterSpacing)?.label}
                </span>
              </div>
              <Slider
                value={[letterSpacingOptions.find(o => o.value === settings.letterSpacing)?.numValue || 0]}
                max={2}
                step={1}
                onValueChange={(value) => {
                  const option = letterSpacingOptions[value[0]];
                  updateSettings({ letterSpacing: option.value });
                }}
              />
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span className="text-muted-foreground">
                  {lineHeightOptions.find(o => o.value === settings.lineHeight)?.label}
                </span>
              </div>
              <Slider
                value={[lineHeightOptions.find(o => o.value === settings.lineHeight)?.numValue || 0]}
                max={2}
                step={1}
                onValueChange={(value) => {
                  const option = lineHeightOptions[value[0]];
                  updateSettings({ lineHeight: option.value });
                }}
              />
            </div>

            {/* Text Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Text Size</span>
                <span className="text-muted-foreground">
                  {textSizeOptions.find(o => o.value === settings.textSize)?.label}
                </span>
              </div>
              <Slider
                value={[textSizeOptions.find(o => o.value === settings.textSize)?.numValue || 0]}
                max={2}
                step={1}
                onValueChange={(value) => {
                  const option = textSizeOptions[value[0]];
                  updateSettings({ textSize: option.value });
                }}
              />
            </div>
          </div>

          {/* Visual Comfort */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              🎨 Visual Comfort
            </h3>

            {/* Background Color */}
            <div className="space-y-2">
              <span className="text-sm">Background</span>
              <div className="grid grid-cols-4 gap-2">
                {backgroundColors.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => updateSettings({ backgroundColor: bg.value })}
                    className={`h-12 rounded-md transition-all ${
                      settings.backgroundColor === bg.value
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'hover:ring-2 hover:ring-primary/50'
                    } ${bg.border ? 'border-2 border-border' : ''}`}
                    style={{ backgroundColor: bg.color }}
                    title={bg.label}
                  />
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-2">
              <span className="text-sm">Text Color</span>
              <div className="flex gap-2">
                {textColors.map((tc) => (
                  <button
                    key={tc.value}
                    onClick={() => updateSettings({ textColor: tc.value })}
                    className={`flex-1 p-3 rounded-md border-2 transition-all ${
                      settings.textColor === tc.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: tc.color }}
                      />
                      <span className="text-sm">{tc.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={resetSettings}
            className="w-full"
          >
            Reset to Default
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
