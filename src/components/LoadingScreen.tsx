import React from 'react';
import { Compass, MapPin, Plane } from 'lucide-react';

const TourismPreloader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating travel icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <MapPin className="w-8 h-8 text-cyan-400" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float">
          <Plane className="w-6 h-6 text-emerald-400" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float">
          <Compass className="w-7 h-7 text-amber-400" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Pulsing circles */}
        <div className="absolute top-1/5 right-1/5 w-32 h-32 border border-cyan-400/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/5 left-1/5 w-24 h-24 border border-emerald-400/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-2/3 w-20 h-20 border border-amber-400/30 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      {/* Main preloader */}
      <div className="relative">
        
        {/* Outer rotating compass */}
        <div className="w-40 h-40 relative">
          
          {/* Outer ring with gradient */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-500 animate-spin p-1" style={{ animationDuration: '3s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"></div>
          </div>
          
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border-4 border-transparent bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 animate-spin p-1" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"></div>
          </div>
          
          {/* Inner core with pulsing effect */}
          <div className="absolute inset-12 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 animate-pulse flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse"></div>
          </div>
          
          {/* Floating travel elements around compass */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          </div>
          <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '2s' }}>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
          </div>
          
        </div>

        {/* Ripple effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 border border-cyan-400/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute w-64 h-64 border border-emerald-400/20 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          <div className="absolute w-72 h-72 border border-amber-400/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        </div>
        
      </div>
      
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TourismPreloader;