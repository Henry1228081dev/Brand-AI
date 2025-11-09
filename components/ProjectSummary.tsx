import React from 'react';

interface ProjectSummaryProps {
    onClose: () => void;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 text-brand-light rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold text-white">About BrandAI</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>

                <div className="space-y-6 text-gray-300">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-lg text-brand-accent mb-2">The Problem We Solve</h3>
                        <p>
                            In today's fast-paced digital world, brands spend a fortune on ads that fail instantly. Most content is generic, off-brand, and doesn't grab attention in the crucial first few seconds. Getting expert feedback from a top-tier creative director is slow and expensive, leaving companies guessing what will actually go viral.
                        </p>
                    </div>

                     <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-lg text-brand-accent mb-2">What We Built</h3>
                        <p>
                           We built the BrandAI Creative Director—an AI-powered tool that acts as your personal, on-demand creative expert. It gives you ruthless, brutally honest feedback on your image and video ads in seconds. First, it analyzes your website to understand your brand's unique DNA. Then, it scores your content against proven viral marketing principles.
                        </p>
                    </div>

                     <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-lg text-brand-accent mb-2">Who Benefits From This?</h3>
                        <p>
                            This is for marketing teams at companies of all sizes, from startups trying to make a splash to established brands wanting to stay relevant. It empowers social media managers, content creators, and founders to make smarter, faster decisions without the high cost of a traditional creative agency.
                        </p>
                    </div>
                    
                     <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-lg text-brand-accent mb-2">What's Impressive & What Works Today</h3>
                        <p>
                           It works end-to-end, right now. You can input any website, and our AI intelligently understands its brand identity using Gemini's search tools. You can upload an image or video, and it uses the powerful Gemini Flash and Pro models to perform a deep analysis. The feedback you get is instant, structured, and actionable—telling you not just <span className="italic">what's</span> wrong, but <span className="italic">how</span> to fix it fast.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};