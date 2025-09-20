import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CraftSpecializationSection = ({ craftData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(craftData);

  const craftOptions = [
    { id: 'pottery', label: 'Pottery & Ceramics', description: 'Traditional clay work and ceramic art' },
    { id: 'painting', label: 'Traditional Painting', description: 'Madhubani, Warli, Tanjore paintings' },
    { id: 'textiles', label: 'Textiles & Weaving', description: 'Handloom, embroidery, block printing' },
    { id: 'woodwork', label: 'Woodwork & Carving', description: 'Furniture, sculptures, decorative items' },
    { id: 'metalwork', label: 'Metalwork & Jewelry', description: 'Traditional metal crafts and jewelry' },
    { id: 'stonework', label: 'Stone Carving', description: 'Sculptures and architectural elements' },
    { id: 'leatherwork', label: 'Leather Craft', description: 'Traditional leather goods and art' },
    { id: 'bamboo', label: 'Bamboo Craft', description: 'Basketry and bamboo products' }
  ];

  const regionOptions = [
    { value: 'north', label: 'North India', description: 'Punjab, Haryana, Himachal Pradesh, J&K' },
    { value: 'south', label: 'South India', description: 'Tamil Nadu, Karnataka, Kerala, Andhra Pradesh' },
    { value: 'east', label: 'East India', description: 'West Bengal, Odisha, Jharkhand, Bihar' },
    { value: 'west', label: 'West India', description: 'Maharashtra, Gujarat, Rajasthan, Goa' },
    { value: 'central', label: 'Central India', description: 'Madhya Pradesh, Chhattisgarh' },
    { value: 'northeast', label: 'Northeast India', description: 'Assam, Manipur, Nagaland, others' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (3-5 years)' },
    { value: 'experienced', label: 'Experienced (6-10 years)' },
    { value: 'expert', label: 'Expert (10+ years)' },
    { value: 'master', label: 'Master Craftsperson (20+ years)' }
  ];

  const handleCraftChange = (craftId, checked) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked 
        ? [...prev?.specializations, craftId]
        : prev?.specializations?.filter(id => id !== craftId)
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(craftData);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Palette" size={20} className="text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Craft Specialization</h2>
            <p className="text-sm text-text-secondary">Select your areas of expertise and regional heritage</p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Craft Specializations */}
        <div>
          <CheckboxGroup 
            label="Craft Specializations" 
            description="Select all traditional crafts you practice"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {craftOptions?.map((craft) => (
                <div key={craft?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-cultural">
                  <Checkbox
                    label={craft?.label}
                    description={craft?.description}
                    checked={formData?.specializations?.includes(craft?.id)}
                    onChange={(e) => handleCraftChange(craft?.id, e?.target?.checked)}
                    disabled={!isEditing}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Regional Origin and Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Regional Origin"
            description="Your primary craft region"
            options={regionOptions}
            value={formData?.region}
            onChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
            disabled={!isEditing}
          />

          <Select
            label="Experience Level"
            description="Years of craft experience"
            options={experienceOptions}
            value={formData?.experience}
            onChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
            disabled={!isEditing}
          />
        </div>

        {/* Certification Upload */}
        <div>
          <Input
            label="Craft Certification"
            type="file"
            description="Upload certificates from craft institutions or heritage organizations"
            disabled={!isEditing}
          />
          
          {formData?.certifications && formData?.certifications?.length > 0 && (
            <div className="mt-3 space-y-2">
              {formData?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Icon name="FileText" size={16} className="text-text-secondary" />
                  <span className="text-sm text-foreground">{cert?.name}</span>
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span>Verified</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Heritage Badge Display */}
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Award" size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-primary">Cultural Heritage Badges</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {formData?.badges?.map((badge, index) => (
              <div key={index} className="text-center p-3 bg-card rounded-lg border border-border">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="Star" size={16} className="text-primary-foreground" />
                </div>
                <p className="text-xs font-medium text-foreground">{badge?.name}</p>
                <p className="text-xs text-text-secondary">{badge?.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftSpecializationSection;