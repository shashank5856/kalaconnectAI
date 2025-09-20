import { useRef, useState } from 'react';

/**
 * React hook for managing cancellable API requests.
 * @returns {Object} Hook utilities for request management.
 */
export function useCancellableRequest() {
  const abortControllerRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);

  const startRequest = async (requestFunction) => {
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingStage('Initializing request...');

    try {
      // Simulate progress stages for better UX
      const progressStages = [
        { stage: 'Analyzing craft image...', progress: 10 },
        { stage: 'Understanding cultural context...', progress: 25 },
        { stage: 'Generating authentic content...', progress: 50 },
        { stage: 'Crafting multilingual text...', progress: 75 },
        { stage: 'Finalizing heritage context...', progress: 90 },
        { stage: 'Complete!', progress: 100 }
      ];

      // Start progress simulation
      let currentStageIndex = 0;
      const progressInterval = setInterval(() => {
        if (currentStageIndex < progressStages?.length - 1) {
          const stage = progressStages?.[currentStageIndex];
          setProcessingStage(stage?.stage);
          setProcessingProgress(stage?.progress);
          currentStageIndex++;
        }
      }, 800);

      // Execute the actual request
      const result = await requestFunction(abortControllerRef?.current?.signal);
      
      // Clean up progress simulation
      clearInterval(progressInterval);
      setProcessingProgress(100);
      setProcessingStage('Content generation complete!');
      
      return result;
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
        setProcessingStage('');
        abortControllerRef.current = null;
      }, 1000);
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef?.current) {
      abortControllerRef?.current?.abort();
      setIsProcessing(false);
      setProcessingStage('Cancelled by user');
      setProcessingProgress(0);
      setTimeout(() => {
        setProcessingStage('');
      }, 2000);
    }
  };

  return {
    startRequest,
    cancelRequest,
    isProcessing,
    processingStage,
    processingProgress
  };
}

export default useCancellableRequest;