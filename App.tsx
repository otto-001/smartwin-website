
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  Download, 
  ChevronRight, 
  Trophy, 
  Users, 
  Zap,
  LayoutDashboard,
  Cpu,
  MonitorCheck,
  TrendingUp,
  RefreshCw,
  Medal,
  ArrowRight,
  Flame,
  Star,
  AlertTriangle,
  Target,
  Crosshair,
  Timer,
  XCircle,
  CheckCircle2,
  AlertOctagon,
  Footprints,
  Key,
  X,
  Check,
  Crown,
  Lock,
  FileCode,
  ExternalLink,
  Mail,
  MessageCircle,
  BookOpen,
  Gem,
  Hourglass,
  Hammer
} from 'lucide-react';

// --- Configuration & Links ---

const JD_LINKS = {
  REGISTER: "https://u0djmd49x2.jiandaoyun.com/f/696b215452bb448395ff4c92?embed=true", // A: 注册
  UPGRADE: "https://u0djmd49x2.jiandaoyun.com/f/696b5f96779873ec51a12da2?embed=true",  // B: 续费/升级
  GET_KEY: "https://u0djmd49x2.jiandaoyun.com/f/696b4b6c174111cc5fce003e?embed=true",  // C: 提取EA卡密
  SUBMIT_PK: "https://u0djmd49x2.jiandaoyun.com/f/696c5b01e5c9c67552d2088a?embed=true", // D: 提交PK码
  PARTNER_QUERY: "https://u0djmd49x2.jiandaoyun.com/q/696b1b271eed8ef5ae78eac9?embed=true", // E: 合伙人查询
  MEMBER_DASH: "https://u0djmd49x2.jiandaoyun.com/dash/696c68dac3754d772e887869",     // F: 会员中心 (External Tab)
  LEADERBOARD: "https://u0djmd49x2.jiandaoyun.com/dash/696c714606523e328ef18de7?embed=true", // G: 排行榜
  EVENT_REG: "https://u0djmd49x2.jiandaoyun.com/f/696c5d0d8eb789fbbb5c9c9c?embed=true",  // H: 赛事报名
  EA_LIBRARY: "https://share.fnnas.net/s/2b5a1260cbdd40ff84", // EA 库
  MEMBER_RIGHTS: "https://k51qzi5uqu5di170n801fjow4ecwbsu1p7naz3ggomwenawomy3rzpsn7znurx.eth.sucks/B81874E7-90D0-45ED-8EC6-B77922954444/" // 会员权益外部链接
};

// --- Modal Component ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  children?: React.ReactNode;
}

const CyberModal: React.FC<ModalProps> = ({ isOpen, onClose, url, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#0B0E14] border border-[#00F0FF]/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0E14]">
          <div className="flex items-center gap-2 text-[#00F0FF]">
            <Cpu size={18} />
            <span className="font-black tracking-widest uppercase text-sm">{title || "SYSTEM ACCESS"}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content Container */}
        <div className="flex-grow bg-white overflow-auto">
          {url ? (
            <iframe 
              src={url} 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
              title="System Interface"
            ></iframe>
          ) : (
             <div className="h-full bg-[#0B0E14] text-slate-200 p-8 overflow-y-auto">
                {children}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Detailed Rules Content ---
const DetailedRulesContent = () => (
   <div className="space-y-8 max-w-5xl mx-auto p-2 md:p-4">
      <div className="text-center">
         <h2 className="text-2xl md:text-3xl font-black text-white mb-2">会员权益快速对照表</h2>
         <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Membership Tier Comparison</p>
      </div>
      
      <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#0F1218]">
         <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
               <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-white font-bold text-sm uppercase tracking-wider w-1/4">权益 / 等级</th>
                  <th className="p-4 text-slate-300 font-bold text-sm w-1/4">L1 基础用户</th>
                  <th className="p-4 text-[#00F0FF] font-bold text-sm w-1/4">L2 进阶会员</th>
                  <th className="p-4 text-[#FFD700] font-bold text-sm w-1/4">L3 专业会员</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
               {/* 费用 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">费用</td>
                  <td className="p-4 text-white font-bold">免费</td>
                  <td className="p-4 text-white font-bold">订阅制</td>
                  <td className="p-4 text-white font-bold">订阅 / 终身</td>
               </tr>
               {/* 工具功能 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">工具功能</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 体验 / 训练</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 考核风控</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 全部功能</td>
               </tr>
               {/* 推广直推奖励 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">推广直推奖励</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 5%</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 10%</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 20%</td>
               </tr>
               {/* 推广间推奖励 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">推广间推奖励</td>
                  <td className="p-4 text-slate-600"><span className="text-red-500 font-bold">❌</span></td>
                  <td className="p-4 text-slate-600"><span className="text-red-500 font-bold">❌</span></td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 5%（一层）</td>
               </tr>
               {/* 权益有效期绑定 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">权益有效期绑定</td>
                  <td className="p-4 text-slate-500"><span className="text-red-500 font-bold">❌</span> 无续费奖励</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 有续费奖励</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 有续费奖励</td>
               </tr>
               {/* 投票权 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">投票权</td>
                  <td className="p-4 text-slate-600"><span className="text-red-500 font-bold">❌</span></td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span></td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span></td>
               </tr>
               {/* 提案权 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">提案权</td>
                  <td className="p-4 text-slate-600"><span className="text-red-500 font-bold">❌</span></td>
                  <td className="p-4 text-slate-600"><span className="text-red-500 font-bold">❌</span></td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span></td>
               </tr>
                {/* 指标库 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">指标库（持续更新）</td>
                  <td className="p-4 text-slate-600"><span className="text-red-500 font-bold">❌</span></td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 考核指标库</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 全站指标库</td>
               </tr>
                {/* 社群层级 */}
               <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-400 font-medium">社群层级</td>
                  <td className="p-4 text-slate-500"><span className="text-red-500 font-bold">❌</span> 公共</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 进阶</td>
                  <td className="p-4 text-slate-300"><span className="text-green-500 font-bold">✅</span> 专业</td>
               </tr>
            </tbody>
         </table>
      </div>

      <div className="p-4 bg-white/5 border-l-4 border-[#FFD700] rounded-r-xl">
         <p className="text-slate-400 text-sm">
            <span className="text-[#FFD700] font-bold mr-2">NOTE:</span>
            所有推广与治理类权益，仅在会员有效期内生效。
         </p>
      </div>
   </div>
);


// --- Components ---

const Navbar: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0E14]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => scrollToSection('hero')} className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
            <span className="text-[#00F0FF]">智赢</span> · SmartWin
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-base font-bold uppercase tracking-widest text-slate-300">
          <button onClick={() => scrollToSection('hero')} className="hover:text-[#00F0FF] transition-colors">首页</button>
          <button 
            onClick={() => scrollToSection('privileges')}
            className="hover:text-[#00F0FF] transition-colors"
          >
            会员权益
          </button>
          <button onClick={() => scrollToSection('competition')} className="hover:text-[#FFD700] transition-colors text-[#FFD700]">热门赛事与挑战</button>
          <button onClick={() => scrollToSection('ea-library')} className="hover:text-[#00F0FF] transition-colors">EA工具下载中心</button>
          <a 
            href={JD_LINKS.MEMBER_DASH} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#00F0FF] transition-colors flex items-center gap-1"
          >
            <LayoutDashboard size={14} /> 会员中心
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenModal(JD_LINKS.GET_KEY, "提取 EA 激活码")}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0B0E14] hover:brightness-110 transition-all text-sm font-black shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-105"
          >
            <Key size={16} /> 提取EA激活码
          </button>
          <button 
            onClick={() => onOpenModal(JD_LINKS.REGISTER, "L1 免费会员注册")}
            className="bg-[#00F0FF] text-[#0B0E14] px-8 py-2.5 rounded-full text-xs font-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            L1 免费训练
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- OPTIMIZED CYBER EXPLOSION & CONVERGENCE FX ---

