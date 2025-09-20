import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const KeywordInputPanel = ({ keywords, onKeywordsChange, isGenerating }) => {
  const [inputValue, setInputValue] = useState('');

  const craftExamples = [
    { category: "Pottery", keywords: ["terracotta", "clay pottery"] },
    { category: "Textiles", keywords: ["handloom", "silk weaving"] },
    { category: "Painting", keywords: ["madhubani", "warli art"] },
    { category: "Metalwork", keywords: ["brass craft", "copper work"] },
    { category: "Woodwork", keywords: ["sandalwood", "teak carving"] },
    { category: "Jewelry", keywords: ["kundan", "meenakari"] }
  ];

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setInputValue(value);
    
    // Split by comma and clean up
    const keywordArray = value?.split(',')?.map(keyword => keyword?.trim())?.filter(keyword => keyword?.length > 0)?.slice(0, 2); // Limit to 2 keywords
    
    onKeywordsChange(keywordArray);
  };

  const addExampleKeyword = (keyword) => {
    const currentKeywords = inputValue ? inputValue?.split(',')?.map(k => k?.trim()) : [];
    
    if (currentKeywords?.length < 2 && !currentKeywords?.includes(keyword)) {
      const newValue = currentKeywords?.length > 0 
        ? `${inputValue}, ${keyword}` 
        : keyword;
      setInputValue(newValue);
      onKeywordsChange([...currentKeywords, keyword]);
    }
  };

  const clearKeywords = () => {
    setInputValue('');
    onKeywordsChange([]);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Tag" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Craft Keywords
          </h3>
        </div>
        
        {keywords?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearKeywords}
            disabled={isGenerating}
            iconName="X"
            iconSize={14}
          >
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <Input
          label="Enter 1-2 craft-related keywords"
          type="text"
          placeholder="e.g., madhubani painting, silk weaving"
          value={inputValue}
          onChange={handleInputChange}
          disabled={isGenerating}
          description="Separate multiple keywords with commas (maximum 2)"
          className="mb-4"
        />

        {/* Keyword Count Indicator */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">
            Keywords entered: {keywords?.length}/2
          </span>
          {keywords?.length === 2 && (
            <span className="text-success flex items-center space-x-1">
              <Icon name="CheckCircle" size={14} />
              <span>Ready to generate</span>
            </span>
          )}
        </div>

        {/* Current Keywords Display */}
        {keywords?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {keywords?.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                <Icon name="Tag" size={12} />
                <span>{keyword}</span>
              </div>
            ))}
          </div>
        )}

        {/* Example Keywords */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Popular craft categories:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {craftExamples?.map((example, index) => (
              <div
                key={index}
                className="p-3 bg-muted rounded-md border border-border hover:border-primary/50 transition-cultural"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {example?.category}
                  </h4>
                  <Icon name="Palette" size={14} className="text-primary" />
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {example?.keywords?.map((keyword, keywordIndex) => (
                    <Button
                      key={keywordIndex}
                      variant="ghost"
                      size="xs"
                      onClick={() => addExampleKeyword(keyword)}
                      disabled={isGenerating || keywords?.length >= 2 || keywords?.includes(keyword)}
                      className="text-xs h-6 px-2"
                    >
                      {keyword}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Heritage Note */}
        <div className="p-4 bg-accent/5 rounded-md border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Cultural Context Enhancement
              </p>
              <p className="text-xs text-text-secondary">
                Our AI will automatically add cultural heritage context and regional information to your craft keywords for richer storytelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordInputPanel;