
import React, { useState } from 'react';
import { Logo } from './Logo';
import { ChevronDown, User, LogIn, Menu, X, ShieldAlert, Globe } from 'lucide-react';
import { UserRole, Language } from '../types';
import { LANGUAGES } from '../translations';

interface NavbarProps {
  onNav: (view: string) => void;
  onLogin: () => void;
  user: any;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: (key: string) => string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNav, onLogin, user, language, onLanguageChange, t }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('nav_host'), role: UserRole.HOST, links: ['Registrar Propiedad', 'Gestión Reservas', 'Promoción 2028'] },
    { label: t('nav_guest'), role: UserRole.GUEST, links: ['Mis Viajes', 'Favoritos', 'Perfil Turístico'] },
    { label: t('nav_realestate'), role: UserRole.REAL_ESTATE, links: ['Planes CRM', 'Agentes', 'Cartera Global'] }
  ];

  const handleNavClick = (view: string) => {
    onNav(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <button onClick={() => handleNavClick('home')}><Logo /></button>
            <div className="hidden lg:flex gap-6">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium py-4 transition-colors">
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-gray-100 rounded-xl py-2 mt-0 animate-in fade-in slide-in-from-top-2">
                      {item.links.map(link => (
                        <button 
                          key={link} 
                          onClick={() => handleNavClick(item.label.toLowerCase())}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {link}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => handleNavClick('campus')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors py-4"
              >
                {t('nav_campus')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group hidden sm:block">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{language.code}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <div className="absolute top-full right-0 w-48 bg-white shadow-2xl border border-gray-100 rounded-[25px] py-3 mt-2 z-20 animate-in fade-in zoom-in-95">
                    {LANGUAGES.map(lang => (
                      <button 
                        key={lang.code}
                        onClick={() => { onLanguageChange(lang); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-5 py-3 hover:bg-blue-50 flex items-center gap-3 transition-colors ${language.code === lang.code ? 'bg-blue-50/50' : ''}`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-gray-800 leading-none">{lang.name}</span>
                           <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{lang.code}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-4 border-l pl-4 border-gray-100">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black hidden lg:block uppercase tracking-tighter italic">
                    {user.role === UserRole.ADMIN ? 'Owner Master' : user.email}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${user.role === UserRole.ADMIN ? 'bg-orange-500' : 'bg-blue-600'}`}>
                    {user.role === UserRole.ADMIN ? <ShieldAlert className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={onLogin}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  {t('btn_enter')}
                </button>
              )}
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
           <div className="px-4 py-6 space-y-4">
              <div className="flex flex-wrap gap-2 pb-4 border-b">
                 {LANGUAGES.map(lang => (
                   <button 
                    key={lang.code} 
                    onClick={() => onLanguageChange(lang)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${language.code === lang.code ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-100'}`}
                   >
                     {lang.flag} {lang.code}
                   </button>
                 ))}
              </div>
              {navItems.map(item => (
                <div key={item.label} className="space-y-2">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">{item.label}</p>
                   {item.links.map(link => (
                     <button 
                        key={link} 
                        onClick={() => handleNavClick(item.label.toLowerCase())}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        {link}
                      </button>
                   ))}
                </div>
              ))}
           </div>
        </div>
      )}
    </nav>
  );
};
