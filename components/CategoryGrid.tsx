
import React from 'react';
import { 
  Utensils, Car, Plane, Hotel, Ship, Star, Map, Store, Tent, ShoppingBag, 
  Bike, Camera, Compass, Heart, Waves, GraduationCap, Phone
} from 'lucide-react';

interface CategoryGridProps {
  onNav?: (view: string) => void;
}

const categories = [
  { 
    id: 'gastronomy', icon: Utensils, label: 'Restaurantes', 
    sub: ['Gourmet', 'Tradicional', 'Tapas', 'Vegano'] 
  },
  { 
    id: 'cars', icon: Car, label: 'Coches & Motos', 
    sub: ['Coches de Lujo', 'Coches Económicos', 'Motos NiDDo', 'Quads & Karts'] 
  },
  { 
    id: 'flights', icon: Plane, label: 'Vuelos NiDDo', 
    sub: ['Alquiler de Aviones Privados', 'Vuelo Comercial', 'Helicópteros'] 
  },
  { 
    id: 'hotels', icon: Hotel, label: 'Hoteles', 
    sub: ['Hoteles 5 Estrellas', 'Hostales', 'Hoteles Boutique'] 
  },
  { 
    id: 'boats', icon: Ship, label: 'Náutica', 
    sub: ['Yates de Lujo', 'Alquiler Motos de Agua', 'Otros deportes de agua'] 
  },
  { 
    id: 'marketplace', icon: Compass, label: 'Experiencias', 
    sub: ['Senderismo', 'Yoga', 'Rutas Guiadas'] 
  },
  { 
    id: 'visita', icon: Map, label: 'Qué visitar', 
    sub: ['Ver Población', 'Monumentos', 'Naturaleza'] 
  },
  { 
    id: 'shops', icon: Store, label: 'Tiendas locales', 
    sub: ['Comprar Toallas', 'Comprar Gorras', 'Moda NiDDo'] 
  },
  { 
    id: 'camping', icon: Tent, label: 'Campings', 
    sub: ['Glamping Luxe', 'Camping Familiar', 'Camping Aventura'] 
  },
  { 
    id: 'taxis', icon: Phone, label: 'Taxis Locales', 
    sub: ['Buscar por Población', 'Transfer Aeropuerto'] 
  }
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onNav }) => {
  return (
    <div className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-2">Todo en tu mano NiDDoSty</h2>
              <p className="text-gray-500 font-medium italic">Acceso instantáneo a servicios globales verificados.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative">
              <button 
                onClick={() => onNav && onNav(cat.id === 'marketplace' ? 'experiencia' : cat.id)}
                className="w-full flex flex-col items-center p-8 bg-gray-50 rounded-[35px] hover:bg-blue-600 hover:text-white transition-all border border-transparent hover:border-blue-500 hover:shadow-2xl active:scale-95"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-white/20 transition-colors text-gray-900 group-hover:text-white">
                   <cat.icon className="w-6 h-6" />
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">{cat.label}</span>
              </button>
              
              <div className="absolute top-[85%] left-0 right-0 pt-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-30">
                <div className="bg-white rounded-3xl shadow-3xl border border-gray-100 p-4 shadow-2xl">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Explorar {cat.label}</p>
                  <ul className="space-y-1">
                    {cat.sub.map(s => (
                      <li 
                        key={s} 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNav && onNav(cat.id === 'marketplace' ? 'experiencia' : cat.id);
                        }}
                        className="text-[10px] font-black uppercase text-gray-600 hover:text-blue-600 p-3 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between group/item"
                      >
                        {s}
                        <Star className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
