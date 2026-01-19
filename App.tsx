
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Campus } from './views/Campus';
import { RealEstateCRM } from './views/RealEstateCRM';
import { HostDashboard } from './views/HostDashboard';
import { GuestDashboard } from './views/GuestDashboard';
import { Marketplace } from './views/Marketplace';
import { Gastronomy } from './views/Gastronomy';
import { Services } from './views/Services';
import { CompanyInfo } from './views/CompanyInfo';
import { AdminDashboard } from './views/AdminDashboard';
import { ChatWidget } from './components/ChatWidget';
import { RegistrationModal } from './components/RegistrationModal';
import { UserProfile, UserRole, Language } from './types';
import { LANGUAGES, translations } from './translations';
import { Shield, Phone, Mail, Info, X, Check, Gavel, AlertTriangle, FileText, Landmark, Scale } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);

  const t = (key: string) => translations[language.code]?.[key] || translations['ES'][key] || key;

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('niddosty_cookies');
    if (!cookiesAccepted) {
      const timer = setTimeout(() => setShowCookies(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('niddosty_cookies', 'true');
    setShowCookies(false);
  };

  const handleNav = (view: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home onNav={handleNav} t={t} />;
      case 'campus': return <Campus />;
      case 'inmobiliaria': return <RealEstateCRM />;
      case 'anfitrión': return <HostDashboard user={user} />;
      case 'huésped': return <GuestDashboard user={user} />;
      case 'admin': return <AdminDashboard />;
      case 'shops':
      case 'marketplace':
      case 'camping':
      case 'taxis':
      case 'visita':
      case 'experiencia':
        return <Marketplace initialCategory={currentView} />;
      case 'cars':
      case 'flights':
      case 'boats':
      case 'hotels':
        return <Services type={currentView} />;
      case 'gastronomy': return <Gastronomy />;
      case 'about':
      case 'press':
      case 'careers':
        return <CompanyInfo type={currentView as any} onNav={handleNav} />;
      case 'legal':
        return (
          <div className="pt-32 pb-20 max-w-5xl mx-auto px-4 animate-in fade-in duration-700">
            <div className="bg-white rounded-[50px] shadow-3xl border border-gray-100 overflow-hidden">
               <div className="bg-gray-900 p-12 text-white relative overflow-hidden">
                  <Gavel className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
                  <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 relative z-10">Aviso Legal</h1>
                  <p className="text-gray-400 font-medium italic relative z-10">Marco Jurídico de NiDDoSty Global</p>
               </div>
               <div className="p-12 space-y-12">
                  <section className="bg-red-50 p-10 rounded-[40px] border border-red-100 space-y-6 relative overflow-hidden">
                     <AlertTriangle className="absolute -right-4 -top-4 w-32 h-32 text-red-200 opacity-20" />
                     <div className="flex items-center gap-3 text-red-600 relative z-10">
                        <Scale className="w-8 h-8" />
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Responsabilidad de Registro de Viajeros</h2>
                     </div>
                     <div className="space-y-4 text-red-900 relative z-10">
                        <p className="font-bold text-lg leading-tight uppercase italic underline decoration-red-300">Aviso Crítico para Propietarios y Gestores:</p>
                        <p className="font-medium leading-relaxed italic text-base">
                           En cumplimiento de la Ley Orgánica de Protección de la Seguridad Ciudadana, se informa explícitamente que <strong>cada propietario, anfitrión o agente inmobiliario es el ÚNICO responsable legal</strong> de comunicar los datos de las personas alojadas a las autoridades pertinentes.
                        </p>
                     </div>
                  </section>
               </div>
            </div>
          </div>
        );
      default: return <Home onNav={handleNav} t={t} />;
    }
  };

  const handleLoginSuccess = (profileData: any) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      isRegistered: true,
      ...profileData
    });
    if (profileData.role === UserRole.ADMIN) {
      setCurrentView('admin');
    }
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navbar 
        onNav={handleNav} 
        onLogin={() => setShowLogin(true)} 
        user={user}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />
      <main>{renderView()}</main>
      <ChatWidget user={user} globalLanguage={language} />
      {showCookies && <div className="fixed bottom-6 right-6 z-[200] bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-sm">
        <p className="text-xs font-bold mb-4">Aceptas nuestras cookies para mejorar tu experiencia en el nido.</p>
        <button onClick={acceptCookies} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black uppercase text-[10px]">Aceptar</button>
      </div>}
      {showLogin && <RegistrationModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;
