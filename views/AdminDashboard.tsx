
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, TrendingUp, Users, Home, ShieldAlert, 
  Settings, Database, CreditCard, PieChart, MessageSquare, 
  Zap, ArrowUpRight, DollarSign, Calendar, Filter, Plus,
  Search, CheckCircle2, AlertCircle, RefreshCw, Briefcase, Award, X, Sparkles, ImageIcon, MapPin, Tag, ListChecks, Upload,
  Camera, ShoppingBag, Plane, Ship, Car, Utensils, Star, Heart, Video, Play, Loader2, Bot, Save, Wand2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ventas');
  const [isAddingSale, setIsAddingSale] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  
  // Estados para la configuración del Chat
  const [chatConfig, setChatConfig] = useState({
    systemInstruction: 'Eres el asistente oficial de NiDDoSty. Tu tono es profesional, lujoso y muy servicial. Ayudas con reservas de villas, coches, barcos y gestión de nidos turísticos. Responde siempre en el idioma del usuario.',
    initialGreeting: '¡Hola! Soy el asistente inteligente de NiDDoSty. ¿En qué puedo ayudarte a planificar tu estancia hoy?',
    aiModel: 'gemini-3-flash-preview',
    personality: 'Lujosa'
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('niddosty_chat_config');
    if (savedConfig) {
      setChatConfig(JSON.parse(savedConfig));
    }
  }, []);

  const saveChatConfig = () => {
    localStorage.setItem('niddosty_chat_config', JSON.stringify(chatConfig));
    alert('¡Configuración del Robot NiDDo guardada con éxito!');
  };

  const [formData, setFormData] = useState({
    name: '',
    type: 'Villa con Piscina',
    price: '',
    location: '',
    description: '',
    characteristics: '',
    commission: '12'
  });

  const handleAiMagic = async () => {
    if (!formData.name || !formData.type) return;
    setIsAiLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Genera descripción de lujo NiDDoSty para ${formData.type} "${formData.name}". Responde JSON: {"descripcion": "...", "caracteristicas": "..."}`,
        config: { responseMimeType: "application/json" }
      });
      const result = JSON.parse(response.text || '{}');
      setFormData(prev => ({ ...prev, description: result.descripcion || '', characteristics: result.caracteristicas || '' }));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateVeoCinema = async () => {
    if (!(window as any).aistudio?.hasSelectedApiKey()) {
      await (window as any).aistudio?.openSelectKey();
    }
    setIsVideoLoading(true);
    try {
      const veoAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await veoAi.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic drone tour of a luxury ${formData.type} named ${formData.name} in ${formData.location}. Sunset lighting, high-end architecture, 4k quality.`,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await veoAi.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) setGeneratedVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
    } catch (error) {
      console.error(error);
      alert("Error en Veo Cinema.");
    } finally {
      setIsVideoLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'config-ai':
        return (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
            <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Bot className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">Cerebro del Robot</h2>
                    <p className="text-gray-500 font-medium text-sm italic">Configura la personalidad de NiDDoSty.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Instrucciones del Sistema (System Instruction)</label>
                    <textarea 
                      value={chatConfig.systemInstruction}
                      onChange={e => setChatConfig({...chatConfig, systemInstruction: e.target.value})}
                      rows={4}
                      className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none shadow-inner"
                      placeholder="Escribe cómo debe comportarse la IA..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Saludo Inicial</label>
                    <input 
                      type="text"
                      value={chatConfig.initialGreeting}
                      onChange={e => setChatConfig({...chatConfig, initialGreeting: e.target.value})}
                      className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-600 outline-none shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Personalidad</label>
                      <select 
                        value={chatConfig.personality}
                        onChange={e => setChatConfig({...chatConfig, personality: e.target.value})}
                        className="w-full p-5 rounded-2xl bg-gray-50 border-none font-black text-xs focus:ring-2 focus:ring-blue-600 outline-none appearance-none italic"
                      >
                        <option>Lujosa</option>
                        <option>Informal / Juvenil</option>
                        <option>Técnica / Directa</option>
                        <option>Extremadamente Amable</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button 
                        onClick={saveChatConfig}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-3 shadow-xl hover:bg-blue-700 active:scale-95 transition-all"
                      >
                        <Save className="w-5 h-5" /> Guardar Configuración
                      </button>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-orange-50 p-8 rounded-[40px] border border-orange-100 flex items-start gap-4">
               <Wand2 className="w-8 h-8 text-orange-600 shrink-0" />
               <div>
                  <h4 className="text-sm font-black italic uppercase text-orange-900 mb-1">Nota del Desarrollador</h4>
                  <p className="text-xs text-orange-800/70 leading-relaxed font-medium">
                    Las instrucciones que guardes aquí afectarán tanto al chat de texto como al chat de voz (Live API). Recuerda ser específico para obtener los mejores resultados de Gemini.
                  </p>
               </div>
            </div>
          </div>
        );
      case 'ventas':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[50px] border-4 border-orange-500 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-orange-500 text-white rounded-[30px] flex items-center justify-center shadow-xl rotate-3">
                  <Plus className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">Venta Manual</h2>
                  <p className="text-gray-500 font-medium italic mt-1 text-lg">Activos Premium NiDDoSty.</p>
                </div>
              </div>
              <button onClick={() => setIsAddingSale(true)} className="bg-gray-950 text-white px-12 py-6 rounded-3xl font-black uppercase italic text-xl flex items-center gap-4 shadow-2xl hover:bg-orange-600 transition-all active:scale-95 group">
                <Sparkles className="w-6 h-6 text-orange-400 group-hover:rotate-12 transition-transform" /> CREAR CON IA
              </button>
            </div>
          </div>
        );
      case 'resumen':
      default:
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[{ label: 'Facturación Global', val: '0,00€', icon: DollarSign, color: 'blue' }].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm">
                     <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{stat.label}</p>
                     <p className="text-3xl font-black text-gray-900 italic tracking-tighter">{stat.val}</p>
                  </div>
                ))}
             </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-4 mb-10 bg-white p-2 rounded-[30px] border border-gray-100 shadow-sm w-fit">
           <button onClick={() => setActiveTab('resumen')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'resumen' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'}`}>Resumen</button>
           <button onClick={() => setActiveTab('ventas')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'ventas' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-orange-600'}`}>Ventas</button>
           <button onClick={() => setActiveTab('config-ai')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'config-ai' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-blue-600'}`}>Configuración IA</button>
        </div>

        {renderContent()}

        {isAddingSale && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-10">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsAddingSale(false)} />
             <div className="relative bg-white w-full max-w-5xl rounded-[60px] shadow-3xl overflow-hidden flex flex-col max-h-[95vh]">
                <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">Alta de Activo Global</h3>
                   <button onClick={() => setIsAddingSale(false)} className="p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-12 overflow-y-auto no-scrollbar space-y-12">
                   <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white flex items-center justify-between">
                        <div><h4 className="text-xl font-black italic uppercase mb-2">IA NiDDo Text</h4><p className="text-blue-100 text-sm italic">Generar descripción técnica.</p></div>
                        <button onClick={handleAiMagic} disabled={isAiLoading} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-black uppercase text-xs">{isAiLoading ? 'Generando...' : 'Generar'}</button>
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 p-8 rounded-[40px] text-white flex items-center justify-between group">
                        <div><h4 className="text-xl font-black italic uppercase mb-2 flex items-center gap-2"><Video className="w-5 h-5" /> NiDDo Cinema</h4><p className="text-orange-100 text-sm italic">Video promocional con Veo 3.1.</p></div>
                        <button onClick={handleGenerateVeoCinema} disabled={isVideoLoading} className="bg-white text-orange-600 px-8 py-4 rounded-xl font-black uppercase text-xs flex items-center gap-2">
                           {isVideoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                           {isVideoLoading ? 'Filtrando...' : 'Producir'}
                        </button>
                      </div>
                   </div>
                   {generatedVideoUrl && (
                     <div className="animate-in zoom-in-95 duration-700">
                        <h4 className="text-sm font-black italic uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2"><Video className="w-5 h-5" /> Video Generado por Veo 3.1</h4>
                        <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black border-4 border-orange-100">
                           <video src={generatedVideoUrl} controls autoPlay className="w-full h-full object-cover" />
                        </div>
                     </div>
                   )}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-1">Nombre</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-5 rounded-2xl bg-gray-50 border-none font-black text-sm" /></div>
                      <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-1">Ubicación</label><input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-5 rounded-2xl bg-gray-50 border-none font-bold text-sm" /></div>
                   </div>
                   <button onClick={() => { setIsAddingSale(false); alert('Venta registrada.'); }} className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-xl uppercase italic tracking-tighter hover:bg-orange-500 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4">
                     <Award className="w-8 h-8" /> Finalizar Venta Global
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
