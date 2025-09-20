import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCard = ({ 
  content, 
  onView, 
  onCopy, 
  onRegenerate, 
  onDelete, 
  isSelected, 
  onSelect 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB');
  };

  const getLanguageFlag = (language) => {
    const flags = {
      'en': '🇺🇸',
      'hi': '🇮🇳',
      'ta': '🇮🇳'
    };
    return flags?.[language] || '🌐';
  };

  const getLanguageName = (language) => {
    const names = {
      'en': 'English',
      'hi': 'हिंदी',
      'ta': 'தமிழ்'
    };
    return names?.[language] || language;
  };

  const truncateText = (text, maxLength = 80) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className={`bg-card border rounded-lg p-4 shadow-soft transition-cultural hover:shadow-medium ${
      isSelected ? 'border-primary bg-primary/5' : 'border-border'
    }`}>
      {/* Selection Checkbox */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(content?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getLanguageFlag(content?.language)}</span>
            <span className="text-xs text-text-secondary font-caption">
              {getLanguageName(content?.language)}
            </span>
          </div>
        </div>
        <span className="text-xs text-text-secondary font-mono">
          {formatDate(content?.createdAt)}
        </span>
      </div>
      {/* Content Preview */}
      <div className="flex space-x-4 mb-4">
        {/* Image Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
            <Image
              src={content?.image}
              alt={`${content?.craftType} craft`}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoaded(true)}
            />
            {!isImageLoaded && (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="Image" size={20} className="text-text-secondary" />
              </div>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-sm font-medium text-foreground">
              {content?.craftType}
            </h3>
            <div className="flex flex-wrap gap-1">
              {content?.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Story Preview */}
          <div className="mb-2">
            <p className="text-xs text-text-secondary mb-1">Product Story:</p>
            <p className="text-xs text-foreground leading-relaxed">
              {truncateText(content?.productStory)}
            </p>
          </div>

          {/* Caption Preview */}
          <div>
            <p className="text-xs text-text-secondary mb-1">Social Caption:</p>
            <p className="text-xs text-foreground">
              {truncateText(content?.socialCaption, 60)}
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onView(content)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onCopy(content)}
            iconName="Copy"
            iconPosition="left"
            iconSize={14}
          >
            Copy
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => onRegenerate(content)}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
          >
            Regenerate
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onDelete(content?.id)}
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
            className="text-error hover:text-error hover:bg-error/10"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;