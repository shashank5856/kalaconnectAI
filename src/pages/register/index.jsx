import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LanguageSelector from './components/LanguageSelector';
import CulturalTrustBadges from './components/CulturalTrustBadges';

const Register = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Language Selector */}
      <LanguageSelector 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Registration Form */}
      <RegistrationForm />

      {/* Cultural Trust Badges */}
      <CulturalTrustBadges currentLanguage={currentLanguage} />

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Register;