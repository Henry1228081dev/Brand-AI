import React, { useState } from 'react';

interface WebsiteInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  onShowSummary: () => void;
}

export const WebsiteInput: React.FC<WebsiteInputProps> = ({
  onSubmit,
  isLoading,
  error,
  onShowSummary,
}) => {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Basic URL validation
      new URL(url);
      setValidationError('');
      onSubmit(url);
    } catch (_) {
      setValidationError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fade-in">
      <h2 className="text-3xl font-extrabold text-white mb-2">
        Step 1: Scrape Brand DNA
      </h2>
      <p className="text-gray-400 mb-6">
        Enter your brand's homepage URL. We'll crawl it to learn your identity.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourbrand.com"
          className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:ring-brand-accent focus:border-brand-accent text-lg"
          disabled={isLoading}
          required
        />
        {validationError && <p className="text-sm text-brand-warn">{validationError}</p>}
        {error && <p className="text-sm text-brand-kill mt-2">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-accent text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-green-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Scraping Brand DNA...
            </div>
          ) : (
            'Scrape Website & Proceed'
          )}
        </button>
      </form>
       <button onClick={onShowSummary} className="text-sm text-gray-400 hover:underline mt-6">
        What is this?
      </button>
    </div>
  );
};