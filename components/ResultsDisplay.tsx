import React from 'react';
import type { CritiqueResult } from '../types';

interface ResultsDisplayProps {
  critique: CritiqueResult;
  onExplain: () => void;
}

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case 'DEPLOY':
      return 'bg-brand-accent text-brand-dark';
    case 'REVISE':
      return 'bg-brand-warn text-brand-dark';
    case 'KILL':
    case 'UNDEPLOYABLE - KILL IT':
      return 'bg-brand-kill text-white';
    default:
      return 'bg-brand-gray text-white';
  }
};

const ScoreBar: React.FC<{ score: number; label: string }> = ({ score, label }) => {
  const percentage = Math.round(score * 100);
  const getBarColor = (p: number) => {
    if (p >= 80) return 'bg-brand-accent';
    if (p >= 60) return 'bg-brand-warn';
    return 'bg-brand-kill';
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div className={`${getBarColor(percentage)} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ critique, onExplain }) => {
  if (critique.verdict === 'UNDEPLOYABLE - KILL IT') {
    return (
      <div className="w-full text-center p-4 bg-brand-kill/10 border border-brand-kill rounded-lg">
        <h2 className={`text-3xl font-extrabold px-4 py-2 rounded-md inline-block ${getVerdictColor(critique.verdict)}`}>
            {critique.verdict}
        </h2>
        <button 
          onClick={onExplain} 
          className="mt-2 text-sm text-gray-400 hover:text-white hover:underline"
        >
          Explain this verdict
        </button>
        <div className="my-4 text-left">
          <h3 className="font-bold text-lg text-brand-kill mb-2">Kill Reasons:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {critique.kill_reasons?.map((reason, i) => <li key={i}>{reason}</li>)}
          </ul>
        </div>
        <div className="text-left">
           <h3 className="font-bold text-lg text-brand-accent mb-2">Emergency Fix:</h3>
           <p className="text-gray-300">{critique.emergency_fix}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 text-left animate-fade-in">
      <div className="text-center">
        <span className={`text-3xl font-extrabold px-4 py-2 rounded-md inline-block ${getVerdictColor(critique.verdict)}`}>
          {critique.verdict}
        </span>
         <button 
          onClick={onExplain} 
          className="block mx-auto mt-2 text-sm text-gray-400 hover:text-white hover:underline"
        >
          Explain this verdict
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreBar score={critique.overall_score} label="Overall Score" />
        <ScoreBar score={critique.viral_potential} label="Viral Potential" />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-bold text-lg text-gray-200 mb-3">The Scorecard</h3>
        <div className="space-y-3">
          <ScoreBar score={critique.scores.brand_fit} label="1. Brand Fit" />
          <ScoreBar score={critique.scores.clarity} label="2. Clarity (AIDA)" />
          <ScoreBar score={critique.scores.visual_quality} label="3. Visual Quality" />
          <ScoreBar score={critique.scores.safety} label="4. Safety" />
        </div>
      </div>
      
      {critique.score_explanations && (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-200 mb-3">Score Breakdown</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-300">1. Brand Fit ({Math.round(critique.scores.brand_fit * 100)}%)</h4>
                    <p className="text-sm text-gray-400 pl-4 border-l-2 border-gray-700 ml-2 mt-1">{critique.score_explanations.brand_fit}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-300">2. Clarity ({Math.round(critique.scores.clarity * 100)}%)</h4>
                    <p className="text-sm text-gray-400 pl-4 border-l-2 border-gray-700 ml-2 mt-1">{critique.score_explanations.clarity}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-300">3. Visual Quality ({Math.round(critique.scores.visual_quality * 100)}%)</h4>
                    <p className="text-sm text-gray-400 pl-4 border-l-2 border-gray-700 ml-2 mt-1">{critique.score_explanations.visual_quality}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-300">4. Safety ({Math.round(critique.scores.safety * 100)}%)</h4>
                    <p className="text-sm text-gray-400 pl-4 border-l-2 border-gray-700 ml-2 mt-1">{critique.score_explanations.safety}</p>
                </div>
            </div>
        </div>
      )}


      <blockquote className="border-l-4 border-brand-accent p-4 bg-gray-800 rounded-r-lg">
        <p className="text-lg italic font-semibold text-white">"{critique.brutal_truth}"</p>
      </blockquote>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-brand-kill mb-2">What Broke:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
                {critique.what_broke?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-brand-accent mb-2">Fix It Fast:</h3>
            <p className="text-gray-300">{critique.fix_it_fast}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-bold text-lg text-brand-warn mb-2">Market Intel:</h3>
        <p className="text-gray-400 text-sm"><strong className="text-gray-200">Trending Now:</strong> {critique.market_intel.trending_now.join(', ')}</p>
        <p className="text-gray-400 text-sm"><strong className="text-gray-200">Competitor Gap:</strong> {critique.market_intel.competitor_gap}</p>
      </div>

    </div>
  );
};