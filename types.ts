
export interface BrandInfo {
  name: string;
  personality: string;
  colors: string;
  platform: string;
  competitors: string;
}

export interface CritiqueResult {
  verdict: 'DEPLOY' | 'REVISE' | 'KILL' | 'UNDEPLOYABLE - KILL IT';
  overall_score: number;
  viral_potential: number;
  scores: {
    brand_fit: number;
    clarity: number;
    visual_quality: number;
    safety: number;
  };
  score_explanations: {
    brand_fit: string;
    clarity: string;
    visual_quality: string;
    safety: string;
  };
  brutal_truth: string;
  what_broke?: string[];
  kill_reasons?: string[];
  emergency_fix?: string;
  market_intel: {
    trending_now: string[];
    competitor_gap: string;
    hot_topics?: string[];
    viral_format_of_week?: string;
    competitor_move?: string;
    cultural_alert?: string;
  };
  viral_tactics_used: string[];
  viral_tactics_missing: string[];
  fix_it_fast: string;
}