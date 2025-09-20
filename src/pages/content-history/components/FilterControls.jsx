import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterControls = ({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  selectedCraftType,
  onCraftTypeChange,
  selectedLanguage,
  onLanguageChange,
  onClearFilters,
  totalResults
}) => {
  const craftTypes = [
    { value: '', label: 'All Craft Types' },
    { value: 'pottery', label: 'Pottery' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'woodwork', label: 'Woodwork' },
    { value: 'metalwork', label: 'Metalwork' },
    { value: 'painting', label: 'Painting' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'sculpture', label: 'Sculpture' },
    { value: 'embroidery', label: 'Embroidery' }
  ];

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'en', label: 'English 🇺🇸' },
    { value: 'hi', label: 'हिंदी 🇮🇳' },
    { value: 'ta', label: 'தமிழ் 🇮🇳' }
  ];

  const hasActiveFilters = searchQuery || dateRange?.start || dateRange?.end || 
                          selectedCraftType || selectedLanguage;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-soft">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search by keywords, craft type, or content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={dateRange?.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
              className="text-xs"
            />
            <Input
              type="date"
              value={dateRange?.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
              className="text-xs"
            />
          </div>
        </div>

        {/* Craft Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Craft Type</label>
          <select
            value={selectedCraftType}
            onChange={(e) => onCraftTypeChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {craftTypes?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Language</label>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {languages?.map((lang) => (
              <option key={lang?.value} value={lang?.value}>
                {lang?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground opacity-0">Actions</label>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Results Summary */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {totalResults} content{totalResults !== 1 ? 's' : ''} found
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">Filters Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;