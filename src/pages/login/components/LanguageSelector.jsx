import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' }
  ];

  const currentLanguage = languages?.find(lang => lang?.code === selectedLanguage) || languages?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-muted transition-cultural focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium text-foreground">
          {currentLanguage?.nativeName}
        </span>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-text-secondary" 
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium z-200">
          <div className="py-1">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-cultural ${
                  selectedLanguage === language?.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-popover-foreground hover:bg-muted'
                }`}
              >
                <span className="text-lg">{language?.flag}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{language?.nativeName}</p>
                  <p className="text-xs opacity-70">{language?.name}</p>
                </div>
                {selectedLanguage === language?.code && (
                  <Icon name="Check" size={16} className="flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;