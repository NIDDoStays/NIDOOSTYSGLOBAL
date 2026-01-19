
import React, { useState } from 'react';
/* Added Award to the imports from lucide-react */
import { 
  GraduationCap, Calendar as CalendarIcon, BookOpen, Coffee, 
  ChevronLeft, ChevronRight, Check, Info, X, CreditCard, Clock,
  ShieldCheck, AlertCircle, MapPin, Wifi, Wind, Zap, Trash2,
  Search, Filter, Star, Sparkles, Heart, Users, Phone, User, Fingerprint, Mail,
  Tv, Waves, Dumbbell, Car, ArrowLeft, Smartphone, Landmark, Loader2, Award
} from 'lucide-react';

interface CampusProperty {
  id: number;
  name: string;
  type: string;
  price: number;
  images: string[];
  description: string;
  amenities: { icon: any, label: string }[];
  location: string;
  university: string;
  distance: string;
  rating: number;
}

const campusProperties: CampusProperty[] = [
  { 
    id: 1, 
    name: 'Residencia San Juan Premium', 
    type: 'Habitación individual', 
    price: 450, 
    images: [
      'https://images.unsplash.com/photo-1555854816-80dc12219b82?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Ubicada a tan solo 5 minutos a pie de la principal facultad de Medicina y del campus tecnológico.',
    amenities: [
      { icon: Wifi, label: 'Fibra 1Gb' },
      { icon: Coffee, label: 'Cafetería' },
      { icon: Wind, label: 'A/A Central' },
      { icon: Zap, label: 'Gastos Incl.' }
    ],
    location: 'Zona Universitaria, Madrid',
    university: 'Complutense / Politécnica',
    distance: '350m del campus',
    rating: 4.9
  },
  { 
    id: 2, 
    name: 'Estudios Marítima Deluxe', 
    type: 'Estudio independiente', 
    price: 620, 
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Diseñada para postgraduados que buscan privacidad. Ventanales de suelo a techo con vistas al mar.',
    amenities: [
      { icon: Wifi, label: 'Wifi 6' },
      { icon: BookOpen, label: 'Biblioteca' },
      { icon: Zap, label: 'Todo Incl.' },
      { icon: MapPin, label: 'Vistas Mar' }
    ],
    location: 'Paseo Marítimo, Barcelona',
    university: 'UPF / ESADE',
    distance: '10 min metro',
    rating: 4.8
  },
  { 
    id: 3, 
    name: 'Nido Urbano Coliving', 
    type: 'Habitación en suite', 
    price: 380, 
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Espacios compartidos reformados integralmente. Gran cocina y zona lounge.',
    amenities: [
      { icon: Wifi, label: 'Wifi' },
      { icon: Users, label: 'Eventos' },
      { icon: Zap, label: 'Gastos fijos' },
      { icon: Trash2, label: 'Limpieza' }
    ],
    location: 'Barrio del Carmen, Valencia',
    university: 'UV / UPV',
    distance: 'Centro histórico',
    rating: 4.7
  }
];

export const Campus: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<CampusProperty | null>(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [regModalStep, setRegModalStep] = useState<'info' | 'payment' | 'processing' | 'success'>('info');
  const [activeImg, setActiveImg] = useState(0);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedMonths, setSelectedMonths] = useState<string[]>(['Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(800);
  const [selectedMustHaves, setSelectedMustHaves] = useState<string[]>([]);

  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    university: '',
    email: ''
  });

  const academicMonths = [
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto'
  ];

  const mustHaves = [
    { id: 'wifi', label: 'Wifi Fibra', icon: Wifi },
    { icon: Trash2, id: 'clean', label: 'Limpieza' },
    { icon: User, id: 'bath', label: 'Baño Privado' },
    { icon: Wind, id: 'ac', label: 'Aire Acond.' }
  ];

  const toggleMustHave = (id: string) => {
    setSelectedMustHaves(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenBooking = (prop: CampusProperty) => {
    setSelectedProperty(prop);
    setActiveImg(0);
    setBookingStep(1);
  };

  const toggleMonth = (month: string) => {
    setSelectedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const calculateSubtotal = () => (selectedProperty?.price || 0) * selectedMonths.length;
  const calculateVAT = () => calculateSubtotal() * 0.21;
  const calculateTotal = () => calculateSubtotal() + calculateVAT();

  const handleCampusPayment = (method: string) => {
    setRegModalStep('processing');
    setTimeout(() => {
      setRegModalStep('success');
      setTimeout(() => {
        setShowRegModal(false);
        setRegModalStep('info');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="pt-20 pb-20 bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 h-[400px] flex items-center relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523050335102-c89b14779f64?auto=format&fit=crop&q=80&w=1920" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="University Campus" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex-1">
             <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl shadow-blue-500/20">
               <GraduationCap className="w-4 h-4" /> Comunidad Académica NiDDo
             </div>
             <h1 className="text-6xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">Campus NiDDoSty</h1>
             <p className="text-blue-100 text-xl max-w-xl font-medium leading-tight mb-10 opacity-90 italic">Encuentra tu nido ideal para el curso académico. Seguridad total para estudiantes.</p>
             
             <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => { setShowRegModal(true); setRegModalStep('info'); }}
                  className="bg-white text-blue-900 px-10 py-5 rounded-[25px] font-black uppercase italic tracking-tighter text-lg hover:bg-blue-50 transition-all shadow-3xl flex items-center gap-4 active:scale-95"
                >
                  <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" /> Unirse al Campus (Plan 8€)
                </button>
             </div>
           </div>
           
           <div className="hidden lg:block bg-white/10 backdrop-blur-xl p-10 rounded-[50px] border border-white/20 text-white shadow-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-2 italic">Student Pass VIP</p>
              <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-7xl font-black tracking-tighter italic">8€</span>
                 <span className="text-sm font-bold opacity-60 italic">/ pago único</span>
              </div>
              <ul className="space-y-3 text-[11px] font-black uppercase tracking-widest">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-400" /> Registro oficial obligatorio</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-400" /> Verificación de identidad</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-400" /> Acceso a ofertas exclusivas</li>
              </ul>
           </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Filtros */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-gray-100 sticky top-24">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 bg-blue-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-blue-100 rotate-3">
                    <Filter className="w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900">Buscador</h2>
              </div>

              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1 italic">¿Dónde estudias?</label>
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                    <input 
                      type="text" 
                      placeholder="Universidad o Ciudad..." 
                      className="w-full bg-gray-50 border-2 border-transparent rounded-[22px] py-5 pl-14 pr-4 text-sm font-bold focus:bg-white focus:border-blue-600 transition-all outline-none italic shadow-inner"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Presupuesto</label>
                    <span className="text-blue-600 font-black text-sm italic">{maxPrice}€/mes</span>
                  </div>
                  <input 
                    type="range" 
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    min="200" max="1500" step="50" value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1 italic">Equipamiento</label>
                  <div className="grid grid-cols-2 gap-3">
                    {mustHaves.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleMustHave(item.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-[25px] border-2 transition-all ${
                          selectedMustHaves.includes(item.id)
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xl'
                            : 'bg-gray-50 border-transparent text-gray-400 hover:border-gray-200'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gray-950 text-white py-6 rounded-[25px] font-black uppercase tracking-widest italic text-xs hover:bg-blue-600 transition-all shadow-2xl active:scale-95">
                   Filtrar Nidos
                </button>
              </div>
            </div>
          </aside>

          {/* Grid Resultados */}
          <div className="lg:col-span-3">
             <div className="flex justify-between items-center mb-10 px-4">
                <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase leading-none">Nidos para el Curso</h2>
                <span className="text-blue-600 font-black italic uppercase tracking-tighter text-sm">3 Resultados</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {campusProperties.map(prop => (
                 <div key={prop.id} className="bg-white rounded-[55px] overflow-hidden shadow-sm hover:shadow-3xl transition-all duration-700 border border-gray-100 group flex flex-col">
                    <div className="relative h-72 overflow-hidden">
                      <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={prop.name} />
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                         <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">STUDENT READY</div>
                      </div>
                    </div>
                    <div className="p-10 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                           <h3 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter group-hover:text-blue-600 transition-colors leading-none mb-1">{prop.name}</h3>
                           <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest italic">{prop.type}</p>
                        </div>
                        <div className="text-right">
                           <span className="block text-4xl font-black text-gray-900 tracking-tighter">{prop.price}€</span>
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">/ Mes</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl mb-8 flex items-center justify-between border border-gray-100">
                         <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{prop.university}</span>
                         </div>
                         <span className="text-[9px] font-black text-blue-400 italic">{prop.distance}</span>
                      </div>
                      <button 
                        onClick={() => handleOpenBooking(prop)}
                        className="mt-auto w-full bg-gray-950 text-white py-5 rounded-[22px] font-black uppercase tracking-widest italic text-xs hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                      >
                         Explorar y Reservar
                      </button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Modal UNIRSE AL CAMPUS (PASARELA 8€) */}
      {showRegModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-10">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-xl" onClick={() => setShowRegModal(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-[60px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500">
            
            <button onClick={() => setShowRegModal(false)} className="absolute top-8 right-8 p-3 bg-gray-100 text-gray-400 hover:text-red-500 rounded-full transition-all">
              <X className="w-6 h-6" />
            </button>

            {regModalStep === 'info' && (
              <div className="p-12 md:p-16">
                 <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-xl border border-blue-100 rotate-3">
                       <Award className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">Student Pass VIP</h3>
                    <p className="text-gray-500 font-medium italic mt-2">Acceso ilimitado al Campus NiDDoSty.</p>
                 </div>

                 <div className="space-y-6 mb-12">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Nombre</label>
                          <input type="text" value={studentForm.firstName} onChange={e => setStudentForm({...studentForm, firstName: e.target.value})} className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm shadow-inner" placeholder="Tu nombre" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Apellidos</label>
                          <input type="text" value={studentForm.lastName} onChange={e => setStudentForm({...studentForm, lastName: e.target.value})} className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm shadow-inner" placeholder="Tus apellidos" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Tu Universidad</label>
                       <input type="text" value={studentForm.university} onChange={e => setStudentForm({...studentForm, university: e.target.value})} className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm shadow-inner" placeholder="Ej: Complutense de Madrid" />
                    </div>
                 </div>

                 <div className="bg-gray-900 rounded-[35px] p-8 text-white flex items-center justify-between mb-10">
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic block mb-1">Total a pagar</span>
                       <span className="text-5xl font-black italic tracking-tighter">8,00€</span>
                    </div>
                    <button 
                      onClick={() => setRegModalStep('payment')}
                      disabled={!studentForm.firstName || !studentForm.university}
                      className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95"
                    >
                      Ir al Pago
                    </button>
                 </div>
              </div>
            )}

            {regModalStep === 'payment' && (
              <div className="p-12 md:p-16 animate-in fade-in slide-in-from-right-8">
                 <button onClick={() => setRegModalStep('info')} className="flex items-center gap-2 text-blue-600 font-black uppercase italic text-xs tracking-widest mb-10 hover:-translate-x-2 transition-transform">
                    <ArrowLeft className="w-4 h-4" /> Volver a mis datos
                 </button>
                 <h3 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-none mb-4">Pago Seguro</h3>
                 <p className="text-gray-500 font-medium italic mb-10">Selecciona el método de pago para tu Student Pass de 8,00€.</p>

                 <div className="space-y-4 mb-10">
                    <button onClick={() => handleCampusPayment('Monei')} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-blue-50 rounded-[25px] border border-gray-100 transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md"><CreditCard className="w-6 h-6 text-blue-600" /></div>
                          <span className="font-black text-sm uppercase italic tracking-tighter text-gray-800">Monei Pay</span>
                       </div>
                       <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => handleCampusPayment('Bizum')} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-green-50 rounded-[25px] border border-gray-100 transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md"><Smartphone className="w-6 h-6 text-green-600" /></div>
                          <span className="font-black text-sm uppercase italic tracking-tighter text-gray-800">Bizum</span>
                       </div>
                       <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => handleCampusPayment('Tarjeta')} className="w-full flex items-center justify-between p-6 bg-gray-950 text-white rounded-[25px] shadow-2xl transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><CreditCard className="w-6 h-6" /></div>
                          <span className="font-black text-sm uppercase italic tracking-tighter">Tarjeta Bancaria</span>
                       </div>
                       <ChevronRight className="w-5 h-5 text-white/30 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            )}

            {regModalStep === 'processing' && (
              <div className="p-20 text-center animate-in zoom-in-95">
                 <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-10 mx-auto" />
                 <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-4">Verificando Pago...</h2>
                 <p className="text-gray-400 font-bold italic">Conectando con la pasarela segura de NiDDoSty.</p>
              </div>
            )}

            {regModalStep === 'success' && (
              <div className="p-20 text-center animate-in zoom-in-95">
                 <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-10 mx-auto shadow-2xl animate-bounce">
                    <Check className="w-12 h-12 stroke-[4]" />
                 </div>
                 <h2 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-4">¡Bienvenido!</h2>
                 <p className="text-gray-500 font-medium text-xl italic leading-tight">Ya eres parte del Campus NiDDoSty. Tu Student Pass de 8€ ha sido activado.</p>
                 <div className="mt-12 bg-blue-50 px-10 py-5 rounded-full text-blue-600 font-black text-xs uppercase tracking-widest italic animate-pulse">Comprobante enviado a tu email</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Detalle Propiedad (Mantener igual pero verificar que sea funcional) */}
      {selectedProperty && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 py-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer" onClick={() => setSelectedProperty(null)} />
          <div className="relative bg-white w-full max-w-7xl h-full rounded-[60px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
            <button onClick={() => setSelectedProperty(null)} className="absolute top-10 right-10 z-[200] p-4 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all border border-white/20 shadow-2xl backdrop-blur-md group"><X className="w-8 h-8 group-hover:rotate-90 transition-transform" /></button>
            <div className="w-full md:w-5/12 bg-gray-950 text-white flex flex-col overflow-hidden border-r border-white/5">
              <div className="relative h-[40%] shrink-0">
                <img src={selectedProperty.images[activeImg]} className="w-full h-full object-cover transition-opacity duration-500" alt={selectedProperty.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-10 right-10">
                  <div className="flex items-center gap-2 mb-2"><MapPin className="w-4 h-4 text-blue-400" /><span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{selectedProperty.location}</span></div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-1 leading-none text-white">{selectedProperty.name}</h3>
                </div>
              </div>
              <div className="px-10 pt-6 flex gap-4 overflow-x-auto no-scrollbar shrink-0">
                {selectedProperty.images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImg(idx)} className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'border-transparent opacity-30 hover:opacity-100'}`}><img src={img} className="w-full h-full object-cover" alt="" /></button>
                ))}
              </div>
              <div className="flex-1 p-10 overflow-y-auto no-scrollbar space-y-10">
                <div className="bg-white/5 p-8 rounded-[40px] border border-white/10"><h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 italic">Memoria Descriptiva</h4><p className="text-gray-300 leading-relaxed text-sm font-medium">{selectedProperty.description}</p></div>
              </div>
              <div className="p-10 bg-blue-600/5 border-t border-white/5"><div className="flex items-center justify-between p-8 bg-blue-600 rounded-[40px] shadow-2xl"><div><p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Precio / Mes</p><p className="text-5xl font-black tracking-tighter leading-none">{selectedProperty.price}€</p></div><div className="text-right"><p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">IVA del 21%</p><p className="text-xs font-bold italic uppercase tracking-tighter">NiDDoSty Garantía</p></div></div></div>
            </div>
            <div className="flex-1 p-16 overflow-y-auto bg-white flex flex-col no-scrollbar relative">
              {bookingStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-10 duration-700 h-full flex flex-col">
                  <button onClick={() => setSelectedProperty(null)} className="flex items-center gap-2 text-blue-600 font-black uppercase italic text-[10px] tracking-widest mb-10 hover:-translate-x-2 transition-transform w-fit"><ArrowLeft className="w-4 h-4" /> Volver al buscador</button>
                  <div className="mb-12"><h2 className="text-6xl font-black text-gray-900 mb-3 italic tracking-tighter uppercase leading-none">Tu Plan Académico</h2><p className="text-gray-500 font-medium text-xl">Selecciona los meses de ocupación.</p></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 items-start">
                    {academicMonths.map(month => (
                      <button key={month} onClick={() => toggleMonth(month)} className={`group relative p-10 rounded-[40px] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${selectedMonths.includes(month) ? 'bg-blue-600 border-blue-600 text-white shadow-2xl scale-105' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:-translate-y-2'}`}><CalendarIcon className={`w-10 h-10 ${selectedMonths.includes(month) ? 'text-white' : 'text-blue-200 group-hover:text-blue-500'} transition-colors`} /><span className="font-black text-[10px] uppercase tracking-[0.2em]">{month}</span></button>
                    ))}
                  </div>
                  <div className="mt-12 bg-gray-900 text-white p-12 rounded-[50px] shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-10">
                       <div className="w-20 h-20 bg-white/10 rounded-[30px] flex items-center justify-center text-blue-400"><Clock className="w-10 h-10" /></div>
                       <div><p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Periodo Lectivo</p><p className="text-5xl font-black italic tracking-tighter leading-none">{selectedMonths.length} Meses</p></div>
                    </div>
                    <div className="text-center lg:text-right"><p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Total Neto Estancia</p><p className="text-6xl font-black text-blue-500 tracking-tighter leading-none">{calculateSubtotal()}€</p></div>
                    <button onClick={() => setBookingStep(2)} disabled={selectedMonths.length === 0} className="w-full lg:w-auto bg-blue-600 text-white px-16 py-8 rounded-[35px] font-black text-2xl uppercase italic tracking-tighter hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/40 disabled:opacity-50 active:scale-95">Continuar Reserva</button>
                  </div>
                </div>
              )}
              {bookingStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-10 duration-700 max-w-2xl mx-auto w-full py-10">
                   <button onClick={() => setBookingStep(1)} className="flex items-center gap-3 text-blue-600 font-black uppercase italic tracking-tighter mb-12 hover:translate-x-[-8px] transition-transform text-lg"><ChevronLeft className="w-8 h-8" /> Cambiar fechas</button>
                   <h2 className="text-6xl font-black text-gray-900 mb-4 italic tracking-tighter uppercase leading-none">Confirmación</h2>
                   <div className="bg-gray-50 p-12 rounded-[50px] border border-gray-100 shadow-inner space-y-8 mb-16">
                      <div className="flex justify-between items-center text-xl font-bold"><span className="text-gray-400 italic">Subtotal ({selectedMonths.length} meses)</span><span className="text-gray-900 tracking-tighter">{calculateSubtotal()}€</span></div>
                      <div className="flex justify-between items-center text-xl font-bold"><span className="text-gray-400 italic">IVA (21%)</span><span className="text-gray-900 tracking-tighter font-bold">{calculateVAT().toFixed(2)}€</span></div>
                      <div className="pt-10 border-t-2 border-dashed border-gray-200 flex justify-between items-center"><span className="font-black text-gray-900 text-4xl uppercase italic tracking-tighter">Total Final</span><span className="text-7xl font-black text-blue-600 tracking-tighter">{calculateTotal().toFixed(2)}€</span></div>
                   </div>
                   <button className="w-full bg-blue-600 text-white py-10 rounded-[40px] font-black text-3xl uppercase italic tracking-tighter hover:bg-blue-700 transition-all shadow-3xl shadow-blue-600/40 flex items-center justify-center gap-6 active:scale-[0.98]"><ShieldCheck className="w-10 h-10" /> Pagar {calculateTotal().toFixed(2)}€ Ahora</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
