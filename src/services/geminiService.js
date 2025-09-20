import genAI from './geminiClient';

/**
 * Handles common Gemini API errors with user-friendly messages.
 * @param {Error} error - The error object from the API.
 * @returns {string} User-friendly error message.
 */
export function handleGeminiError(error) {
  console.error('Gemini API Error:', error);

  if (error?.message?.includes('429')) {
    return 'Rate limit exceeded. Please wait a moment before trying again.';
  }
  
  if (error?.message?.includes('SAFETY')) {
    return 'Content was blocked by safety filters. Please modify your request.';
  }
  
  if (error?.message?.includes('cancelled')) {
    return 'Request was cancelled by user.';
  }
  
  if (error?.message?.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  
  if (error?.message?.includes('API key')) {
    return 'API key is invalid or missing. Please check your configuration.';
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Comprehensive safety settings for content filtering.
 * @returns {Array} Safety settings configuration.
 */
export function getSafetySettings() {
  return [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_LOW_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_LOW_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_LOW_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_LOW_AND_ABOVE"
    }
  ];
}

/**
 * Converts image file to base64 format for API consumption.
 * @param {File} imageFile - The image file to convert.
 * @returns {Promise<Object>} Base64 image object for API.
 */
async function convertImageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: imageFile.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile);
  });
}

/**
 * Generates culturally appropriate content for Indian crafts using Gemini.
 * @param {string} prompt - Base prompt for content generation.
 * @param {File} imageFile - The craft image file.
 * @param {string} language - Target language (en, hi, ta).
 * @param {string[]} keywords - Additional keywords for context.
 * @param {AbortSignal} signal - Optional abort signal for cancellation.
 * @returns {Promise<Object>} Generated content with story, social caption, and heritage context.
 */
