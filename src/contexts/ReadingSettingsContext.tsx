import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// TypeScript interfaces
export interface ReadingSettings {
  fontFamily: 'Verdana' | 'Comic Sans MS' | 'Arial' | 'Georgia';
  letterSpacing: 'normal' | 'relaxed' | 'wide';
  lineHeight: 'normal' | 'comfortable' | 'spacious';
  textSize: 'normal' | 'large' | 'extra-large';
  backgroundColor: 'none' | 'cream' | 'blue' | 'yellow';
  textColor: 'black' | 'gray';
  hasSeenPrompt: boolean;
}

interface ReadingSettingsContextType {
  settings: ReadingSettings;
  updateSettings: (newSettings: Partial<ReadingSettings>) => void;
  resetSettings: () => void;
  getTextStyles: () => React.CSSProperties;
}

// Default settings
const defaultSettings: ReadingSettings = {
  fontFamily: 'Arial',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  textSize: 'normal',
  backgroundColor: 'none',
  textColor: 'black',
  hasSeenPrompt: false,
};

// Create context
const ReadingSettingsContext = createContext<ReadingSettingsContextType | undefined>(undefined);

// Local storage key
const STORAGE_KEY = 'reading-settings';

// Provider component
export const ReadingSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ReadingSettings>(() => {
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Error loading reading settings:', error);
    }
    return defaultSettings;
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving reading settings:', error);
    }
  }, [settings]);

  // Update settings
  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings({ ...defaultSettings, hasSeenPrompt: settings.hasSeenPrompt });
  };

  // Convert settings to CSS styles
  const getTextStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      fontFamily: settings.fontFamily,
    };

    // Letter spacing
    switch (settings.letterSpacing) {
      case 'normal':
        styles.letterSpacing = '0';
        break;
      case 'relaxed':
        styles.letterSpacing = '0.05em';
        break;
      case 'wide':
        styles.letterSpacing = '0.1em';
        break;
    }

    // Line height
    switch (settings.lineHeight) {
      case 'normal':
        styles.lineHeight = '1.5';
        break;
      case 'comfortable':
        styles.lineHeight = '1.8';
        break;
      case 'spacious':
        styles.lineHeight = '2.2';
        break;
    }

    // Text size
    switch (settings.textSize) {
      case 'normal':
        styles.fontSize = '18px';
        break;
      case 'large':
        styles.fontSize = '22px';
        break;
      case 'extra-large':
        styles.fontSize = '26px';
        break;
    }

    // Background color
    switch (settings.backgroundColor) {
      case 'none':
        styles.backgroundColor = 'transparent';
        break;
      case 'cream':
        styles.backgroundColor = '#FFF8E7';
        break;
      case 'blue':
        styles.backgroundColor = '#E3F2FD';
        break;
      case 'yellow':
        styles.backgroundColor = '#FFFDE7';
        break;
    }

    // Text color
    switch (settings.textColor) {
      case 'black':
        styles.color = '#000000';
        break;
      case 'gray':
        styles.color = '#333333';
        break;
    }

    return styles;
  };

  const value: ReadingSettingsContextType = {
    settings,
    updateSettings,
    resetSettings,
    getTextStyles,
  };

  return (
    <ReadingSettingsContext.Provider value={value}>
      {children}
    </ReadingSettingsContext.Provider>
  );
};

// Custom hook
export const useReadingSettings = (): ReadingSettingsContextType => {
  const context = useContext(ReadingSettingsContext);
  if (!context) {
    throw new Error('useReadingSettings must be used within ReadingSettingsProvider');
  }
  return context;
};
