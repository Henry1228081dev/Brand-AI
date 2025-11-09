import React from 'react';

interface ScoringGuideProps {
    onClose: () => void;
}

export const ScoringGuide: React.FC<ScoringGuideProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 text-brand-light rounded-lg border border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-extrabold text-white">Scoring Rubric</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-brand-accent mb-2">Step 3: The 4-Score Diagnostic</h3>
                        
                        <div className="space-y-4">
                            {/* BrandFit */}
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold">1️⃣ BrandFit (0.0-1.0)</h4>
                                <p className="italic text-gray-400">"Will anyone know who the fuck this is?"</p>
                                <p className="mt-2 font-medium">Check:</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                    <li>Logo visible in first 3 seconds? (Yes = +0.3)</li>
                                    <li>Brand colors dominate? (Yes = +0.2)</li>
                                    <li>Tone matches brand DNA? (Yes = +0.3)</li>
                                    <li>Reinforces brand equity? (Yes = +0.2)</li>
                                </ul>
                                <p className="mt-2 font-medium">Viral Brand Benchmarks:</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                    <li><strong>RYANAIR-STYLE:</strong> Self-deprecating humor, memes, GenZ slang, under 10 seconds.</li>
                                    <li><strong>WENDY'S-STYLE:</strong> Roasting competitors, witty one-liners, Twitter-first energy.</li>
                                </ul>
                            </div>

                            {/* Clarity */}
                             <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold">2️⃣ Clarity (0.0-1.0)</h4>
                                <p className="italic text-gray-400">"Will this make someone stop scrolling and buy?"</p>
                                <p className="mt-2 font-medium">AIDA Breakdown:</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                    <li><strong>Attention (0-1s):</strong> 1.0 for a shocking visual/sound, pattern interrupt. 0.0 for boring shots.</li>
                                    <li><strong>Interest (1-3s):</strong> 1.0 for building suspense. 0.0 for "scroll".</li>
                                    <li><strong>Desire (3-6s):</strong> 1.0 for "I want that NOW". 0.0 for "Why do I care?".</li>
                                    <li><strong>Action (last 2s):</strong> 1.0 for a clear CTA in safe zone. 0.0 for no CTA.</li>
                                </ul>
                                <p className="mt-2 font-medium">Platform Rules (STRICT):</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                   <li>TikTok/Reels: 7-10 seconds MAX. Hook in 0.5 seconds. Captions ON.</li>
                                </ul>
                            </div>
                            
                            {/* VisualQuality */}
                             <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold">3️⃣ VisualQuality (0.0-1.0)</h4>
                                <p className="italic text-gray-400">"Does this look like authentic UGC or AI slop?"</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                                    <li>✅ <strong>GOOD Lo-Fi:</strong> iPhone selfie, natural lighting, real reactions.</li>
                                    <li>❌ <strong>BAD Lo-Fi:</strong> Blurry mess, typos, bad composition.</li>
                                    <li><strong>AI Artifacts:</strong> Weird hands/skin texture/backgrounds = PENALTY.</li>
                                    <li><strong>Pro Standards:</strong> 9:16 vertical, 1080p min, readable text.</li>
                                </ul>
                            </div>

                            {/* Safety */}
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold">4️⃣ Safety (0.0-1.0)</h4>
                                <p className="italic text-gray-400">"Will this get us sued or cancelled?"</p>
                                <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                                    <li><strong>Instant 0.0 Triggers:</strong> False claims, misleading pricing, hate speech, copyright infringement.</li>
                                    <li><strong>Brand Risk Check:</strong> Too edgy? Tone-deaf? Could be misinterpreted?</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-brand-accent mb-2">Step 4: The Verdict</h3>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <p className="font-medium">Calculate:</p>
                             <ul className="list-disc list-inside text-gray-300 text-sm">
                                <li><strong>Overall Score</strong> = Average of 4 scores</li>
                                <li><strong>Viral Potential</strong> = (Clarity × 0.4) + (BrandFit × 0.3) + (VisualQuality × 0.3)</li>
                            </ul>
                            <p className="mt-2 font-medium">Thresholds:</p>
                             <ul className="list-disc list-inside text-gray-300 text-sm">
                                <li><strong>0.8+</strong> = Deploy immediately</li>
                                <li><strong>0.6-0.7</strong> = Needs tweaks</li>
                                <li><strong>0.4-0.5</strong> = Major rework required</li>
                                <li><strong>0.0-0.3</strong> = Scrap it and start over</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};