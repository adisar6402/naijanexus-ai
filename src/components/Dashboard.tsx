import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MapPanel from './MapPanel';
import StatsPanel from './StatsPanel';
import SimulationControls from './SimulationControls';
import DataVisualization from './DataVisualization';
import { Activity, Users, TrendingUp, AlertTriangle, Zap, Globe } from 'lucide-react';

interface DashboardProps {
  userRole: 'admin' | 'agency' | 'citizen' | null;
  onLogout: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout, language, setLanguage }) => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'2d' | '3d'>('2d');
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const translations = {
    en: {
      welcome: "Welcome to NaijaNexus AI",
      dashboard: "Governance Dashboard",
      liveMetrics: "Live National Metrics",
      population: "Population",
      gdp: "GDP Growth",
      unemployment: "Unemployment",
      education: "Education Index",
      health: "Health Score",
      security: "Security Level",
      runScenario: "Run Scenario",
      exportReport: "Export Report",
      activeSimulations: "Active Simulations"
    },
    yo: {
      welcome: "Káàbọ̀ sí NaijaNexus AI",
      dashboard: "Pátákó Ìjọba",
      liveMetrics: "Àwọn Ìwọ̀n Orílẹ̀-èdè Làáyè",
      population: "Àwọn Ènìyàn",
      gdp: "Ìdàgbàsókè GDP",
      unemployment: "Àìníṣẹ́",
      education: "Àtọ́ka Ẹ̀kọ́",
      health: "Àmì Ìlera",
      security: "Ìpele Ààbò",
      runScenario: "Ṣe Àpẹẹrẹ",
      exportReport: "Gbe Ìjábọ̀ Jáde",
      activeSimulations: "Àwọn Àfọwọ́ṣe Tó Ń Lọ"
    },
    ha: {
      welcome: "Barka da zuwa NaijaNexus AI",
      dashboard: "Dashboard na Mulki",
      liveMetrics: "Auna na Kasa na Kai tsaye",
      population: "Yawan Jama'a",
      gdp: "Ci Gaban GDP",
      unemployment: "Rashin Aiki",
      education: "Alamar Ilimi",
      health: "Alamar Lafiya",
      security: "Matakin Tsaro",
      runScenario: "Gudanar da Yanayi",
      exportReport: "Fitar da Rahoto",
      activeSimulations: "Simulations masu Aiki"
    },
    ig: {
      welcome: "Nnọọ na NaijaNexus AI",
      dashboard: "Dashboard Ọchịchị",
      liveMetrics: "Ọnụọgụgụ Mba Ndụ",
      population: "Ọnụọgụgụ Ndị Mmadụ",
      gdp: "Uto GDP",
      unemployment: "Enweghị Ọrụ",
      education: "Akara Agụmakwụkwọ",
      health: "Akara Ahụike",
      security: "Ọkwa Nchebe",
      runScenario: "Mee Scenario",
      exportReport: "Bupụ Akụkọ",
      activeSimulations: "Simulations Na-arụ Ọrụ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Mock real-time data
  const [liveData, setLiveData] = useState({
    population: 218541065,
    gdpGrowth: 3.2,
    unemployment: 33.3,
    educationIndex: 0.394,
    healthScore: 42.8,
    securityLevel: 67.5
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        gdpGrowth: +(prev.gdpGrowth + (Math.random() - 0.5) * 0.1).toFixed(1),
        unemployment: Math.max(0, +(prev.unemployment + (Math.random() - 0.5) * 0.5).toFixed(1)),
        securityLevel: Math.max(0, Math.min(100, +(prev.securityLevel + (Math.random() - 0.5) * 2).toFixed(1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    {
      label: t.population,
      value: liveData.population.toLocaleString(),
      icon: Users,
      color: 'from-blue-400 to-cyan-400',
      change: '+1.2%'
    },
    {
      label: t.gdp,
      value: `${liveData.gdpGrowth}%`,
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-400',
      change: liveData.gdpGrowth > 3 ? '+0.3%' : '-0.1%'
    },
    {
      label: t.unemployment,
      value: `${liveData.unemployment}%`,
      icon: AlertTriangle,
      color: 'from-red-400 to-orange-400',
      change: '-0.7%'
    },
    {
      label: t.health,
      value: `${liveData.healthScore}/100`,
      icon: Activity,
      color: 'from-purple-400 to-pink-400',
      change: '+2.1%'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        userRole={userRole} 
        onLogout={onLogout} 
        language={language} 
        setLanguage={setLanguage}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700/30 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">{t.dashboard}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                {t.liveMetrics}
              </h3>
              <div className="space-y-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/20 hover:bg-gray-800/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                        <stat.icon className={`w-4 h-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        stat.change.startsWith('+') ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-white group-hover:scale-105 transition-transform duration-200">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Controls */}
            <SimulationControls 
              onSimulationStart={setActiveSimulation}
              language={language}
              userRole={userRole}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Stats Bar */}
          <div className="h-16 bg-gray-900/30 backdrop-blur-xl border-b border-gray-700/30 flex items-center justify-between px-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">AI Confidence: 97.3%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">
                  {selectedState || 'Nigeria Overview'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMapView(mapView === '2d' ? '3d' : '2d')}
                className="px-3 py-1 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-sm transition-colors duration-200"
              >
                {mapView === '2d' ? '3D View' : '2D View'}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105">
                {t.exportReport}
              </button>
            </div>
          </div>

          {/* Map and Data Visualization */}
          <div className="flex-1 flex">
            {/* Map Panel */}
            <div className="flex-1">
              <MapPanel 
                viewMode={mapView}
                activeSimulation={activeSimulation}
                onStateSelect={setSelectedState}
                language={language}
              />
            </div>

            {/* Right Panel - Data Visualization */}
            <div className="w-96 bg-gray-900/50 backdrop-blur-xl border-l border-gray-700/30">
              <DataVisualization 
                selectedState={selectedState}
                activeSimulation={activeSimulation}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;