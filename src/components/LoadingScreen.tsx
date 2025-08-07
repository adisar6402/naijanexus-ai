import React from 'react';
import { Shield, Cpu, Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-green-900/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto border-4 border-cyan-500 rounded-full flex items-center justify-center relative">
            <Shield className="w-16 h-16 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent mb-4">
          NaijaNexus AI
        </h1>
        
        <p className="text-cyan-300 text-xl mb-8 font-light">
          Nigeria's Unified Digital Twin for Governance
        </p>

        {/* Loading animation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Cpu className="w-6 h-6 text-blue-400 animate-pulse" />
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <Zap className="w-6 h-6 text-green-400 animate-pulse" />
        </div>

        <p className="text-gray-400 text-sm">
          Initializing AI Systems...
        </p>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-green-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default LoadingScreen;