import React, { useState } from 'react';
import Navbar from './Navbar';
import MapPanel from './MapPanel';
import { Play, Pause, Square, Settings, Download, Share, RotateCcw, Zap } from 'lucide-react';

interface SimulationPanelProps {
  userRole: 'admin' | 'agency' | 'citizen' | null;
  language: string;
  setLanguage: (lang: string) => void;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ userRole, language, setLanguage }) => {
  const [activeScenario, setActiveScenario] = useState('fuel-subsidy');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'fuel-subsidy',
      title: 'Fuel Subsidy Analysis',
      description: 'Impact of removing petroleum subsidies on national economy',
      estimatedTime: '5-8 minutes',
      complexity: 'High'
    },
    {
      id: 'tech-hub',
      title: 'Technology Hub Development',
      description: 'Creating innovation hubs in Lagos, Abuja, and Port Harcourt',
      estimatedTime: '3-5 minutes',
      complexity: 'Medium'
    },
    {
      id: 'flood-impact',
      title: 'Flood Impact Assessment',
      description: 'Simulating flooding effects in Niger Delta region',
      estimatedTime: '4-6 minutes',
      complexity: 'High'
    }
  ];

  const simulationParams = {
    'fuel-subsidy': {
      subsidyReduction: 75,
      implementationPeriod: 12,
      socialSupport: 45,
      economicGrowthTarget: 4.2
    },
    'tech-hub': {
      investment: 2.5,
      jobsCreated: 50000,
      skillsTraining: 85,
      privatePartnership: 60
    },
    'flood-impact': {
      rainfall: 150,
      floodDuration: 72,
      evacuationCapacity: 80,
      reliefFunding: 1.2
    }
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const handleStopSimulation = () => {
    setIsRunning(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        userRole={userRole} 
        onLogout={() => {}} 
        language={language} 
        setLanguage={setLanguage}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Simulation Controls Panel */}
        <div className="w-96 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700/30 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Simulation Lab</h2>
                  <p className="text-sm text-purple-400">Advanced Scenario Modeling</p>
                </div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
            </div>

            {/* Scenario Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-white mb-4">Select Scenario</h3>
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      activeScenario === scenario.id
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50'
                    }`}
                    onClick={() => setActiveScenario(scenario.id)}
                  >
                    <h4 className="font-medium text-white mb-1">{scenario.title}</h4>
                    <p className="text-xs text-gray-400 mb-3">{scenario.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-400">{scenario.estimatedTime}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        scenario.complexity === 'High' ? 'bg-red-400/20 text-red-400' :
                        scenario.complexity === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-green-400/20 text-green-400'
                      }`}>
                        {scenario.complexity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parameters */}
            <div className="mb-8">
              <h3 className="font-semibold text-white mb-4">Parameters</h3>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/20">
                {activeScenario === 'fuel-subsidy' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Subsidy Reduction (%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simulationParams[activeScenario].subsidyReduction}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span className="text-purple-400">{simulationParams[activeScenario].subsidyReduction}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Implementation Period (months)</label>
                      <input
                        type="range"
                        min="6"
                        max="24"
                        value={simulationParams[activeScenario].implementationPeriod}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>6</span>
                        <span className="text-purple-400">{simulationParams[activeScenario].implementationPeriod}</span>
                        <span>24</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Social Support Package (%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simulationParams[activeScenario].socialSupport}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span className="text-purple-400">{simulationParams[activeScenario].socialSupport}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeScenario === 'tech-hub' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Investment (₦ Billion)</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={simulationParams[activeScenario].investment}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center text-purple-400 text-sm mt-1">
                        ₦{simulationParams[activeScenario].investment}B
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Jobs Created</label>
                      <input
                        type="range"
                        min="10000"
                        max="200000"
                        step="5000"
                        value={simulationParams[activeScenario].jobsCreated}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center text-purple-400 text-sm mt-1">
                        {simulationParams[activeScenario].jobsCreated.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="space-y-3">
              {!isRunning ? (
                <button
                  onClick={handleRunSimulation}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Run Simulation</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleStopSimulation}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop Simulation</span>
                  </button>
                  
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-bold text-purple-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Analyzing scenario parameters...
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-700/50 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="flex-1 bg-gray-700/50 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* AI Insights */}
            {progress > 50 && (
              <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
                <h4 className="font-semibold text-purple-300 mb-2">AI Insights</h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <p>• Economic impact detected in southwestern states</p>
                  <p>• Population migration patterns emerging</p>
                  <p>• Infrastructure strain increasing by 12%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Visualization */}
        <div className="flex-1">
          <MapPanel 
            viewMode="2d"
            activeSimulation={isRunning ? activeScenario : null}
            onStateSelect={setSelectedState}
            language={language}
          />
        </div>

        {/* Results Panel */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-xl border-l border-gray-700/30 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-4">Simulation Results</h3>
              
              {progress > 0 ? (
                <div className="space-y-4">
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-cyan-400 mb-2">Economic Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">GDP Change:</span>
                        <span className="text-green-400 font-bold">+2.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Inflation:</span>
                        <span className="text-red-400 font-bold">+5.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Unemployment:</span>
                        <span className="text-yellow-400 font-bold">+1.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-2">Social Effects</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Poverty Rate:</span>
                        <span className="text-red-400 font-bold">+3.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Migration:</span>
                        <span className="text-yellow-400 font-bold">Moderate</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-400 mb-2">Regional Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Most Affected:</span>
                        <span className="text-red-400">North East</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Least Affected:</span>
                        <span className="text-green-400">South West</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-gray-700/30 rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-sm">Run a simulation to see results</p>
                </div>
              )}
            </div>

            {progress >= 100 && (
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
                
                <button className="w-full bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Share className="w-4 h-4" />
                  <span>Share Results</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;