export async function generateCraftContent(prompt, imageFile, language = 'en', keywords = [], signal = null) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Please provide a description for content generation.');
    }

    if (!imageFile) {
      throw new Error('Please provide a craft image for analysis.');
    }

    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-2.5-pro'  // Use Pro model for multimodal inputs
    });

    // Convert image to base64
    const imagePart = await convertImageToBase64(imageFile);
    
    // Create enhanced prompt with cultural context
    const languageNames = {
      en: 'English',
      hi: 'Hindi', 
      ta: 'Tamil'
    };
    
    const keywordContext = keywords?.length > 0 ? `Focus on these aspects: ${keywords?.join(', ')}. ` : '';
    
    const culturalPrompt = `
Analyze this traditional Indian craft image and generate authentic, culturally rich content in ${languageNames?.[language] || 'English'}.

${keywordContext}

Based on the craft shown in the image, create:

1. STORY (150-200 words): Write a compelling narrative about this craft that highlights:
   - Traditional techniques and heritage
   - Cultural significance and history
   - The artisan's skill and dedication
   - Connection to Indian cultural roots
   - Authentic details about materials and methods

2. SOCIAL_CAPTION (80-120 words): Create an engaging social media post that:
   - Uses appropriate emojis and hashtags
   - Celebrates the craft's cultural value
   - Appeals to both traditional and modern audiences
   - Includes relevant hashtags for Indian crafts
   - Maintains cultural authenticity

3. HERITAGE_CONTEXT (120-150 words): Provide historical background including:
   - Origins and historical timeline
   - Regional variations and traditions
   - Cultural importance in Indian society
   - How the craft has evolved over time
   - Its place in contemporary India

Ensure the content is:
- Culturally authentic and respectful
- Historically accurate
- Emotionally engaging
- Appropriate for ${languageNames?.[language] || 'English'} speakers
- Celebrates India's rich craft heritage

Format your response exactly like this:
STORY: [story content here]

SOCIAL_CAPTION: [social media caption here]

HERITAGE_CONTEXT: [heritage context here]
    `?.trim();

    const contents = [{
      role: "user",
      parts: [
        imagePart,  // Image first
        { text: culturalPrompt }  // Then text instructions
      ]
    }];

    const generationConfig = {
      temperature: 0.7,
      topP: 0.8,
      topK: 32,
      maxOutputTokens: 2048,
    };

    const requestConfig = {
      contents,
      generationConfig,
      safetySettings: getSafetySettings(),
    };

    // Handle request with cancellation support
    const geminiRequest = model?.generateContent(requestConfig);
    
    let result;
    if (signal) {
      const cancellationPromise = new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
          reject(new Error('Request was cancelled by user.'));
        });
      });
      
      result = await Promise.race([geminiRequest, cancellationPromise]);
    } else {
      result = await geminiRequest;
    }

    const response = await result?.response;
    const text = response?.text();
    
    return parseGeminiResponse(text);
    
  } catch (error) {
    console.error('Error in craft content generation:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Parses the structured Gemini response into content object.
 * @param {string} responseText - The raw response from Gemini.
 * @returns {Object} Parsed content with story, socialCaption, and heritageContext.
 */
function parseGeminiResponse(responseText) {
  try {
    const content = {
      story: '',
      socialCaption: '',
      heritageContext: ''
    };

    // Split response by sections
    const sections = responseText?.split(/(?=STORY:|SOCIAL_CAPTION:|HERITAGE_CONTEXT:)/);
    
    sections?.forEach(section => {
      if (section?.startsWith('STORY:')) {
        content.story = section?.replace('STORY:', '')?.trim();
      } else if (section?.startsWith('SOCIAL_CAPTION:')) {
        content.socialCaption = section?.replace('SOCIAL_CAPTION:', '')?.trim();
      } else if (section?.startsWith('HERITAGE_CONTEXT:')) {
        content.heritageContext = section?.replace('HERITAGE_CONTEXT:', '')?.trim();
      }
    });

    // Fallback parsing if structured format isn't followed
    if (!content?.story && !content?.socialCaption && !content?.heritageContext) {
      const paragraphs = responseText?.split('\n\n')?.filter(p => p?.trim());
      
      if (paragraphs?.length >= 3) {
        content.story = paragraphs?.[0]?.trim() || '';
        content.socialCaption = paragraphs?.[1]?.trim() || '';
        content.heritageContext = paragraphs?.[2]?.trim() || '';
      } else {
        // Single response - use as story
        content.story = responseText?.trim();
        content.socialCaption = 'Beautiful traditional Indian craft! 🎨✨ #IndianCrafts #TraditionalArt #CulturalHeritage #HandmadeWithLove';
        content.heritageContext = 'This craft represents the rich heritage of Indian traditional artistry, passed down through generations.';
      }
    }

    return content;
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return {
      story: responseText?.trim(),
      socialCaption: 'Beautiful traditional Indian craft! 🎨✨ #IndianCrafts #TraditionalArt #CulturalHeritage #HandmadeWithLove',
      heritageContext: 'This craft represents the rich heritage of Indian traditional artistry, passed down through generations.'
    };
  }
}

/**
 * Generates image analysis and description using Gemini.
 * @param {File} imageFile - The image file to analyze.
 * @param {AbortSignal} signal - Optional abort signal for cancellation.
 * @returns {Promise<string>} Analysis of the craft image.
 */
export async function analyzeCraftImage(imageFile, signal = null) {
  try {
    if (!imageFile) {
      throw new Error('Please provide an image for analysis.');
    }

    const model = genAI?.getGenerativeModel({ model: 'gemini-2.5-pro' });

    // Convert image to base64
    const imagePart = await convertImageToBase64(imageFile);
    
    const analysisPrompt = `
Analyze this traditional Indian craft image and provide:

1. Craft type identification
2. Materials used (if visible)
3. Traditional techniques observed
4. Regional style indicators
5. Cultural significance
6. Craftsmanship quality assessment

Provide a concise but informative analysis focusing on the craft's traditional aspects and cultural value.
    `?.trim();

    const contents = [{
      role: "user",
      parts: [
        imagePart,
        { text: analysisPrompt }
      ]
    }];

    const requestConfig = {
      contents,
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        topK: 32,
        maxOutputTokens: 1024,
      },
      safetySettings: getSafetySettings(),
    };

    // Handle request with cancellation support
    const geminiRequest = model?.generateContent(requestConfig);
    
    let result;
    if (signal) {
      const cancellationPromise = new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
          reject(new Error('Request was cancelled by user.'));
        });
      });
      
      result = await Promise.race([geminiRequest, cancellationPromise]);
    } else {
      result = await geminiRequest;
    }

    const response = await result?.response;
    return response?.text();
    
  } catch (error) {
    console.error('Error in image analysis:', error);
    throw new Error(handleGeminiError(error));
  }
}

/**
 * Basic text generation for general prompts.
 * @param {string} prompt - The user's input prompt.
 * @param {AbortSignal} signal - Optional abort signal for cancellation.
 * @returns {Promise<string>} The generated text.
 */
export async function generateText(prompt, signal = null) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Please provide a prompt for text generation.');
    }

    const model = genAI?.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const requestConfig = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 32,
        maxOutputTokens: 2048,
      },
      safetySettings: getSafetySettings(),
    };

    // Handle request with cancellation support
    const geminiRequest = model?.generateContent(requestConfig);
    
    let result;
    if (signal) {
      const cancellationPromise = new Promise((_, reject) => {
        signal.addEventListener('abort', () => {
          reject(new Error('Request was cancelled by user.'));
        });
      });
      
      result = await Promise.race([geminiRequest, cancellationPromise]);
    } else {
      result = await geminiRequest;
    }

    const response = await result?.response;
    return response?.text();
  } catch (error) {
    console.error('Error in text generation:', error);
    throw new Error(handleGeminiError(error));
  }
}