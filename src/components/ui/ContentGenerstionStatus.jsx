import React from 'react';
import Icon from '../AppIcon';

const ContentGenerationStatus = ({ 
  isGenerating = false, 
  progress = 0, 
  message = 'Generating content...',
  type = 'default' // 'default', 'success', 'error'
}) => {
  if (!isGenerating && type === 'default') return null;

  const getStatusIcon = () => {
    switch (type) {
      case 'success':
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case 'error':
        return <Icon name="AlertCircle" size={20} className="text-error" />;
      default:
        return (
          <div className="relative">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full opacity-60"></div>
            </div>
          </div>
        );
    }
  };

  const getStatusColor = () => {
    switch (type) {
      case 'success':
        return 'border-success bg-success/5';
      case 'error':
        return 'border-error bg-error/5';
      default:
        return 'border-primary bg-primary/5';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-error';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={`fixed top-20 right-6 z-300 max-w-sm w-full`}>
      <div className={`border rounded-lg p-4 shadow-medium transition-cultural ${getStatusColor()}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getStatusIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {type === 'success' ? 'Content Generated!' : 
                 type === 'error'? 'Generation Failed' : 'AI Processing'}
              </p>
              {progress > 0 && progress < 100 && (
                <span className="text-xs text-text-secondary font-mono">
                  {progress}%
                </span>
              )}
            </div>
            
            <p className="text-xs text-text-secondary mb-3">
              {message}
            </p>
            
            {/* Progress Bar */}
            {isGenerating && progress > 0 && (
              <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
            )}
            
            {/* Cultural Heritage Motif */}
            <div className="flex items-center space-x-1 opacity-60">
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              <div className="w-1 h-1 bg-secondary rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerationStatus;