import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ selectedLanguage, isLoading, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your KalaConnect AI account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      signInButton: 'Sign In',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don\'t have an account?",
      createAccount: 'Create Account',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      invalidCredentials: 'Invalid email or password. Please try again.',
      mockCredentials: 'Use: artisan@kalaconnect.ai / password123'
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'अपने कलाकनेक्ट AI खाते में साइन इन करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      signInButton: 'साइन इन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      noAccount: 'खाता नहीं है?',
      createAccount: 'खाता बनाएं',
      emailRequired: 'ईमेल पता आवश्यक है',
      emailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें',
      passwordRequired: 'पासवर्ड आवश्यक है',
      passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।',
      mockCredentials: 'उपयोग करें: artisan@kalaconnect.ai / password123'
    },
    ta: {
      title: 'மீண்டும் வரவேற்கிறோம்',
      subtitle: 'உங்கள் கலாகனெக்ட் AI கணக்கில் உள்நுழையுங்கள்',
      emailLabel: 'மின்னஞ்சல் முகவரி',
      emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      passwordLabel: 'கடவுச்சொல்',
      passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      signInButton: 'உள்நுழையுங்கள்',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      noAccount: 'கணக்கு இல்லையா?',
      createAccount: 'கணக்கை உருவாக்கவும்',
      emailRequired: 'மின்னஞ்சல் முகவரி தேவை',
      emailInvalid: 'தயவுசெய்து சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      passwordRequired: 'கடவுச்சொல் தேவை',
      passwordMinLength: 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்',
      invalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.',
      mockCredentials: 'பயன்படுத்தவும்: artisan@kalaconnect.ai / password123'
    }
  };

  const t = content?.[selectedLanguage] || content?.en;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = t?.emailRequired;
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = t?.emailInvalid;
    }

    if (!formData?.password?.trim()) {
      newErrors.password = t?.passwordRequired;
    } else if (formData?.password?.length < 6) {
      newErrors.password = t?.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Mock authentication - check credentials
    const validCredentials = {
      email: 'artisan@kalaconnect.ai',
      password: 'password123'
    };

    if (formData?.email !== validCredentials?.email || formData?.password !== validCredentials?.password) {
      setErrors({
        general: t?.invalidCredentials
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          {t?.title}
        </h1>
        <p className="text-text-secondary font-caption">
          {t?.subtitle}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
            <p className="text-xs text-text-secondary mt-2 ml-6">
              {t?.mockCredentials}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label={t?.emailLabel}
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder={t?.emailPlaceholder}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label={t?.passwordLabel}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder={t?.passwordPlaceholder}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-cultural"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {t?.signInButton}
        </Button>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-cultural"
            disabled={isLoading}
          >
            {t?.forgotPassword}
          </button>
        </div>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-text-secondary">
            {t?.noAccount}{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-cultural"
            >
              {t?.createAccount}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;