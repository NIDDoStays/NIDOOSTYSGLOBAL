
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, PlusCircle, CalendarDays, Zap, 
  Home as HomeIcon, MapPin, Euro, Image as ImageIcon,
  CheckCircle, Clock, Users, ShieldCheck, Camera, Upload, 
  Fingerprint, FileText, User, ArrowRight, Star, Award, ShieldAlert, X, ChevronRight, ChevronLeft, Loader2
} from 'lucide-react';
import { PropertyType } from '../types';

interface HostDashboardProps {
  user: any;
}

export const HostDashboard: React.FC<HostDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('resumen');
  const [isVerifiedHost, setIsVerifiedHost] = useState(user?.isVerified || false);
  const [regStep, setRegStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs para activar los inputs ocultos
  const fileInputDniFront = useRef<HTMLInputElement>(null);
  const fileInputDniBack = useRef<HTMLInputElement>(null);
  const fileInputSelfie = useRef<HTMLInputElement>(null);

  const [hostRegData, setHostRegData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    birthPlace: user?.birthPlace || '',
    residence: user?.residence || '',
    dniFront: null as string | null,
    dniBack: null as string | null,
    selfie: null as string | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'dniFront' | 'dniBack' | 'selfie') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHostRegData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalVerify = () => {
    setIsProcessing(true);
    // Simulación de verificación por IA
    setTimeout(() => {
      setIsProcessing(false);
      setIsVerifiedHost(true);
      alert('¡Felicidades! Su perfil de Anfitrión NiDDoSty ha sido verificado con éxito.');
    }, 2500);
  };

  if (!isVerifiedHost) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {/* Inputs Ocultos Reales */}
        <input type="file" ref={fileInputDniFront} accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFileChange(e, 'dniFront')} />
        <input type="file" ref={fileInputDniBack} accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFileChange(e, 'dniBack')} />
        <input type="file" ref={fileInputSelfie} accept="image/*" capture="user" className="hidden" onChange={(e) => handleFileChange(e, 'selfie')} />

        <div className="max-w-5xl w-full bg-white rounded-[60px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-700 flex flex-col md:flex-row min-h-[650px]">
          
          <div className="md:w-5/12 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <ShieldCheck className="absolute -right-20 -bottom-20 w-96 h-96 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-[25px] flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-6">Registro de Anfitrión</h2>
              <p className="text-blue-100 font-medium italic leading-relaxed text-lg">
                Para publicar en NiDDoSty, necesitamos verificar que es usted quien dice ser. Seguridad primero.
              </p>
            </div>
            
            <div className="space-y-6 relative z-10 mt-12">
               {[
                 { step: 1, label: 'Datos Personales' },
                 { step: 2, label: 'DNI / Identidad' },
                 { step: 3, label: 'Validación Biometría' }
               ].map(s => (
                 <div key={s.step} className={`flex items-center gap-4 transition-all duration-500 ${regStep === s.step ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${regStep === s.step ? 'bg-white text-blue-600 shadow-xl' : 'bg-transparent border border-white'}`}>
                      {s.step}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{s.label}</span>
                 </div>
               ))}
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 italic">© NiDDoSty Legal Compliance 2024</p>
            </div>
          </div>

          <div className="flex-1 p-12 md:p-20 overflow-y-auto no-scrollbar">
            {regStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-10">
                  <h3 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter mb-2">Paso 1: Sus Datos</h3>
                  <p className="text-gray-400 font-medium italic">Complete la información requerida por el registro oficial.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic">Nombre</label>
                      <input 
                        type="text" 
                        value={hostRegData.firstName}
                        onChange={e => setHostRegData({...hostRegData, firstName: e.target.value})}
                        placeholder="Ej: Juan" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-600 shadow-inner outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic">Apellidos</label>
                      <input 
                        type="text" 
                        value={hostRegData.lastName}
                        onChange={e => setHostRegData({...hostRegData, lastName: e.target.value})}
                        placeholder="Ej: Pérez García" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-600 shadow-inner outline-none" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic">Lugar de Nacimiento</label>
                      <input 
                        type="text" 
                        value={hostRegData.birthPlace}
                        onChange={e => setHostRegData({...hostRegData, birthPlace: e.target.value})}
                        placeholder="Ciudad, País" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-600 shadow-inner outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic">Residencia Actual</label>
                      <input 
                        type="text" 
                        value={hostRegData.residence}
                        onChange={e => setHostRegData({...hostRegData, residence: e.target.value})}
                        placeholder="Dirección completa" 
                        className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-600 shadow-inner outline-none" 
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setRegStep(2)} 
                    disabled={!hostRegData.firstName || !hostRegData.lastName}
                    className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black uppercase italic tracking-tighter shadow-2xl mt-8 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Continuar a Documentación
                  </button>
                </div>
              </div>
            )}

            {regStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-10">
                  <h3 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter mb-2">Paso 2: Documentación</h3>
                  <p className="text-gray-400 font-medium italic">Capture fotos nítidas de su documento de identidad.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <div 
                    onClick={() => fileInputDniFront.current?.click()}
                    className={`group border-2 border-dashed rounded-[40px] p-8 text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:shadow-xl ${hostRegData.dniFront ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-300'}`}
                  >
                    {hostRegData.dniFront ? (
                      <img src={hostRegData.dniFront} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-10 h-10 text-gray-300 group-hover:text-blue-600 mb-3 transition-colors" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Frontal DNI</span>
                      </div>
                    )}
                  </div>
                  <div 
                    onClick={() => fileInputDniBack.current?.click()}
                    className={`group border-2 border-dashed rounded-[40px] p-8 text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:shadow-xl ${hostRegData.dniBack ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-300'}`}
                  >
                    {hostRegData.dniBack ? (
                      <img src={hostRegData.dniBack} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-10 h-10 text-gray-300 group-hover:text-blue-600 mb-3 transition-colors" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Trasera DNI</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setRegStep(1)} className="flex-1 py-5 font-black uppercase text-xs text-gray-400 italic hover:text-gray-600 transition-colors">Atrás</button>
                  <button 
                    onClick={() => setRegStep(3)} 
                    disabled={!hostRegData.dniFront || !hostRegData.dniBack}
                    className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-2xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Siguiente: Validar Mi Rostro
                  </button>
                </div>
              </div>
            )}

            {regStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center flex flex-col items-center">
                <div className="mb-10 w-full">
                  <h3 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter mb-2">Validación Final</h3>
                  <p className="text-gray-400 font-medium italic">Un selfie rápido para el reconocimiento facial.</p>
                </div>

                <div 
                  onClick={() => fileInputSelfie.current?.click()}
                  className={`w-64 h-64 rounded-full mb-12 border-4 cursor-pointer transition-all flex items-center justify-center overflow-hidden relative shadow-2xl group ${hostRegData.selfie ? 'border-green-500' : 'border-blue-600 border-dashed hover:border-blue-400 bg-blue-50'}`}
                >
                   {hostRegData.selfie ? (
                     <img src={hostRegData.selfie} className="w-full h-full object-cover" />
                   ) : (
                     <div className="flex flex-col items-center">
                       <User className="w-16 h-16 text-blue-600 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-2">Tomar Selfie</span>
                     </div>
                   )}
                </div>

                <div className="w-full space-y-4">
                  <button 
                    onClick={handleFinalVerify}
                    disabled={!hostRegData.selfie || isProcessing}
                    className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-xl uppercase italic tracking-tighter shadow-3xl disabled:opacity-50 flex items-center justify-center gap-4 hover:bg-blue-600 transition-all active:scale-95"
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> Verificando con AI...</>
                    ) : (
                      <><ShieldCheck className="w-8 h-8 text-blue-400" /> Finalizar Registro Seguro</>
                    )}
                  </button>
                  <button onClick={() => setRegStep(2)} className="text-gray-400 font-black uppercase text-[10px] tracking-widest italic hover:text-gray-600">Volver a Documentación</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Real para anfitriones verificados
  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 space-y-3">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 mb-6 text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[30px] flex items-center justify-center mx-auto mb-4 shadow-xl">
                <User className="w-10 h-10" />
              </div>
              <h3 className="font-black italic uppercase tracking-tighter text-gray-900 text-lg">
                {hostRegData.firstName || user?.firstName || 'Anfitrión'}
              </h3>
              <div className="flex items-center justify-center gap-1 mt-2 bg-green-50 px-3 py-1 rounded-full text-green-600">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">Verificado OK</span>
              </div>
            </div>

            {[
              { id: 'resumen', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'registrar', label: 'Publicar Nido', icon: PlusCircle },
              { id: 'reservas', label: 'Gestión Reservas', icon: CalendarDays },
              { id: 'promocion', label: 'Beneficio 2028', icon: Zap }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-[25px] font-black uppercase italic tracking-tighter text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-2xl scale-105' 
                    : 'bg-white text-gray-400 hover:bg-blue-50 hover:text-blue-600 border border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </aside>
          
          <main className="flex-1">
            {activeTab === 'resumen' && (
              <div className="animate-in fade-in duration-500 space-y-8">
                <div className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm relative overflow-hidden">
                   <Zap className="absolute -right-10 -top-10 w-48 h-48 text-orange-100 rotate-12" />
                   <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 relative z-10">Bienvenido al Nido, {hostRegData.firstName || 'Anfitrión'}</h2>
                   <p className="text-gray-500 font-medium italic max-w-2xl relative z-10">
                     Su identidad ha sido verificada satisfactoriamente. Ahora puede gestionar sus propiedades, ver sus ingresos reales y disfrutar de la promoción 0% comisiones hasta 2028.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ingresos Mes</p>
                      <p className="text-3xl font-black text-blue-600 italic tracking-tighter">0,00 €</p>
                   </div>
                   <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nidos Activos</p>
                      <p className="text-3xl font-black text-gray-900 italic tracking-tighter">0</p>
                   </div>
                   <div className="bg-orange-600 p-8 rounded-[40px] shadow-xl text-white">
                      <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">Ahorro Comisiones</p>
                      <p className="text-3xl font-black italic tracking-tighter">PROMO 2028</p>
                   </div>
                </div>
              </div>
            )}
            
            {activeTab === 'registrar' && (
              <div className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm animate-in fade-in duration-500 text-center">
                 <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[30px] flex items-center justify-center mx-auto mb-6">
                    <PlusCircle className="w-10 h-10" />
                 </div>
                 <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Publicar un nuevo Nido</h2>
                 <p className="text-gray-500 italic max-w-lg mx-auto mb-10">Prepare su propiedad para recibir a los mejores huéspedes globales con la garantía de NiDDoSty.</p>
                 <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl hover:bg-blue-700 transition-all">Empezar ahora</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
