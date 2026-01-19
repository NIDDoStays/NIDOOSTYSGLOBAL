
import React, { useState } from 'react';
import { X, Star, MapPin, Users, Utensils, Clock, ShieldCheck, ChevronLeft, ChevronRight, Heart, Calendar, Check, CreditCard, Landmark, Smartphone, ArrowLeft, BookOpen, Info, Award, Receipt, ShieldAlert } from 'lucide-react';

interface ItemDetailModalProps {
  item: any;
  onClose: () => void;
  type: 'property' | 'restaurant';
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, type }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [bookingStep, setBookingStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [nights, setNights] = useState(3);

  const images = item.images || [item.image, `https://picsum.photos/seed/${item.id}1/800/600`, `https://picsum.photos/seed/${item.id}2/800/600` ];

  const subtotal = item.price * (type === 'property' ? nights : 1);
  const guestCommission = subtotal * 0.12;
  const vat = (subtotal + guestCommission) * 0.21;
  const total = subtotal + guestCommission + vat;

  const handleConfirmBooking = () => {
    setBookingStep('payment');
  };

  const handleFinalPayment = (method: string) => {
    setPaymentMethod(method);
    setBookingStep('processing');
    
    // Simulación de llamada a la API de Monei / Pasarela Bancaria
    setTimeout(() => {
      setBookingStep('success');
      setTimeout(() => onClose(), 3500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-2">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={onClose} />
      
      <div className={`relative bg-white w-full ${type === 'restaurant' ? 'max-w-3xl' : 'max-w-5xl'} max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300`}>
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-[250] p-2 bg-black/10 hover:bg-red-500 text-white rounded-full transition-all border border-white/20 shadow-lg active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-full md:w-5/12 h-48 md:h-auto relative bg-gray-950 overflow-hidden ${bookingStep !== 'details' ? 'hidden md:block' : ''}`}>
          <img src={images[activeImg]} className="w-full h-full object-cover opacity-90 transition-opacity duration-500" alt={item.title || item.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex gap-2 overflow-x-auto no-scrollbar">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(idx)} 
                className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImg === idx ? 'border-orange-500 scale-105 shadow-xl shadow-orange-500/20' : 'border-white/20 opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto no-scrollbar relative p-8 md:p-12">
          
          {bookingStep === 'details' && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                 <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${type === 'restaurant' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {type === 'restaurant' ? 'Gastronomía NiDDo' : `Nido ${item.type}`}
                    </span>
                    <span className="flex items-center gap-1 text-orange-500 text-xs font-black"><Star className="w-4 h-4 fill-current" /> {item.rating || '4.9'}</span>
                 </div>
                 <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-2">{item.title || item.name}</h2>
                 <p className="text-gray-400 font-bold flex items-center gap-1 italic text-sm"><MapPin className="w-4 h-4 text-blue-500" /> {item.location}</p>
              </div>

              {type === 'property' ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-[30px] border border-gray-100">
                    <div>
                      <label className="text-[8px] font-black uppercase text-gray-400 block mb-2 tracking-widest">Huéspedes</label>
                      <select className="w-full bg-white border-none rounded-xl p-4 font-black text-sm shadow-sm outline-none">
                        <option>2 Personas</option>
                        <option>4 Personas</option>
                        <option>6 Personas</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase text-gray-400 block mb-2 tracking-widest">Noches</label>
                      <input 
                        type="number" 
                        value={nights} 
                        onChange={(e) => setNights(parseInt(e.target.value) || 1)}
                        className="w-full bg-white border-none rounded-xl p-4 font-black text-sm shadow-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-[40px] p-8 text-white shadow-2xl space-y-4">
                     <div className="flex justify-between items-center text-sm font-bold opacity-60">
                        <span>Estancia ({nights} noches)</span>
                        <span>{subtotal}€</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-black text-blue-400">
                        <span className="flex items-center gap-2 italic uppercase tracking-tighter"><Receipt className="w-4 h-4" /> Gestión NiDDoSty (12%)</span>
                        <span>{guestCommission.toFixed(2)}€</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold opacity-60">
                        <span>IVA (21%)</span>
                        <span>{vat.toFixed(2)}€</span>
                     </div>
                     <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                        <div className="flex flex-col">
                           <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-500 mb-1 italic">Importe Total</span>
                           <span className="text-5xl font-black italic tracking-tighter leading-none">{total.toFixed(2)}€</span>
                        </div>
                        <button 
                          onClick={handleConfirmBooking}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase italic tracking-tighter text-sm transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                          Ir al Pago
                        </button>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-[30px] p-6 border border-gray-100 flex gap-4">
                    <div className="flex-1">
                      <label className="text-[8px] font-black uppercase text-gray-400 block mb-2">Comensales</label>
                      <select className="w-full bg-white border-none rounded-xl p-4 font-black text-xs shadow-sm">
                        <option>2 pax</option><option>4 pax</option><option>6 pax</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-[8px] font-black uppercase text-gray-400 block mb-2">Hora</label>
                      <select className="w-full bg-white border-none rounded-xl p-4 font-black text-xs shadow-sm">
                        <option>20:30</option><option>21:00</option><option>21:30</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFinalPayment('Mesa')}
                    className="w-full bg-orange-600 text-white py-6 rounded-[25px] font-black uppercase italic tracking-tighter text-xl shadow-xl shadow-orange-100 active:scale-95"
                  >
                    Confirmar Mesa Gratis
                  </button>
                </div>
              )}
            </div>
          )}

          {bookingStep === 'payment' && (
            <div className="animate-in slide-in-from-right-10 duration-500 h-full flex flex-col">
               <button onClick={() => setBookingStep('details')} className="flex items-center gap-2 text-blue-600 font-black uppercase italic text-xs tracking-widest mb-6 hover:-translate-x-2 transition-transform w-fit">
                <ChevronLeft className="w-5 h-5" /> Volver a detalles
              </button>
              
              <div className="mb-6">
                <h2 className="text-5xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase leading-none">Pago Seguro</h2>
                <p className="text-gray-500 font-medium italic">Total a pagar: <span className="text-blue-600 font-black">{total.toFixed(2)}€</span></p>
              </div>
              
              <div className="space-y-3 mb-8">
                <button onClick={() => handleFinalPayment('Monei')} className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-blue-50 rounded-[25px] border border-gray-100 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><CreditCard className="w-5 h-5 text-blue-600" /></div>
                      <span className="font-black text-xs uppercase italic tracking-tighter text-gray-800">Monei Pay</span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => handleFinalPayment('Bizum')} className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-green-50 rounded-[25px] border border-gray-100 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><Smartphone className="w-5 h-5 text-green-600" /></div>
                      <span className="font-black text-xs uppercase italic tracking-tighter text-gray-800">Bizum</span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => handleFinalPayment('Tarjeta')} className="w-full flex items-center justify-between p-5 bg-gray-900 text-white rounded-[25px] shadow-xl hover:bg-gray-800 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><CreditCard className="w-5 h-5 text-white" /></div>
                      <span className="font-black text-xs uppercase italic tracking-tighter">Tarjeta Bancaria</span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Aviso Legal Obligatorio REDISEÑADO */}
              <div className="bg-red-50/50 p-6 rounded-[35px] border border-red-100 mt-auto">
                <div className="flex items-center gap-3 mb-3 text-red-600">
                   <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <ShieldAlert className="w-4 h-4" />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-widest italic">Aviso Legal Obligatorio</span>
                </div>
                <p className="text-[11px] text-red-900/70 font-medium italic leading-relaxed">
                  Al confirmar el pago, declaras conocer que el <strong>propietario/anfitrión</strong> es el responsable final del reporte de viajeros a las autoridades pertinentes según normativa vigente. NiDDoSty actúa como pasarela de pago y gestión pero no asume la responsabilidad del registro administrativo de huéspedes.
                </p>
              </div>
            </div>
          )}

          {bookingStep === 'processing' && (
            <div className="p-10 h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8" />
              <h2 className="text-3xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase">Conectando con Monei...</h2>
              <p className="text-gray-400 font-bold italic">Estamos procesando tu pago de forma segura.</p>
            </div>
          )}

          {bookingStep === 'success' && (
            <div className="p-10 h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
                <Check className="w-12 h-12 stroke-[4]" />
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase leading-none">¡Éxito!</h2>
              <p className="text-gray-500 font-medium text-xl leading-tight">
                Reserva confirmada en <strong>{item.title || item.name}</strong> mediante pasarela segura.
              </p>
              <div className="mt-12 bg-blue-50 px-8 py-4 rounded-full text-blue-600 font-black text-xs uppercase tracking-widest animate-pulse">
                Comprobante enviado a tu email
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
