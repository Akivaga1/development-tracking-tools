import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high';
  keyboardNavigation: boolean;
  screenReaderAnnouncements: boolean;
  voiceCommands: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  announceToScreenReader: (message: string) => void;
  isUsingKeyboard: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  contrast: 'normal',
  keyboardNavigation: true,
  screenReaderAnnouncements: true,
  voiceCommands: false,
  reduceMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const announceToScreenReader = (message: string) => {
    if (!settings.screenReaderAnnouncements) return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  useEffect(() => {
    // Apply font size
    const rootElement = document.documentElement;
    rootElement.setAttribute('data-font-size', settings.fontSize);
    
    // Apply contrast mode
    rootElement.setAttribute('data-contrast', settings.contrast);
    
    // Apply reduced motion
    if (settings.reduceMotion) {
      rootElement.style.setProperty('--transition-duration', '0ms');
    } else {
      rootElement.style.removeProperty('--transition-duration');
    }
  }, [settings]);

  useEffect(() => {
    // Keyboard navigation detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsUsingKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
    };

    if (settings.keyboardNavigation) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [settings.keyboardNavigation]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        announceToScreenReader,
        isUsingKeyboard,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// Keyboard shortcuts hook
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + M: Main navigation
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const nav = document.querySelector('[role="navigation"]') as HTMLElement;
        nav?.focus();
      }
      
      // Alt + C: Main content
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        const main = document.querySelector('main') as HTMLElement;
        main?.focus();
      }
      
      // Alt + S: Search
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const search = document.querySelector('[role="searchbox"]') as HTMLElement;
        search?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}