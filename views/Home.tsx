
import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CategoryGrid } from '../components/CategoryGrid';
import { ItemDetailModal } from '../components/ItemDetailModal';
import { Star, ShieldCheck, Zap, Globe, Heart, Calculator, TrendingUp, ArrowRight, MapPin, Utensils, Award, ShoppingCart, Check, ChevronDown } from 'lucide-react';
import { PropertyType } from '../types';

interface HomeProps {
  onNav: (view: string) => void;
}

const SPAIN_LOCATIONS = [
  { name: 'Ibiza / Formentera', multiplier: 2.8, desc: 'Zona Prime - Lujo Extremo' },
  { name: 'Mallorca / Menorca', multiplier: 2.2, desc: 'Alta Demanda Turística' },
  { name: 'Madrid / Barcelona', multiplier: 1.9, desc: 'Capitales & Negocios' },
  { name: 'Marbella / Costa del Sol', multiplier: 2.4, desc: 'Exclusividad NiDDo' },
  { name: 'Alicante / Valencia / Sevilla', multiplier: 1.4, desc: 'Turismo Consolidado' },
  { name: 'Canarias', multiplier: 1.7, desc: 'Temporada Todo el Año' },
  { name: 'Otras Poblaciones / Rural', multiplier: 0.9, desc: 'Paz & Naturaleza' }
];

