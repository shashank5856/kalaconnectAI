import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PersonalInfoSection from './components/PersonalInfoSection';
import CraftSpecializationSection from './components/CraftSpecializationSection';
import LanguagePreferencesSection from './components/LanguagePreferencesSection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import SecuritySettingsSection from './components/SecuritySettingsSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProfileSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('personal');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@kalaconnect.ai",
    phone: "+91 98765 43210",
    userType: "artisan",
    bio: "Traditional pottery artisan from Khurja, specializing in blue pottery and ceramic art with over 15 years of experience.",
    address: "Khurja, Bulandshahr, Uttar Pradesh, India",
    joinDate: "2023-03-15",
    isVerified: true
  });

  const [craftData, setCraftData] = useState({
    specializations: ["pottery", "painting", "textiles"],
    region: "north",
    experience: "expert",
    certifications: [
      { name: "Traditional Pottery Certificate", issuer: "Khurja Pottery Association", verified: true },
      { name: "Blue Pottery Mastery", issuer: "Rajasthan Craft Council", verified: true }
    ],
    badges: [
      { name: "Master Artisan", level: "Gold", earned: "2024-01-15" },
      { name: "Cultural Ambassador", level: "Silver", earned: "2024-06-20" },
      { name: "Heritage Keeper", level: "Bronze", earned: "2023-12-10" },
      { name: "Community Leader", level: "Gold", earned: "2024-08-05" }
    ]
  });

  const [languageData, setLanguageData] = useState({
    defaultLanguage: "en",
    contentLanguages: ["en", "hi"],
    autoTranslate: true,
    culturalContext: true,
    dialectSupport: false
  });

  const [notificationData, setNotificationData] = useState({
    contentGeneration: {
      email: true,
      sms: false,
      inApp: true,
      frequency: "immediate"
    },
    community: {
      email: true,
      sms: false,
      inApp: true,
      frequency: "daily"
    },
    education: {
      email: false,
      sms: false,
      inApp: true,
      frequency: "weekly"
    },
    marketplace: {
      email: true,
      sms: true,
      inApp: true,
      frequency: "immediate"
    },
    security: {
      email: true,
      sms: true,
      inApp: true,
      frequency: "immediate"
    },
    quietHours: {
      start: "21:00",
      end: "09:00"
    },
    weekendNotifications: true,
    festivalReminders: true,
    craftTips: true
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    twoFactorPhone: "+91 98765 43210",
    loginActivity: [
      {
        location: "Mumbai, Maharashtra",
        device: "desktop",
        browser: "Chrome",
        date: "19 Sep 2024",
        time: "2:30 PM",
        current: true
      },
      {
        location: "Khurja, Uttar Pradesh",
        device: "mobile",
        browser: "Safari",
        date: "18 Sep 2024",
        time: "8:45 AM",
        current: false
      },
      {
        location: "Delhi, Delhi",
        device: "desktop",
        browser: "Firefox",
        date: "17 Sep 2024",
        time: "11:20 AM",
        current: false
      }
    ]
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const sections = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      description: 'Basic account information'
    },
    {
      id: 'craft',
      label: 'Craft Specialization',
      icon: 'Palette',
      description: 'Your craft expertise'
    },
    {
      id: 'language',
      label: 'Language',
      icon: 'Languages',
      description: 'Language preferences'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Notification settings'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Account security'
    }
  ];

  const handleUserInfoUpdate = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setHasUnsavedChanges(false);
  };

  const handleCraftDataUpdate = (updatedData) => {
    setCraftData(updatedData);
    setHasUnsavedChanges(false);
  };

  const handleLanguageDataUpdate = (updatedData) => {
    setLanguageData(updatedData);
    setHasUnsavedChanges(false);
  };

  const handleNotificationDataUpdate = (updatedData) => {
    setNotificationData(updatedData);
    setHasUnsavedChanges(false);
  };

  const handleSecurityDataUpdate = (updatedData) => {
    setSecurityData(updatedData);
    setHasUnsavedChanges(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            userInfo={userInfo}
            onUpdate={handleUserInfoUpdate}
          />
        );
      case 'craft':
        return (
          <CraftSpecializationSection
            craftData={craftData}
            onUpdate={handleCraftDataUpdate}
          />
        );
      case 'language':
        return (
          <LanguagePreferencesSection
            languageData={languageData}
            onUpdate={handleLanguageDataUpdate}
          />
        );
      case 'notifications':
        return (
          <NotificationSettingsSection
            notificationData={notificationData}
            onUpdate={handleNotificationDataUpdate}
          />
        );
      case 'security':
        return (
          <SecuritySettingsSection
            securityData={securityData}
            onUpdate={handleSecurityDataUpdate}
          />
        );
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'प्रोफ़ाइल सेटिंग्स';
      case 'ta':
        return 'சுயவிவர அமைப்புகள்';
      default:
        return 'Profile Settings';
    }
  };

  const getPageSubtitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'अपनी खाता जानकारी और प्राथमिकताएं प्रबंधित करें';
      case 'ta':
        return 'உங்கள் கணக்கு தகவல் மற்றும் விருப்பத்தேர்வுகளை நிர்வகிக்கவும்';
      default:
        return 'Manage your account information and preferences';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {getPageTitle()}
                </h1>
                <p className="text-text-secondary">
                  {getPageSubtitle()}
                </p>
              </div>
            </div>

            {/* Cultural Heritage Motif */}
            <div className="flex items-center space-x-2 opacity-60">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-accent/20 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 shadow-soft sticky top-24">
                <h2 className="text-sm font-medium text-foreground mb-4">Settings Categories</h2>
                <nav className="space-y-2">
                  {sections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-cultural ${
                        activeSection === section?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={section?.icon} size={18} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{section?.label}</p>
                        <p className="text-xs opacity-80 truncate">{section?.description}</p>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="text-xs font-medium text-text-secondary mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      className="w-full justify-start"
                    >
                      Export Data
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      iconPosition="left"
                      className="w-full justify-start text-error hover:text-error"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Navigation - Mobile */}
            <div className="lg:hidden mb-6">
              <div className="bg-card rounded-lg border border-border p-4 shadow-soft">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {sections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-cultural ${
                        activeSection === section?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={section?.icon} size={16} />
                      <span className="text-sm font-medium whitespace-nowrap">{section?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {renderActiveSection()}
            </div>
          </div>

          {/* Unsaved Changes Warning */}
          {hasUnsavedChanges && (
            <div className="fixed bottom-4 right-4 bg-warning text-warning-foreground px-4 py-3 rounded-lg shadow-medium border border-warning/20 z-200">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">You have unsaved changes</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setHasUnsavedChanges(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;