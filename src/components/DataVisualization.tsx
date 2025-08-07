import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, AlertTriangle, Activity, Download, RefreshCw } from 'lucide-react';

interface DataVisualizationProps {
  selectedState: string | null;
  activeSimulation: string | null;
  language: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ selectedState, activeSimulation, language }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    population: 218541065,
    gdp: 3.2,
    unemployment: 33.3,
    literacy: 62.0,
    healthIndex: 42.8
  });

  const translations = {
    en: {
      overview: 'Overview',
      analytics: 'Analytics',
      predictions: 'Predictions',
      reports: 'Reports',
      currentData: 'Current Data',
      historicalTrend: 'Historical Trend',
      forecast: 'AI Forecast',
      downloadReport: 'Download Report',
      refreshData: 'Refresh Data',
      population: 'Population',
      gdp: 'GDP Growth',
      unemployment: 'Unemployment',
      literacy: 'Literacy Rate',
      healthIndex: 'Health Index'
    },
    yo: {
      overview: 'Àkójọpọ̀',
      analytics: 'Ìtúpalẹ̀',
      predictions: 'Àwọn Àsọtẹ́lẹ̀',
      reports: 'Àwọn Ìjábọ̀',
      currentData: 'Dátà Tó Wà Báyìí',
      historicalTrend: 'Iṣẹ̀lẹ̀ Ìtàn',
      forecast: 'Àsọtẹ́lẹ̀ AI',
      downloadReport: 'Gba Ìjábọ̀ Sílẹ̀',
      refreshData: 'Tun Dátà Ṣe',
      population: 'Àwọn Ènìyàn',
      gdp: 'Ìdàgbàsókè GDP',
      unemployment: 'Àìníṣẹ́',
      literacy: 'Ìpele Kíkà-kọ̀',
      healthIndex: 'Àtọ́ka Ìlera'
    },
    ha: {
      overview: 'Bayyani',
      analytics: 'Bincike',
      predictions: 'Hasashe',
      reports: 'Rahotanni',
      currentData: 'Bayanan Yanzu',
      historicalTrend: 'Tarihin Yanayi',
      forecast: 'Hasashen AI',
      downloadReport: 'Sauke Rahoto',
      refreshData: 'Sabunta Bayanai',
      population: 'Yawan Jama\'a',
      gdp: 'Ci Gaban GDP',
      unemployment: 'Rashin Aiki',
      literacy: 'Yawan Karatu',
      healthIndex: 'Alamar Lafiya'
    },
    ig: {
      overview: 'Nchịkọta',
      analytics: 'Nyocha',
      predictions: 'Amụma',
      reports: 'Akụkọ',
      currentData: 'Data Ugbu A',
      historicalTrend: 'Akụkọ Ihe Mere Eme',
      forecast: 'Amụma AI',
      downloadReport: 'Budata Akụkọ',
      refreshData: 'Mee Data Ọhụrụ',
      population: 'Ọnụọgụgụ Ndị Mmadụ',
      gdp: 'Uto GDP',
      unemployment: 'Enweghị Ọrụ',
      literacy: 'Ọnụọgụgụ Agụmakwụkwọ',
      healthIndex: 'Index Ahụike'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (activeSimulation) {
      setIsLoading(true);
      // Simulate data loading
      setTimeout(() => {
        setData(prev => ({
          ...prev,
          gdp: +(prev.gdp * (1 + (Math.random() - 0.5) * 0.2)).toFixed(1),
          unemployment: +(prev.unemployment * (1 + (Math.random() - 0.5) * 0.1)).toFixed(1),
        }));
        setIsLoading(false);
      }, 2000);
    }
  }, [activeSimulation]);

  const tabs = [
    { id: 'overview', label: t.overview, icon: BarChart3 },
    { id: 'analytics', label: t.analytics, icon: TrendingUp },
    { id: 'predictions', label: t.predictions, icon: Activity },
    { id: 'reports', label: t.reports, icon: Download }
  ];

  const metrics = [
    {
      label: t.population,
      value: data.population.toLocaleString(),
      change: '+1.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      label: t.gdp,
      value: `${data.gdp}%`,
      change: data.gdp > 3 ? '+0.3%' : '-0.1%',
      trend: data.gdp > 3 ? 'up' : 'down',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      label: t.unemployment,
      value: `${data.unemployment}%`,
      change: '-0.7%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      label: t.literacy,
      value: `${data.literacy}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-400'
    }
  ];

  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 68 },
    { month: 'Mar', value: 72 },
    { month: 'Apr', value: 70 },
    { month: 'May', value: 75 },
    { month: 'Jun', value: 78 }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-900/30 backdrop-blur-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {selectedState ? `${selectedState} Analytics` : 'National Analytics'}
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
              className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors duration-200">
              <Download className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800/30 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                {t.currentData}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/20 hover:bg-gray-800/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`w-4 h-4 ${metric.color}`} />
                        <span className="text-xs text-gray-400">{metric.label}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        metric.trend === 'up' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white group-hover:scale-105 transition-transform duration-200">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Chart */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/20">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                {t.historicalTrend}
              </h4>
              <div className="h-32 flex items-end space-x-2">
                {chartData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-sm transition-all duration-1000 hover:from-cyan-400 hover:to-blue-400"
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/20">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Advanced Analytics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Correlation Score</span>
                  <span className="text-cyan-400 font-bold">0.847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Variance</span>
                  <span className="text-green-400 font-bold">12.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Confidence Interval</span>
                  <span className="text-yellow-400 font-bold">95.2%</span>
                </div>
              </div>
            </div>

            {/* Real-time Data Stream */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/20">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Live Data Stream</h4>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400 font-mono">
                      {new Date(Date.now() - i * 1000).toLocaleTimeString()}
                    </span>
                    <span className="text-cyan-400">
                      Data point {i + 1} received
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/20">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">{t.forecast}</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                  <h5 className="font-medium text-blue-400 mb-2">30-Day Outlook</h5>
                  <p className="text-gray-300 text-sm">GDP growth expected to increase by 0.4% based on current economic indicators.</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-xs text-cyan-400 font-bold">78%</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                  <h5 className="font-medium text-green-400 mb-2">90-Day Projection</h5>
                  <p className="text-gray-300 text-sm">Infrastructure investments likely to reduce unemployment by 2.1%.</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <span className="text-xs text-green-400 font-bold">82%</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                  <h5 className="font-medium text-yellow-400 mb-2">Annual Forecast</h5>
                  <p className="text-gray-300 text-sm">Education initiatives projected to improve literacy rates by 3.8%.</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{ width: '71%' }}></div>
                    </div>
                    <span className="text-xs text-yellow-400 font-bold">71%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/20">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Available Reports</h4>
              
              <div className="space-y-3">
                {[
                  { name: 'Economic Impact Analysis', date: '2024-12-24', size: '2.4 MB', type: 'PDF' },
                  { name: 'Population Demographics', date: '2024-12-23', size: '1.8 MB', type: 'PDF' },
                  { name: 'Infrastructure Assessment', date: '2024-12-22', size: '3.1 MB', type: 'PDF' },
                  { name: 'Health System Overview', date: '2024-12-21', size: '2.7 MB', type: 'PDF' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 group">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <Download className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{report.name}</p>
                        <p className="text-xs text-gray-400">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-xs text-cyan-400 transition-all duration-200">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate New Report */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/20">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Generate New Report</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Report Type</label>
                  <select className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400">
                    <option>Economic Analysis</option>
                    <option>Social Impact</option>
                    <option>Infrastructure Report</option>
                    <option>Health Assessment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Time Range</label>
                  <select className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400">
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Simulation Indicator */}
        {activeSimulation && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-4 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-cyan-300 text-sm">Simulation Active</p>
                <p className="text-xs text-gray-400">{activeSimulation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;