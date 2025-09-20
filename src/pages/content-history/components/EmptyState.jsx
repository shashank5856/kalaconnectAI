import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Content Found
          </h3>
          <p className="text-text-secondary mb-6">
            No content matches your current filters. Try adjusting your search criteria or clearing the filters.
          </p>
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="FileText" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
          No Content History Yet
        </h3>
        <p className="text-text-secondary mb-8 leading-relaxed">
          You haven't generated any marketing content yet. Start creating compelling stories for your crafts to build your content library.
        </p>
        
        <div className="space-y-4">
          <Link to="/content-generation-dashboard">
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              iconSize={18}
              className="w-full sm:w-auto"
            >
              Generate Your First Content
            </Button>
          </Link>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Image" size={16} />
              <span>Upload craft photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={16} />
              <span>AI-powered content</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} />
              <span>Multi-language support</span>
            </div>
          </div>
        </div>

        {/* Cultural Heritage Motif */}
        <div className="mt-12 flex items-center justify-center space-x-2 opacity-40">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <div className="w-16 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;