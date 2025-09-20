import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' }
  ];

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
    localStorage.setItem('selectedLanguage', languageCode);
    setIsOpen(false);
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-surface shadow-soft"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLang?.nativeName}
        </span>
        <Icon name="ChevronDown" size={16} />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium z-100">
          <div className="py-1">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-cultural ${
                  currentLanguage === language?.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-popover-foreground hover:bg-muted'
                }`}
              >
                <span className="text-lg">{language?.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{language?.nativeName}</div>
                  <div className="text-xs opacity-70">{language?.name}</div>
                </div>
                {currentLanguage === language?.code && (
                  <Icon name="Check" size={16} />
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