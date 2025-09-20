import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const LanguageSelectionPanel = ({ selectedLanguage, onLanguageChange, isGenerating }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { 
      value: 'en', 
      label: 'English', 
      flag: '🇺🇸',
      description: 'Generate content in English'
    },
    { 
      value: 'hi', 
      label: 'हिंदी (Hindi)', 
      flag: '🇮🇳',
      description: 'हिंदी में सामग्री बनाएं'
    },
    { 
      value: 'ta', 
      label: 'தமிழ் (Tamil)', 
      flag: '🇮🇳',
      description: 'தமிழில் உள்ளடக்கத்தை உருவாக்கவும்'
    }
  ];

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    onLanguageChange(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const getCurrentLanguageInfo = () => {
    return languages?.find(lang => lang?.value === currentLanguage) || languages?.[0];
  };

  const languageInfo = getCurrentLanguageInfo();

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Globe" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Content Language
        </h3>
      </div>
      <div className="space-y-4">
        <Select
          label="Select generation language"
          description="Choose the language for AI-generated content"
          options={languages}
          value={currentLanguage}
          onChange={handleLanguageChange}
          disabled={isGenerating}
          placeholder="Choose language..."
        />

        {/* Current Language Display */}
        <div className="p-4 bg-primary/5 rounded-md border border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{languageInfo?.flag}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Selected: {languageInfo?.label}
              </p>
              <p className="text-xs text-text-secondary">
                {languageInfo?.description}
              </p>
            </div>
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        </div>

        {/* Language Features */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Language-specific features:
          </p>
          
          <div className="grid gap-2">
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-md">
              <Icon name="MessageSquare" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Cultural storytelling in native language
              </span>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-md">
              <Icon name="Hash" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Localized hashtags and social media content
              </span>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-md">
              <Icon name="BookOpen" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Regional heritage context and history
              </span>
            </div>
          </div>
        </div>

        {/* Cultural Heritage Note */}
        <div className="p-4 bg-secondary/5 rounded-md border border-secondary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Heart" size={16} className="text-secondary mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Preserving Cultural Authenticity
              </p>
              <p className="text-xs text-text-secondary">
                Our AI respects traditional terminology and cultural nuances specific to each language and region.
              </p>
            </div>
          </div>
        </div>

        {/* Script Support Info */}
        {(currentLanguage === 'hi' || currentLanguage === 'ta') && (
          <div className="p-3 bg-accent/5 rounded-md border border-accent/20">
            <div className="flex items-center space-x-2">
              <Icon name="Type" size={14} className="text-accent" />
              <p className="text-xs text-foreground">
                {currentLanguage === 'hi' ?'Devanagari script support enabled' :'Tamil script support enabled'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelectionPanel;