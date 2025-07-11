import React from 'react';

const ModernLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-tr from-purple-900 via-blue-900 to-indigo-800 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-400/10 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="text-center z-10 px-4">
        {/* Main Loading Animation */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 border-r-blue-400 rounded-full animate-spin"></div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full animate-bounce"></div>
            </div>
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 -right-1 w-2 h-2 bg-pink-400 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 -left-1 w-2 h-2 bg-orange-400 rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Animated Title */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 animate-pulse">
            Anuradhapura Adventures
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>

        {/* Loading Dots with Wave Animation */}
        <div className="flex justify-center space-x-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <p className="text-white/90 text-lg font-medium animate-pulse">
            Preparing your journey...
          </p>
          <p className="text-white/60 text-sm">
            Discovering ancient wonders
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-40 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-indigo-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoadingScreen;