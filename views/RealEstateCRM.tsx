
import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, LayoutDashboard, Database, 
  Settings, UserPlus, CreditCard, PieChart, BarChart3, List,
  FileText, Calendar, UserCheck, ShieldCheck, Zap, ArrowRight,
  Clock, MapPin, Search, Globe, Users, Star, MessageSquare,
  Building, Filter, Award, TrendingUp, Newspaper, Gavel, AlertTriangle, ExternalLink, X, Printer, Download,
  RefreshCw, Check, Smartphone, Landmark
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', views: 4000, bookings: 2400 },
  { name: 'Feb', views: 3000, bookings: 1398 },
  { name: 'Mar', views: 2000, bookings: 9800 },
  { name: 'Abr', views: 2780, bookings: 3908 },
  { name: 'May', views: 1890, bookings: 4800 },
];

const globalPortfolio = [
  { id: 1, title: 'Penthouse Manhattan', location: 'Nueva York, USA', price: '2.5M€', continent: 'América', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Villa Costa del Sol', location: 'Málaga, España', price: '1.2M€', continent: 'Europa', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Loft en Shoreditch', location: 'Londres, UK', price: '850K€', continent: 'Europa', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Residencia en Kioto', location: 'Kioto, Japón', price: '1.1M€', continent: 'Asia', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600' },
];

interface NewsItem {
  id: number;
  tag: string;
  title: string;
  desc: string;
  fullContent: string;
  date: string;
  type: 'law' | 'news';
}

export const RealEstateCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState('planes');
  const [contractType, setContractType] = useState('vacacional');
  const [isFounder, setIsFounder] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('Europa');
  const [selectedDoc, setSelectedDoc] = useState<NewsItem | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState<any>(null);

  const news: NewsItem[] = [
    { id: 1, tag: 'LEGAL', title: 'Nueva Directiva EU sobre Alquileres de Corta Duración', desc: 'Obligatoriedad de registro digital único para todas las plataformas a partir de 2025.', date: 'Hace 2 días', type: 'law', fullContent: '<h2>REGLAMENTO (UE) 2024/1028</h2>...' }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      setShowSyncModal(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'planes':
        return (
          <div className="space-y-16 animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[50px] p-12 text-white shadow-xl relative overflow-hidden">
              <Zap className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="bg-white/20 p-6 rounded-[35px] backdrop-blur-md border border-white/20">
                   <Award className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black mb-2 uppercase italic tracking-tighter leading-none">PROMOCIÓN AGENTES FOUNDER</h2>
                  <p className="text-orange-50 text-xl max-w-2xl leading-tight font-medium opacity-90">
                    Las primeras 100 agencias disfrutan del <strong>Plan CRM Unlimited GRATIS hasta 2028</strong>. 
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-black bg-black/20 w-fit px-6 py-2 rounded-full border border-white/10 uppercase tracking-widest">
                    <Clock className="w-4 h-4" /> 42 Plazas restantes
                  </div>
                </div>
                <button className="md:ml-auto bg-white text-orange-600 px-12 py-5 rounded-2xl font-black hover:scale-105 transition-transform shadow-2xl italic uppercase tracking-tighter">
                  ¡LO QUIERO!
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto pt-8">
              {[
                { name: 'Plan Profesional', price: '45€', features: ['Hasta 25 propiedades', 'CRM Cloud NiDDo', 'Gestión de leads AI', 'Contratos SEPA', 'Soporte 24/7'] },
                { name: 'Plan Unlimited', price: '65€', features: ['Propiedades ilimitadas', 'CRM Avanzado Multi-agente', 'Estadísticas en tiempo real', 'Account Manager', 'Publicidad Global'], recommended: true }
              ].map(plan => (
                <div key={plan.name} className={`relative p-12 rounded-[50px] border-2 transition-all ${plan.recommended ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 bg-white'}`}>
                  {plan.recommended && <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">Top Ventas</div>}
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-gray-900 leading-none">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-10">
                    <span className="text-6xl font-black text-gray-900 tracking-tighter">{plan.price}</span>
                    <span className="text-gray-400 font-bold italic">/ mes + IVA</span>
                  </div>
                  <ul className="space-y-5 mb-12">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                           <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setShowPaymentModal(plan)}
                    className={`w-full py-6 rounded-[30px] font-black uppercase italic tracking-tighter text-xl transition-all active:scale-95 shadow-xl ${plan.recommended ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                  >
                    Contratar con Monei/Bizum
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dashboard':
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { label: 'Total Propiedades', val: isFounder ? '18 / ∞' : '18 / 25', icon: List },
                 { label: 'Leads Nuevos', val: '12', icon: UserPlus },
                 { label: 'Visitas semana', val: '8', icon: Calendar },
                 { label: 'Ingresos Brutos', val: '14.250€', icon: CreditCard }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4"><stat.icon className="w-6 h-6" /></div>
                   <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{stat.label}</p>
                   <p className="text-2xl font-black text-gray-800">{stat.val}</p>
                 </div>
               ))}
             </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase flex items-center gap-4 leading-none">
              <Briefcase className="w-12 h-12 text-blue-600" /> CRM Real Estate
            </h1>
            <p className="text-gray-500 font-medium mt-2 text-lg italic">Control total de tu cartera global NiDDoSty.</p>
          </div>
          <div className="flex bg-white p-2 rounded-[25px] border border-gray-200 shadow-sm overflow-x-auto no-scrollbar max-w-full">
             {[
               {id: 'planes', label: 'Planes', icon: ShieldCheck},
               {id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard},
               {id: 'cartera', label: 'Cartera Global', icon: Globe},
               {id: 'contratos', label: 'Firma Digital', icon: FileText}
             ].map(tab => (
               <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-xl' 
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
               >
                <tab.icon className="w-4 h-4" /> {tab.label}
               </button>
             ))}
          </div>
        </div>
        {renderContent()}

        {/* Modal de Pago para Planes CRM */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowPaymentModal(null)} />
            <div className="relative bg-white w-full max-w-md rounded-[50px] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Finalizar Contrato</h3>
                <p className="text-gray-500 text-sm mb-10 font-medium italic">Estás contratando el <strong>{showPaymentModal.name}</strong> por <strong>{showPaymentModal.price}</strong>/mes.</p>
                
                <div className="space-y-4 mb-10">
                  <button className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-blue-50 rounded-3xl border border-gray-100 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><CreditCard className="w-6 h-6 text-blue-600" /></div>
                        <span className="font-black text-sm uppercase italic tracking-tighter">Monei Pay</span>
                     </div>
                     <ArrowRight className="w-4 h-4 text-gray-300" />
                  </button>
                  <button className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-green-50 rounded-3xl border border-gray-100 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Smartphone className="w-6 h-6 text-green-600" /></div>
                        <span className="font-black text-sm uppercase italic tracking-tighter">Bizum</span>
                     </div>
                     <ArrowRight className="w-4 h-4 text-gray-300" />
                  </button>
                  <button className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 rounded-3xl border border-gray-100 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Landmark className="w-6 h-6 text-gray-600" /></div>
                        <span className="font-black text-sm uppercase italic tracking-tighter">Transferencia</span>
                     </div>
                     <ArrowRight className="w-4 h-4 text-gray-300" />
                  </button>
                </div>

                <button onClick={() => setShowPaymentModal(null)} className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-red-500 transition-colors">Cancelar Suscripción</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
