import React from 'react';

const LoadingScreenAlt = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-100 to-white flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        
        {/* GIF Container with Pulse + Rotate Animation */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Background layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white rounded-full"></div>
          
          {/* GIF with pulse-rotate animation */}
          <img 
            src="/images/elephant.gif"
            className="w-full h-full object-contain animate-pulse-rotate"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '50%',
              padding: '8px'
            }}
          />
          
          {/* Pulsing border */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-400/30 animate-pulse z-20"></div>
        </div>

        {/* Brand Title */}
        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient bg-300%">
            Anuradhapura Adventures
          </span>
        </h1>

        {/* Progress Bar */}
        <div className="w-64 h-2.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 rounded-full animate-progress"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 text-sm font-mono tracking-widest animate-pulse">
          LOADING EXPERIENCE...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreenAlt;