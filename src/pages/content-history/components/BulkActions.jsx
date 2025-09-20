import React from 'react';

import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedItems, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDelete, 
  onBulkExport,
  totalItems 
}) => {
  const selectedCount = selectedItems?.length;
  const isAllSelected = selectedCount === totalItems && totalItems > 0;
  const isPartiallySelected = selectedCount > 0 && selectedCount < totalItems;

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isPartiallySelected;
                }}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    onSelectAll();
                  } else {
                    onDeselectAll();
                  }
                }}
                className="w-4 h-4 text-primary border-primary rounded focus:ring-primary focus:ring-2"
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} of {totalItems} selected
            </span>
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={onDeselectAll}
                iconName="X"
                iconSize={14}
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export ({selectedCount})
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
          >
            Delete ({selectedCount})
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-3 pt-3 border-t border-primary/20">
        <div className="flex items-center space-x-4">
          <span className="text-xs text-text-secondary">Quick Actions:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onSelectAll()}
              iconName="CheckSquare"
              iconSize={14}
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                // Copy all selected content to clipboard
                const allContent = selectedItems?.map(item => 
                  `${item?.productStory}\n\n${item?.socialCaption}\n\n${item?.culturalContext}`
                )?.join('\n\n---\n\n');
                navigator.clipboard?.writeText(allContent);
              }}
              iconName="Copy"
              iconSize={14}
            >
              Copy All Content
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;