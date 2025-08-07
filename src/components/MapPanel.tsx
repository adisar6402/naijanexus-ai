import React, { useState, useEffect } from 'react';
import { MapPin, Layers, Zap, Users, TrendingUp, AlertTriangle, Eye, RotateCcw } from 'lucide-react';

interface MapPanelProps {
  viewMode: '2d' | '3d';
  activeSimulation: string | null;
  onStateSelect: (state: string) => void;
  language: string;
}

const MapPanel: React.FC<MapPanelProps> = ({ viewMode, activeSimulation, onStateSelect, language }) => {
  const [selectedLayer, setSelectedLayer] = useState('population');
  const [animating, setAnimating] = useState(false);

  const translations = {
    en: {
      nigeriaMap: 'Nigeria Digital Twin',
      layers: 'Data Layers',
      population: 'Population Density',
      education: 'Education Levels',
      health: 'Healthcare Facilities',
      economy: 'Economic Activity',
      security: 'Security Index',
      infrastructure: 'Infrastructure'
    },
    yo: {
      nigeriaMap: 'Àfọwọ́kọ Dijítálì Nàìjíríà',
      layers: 'Àwọn Ẹ̀kọ́ Dátà',
      population: 'Kíki Àwọn Ènìyàn',
      education: 'Àwọn Ìpele Ẹ̀kọ́',
      health: 'Àwọn Ilé-Ìwòsàn',
      economy: 'Iṣẹ́ Ọrọ-ajé',
      security: 'Àtọ́ka Ààbò',
      infrastructure: 'Ẹ̀rọ-amáyédẹrùn'
    },
    ha: {
      nigeriaMap: 'Taswirar Dijital ta Najeriya',
      layers: 'Yadudduka na Bayanai',
      population: 'Yawan Jama\'a',
      education: 'Matakan Ilimi',
      health: 'Cibiyoyin Lafiya',
      economy: 'Ayyukan Tattalin Arziki',
      security: 'Alamar Tsaro',
      infrastructure: 'Kayayyakin More'
    },
    ig: {
      nigeriaMap: 'Naịjirịa Digital Twin',
      layers: 'Data Layers',
      population: 'Njupụta Ọnụọgụgụ',
      education: 'Ọkwa Agụmakwụkwọ',
      health: 'Ụlọ Ọgwụ',
      economy: 'Ọrụ Akụnụba',
      security: 'Index Nchebe',
      infrastructure: 'Infrastructure'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const nigerianStates = [
    { name: 'Lagos', position: { top: '65%', left: '15%' }, population: 15000000, color: 'bg-blue-400' },
    { name: 'Kano', position: { top: '25%', left: '45%' }, population: 13000000, color: 'bg-green-400' },
    { name: 'Rivers', position: { top: '75%', left: '30%' }, population: 7000000, color: 'bg-yellow-400' },
    { name: 'FCT Abuja', position: { top: '50%', left: '40%' }, population: 3500000, color: 'bg-red-400' },
    { name: 'Kaduna', position: { top: '35%', left: '40%' }, population: 8000000, color: 'bg-purple-400' },
    { name: 'Ogun', position: { top: '65%', left: '20%' }, population: 5200000, color: 'bg-cyan-400' },
    { name: 'Delta', position: { top: '70%', left: '25%' }, population: 5600000, color: 'bg-pink-400' },
    { name: 'Borno', position: { top: '15%', left: '70%' }, population: 5800000, color: 'bg-indigo-400' }
  ];

  const dataLayers = [
    { id: 'population', label: t.population, icon: Users, color: 'text-blue-400' },
    { id: 'education', label: t.education, icon: TrendingUp, color: 'text-green-400' },
    { id: 'health', label: t.health, icon: AlertTriangle, color: 'text-red-400' },
    { id: 'economy', label: t.economy, icon: Zap, color: 'text-yellow-400' },
    { id: 'security', label: t.security, icon: Eye, color: 'text-purple-400' },
    { id: 'infrastructure', label: t.infrastructure, icon: MapPin, color: 'text-cyan-400' }
  ];

  useEffect(() => {
    if (activeSimulation) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 3000);
    }
  }, [activeSimulation]);

  const getStateIntensity = (stateName: string) => {
    const intensities: { [key: string]: number } = {
      'Lagos': 0.9,
      'Kano': 0.7,
      'Rivers': 0.6,
      'FCT Abuja': 0.8,
      'Kaduna': 0.5,
      'Ogun': 0.4,
      'Delta': 0.5,
      'Borno': 0.3
    };
    return intensities[stateName] || 0.3;
  };

  return (
    <div className="relative h-full bg-gray-900/30 backdrop-blur-xl">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">{t.nigeriaMap}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Live Data</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAnimating(true)}
              className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Refresh Data"
            >
              <RotateCcw className="w-4 h-4 text-gray-400" />
            </button>
            <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => {}}
                className="px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/20 rounded-md"
              >
                {viewMode.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Layers Panel */}
      <div className="absolute top-20 left-4 z-20 w-64">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Layers className="w-4 h-4 text-gray-400" />
            <h4 className="font-medium text-white text-sm">{t.layers}</h4>
          </div>
          
          <div className="space-y-2">
            {dataLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  selectedLayer === layer.id
                    ? 'bg-gray-700/50 border border-gray-600/50'
                    : 'hover:bg-gray-800/30'
                }`}
              >
                <layer.icon className={`w-4 h-4 ${layer.color}`} />
                <span className="text-sm text-gray-300 flex-1 text-left">{layer.label}</span>
                {selectedLayer === layer.id && (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nigeria Map Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pt-20">
        <div className="relative w-full max-w-4xl h-full">
          {/* Map Background */}
          <div className="relative w-full h-5/6 bg-gradient-to-br from-gray-800/20 to-gray-900/40 rounded-3xl border border-gray-700/30 overflow-hidden">
            
            {/* Map Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>

            {/* Nigeria Outline (Simplified) */}
            <div className="absolute inset-0">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full opacity-30"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))' }}
              >
                {/* Simplified Nigeria border */}
                <path
                  d="M200,100 L800,120 L850,200 L820,350 L750,450 L600,480 L400,470 L250,400 L180,300 L200,100 Z"
                  stroke="rgba(0, 255, 255, 0.6)"
                  strokeWidth="2"
                  fill="rgba(0, 100, 150, 0.1)"
                />
              </svg>
            </div>

            {/* State Markers */}
            {nigerianStates.map((state) => (
              <div
                key={state.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ 
                  top: state.position.top, 
                  left: state.position.left,
                  zIndex: 20 
                }}
                onClick={() => onStateSelect(state.name)}
              >
                {/* Pulsing ring for active simulation */}
                {animating && (
                  <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400 rounded-full animate-ping"></div>
                )}

                {/* State dot */}
                <div className={`relative w-6 h-6 ${state.color} rounded-full shadow-lg group-hover:scale-125 transition-all duration-300`}>
                  <div className="absolute inset-0 rounded-full animate-pulse opacity-50 bg-current"></div>
                  
                  {/* Population visualization ring */}
                  <div 
                    className="absolute inset-0 border-2 border-current rounded-full opacity-60"
                    style={{
                      transform: `scale(${1 + getStateIntensity(state.name)})`
                    }}
                  ></div>
                </div>

                {/* State info tooltip */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-40">
                  <p className="font-semibold text-white text-sm">{state.name}</p>
                  <p className="text-xs text-gray-400">
                    Pop: {(state.population / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-cyan-400 mt-1">
                    Intensity: {Math.round(getStateIntensity(state.name) * 100)}%
                  </p>
                </div>
              </div>
            ))}

            {/* Active Simulation Overlay */}
            {activeSimulation && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl animate-pulse">
                <div className="absolute top-4 right-4 bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2">
                  <p className="text-sm font-medium text-cyan-300">
                    Running: {activeSimulation}
                  </p>
                </div>
              </div>
            )}

            {/* Heatmap overlay based on selected layer */}
            <div className="absolute inset-0 pointer-events-none">
              {selectedLayer === 'population' && (
                <div className="w-full h-full opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/40 rounded-full blur-xl"></div>
                  <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-green-500/40 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-yellow-500/40 rounded-full blur-xl"></div>
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-0 right-0 bg-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-tl-xl p-4">
            <h4 className="text-sm font-medium text-white mb-3">Data Intensity</h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Low</span>
              <div className="w-20 h-2 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 rounded-full"></div>
              <span className="text-xs text-gray-400">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;