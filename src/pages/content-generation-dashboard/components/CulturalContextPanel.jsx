import React from 'react';
import Icon from '../../../components/AppIcon';

const CulturalContextPanel = ({ craftInfo, selectedLanguage }) => {
  // Mock cultural context data based on keywords or craft type
  const mockCulturalData = {
    craftOrigin: {
      region: "Madhya Pradesh, India",
      historicalPeriod: "Ancient Indus Valley Civilization (3300-1300 BCE)",
      significance: "Traditional pottery techniques passed down through generations"
    },
    techniques: [
      {
        name: "Hand Molding",
        description: "Clay shaped entirely by hand without potter\'s wheel",
        culturalNote: "Represents the intimate connection between artisan and earth"
      },
      {
        name: "Natural Firing",
        description: "Fired in traditional kilns using organic materials",
        culturalNote: "Eco-friendly methods preserving ancient wisdom"
      }
    ],
    culturalSymbols: [
      {
        symbol: "Lotus Motif",
        meaning: "Purity and spiritual awakening in Hindu tradition",
        usage: "Commonly carved or painted on pottery surfaces"
      },
      {
        symbol: "Geometric Patterns",
        meaning: "Representation of cosmic order and harmony",
        usage: "Traditional border designs and decorative elements"
      }
    ],
    festivals: [
      {
        name: "Karva Chauth",
        significance: "Special pottery items created for this festival",
        tradition: "Women use decorated clay pots in ceremonial rituals"
      }
    ]
  };

  const getLanguageText = (key) => {
    const translations = {
      en: {
        title: "Cultural Heritage Context",
        craftOrigin: "Craft Origin & History",
        techniques: "Traditional Techniques",
        symbols: "Cultural Symbols & Meanings",
        festivals: "Festival Connections",
        region: "Region",
        period: "Historical Period",
        significance: "Cultural Significance"
      },
      hi: {
        title: "सांस्कृतिक विरासत संदर्भ",
        craftOrigin: "शिल्प मूल और इतिहास",
        techniques: "पारंपरिक तकनीकें",
        symbols: "सांस्कृतिक प्रतीक और अर्थ",
        festivals: "त्योहार संबंध",
        region: "क्षेत्र",
        period: "ऐतिहासिक काल",
        significance: "सांस्कृतिक महत्व"
      },
      ta: {
        title: "கலாச்சார பாரம்பரிய சூழல்",
        craftOrigin: "கைவினை தோற்றம் மற்றும் வரலாறு",
        techniques: "பாரம்பரிய நுட்பங்கள்",
        symbols: "கலாச்சார சின்னங்கள் மற்றும் அர்த்தங்கள்",
        festivals: "திருவிழா தொடர்புகள்",
        region: "பகுதி",
        period: "வரலாற்று காலம்",
        significance: "கலாச்சார முக்கியத்துவம்"
      }
    };
    return translations?.[selectedLanguage]?.[key] || translations?.en?.[key];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Landmark" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {getLanguageText('title')}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Craft Origin & History */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-accent" />
            <h4 className="text-sm font-heading font-semibold text-foreground">
              {getLanguageText('craftOrigin')}
            </h4>
          </div>
          
          <div className="space-y-3 pl-6">
            <div className="space-y-1">
              <p className="text-xs font-medium text-text-secondary">
                {getLanguageText('region')}
              </p>
              <p className="text-sm text-foreground">
                {mockCulturalData?.craftOrigin?.region}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-text-secondary">
                {getLanguageText('period')}
              </p>
              <p className="text-sm text-foreground">
                {mockCulturalData?.craftOrigin?.historicalPeriod}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-text-secondary">
                {getLanguageText('significance')}
              </p>
              <p className="text-sm text-foreground">
                {mockCulturalData?.craftOrigin?.significance}
              </p>
            </div>
          </div>
        </div>

        {/* Traditional Techniques */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Wrench" size={16} className="text-secondary" />
            <h4 className="text-sm font-heading font-semibold text-foreground">
              {getLanguageText('techniques')}
            </h4>
          </div>
          
          <div className="space-y-3 pl-6">
            {mockCulturalData?.techniques?.map((technique, index) => (
              <div key={index} className="p-3 bg-muted rounded-md border border-border">
                <p className="text-sm font-medium text-foreground mb-1">
                  {technique?.name}
                </p>
                <p className="text-xs text-text-secondary mb-2">
                  {technique?.description}
                </p>
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={12} className="text-primary mt-0.5" />
                  <p className="text-xs text-primary">
                    {technique?.culturalNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Symbols */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-accent" />
            <h4 className="text-sm font-heading font-semibold text-foreground">
              {getLanguageText('symbols')}
            </h4>
          </div>
          
          <div className="space-y-2 pl-6">
            {mockCulturalData?.culturalSymbols?.map((symbol, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 bg-accent/5 rounded-md">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Sparkles" size={12} className="text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {symbol?.symbol}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {symbol?.meaning}
                  </p>
                  <p className="text-xs text-accent">
                    {symbol?.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Festival Connections */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <h4 className="text-sm font-heading font-semibold text-foreground">
              {getLanguageText('festivals')}
            </h4>
          </div>
          
          <div className="space-y-2 pl-6">
            {mockCulturalData?.festivals?.map((festival, index) => (
              <div key={index} className="p-3 bg-primary/5 rounded-md border border-primary/20">
                <p className="text-sm font-medium text-foreground mb-1">
                  {festival?.name}
                </p>
                <p className="text-xs text-text-secondary mb-2">
                  {festival?.significance}
                </p>
                <p className="text-xs text-primary">
                  {festival?.tradition}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Heritage Footer */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
            <Icon name="Heart" size={12} className="text-accent" />
            <span>Celebrating India's rich cultural heritage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalContextPanel;