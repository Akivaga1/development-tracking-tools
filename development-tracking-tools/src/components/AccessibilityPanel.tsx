import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccessibility } from '@/hooks/useAccessibility';
import { 
  Accessibility, 
  Type, 
  Eye, 
  Keyboard, 
  Volume2, 
  Zap,
  Settings
} from 'lucide-react';

export function AccessibilityPanel() {
  const { settings, updateSetting, announceToScreenReader } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingChange = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    updateSetting(key, value);
    announceToScreenReader(`${key} setting changed to ${value}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 bg-background border-2 shadow-strong"
          aria-label="Open accessibility settings"
          title="Accessibility Settings (Alt+A)"
        >
          <Accessibility className="w-4 h-4 mr-1" />
          A11y
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-96 overflow-y-auto"
        aria-label="Accessibility settings panel"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center text-lg">
            <Accessibility className="w-5 h-5 mr-2" />
            Accessibility Settings
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Visual Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Visual
              </CardTitle>
              <CardDescription>Adjust visual presentation for better readability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="font-size" className="text-sm font-medium">
                  Font Size
                </label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value) => handleSettingChange('fontSize', value as any)}
                >
                  <SelectTrigger id="font-size" aria-label="Select font size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="contrast" className="text-sm font-medium">
                  Contrast Mode
                </label>
                <Select
                  value={settings.contrast}
                  onValueChange={(value) => handleSettingChange('contrast', value as any)}
                >
                  <SelectTrigger id="contrast" aria-label="Select contrast mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High Contrast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="reduce-motion" className="text-sm font-medium">
                    Reduce Motion
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) => handleSettingChange('reduceMotion', checked)}
                  aria-label="Toggle reduced motion"
                />
              </div>
            </CardContent>
          </Card>

          {/* Navigation Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Keyboard className="w-4 h-4 mr-2" />
                Navigation
              </CardTitle>
              <CardDescription>Configure input and navigation preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="keyboard-nav" className="text-sm font-medium">
                    Keyboard Navigation
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Enhanced keyboard shortcuts and focus indicators
                  </p>
                </div>
                <Switch
                  id="keyboard-nav"
                  checked={settings.keyboardNavigation}
                  onCheckedChange={(checked) => handleSettingChange('keyboardNavigation', checked)}
                  aria-label="Toggle keyboard navigation"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="voice-commands" className="text-sm font-medium">
                    Voice Commands
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Enable voice control for navigation
                  </p>
                </div>
                <Switch
                  id="voice-commands"
                  checked={settings.voiceCommands}
                  onCheckedChange={(checked) => handleSettingChange('voiceCommands', checked)}
                  aria-label="Toggle voice commands"
                />
              </div>
            </CardContent>
          </Card>

          {/* Screen Reader Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Volume2 className="w-4 h-4 mr-2" />
                Screen Reader
              </CardTitle>
              <CardDescription>Configure assistive technology support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="screen-reader" className="text-sm font-medium">
                    Announcements
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Enable status announcements for screen readers
                  </p>
                </div>
                <Switch
                  id="screen-reader"
                  checked={settings.screenReaderAnnouncements}
                  onCheckedChange={(checked) => handleSettingChange('screenReaderAnnouncements', checked)}
                  aria-label="Toggle screen reader announcements"
                />
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Main Navigation:</span>
                  <Badge variant="secondary">Alt + M</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Main Content:</span>
                  <Badge variant="secondary">Alt + C</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Search:</span>
                  <Badge variant="secondary">Alt + S</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Accessibility:</span>
                  <Badge variant="secondary">Alt + A</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}