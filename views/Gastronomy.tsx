
import React, { useState } from 'react';
import { Utensils, MapPin, Star, Search, Filter, ArrowRight, Heart, Zap, Clock, Users, Award } from 'lucide-react';
import { ItemDetailModal } from '../components/ItemDetailModal';

const restaurantList = [
  { 
    id: 'r1', 
    name: 'La Terraza del Nido', 
    location: 'Barcelona, España', 
    price: 65, 
    type: 'Gourmet', 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    desc: 'Alta cocina mediterránea con vistas panorámicas al puerto.'
  },
  { 
    id: 'r2', 
    name: 'Taberna Real NiDDo', 
    location: 'Madrid, España', 
    price: 35, 
    type: 'Tradicional', 
    rating: 4.7, 
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    desc: 'Los sabores de siempre con un toque vanguardista en el corazón de Madrid.'
  },
  { 
    id: 'r3', 
    name: 'Veggie Heaven', 
    location: 'Ibiza, España', 
    price: 45, 
    type: 'Vegano', 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    desc: 'Ingredientes orgánicos y locales en un ambiente relajado y chic.'
  },
  { 
    id: 'r4', 
    name: 'Tapas & Nidos', 
    location: 'Sevilla, España', 
    price: 25, 
    type: 'Tapas', 
    rating: 4.6, 
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800',
    desc: 'La mejor selección de raciones para compartir entre amigos.'
  }
];

export const Gastronomy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Todos' | 'Gourmet' | 'Tradicional' | 'Tapas' | 'Vegano'>('Todos');
  const [searchCity, setSearchCity] = useState('');
  const [selectedRest, setSelectedRest] = useState<any>(null);

  const filteredRestaurants = restaurantList.filter(r => {
    const matchesTab = activeTab === 'Todos' || r.type === activeTab;
    const matchesCity = r.location.toLowerCase().includes(searchCity.toLowerCase());
    return matchesTab && matchesCity;
  });

  return (
    <div className="pt-24 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Gastronomía */}
        <section className="bg-orange-600 rounded-[50px] p-12 text-white mb-12 relative overflow-hidden shadow-2xl">
           <Utensils className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
           <div className="relative z-10">
             <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 w-fit">NiDDo Gastronomy Global</div>
             <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">Sabores del Mundo</h1>
             <p className="text-orange-100 text-xl font-medium max-w-xl">Reserva en los locales más exclusivos y disfruta de la cultura local a través del paladar.</p>
           </div>
        </section>

        {/* Filtros y Búsqueda */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex bg-white p-2 rounded-[25px] border border-gray-200 shadow-sm overflow-x-auto no-scrollbar flex-1">
            {['Todos', 'Gourmet', 'Tradicional', 'Tapas', 'Vegano'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-orange-600 text-white shadow-xl' : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar población..." 
              className="w-full bg-white border-none rounded-[30px] py-5 pl-14 pr-6 font-bold shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
        </div>

        {/* Listado de Restaurantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRestaurants.map(rest => (
            <div key={rest.id} className="group bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={rest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={rest.name} />
                <div className="absolute top-6 left-6">
                   <div className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                      {rest.type}
                   </div>
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-red-500 transition-all border border-white/30">
                   <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter group-hover:text-orange-600 transition-colors cursor-pointer" onClick={() => setSelectedRest(rest)}>{rest.name}</h3>
                       <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-orange-500" /> {rest.location}
                       </p>
                    </div>
                    <div className="bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1 text-orange-600">
                       <Star className="w-3 h-3 fill-current" />
                       <span className="text-xs font-black">{rest.rating}</span>
                    </div>
                 </div>
                 
                 <p className="text-gray-500 text-sm italic font-medium mb-8 leading-relaxed">{rest.desc}</p>
                 
                 <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-8">
                    <div>
                       <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Precio Medio</span>
                       <span className="text-4xl font-black text-gray-900 tracking-tighter">{rest.price}€</span>
                    </div>
                    <button 
                      onClick={() => setSelectedRest(rest)}
                      className="bg-gray-900 text-white px-8 py-4 rounded-[20px] font-black uppercase italic tracking-tighter text-sm hover:bg-orange-600 transition-all shadow-xl active:scale-95"
                    >
                       Reservar Mesa
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalle */}
        {selectedRest && (
          <ItemDetailModal 
            item={selectedRest} 
            onClose={() => setSelectedRest(null)} 
            type="restaurant" 
          />
        )}
      </div>
    </div>
  );
};
