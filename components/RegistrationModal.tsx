
import React, { useState } from 'react';
import { X, User, Sparkles, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';
// Importamos el cliente de supabase (asumiendo que ya configuraste las credenciales)
// import { supabase } from '../supabase'; 

interface RegistrationModalProps {
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const ADMIN_EMAIL = 'solucionesempresas2020@gmail.com';

  const handleAccess = async () => {
    if (!email) return;
    setLoading(true);
    
    // Simulación de delay de red
    setTimeout(() => {
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      
      // En una app real con Supabase aquí haríamos:
      // const { data, error } = await supabase.auth.signInWithOtp({ email });
      
      onSuccess({ 
        email, 
        role: isAdmin ? UserRole.ADMIN : UserRole.GUEST,
        isVerified: isAdmin 
      });
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900">Acceso NiDDoSty</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:text-red-500 transition-all"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-xl border border-blue-100">
              {loading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Mail className="w-10 h-10" />}
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">Tu Nido te espera</h3>
            <p className="text-gray-500 font-medium italic text-sm mt-2">Solo necesitas tu email para entrar.</p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
               <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleAccess()}
                placeholder="tu@email.com" 
                disabled={loading}
                className="w-full p-6 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white font-black text-lg shadow-inner outline-none transition-all disabled:opacity-50" 
               />
            </div>
            
            <button 
              onClick={handleAccess}
              disabled={!email || loading}
              className="w-full py-6 bg-blue-600 text-white rounded-[25px] font-black uppercase italic tracking-tighter shadow-2xl hover:bg-gray-900 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Conectando...' : (
                <>Entrar al Nido <ArrowRight className="w-6 h-6" /></>
              )}
            </button>
            
            <div className="bg-blue-50/50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
               <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
               <p className="text-[9px] text-blue-800 font-bold uppercase tracking-widest italic leading-tight">
                  Acceso seguro mediante OTP. Al entrar confirmas que eres mayor de edad y aceptas el registro turístico obligatorio de NiDDoSty.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
