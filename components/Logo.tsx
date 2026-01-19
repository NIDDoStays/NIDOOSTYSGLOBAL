
import React from 'react';
import { Plane, Circle } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 font-bold text-2xl tracking-tighter text-blue-600 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Representación de un nido con círculos concéntricos estilizados */}
        <div className="w-9 h-9 border-[3px] border-blue-600 rounded-full opacity-20 absolute" />
        <div className="w-7 h-7 border-[3px] border-blue-600 rounded-full opacity-40 absolute" />
        <div className="w-10 h-10 border-[3px] border-blue-600 rounded-full flex items-center justify-center bg-white shadow-sm">
           <Plane className="w-5 h-5 text-orange-500 transform -rotate-12 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-blue-600">NiDDo</span>
        <span className="text-orange-500 text-[10px] uppercase tracking-[0.3em] font-black">Sty</span>
      </div>
    </div>
  );
};
