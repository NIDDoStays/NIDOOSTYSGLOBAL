
import React, { useState } from 'react';
import { Car, Plane, Ship, Hotel, MapPin, Star, Heart, Zap, ArrowRight, ShieldCheck, Waves, Info, Anchor } from 'lucide-react';

interface ServicesProps {
  type: string;
}

const serviceData: Record<string, any> = {
  cars: {
    title: 'Alquiler de Vehículos',
    icon: Car,
    items: [
      { id: 'c1', name: 'Porsche 911 Carrera', sub: 'Coche de Lujo', price: 450, rating: 5.0, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400' },
      { id: 'c2', name: 'Tesla Model 3', sub: 'Coche Económico', price: 120, rating: 4.9, img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400' },
      { id: 'c3', name: 'Quad Adventure Pro', sub: 'Motos & Quads', price: 85, rating: 4.8, img: 'https://images.unsplash.com/photo-1551021210-917397b9134a?auto=format&fit=crop&q=80&w=400' },
      { id: 'c4', name: 'CampusNiDDo Van', sub: 'Coche Económico', price: 65, rating: 4.7, img: 'https://images.unsplash.com/photo-1523985039202-5e44e7a07fd9?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  flights: {
    title: 'Vuelos & Aviones',
    icon: Plane,
    items: [
      { id: 'f1', name: 'Global 7500', sub: 'Alquiler de Aviones Privados', price: 8500, rating: 5.0, img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=400' },
      { id: 'f2', name: 'Vuelo Regional NiDDo', sub: 'Vuelo Comercial', price: 150, rating: 4.9, img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c055?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  boats: {
    title: 'Alquiler de Barcos',
    icon: Ship,
    items: [
      { id: 'b1', name: 'Sunseeker Ocean 90', sub: 'Yates de Lujo', price: 2500, rating: 5.0, img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=400' },
      { id: 'b2', name: 'Sea-Doo RXP-X', sub: 'Motos de Agua', price: 180, rating: 4.8, img: 'https://images.unsplash.com/photo-1545642187-a2929513302a?auto=format&fit=crop&q=80&w=400' },
      { id: 'b3', name: 'Kitesurf Experience', sub: 'Otros deportes de agua', price: 95, rating: 4.9, img: 'https://images.unsplash.com/photo-1517176118179-65244903d13c?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  hotels: {
    title: 'Hoteles & Hostales',
    icon: Hotel,
    items: [
      { id: 'h1', name: 'Grand NiDDo Palace', sub: 'Hotel 5 Estrellas', price: 380, rating: 5.0, img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400' },
      { id: 'h2', name: 'Hostal Nómada', sub: 'Hostales', price: 45, rating: 4.7, img: 'https://images.unsplash.com/photo-1555854816-80dc12219b82?auto=format&fit=crop&q=80&w=400' }
    ]
  }
};

export const Services: React.FC<ServicesProps> = ({ type }) => {
  const data = serviceData[type] || serviceData.cars;
  const [filter, setFilter] = useState('Todos');

  const categories = Array.from(new Set(data.items.map((i: any) => i.sub)));

  const filteredItems = filter === 'Todos' 
    ? data.items 
    : data.items.filter((i: any) => i.sub === filter);

  return (
    <div className="pt-24 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner de Servicio */}
        <section className="bg-gray-900 rounded-[50px] p-12 text-white mb-12 relative overflow-hidden shadow-2xl">
           <data.icon className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
           <div className="relative z-10">
             <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 w-fit">NiDDoSty Global Mobility</div>
             <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">{data.title}</h1>
             <p className="text-blue-100 text-xl font-medium max-w-xl italic">Excelencia y seguridad en cada trayecto verificado.</p>
           </div>
        </section>

        {/* Pestañas Desplegables de Filtro */}
        <div className="flex bg-white p-2 rounded-[30px] border border-gray-200 shadow-sm mb-12 overflow-x-auto no-scrollbar">
           <button 
             onClick={() => setFilter('Todos')}
             className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${filter === 'Todos' ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-400 hover:text-blue-600'}`}
           >
             Todos
           </button>
           {categories.map((cat: any) => (
             <button 
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-400 hover:text-blue-600'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Grid de Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item: any) => (
            <div key={item.id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                <div className="absolute top-6 left-6">
                   <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                      {item.sub}
                   </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter group-hover:text-blue-600 transition-colors leading-none">{item.name}</h3>
                    <div className="flex items-center gap-1 text-orange-500">
                       <Star className="w-3 h-3 fill-current" />
                       <span className="text-[10px] font-black">{item.rating}</span>
                    </div>
                 </div>
                 
                 <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                       <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Precio NiDDo</span>
                       <span className="text-3xl font-black text-gray-900 tracking-tighter">{item.price}€</span>
                    </div>
                    <button className="bg-gray-950 text-white px-8 py-4 rounded-xl font-black uppercase italic tracking-tighter text-[10px] hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                       Reservar
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
