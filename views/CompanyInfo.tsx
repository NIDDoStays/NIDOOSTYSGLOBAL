
import React, { useState } from 'react';
import { Shield, Target, Users, Briefcase, Newspaper, ArrowRight, Zap, CheckCircle2, Globe, Building2, ArrowLeft, Quote, Calendar, Share2, Bookmark } from 'lucide-react';

interface NewsItem {
  date: string;
  title: string;
  source: string;
  excerpt: string;
  content: React.ReactNode;
  image: string;
}

interface CompanyInfoProps {
  type: 'about' | 'press' | 'careers';
  onNav: (view: string) => void;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ type, onNav }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const newsItems: NewsItem[] = [
    { 
      date: 'Mayo 2024', 
      title: 'NiDDoSty alcanza las 5000 propiedades verificadas', 
      source: 'Travel Tech News',
      excerpt: 'La plataforma global NiDDoSty celebra un hito histórico en su expansión por Europa y América.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      content: (
        <div className="space-y-6">
          <p className="text-xl font-medium leading-relaxed italic text-gray-700">
            En un tiempo récord de menos de un año, NiDDoSty ha logrado consolidarse como el referente de seguridad en el alquiler vacacional. Con la incorporación de la propiedad número 5.000, situada en la Riviera Maya, la compañía demuestra que su modelo de "Nido Verificado" es lo que el mercado demandaba.
          </p>
          <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 my-10">
            <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50" />
            <p className="text-2xl font-black italic uppercase tracking-tighter text-blue-900 leading-tight">
              "No buscamos cantidad, buscamos nidos donde la paz sea obligatoria. Cada propiedad pasa por un filtro biométrico y legal estricto."
            </p>
            <p className="mt-4 text-xs font-black uppercase tracking-widest text-blue-600">— Dirección de Expansión Global</p>
          </div>
          <p className="text-gray-600 leading-relaxed">
            El crecimiento de NiDDoSty no se detiene aquí. Con la vista puesta en 2028, la plataforma mantiene activa su promoción para los 300 primeros agentes fundadores, quienes podrán disfrutar de una operativa sin comisiones. Este hito de las 5.000 propiedades es solo el primer paso hacia una red global que conectará a más de 50 países antes de final de año.
          </p>
        </div>
      )
    },
    { 
      date: 'Abril 2024', 
      title: 'Seguridad Biométrica: El nuevo estándar de NiDDoSty', 
      source: 'Global Security',
      excerpt: 'Analizamos cómo la tecnología KYC de NiDDoSty está eliminando el fraude en el sector turístico.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      content: (
        <div className="space-y-6">
          <p className="text-xl font-medium leading-relaxed italic text-gray-700">
            El sector del alquiler vacacional ha sufrido históricamente de suplantaciones de identidad y fraudes en las reservas. NiDDoSty ha cortado el problema de raíz mediante la implementación obligatoria de validación biométrica.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100">
               <h4 className="font-black uppercase italic tracking-tighter mb-2">Validación en 30 segundos</h4>
               <p className="text-sm text-gray-500">Nuestro sistema escanea el DNI y realiza una prueba de vida mediante selfie para asegurar la identidad real del huésped.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100">
               <h4 className="font-black uppercase italic tracking-tighter mb-2">Cumplimiento Legal</h4>
               <p className="text-sm text-gray-500">Automatizamos el registro de viajeros con las autoridades locales, ahorrando tiempo y evitando sanciones a los anfitriones.</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Expertos en ciberseguridad señalan que la base de datos encriptada de NiDDoSty utiliza protocolos de nivel bancario, asegurando que la privacidad del usuario nunca se vea comprometida mientras se garantiza la seguridad física del nido.
          </p>
        </div>
      )
    },
    { 
      date: 'Marzo 2024', 
      title: 'Entrevista: El futuro del alquiler turístico global', 
      source: 'Economy Daily',
      excerpt: 'Hablamos con los fundadores sobre la integración del Campus NiDDo y el CRM inmobiliario.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
      content: (
        <div className="space-y-6">
          <p className="text-xl font-medium leading-relaxed italic text-gray-700">
            NiDDoSty no es solo una aplicación de reservas; es un ecosistema completo que abarca desde la vida estudiantil hasta la gestión profesional de grandes carteras inmobiliarias.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Durante la entrevista, los fundadores destacaron la importancia del **Campus NiDDo**. "Vimos que los estudiantes estaban desprotegidos. Crear nidos seguros para ellos de septiembre a junio, con calendarios claros y pagos protegidos, era una obligación moral", comentan. 
          </p>
          <p className="text-gray-600 leading-relaxed">
            Además, el lanzamiento del CRM específico para agentes inmobiliarios (con planes desde 45€) permite que profesionales del sector gestionen hasta 25 propiedades o más de forma ilimitada, integrando todos los servicios de NiDDoSty: taxis, barcos, vuelos y experiencias locales.
          </p>
        </div>
      )
    }
  ];

  const renderAbout = () => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-blue-600 rounded-[50px] p-12 text-white mb-16 relative overflow-hidden shadow-2xl">
        <Target className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">Sobre NiDDoSty</h1>
          <p className="text-blue-100 text-lg font-medium">Revolucionando el turismo global con seguridad biométrica y nidos verificados.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900">Nuestra Misión</h2>
          <p className="text-gray-600 leading-relaxed font-medium italic">
            NiDDoSty nace de la necesidad de crear un ecosistema turístico donde el "nido" sea sinónimo de paz. Somos la primera plataforma que exige registro turístico obligatorio y validación de identidad real para cada huésped y anfitrión.
          </p>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex items-start gap-4">
            <Shield className="w-10 h-10 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-black uppercase italic tracking-tighter text-gray-900">Seguridad Biométrica</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">Nuestra tecnología de reconocimiento facial asegura que quien reserva es quien dice ser.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[50px] overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Team" />
        </div>
      </div>
    </div>
  );

  const renderPress = () => {
    if (selectedArticle) {
      return (
        <div className="animate-in slide-in-from-bottom-10 duration-700">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-blue-600 font-black uppercase italic text-xs tracking-widest mb-10 hover:-translate-x-2 transition-transform w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a Prensa
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedArticle.source}</span>
                   <span className="text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3 h-3" /> {selectedArticle.date}</span>
                </div>
                <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none text-gray-900">{selectedArticle.title}</h1>
              </div>
              
              <div className="w-full aspect-video rounded-[50px] overflow-hidden shadow-2xl">
                <img src={selectedArticle.image} className="w-full h-full object-cover" alt={selectedArticle.title} />
              </div>

              <div className="max-w-none">
                {selectedArticle.content}
              </div>
            </div>

            <div className="space-y-12">
               <div className="bg-white p-10 rounded-[50px] shadow-3xl border border-gray-100 sticky top-24">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 italic">Compartir Noticia</h4>
                  <div className="flex gap-4 mb-10">
                    <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-white hover:shadow-xl transition-all"><Share2 className="w-5 h-5" /></button>
                    <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-white hover:shadow-xl transition-all"><Bookmark className="w-5 h-5" /></button>
                  </div>
                  
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 italic">Otras Noticias</h4>
                  <div className="space-y-8">
                    {newsItems.filter(n => n.title !== selectedArticle.title).map((n, i) => (
                      <button 
                        key={i} 
                        onClick={() => { setSelectedArticle(n); window.scrollTo(0, 0); }}
                        className="text-left group block"
                      >
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">{n.date}</span>
                        <h5 className="font-black italic uppercase tracking-tighter text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{n.title}</h5>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in duration-700">
        <section className="bg-orange-600 rounded-[50px] p-12 text-white mb-16 relative overflow-hidden shadow-2xl">
          <Newspaper className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">Prensa y Media</h1>
            <p className="text-orange-100 text-lg font-medium">NiDDoSty en los titulares del mundo. Innovación y crecimiento constante.</p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {newsItems.map((news, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col h-full">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-4">{news.date}</span>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{news.title}</h3>
              <p className="text-sm text-gray-500 font-medium italic mb-8 leading-relaxed line-clamp-3">
                {news.excerpt}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs font-bold text-gray-400 italic">{news.source}</span>
                <button 
                  onClick={() => { setSelectedArticle(news); window.scrollTo(0, 0); }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-black uppercase text-[9px] tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                >
                  Leer más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCareers = () => (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-900 rounded-[50px] p-12 text-white mb-16 relative overflow-hidden shadow-2xl border border-white/10">
        <Briefcase className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Únete al Nido</div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">Trabaja con NiDDoSty</h1>
          <p className="text-blue-100 text-lg font-medium max-w-xl">Buscamos agentes inmobiliarios, gestores de nidos y talentos apasionados por el turismo global.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <div className="md:col-span-2 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900">¿Por qué ser Agente NiDDoSty?</h2>
            <p className="text-gray-600 leading-relaxed font-medium italic">
              No somos solo una plataforma, somos tu socio tecnológico. Ofrecemos herramientas de última generación para que gestiones tu cartera de propiedades con una eficiencia sin precedentes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'CRM de Alto Rendimiento', desc: 'Gestiona hasta propiedades ilimitadas con nuestro software cloud.', icon: Building2 },
              { title: '0% Comisiones 2028', desc: 'Aprovecha nuestra promoción de lanzamiento para fundadores.', icon: Zap },
              { title: 'Alcance Global', desc: 'Tus anuncios visibles en Europa, América, África y Asia.', icon: Globe },
              { title: 'Validación KYC', desc: 'Nosotros nos encargamos de verificar la identidad de cada cliente.', icon: UserCheck }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   {/* @ts-ignore */}
                   <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black uppercase italic tracking-tighter text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[50px] shadow-3xl border border-blue-100 sticky top-24 h-fit">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 mb-6">Convertirme en Agente</h3>
          <div className="space-y-4 mb-8">
            <input placeholder="Nombre de Agencia / Agente" className="w-full p-4 rounded-xl bg-gray-50 border-none font-bold text-sm" />
            <input placeholder="Email profesional" className="w-full p-4 rounded-xl bg-gray-50 border-none font-bold text-sm" />
            <select className="w-full p-4 rounded-xl bg-gray-50 border-none font-bold text-sm appearance-none">
              <option>Elegir Plan CRM (45€ / 65€)</option>
              <option>Agente Independiente</option>
              <option>Inmobiliaria Consolidada</option>
            </select>
          </div>
          <button 
            onClick={() => onNav('inmobiliaria')}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-tighter text-sm hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Ver Planes CRM <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center mt-6 italic">Únete a los 300 primeros y ahorra comisiones</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 min-h-screen">
      {type === 'about' && renderAbout()}
      {type === 'press' && renderPress()}
      {type === 'careers' && renderCareers()}
    </div>
  );
};

// Mock icon for UserCheck since it was missing in imports
const UserCheck = ({className}: {className: string}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