const CyberShatterEffect: React.FC<{ active: boolean; x: number; y: number }> = ({ active, x, y }) => {
  if (!active) return null;

  // 1200+ particles for intense effect
  const particles = useMemo(() => Array.from({ length: 1200 }).map((_, i) => { 
    const randomAngle = Math.random() * Math.PI * 2;
    // Explode outward
    const dist = 50 + Math.random() * 800; 
    const moveX = Math.cos(randomAngle) * dist;
    const moveY = Math.sin(randomAngle) * dist;
    
    // Cyberpunk palette
    const colors = ['#00F0FF', '#FFD700', '#FFFFFF', '#FF0055'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 1 + Math.random() * 3; 
    
    // Duration variation
    const duration = 0.8 + Math.random() * 0.8; 

    return { id: i, moveX, moveY, color, size, duration };
  }), []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <style>{`
        @keyframes particle-explode-return {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
          40% { transform: translate3d(var(--tx), var(--ty), 0) scale(1); opacity: 0.9; }
          60% { transform: translate3d(var(--tx), var(--ty), 0) scale(0.8); opacity: 0.6; }
          100% { transform: translate3d(0,0,0) scale(0); opacity: 0.1; }
        }
        
        @keyframes text-converge-and-hold {
           0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; filter: blur(20px); letter-spacing: 20px; }
           50% { opacity: 0.5; }
           70% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; filter: blur(0px); letter-spacing: 0px; }
           80% { transform: translate(-50%, -50%) scale(1); }
           100% { transform: translate(-50%, -50%) scale(1); opacity: 1; filter: blur(0px); }
        }
      `}</style>

      {/* Particles radiating from center (x,y) */}
      {particles.map((p) => (
         <div 
           key={p.id}
           className="absolute rounded-full will-change-transform"
           style={{
             left: x,
             top: y,
             width: p.size,
             height: p.size,
             backgroundColor: p.color,
             boxShadow: `0 0 ${p.size}px ${p.color}`,
             '--tx': `${p.moveX}px`,
             '--ty': `${p.moveY}px`,
             animation: `particle-explode-return ${p.duration}s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
           } as React.CSSProperties}
         />
      ))}

      {/* Replaced Text: SmartWin */}
      {/* Positioned exactly at x,y which is the center of the replaced element */}
      <div 
         className="absolute text-5xl lg:text-7xl font-black text-white whitespace-nowrap drop-shadow-[0_0_30px_rgba(0,240,255,0.8)] z-50"
         style={{
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)',
            animation: 'text-converge-and-hold 0.8s ease-out forwards'
         }}
      >
         <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#00F0FF] to-[#00F0FF]">SmartWin</span>
      </div>
    </div>
  );
};

const Hero: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isShattered, setIsShattered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  // Ref to the text element we want to replace
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % 2);
      }
    }, 4000); // Rotate every 4 seconds unless hovered
    return () => clearInterval(timer);
  }, [isHovered]);

  const scrollToPainPoints = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('pain-points');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShatter = () => {
    if (isShattered || !textRef.current) return;
    
    // Calculate the exact center of the text element to spawn the effect
    const rect = textRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setCoords({ x: centerX, y: centerY });
    setIsShattered(true);
    
    // Reset after 3 seconds (effect lasts 3 seconds)
    setTimeout(() => {
      setIsShattered(false);
    }, 3000);
  };

  return (
    <section id="hero" className="relative pt-40 pb-24 overflow-hidden min-h-screen flex items-center bg-[#0B0E14]">
      {/* FX Layers */}
      <CyberShatterEffect active={isShattered} x={coords.x} y={coords.y} />

      {/* Styles */}
      <style>{`
        .text-shattered {
          opacity: 0;
          transition: opacity 0.1s;
        }
      `}</style>

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00F0FF 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
      <div className="absolute -top-[20%] right-[-10%] w-[800px] h-[800px] bg-[#00F0FF]/10 rounded-full blur-[150px] -z-10"></div>
      
      {/* Container - Expanded to max-w-7xl to push content to sides */}
      <div className="container mx-auto px-6 max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Left Content - Hard Truth */}
        {/* Removed lg:ml-auto, allows content to sit naturally on the left side of the screen */}
        <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-700 w-full flex flex-col justify-center lg:items-end lg:text-right">
          <div className="space-y-4 lg:w-full lg:max-w-xl">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs font-black tracking-[0.2em] uppercase w-fit lg:ml-auto">
               <AlertTriangle size={16} /> 核心认知 · CORE TRUTH
             </div>
            
            {/* Optimized Typography */}
            <div className="relative">
               <div className="text-[6rem] lg:text-[8rem] font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 select-none">
                 90%
               </div>
               <div className="text-3xl lg:text-5xl font-black text-white leading-tight mt-2 flex flex-col gap-1 lg:items-end">
                 <span>Prop Firm 考核</span>
                 
                 {/* Interactive "Failure" Text - HOVER TRIGGERED & CENTERED */}
                 <div 
                   ref={textRef}
                   className="relative inline-block w-fit select-none group cursor-pointer"
                   onMouseEnter={handleShatter}
                 >
                   <span className={`inline-block ${isShattered ? 'text-shattered' : 'text-red-500 underline decoration-4 underline-offset-8 decoration-red-500/50 hover:text-red-400 transition-colors'}`}>
                     以失败告终
                   </span>
                 </div>
               </div>
            </div>

            <p className="text-xl text-slate-400 font-bold leading-relaxed pt-2">
              不是策略问题，而是 <span className="text-[#00F0FF] bg-[#00F0FF]/10 px-2 rounded inline-block">风控系统缺失</span>。
            </p>
          </div>
          
          <div className="p-6 border-l-4 lg:border-l-0 lg:border-r-4 border-[#00F0FF] bg-white/5 backdrop-blur-sm rounded-r-xl lg:rounded-r-none lg:rounded-l-xl lg:w-full lg:max-w-xl">
             <h3 className="text-xl font-bold text-white mb-2">SmartWin 不是自动赚钱 EA</h3>
             <p className="text-slate-400 leading-relaxed">
               而是 <span className="text-white font-bold">为 Prop Firm 考核设计</span> 的风控与交易训练系统。<br/>
               <span className="text-xs uppercase tracking-widest text-slate-500 mt-2 block">
                 不喊单 · 不代客理财 · 不承诺收益
               </span>
             </p>
             <div className="mt-4 text-[#00F0FF] font-black text-lg">
                只帮你：活下来、合规交易、避免低级出局
             </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 lg:justify-end lg:w-full lg:max-w-xl">
            <button 
              onClick={() => onOpenModal(JD_LINKS.REGISTER, "立即开始 L1 训练")}
              className="px-10 py-5 bg-[#00F0FF] text-[#0B0E14] rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] text-lg"
            >
              <Download size={22} /> 免费进入考核训练 (L1)
            </button>
            <button 
              onClick={scrollToPainPoints}
              className="px-10 py-5 bg-transparent border-2 border-white/20 rounded-2xl font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-white"
            >
              为何会失败？ <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Content - Visual Representation Carousel */}
        {/* Adjusted to align left within its column, spreading from center */}
        <div 
           className="relative animate-in fade-in zoom-in duration-1000 hidden lg:flex w-full justify-start items-center"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
        >
           {/* Golden Ratio Rectangle (approx 1.618) - Width 660px, Height 400px (Scaled up ~20%) */}
           <div className="relative w-full max-w-[660px] h-[400px] cursor-pointer lg:ml-0">
              <div className="absolute -top-10 -right-10 bg-[#00F0FF] w-24 h-24 rounded-full blur-[60px] opacity-50"></div>
              {/* Card Stack Effect - Flatter */}
              <div className="glass-card p-6 rounded-[2rem] border border-[#00F0FF]/20 rotate-1 transform translate-y-2 opacity-60 absolute top-0 left-0 w-full h-full -z-10"></div>
              
              <div className="glass-card w-full h-full rounded-[2rem] border border-[#00F0FF]/40 bg-[#0B0E14]/90 shadow-2xl relative overflow-hidden group">
                {/* SLIDE 0: Survival System */}
                <div 
                  className={`absolute inset-0 px-8 pt-8 pb-16 flex flex-col items-center justify-center text-center space-y-4 transition-opacity duration-700 ease-in-out ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div className="w-24 h-24 bg-[#00F0FF]/10 rounded-full flex items-center justify-center border border-[#00F0FF]/30 mb-2">
                       <ShieldCheck size={48} className="text-[#00F0FF]" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-white mb-1">考核生存系统</h3>
                       <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Survival System v4.2</p>
                    </div>
                    <div className="w-full h-px bg-white/10 my-4"></div>
                    <div className="grid grid-cols-2 gap-6 w-full text-left">
                       <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                          <p className="text-xs text-red-400 font-black uppercase mb-1">Risk Block</p>
                          <p className="text-white font-bold text-lg">强损预警</p>
                       </div>
                       <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                          <p className="text-xs text-green-400 font-black uppercase mb-1">System Status</p>
                          <p className="text-white font-bold text-lg">监控运行中</p>
                       </div>
                    </div>
                </div>

                {/* SLIDE 1: Hot Challenges */}
                <div 
                  className={`absolute inset-0 px-8 pt-8 pb-16 flex flex-col items-center justify-center text-center space-y-3 transition-opacity duration-700 ease-in-out ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-black tracking-widest uppercase mb-2">
                        <Flame size={14} /> Hot Challenges
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight">
                       千万奖池<br/><span className="text-[#FFD700]">等你挑战</span>
                    </h3>
                    
                    <div className="w-full space-y-3 mt-2">
                        <div className="flex items-center justify-between p-4 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Trophy size={20} className="text-[#FFD700]" />
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">名人堂</div>
                                </div>
                            </div>
                            <div className="text-[#FFD700] font-black text-lg">20W-150W</div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Crown size={20} className="text-red-500" />
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">人王杯</div>
                                </div>
                            </div>
                            <div className="text-red-500 font-black text-lg">35W-150W</div>
                        </div>
                    </div>
                    
                    <a 
                       href="#challenge-rules" 
                       onClick={(e) => { e.preventDefault(); const el = document.getElementById('challenge-rules'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                       className="mt-3 text-sm text-slate-400 hover:text-white flex items-center gap-1 border-b border-dashed border-slate-600 pb-0.5"
                    >
                       查看猎手招募计划 <ArrowRight size={12} />
                    </a>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 z-20">
                    <button 
                       onClick={() => setCurrentSlide(0)}
                       className={`w-2 h-2 rounded-full transition-all ${currentSlide === 0 ? 'bg-[#00F0FF] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                    />
                    <button 
                       onClick={() => setCurrentSlide(1)}
                       className={`w-2 h-2 rounded-full transition-all ${currentSlide === 1 ? 'bg-[#FFD700] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                    />
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const PainPointsSection: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  const points = [
    {
      id: 1,
      problem: "日内亏损先爆，而不是单笔爆仓",
      desc: "你控制了单笔风险，却忽略了连续交易的日内累计亏损。还没等策略发挥，考核已经结束。",
      solution: "日亏/总亏实时监控 · 接近规则即预警",
      icon: <TrendingUp size={32} />
    },
    {
      id: 2,
      problem: "情绪失控，比市场更危险",
      desc: "回撤后加仓、提前进场、临时改计划，不是技术差，是人性必然。",
      solution: "固定交易模板 · 系统替你“踩刹车”",
      icon: <Flame size={32} />
    },
    {
      id: 3,
      problem: "一次新闻或滑点，就足够出局",
      desc: "非农、利率决议、异常波动，只要一次，就可能直接违规。",
      solution: "新闻时段限制 · 避开“必死时刻”",
      icon: <Zap size={32} />
    },
    {
      id: 4,
      problem: "规则你都懂，但执行不到位",
      desc: "Prop Firm 的规则不是给人性的，而是给“系统”的。",
      solution: "不符合规则=不能下单 · 靠自觉→靠系统",
      icon: <LayoutDashboard size={32} />
    },
    {
      id: 5,
      problem: "没有训练，直接实盘等于裸考",
      desc: "模拟随便做，考核账户却突然“动作变形”。",
      solution: "1:1 考核规则训练 · 低成本试错",
      icon: <Crosshair size={32} />
    }
  ];

  return (
    <section id="pain-points" className="py-24 bg-[#0F1218] border-y border-white/5 relative scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 text-red-500 font-black tracking-widest uppercase">
            <XCircle size={18} /> Reality Check
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            为什么大多数考核会<span className="text-red-500">失败</span>？
          </h2>
          <p className="text-slate-400 text-lg">
            失败往往发生在你“以为自己没问题”的时候。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p, i) => (
            <div key={i} className="group p-8 bg-[#0B0E14] border border-white/5 hover:border-red-500/30 rounded-3xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
               {/* Hover Effect */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit text-slate-300 group-hover:text-red-500 transition-colors border border-white/10 group-hover:border-red-500/30">
                 {p.icon}
               </div>
               
               <h3 className="text-xl font-bold text-white mb-3 pr-4 group-hover:text-red-400 transition-colors">
                 {p.problem}
               </h3>
               <p className="text-sm text-slate-400 leading-relaxed mb-6 h-20">
                 {p.desc}
               </p>
               
               <div className="pt-6 border-t border-white/10">
                 <p className="text-xs text-[#00F0FF] uppercase font-black tracking-widest mb-1">SmartWin Solution</p>
                 <p className="text-sm font-bold text-white">{p.solution}</p>
               </div>
            </div>
          ))}
          
          {/* CTA Card */}
          <div className="flex flex-col items-center justify-center p-8 bg-[#00F0FF] rounded-3xl text-center">
             <h3 className="text-2xl font-black text-[#0B0E14] mb-4">别再“裸考”了</h3>
             <p className="text-[#0B0E14]/80 font-bold mb-8">把规则写进系统，让风控成为本能。</p>
             <button 
                onClick={() => onOpenModal(JD_LINKS.REGISTER, "L1 考核训练注册")}
                className="px-8 py-3 bg-[#0B0E14] text-white rounded-xl font-black w-full hover:scale-105 transition-transform"
             >
               立即开始训练
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-24 bg-[#0B0E14]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
           {/* Not What */}
           <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                 <XCircle className="text-slate-500" /> 我们不做的事
              </h2>
              <div className="space-y-6">
                 {['不提供自动赚钱策略', '不承诺收益', '不替你交易'].map((item, i) => (
                    <div key={i} className="text-2xl lg:text-3xl font-bold text-slate-600 line-through decoration-red-500/50 decoration-4">
                       {item}
                    </div>
                 ))}
              </div>
           </div>
           
           {/* What Is */}
           <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#00F0FF] uppercase tracking-widest flex items-center gap-3">
                 <CheckCircle2 className="text-[#00F0FF]" /> 我们只做一件事
              </h2>
              <div className="p-8 border-l-4 border-[#00F0FF] bg-gradient-to-r from-[#00F0FF]/10 to-transparent">
                 <p className="text-2xl lg:text-4xl font-black text-white leading-tight">
                    帮你在 Prop Firm 考核中，<br/>
                    不因为<span className="text-[#00F0FF]">低级风控问题</span>出局。
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const TargetAudienceSection: React.FC = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-[#0B0E14]">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-slate-500 font-black uppercase tracking-[0.3em] mb-12">Who is this for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           {[
             { title: "备考者", desc: "正在准备 Prop Firm / 基金考核的交易者" },
             { title: "怀疑者", desc: "已多次失败，怀疑不是“技术问题”而是“心态问题”的人" },
             { title: "进阶者", desc: "想把交易变成「可复制流程」的人" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-300">
                   <Target />
                </div>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="text-slate-400 max-w-xs">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

const PrivilegesSection: React.FC<{ onOpenModal: (url: string, title: string) => void, onOpenDetails: () => void }> = ({ onOpenModal, onOpenDetails }) => {
  return (
    <section id="privileges" className="py-24 bg-[#0F1218] relative scroll-mt-24">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            会员权益<span className="text-[#00F0FF]">体系</span>
          </h2>
          <p className="text-slate-400 text-xl font-medium mb-6">
            从“模拟训练”到“真实风控”，再到“生态合伙”，每一步都算数。
          </p>
          <button 
             onClick={onOpenDetails}
             className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors text-sm font-bold"
          >
             <BookOpen size={16} /> 查看会员权益细则
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* L1 Card */}
          <div className="relative group p-1 bg-[#0B0E14] rounded-3xl border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="h-full bg-[#0B0E14] rounded-[1.4rem] p-8 flex flex-col">
                <div className="mb-6">
                   <span className="text-slate-500 font-black tracking-widest text-xs uppercase">Training</span>
                   <h3 className="text-3xl font-black text-white mt-1">L1 训练版</h3>
                   <div className="mt-4 text-slate-400 font-mono text-sm">
                      适合初次接触 Prop Firm 规则的交易者
                   </div>
                </div>
                <div className="flex-grow space-y-4 mb-8">
                   {[
                     "考核规则全真模拟",
                     "基础风控仪表盘 (Visual)",
                     "智赢社区访问权限",
                     "不包含：强制平仓功能"
                   ].map((feat, i) => (
                      <div key={i} className={`flex items-start gap-3 text-sm font-bold ${i === 3 ? 'text-slate-600' : 'text-slate-300'}`}>
                         {i === 3 ? <Lock size={16} /> : <Check size={16} className="text-[#00F0FF]" />}
                         {feat}
                      </div>
                   ))}
                </div>
                <button 
                   onClick={() => onOpenModal(JD_LINKS.REGISTER, "L1 免费会员注册")}
                   className="w-full py-4 rounded-xl border border-[#00F0FF]/30 text-[#00F0FF] font-black hover:bg-[#00F0FF] hover:text-[#0B0E14] transition-all"
                >
                   免费注册体验
                </button>
             </div>
          </div>

          {/* L2 Card - Highlighted */}
          <div className="relative group p-1 bg-gradient-to-b from-[#00F0FF] to-[#00F0FF]/10 rounded-3xl shadow-[0_0_40px_rgba(0,240,255,0.15)] transform lg:-translate-y-4">
             <div className="absolute top-4 right-4 px-3 py-1 bg-[#00F0FF] text-[#0B0E14] text-xs font-black uppercase tracking-widest rounded-full">Most Popular</div>
             <div className="h-full bg-[#0B0E14] rounded-[1.4rem] p-8 flex flex-col">
                <div className="mb-6">
                   <span className="text-[#00F0FF] font-black tracking-widest text-xs uppercase">Core System</span>
                   <h3 className="text-3xl font-black text-white mt-1">L2 实战版</h3>
                   <div className="mt-4 text-[#00F0FF] font-mono text-sm">
                      为通过考核而生的完全体风控
                   </div>
                </div>
                <div className="flex-grow space-y-4 mb-8">
                   {[
                     "包含 L1 所有权益",
                     "硬核风控：违规前强制平仓",
                     "日内亏损锁 (Daily Loss Lock)",
                     "新闻自动规避 (News Filter)",
                     "专属 EA 激活码 (Key)"
                   ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm font-bold text-white">
                         <Check size={16} className="text-[#00F0FF]" />
                         {feat}
                      </div>
                   ))}
                </div>
                <button 
                   onClick={() => onOpenModal(JD_LINKS.UPGRADE, "L2 会员升级 / 续费")}
                   className="w-full py-4 rounded-xl bg-[#00F0FF] text-[#0B0E14] font-black hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                   升级 / 续费 L2
                </button>
             </div>
          </div>

          {/* L3 Card */}
          <div className="relative group p-1 bg-gradient-to-b from-[#FFD700] to-[#FFD700]/10 rounded-3xl border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300">
             <div className="h-full bg-[#0B0E14] rounded-[1.4rem] p-8 flex flex-col">
                <div className="mb-6">
                   <span className="text-[#FFD700] font-black tracking-widest text-xs uppercase">Ecosystem</span>
                   <h3 className="text-3xl font-black text-white mt-1">L3 合伙人</h3>
                   <div className="mt-4 text-[#FFD700] font-mono text-sm">
                      不仅是交易，更是建立你的商业版图
                   </div>
                </div>
                <div className="flex-grow space-y-4 mb-8">
                   {[
                     "包含 L2 所有权益",
                     "高达 25% 的永久返佣权限",
                     "赏金猎人名人堂打榜资格",
                     "专属伯乐推荐奖金池",
                     "合伙人数据独立后台"
                   ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                         <Crown size={16} className="text-[#FFD700]" />
                         {feat}
                      </div>
                   ))}
                </div>
                <button 
                   onClick={() => onOpenModal(JD_LINKS.UPGRADE, "申请 L3 合伙人")}
                   className="w-full py-4 rounded-xl bg-[#FFD700]/10 border border-[#FFD700] text-[#FFD700] font-black hover:bg-[#FFD700] hover:text-[#0B0E14] transition-all"
                >
                   申请成为合伙人
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const MembershipPath: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  const tiers = [
    {
      level: "L1",
      name: "免费训练",
      desc: "体验规则化交易与训练",
      action: "免费进入",
      highlight: false,
      color: "border-slate-700",
      link: JD_LINKS.REGISTER,
      modalTitle: "L1 会员注册"
    },
    {
      level: "L2",
      name: "进阶风控",
      desc: "真实风控辅助，避免违规",
      action: "解锁/续费",
      highlight: true,
      color: "border-[#00F0FF]",
      link: JD_LINKS.UPGRADE,
      modalTitle: "会员续费 / 升级"
    },
    {
      level: "L3",
      name: "专业合伙",
      desc: "把通过考核变成流程",
      action: "合伙人查询",
      highlight: false,
      color: "border-[#FFD700]",
      link: JD_LINKS.PARTNER_QUERY,
      modalTitle: "合伙人数据查询"
    }
  ];

  return (
    <section id="journey" className="py-24 bg-[#0F1218] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00F0FF]/5 blur-[120px] rounded-full -z-10"></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-black text-white mb-4">从训练到考核的用户路径</h2>
           <p className="text-[#00F0FF] text-xl font-bold">👉 先训练，再考核，而不是反过来</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12">
           {tiers.map((t, i) => (
             <React.Fragment key={i}>
                <div className={`relative glass-card p-8 rounded-[2rem] border-2 w-full md:w-1/3 max-w-sm ${t.highlight ? 'border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.1)] bg-[#0B0E14]' : 'border-white/10 bg-[#0B0E14]'}`}>
                   <div className="text-xs font-black text-slate-500 mb-2">STAGE</div>
                   <div className="text-4xl font-black text-white mb-2">{t.level}</div>
                   <h3 className="text-xl font-bold text-slate-200 mb-4">{t.name}</h3>
                   <p className="text-slate-400 mb-8 h-12">{t.desc}</p>
                   <button 
                      onClick={() => onOpenModal(t.link, t.modalTitle)}
                      className={`block w-full py-4 rounded-xl text-center font-black transition-all ${t.highlight ? 'bg-[#00F0FF] text-[#0B0E14]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                   >
                      {t.action}
                   </button>
                </div>
                {i < tiers.length - 1 && (
                  <div className="hidden md:block text-slate-600">
                     <ArrowRight size={32} />
                  </div>
                )}
                {i < tiers.length - 1 && (
                  <div className="block md:hidden text-slate-600 rotate-90 my-2">
                     <ArrowRight size={32} />
                  </div>
                )}
             </React.Fragment>
           ))}
        </div>
      </div>
    </section>
  );
};

const HallOfFameSection: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  return (
    <section id="competition" className="py-24 bg-[#0B0E14] border-t border-white/5 relative overflow-hidden scroll-mt-24">
      {/* Golden Glow for Hall of Fame */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-6">
         <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded text-[#FFD700] text-xs font-black tracking-widest uppercase">
                  <Trophy size={14} /> XAU · Hall of Fame
               </div>
               <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                  赏金猎人<br/>
                  <span className="text-[#FFD700]">名人堂挑战赛</span>
               </h2>
               <p className="text-slate-400 max-w-lg">
                 展示你的风控能力，赢取丰厚奖金。用数据说话，让实力变现。
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
               <button 
                  onClick={() => onOpenModal(JD_LINKS.EVENT_REG, "赛事报名 / 奖励申报")}
                  className="px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-bold hover:bg-white/10 text-white transition-colors"
               >
                  赛事报名 / 申报
               </button>
               <button 
                  onClick={() => onOpenModal(JD_LINKS.SUBMIT_PK, "提交 PK 码打榜")}
                  className="px-8 py-3 bg-[#FFD700] text-[#0B0E14] rounded-xl font-black hover:scale-105 transition-transform gold-glow"
               >
                  提交 PK 码打榜
               </button>
               <a 
                  href={JD_LINKS.LEADERBOARD} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#FFD700]/10 border border-[#FFD700] text-[#FFD700] rounded-xl font-black hover:bg-[#FFD700] hover:text-[#0B0E14] transition-all flex items-center justify-center gap-2"
               >
                  <BarChart3 size={18} />
                  赏金猎人｜XAU·名人堂排行榜
               </a>
            </div>
         </div>
      </div>
    </section>
  );
};

const ChallengeRewardsSection: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  return (
    <section id="challenge-rules" className="py-24 bg-[#0B0E14] relative scroll-mt-24">
       {/* Background elements */}
       <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-xs font-black tracking-widest uppercase mb-4">
                <Crown size={14} /> Recruitment Plan
             </div>
             <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                XAU · 名人堂 <span className="text-[#FFD700]">猎手招募计划</span>
             </h2>
             <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
               千万级现金奖池已就位，只等顶尖猎手入场。<br/>
               <span className="text-white font-bold">零风险 · 零投入 · 纯实盘技术变现</span><br/>
               这是属于交易员的『电竞』巅峰赛，用实力换取真金白银。
             </p>
             
             {/* Key Highlights */}
             <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-slate-300 font-bold mb-8">
                <div className="flex items-center gap-2 text-[#00F0FF] bg-[#00F0FF]/10 px-6 py-2 rounded-full border border-[#00F0FF]/30 hover:scale-105 transition-transform cursor-default">
                   <CheckCircle2 size={18} /> 💰 0 报名费 (Free Entry)
                </div>
                <div className="flex items-center gap-2 text-[#FFD700] bg-[#FFD700]/10 px-6 py-2 rounded-full border border-[#FFD700]/30 animate-pulse-subtle cursor-default">
                   <Trophy size={18} /> 🏆 大额现金奖励 (Cash Prize)
                </div>
             </div>

             {/* WeChat Reminder CTA */}
             <div className="inline-block p-4 bg-[#0B0E14] border border-[#00F0FF]/30 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row items-center gap-3 text-sm">
                   <div className="w-8 h-8 bg-[#00F0FF]/20 rounded-full flex items-center justify-center text-[#00F0FF] shrink-0">
                      <MessageCircle size={18} />
                   </div>
                   <div className="text-left">
                      <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Join the Elite Group</p>
                      <p className="text-white">
                         详细考核规则与风控标准，请加客服微信 <span className="text-[#00F0FF] font-mono font-black text-base select-all underline decoration-dashed underline-offset-4 cursor-pointer hover:text-white transition-colors">kpz8866</span> 进群获取
                      </p>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
             {/* Ren Wang Cup Card */}
             <div className="relative bg-[#0F1218] border border-red-500/30 rounded-3xl p-8 overflow-hidden group hover:border-red-500 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                   <Crown className="text-red-500" /> 人王杯 (Ren Wang Cup)
                </h3>
                
                <div className="space-y-4">
                   {/* Tier 1 */}
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                         <div className="text-slate-300 font-bold">正式考核</div>
                         <div className="text-sm text-slate-500">做到 1200 分</div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-red-500">¥ 350,000</div>
                         <div className="text-xs text-red-500/70 uppercase">Prize</div>
                      </div>
                   </div>
                   {/* Tier 2 */}
                   <div className="bg-gradient-to-r from-red-500/20 to-transparent p-4 rounded-xl border border-red-500/30 flex justify-between items-center">
                      <div>
                         <div className="text-white font-bold">正式考核</div>
                         <div className="text-sm text-red-500">做到 2400 分</div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-red-500">¥ 1,500,000</div>
                         <div className="text-xs text-red-500/70 uppercase">Grand Prize</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Hall of Fame Card */}
             <div className="relative bg-[#0F1218] border border-[#FFD700]/30 rounded-3xl p-8 overflow-hidden group hover:border-[#FFD700] transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                   <Trophy className="text-[#FFD700]" /> 名人堂 (Hall of Fame)
                </h3>
                
                <div className="space-y-4">
                   {/* Tier 1 */}
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                         <div className="text-slate-300 font-bold">正式考核 · 盈损 5</div>
                         <div className="text-sm text-slate-500">做到 1500 分</div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-[#FFD700]">¥ 200,000</div>
                         <div className="text-xs text-[#FFD700]/70 uppercase">Prize</div>
                      </div>
                   </div>
                   {/* Tier 2 */}
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                         <div className="text-slate-300 font-bold">正式考核 · 盈损 10</div>
                         <div className="text-sm text-slate-500">做到 1500 分</div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-[#FFD700]">¥ 350,000</div>
                         <div className="text-xs text-[#FFD700]/70 uppercase">Prize</div>
                      </div>
                   </div>
                   {/* Tier 3 */}
                   <div className="bg-gradient-to-r from-[#FFD700]/20 to-transparent p-4 rounded-xl border border-[#FFD700]/30 flex justify-between items-center">
                      <div>
                         <div className="text-white font-bold">正式考核 · 任意盈损</div>
                         <div className="text-sm text-[#FFD700]">一波流做到 3000 分</div>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-black text-[#FFD700]">¥ 1,500,000</div>
                         <div className="text-xs text-[#FFD700]/70 uppercase">Grand Prize</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* SmartWin Empowerment Plan */}
          <div className="bg-gradient-to-b from-[#00F0FF]/10 to-[#0B0E14] border border-[#00F0FF]/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></div>
             
             <div className="text-center mb-10">
                <h3 className="text-3xl font-black text-white mb-2">智赢 · SmartWin Lab <span className="text-[#00F0FF]">赋能计划</span></h3>
                <p className="text-slate-400">机会宝贵（每月仅3次），请使用专业工具辅助，别浪费机会。</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Guarantee */}
                <div className="flex flex-col items-center text-center p-6 bg-[#0B0E14]/50 rounded-2xl border border-white/10">
                   <div className="w-16 h-16 bg-[#00F0FF]/20 rounded-full flex items-center justify-center text-[#00F0FF] mb-4">
                      <ShieldCheck size={32} />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2">通关保障 · 全额退款</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">
                      智赢 L2/L3 会员使用我们的 EA 辅助工具通过考核，<br/>
                      <span className="text-[#00F0FF] font-bold">全额退还会员费</span>。<br/>
                      用科技守护你的每一次机会！
                   </p>
                </div>
                
                {/* Referral */}
                <div className="flex flex-col items-center text-center p-6 bg-[#0B0E14]/50 rounded-2xl border border-white/10">
                   <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center text-[#FFD700] mb-4">
                      <Users size={32} />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2">伯乐计划 · 推荐有奖</h4>
                   <div className="text-sm text-slate-400 space-y-1">
                      <p>推荐高手参加并通关，获得丰厚回报：</p>
                      <div className="font-mono text-[#FFD700] font-bold pt-2">
                         L3 推荐: ¥ 15,000 | L2 推荐: ¥ 10,000 | L1 推荐: ¥ 5,000
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-10 text-center">
                <button 
                   onClick={() => onOpenModal(JD_LINKS.EVENT_REG, "赛事报名 / 申报")}
                   className="px-12 py-4 bg-[#00F0FF] text-[#0B0E14] rounded-full font-black text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                   立即报名 (每月仅3次机会)
                </button>
                <p className="text-slate-500 text-xs mt-4">机会不会一直都在，奖池有限，先到先得。</p>
             </div>
          </div>
       </div>
    </section>
  );
};

const EALibrarySection: React.FC = () => {
   return (
      <section id="ea-library" className="py-24 bg-[#0F1218] relative scroll-mt-24">
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/circuit.png')] opacity-10 pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
               <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  SmartWin Lab <span className="text-[#00F0FF]">EA 核心库</span>
               </h2>
               <p className="text-slate-400">官方风控系统下载 (Supports MT4 & MT5)</p>
            </div>

            <div className="max-w-4xl mx-auto bg-[#0B0E14] border border-white/10 rounded-2xl overflow-hidden p-8 flex flex-col items-center">
               <div className="flex flex-col md:flex-row gap-6 w-full mb-8">
                  <div className="flex-1 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#00F0FF]/30 transition-colors flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <FileCode className="text-[#00F0FF]" size={32} />
                        <div>
                           <div className="text-white font-bold">XAU·名人堂·SmartWin Lab.ex4</div>
                           <div className="text-xs text-slate-500 font-mono">Platform: MetaTrader 4</div>
                        </div>
                     </div>
                     <div className="px-3 py-1 bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-bold rounded">.ex4</div>
                  </div>
                  
                  <div className="flex-1 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#00F0FF]/30 transition-colors flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <FileCode className="text-[#00F0FF]" size={32} />
                        <div>
                           <div className="text-white font-bold">XAU·名人堂·SmartWin Lab.ex5</div>
                           <div className="text-xs text-slate-500 font-mono">Platform: MetaTrader 5</div>
                        </div>
                     </div>
                     <div className="px-3 py-1 bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-bold rounded">.ex5</div>
                  </div>
               </div>

               <div className="text-center space-y-4">
                  <a 
                     href={JD_LINKS.EA_LIBRARY} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 px-10 py-4 bg-[#00F0FF] text-[#0B0E14] rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  >
                     <Download size={20} /> 访问 EA 仓库下载
                  </a>
                  <p className="text-slate-500 text-xs">
                     请复制链接到浏览器下载，或直接点击上方按钮访问。<br/>
                     <span className="font-mono text-slate-600 select-all">{JD_LINKS.EA_LIBRARY}</span>
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
};

const ClosingSection: React.FC<{ onOpenModal: (url: string, title: string) => void }> = ({ onOpenModal }) => {
  return (
    <section className="py-24 bg-[#0B0E14] text-center border-t border-white/5">
       <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-8">
             <Footprints size={48} className="mx-auto text-slate-600" />
             <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
               Prop Firm 考核不是比谁赚得快，<br/>
               而是比谁能<span className="text-[#00F0FF]">不犯致命错误</span>。
             </h2>
             <p className="text-xl text-slate-400 font-medium">SmartWin，只为这一件事存在。</p>
             <div className="pt-8">
                <button 
                   onClick={() => onOpenModal(JD_LINKS.REGISTER, "L1 考核训练注册")}
                   className="px-12 py-5 bg-white text-[#0B0E14] rounded-full font-black text-lg hover:scale-105 transition-transform"
                >
                   开始 L1 训练
                </button>
             </div>
          </div>
       </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-12 bg-[#0B0E14] border-t border-white/10 text-center md:text-left">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
           <span className="text-2xl font-black tracking-tighter text-white uppercase">SmartWin Lab</span>
           <p className="text-slate-500 text-sm leading-relaxed">
             专为 Prop Firm 考核设计的风控与交易训练系统。<br/>
             让规则成为你的护城河。
           </p>
        </div>

        {/* Contact */}
        <div className="space-y-4">
           <h4 className="text-white font-bold uppercase tracking-widest text-sm">联系我们 / Contact</h4>
           <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                 <span className="text-[#00F0FF]"><MessageCircle size={16}/></span>
                 客服微信: <span className="text-white font-mono select-all">kpz8866</span> (加入精英猎手群)
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                 <span className="text-[#00F0FF]"><Mail size={16}/></span>
                 商务合作: <span className="text-white font-mono select-all">30381120@qq.com</span>
              </p>
           </div>
        </div>

        {/* Downloads */}
        <div className="space-y-4">
           <h4 className="text-white font-bold uppercase tracking-widest text-sm">快速链接 / Links</h4>
           <div className="flex flex-col gap-2 text-sm text-slate-400">
             <a href={JD_LINKS.EA_LIBRARY} target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF] transition-colors">EA 下载库</a>
             <a href={JD_LINKS.MEMBER_RIGHTS} target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF] transition-colors">会员权益说明</a>
             <a href={JD_LINKS.MEMBER_DASH} target="_blank" rel="noopener noreferrer" className="hover:text-[#00F0FF] transition-colors">会员中心</a>
           </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
         <p className="text-slate-600 font-bold text-xs tracking-widest">
           版权所有 © 2025 智赢 · SmartWin Lab. All Rights Reserved.
         </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | undefined>(undefined);
  const [modalTitle, setModalTitle] = useState("");
  
  // State for content modal (no iframe URL)
  const [contentModalOpen, setContentModalOpen] = useState(false);

  const openModal = (url: string, title: string) => {
    setModalUrl(url);
    setModalTitle(title);
    setModalOpen(true);
  };
  
  const openDetailsModal = () => {
     setContentModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalUrl(undefined);
    setContentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 selection:bg-[#00F0FF] selection:text-[#0B0E14]">
      {/* Iframe Modal */}
      <CyberModal isOpen={modalOpen} onClose={closeModal} url={modalUrl} title={modalTitle} />
      
      {/* Details Modal */}
      <CyberModal isOpen={contentModalOpen} onClose={closeModal} title="会员权益细则">
         <DetailedRulesContent />
      </CyberModal>
      
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <PainPointsSection onOpenModal={openModal} />
      <ManifestoSection />
      <TargetAudienceSection />
      <PrivilegesSection onOpenModal={openModal} onOpenDetails={openDetailsModal} />
      <MembershipPath onOpenModal={openModal} />
      <HallOfFameSection onOpenModal={openModal} />
      <ChallengeRewardsSection onOpenModal={openModal} />
      <EALibrarySection />
      <ClosingSection onOpenModal={openModal} />
      <Footer />
    </div>
  );
}
