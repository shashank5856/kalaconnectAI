import React from 'react';
import Icon from '../../../components/AppIcon';

const CulturalTrustBadges = ({ currentLanguage }) => {
  const translations = {
    en: {
      verifiedPlatform: "Verified Heritage Platform",
      authenticCrafts: "Authentic Indian Crafts",
      artisanSupport: "Supporting Local Artisans",
      culturalPreservation: "Cultural Preservation Initiative"
    },
    hi: {
      verifiedPlatform: "सत्यापित विरासत मंच",
      authenticCrafts: "प्रामाणिक भारतीय शिल्प",
      artisanSupport: "स्थानीय कारीगरों का समर्थन",
      culturalPreservation: "सांस्कृतिक संरक्षण पहल"
    },
    ta: {
      verifiedPlatform: "சரிபார்க்கப்பட்ட பாரம்பரிய தளம்",
      authenticCrafts: "உண்மையான இந்திய கைவினைப்பொருட்கள்",
      artisanSupport: "உள்ளூர் கைவினைஞர்களை ஆதரித்தல்",
      culturalPreservation: "கலாச்சார பாதுகாப்பு முயற்சி"
    }
  };

  const t = translations?.[currentLanguage];

  const badges = [
    {
      icon: "Shield",
      text: t?.verifiedPlatform,
      color: "text-success"
    },
    {
      icon: "Award",
      text: t?.authenticCrafts,
      color: "text-primary"
    },
    {
      icon: "Heart",
      text: t?.artisanSupport,
      color: "text-accent"
    },
    {
      icon: "Leaf",
      text: t?.culturalPreservation,
      color: "text-secondary"
    }
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
      <div className="bg-surface/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-soft">
        <div className="grid grid-cols-2 gap-3">
          {badges?.map((badge, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-xs"
            >
              <Icon 
                name={badge?.icon} 
                size={14} 
                className={badge?.color}
              />
              <span className="text-text-secondary font-caption">
                {badge?.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Cultural Pattern */}
        <div className="flex items-center justify-center space-x-1 mt-3 opacity-40">
          <div className="w-1 h-1 bg-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
          <div className="w-1 h-1 bg-secondary rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent max-w-16"></div>
          <div className="text-xs font-mono text-text-secondary">
            KalaConnect
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-primary/20 to-transparent max-w-16"></div>
          <div className="w-1 h-1 bg-secondary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
          <div className="w-1 h-1 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CulturalTrustBadges;