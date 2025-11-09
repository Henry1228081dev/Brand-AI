
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-gray-700">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          <span className="text-brand-accent">BrandAI</span> Creative Director
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Real-Time Critique. Zero Bullshit.
        </p>
      </div>
    </header>
  );
};
