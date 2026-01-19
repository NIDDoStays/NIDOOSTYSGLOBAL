
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Mic, Send, Globe, Radio, Loader2, User, ChevronDown, Home, Star, MapPin, Calendar, CreditCard, Sparkles } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";
import { UserProfile, Language } from '../types';
import { translations } from '../translations';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const NIDDO_DATABASE = [
  { id: 'p1', name: 'Residencia San Juan Premium', location: 'Barcelona', price: 450, type: 'Habitación', rating: 4.9, img: 'https://images.unsplash.com/photo-1555854816-80dc12219b82?auto=format&fit=crop&q=80&w=400' },
  { id: 'p2', name: 'Luxury Palace Barcelona', location: 'Barcelona', price: 380, type: 'Hotel', rating: 5.0, img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400' },
  { id: 'p3', name: 'Skyline Loft Madrid', location: 'Madrid', price: 120, type: 'Apartamento', rating: 4.8, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
  { id: 'p4', name: 'Villa Azure Palms', location: 'Alicante', price: 185, type: 'Villa', rating: 4.9, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
  { id: 'c1', name: 'Tesla Model 3 NiDDo', location: 'Global', price: 120, type: 'Coche', rating: 4.9, img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400' }
];

interface Message {
  id: string;
  sender: 'me' | 'other';
  type: 'text' | 'property_card' | 'live';
  content: string;
  data?: any;
  timestamp: Date;
}

interface ChatWidgetProps {
  user: UserProfile | null;
  globalLanguage: Language;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ user, globalLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatSessionRef = useRef<any>(null);
  const liveSessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const t = (key: string) => translations[globalLanguage.code]?.[key] || translations['ES'][key] || key;

  const searchTool: FunctionDeclaration = {
    name: "buscar_propiedades",
    parameters: {
      type: Type.OBJECT,
      description: "Busca propiedades (Nidos), hoteles o habitaciones en la base de datos de NiDDoSty.",
      properties: {
        ubicacion: { type: Type.STRING, description: "La ciudad o lugar (ej: Barcelona, Madrid)" },
        tipo: { type: Type.STRING, description: "Tipo de nido (ej: Villa, Apartamento, Habitación)" }
      },
      required: ["ubicacion"]
    }
  };

  const [messages, setMessages] = useState<Message[]>([]);

  const systemInstruction = `
    Eres "NiDDo", el asistente de IA oficial de NiDDoSty. 
    
    TU IDENTIDAD:
    - "Nido" = Propiedad/Alquiler.
    - Usuario actual: ${user ? `${user.firstName} ${user.lastName}` : 'Anónimo'}.
    - Estado de Registro: ${user?.isRegistered ? 'REGISTRADO' : 'NO REGISTRADO'}.
    
    REGLAS CRÍTICAS DE IDIOMA:
    - Debes comunicarte ÚNICAMENTE en el idioma: ${globalLanguage.name} (Código: ${globalLanguage.code}).
    - Si el usuario te habla en otro idioma, responde educadamente en ${globalLanguage.name}.
    
    REGLAS DE NEGOCIO:
    1. Si te piden propiedades/nidos, USAR 'buscar_propiedades'.
    2. Si el usuario NO está registrado y quiere reservar, dile que debe pulsar "Entrar" para verificar su DNI y Selfie.
    3. Tu tono es lujoso y servicial.
  `;

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([{ id: '1', sender: 'other', type: 'text', content: t('chat_welcome'), timestamp: new Date() }]);
      }
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          tools: [{ functionDeclarations: [searchTool] }],
          systemInstruction: systemInstruction,
        }
      });
    }
    return () => stopLiveSession();
  }, [isOpen, globalLanguage, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const stopLiveSession = () => {
    setIsLiveMode(false);
    setIsLiveConnected(false);
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    if (liveSessionRef.current) { liveSessionRef.current.close(); liveSessionRef.current = null; }
    if (inputAudioContextRef.current) { inputAudioContextRef.current.close(); inputAudioContextRef.current = null; }
    if (outputAudioContextRef.current) { outputAudioContextRef.current.close(); outputAudioContextRef.current = null; }
    if (micStreamRef.current) { micStreamRef.current.getTracks().forEach(track => track.stop()); micStreamRef.current = null; }
    nextStartTimeRef.current = 0;
  };

  const toggleLiveMode = async () => {
    if (isLiveMode) { stopLiveSession(); return; }
    setIsLiveMode(true);
    setIsLiveConnected(false);
    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsLiveConnected(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (!liveSessionRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              liveSessionRef.current.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.toolCall) {
              for (const fc of msg.toolCall.functionCalls) {
                if (fc.name === "buscar_propiedades") {
                  const results = NIDDO_DATABASE.filter(p => p.location.toLowerCase().includes(fc.args.ubicacion.toLowerCase()));
                  results.forEach(prop => {
                    setMessages(prev => [...prev, { id: Math.random().toString(), sender: 'other', type: 'property_card', content: '', data: prop, timestamp: new Date() }]);
                  });
                  liveSessionRef.current.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { result: results } }
                  });
                }
              }
            }
            if (!outputCtx || outputCtx.state === 'closed') return;
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const binary = atob(audioData);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              const int16 = new Int16Array(bytes.buffer);
              const buffer = outputCtx.createBuffer(1, int16.length, 24000);
              const channel = buffer.getChannelData(0);
              for (let i = 0; i < int16.length; i++) channel[i] = int16[i] / 32768.0;
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
          },
          onclose: () => setIsLiveConnected(false),
          onerror: () => stopLiveSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ functionDeclarations: [searchTool] }],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: systemInstruction + ` Habla solo en ${globalLanguage.name}.`,
        }
      });
      sessionPromise.then(session => { liveSessionRef.current = session; });
    } catch (e) { console.error(e); stopLiveSession(); }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !chatSessionRef.current) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'me', type: 'text', content: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const textToSend = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      let response = await chatSessionRef.current.sendMessage({ message: textToSend });
      if (response.functionCalls) {
        for (const fc of response.functionCalls) {
          if (fc.name === "buscar_propiedades") {
            const results = NIDDO_DATABASE.filter(p => p.location.toLowerCase().includes(fc.args.ubicacion.toLowerCase()));
            const finalResult = await chatSessionRef.current.sendMessage({ message: `Base NIDDO: ${JSON.stringify(results)}. Informa al cliente.` });
            if (results.length > 0) {
              results.forEach(prop => {
                setMessages(prev => [...prev, { id: Math.random().toString(), sender: 'other', type: 'property_card', content: '', data: prop, timestamp: new Date() }]);
              });
            }
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'other', type: 'text', content: finalResult.text || "...", timestamp: new Date() }]);
          }
        }
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'other', type: 'text', content: response.text || "...", timestamp: new Date() }]);
      }
    } catch (err) { console.error(err); } finally { setIsTyping(false); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[600px] rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-6">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md"><User className="w-6 h-6" /></div>
              <div><h3 className="font-bold text-sm">NiDDo Assistant</h3><p className="text-[8px] uppercase tracking-widest opacity-70">{globalLanguage.name} • {globalLanguage.flag}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={toggleLiveMode} className={`p-2 rounded-full transition-all ${isLiveMode ? 'bg-orange-500 animate-pulse text-white' : 'bg-white/10 hover:bg-white/20'}`} title={t('chat_voice_mode')}><Radio className="w-5 h-5" /></button>
              <button onClick={() => { stopLiveSession(); setIsOpen(false); }} className="p-2 hover:bg-white/10 rounded-full"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 no-scrollbar relative">
             {isLiveMode && isLiveConnected && (
               <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-lg flex items-center justify-between animate-in slide-in-from-top-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse"><Mic className="w-4 h-4 text-white" /></div>
                    <div><p className="text-[10px] font-black uppercase text-blue-600">{t('chat_voice_listening')}</p></div>
                  </div>
                  <button onClick={toggleLiveMode} className="text-red-500 text-[8px] font-black uppercase tracking-widest hover:bg-red-50 p-2 rounded-lg">OFF</button>
               </div>
             )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} animate-in fade-in duration-300`}>
                {msg.type === 'text' && (
                  <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm border ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}><p className="text-sm">{msg.content}</p></div>
                )}
                {msg.type === 'property_card' && msg.data && (
                  <div className="w-full max-w-[90%] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl animate-in zoom-in-95 my-2">
                    <img src={msg.data.img} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h4 className="font-black italic uppercase text-gray-900 text-xs">{msg.data.name}</h4>
                      <div className="flex justify-between items-center pt-2 border-t mt-2">
                        <span className="text-lg font-black text-blue-600">{msg.data.price}€</span>
                        <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase italic">Ver Nido</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && <div className="text-[10px] font-bold text-blue-600 italic px-2">{t('chat_typing')}</div>}
          </div>

          {!isLiveMode && (
            <div className="p-4 bg-white border-t flex items-center gap-2">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="..." className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none" />
              <button onClick={handleSendMessage} className="p-3 bg-blue-600 text-white rounded-xl shadow-md active:scale-90 transition-all"><Send className="w-5 h-5" /></button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-5 rounded-full shadow-2xl transition-all hover:scale-110 group relative"><MessageCircle className="w-8 h-8" /></button>
      )}
    </div>
  );
};
