import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, 
  Search, 
  Map as MapIcon, 
  ReceiptText, 
  User, 
  Bell, 
  ShoppingBasket,
  ChevronRight,
  Star,
  Truck,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const TopBar = () => {
  return (
    <header className="bg-[#f5f6f7]/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-extrabold tracking-tighter text-[#9b3f00] flex items-center gap-2">
            <Store className="fill-[#9b3f00] text-[#9b3f00]" size={24} />
            Aura Market
          </Link>
          <div className="hidden md:flex relative group w-64 lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#9b3f00] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar no bairro..."
              className="w-full bg-zinc-200/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#9b3f00]/50 border border-transparent focus:border-[#9b3f00]/20 transition-all text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors">
            <ShoppingBasket size={20} />
          </button>
          <Link to="/perfil" className="hidden md:block">
            <img 
              src="https://picsum.photos/seed/user/100/100" 
              alt="Perfil" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Store, label: 'Início' },
    { path: '/explorar', icon: MapIcon, label: 'Explorar' },
    { path: '/pedidos', icon: ReceiptText, label: 'Pedidos' },
    { path: '/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-zinc-200/50 pb-8 pt-2 px-6 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-[#9b3f00] scale-110" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            <item.icon size={22} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

// --- Pages ---

const StoreCard = ({ store, onSimulate }: { store: any; onSimulate: (id: number) => void }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 group cursor-pointer"
      onClick={() => onSimulate(store.id)}
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 relative">
          <img 
            src={`https://picsum.photos/seed/store-${store.id}/400/400`} 
            alt={store.nome}
            referrerPolicy="no-referrer" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-headline font-bold text-lg text-zinc-900 leading-tight">{store.nome}</h3>
              <div className="flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded-full">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[11px] font-bold">4.8</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
              <MapPin size={12} />
              {store.id === 1 ? '750m' : '1.2km'} • {store.id === 1 ? 'Padaria Gourmet' : 'Hortifruti Fresco'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-zinc-50">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Truck size={14} />
            <span className="font-bold text-[11px] uppercase tracking-wide">Frete Comunitário</span>
          </div>
          <span className="text-xs font-bold text-emerald-600">{Math.round(store.porcentagem)}%</span>
        </div>
        <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${store.porcentagem}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </motion.div>
        </div>
        <p className="text-[10px] text-zinc-500 mt-2 text-center italic">
          {store.porcentagem >= 100 
            ? '🚀 Frete grátis liberado para o bairro!' 
            : `Faltam R$ ${store.valor_restante.toFixed(2)} para liberar frete grátis co-op.`}
        </p>
      </div>
    </motion.div>
  );
};

const Home = ({ onOpenSimulation }: { onOpenSimulation: (id: number) => void }) => {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/lojas?cep=01010-000')
      .then(res => res.json())
      .then(data => {
        setStores(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="bg-gradient-to-br from-[#9b3f00] to-[#ff7a2c] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-3xl sm:text-4xl font-headline font-extrabold leading-tight mb-4 tracking-tight">
            Seu bairro se une, <br /> seu frete é grátis.
          </h1>
          <p className="text-white/80 text-sm sm:text-base mb-6 font-medium">
            O Aura Market conecta vizinhos para atingirem metas coletivas de logística em lojas locais.
          </p>
          <div className="flex gap-3">
             <button className="bg-white text-[#9b3f00] font-bold px-6 py-2.5 rounded-full text-sm hover:bg-zinc-100 transition-colors shadow-lg">
               Explorar Agora
             </button>
             <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-white/30 transition-colors">
               Como funciona
             </button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
          <Store size={220} />
        </div>
      </section>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-headline font-bold text-zinc-900 tracking-tight">Lojas em Destaque</h2>
            <p className="text-sm text-zinc-500">Vizinhos ativos agora em Jardim Europa</p>
          </div>
          <button className="text-[#9b3f00] font-bold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform">
            Ver tudo <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-zinc-100 rounded-2xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map(store => (
              <div key={store.id}>
                <StoreCard store={store} onSimulate={onOpenSimulation} />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <section className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold font-headline">Impacto Comunitário</h3>
            <p className="text-zinc-400 text-sm">
              Hoje, 14 vizinhos economizaram um total de <span className="text-emerald-400 font-bold underline">R$ 242,50</span> em frete apoiando o comércio local.
            </p>
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i+10}/50/50`} className="w-10 h-10 rounded-full border-2 border-zinc-900" />
              ))}
              <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold">+9</div>
            </div>
          </div>
          <div className="w-full md:w-auto">
             <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
               <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Destaque do Dia</p>
               <h4 className="text-lg font-bold mb-1">Padaria Central</h4>
               <p className="text-xs text-zinc-400 mb-4">Meta comunitária atingida em tempo recorde!</p>
               <div className="flex items-center gap-2">
                 <div className="flex-1 h-1 bg-zinc-700 rounded-full">
                   <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                 </div>
                 <span className="text-[10px] font-bold text-emerald-500">META 100%</span>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Explore = () => {
  return (
    <div className="h-[calc(100vh-200px)] relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 animate-in zoom-in-95 duration-700">
      <div className="absolute inset-0 bg-zinc-200">
         <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLV6O5K5_vcuSHr0S85Lnm5IUWEVY4KfnAgh9X3tFgCANHnecICvFkDNC27Nq68rb15D11c0qjOey0BilMQCwnq65OULPxO7mxpQ_K7a4Ifm1F-61CdBwhkZxwqo1EQjdRxItiB9S8LQKmCEWKE82M1B5gDuWo7BdApvVbgJwlRNARpvlEPten4LfKq188n0V9zyMpDmVd9eUpyWHLSmeeJGIFIyc0yT-AXdCWhWzZERNcRVX0kHbwwb0oVhPQT1dMb5IKmsM_Rxo" 
          alt="Map" 
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
          referrerPolicy="no-referrer"
         />
      </div>
      
      {/* Search Header Overlay */}
      <div className="absolute top-4 left-0 w-full px-4 z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Encontrar vizinhos e lojas..." 
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#9b3f00] text-sm"
            />
          </div>
          <button className="p-2 bg-zinc-900 text-white rounded-xl">
             <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Markers */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-[35%] left-[45%] flex flex-col items-center group cursor-pointer"
      >
        <div className="bg-[#9b3f00] text-white p-2.5 rounded-full shadow-xl mb-1 group-hover:scale-110 transition-transform">
          <Store size={22} fill="white" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#9b3f00] animate-ping"></div>
      </motion.div>

      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[55%] left-[60%] flex flex-col items-center group cursor-pointer"
      >
        <div className="bg-white text-[#9b3f00] p-2.5 rounded-full shadow-xl mb-1 group-hover:scale-110 transition-transform border border-[#9b3f00]/20">
          <ShoppingBag size={22} />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
      </motion.div>

      {/* Floater Bottom */}
      <div className="absolute bottom-6 left-0 w-full px-4 flex justify-center">
        <div className="bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl flex gap-4 items-center border border-white">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <img key={i} src={`https://picsum.photos/seed/${i+40}/50/50`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />)}
          </div>
          <p className="text-xs font-bold text-zinc-900">12 Vizinhos online no bairro</p>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold font-headline tracking-tight">Meus Pedidos</h1>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full bg-zinc-100 text-xs font-bold transition-all hover:bg-zinc-200">Ativos</button>
          <button className="px-4 py-1.5 rounded-full text-zinc-400 text-xs font-bold hover:text-zinc-600">Histórico</button>
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden relative">
            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0">
                <img src={`https://picsum.photos/seed/order-${i}/400/400`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold font-headline">{i === 1 ? 'Padaria Pão Cheiroso' : 'Horta das Acácias'}</h3>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold bg-orange-100 text-orange-700 px-3 py-1 rounded-full h-fit">Preparando</span>
                </div>
                <p className="text-sm text-zinc-500">Carrinho: R$ {i === 1 ? '45,00' : '112,40'}</p>
                
                <div className="pt-4 mt-4 border-t border-dashed border-zinc-100">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                        <Truck size={12} /> Frete Co-Op Progresso
                      </span>
                      <span className="text-[10px] font-bold">Atingido!</span>
                   </div>
                   <div className="h-1.5 w-full bg-emerald-100 rounded-full">
                     <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                   </div>
                   <p className="text-[10px] text-zinc-400 mt-2">🎉 frete grátis garantido para este pedido.</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/user-pro/200/200" 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
          />
          <button className="absolute bottom-1 right-1 p-2 bg-zinc-900 text-white rounded-full shadow-lg">
            <Settings size={16} />
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold font-headline">Alex Fernandes</h1>
          <p className="text-zinc-500 text-sm flex items-center justify-center gap-1">
             <MapPin size={14} className="text-[#9b3f00]" /> Jardim Europa, SP
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 text-center space-y-1">
           <span className="text-3xl font-extrabold font-headline text-zinc-900">14</span>
           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Loja Apoiadas</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 text-center space-y-1">
           <span className="text-3xl font-extrabold font-headline text-emerald-600">85<span className="text-sm">,00</span></span>
           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Economia Frete</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 text-white">
        <h3 className="text-lg font-bold font-headline mb-4">Badges da Comunidade</h3>
        <div className="flex flex-wrap gap-4">
          {['Pioneiro', 'Doador', 'Local Hero', 'Sustentável'].map(badge => (
            <div key={badge} className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-xs font-bold">
              {badge}
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 text-red-500 font-bold border-2 border-red-50 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
        <LogOut size={18} /> Sair da conta
      </button>
    </div>
  );
};

// --- SIMULATION MODAL ---

const SimulationModal = ({ lojaId, isOpen, onClose }: { lojaId: number | null; isOpen: boolean; onClose: () => void }) => {
  const [valor, setValor] = useState('30.00');
  const [cep, setCep] = useState('01010-000');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    if (!lojaId) return;
    setLoading(true);
    const response = await fetch('/api/calcular-frete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loja_id: lojaId,
        cep: cep,
        valor_carrinho: parseFloat(valor)
      })
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></motion.div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
      >
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <h3 className="text-xl font-bold font-headline">Simulação de Frete Coletivo</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
        </div>
        
        <div className="p-6 space-y-6">
          {!result ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase">CEP de Entrega</label>
                <input 
                  type="text" 
                  value={cep} 
                  onChange={e => setCep(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-zinc-100 border-none focus:ring-2 focus:ring-[#9b3f00] font-bold"
                />
                <p className="text-[10px] text-zinc-400">Tente 01010-000 para dados fixos ou qualquer outro para aleatório.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase">Valor do Seu Carrinho (R$)</label>
                <input 
                  type="number" 
                  value={valor} 
                  onChange={e => setValor(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-zinc-100 border-none focus:ring-2 focus:ring-[#9b3f00] font-bold"
                />
              </div>
              <button 
                onClick={calculate}
                disabled={loading}
                className="w-full py-4 bg-[#9b3f00] text-white rounded-2xl font-bold shadow-lg shadow-[#9b3f00]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Calculando...' : 'Verificar Frete Coletivo'}
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95">
              <div className={cn(
                "p-4 rounded-2xl border flex items-start gap-4",
                result.status === 'FRETE_GRATIS_LIBERADO' ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-orange-50 border-orange-100 text-orange-800"
              )}>
                <div className="p-2 rounded-xl bg-white shadow-sm">
                  {result.status === 'FRETE_GRATIS_LIBERADO' ? <Truck className="text-emerald-600" /> : <ShoppingBag className="text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{result.mensagem_interface}</p>
                  <p className="text-[11px] opacity-70 mt-1">{result.status === 'FRETE_GRATIS_LIBERADO' ? 'Simples assim! Seu CEP já atingiu a meta.' : 'Peça agora para ajudar o bairro a chegar lá!'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-zinc-50 p-4 rounded-2xl text-center">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Acumulado Anterior</p>
                    <p className="text-lg font-bold text-zinc-800">R$ {result.valor_acumulado_anterior.toFixed(2)}</p>
                 </div>
                 <div className="bg-zinc-50 p-4 rounded-2xl text-center">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Seu Carrinho</p>
                    <p className="text-lg font-bold text-zinc-800">R$ {result.valor_carrinho.toFixed(2)}</p>
                 </div>
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-zinc-600">Progresso do Bairro ({result.porcentagem_meta}%)</span>
                    <span className="text-xs font-bold text-zinc-400">Meta: R$ {result.meta_frete_gratis.toFixed(2)}</span>
                 </div>
                 <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.porcentagem_meta}%` }}
                      className={cn(
                        "h-full rounded-full transition-colors",
                        result.status === 'FRETE_GRATIS_LIBERADO' ? "bg-emerald-500" : "bg-orange-500"
                      )}
                    />
                 </div>
                 <p className="text-[10px] text-zinc-500 italic text-center">Valor Total Comunitário: R$ {result.valor_total_comunitario.toFixed(2)}</p>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="w-full py-4 border-2 border-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-50 transition-colors"
              >
                Simular Outro Valor
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- App Layout ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#f5f6f7] font-body text-zinc-900 pb-20 md:pb-0">
      <TopBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
};

export default function App() {
  const [simulationLojaId, setSimulationLojaId] = useState<number | null>(null);

  const openSim = (id: number) => {
    setSimulationLojaId(id);
  };

  const closeSim = () => setSimulationLojaId(null);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home onOpenSimulation={openSim} />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </Layout>
      <SimulationModal 
        lojaId={simulationLojaId} 
        isOpen={simulationLojaId !== null} 
        onClose={closeSim} 
      />
    </Router>
  );
}