export const Home: React.FC<HomeProps> = ({ onNav }) => {
  const [calcType, setCalcType] = useState<PropertyType>(PropertyType.VILLA);
  const [calcNights, setCalcNights] = useState(15);
  const [calcRegion, setCalcRegion] = useState('España');
  const [calcCityMultiplier, setCalcCityMultiplier] = useState(SPAIN_LOCATIONS[0].multiplier);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'property' | 'restaurant'>('property');

  const estimatedEarnings = useMemo(() => {
    const basePrices: Record<string, number> = {
      [PropertyType.VILLA]: 350,
      [PropertyType.CHALET]: 200,
      [PropertyType.HOUSE]: 150,
      [PropertyType.APARTMENT]: 95,
      [PropertyType.STUDIO]: 70,
      [PropertyType.ROOM]: 45,
      [PropertyType.CARAVAN]: 60,
    };
    
    const regionMultiplier: Record<string, number> = {
      'España': 1.0, 
      'Europa': 1.1, 
      'América': 1.25, 
      'África': 0.8, 
      'Asia': 0.9
    };

    const base = basePrices[calcType] || 100;
    const region = regionMultiplier[calcRegion] || 1.0;
    const city = calcRegion === 'España' ? calcCityMultiplier : 1.0;
    
    return Math.round(base * calcNights * region * city);
  }, [calcType, calcNights, calcRegion, calcCityMultiplier]);

  const properties = [
    { id: 'p1', title: 'Villa Azure Palms', location: 'Alicante, España', price: 185, type: 'Villa', rating: 4.9, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
    { id: 'p2', title: 'Skyline Loft', location: 'Madrid, España', price: 120, type: 'Apartamento', rating: 4.8, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800' },
    { id: 'p3', title: 'Mountain Chalet', location: 'Andorra', price: 210, type: 'Chalet', rating: 4.9, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' },
    { id: 'p4', title: 'Boho Beach House', location: 'Tulum, México', price: 155, type: 'Casa', rating: 4.7, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800' }
  ];

  const restaurants = [
    { id: 'r1', name: 'La Terraza del Nido', location: 'Barcelona, España', price: 65, type: 'Mediterráneo', rating: 4.9, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
    { id: 'r2', name: 'Oceanic NiDDo', location: 'Alicante, España', price: 80, type: 'Marisquería', rating: 4.8, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800' },
    { id: 'r3', name: 'Gourmet Sky', location: 'Ciudad de México', price: 120, type: 'Fusión', rating: 5.0, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800' }
  ];

  const handleGlobalSearch = (type: string, destination: string) => {
    onNav(type);
  };

  return (
    <div className="pb-20 pt-20 bg-gray-50/30">
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1920" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic uppercase">Tu nido perfecto en el mundo</h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto italic">Experiencias exclusivas verificadas por NiDDoSty.</p>
        </div>
      </section>

      <SearchBar onSearch={handleGlobalSearch} />

      <CategoryGrid onNav={onNav} />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">Propiedades Destacadas</h2>
            <p className="text-gray-500 mt-2 font-medium italic">Nidos seleccionados para tu confort.</p>
          </div>
          <button className="text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline flex items-center gap-1">Ver todas <ArrowRight className="w-3 h-3" /></button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map(prop => (
            <div 
              key={prop.id} 
              className="group bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[3/2] overflow-hidden cursor-pointer" onClick={() => { setSelectedItem(prop); setModalType('property'); }}>
                <img src={prop.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prop.title} />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                   DESTACADO
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all border border-white/30">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-sm text-gray-800 uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => { setSelectedItem(prop); setModalType('property'); }}>{prop.title}</h3>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                    <span className="text-[10px] font-black text-gray-900">{prop.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 mb-4">
                  <MapPin className="w-3 h-3" /> {prop.location}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex flex-col">
                    <span className="text-blue-600 font-black text-xl tracking-tighter leading-none">{prop.price}€</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase italic">/ noche</span>
                  </div>
                  <button 
                    onClick={() => { setSelectedItem(prop); setModalType('property'); }}
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black uppercase italic tracking-tighter text-[10px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner Lanzamiento */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[50px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-2xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Zap className="w-4 h-4" /> Lanzamiento Exclusivo
            </div>
            <h2 className="text-5xl font-black mb-4 italic uppercase tracking-tighter leading-none">¡Promoción 300 Primeros!</h2>
            <p className="text-xl opacity-90 max-w-xl italic font-medium leading-tight">Registra tu propiedad o producto hoy y disfruta de <strong>0% comisiones</strong> hasta 2028.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter text-lg shadow-xl hover:bg-blue-50 transition-all active:scale-95">Registrar Mi Nido</button>
              <div className="bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col">
                <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Plazas restantes</span>
                <span className="text-2xl font-black text-orange-400">142</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-64 md:h-96 md:w-96 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm">
             <div className="text-center p-12">
               <span className="block text-8xl font-black tracking-tighter text-blue-200 leading-none">2028</span>
               <div className="w-full h-0.5 bg-blue-200/20 my-4" />
               <span className="text-sm tracking-[0.4em] font-black opacity-70 uppercase block">SIN COMISIONES</span>
             </div>
          </div>
        </div>
      </section>

      {/* Calculador de Ganancias Anfitrión MEJORADO PARA ESPAÑA */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-white rounded-[60px] border border-gray-100 shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-gray-50/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-200 rotate-3">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">Calcula tus ganancias NiDDoSty</h2>
            </div>
            <div className="space-y-10">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-1 italic">Tipo de propiedad</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[PropertyType.VILLA, PropertyType.APARTMENT, PropertyType.HOUSE, PropertyType.ROOM].map(type => (
                    <button 
                      key={type}
                      onClick={() => setCalcType(type)}
                      className={`py-4 rounded-2xl border-2 transition-all text-[10px] font-black uppercase tracking-widest ${calcType === type ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105' : 'bg-white border-transparent text-gray-400 hover:border-gray-200 hover:text-blue-600'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-1 italic">Mercado Global</label>
                    <div className="relative">
                      <select 
                        value={calcRegion} 
                        onChange={(e) => setCalcRegion(e.target.value)} 
                        className="w-full bg-white border-none rounded-[20px] p-5 font-black text-sm shadow-sm focus:ring-2 focus:ring-blue-500 appearance-none italic tracking-tighter"
                      >
                        <option>España</option>
                        <option>Europa</option>
                        <option>América</option>
                        <option>Asia</option>
                        <option>África</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {calcRegion === 'España' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                      <label className="block text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] mb-3 ml-1 italic flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Población / Zona Específica
                      </label>
                      <div className="relative">
                        <select 
                          onChange={(e) => setCalcCityMultiplier(parseFloat(e.target.value))} 
                          className="w-full bg-white border-2 border-orange-100 rounded-[20px] p-5 font-black text-sm shadow-sm focus:ring-2 focus:ring-orange-500 appearance-none italic tracking-tighter text-orange-900"
                        >
                          {SPAIN_LOCATIONS.map(loc => (
                            <option key={loc.name} value={loc.multiplier}>{loc.name} — {loc.desc}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-end">
                  <div className="flex justify-between mb-4 px-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Ocupación estimada</label>
                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{calcNights} noches</span>
                  </div>
                  <input type="range" min="1" max="30" value={calcNights} onChange={(e) => setCalcNights(parseInt(e.target.value))} className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
                  <p className="mt-4 text-[9px] font-bold text-gray-300 italic uppercase text-right">* Promedio mensual basado en oferta NiDDoSty</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center items-center text-center bg-gray-950 text-white relative overflow-hidden group">
            <TrendingUp className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="bg-blue-600/10 border border-blue-600/20 px-6 py-2 rounded-full mb-6 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] inline-block italic">Proyección de Ingresos NiDDo</div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-9xl font-black tracking-tighter italic text-blue-500 drop-shadow-[0_0_40px_rgba(37,99,235,0.3)]">{estimatedEarnings}€</span>
                <span className="text-2xl font-bold opacity-40 italic">/ mes</span>
              </div>
              <button className="bg-white text-gray-950 px-12 py-6 rounded-[30px] font-black uppercase italic tracking-tighter text-2xl shadow-3xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-4 active:scale-95 group/btn">
                Empezar a Facturar <ArrowRight className="w-8 h-8 group-hover/btn:translate-x-3 transition-transform" />
              </button>
              <p className="mt-8 text-xs font-bold text-gray-500 uppercase tracking-widest italic opacity-50">Cálculo en tiempo real basado en ubicación y demanda NiDDoSty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Detalles */}
      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          type={modalType} 
        />
      )}
    </div>
  );
};
