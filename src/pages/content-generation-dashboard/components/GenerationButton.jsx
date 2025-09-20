import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationButton = ({ 
  onGenerate, 
  isGenerating, 
  canGenerate, 
  uploadedImage, 
  keywords, 
  selectedLanguage,
  onCancel 
}) => {
  const getButtonText = () => {
    if (isGenerating) return 'Generating Content...';
    if (!uploadedImage) return 'Upload Image First';
    if (!keywords?.length) return 'Add Keywords First';
    if (!selectedLanguage) return 'Select Language First';
    return 'Generate with Gemini AI';
  };

  const getRequirementsList = () => {
    const requirements = [];
    if (!uploadedImage) requirements?.push('Upload a craft photo');
    if (!keywords?.length) requirements?.push('Add relevant keywords');
    if (!selectedLanguage) requirements?.push('Select target language');
    return requirements;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          AI Content Generation
        </h3>
      </div>
      {/* Generation Button */}
      <div className="space-y-4">
        <Button
          onClick={onGenerate}
          disabled={!canGenerate}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            canGenerate 
              ? 'bg-primary hover:bg-primary/90 text-white' :'bg-muted text-text-secondary cursor-not-allowed'
          }`}
          iconName={isGenerating ? "Loader2" : "Zap"}
          iconSize={20}
          iconClassName={isGenerating ? "animate-spin" : ""}
        >
          {getButtonText()}
        </Button>

        {/* Cancel Button - only show when generating */}
        {isGenerating && onCancel && (
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full"
            iconName="X"
            iconSize={16}
          >
            Cancel Generation
          </Button>
        )}
      </div>
      {/* Requirements Checklist */}
      {!canGenerate && !isGenerating && (
        <div className="mt-6 p-4 bg-muted/50 rounded-md">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle2" size={16} className="text-text-secondary mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Requirements checklist:
              </p>
              <ul className="text-xs text-text-secondary space-y-1">
                {getRequirementsList()?.map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-text-secondary rounded-full"></div>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Generation Info */}
      <div className="mt-6 p-4 bg-primary/5 rounded-md border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              Powered by Google Gemini AI
            </p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Analyzes craft images with cultural context</li>
              <li>• Generates authentic multilingual content</li>
              <li>• Creates heritage-rich storytelling</li>
              <li>• Provides social media ready captions</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Usage Statistics */}
      {canGenerate && (
        <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
          <span>✓ {uploadedImage ? 'Image' : 'No image'}</span>
          <span>✓ {keywords?.length || 0} keywords</span>
          <span>✓ {selectedLanguage ? selectedLanguage?.toUpperCase() : 'No language'}</span>
        </div>
      )}
    </div>
  );
};

export default GenerationButton;