import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadPanel = ({ onImageUpload, uploadedImage, isGenerating }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileUpload(files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload({
          file: file,
          preview: e?.target?.result,
          name: file?.name
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeImage = () => {
    onImageUpload(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Camera" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Upload Craft Photo
        </h3>
      </div>
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-cultural ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isGenerating}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                Drop your craft photo here
              </p>
              <p className="text-sm text-text-secondary">
                or click to browse files
              </p>
            </div>
            
            <div className="text-xs text-text-secondary space-y-1">
              <p>Supported formats: JPG, PNG, WebP</p>
              <p>Maximum size: 10MB</p>
            </div>
          </div>
          
          {/* Cultural Heritage Motif */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 opacity-30">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={uploadedImage?.preview}
              alt="Uploaded craft"
              className="w-full h-64 object-cover"
            />
            
            {!isGenerating && (
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="absolute top-2 right-2"
                iconName="X"
                iconSize={16}
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Image" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {uploadedImage?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  Ready for content generation
                </p>
              </div>
            </div>
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        </div>
      )}
      {/* Upload Tips */}
      <div className="mt-6 p-4 bg-primary/5 rounded-md border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              Tips for best results:
            </p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Use clear, well-lit photos of your craft</li>
              <li>• Show the craft from multiple angles if possible</li>
              <li>• Include traditional tools or materials in the frame</li>
              <li>• Avoid cluttered backgrounds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadPanel;