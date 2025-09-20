import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const languageMenuRef = useRef(null);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const navigationItems = [
    { 
      path: '/content-generation-dashboard', 
      label: 'Dashboard',
      icon: 'LayoutDashboard'
    },
    { 
      path: '/content-history', 
      label: 'History',
      icon: 'History'
    },
    { 
      path: '/profile-settings', 
      label: 'Profile',
      icon: 'User'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
      if (languageMenuRef?.current && !languageMenuRef?.current?.contains(event?.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsLanguageMenuOpen(false);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const currentLanguage = languages?.find(lang => lang?.code === selectedLanguage);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/content-generation-dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                KalaConnect AI
              </h1>
              <p className="text-xs text-text-secondary font-caption">
                Cultural Heritage Marketplace
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-cultural ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={languageMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">{currentLanguage?.flag}</span>
              <span className="hidden sm:inline text-sm">{currentLanguage?.name}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-medium z-200">
                <div className="py-1">
                  {languages?.map((language) => (
                    <button
                      key={language?.code}
                      onClick={() => handleLanguageChange(language?.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-cultural ${
                        selectedLanguage === language?.code
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <span className="text-lg">{language?.flag}</span>
                      <span>{language?.name}</span>
                      {selectedLanguage === language?.code && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account Menu */}
          <div className="relative" ref={userMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">Artisan</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-medium z-200">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">Artisan Account</p>
                  <p className="text-xs text-muted-foreground">artisan@kalaconnect.ai</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile-settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-cultural"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Profile Settings</span>
                  </Link>
                  <Link
                    to="/content-history"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-cultural"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="History" size={16} />
                    <span>Content History</span>
                  </Link>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Handle logout
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-muted transition-cultural"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-cultural ${
                isActiveRoute(item?.path)
                  ? 'text-primary' :'text-text-secondary'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;