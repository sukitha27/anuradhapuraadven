
import React from 'react';

const LoadingScreen = () => {
  return (
     <div className="fixed inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl relative">
            {/* Modern geometric animation */}
            <div className="absolute inset-3">
              <div className="w-full h-full border-2 border-emerald-500 rounded-lg animate-spin"></div>
              <div className="absolute inset-1 border-2 border-teal-400 rounded-lg animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-2 border-2 border-cyan-400 rounded-lg animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
          Anuradhapura Adventures
        </h1>
        
        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="text-white/80 mt-6 text-lg">Preparing your journey...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
