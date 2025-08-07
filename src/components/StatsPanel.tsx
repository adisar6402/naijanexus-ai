import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, AlertTriangle, Shield } from 'lucide-react';

interface StatsPanelProps {
  selectedState?: string | null;
  language: string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ selectedState, language }) => {
  const [stats, setStats] = useState({
    population: 218541065,
    gdp: 3.2,
    unemployment: 33.3,
    healthIndex: 42.8,
    educationIndex: 0.394,
    securityLevel: 67.5
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        gdp: +(prev.gdp + (Math.random() - 0.5) * 0.1).toFixed(1),
        unemployment: Math.max(0, +(prev.unemployment + (Math.random() - 0.5) * 0.5).toFixed(1)),
        securityLevel: Math.max(0, Math.min(100, +(prev.securityLevel + (Math.random() - 0.5) * 2).toFixed(1)))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      label: 'Population',
      value: stats.population.toLocaleString(),
      change: '+1.2%',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'from-blue-400/20 to-blue-600/20'
    },
    {
      label: 'GDP Growth',
      value: `${stats.gdp}%`,
      change: stats.gdp > 3 ? '+0.3%' : '-0.1%',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'from-green-400/20 to-green-600/20'
    },
    {
      label: 'Unemployment',
      value: `${stats.unemployment}%`,
      change: '-0.7%',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'from-red-400/20 to-red-600/20'
    },
    {
      label: 'Health Index',
      value: `${stats.healthIndex}/100`,
      change: '+2.1%',
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'from-purple-400/20 to-purple-600/20'
    },
    {
      label: 'Education',
      value: (stats.educationIndex * 100).toFixed(1) + '%',
      change: '+1.8%',
      icon: DollarSign,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-400/20 to-cyan-600/20'
    },
    {
      label: 'Security Level',
      value: `${stats.securityLevel}%`,
      change: stats.securityLevel > 65 ? '+2.3%' : '-1.1%',
      icon: Shield,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-400/20 to-yellow-600/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 hover:bg-gray-900/60 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              stat.change.startsWith('+') ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-200">
              {stat.value}
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
          
          {/* Mini trend line */}
          <div className="mt-3 h-1 bg-gray-700/50 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-transparent transition-all duration-1000`}
              style={{ width: `${60 + Math.random() * 40}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;