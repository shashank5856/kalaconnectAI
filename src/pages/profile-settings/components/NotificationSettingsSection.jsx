import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSettingsSection = ({ notificationData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(notificationData);

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
    { value: 'daily', label: 'Daily Digest', description: 'Once per day summary' },
    { value: 'weekly', label: 'Weekly Summary', description: 'Weekly roundup' },
    { value: 'monthly', label: 'Monthly Report', description: 'Monthly highlights' },
    { value: 'never', label: 'Never', description: 'No notifications' }
  ];

  const timeOptions = [
    { value: '09:00', label: '9:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '21:00', label: '9:00 PM' }
  ];

  const handleNotificationChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(notificationData);
    setIsEditing(false);
  };

  const NotificationCategory = ({ title, description, icon, category, settings }) => (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>
      </div>

      <div className="space-y-3 pl-11">
        <Checkbox
          label="Email Notifications"
          checked={settings?.email}
          onChange={(e) => handleNotificationChange(category, 'email', e?.target?.checked)}
          disabled={!isEditing}
        />

        <Checkbox
          label="SMS Notifications"
          checked={settings?.sms}
          onChange={(e) => handleNotificationChange(category, 'sms', e?.target?.checked)}
          disabled={!isEditing}
        />

        <Checkbox
          label="In-App Notifications"
          checked={settings?.inApp}
          onChange={(e) => handleNotificationChange(category, 'inApp', e?.target?.checked)}
          disabled={!isEditing}
        />

        <Select
          label="Frequency"
          options={frequencyOptions}
          value={settings?.frequency}
          onChange={(value) => handleNotificationChange(category, 'frequency', value)}
          disabled={!isEditing}
          className="mt-2"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-warning-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Notification Settings</h2>
            <p className="text-sm text-text-secondary">Customize how and when you receive notifications</p>
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
        {/* Notification Categories */}
        <div className="space-y-4">
          <NotificationCategory
            title="Content Generation Updates"
            description="Notifications about AI content generation status and results"
            icon="Zap"
            category="contentGeneration"
            settings={formData?.contentGeneration}
          />

          <NotificationCategory
            title="Community Features"
            description="Updates about community interactions, comments, and collaborations"
            icon="Users"
            category="community"
            settings={formData?.community}
          />

          <NotificationCategory
            title="Cultural Heritage Education"
            description="Educational content about traditional crafts and cultural heritage"
            icon="BookOpen"
            category="education"
            settings={formData?.education}
          />

          <NotificationCategory
            title="Marketplace Activities"
            description="Updates about your products, orders, and marketplace interactions"
            icon="ShoppingBag"
            category="marketplace"
            settings={formData?.marketplace}
          />

          <NotificationCategory
            title="Account & Security"
            description="Important account updates, security alerts, and system notifications"
            icon="Shield"
            category="security"
            settings={formData?.security}
          />
        </div>

        {/* Global Settings */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-foreground mb-4">Global Notification Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Quiet Hours Start"
              description="No notifications during quiet hours"
              options={timeOptions}
              value={formData?.quietHours?.start}
              onChange={(value) => setFormData(prev => ({
                ...prev,
                quietHours: { ...prev?.quietHours, start: value }
              }))}
              disabled={!isEditing}
            />

            <Select
              label="Quiet Hours End"
              description="Resume notifications after quiet hours"
              options={timeOptions}
              value={formData?.quietHours?.end}
              onChange={(value) => setFormData(prev => ({
                ...prev,
                quietHours: { ...prev?.quietHours, end: value }
              }))}
              disabled={!isEditing}
            />
          </div>

          <div className="mt-4 space-y-3">
            <Checkbox
              label="Weekend Notifications"
              description="Receive notifications on weekends"
              checked={formData?.weekendNotifications}
              onChange={(e) => setFormData(prev => ({ ...prev, weekendNotifications: e?.target?.checked }))}
              disabled={!isEditing}
            />

            <Checkbox
              label="Cultural Festival Reminders"
              description="Get notified about upcoming cultural festivals and events"
              checked={formData?.festivalReminders}
              onChange={(e) => setFormData(prev => ({ ...prev, festivalReminders: e?.target?.checked }))}
              disabled={!isEditing}
            />

            <Checkbox
              label="Craft Technique Tips"
              description="Receive weekly tips and techniques for your craft specializations"
              checked={formData?.craftTips}
              onChange={(e) => setFormData(prev => ({ ...prev, craftTips: e?.target?.checked }))}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Notification Preview */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <h3 className="text-sm font-medium text-foreground">Notification Preview</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-card rounded border border-border">
              <Icon name="Zap" size={16} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Content Generated Successfully!</p>
                <p className="text-xs text-text-secondary">Your pottery showcase content is ready for review</p>
              </div>
              <span className="text-xs text-text-secondary">2 min ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-card rounded border border-border">
              <Icon name="Users" size={16} className="text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New Community Comment</p>
                <p className="text-xs text-text-secondary">Someone commented on your traditional painting post</p>
              </div>
              <span className="text-xs text-text-secondary">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsSection;