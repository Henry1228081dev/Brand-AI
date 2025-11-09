import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { getCritique, scrapeBrandInfo } from './services/geminiService';
import type { BrandInfo, CritiqueResult } from './types';
import { WebsiteInput } from './components/WebsiteInput';
import { ScoringGuide } from './components/ScoringGuide';

type AppStep = 'URL_INPUT' | 'CRITIQUE_FORM';

const App: React.FC = () => {
  const [appStep, setAppStep] = useState<AppStep>('URL_INPUT');
  const [critique, setCritique] = useState<CritiqueResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapingError, setScrapingError] = useState<string | null>(null);
  const [scrapedBrandInfo, setScrapedBrandInfo] = useState<BrandInfo | null>(
    null
  );
  const [showGuide, setShowGuide] = useState(false);


  const handleUrlSubmit = async (url: string) => {
    setIsScraping(true);
    setScrapingError(null);
    try {
      const data = await scrapeBrandInfo(url);
      setScrapedBrandInfo(data);
      setAppStep('CRITIQUE_FORM');
    } catch (err) {
       console.error(err);
       setScrapingError(
        err instanceof Error
          ? `Scraping failed: ${err.message}`
          : 'An unknown error occurred during scraping.'
      );
    } finally {
      setIsScraping(false);
    }
  };

  const handleCritiqueRequest = async (
    file: File,
    brandInfo: BrandInfo,
    contentDescription: string
  ) => {
    setIsLoading(true);
    setCritique(null);
    setError(null);
    try {
      const result = await getCritique(file, brandInfo, contentDescription);
      setCritique(result);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? `Analysis failed: ${err.message}. Check console for details.`
          : 'An unknown error occurred during analysis.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setAppStep('URL_INPUT');
    setCritique(null);
    setError(null);
    setScrapingError(null);
    setScrapedBrandInfo(null);
  }

  const renderContent = () => {
    if (appStep === 'URL_INPUT') {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <WebsiteInput onSubmit={handleUrlSubmit} isLoading={isScraping} error={scrapingError} />
        </div>
      );
    }

    if (appStep === 'CRITIQUE_FORM') {
      return (
        <>
        <div className="text-center mb-4 flex justify-start items-center">
            <button onClick={handleReset} className="text-sm text-brand-accent hover:underline">
              &larr; Start over with a new URL
            </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <InputForm
              onSubmit={handleCritiqueRequest}
              isLoading={isLoading}
              initialBrandInfo={scrapedBrandInfo}
            />
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 min-h-[500px] flex items-center justify-center">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="text-center text-brand-kill">
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p>{error}</p>
              </div>
            ) : critique ? (
              <ResultsDisplay critique={critique} onExplain={() => setShowGuide(true)} />
            ) : (
              <div className="text-center text-gray-500">
                <h2 className="text-2xl font-bold">Awaiting Content</h2>
                <p>
                  Review the scraped data, upload your ad creative, and get a
                  ruthless critique.
                </p>
              </div>
            )}
          </div>
        </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans text-brand-light">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      {showGuide && <ScoringGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default App;