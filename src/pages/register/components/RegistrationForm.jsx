import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    craftType: '',
    region: '',
    certificationFile: null,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      title: "Join KalaConnect AI",
      subtitle: "Empower your craft with AI-driven storytelling",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      password: "Password",
      passwordPlaceholder: "Create a strong password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      userType: "I am a",
      userTypePlaceholder: "Select your role",
      craftType: "Craft Specialization",
      craftTypePlaceholder: "Select your craft type",
      region: "Region",
      regionPlaceholder: "Select your region",
      certification: "Upload Certification (Optional)",
      certificationDesc: "Upload any craft certifications or awards",
      termsLabel: "I agree to the Terms of Service and Cultural Heritage Preservation Guidelines",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign In",
      artisanVerification: "Artisan Verification",
      verificationDesc: "Help us verify your craft expertise and connect you with the right audience"
    },
    hi: {
      title: "कलाकनेक्ट AI में शामिल हों",
      subtitle: "AI-संचालित कहानी कहने के साथ अपने शिल्प को सशक्त बनाएं",
      fullName: "पूरा नाम",
      fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल पता दर्ज करें",
      password: "पासवर्ड",
      passwordPlaceholder: "एक मजबूत पासवर्ड बनाएं",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder: "अपना पासवर्ड फिर से दर्ज करें",
      userType: "मैं हूँ",
      userTypePlaceholder: "अपनी भूमिका चुनें",
      craftType: "शिल्प विशेषज्ञता",
      craftTypePlaceholder: "अपना शिल्प प्रकार चुनें",
      region: "क्षेत्र",
      regionPlaceholder: "अपना क्षेत्र चुनें",
      certification: "प्रमाणन अपलोड करें (वैकल्पिक)",
      certificationDesc: "कोई भी शिल्प प्रमाणन या पुरस्कार अपलोड करें",
      termsLabel: "मैं सेवा की शर्तों और सांस्कृतिक विरासत संरक्षण दिशानिर्देशों से सहमत हूं",
      createAccount: "खाता बनाएं",
      alreadyHaveAccount: "पहले से खाता है?",
      signIn: "साइन इन करें",
      artisanVerification: "कारीगर सत्यापन",
      verificationDesc: "अपनी शिल्प विशेषज्ञता को सत्यापित करने और सही दर्शकों से जुड़ने में हमारी सहायता करें"
    },
    ta: {
      title: "கலாகனெக்ட் AI இல் சேரவும்",
      subtitle: "AI-இயக்கப்படும் கதை சொல்லல் மூலம் உங்கள் கைவினைப்பொருளை வலுப்படுத்துங்கள்",
      fullName: "முழு பெயர்",
      fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
      email: "மின்னஞ்சல் முகவரி",
      emailPlaceholder: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      password: "கடவுச்சொல்",
      passwordPlaceholder: "வலுவான கடவுச்சொல்லை உருவாக்கவும்",
      confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      confirmPasswordPlaceholder: "உங்கள் கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
      userType: "நான் ஒரு",
      userTypePlaceholder: "உங்கள் பங்கை தேர்ந்தெடுக்கவும்",
      craftType: "கைவினை நிபுணத்துவம்",
      craftTypePlaceholder: "உங்கள் கைவினை வகையை தேர்ந்தெடுக்கவும்",
      region: "பகுதி",
      regionPlaceholder: "உங்கள் பகுதியை தேர்ந்தெடுக்கவும்",
      certification: "சான்றிதழ் பதிவேற்றவும் (விருப்பமானது)",
      certificationDesc: "எந்தவொரு கைவினை சான்றிதழ்கள் அல்லது விருதுகளையும் பதிவேற்றவும்",
      termsLabel: "சேவை விதிமுறைகள் மற்றும் கலாச்சார பாரம்பரிய பாதுகாப்பு வழிகாட்டுதல்களுக்கு நான் ஒப்புக்கொள்கிறேன்",
      createAccount: "கணக்கை உருவாக்கவும்",
      alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      signIn: "உள்நுழையவும்",
      artisanVerification: "கைவினைஞர் சரிபார்ப்பு",
      verificationDesc: "உங்கள் கைவினை நிபுணத்துவத்தை சரிபார்க்கவும் சரியான பார்வையாளர்களுடன் இணைக்கவும் எங்களுக்கு உதவவும்"
    }
  };

  const userTypeOptions = [
    { value: 'artisan', label: currentLanguage === 'hi' ? 'कारीगर' : currentLanguage === 'ta' ? 'கைவினைஞர்' : 'Artisan' },
    { value: 'enthusiast', label: currentLanguage === 'hi' ? 'सांस्कृतिक उत्साही' : currentLanguage === 'ta' ? 'கலாச்சார ஆர்வலர்' : 'Cultural Enthusiast' },
    { value: 'organization', label: currentLanguage === 'hi' ? 'संगठन' : currentLanguage === 'ta' ? 'அமைப்பு' : 'Organization' }
  ];

  const craftTypeOptions = [
    { value: 'pottery', label: currentLanguage === 'hi' ? 'मिट्टी के बर्तन' : currentLanguage === 'ta' ? 'மண்பாண்டங்கள்' : 'Pottery' },
    { value: 'textiles', label: currentLanguage === 'hi' ? 'वस्त्र' : currentLanguage === 'ta' ? 'ஜவுளி' : 'Textiles' },
    { value: 'woodwork', label: currentLanguage === 'hi' ? 'लकड़ी का काम' : currentLanguage === 'ta' ? 'மரவேலை' : 'Woodwork' },
    { value: 'metalwork', label: currentLanguage === 'hi' ? 'धातु का काम' : currentLanguage === 'ta' ? 'உலோக வேலை' : 'Metalwork' },
    { value: 'painting', label: currentLanguage === 'hi' ? 'चित्रकारी' : currentLanguage === 'ta' ? 'ஓவியம்' : 'Painting' },
    { value: 'jewelry', label: currentLanguage === 'hi' ? 'आभूषण' : currentLanguage === 'ta' ? 'நகைகள்' : 'Jewelry' },
    { value: 'sculpture', label: currentLanguage === 'hi' ? 'मूर्तिकला' : currentLanguage === 'ta' ? 'சிற்பம்' : 'Sculpture' },
    { value: 'embroidery', label: currentLanguage === 'hi' ? 'कढ़ाई' : currentLanguage === 'ta' ? 'எம்ப்ராய்டரி' : 'Embroidery' }
  ];

  const regionOptions = [
    { value: 'north', label: currentLanguage === 'hi' ? 'उत्तर भारत' : currentLanguage === 'ta' ? 'வட இந்தியா' : 'North India' },
    { value: 'south', label: currentLanguage === 'hi' ? 'दक्षिण भारत' : currentLanguage === 'ta' ? 'தென் இந்தியா' : 'South India' },
    { value: 'east', label: currentLanguage === 'hi' ? 'पूर्व भारत' : currentLanguage === 'ta' ? 'கிழக்கு இந்தியா' : 'East India' },
    { value: 'west', label: currentLanguage === 'hi' ? 'पश्चिम भारत' : currentLanguage === 'ta' ? 'மேற்கு இந்தியா' : 'West India' },
    { value: 'central', label: currentLanguage === 'hi' ? 'मध्य भारत' : currentLanguage === 'ta' ? 'மத்திய இந்தியா' : 'Central India' },
    { value: 'northeast', label: currentLanguage === 'hi' ? 'पूर्वोत्तर भारत' : currentLanguage === 'ta' ? 'வடகிழக்கு இந்தியா' : 'Northeast India' }
  ];

  const t = translations?.[currentLanguage];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        certificationFile: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = currentLanguage === 'hi' ? 'पूरा नाम आवश्यक है' : 
                          currentLanguage === 'ta' ? 'முழு பெயர் தேவை' : 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 
                       currentLanguage === 'ta' ? 'மின்னஞ்சல் தேவை' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 
                       currentLanguage === 'ta' ? 'சரியான மின்னஞ்சலை உள்ளிடவும்' : 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 
                          currentLanguage === 'ta' ? 'கடவுச்சொல் தேவை' : 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए' : 
                          currentLanguage === 'ta' ? 'கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்' : 'Password must be at least 8 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 
                                 currentLanguage === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match';
    }

    if (!formData?.userType) {
      newErrors.userType = currentLanguage === 'hi' ? 'उपयोगकर्ता प्रकार चुनें' : 
                          currentLanguage === 'ta' ? 'பயனர் வகையை தேர்ந்தெடுக்கவும்' : 'Please select user type';
    }

    if (formData?.userType === 'artisan') {
      if (!formData?.craftType) {
        newErrors.craftType = currentLanguage === 'hi' ? 'शिल्प प्रकार चुनें' : 
                             currentLanguage === 'ta' ? 'கைவினை வகையை தேர்ந்தெடுக்கவும்' : 'Please select craft type';
      }
      if (!formData?.region) {
        newErrors.region = currentLanguage === 'hi' ? 'क्षेत्र चुनें' : 
                          currentLanguage === 'ta' ? 'பகுதியை தேர்ந்தெடுக்கவும்' : 'Please select region';
      }
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = currentLanguage === 'hi' ? 'शर्तों से सहमति आवश्यक है' : 
                              currentLanguage === 'ta' ? 'விதிமுறைகளுக்கு ஒப்புதல் தேவை' : 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage for demo
      localStorage.setItem('userData', JSON.stringify({
        ...formData,
        id: Date.now(),
        registeredAt: new Date()?.toISOString()
      }));
      
      // Navigate to dashboard
      navigate('/content-generation-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-xl flex items-center justify-center mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground">
            {t?.title}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {t?.subtitle}
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <Input
              label={t?.fullName}
              type="text"
              placeholder={t?.fullNamePlaceholder}
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              error={errors?.fullName}
              required
            />

            {/* Email */}
            <Input
              label={t?.email}
              type="email"
              placeholder={t?.emailPlaceholder}
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />

            {/* Password */}
            <Input
              label={t?.password}
              type="password"
              placeholder={t?.passwordPlaceholder}
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />

            {/* Confirm Password */}
            <Input
              label={t?.confirmPassword}
              type="password"
              placeholder={t?.confirmPasswordPlaceholder}
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />

            {/* User Type */}
            <Select
              label={t?.userType}
              placeholder={t?.userTypePlaceholder}
              options={userTypeOptions}
              value={formData?.userType}
              onChange={(value) => handleInputChange('userType', value)}
              error={errors?.userType}
              required
            />

            {/* Artisan Verification Section */}
            {formData?.userType === 'artisan' && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Award" size={20} className="text-primary" />
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {t?.artisanVerification}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  {t?.verificationDesc}
                </p>

                <div className="space-y-4">
                  {/* Craft Type */}
                  <Select
                    label={t?.craftType}
                    placeholder={t?.craftTypePlaceholder}
                    options={craftTypeOptions}
                    value={formData?.craftType}
                    onChange={(value) => handleInputChange('craftType', value)}
                    error={errors?.craftType}
                    required
                  />

                  {/* Region */}
                  <Select
                    label={t?.region}
                    placeholder={t?.regionPlaceholder}
                    options={regionOptions}
                    value={formData?.region}
                    onChange={(value) => handleInputChange('region', value)}
                    error={errors?.region}
                    required
                  />

                  {/* Certification Upload */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.certification}
                    </label>
                    <p className="text-xs text-text-secondary mb-2">
                      {t?.certificationDesc}
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="certification-upload"
                      />
                      <label
                        htmlFor="certification-upload"
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-cultural"
                      >
                        <div className="text-center">
                          <Icon name="Upload" size={24} className="mx-auto text-text-secondary mb-2" />
                          <p className="text-sm text-text-secondary">
                            {formData?.certificationFile ? formData?.certificationFile?.name : 
                             currentLanguage === 'hi' ? 'फ़ाइल चुनें या यहाँ खींचें' :
                             currentLanguage === 'ta'? 'கோப்பைத் தேர்ந்தெடுக்கவும் அல்லது இங்கே இழுக்கவும்' : 'Choose file or drag here'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms Agreement */}
            <div className="mt-6">
              <Checkbox
                label={t?.termsLabel}
                checked={formData?.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                error={errors?.agreeToTerms}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="left"
          >
            {t?.createAccount}
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              {t?.alreadyHaveAccount}{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-cultural"
              >
                {t?.signIn}
              </Link>
            </p>
          </div>
        </form>

        {/* Cultural Heritage Motif */}
        <div className="flex items-center justify-center space-x-2 mt-8 opacity-60">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 max-w-24"></div>
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;