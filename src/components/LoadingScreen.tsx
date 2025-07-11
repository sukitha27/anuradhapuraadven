
import React from 'react';
import { Globe } from 'lucide-react';

const LoadingScreenAlt = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Travel Compass Animation */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer compass ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-amber-400 border-r-orange-400 rounded-full animate-spin"></div>
            
            {/* Middle compass ring */}
            <div className="absolute inset-3 border-4 border-transparent border-b-red-400 border-l-yellow-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            
            {/* Inner compass core */}
            <div className="absolute inset-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            
            {/* Floating travel elements */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
        
        {/* Travel Brand Text */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6 animate-pulse">
          Anuradhapura Adventures
        </h1>
        
        {/* Journey Progress Bar */}
        <div className="w-64 h-3 bg-orange-800/30 rounded-full mx-auto mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-300 to-orange-300 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
        
        {/* Mountain Range Animation */}
        <div className="flex justify-center items-end space-x-1 mb-6 h-12">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className={`bg-gradient-to-t from-amber-300 to-orange-200 rounded-t-full animate-pulse ${
                index === 3 ? 'w-4 h-12' : index === 2 || index === 4 ? 'w-3 h-10' : 'w-2 h-8'
              }`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
        
        {/* Status Text */}
        <p className="text-slate-300 text-lg font-medium">
          Planning your adventure...
        </p>
        
        {/* Subtle travel background pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-amber-300 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-20 h-20 border border-orange-300 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-16 h-16 border border-red-300 rounded-full animate-ping" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreenAlt;
