import React from 'react';
import { Compass } from 'lucide-react';

const TravelPreloader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center z-50">
      {/* Main compass element */}
      <div className="relative w-32 h-32">
        {/* Outer ring with subtle rotation */}
        <div className="absolute inset-0 border-2 border-amber-200/80 rounded-full animate-spin-slow"></div>
        
        {/* Compass icon with gentle pulse */}
        <div className="absolute inset-6 flex items-center justify-center">
          <Compass 
            className="w-16 h-16 text-amber-500 animate-pulse-slow" 
            strokeWidth={1.5}
          />
        </div>
        
        {/* Direction indicators */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-amber-400 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-amber-400 rounded-full"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-amber-400 rounded-full"></div>
        
        {/* Floating dots for visual interest */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-sky-400 rounded-full animate-float"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-amber-300 rounded-full animate-float-delay"></div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-amber-200/40 rounded-full animate-fade-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-sky-200/40 rounded-full animate-fade-pulse-delay"></div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        .animate-fade-pulse {
          animation: fade-pulse 4s ease-in-out infinite;
        }
        .animate-fade-pulse-delay {
          animation: fade-pulse 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default TravelPreloader;