import React, { useState } from 'react';
import { Shield, Globe, Users, Brain, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'agency' | 'citizen') => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, language, setLanguage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'agency' | 'citizen'>('agency');

  const translations = {
    en: {
      title: "NaijaNexus AI",
      subtitle: "Nigeria's Unified Digital Twin for Governance",
      welcome: "Secure Access Portal",
      email: "Email Address",
      password: "Password",
      login: "Access Platform",
      admin: "Administrator",
      agency: "Government Agency",
      citizen: "Citizen View",
      powered: "Powered by Advanced AI & Real-time Analytics"
    },
    yo: {
      title: "NaijaNexus AI",
      subtitle: "Orí-iṣẹ́ Dijítálì ti Nàìjíríà fún Ìjọba",
      welcome: "Ẹnu-ọ̀nà Ààbò",
      email: "Àdírẹ́ẹ̀sì Ímeèlì",
      password: "Ọ̀rọ̀ ìpamọ́",
      login: "Wọ sí Ẹ̀rọ",
      admin: "Alábójútó",
      agency: "Ajọ Ìjọba",
      citizen: "Ìwòye Ará-ìlú",
      powered: "Nípa AI Gíga àti Ìtúpalẹ̀ Àsìkò-gidi"
    },
    ha: {
      title: "NaijaNexus AI",
      subtitle: "Haɗin Dijital na Najeriya don Mulki",
      welcome: "Ƙofar Shiga Mai Tsaro",
      email: "Adireshin Email",
      password: "Kalmar Sirri",
      login: "Shiga Dandali",
      admin: "Mai Gudanarwa",
      agency: "Hukumar Gwamnati",
      citizen: "Kallon Dan Kasa",
      powered: "Da Ikon AI da Bincike na Lokaci-lokaci"
    },
    ig: {
      title: "NaijaNexus AI",
      subtitle: "Dijital Jikọrọ Nke Naịjirịa Maka Ọchịchị",
      welcome: "Ọnụ Ụzọ Nchekwa",
      email: "Adres Email",
      password: "Okwu Nzuzo",
      login: "Banye na Usoro",
      admin: "Onye Nlekọta",
      agency: "Ụlọ Ọrụ Gọọmentị",
      citizen: "Anya Nwa Amaala",
      powered: "Site na AI Dị Elu na Nyocha Oge Niile"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-green-900/20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Language selector */}
      <div className="absolute top-6 right-6 z-20">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-900/80 border border-cyan-500/30 text-cyan-300 px-3 py-2 rounded-lg backdrop-blur-sm focus:outline-none focus:border-cyan-400"
        >
          <option value="en">🇬🇧 English</option>
          <option value="yo">🇳🇬 Yorùbá</option>
          <option value="ha">🇳🇬 Hausa</option>
          <option value="ig">🇳🇬 Igbo</option>
        </select>
      </div>

      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto border-3 border-cyan-400 rounded-full flex items-center justify-center mb-6 relative">
                <Shield className="w-12 h-12 text-cyan-400" />
                <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
              </div>
              
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent mb-4">
                {t.title}
              </h1>
              
              <p className="text-xl text-cyan-300 font-light mb-8">
                {t.subtitle}
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300">AI-Powered</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-sm text-gray-300">Real-time</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-sm text-gray-300">Unified</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              {t.powered}
            </p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{t.welcome}</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
              </div>

              {/* Role selector */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800/50 rounded-lg">
                  {(['admin', 'agency', 'citizen'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                        selectedRole === role
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {role === 'admin' ? t.admin : role === 'agency' ? t.agency : t.citizen}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                    placeholder="admin@naijanexus.gov.ng"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.password}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 pr-12"
                      placeholder="••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400/20 shadow-lg hover:shadow-cyan-500/20"
                >
                  {t.login}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Secured by 256-bit encryption • ISO 27001 Compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginPage;