import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
import TrustSignals from './components/TrustSignals';

const LoginPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ['en', 'hi', 'ta']?.includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('loginTime', new Date()?.toISOString());
      
      // Navigate to dashboard
      navigate('/content-generation-dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = {
    en: 'Sign In - KalaConnect AI',
    hi: 'साइन इन - कलाकनेक्ट AI',
    ta: 'உள்நுழையுங்கள் - கலாகனெக்ட் AI'
  };

  const pageDescription = {
    en: 'Sign in to KalaConnect AI - Empowering Indian artisans with AI-powered content generation for cultural heritage crafts',
    hi: 'कलाकनेक्ट AI में साइन इन करें - सांस्कृतिक विरासत शिल्प के लिए AI-संचालित सामग्री निर्माण के साथ भारतीय कारीगरों को सशक्त बनाना',
    ta: 'கலாகனெக்ட் AI இல் உள்நுழையுங்கள் - கலாச்சார பாரம்பரிய கைவினைகளுக்கான AI-இயங்கும் உள்ளடக்க உருவாக்கத்துடன் இந்திய கைவினைஞர்களை மேம்படுத்துதல்'
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle?.[selectedLanguage] || pageTitle?.en}</title>
        <meta name="description" content={pageDescription?.[selectedLanguage] || pageDescription?.en} />
        <meta name="keywords" content="KalaConnect AI, Indian artisans, cultural heritage, login, authentication" />
        <meta property="og:title" content={pageTitle?.[selectedLanguage] || pageTitle?.en} />
        <meta property="og:description" content={pageDescription?.[selectedLanguage] || pageDescription?.en} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/login" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-heading font-semibold text-foreground">
                KalaConnect AI
              </h1>
              <p className="text-xs text-text-secondary font-caption">
                Cultural Heritage Marketplace
              </p>
            </div>
          </div>
          
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg">
            {/* Cultural Heritage Pattern */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-6 shadow-medium">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* Login Form */}
            <div className="bg-surface border border-border rounded-2xl shadow-medium p-8">
              <LoginForm
                selectedLanguage={selectedLanguage}
                isLoading={isLoading}
                onSubmit={handleLogin}
              />
            </div>

            {/* Trust Signals */}
            <div className="mt-8">
              <TrustSignals selectedLanguage={selectedLanguage} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 px-6 border-t border-border bg-surface">
          <p className="text-xs text-text-secondary">
            © {new Date()?.getFullYear()} KalaConnect AI. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <button className="text-xs text-text-secondary hover:text-foreground transition-cultural">
              Privacy Policy
            </button>
            <span className="text-xs text-border">•</span>
            <button className="text-xs text-text-secondary hover:text-foreground transition-cultural">
              Terms of Service
            </button>
            <span className="text-xs text-border">•</span>
            <button className="text-xs text-text-secondary hover:text-foreground transition-cultural">
              Support
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;