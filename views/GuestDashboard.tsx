
import React, { useState, useRef } from 'react';
import { 
  Briefcase, Heart, User, MapPin, Calendar, 
  ChevronRight, ShieldCheck, CreditCard, Globe, Camera,
  Fingerprint, FileText, ArrowRight, Loader2, Sparkles, CheckCircle2,
  Trash2, ShieldAlert, X, Plane, Compass, Star, Award, Receipt
} from 'lucide-react';

interface GuestDashboardProps {
  user: any;
}

export const GuestDashboard: React.FC<GuestDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('viajes');
  const [isVerified, setIsVerified] = useState(user?.isVerified || false);
  const [regStep, setRegStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs para inputs biométricos
  const inputDniFront = useRef<HTMLInputElement>(null);
  const inputDniBack = useRef<HTMLInputElement>(null);
  const inputSelfie = useRef<HTMLInputElement>(null);

  const [guestData, setGuestData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    birthPlace: user?.birthPlace || '',
    residence: user?.residence || '',
    dniFront: null as string | null,
    dniBack: null as string | null,
    selfie: null as string | null
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: 'dniFront' | 'dniBack' | 'selfie') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGuestData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const finalizeRegistration = () => {
    setIsProcessing(true);
    // Simulación de validación AI de NiDDoSty
    setTimeout(() => {
      setIsProcessing(false);
      setIsVerified(true);
      setActiveTab('viajes');
    }, 2500);
  };

  const myTrips = [
    { id: 't1', title: 'Villa Azure Palms', location: 'Alicante, España', dates: '15 - 20 Jun 2024', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400', status: 'Confirmado' }
  ];

  if (!isVerified) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <input type="file" ref={inputDniFront} accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e, 'dniFront')} />
        <input type="file" ref={inputDniBack} accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e, 'dniBack')} />
        <input type="file" ref={inputSelfie} accept="image/*" capture="user" className="hidden" onChange={(e) => handleFile(e, 'selfie')} />

        <div className="max-w-6xl w-full bg-white rounded-[60px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-700 flex flex-col md:flex-row min-h-[700px] border border-gray-100">
          
          <div className="md:w-5/12 bg-gray-950 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <Compass className="absolute -right-20 -bottom-20 w-96 h-96 rotate-12 text-blue-500" />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-[25px] flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-6">Registro de Viajero Global</h2>
              <p className="text-gray-400 font-medium italic leading-relaxed text-lg">
                Para garantizar la seguridad de nuestra comunidad, NiDDoSty requiere una verificación de identidad única. Solo le llevará un minuto.
              </p>
            </div>
            
            <div className="space-y-6 relative z-10 mt-12">
               {[
                 { step: 1, label: 'Perfil del Huésped' },
                 { step: 2, label: 'Documentación DNI' },
                 { step: 3, label: 'Verificación Facial' }
               ].map(s => (
                 <div key={s.step} className={`flex items-center gap-4 transition-all duration-500 ${regStep === s.step ? 'opacity-100 scale-105' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${regStep === s.step ? 'bg-blue-600 text-white' : 'bg-transparent border border-white/20'}`}>
                      {s.step}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{s.label}</span>
                 </div>
               ))}
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 italic flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Sistema Seguro NiDDoSty 2024
              </p>
            </div>
          </div>

          <div className="flex-1 p-12 md:p-20 overflow-y-auto no-scrollbar">
            {regStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-12">
                  <h3 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 leading-none">Paso 1: Sus Datos</h3>
                  <p className="text-gray-400 font-medium italic text-lg">Información requerida para el registro oficial de viajeros.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic group-focus-within:text-blue-600 transition-colors">Nombre</label>
                      <input 
                        type="text" 
                        value={guestData.firstName}
                        onChange={e => setGuestData({...guestData, firstName: e.target.value})}
                        placeholder="Ej: Carmen" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent font-bold text-sm focus:bg-white focus:border-blue-600 shadow-inner outline-none transition-all" 
                      />
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic group-focus-within:text-blue-600 transition-colors">Apellidos</label>
                      <input 
                        type="text" 
                        value={guestData.lastName}
                        onChange={e => setGuestData({...guestData, lastName: e.target.value})}
                        placeholder="Ej: Ortiz López" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent font-bold text-sm focus:bg-white focus:border-blue-600 shadow-inner outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic group-focus-within:text-blue-600 transition-colors">Lugar de Nacimiento</label>
                      <input 
                        type="text" 
                        value={guestData.birthPlace}
                        onChange={e => setGuestData({...guestData, birthPlace: e.target.value})}
                        placeholder="Ciudad, País" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent font-bold text-sm focus:bg-white focus:border-blue-600 shadow-inner outline-none transition-all" 
                      />
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic group-focus-within:text-blue-600 transition-colors">Residencia Actual</label>
                      <input 
                        type="text" 
                        value={guestData.residence}
                        onChange={e => setGuestData({...guestData, residence: e.target.value})}
                        placeholder="Dirección completa" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-transparent font-bold text-sm focus:bg-white focus:border-blue-600 shadow-inner outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setRegStep(2)} 
                    disabled={!guestData.firstName || !guestData.lastName || !guestData.birthPlace || !guestData.residence}
                    className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black uppercase italic tracking-tighter shadow-2xl mt-8 hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    Continuar a Identificación <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {regStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-12">
                  <h3 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 leading-none">Paso 2: Identidad</h3>
                  <p className="text-gray-400 font-medium italic text-lg">Capture el frontal y reverso de su DNI o Pasaporte.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div 
                    onClick={() => inputDniFront.current?.click()}
                    className={`group border-2 border-dashed rounded-[40px] p-8 text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:shadow-xl ${guestData.dniFront ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-300'}`}
                  >
                    {guestData.dniFront ? (
                      <img src={guestData.dniFront} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-12 h-12 text-gray-300 group-hover:text-blue-600 mb-4 transition-all group-hover:scale-110" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Frontal Documento</span>
                      </div>
                    )}
                  </div>
                  <div 
                    onClick={() => inputDniBack.current?.click()}
                    className={`group border-2 border-dashed rounded-[40px] p-8 text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:shadow-xl ${guestData.dniBack ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-300'}`}
                  >
                    {guestData.dniBack ? (
                      <img src={guestData.dniBack} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-12 h-12 text-gray-300 group-hover:text-blue-600 mb-4 transition-all group-hover:scale-110" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Reverso Documento</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setRegStep(1)} className="flex-1 py-5 font-black uppercase text-xs text-gray-400 italic hover:text-gray-600 transition-colors">Atrás</button>
                  <button 
                    onClick={() => setRegStep(3)} 
                    disabled={!guestData.dniFront || !guestData.dniBack}
                    className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-2xl hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Siguiente: Validación Facial
                  </button>
                </div>
              </div>
            )}

            {regStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center flex flex-col items-center">
                <div className="mb-12 w-full">
                  <h3 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 leading-none">Paso 3: Biometría</h3>
                  <p className="text-gray-400 font-medium italic text-lg">Un selfie nítido para confirmar su identidad en tiempo real.</p>
                </div>

                <div 
                  onClick={() => inputSelfie.current?.click()}
                  className={`w-72 h-72 rounded-full mb-14 border-4 cursor-pointer transition-all flex items-center justify-center overflow-hidden relative shadow-3xl group ${guestData.selfie ? 'border-green-500' : 'border-blue-600 border-dashed hover:border-blue-400 bg-blue-50'}`}
                >
                   {guestData.selfie ? (
                     <img src={guestData.selfie} className="w-full h-full object-cover" />
                   ) : (
                     <div className="flex flex-col items-center">
                       <User className="w-20 h-20 text-blue-600 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-4">Capturar Selfie</span>
                     </div>
                   )}
                </div>

                <div className="w-full space-y-4">
                  <button 
                    onClick={finalizeRegistration}
                    disabled={!guestData.selfie || isProcessing}
                    className="w-full bg-gray-950 text-white py-7 rounded-3xl font-black text-2xl uppercase italic tracking-tighter shadow-3xl disabled:opacity-50 flex items-center justify-center gap-4 hover:bg-blue-600 transition-all active:scale-95"
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-8 h-8 animate-spin" /> Procesando con AI...</>
                    ) : (
                      <><ShieldCheck className="w-10 h-10 text-blue-400" /> Confirmar Mi Registro</>
                    )}
                  </button>
                  <button onClick={() => setRegStep(2)} className="text-gray-400 font-black uppercase text-[10px] tracking-widest italic hover:text-gray-600">Revisar Documentos</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // PANEL DE HUÉSPED VERIFICADO
  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10">
          
          <aside className="w-full md:w-72 space-y-3">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 mb-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="w-24 h-24 bg-blue-600 text-white rounded-[35px] flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
                <User className="w-12 h-12" />
              </div>
              <h3 className="font-black italic uppercase tracking-tighter text-gray-900 text-xl leading-none">
                {guestData.firstName || user?.firstName || 'Viajero'}
              </h3>
              <div className="flex items-center justify-center gap-1 mt-4 bg-green-50 px-4 py-1.5 rounded-full text-green-600 border border-green-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-widest">Viajero Verificado</span>
              </div>
            </div>

            {[
              { id: 'viajes', label: 'Mis Nidos', icon: Briefcase },
              { id: 'favoritos', label: 'Favoritos', icon: Heart },
              { id: 'perfil', label: 'Perfil Turístico', icon: User }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-[25px] font-black uppercase italic tracking-tighter text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-2xl scale-105' 
                    : 'bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </aside>

          <main className="flex-1 space-y-10 animate-in fade-in duration-500">
             {activeTab === 'viajes' && (
                <div className="space-y-8">
                  <div className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden relative">
                     <Plane className="absolute -right-10 -top-10 w-48 h-48 text-blue-50 opacity-10 rotate-12" />
                     <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">Próximas Estancias</h2>
                        <p className="text-gray-400 font-medium italic">Gestione sus reservas y registros turísticos.</p>
                     </div>
                     <button className="bg-gray-950 text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter text-xs shadow-xl hover:bg-blue-600 transition-all">Buscar Nuevo Nido</button>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {myTrips.map(trip => (
                      <div key={trip.id} className="bg-white p-8 rounded-[50px] border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center gap-10 hover:shadow-2xl transition-all group">
                        <div className="w-full lg:w-64 h-64 lg:h-48 rounded-[40px] overflow-hidden shrink-0">
                           <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-blue-100 text-blue-600">
                                {trip.status}
                             </span>
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-orange-100 text-orange-600">
                                12% COMISIÓN OK
                             </span>
                          </div>
                          <h3 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 leading-none">{trip.title}</h3>
                          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-6">
                             <p className="text-xs text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest italic">
                               <MapPin className="w-4 h-4 text-blue-500" /> {trip.location}
                             </p>
                             <p className="text-xs text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest italic">
                               <Calendar className="w-4 h-4 text-blue-600" /> {trip.dates}
                             </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full lg:w-auto">
                           <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase italic tracking-tighter text-xs shadow-lg hover:bg-gray-900 transition-all">Ver Voucher</button>
                           <button className="bg-gray-50 text-gray-400 px-8 py-4 rounded-2xl font-black uppercase italic tracking-tighter text-[10px] hover:text-red-500 transition-all">Cancelar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             )}

             {activeTab === 'perfil' && (
                <div className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-12 rounded-[55px] border border-gray-100 shadow-sm relative overflow-hidden">
                         <Receipt className="absolute -right-6 -top-6 w-32 h-32 text-blue-50 opacity-30" />
                         <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-10 flex items-center gap-2 italic">
                            <FileText className="w-4 h-4" /> Datos Maestros de Viajero
                         </h4>
                         <div className="space-y-6">
                            {[
                              { label: 'Nombre Completo', val: `${guestData.firstName} ${guestData.lastName}` },
                              { label: 'Lugar de Nacimiento', val: guestData.birthPlace },
                              { label: 'Residencia Actual', val: guestData.residence },
                              { label: 'Tipo de Cuenta', val: 'NiDDo Traveller Gold' }
                            ].map(item => (
                              <div key={item.label} className="flex flex-col border-b border-gray-50 pb-4 last:border-0">
                                 <span className="text-[9px] font-black text-gray-300 uppercase italic tracking-widest mb-1">{item.label}</span>
                                 <span className="font-black text-gray-900 uppercase italic tracking-tighter text-lg">{item.val || 'No registrado'}</span>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-8">
                         <div className="bg-gray-900 p-12 rounded-[55px] shadow-3xl text-white relative overflow-hidden group">
                            <ShieldCheck className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12 text-blue-400 group-hover:scale-110 transition-transform duration-700" />
                            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-10 italic">Estado de Seguridad Turística</h4>
                            <div className="grid grid-cols-2 gap-6">
                               {[
                                 { label: 'DNI Frontal', status: 'Verificado', icon: CheckCircle2 },
                                 { label: 'DNI Trasero', status: 'Verificado', icon: CheckCircle2 },
                                 { label: 'Biometría', status: 'Validada', icon: Sparkles },
                                 { label: 'Tasa 12%', status: 'Nativa', icon: Receipt }
                               ].map(item => (
                                 <div key={item.label} className="bg-white/5 border border-white/10 p-5 rounded-[30px] flex flex-col items-center text-center gap-2 group-hover:bg-white/10 transition-all">
                                    <item.icon className="w-6 h-6 text-blue-400" />
                                    <div>
                                       <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block mb-1">{item.label}</span>
                                       <span className="text-xs font-black text-white italic">{item.status}</span>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                         
                         <div className="bg-blue-600 p-10 rounded-[45px] shadow-2xl text-white flex items-center justify-between overflow-hidden relative">
                            <Star className="absolute -left-4 -bottom-4 w-24 h-24 opacity-20 rotate-45" />
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Puntos NiDDoSty</p>
                               <p className="text-5xl font-black italic tracking-tighter leading-none">1.450</p>
                            </div>
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95">Canjear</button>
                         </div>
                      </div>
                   </div>
                </div>
             )}
          </main>
        </div>
      </div>
    </div>
  );
};
