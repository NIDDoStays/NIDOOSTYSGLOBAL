
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Store, Tent, Phone, MapPin, 
  Search, Filter, Star, Heart, ShoppingCart, 
  ArrowRight, Truck, ShieldCheck, Tag, Zap, Compass, Map, CreditCard, Smartphone, Check, X, ArrowLeft, Camera, ShoppingBasket
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'tienda' | 'camping' | 'taxis' | 'experiencia' | 'visita';
  image: string;
  rating: number;
  location: string;
  description?: string;
}

const marketplaceData: Product[] = [
  // TIENDA LOCAL
  { id: 1, name: 'Toalla NiDDoSty Signature', price: 25, category: 'tienda', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400', rating: 4.9, location: 'Global', description: 'Toalla de algodón 100% con logo bordado para tu nido.' },
  { id: 2, name: 'Gorra NiDDo Explorer', price: 18, category: 'tienda', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400', rating: 4.8, location: 'Global', description: 'Edición limitada para fundadores NiDDoSty.' },
  
  // CAMPING
  { id: 10, name: 'Glamping Eco-Luxe Nido', price: 85, category: 'camping', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=400', rating: 5.0, location: 'Pirineos, España', description: 'Experiencia de camping de lujo en plena naturaleza.' },
  { id: 11, name: 'Camping Familiar Las Palmeras', price: 35, category: 'camping', image: 'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?auto=format&fit=crop&q=80&w=400', rating: 4.6, location: 'Alicante, España', description: 'El camping tradicional con la garantía de seguridad NiDDo.' },
  
  // EXPERIENCIAS
  { id: 20, name: 'Senderismo Volcánico', price: 45, category: 'experiencia', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400', rating: 4.9, location: 'Tenerife, España', description: 'Ruta guiada por expertos locales.' },
  { id: 21, name: 'Yoga al Amanecer en Villa', price: 30, category: 'experiencia', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', rating: 5.0, location: 'Ibiza, España', description: 'Paz y meditación en nidos seleccionados.' },
  
  // QUE VISITAR
  { id: 30, name: 'Tour Casco Antiguo Privado', price: 60, category: 'visita', image: 'https://images.unsplash.com/photo-1549918830-11ec3d026a2b?auto=format&fit=crop&q=80&w=400', rating: 4.9, location: 'Barcelona, España', description: 'Descubre los secretos de la ciudad con guías certificados.' },
  { id: 31, name: 'Ruta de Monumentos Históricos', price: 25, category: 'visita', image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=400', rating: 4.7, location: 'Sevilla, España', description: 'Entrada preferente a nidos culturales.' }
];

interface MarketplaceProps {
  initialCategory?: string;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ initialCategory }) => {
  const [activeCat, setActiveCat] = useState<'tienda' | 'camping' | 'taxis' | 'experiencia' | 'visita'>('tienda');
  const [searchPop, setSearchPop] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [buyStep, setBuyStep] = useState<'payment' | 'success'>('payment');

  // Sincronizar la pestaña activa con la prop inicial
  useEffect(() => {
    if (initialCategory === 'marketplace' || initialCategory === 'experiencia') {
      setActiveCat('experiencia');
    } else if (initialCategory === 'shops') {
      setActiveCat('tienda');
    } else if (initialCategory === 'camping') {
      setActiveCat('camping');
    } else if (initialCategory === 'taxis') {
      setActiveCat('taxis');
    } else if (initialCategory === 'visita') {
      setActiveCat('visita');
    }
  }, [initialCategory]);

  const filteredItems = marketplaceData.filter(p => {
    const matchesCat = p.category === activeCat;
    const matchesPop = searchPop === '' || p.location.toLowerCase().includes(searchPop.toLowerCase());
    return matchesCat && matchesPop;
  });

  const handleBuy = (p: Product) => {
    setSelectedProduct(p);
    setBuyStep('payment');
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner */}
        <section className={`rounded-[50px] p-12 text-white mb-12 relative overflow-hidden shadow-2xl ${activeCat === 'taxis' ? 'bg-gray-900' : 'bg-blue-600'}`}>
           <ShoppingBag className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
           <div className="relative z-10">
             <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                {activeCat === 'tienda' && 'Tienda Local NiDDoSty'}
                {activeCat === 'camping' && 'Campings & Glamping'}
                {activeCat === 'taxis' && 'Taxis Locales'}
                {activeCat === 'experiencia' && 'Experiencias NiDDo'}
                {activeCat === 'visita' && 'Qué Visitar'}
             </h1>
             <p className="text-blue-100 text-lg font-medium italic">Todo lo que necesitas en tu destino, 100% verificado.</p>
           </div>
        </section>

        {/* Filtros */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex bg-white p-2 rounded-[30px] border border-gray-200 shadow-sm overflow-x-auto no-scrollbar">
            {[
              { id: 'tienda', label: 'Tiendas', icon: Store },
              { id: 'camping', label: 'Campings', icon: Tent },
              { id: 'taxis', label: 'Taxis', icon: Phone },
              { id: 'experiencia', label: 'Experiencias', icon: Compass },
              { id: 'visita', label: 'Qué Visitar', icon: Map }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id as any)}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCat === cat.id ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-400 hover:text-blue-600'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="flex-1 w-full relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por población (Ej: Alicante, Barcelona...)" 
              className="w-full bg-white border-none rounded-[30px] py-5 pl-14 pr-6 font-bold shadow-sm focus:ring-2 focus:ring-blue-600 outline-none italic"
              value={searchPop}
              onChange={(e) => setSearchPop(e.target.value)}
            />
          </div>
        </div>

        {activeCat === 'taxis' ? (
          <div className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-xl text-center animate-in fade-in duration-700">
             <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[30px] flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10" />
             </div>
             <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-gray-900">Pedir Taxi en {searchPop || 'tu Zona'}</h2>
             <p className="text-gray-500 mb-10 max-w-lg mx-auto font-medium italic">Conductores verificados NiDDoSty con tarifas oficiales.</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(t => (
                  <div key={t} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 text-left hover:border-blue-500 transition-all group">
                     <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-gray-900 italic uppercase">Taxi NiDDo #{t}</span>
                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Disponible</div>
                     </div>
                     <p className="text-xs text-gray-400 mb-6 font-medium italic">Zona: {searchPop || 'Asignada'}</p>
                     <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase italic tracking-widest text-[10px] shadow-lg active:scale-95">Solicitar Trayecto</button>
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-700">
            {filteredItems.map(product => (
              <div key={product.id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col">
                 <div className="relative aspect-square overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                    <div className="absolute top-6 left-6">
                       <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                          {product.category === 'tienda' ? 'SHOP' : product.category.toUpperCase()}
                       </div>
                    </div>
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-black text-gray-800 italic uppercase tracking-tighter text-lg leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                       <span className="text-2xl font-black text-blue-600 tracking-tighter">{product.price}€</span>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1 italic">
                       <MapPin className="w-3 h-3 text-orange-500" /> {product.location}
                    </p>
                    <p className="text-xs text-gray-500 font-medium italic mb-6 line-clamp-2">{product.description}</p>
                    <button 
                      onClick={() => handleBuy(product)}
                      className="mt-auto w-full bg-gray-950 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                       {product.category === 'tienda' ? <ShoppingBasket className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                       {product.category === 'tienda' ? 'Comprar Ahora' : 'Reservar Plaza'}
                    </button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Pago */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
            <div className="relative bg-white w-full max-w-lg rounded-[50px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              {buyStep === 'payment' ? (
                <div className="p-12">
                   <h2 className="text-4xl font-black text-gray-900 mb-2 italic uppercase tracking-tighter leading-none">Confirmar NiDDo</h2>
                   <p className="text-gray-500 mb-10 font-medium italic">Estás adquiriendo: <strong>{selectedProduct.name}</strong> por <strong>{selectedProduct.price}€</strong></p>
                   
                   <div className="space-y-4 mb-10">
                    <button onClick={() => setBuyStep('success')} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-blue-50 rounded-3xl border border-gray-100 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><CreditCard className="w-6 h-6 text-blue-600" /></div>
                          <span className="font-black text-sm uppercase italic tracking-tighter">Monei Pay</span>
                       </div>
                       <ArrowRight className="w-5 h-5 text-gray-300" />
                    </button>
                    <button onClick={() => setBuyStep('success')} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-green-50 rounded-3xl border border-gray-100 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Smartphone className="w-6 h-6 text-green-600" /></div>
                          <span className="font-black text-sm uppercase italic tracking-tighter">Bizum</span>
                       </div>
                       <ArrowRight className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-16 text-center animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl animate-bounce">
                    <Check className="w-12 h-12 stroke-[4]" />
                  </div>
                  <h2 className="text-5xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase leading-none">¡Éxito!</h2>
                  <p className="text-gray-500 font-medium text-xl leading-tight">Tu pedido/reserva de <strong>{selectedProduct.name}</strong> ha sido verificado.</p>
                  <button onClick={() => setSelectedProduct(null)} className="mt-12 bg-gray-900 text-white px-8 py-4 rounded-xl font-black uppercase text-xs">Aceptar</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
