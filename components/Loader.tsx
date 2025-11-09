
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-accent mx-auto"></div>
      <h2 className="text-xl font-bold mt-4 text-white">Analyzing...</h2>
      <p className="text-gray-400">Don't waste my time.</p>
    </div>
  );
};
