import React, { useState } from 'react';
import Navbar from './Navbar';
import { Settings, Users, Database, Shield, Activity, Upload, Download, Plus, Edit, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, language, setLanguage }) => {
  const [activeSection, setActiveSection] = useState('users');

  const sections = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'datasets', label: 'Data Management', icon: Database },
    { id: 'simulations', label: 'Simulation Models', icon: Activity },
    { id: 'security', label: 'Security & Permissions', icon: Shield },
    { id: 'system', label: 'System Configuration', icon: Settings }
  ];

  const mockUsers = [
    { id: 1, name: 'Dr. Aisha Mohammed', role: 'Agency', department: 'Federal Ministry of Health', status: 'Active', lastLogin: '2024-12-24' },
    { id: 2, name: 'Eng. Chukwu Okafor', role: 'Agency', department: 'Federal Ministry of Works', status: 'Active', lastLogin: '2024-12-23' },
    { id: 3, name: 'Prof. Adunni Ogundimu', role: 'Admin', department: 'Federal Ministry of Communications', status: 'Active', lastLogin: '2024-12-24' },
    { id: 4, name: 'Ibrahim Yakubu', role: 'Citizen', department: 'Public Access', status: 'Pending', lastLogin: 'Never' }
  ];

  const mockDatasets = [
    { id: 1, name: 'Population Census 2023', size: '145 MB', lastUpdated: '2024-12-20', status: 'Active', records: '218M' },
    { id: 2, name: 'Economic Indicators Q4', size: '23 MB', lastUpdated: '2024-12-24', status: 'Active', records: '2.3M' },
    { id: 3, name: 'Healthcare Facilities', size: '67 MB', lastUpdated: '2024-12-18', status: 'Active', records: '45K' },
    { id: 4, name: 'Infrastructure Database', size: '234 MB', lastUpdated: '2024-12-15', status: 'Updating', records: '1.2M' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        userRole="admin" 
        onLogout={onLogout} 
        language={language} 
        setLanguage={setLanguage}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Admin Sidebar */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700/30 overflow-y-auto">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Admin Console</h2>
                  <p className="text-sm text-red-400">Super Administrator</p>
                </div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-gray-700/50 border border-gray-600/50 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                  {activeSection === section.id && (
                    <div className="ml-auto w-2 h-2 bg-red-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* System Status */}
            <div className="mt-8 bg-gray-800/30 rounded-lg p-4 border border-gray-700/20">
              <h3 className="font-semibold text-white mb-3">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">AI Models</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Running</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs text-yellow-400">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Admin Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-8">
            {/* Section Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {sections.find(s => s.id === activeSection)?.label}
              </h1>
              <p className="text-gray-400">
                Manage and configure platform settings
              </p>
            </div>

            {/* Content based on active section */}
            {activeSection === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">User Accounts</h2>
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="text-left p-4 text-gray-300 font-medium">User</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Role</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Department</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Last Login</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map((user) => (
                          <tr key={user.id} className="border-t border-gray-700/30 hover:bg-gray-800/20 transition-colors duration-200">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="font-medium text-white">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'Admin' ? 'bg-red-400/20 text-red-400' :
                                user.role === 'Agency' ? 'bg-blue-400/20 text-blue-400' :
                                'bg-green-400/20 text-green-400'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4 text-gray-300">{user.department}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                                'bg-yellow-400/20 text-yellow-400'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="p-4 text-gray-400">{user.lastLogin}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'datasets' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Data Management</h2>
                  <div className="flex items-center space-x-3">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Import Data</span>
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>New Dataset</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockDatasets.map((dataset) => (
                    <div key={dataset.id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:bg-gray-900/60 transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Database className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{dataset.name}</h3>
                            <p className="text-sm text-gray-400">{dataset.records} records</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dataset.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                          'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {dataset.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Size:</span>
                          <span className="text-white font-medium">{dataset.size}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Last Updated:</span>
                          <span className="text-white font-medium">{dataset.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700/30">
                        <button className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </button>
                        <button className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
                          <Edit className="w-4 h-4" />
                          <span>Configure</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Configuration</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4">Access Controls</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Two-Factor Authentication</span>
                        <div className="w-12 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full transform transition-transform translate-x-6"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Session Timeout</span>
                        <select className="bg-gray-700/50 border border-gray-600/30 rounded-lg px-3 py-1 text-white text-sm">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Password Policy</span>
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Configure</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4">Audit Logs</h3>
                    <div className="space-y-3">
                      {[
                        { action: 'User login', user: 'Dr. Aisha Mohammed', time: '2 min ago' },
                        { action: 'Dataset updated', user: 'System', time: '15 min ago' },
                        { action: 'Simulation started', user: 'Eng. Chukwu Okafor', time: '1 hour ago' },
                        { action: 'User created', user: 'Admin', time: '3 hours ago' }
                      ].map((log, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg">
                          <div>
                            <p className="text-white text-sm font-medium">{log.action}</p>
                            <p className="text-gray-400 text-xs">{log.user}</p>
                          </div>
                          <span className="text-gray-500 text-xs">{log.time}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      View All Logs
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;