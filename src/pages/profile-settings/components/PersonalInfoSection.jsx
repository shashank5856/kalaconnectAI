import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySettingsSection = ({ securityData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(securityData);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    // Clear password fields after save
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleCancel = () => {
    setFormData(securityData);
    setIsEditing(false);
  };

  const handleTwoFactorToggle = (checked) => {
    setFormData(prev => ({
      ...prev,
      twoFactorEnabled: checked
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-error-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Account Security</h2>
            <p className="text-sm text-text-secondary">Manage your password and security settings</p>
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
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Password Change Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Change Password</h3>
          
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={formData?.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
              disabled={!isEditing}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-text-secondary hover:text-foreground"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              disabled={!isEditing}
            >
              <Icon name={showCurrentPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={formData?.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e?.target?.value }))}
              disabled={!isEditing}
              placeholder="Enter your new password"
              description="Password must be at least 8 characters with uppercase, lowercase, and numbers"
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-text-secondary hover:text-foreground"
              onClick={() => setShowNewPassword(!showNewPassword)}
              disabled={!isEditing}
            >
              <Icon name={showNewPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData?.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
              disabled={!isEditing}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-text-secondary hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={!isEditing}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Two-Factor Authentication</h3>
              <p className="text-xs text-text-secondary">Add an extra layer of security to your account</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              formData?.twoFactorEnabled 
                ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-text-secondary border border-border'
            }`}>
              {formData?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Enable SMS Two-Factor Authentication"
              description="Receive verification codes via SMS to your registered mobile number"
              checked={formData?.twoFactorEnabled}
              onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
              disabled={!isEditing}
            />

            {formData?.twoFactorEnabled && (
              <div className="ml-6 space-y-3">
                <Input
                  label="Mobile Number for 2FA"
                  type="tel"
                  value={formData?.twoFactorPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, twoFactorPhone: e?.target?.value }))}
                  disabled={!isEditing}
                  placeholder="+91 XXXXX XXXXX"
                  description="This number will be used for sending verification codes"
                />

                <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success">Mobile number verified</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Login Activity */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-foreground mb-4">Recent Login Activity</h3>
          
          <div className="space-y-3">
            {formData?.loginActivity?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={activity?.device === 'mobile' ? 'Smartphone' : 'Monitor'} size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity?.location}</p>
                    <p className="text-xs text-text-secondary">{activity?.device} • {activity?.browser}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground">{activity?.date}</p>
                  <p className="text-xs text-text-secondary">{activity?.time}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            className="mt-4"
          >
            View All Activity
          </Button>
        </div>

        {/* Security Recommendations */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-foreground mb-4">Security Recommendations</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Enable Two-Factor Authentication</p>
                <p className="text-xs text-warning/80">Protect your account with an additional security layer</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-success">Strong Password Detected</p>
                <p className="text-xs text-success/80">Your password meets security requirements</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-muted border border-border rounded-lg">
              <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Regular Security Checkups</p>
                <p className="text-xs text-text-secondary">Review your account security settings monthly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsSection;