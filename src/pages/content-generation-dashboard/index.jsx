import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ContentGenerationStatus from '../../components/ui/ContentGenerationStatus';
import PhotoUploadPanel from './components/PhotoUploadPanel';
import KeywordInputPanel from './components/KeywordInputPanel';
import LanguageSelectionPanel from './components/LanguageSelectionPanel';
import GenerationButton from './components/GenerationButton';
import ContentResultsPanel from './components/ContentResultsPanel';
import CulturalContextPanel from './components/CulturalContextPanel';
import { generateCraftContent } from '../../services/geminiService';
import { useCancellableRequest } from '../../hooks/useCancellableRequest';

const ContentGenerationDashboard = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);

  // Use the cancellable request hook
  const {
    startRequest,
    cancelRequest,
    isProcessing: isGenerating,
    processingStage,
    processingProgress
  } = useCancellableRequest();

  useEffect(() => {
    // Check localStorage for saved language preference on load
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const canGenerate = uploadedImage && keywords?.length > 0 && selectedLanguage && !isGenerating;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setError(null);
    setGeneratedContent(null);

    try {
      // Create base prompt from keywords and image context
      const keywordPrompt = keywords?.length > 0 
        ? `Create content focusing on: ${keywords?.join(', ')}`
        : 'Create comprehensive marketing content for this traditional craft';

      const result = await startRequest(async (signal) => {
        return await generateCraftContent(
          keywordPrompt,
          uploadedImage?.file,
          selectedLanguage,
          keywords,
          signal
        );
      });

      setGeneratedContent(result);

    } catch (error) {
      console.error('Generation failed:', error);
      setError(error?.message || 'Failed to generate content. Please try again.');
    }
  };

  // Determine status type and message based on current state
  const getStatusInfo = () => {
    if (isGenerating) {
      return {
        type: 'default',
        message: processingStage || 'Processing...'
      };
    }
    
    if (error) {
      return {
        type: 'error',
        message: error
      };
    }
    
    if (generatedContent) {
      return {
        type: 'success',
        message: 'Content generated successfully!'
      };
    }

    return {
      type: 'default',
      message: 'Ready to generate content'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Content Generation Status */}
      <ContentGenerationStatus
        isGenerating={isGenerating}
        progress={processingProgress}
        message={statusInfo?.message}
        type={statusInfo?.type}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Content Generation Dashboard
            </h1>
            <p className="text-lg text-text-secondary">
              Create AI-powered marketing content for your traditional crafts using Google Gemini
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 text-red-500">⚠️</div>
                <p className="text-red-700 text-sm font-medium">Generation Error</p>
              </div>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-red-500 text-xs underline hover:text-red-700"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Three-Section Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Section - Input Panel */}
            <div className="lg:col-span-4 space-y-6">
              <PhotoUploadPanel
                onImageUpload={setUploadedImage}
                uploadedImage={uploadedImage}
                isGenerating={isGenerating}
              />
              
              <KeywordInputPanel
                keywords={keywords}
                onKeywordsChange={setKeywords}
                isGenerating={isGenerating}
              />
              
              <LanguageSelectionPanel
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                isGenerating={isGenerating}
              />
              
              <GenerationButton
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                canGenerate={canGenerate}
                uploadedImage={uploadedImage}
                keywords={keywords}
                selectedLanguage={selectedLanguage}
                onCancel={cancelRequest}
              />
            </div>

            {/* Center Section - Results Panel */}
            <div className="lg:col-span-5">
              <ContentResultsPanel
                generatedContent={generatedContent}
                isGenerating={isGenerating}
                selectedLanguage={selectedLanguage}
              />
            </div>

            {/* Right Section - Cultural Context Panel */}
            <div className="lg:col-span-3">
              <CulturalContextPanel
                craftInfo={uploadedImage}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </div>

          {/* Cultural Heritage Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
              </div>
              <p className="text-sm text-text-secondary max-w-2xl mx-auto">
                Empowering Indian artisans to showcase their traditional crafts through AI-powered content generation using Google Gemini, 
                bridging the gap between ancient heritage and modern digital marketing.
              </p>
              <p className="text-xs text-text-secondary">
                © {new Date()?.getFullYear()} KalaConnect AI. Preserving cultural heritage through technology.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentGenerationDashboard;