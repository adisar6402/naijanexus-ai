import React, { useState } from 'react';
import { Play, Settings, Zap, TrendingUp, AlertTriangle, Globe, Users, Briefcase } from 'lucide-react';

interface SimulationControlsProps {
  onSimulationStart: (scenario: string) => void;
  language: string;
  userRole: 'admin' | 'agency' | 'citizen' | null;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({ onSimulationStart, language, userRole }) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  const translations = {
    en: {
      scenarios: 'Simulation Scenarios',
      runScenario: 'Run Scenario',
      fuelSubsidy: 'Fuel Subsidy Removal',
      techHub: 'Tech Hub Creation',
      disaster: 'Natural Disaster',
      epidemic: 'Disease Outbreak',
      economic: 'Economic Policy',
      infrastructure: 'Infrastructure Development',
      intensity: 'Simulation Intensity',
      duration: 'Duration (months)',
      impact: 'Expected Impact',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    yo: {
      scenarios: 'Àwọn Àpẹẹrẹ Àfọwọ́ṣe',
      runScenario: 'Ṣe Àpẹẹrẹ',
      fuelSubsidy: 'Ìyọ Ìrànwọ́ Epo',
      techHub: 'Dída Ilé-iṣẹ́ Ímọ̀-ẹ̀rọ',
      disaster: 'Àjálù Àyíká',
      epidemic: 'Àrùn Àkóbá',
      economic: 'Ètò Ọrọ-ajé',
      infrastructure: 'Ìdàgbàsókè Ẹ̀rọ-amáyédẹrùn',
      intensity: 'Agbára Àfọwọ́ṣe',
      duration: 'Ìgbà (oṣù)',
      impact: 'Ipa tó Yẹ kó Wáyé',
      high: 'Gíga',
      medium: 'Àárín',
      low: 'Kékeré'
    },
    ha: {
      scenarios: 'Yanayin Gwaji',
      runScenario: 'Gudanar da Yanayi',
      fuelSubsidy: 'Cire Tallafin Man',
      techHub: 'Gina Cibiyar Fasaha',
      disaster: 'Bala\'i na Yanayi',
      epidemic: 'Barkewar Cuta',
      economic: 'Manufar Tattalin Arziki',
      infrastructure: 'Ci Gaban Kayayyaki',
      intensity: 'Matsakaicin Gwaji',
      duration: 'Tsawon Lokaci (watanni)',
      impact: 'Tasirin da ake Tsammani',
      high: 'Babba',
      medium: 'Matsakaici',
      low: 'Karami'
    },
    ig: {
      scenarios: 'Ọnọdụ Nnwale',
      runScenario: 'Mee Scenario',
      fuelSubsidy: 'Mwepụ Enyemaka Mmanụ',
      techHub: 'Ime Ebe Technology',
      disaster: 'Ọdachi Eke',
      epidemic: 'Mgbasa Ọrịa',
      economic: 'Iwu Akụnụba',
      infrastructure: 'Mmepe Infrastructure',
      intensity: 'Ike Nnwale',
      duration: 'Ogologo Oge (ọnwa)',
      impact: 'Mmetụta a na-atụ Anya',
      high: 'Elu',
      medium: 'Etiti',
      low: 'Ala'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const scenarios = [
    {
      id: 'fuel-subsidy',
      title: t.fuelSubsidy,
      description: 'Analyze impact of removing fuel subsidies nationwide',
      icon: Zap,
      color: 'from-red-400 to-orange-500',
      impact: 'high',
      duration: 12,
      restricted: false
    },
    {
      id: 'tech-hub',
      title: t.techHub,
      description: 'Create technology innovation hubs in major cities',
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      impact: 'medium',
      duration: 24,
      restricted: false
    },
    {
      id: 'disaster',
      title: t.disaster,
      description: 'Simulate flood impact in Niger Delta region',
      icon: AlertTriangle,
      color: 'from-yellow-400 to-red-500',
      impact: 'high',
      duration: 6,
      restricted: userRole === 'citizen'
    },
    {
      id: 'epidemic',
      title: t.epidemic,
      description: 'Model disease outbreak response in northern states',
      icon: Globe,
      color: 'from-purple-400 to-pink-500',
      impact: 'high',
      duration: 8,
      restricted: userRole === 'citizen'
    },
    {
      id: 'economic',
      title: t.economic,
      description: 'Test new economic policies on GDP growth',
      icon: Briefcase,
      color: 'from-green-400 to-emerald-500',
      impact: 'medium',
      duration: 18,
      restricted: false
    },
    {
      id: 'infrastructure',
      title: t.infrastructure,
      description: 'Plan major infrastructure development projects',
      icon: Users,
      color: 'from-indigo-400 to-blue-500',
      impact: 'low',
      duration: 36,
      restricted: userRole === 'citizen'
    }
  ];

  const handleRunSimulation = () => {
    if (selectedScenario) {
      setIsRunning(true);
      onSimulationStart(selectedScenario);
      
      setTimeout(() => {
        setIsRunning(false);
      }, 3000);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">{t.scenarios}</h3>
        
        <div className="space-y-3">
          {scenarios.filter(s => !s.restricted).map((scenario) => (
            <div
              key={scenario.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedScenario === scenario.id
                  ? 'bg-gray-800/50 border-cyan-400/50'
                  : 'bg-gray-800/20 border-gray-700/30 hover:bg-gray-800/30 hover:border-gray-600/50'
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${scenario.color} bg-opacity-20 flex-shrink-0`}>
                  <scenario.icon className={`w-5 h-5 bg-gradient-to-br ${scenario.color} bg-clip-text text-transparent`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm mb-1">{scenario.title}</h4>
                  <p className="text-xs text-gray-400 mb-3">{scenario.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs">
                      <span className={`${getImpactColor(scenario.impact)} font-medium`}>
                        {t[scenario.impact as keyof typeof t]}
                      </span>
                      <span className="text-gray-500">
                        {scenario.duration}mo
                      </span>
                    </div>
                    
                    {selectedScenario === scenario.id && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Parameters */}
      {selectedScenario && (
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
          <h4 className="font-medium text-white mb-4 text-sm">Parameters</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t.intensity}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10%</span>
                <span className="text-cyan-400">{intensity}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t.duration}
              </label>
              <select className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400">
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Run Button */}
      <button
        onClick={handleRunSimulation}
        disabled={!selectedScenario || isRunning}
        className={`w-full flex items-center justify-center space-x-3 py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 ${
          selectedScenario && !isRunning
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20'
            : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isRunning ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Running Simulation...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>{t.runScenario}</span>
          </>
        )}
      </button>

      {/* AI Confidence Indicator */}
      <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-300">AI Confidence</span>
          <span className="text-xs text-cyan-400 font-bold">97.3%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: '97.3%' }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Model accuracy based on historical data and current parameters
        </p>
      </div>
    </div>
  );
};

export default SimulationControls;