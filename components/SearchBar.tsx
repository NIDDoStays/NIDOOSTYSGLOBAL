
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Users, Building2, Star, Sparkles, ChevronDown, X, Calendar } from 'lucide-react';
import { PropertyType } from '../types';

interface SearchBarProps {
  onSearch: (type: string, destination: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('property');
  const [guests, setGuests] = useState('2');
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar al pinchar fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { group: 'Alojamientos', options: [
      { id: 'property-apartment', label: 'Apartamentos', val: 'property' },
      { id: 'property-villa', label: 'Villas con Piscina', val: 'property' },
      { id: 'property-chalet', label: 'Chalets', val: 'property' },
      { id: 'property-house', label: 'Casas', val: 'property' },
      { id: 'property-caravan', label: 'Caravanas', val: 'property' },
      { id: 'property-room', label: 'Habitaciones', val: 'property' },
      { id: 'property-studio', label: 'Studios', val: 'property' },
    ]},
    { group: 'Gastronomía', options: [
      { id: 'gastronomy', label: 'Restaurantes', val: 'gastronomy' }
    ]},
    { group: 'Movilidad', options: [
      { id: 'cars-luxury', label: 'Coches de Lujo', val: 'cars' },
      { id: 'cars-standard', label: 'Coches Económicos', val: 'cars' },
      { id: 'cars-motos', label: 'Motos', val: 'cars' },
      { id: 'cars-quads', label: 'Quads & Karts', val: 'cars' },
      { id: 'flights', label: 'Vuelos & Aviones', val: 'flights' },
      { id: 'taxis', label: 'Taxis locales', val: 'marketplace' },
    ]},
    { group: 'Náutica & Ocio', options: [
      { id: 'boats-yachts', label: 'Yates de Lujo', val: 'boats' },
      { id: 'boats-jetski', label: 'Motos de Agua', val: 'boats' },
      { id: 'exp-yoga', label: 'Experiencias (Yoga/Senderismo)', val: 'marketplace' },
      { id: 'camping', label: 'Campings & Glamping', val: 'marketplace' },
    ]},
    { group: 'Shopping NiDDoSty', options: [
      { id: 'shops-local', label: 'Tiendas (Toallas, Gorras...)', val: 'marketplace' }
    ]}
  ];

  const handleSearchClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      setIsExpanded(true);
      return;
    }
    onSearch(category, destination);
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-40 px-4" ref={searchRef}>
      <div 
        className={`bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] border border-white/50 transition-all duration-700 ease-in-out overflow-hidden ${
          isExpanded ? 'p-6 md:p-4' : 'p-3 md:p-2 max-w-lg mx-auto'
        }`}
      >
        <div className={`flex flex-col md:flex-row items-center gap-2 ${isExpanded ? '' : 'justify-between'}`}>
          
          {/* Destino - Siempre visible pero cambia de tamaño */}
          <div 
            onClick={() => setIsExpanded(true)}
            className={`flex-1 flex items-center gap-4 px-6 py-3 rounded-[30px] transition-all cursor-pointer ${
              isExpanded ? 'bg-blue-50/50' : 'hover:bg-gray-50'
            }`}
          >
            <MapPin className={`w-5 h-5 transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-400'}`} />
            <div className="flex-1">
              {isExpanded && <label className="block text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1 italic">¿A dónde vamos?</label>}
              <input 
                type="text" 
                placeholder={isExpanded ? "Población o destino..." : "Empieza tu búsqueda..."} 
                className={`w-full focus:outline-none text-gray-800 font-black italic tracking-tighter bg-transparent placeholder:text-gray-400 ${isExpanded ? 'text-lg' : 'text-sm'}`} 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Filtros Extendidos - Solo visibles al expandir */}
          {isExpanded && (
            <>
              <div className="hidden md:block w-px h-10 bg-gray-200" />
              
              {/* Huéspedes */}
              <div className="flex-1 flex items-center gap-4 px-6 py-3 rounded-[30px] bg-blue-50/50 transition-all">
                <Users className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <label className="block text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1 italic">Huéspedes</label>
                  <input 
                    type="number" 
                    placeholder="Pax" 
                    className="w-full focus:outline-none text-gray-800 font-black italic tracking-tighter text-lg bg-transparent" 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-200" />

              {/* Categoría */}
              <div className="flex-[1.2] flex items-center gap-4 px-6 py-3 rounded-[30px] bg-orange-50/50 transition-all relative">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <div className="flex-1 pr-4">
                  <label className="block text-[8px] font-black text-orange-600 uppercase tracking-widest mb-1 italic">Categoría</label>
                  <select 
                    className="w-full focus:outline-none text-gray-800 font-black italic tracking-tighter text-lg bg-transparent appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((group) => (
                      <optgroup key={group.group} label={group.group.toUpperCase()} className="text-[10px] font-black text-gray-400">
                        {group.options.map(opt => (
                          <option key={opt.id} value={opt.val} className="text-gray-800 font-bold">{opt.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-300 absolute right-6 pointer-events-none" />
              </div>
            </>
          )}

          {/* Botón Acción */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {isExpanded && (
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <button 
              onClick={handleSearchClick}
              className={`bg-blue-600 hover:bg-gray-900 text-white rounded-[30px] transition-all shadow-2xl shadow-blue-200 flex items-center justify-center group/btn active:scale-90 ${
                isExpanded ? 'w-full md:w-24 h-20' : 'w-14 h-14'
              }`}
            >
              <Search className={`${isExpanded ? 'w-8 h-8' : 'w-5 h-5'} group-hover/btn:scale-125 transition-transform duration-500`} />
            </button>
          </div>

        </div>
      </div>
      
      {/* Sugerencias Rápidas - Solo visibles al expandir */}
      {isExpanded && (
        <div className="flex justify-center gap-3 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {['Villas con piscina', 'Apartamentos Playa', 'Restaurantes', 'Coches de Lujo'].map(tag => (
            <button key={tag} className="bg-white/40 backdrop-blur-md border border-white/40 px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-white hover:bg-white hover:text-blue-600 transition-all">
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
