import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentDetailModal = ({ content, isOpen, onClose, onCopy, onRegenerate }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !content) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageInfo = (language) => {
    const info = {
      'en': { flag: '🇺🇸', name: 'English' },
      'hi': { flag: '🇮🇳', name: 'हिंदी' },
      'ta': { flag: '🇮🇳', name: 'தமிழ்' }
    };
    return info?.[language] || { flag: '🌐', name: language };
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard?.writeText(text);
      onCopy({ ...content, type });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const langInfo = getLanguageInfo(content?.language);

  return (
    <div className="fixed inset-0 z-500 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card border border-border rounded-lg shadow-strong max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{langInfo?.flag}</span>
                <div>
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    {content?.craftType} Content
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Generated on {formatDate(content?.createdAt)} • {langInfo?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRegenerate(content)}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Regenerate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
                iconSize={20}
              />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-6">
              {/* Image and Keywords */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="lg:w-1/3">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                    <Image
                      src={content?.image}
                      alt={`${content?.craftType} craft`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Keywords Used:</h3>
                    <div className="flex flex-wrap gap-2">
                      {content?.keywords?.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generated Content */}
                <div className="lg:w-2/3 space-y-6">
                  {/* Product Story */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <Icon name="BookOpen" size={16} />
                        <span>Product Story</span>
                      </h3>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => copyToClipboard(content?.productStory, 'Product Story')}
                        iconName="Copy"
                        iconSize={14}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {content?.productStory}
                      </p>
                    </div>
                  </div>

                  {/* Social Media Caption */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <Icon name="Share2" size={16} />
                        <span>Social Media Caption</span>
                      </h3>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => copyToClipboard(content?.socialCaption, 'Social Caption')}
                        iconName="Copy"
                        iconSize={14}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {content?.socialCaption}
                      </p>
                    </div>
                  </div>

                  {/* Cultural Context */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <Icon name="Compass" size={16} />
                        <span>Cultural Heritage Context</span>
                      </h3>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => copyToClipboard(content?.culturalContext, 'Cultural Context')}
                        iconName="Copy"
                        iconSize={14}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {content?.culturalContext}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generation Parameters */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Settings" size={16} />
                  <span>Generation Parameters</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Language:</span>
                    <span className="ml-2 text-foreground">{langInfo?.name}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Craft Type:</span>
                    <span className="ml-2 text-foreground">{content?.craftType}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Keywords:</span>
                    <span className="ml-2 text-foreground">{content?.keywords?.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailModal;