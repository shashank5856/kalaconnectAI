import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguagePreferencesSection = ({ languageData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(languageData);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languageOptions = [
    { 
      value: 'en', 
      label: 'English', 
      description: 'English language interface',
      flag: '🇺🇸',
      script: 'Latin'
    },
    { 
      value: 'hi', 
      label: 'हिंदी', 
      description: 'Hindi language interface',
      flag: '🇮🇳',
      script: 'Devanagari'
    },
    { 
      value: 'ta', 
      label: 'தமிழ்', 
      description: 'Tamil language interface',
      flag: '🇮🇳',
      script: 'Tamil'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setFormData(prev => ({
      ...prev,
      defaultLanguage: languageCode
    }));
    
    if (isEditing) {
      localStorage.setItem('selectedLanguage', languageCode);
      setCurrentLanguage(languageCode);
    }
  };

  const handleContentLanguageChange = (languageCode, checked) => {
    setFormData(prev => ({
      ...prev,
      contentLanguages: checked 
        ? [...prev?.contentLanguages, languageCode]
        : prev?.contentLanguages?.filter(lang => lang !== languageCode)
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    localStorage.setItem('selectedLanguage', formData?.defaultLanguage);
    setCurrentLanguage(formData?.defaultLanguage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(languageData);
    setIsEditing(false);
  };

  const getLanguageText = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'भाषा प्राथमिकताएं',
          subtitle: 'अपनी भाषा सेटिंग्स और सामग्री प्राथमिकताएं प्रबंधित करें',
          defaultLang: 'डिफ़ॉल्ट भाषा',
          contentLang: 'सामग्री भाषाएं',
          autoTranslate: 'स्वचालित अनुवाद',
          culturalContext: 'सांस्कृतिक संदर्भ'
        };
      case 'ta':
        return {
          title: 'மொழி விருப்பத்தேர்வுகள்',
          subtitle: 'உங்கள் மொழி அமைப்புகள் மற்றும் உள்ளடக்க விருப்பத்தேர்வுகளை நிர்வகிக்கவும்',
          defaultLang: 'இயல்புநிலை மொழி',
          contentLang: 'உள்ளடக்க மொழிகள்',
          autoTranslate: 'தானியங்கி மொழிபெயர்ப்பு',
          culturalContext: 'கலாச்சார சூழல்'
        };
      default:
        return {
          title: 'Language Preferences',
          subtitle: 'Manage your language settings and content preferences',
          defaultLang: 'Default Language',
          contentLang: 'Content Languages',
          autoTranslate: 'Auto Translation',
          culturalContext: 'Cultural Context'
        };
    }
  };

  const text = getLanguageText();

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="Languages" size={20} className="text-secondary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">{text?.title}</h2>
            <p className="text-sm text-text-secondary">{text?.subtitle}</p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Default Language Selection */}
        <div>
          <Select
            label={text?.defaultLang}
            description="Primary language for the application interface"
            options={languageOptions?.map(lang => ({
              value: lang?.value,
              label: `${lang?.flag} ${lang?.label}`,
              description: `${lang?.description} (${lang?.script} script)`
            }))}
            value={formData?.defaultLanguage}
            onChange={handleLanguageChange}
            disabled={!isEditing}
          />
        </div>

        {/* Content Generation Languages */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {text?.contentLang}
          </label>
          <p className="text-xs text-text-secondary mb-4">
            Select languages for AI-generated content about your crafts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {languageOptions?.map((language) => (
              <div key={language?.value} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-cultural">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{language?.flag}</span>
                  <div className="flex-1">
                    <Checkbox
                      label={language?.label}
                      description={`${language?.script} script support`}
                      checked={formData?.contentLanguages?.includes(language?.value)}
                      onChange={(e) => handleContentLanguageChange(language?.value, e?.target?.checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Language Settings */}
        <div className="space-y-4">
          <Checkbox
            label={text?.autoTranslate}
            description="Automatically translate content when switching languages"
            checked={formData?.autoTranslate}
            onChange={(e) => setFormData(prev => ({ ...prev, autoTranslate: e?.target?.checked }))}
            disabled={!isEditing}
          />

          <Checkbox
            label={text?.culturalContext}
            description="Include cultural context and regional information in translations"
            checked={formData?.culturalContext}
            onChange={(e) => setFormData(prev => ({ ...prev, culturalContext: e?.target?.checked }))}
            disabled={!isEditing}
          />

          <Checkbox
            label="Regional Dialect Support"
            description="Enable support for regional dialects and local expressions"
            checked={formData?.dialectSupport}
            onChange={(e) => setFormData(prev => ({ ...prev, dialectSupport: e?.target?.checked }))}
            disabled={!isEditing}
          />
        </div>

        {/* Language Support Indicator */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Globe" size={16} className="text-text-secondary" />
            <h3 className="text-sm font-medium text-foreground">Script Support Status</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {languageOptions?.map((lang) => (
              <div key={lang?.value} className="flex items-center justify-between p-2 bg-card rounded border border-border">
                <div className="flex items-center space-x-2">
                  <span>{lang?.flag}</span>
                  <span className="text-sm font-medium">{lang?.script}</span>
                </div>
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={14} />
                  <span className="text-xs">Supported</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagePreferencesSection;