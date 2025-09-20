import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = ({ selectedLanguage }) => {
  const content = {
    en: {
      secureConnection: 'Secure Connection',
      authenticityBadge: 'Indian Cultural Authenticity',
      artisanVerified: 'Artisan Verified Platform',
      dataProtection: 'Your data is protected with industry-standard encryption'
    },
    hi: {
      secureConnection: 'सुरक्षित कनेक्शन',
      authenticityBadge: 'भारतीय सांस्कृतिक प्रामाणिकता',
      artisanVerified: 'कारीगर सत्यापित मंच',
      dataProtection: 'आपका डेटा उद्योग-मानक एन्क्रिप्शन के साथ सुरक्षित है'
    },
    ta: {
      secureConnection: 'பாதுகாப்பான இணைப்பு',
      authenticityBadge: 'இந்திய கலாச்சார நம்பகத்தன்மை',
      artisanVerified: 'கைவினைஞர் சரிபார்க்கப்பட்ட தளம்',
      dataProtection: 'உங்கள் தரவு தொழில்துறை தரநிலை குறியாக்கத்துடன் பாதுகாக்கப்படுகிறது'
    }
  };

  const t = content?.[selectedLanguage] || content?.en;

  const trustItems = [
    {
      icon: 'Shield',
      text: t?.secureConnection,
      color: 'text-success'
    },
    {
      icon: 'Award',
      text: t?.authenticityBadge,
      color: 'text-primary'
    },
    {
      icon: 'CheckCircle',
      text: t?.artisanVerified,
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-4">
        {trustItems?.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg"
          >
            <Icon name={item?.icon} size={16} className={item?.color} />
            <span className="text-xs font-medium text-foreground">
              {item?.text}
            </span>
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
        <Icon name="Lock" size={16} className="text-text-secondary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          {t?.dataProtection}
        </p>
      </div>
      {/* Cultural Heritage Motif */}
      <div className="flex items-center justify-center space-x-2 opacity-60">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-3 h-3 bg-accent rounded-full"></div>
        <div className="w-2 h-2 bg-secondary rounded-full"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 max-w-16"></div>
        <div className="w-2 h-2 bg-secondary rounded-full"></div>
        <div className="w-3 h-3 bg-accent rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default TrustSignals;