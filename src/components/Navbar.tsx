import React, { useState } from 'react';
import { Shield, Settings, LogOut, Bell, User, ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  userRole: 'admin' | 'agency' | 'citizen' | null;
  onLogout: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onLogout, language, setLanguage }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const translations = {
    en: {
      dashboard: 'Dashboard',
      simulations: 'Simulations',
      analytics: 'Analytics',
      reports: 'Reports',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      notifications: 'Notifications'
    },
    yo: {
      dashboard: 'Pátákó',
      simulations: 'Àwọn Àfọwọ́ṣe',
      analytics: 'Ìtúpalẹ̀',
      reports: 'Àwọn Ìjábọ̀',
      settings: 'Ètò',
      profile: 'Profáìlì',
      logout: 'Jáde',
      notifications: 'Àwọn Ìfitónilétí'
    },
    ha: {
      dashboard: 'Dashboard',
      simulations: 'Simulations',
      analytics: 'Bincike',
      reports: 'Rahotanni',
      settings: 'Saiti',
      profile: 'Bayanai',
      logout: 'Fita',
      notifications: 'Sanarwa'
    },
    ig: {
      dashboard: 'Dashboard',
      simulations: 'Simulations',
      analytics: 'Nyocha',
      reports: 'Akụkọ',
      settings: 'Ntọala',
      profile: 'Profaịlụ',
      logout: 'Pụọ',
      notifications: 'Ọkwa'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const notifications = [
    { id: 1, title: 'Simulation Complete', message: 'Fuel subsidy analysis finished', type: 'success', time: '2m ago' },
    { id: 2, title: 'Data Update', message: 'Population census data updated', type: 'info', time: '5m ago' },
    { id: 3, title: 'Alert', message: 'High unemployment in Lagos State', type: 'warning', time: '12m ago' }
  ];

  const getRoleColor = (role: string | null) => {
    switch (role) {
      case 'admin': return 'from-red-400 to-red-600';
      case 'agency': return 'from-blue-400 to-blue-600';
      case 'citizen': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 relative z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NaijaNexus AI
                </h1>
                <p className="text-xs text-gray-400">Digital Governance Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 ml-8">
              {['dashboard', 'simulations', 'analytics', 'reports'].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 capitalize"
                >
                  {t[item as keyof typeof t]}
                </button>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800/50 border border-gray-600/30 text-gray-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:border-cyan-400 transition-all duration-200"
            >
              <option value="en">🇬🇧 EN</option>
              <option value="yo">🇳🇬 YO</option>
              <option value="ha">🇳🇬 HA</option>
              <option value="ig">🇳🇬 IG</option>
            </select>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                  <div className="p-4 border-b border-gray-700/30">
                    <h3 className="font-semibold text-white">{t.notifications}</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-700/20 hover:bg-gray-800/30 transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notif.type === 'success' ? 'bg-green-400' :
                            notif.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                          }`}></div>
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">{notif.title}</p>
                            <p className="text-gray-400 text-xs mt-1">{notif.message}</p>
                            <p className="text-gray-500 text-xs mt-2">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-700/30">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${getRoleColor(userRole)} rounded-full flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white capitalize">{userRole} User</p>
                  <p className="text-xs text-gray-400">Federal Ministry</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                  <div className="p-4 border-b border-gray-700/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(userRole)} rounded-full flex items-center justify-center`}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white capitalize">{userRole} Access</p>
                        <p className="text-xs text-gray-400">Digital Platform</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{t.profile}</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">{t.settings}</span>
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-gray-700/30">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">{t.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700/30">
            <div className="space-y-2">
              {['dashboard', 'simulations', 'analytics', 'reports'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 capitalize"
                >
                  {t[item as keyof typeof t]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;