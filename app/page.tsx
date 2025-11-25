"use client";

import { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  animate
} from "framer-motion";
import { 
  Eye, 
  AlertTriangle, 
  Layers, 
  Tv, 
  Film, 
  Video, 
  Briefcase, 
  Activity, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle2,
  Play,
  DollarSign,
  Globe,
  Server,
  Mic,
  Camera,
  Radio,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

import dynamic from 'next/dynamic';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Load Three.js component only on client side
const ThreeDLogo = dynamic(() => import('./components/ThreeDLogo'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl">Loading 3D...</div>
});


// --- Types & Data ---
const SECTIONS = [
  { id: "hero", label: "Home", icon: Play },
  { id: "problem", label: "Problem", icon: AlertTriangle },
  { id: "vision", label: "Vision", icon: Eye },
  { id: "synergy", label: "Synergy", icon: RefreshCw },
  { id: "ecosystem", label: "Ecosystem", icon: Layers },
  { id: "dishhome-ott", label: "DishHome OTT", icon: Tv },
  { id: "blq-studios", label: "BLQ Studios", icon: Film },
  { id: "blq-agency", label: "BLQ Agency", icon: Briefcase },
  { id: "action-sports", label: "Action Sports", icon: Activity },
  { id: "sports-infra", label: "Sports Infra", icon: Video },
  { id: "financials", label: "Financials", icon: TrendingUp },
  { id: "team", label: "Team", icon: Users },
  { id: "edge-ask", label: "Edge & Ask", icon: Zap },
];

// --- Components ---

function Sidebar({ isOpen, setIsOpen, currentSection }: { isOpen: boolean, setIsOpen: (v: boolean) => void, currentSection: number }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
          />
          
          {/* Sidebar Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 z-70 p-8 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl font-bold text-primary tracking-tighter">BLQ Ventures</span>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto no-scrollbar space-y-2" style={{ touchAction: 'pan-y' }}>
              {SECTIONS.map((section, idx) => {
                const isActive = currentSection === idx;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      // Scroll to absolute position based on viewport height
                      window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group ${isActive ? 'bg-primary/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                  >
                    <section.icon size={18} className={isActive ? 'text-primary' : 'text-gray-600 group-hover:text-white transition-colors'} />
                    <span className={`text-sm font-serif uppercase tracking-widest ${isActive ? 'font-bold' : 'font-medium'}`}>{section.label}</span>
                    {isActive && <motion.div layoutId="activeDot" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10">
               <p className="text-xs text-gray-600 text-center font-mono">© 2025 BLQ Ventures</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ProgressBar({ progress }: { progress: any }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
      <motion.div style={{ scaleX: progress }} className="h-full bg-primary origin-left" />
    </div>
  );
}

function HeroOrbitingQ() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 300], [10, -10]); 
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ perspective: 1000 }}
    >
        <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* Orbiting Words */}
            <motion.div 
               className="absolute inset-0 z-20 pointer-events-none"
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
               {[
                  { text: "Create", angle: 0 },
                  { text: "Produce", angle: 90 },
                  { text: "Distribute", angle: 180 },
                  { text: "Monetise", angle: 270 }
               ].map((item, i) => (
                  <div 
                     key={i}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
                     style={{ transform: `translate(-50%, -50%) rotate(${item.angle}deg) translate(220px) rotate(-${item.angle}deg)` }}
                  >
                     <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-white font-sans tracking-wide text-sm shadow-xl"
                     >
                        {item.text}
                     </motion.div>
                  </div>
               ))}
            </motion.div>

            {/* Orbit Ring */}
            <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>

            {/* Central 3D Q based on logo shape */}
            <div className="relative w-full h-full z-10">
              <ThreeDLogo />
            </div>
        </div>
    </motion.div>
  );
}

// Interactive Engine Component - Circuit Board Style
function SynergyEngine() {
  const [status, setStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [showOutput, setShowOutput] = useState(false);

  const handleInput = () => {
    if (status === "processing") return;
    
    setStatus("processing");
    setActiveStep(-1);
    setShowOutput(false);
    
    // TIMING SEQUENCE (1s per step)
    // Step 0 (0s): Draw Input -> Studios
    setActiveStep(0);

    // Step 1 (1s): Light Studios & Draw Studios -> OTT
    setTimeout(() => setActiveStep(1), 1000);
    
    // Step 2 (2s): Light OTT & Draw OTT -> TV
    setTimeout(() => setActiveStep(2), 2000);
    
    // Step 3 (3s): Light TV & Draw TV -> Agency
    setTimeout(() => setActiveStep(3), 3000);
    
    // Step 4 (4s): Light Agency
    setTimeout(() => setActiveStep(4), 4000);
    
    // Complete
    setTimeout(() => {
      setShowOutput(true);
      setStatus("completed");
    }, 4500);
    
    // Reset
    setTimeout(() => {
      setStatus("idle");
      setActiveStep(-1);
      setShowOutput(false);
    }, 50000);
  };

  const nodes = [
    { id: 0, label: "Studios", color: "bg-primary", borderColor: "border-primary", glowColor: "shadow-[0_0_30px_rgba(239,68,68,0.6)]", icon: Film },
    { id: 1, label: "OTT", color: "bg-blue-500", borderColor: "border-blue-500", glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.6)]", icon: Tv },
    { id: 2, label: "TV", color: "bg-green-500", borderColor: "border-green-500", glowColor: "shadow-[0_0_30px_rgba(34,197,94,0.6)]", icon: Radio },
    { id: 3, label: "Agency", color: "bg-yellow-500", borderColor: "border-yellow-500", glowColor: "shadow-[0_0_30px_rgba(234,179,8,0.6)]", icon: Briefcase },
  ];

  return (
    <div className="relative w-full max-w-[1000px] flex flex-col items-center gap-4 md:gap-8 px-4">
      {/* Input Section */}
      <div className="flex flex-col items-center gap-4 shrink-0 relative z-20 mt-4 md:mt-0">
        <motion.button
          onClick={handleInput}
          disabled={status === "processing"}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-sans tracking-wide text-xs md:text-sm font-bold transition-all border-2 ${
            status === "completed"
              ? 'bg-green-900/20 border-green-500 text-green-400 cursor-pointer hover:bg-green-900/30'
              : status === "processing"
              ? 'bg-gray-900 border-gray-700 text-gray-500 cursor-wait' 
              : 'bg-black border-primary text-white hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] cursor-pointer'
          }`}
        >
          {status === "completed" ? "✓ System Active - Reset" : status === "processing" ? "⚡ Processing..." : "▶ Input: Capital & Talent"}
        </motion.button>
      </div>

      {/* --- DESKTOP LAYOUT (Horizontal Snake) --- */}
      <div className="hidden md:block relative w-full aspect-5/2 select-none">
         <DesktopCircuit activeStep={activeStep} nodes={nodes} />
      </div>

      {/* --- MOBILE LAYOUT (Vertical Snake) --- */}
      <div className="block md:hidden relative w-full aspect-350/520 select-none -my-4">
         <MobileCircuit activeStep={activeStep} nodes={nodes} />
      </div>

      {/* Output Section */}
      <div className="mt-2 md:mt-6 mb-8 md:mb-0 pt-8 md:pt-0 flex items-center justify-center">
        <AnimatePresence>
          {showOutput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto"
            >
              <div className="px-6 py-3 md:px-10 md:py-5 rounded-lg bg-green-500/10 border-2 border-green-500/50 text-green-400 font-sans tracking-wide text-xs md:text-lg font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Output: IP Rights
              </div>
              <div className="px-6 py-3 md:px-10 md:py-5 rounded-lg bg-blue-500/10 border-2 border-blue-500/50 text-blue-400 font-sans tracking-wide text-xs md:text-lg font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/> Output: Revenue
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Desktop Circuit Implementation ---
function DesktopCircuit({ activeStep, nodes }: { activeStep: number, nodes: any[] }) {
    const POSITIONS = {
        input: { x: 150, y: 0 },
        nodes: [
          { x: 150, y: 100 },  // Studios
          { x: 500, y: 300 },  // OTT
          { x: 750, y: 100 },  // TV
          { x: 900, y: 100 }   // Agency
        ]
    };

    return (
        <>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 400">
                <defs>
                    <filter id="glow-desktop" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Studios -> OTT (No input line - starts from Studios) */}
                <CircuitPath 
                    d={`M ${POSITIONS.nodes[0].x} ${POSITIONS.nodes[0].y + 40} L ${POSITIONS.nodes[0].x} 220 Q ${POSITIONS.nodes[0].x} 240 ${POSITIONS.nodes[0].x + 20} 240 L 480 240 Q 500 240 500 260 L ${POSITIONS.nodes[1].x} ${POSITIONS.nodes[1].y - 40}`}
                    isActive={activeStep >= 1} color="#3b82f6" filterId="glow-desktop"
                />

                {/* OTT -> TV */}
                <CircuitPath 
                    d={`M ${POSITIONS.nodes[1].x + 40} ${POSITIONS.nodes[1].y} L 600 300 Q 620 300 620 280 L 620 120 Q 620 100 640 100 L ${POSITIONS.nodes[2].x - 40} ${POSITIONS.nodes[2].y}`}
                    isActive={activeStep >= 2} color="#22c55e" filterId="glow-desktop"
                />

                {/* TV -> Agency (Yellow line) */}
                <CircuitPath 
                    d={`M ${POSITIONS.nodes[2].x + 40} ${POSITIONS.nodes[2].y} L ${POSITIONS.nodes[3].x - 40} ${POSITIONS.nodes[3].y}`}
                    isActive={activeStep >= 3} 
                    color="#eab308"
                    filterId="glow-desktop"
                />
            </svg>

            {POSITIONS.nodes.map((pos, i) => (
                <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: `${(pos.x / 1000) * 100}%`, top: `${(pos.y / 400) * 100}%` }}>
                    <CircuitNode node={nodes[i]} isActive={activeStep >= i + 1} isPulse={activeStep === i + 1} />
                </div>
            ))}
        </>
    );
}

// --- Mobile Circuit Implementation ---
function MobileCircuit({ activeStep, nodes }: { activeStep: number, nodes: any[] }) {
    const POSITIONS = {
        input: { x: 175, y: 0 },
        nodes: [
          { x: 100, y: 100 },  // Studios (Left)
          { x: 250, y: 220 },  // OTT (Right)
          { x: 100, y: 340 },  // TV (Left)
          { x: 250, y: 460 }   // Agency (Right)
        ]
    };

    return (
        <>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 350 520">
                <defs>
                    <filter id="glow-mobile" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Studios -> OTT (No input line - starts from Studios) */}
                <CircuitPath 
                    d={`M ${POSITIONS.nodes[0].x + 32} ${POSITIONS.nodes[0].y} L 175 ${POSITIONS.nodes[0].y} Q 195 ${POSITIONS.nodes[0].y} 195 ${POSITIONS.nodes[0].y + 20} L 195 ${POSITIONS.nodes[1].y - 20} Q 195 ${POSITIONS.nodes[1].y} 215 ${POSITIONS.nodes[1].y} L ${POSITIONS.nodes[1].x - 32} ${POSITIONS.nodes[1].y}`}
                    isActive={activeStep >= 1} color="#3b82f6" filterId="glow-mobile"
                />

                {/* OTT -> TV */}
                <CircuitPath 
                    d={`M ${POSITIONS.nodes[1].x - 32} ${POSITIONS.nodes[1].y} L 215 ${POSITIONS.nodes[1].y} L 175 ${POSITIONS.nodes[1].y} Q 155 ${POSITIONS.nodes[1].y} 155 ${POSITIONS.nodes[1].y + 20} L 155 ${POSITIONS.nodes[2].y - 20} Q 155 ${POSITIONS.nodes[2].y} 135 ${POSITIONS.nodes[2].y} L ${POSITIONS.nodes[2].x + 32} ${POSITIONS.nodes[2].y}`}
                    isActive={activeStep >= 2} color="#22c55e" filterId="glow-mobile"
                />

                {/* TV -> Agency (Yellow line) */}
                <CircuitPath 
                    d={`M ${POSITIONS.nodes[2].x + 32} ${POSITIONS.nodes[2].y} L 175 ${POSITIONS.nodes[2].y} Q 195 ${POSITIONS.nodes[2].y} 195 ${POSITIONS.nodes[2].y + 20} L 195 ${POSITIONS.nodes[3].y - 20} Q 195 ${POSITIONS.nodes[3].y} 215 ${POSITIONS.nodes[3].y} L ${POSITIONS.nodes[3].x - 32} ${POSITIONS.nodes[3].y}`}
                    isActive={activeStep >= 3} 
                    color="#eab308"
                    filterId="glow-mobile"
                />
            </svg>

            {POSITIONS.nodes.map((pos, i) => (
                <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: `${(pos.x / 350) * 100}%`, top: `${(pos.y / 520) * 100}%` }}>
                    <CircuitNode node={nodes[i]} isActive={activeStep >= i + 1} isPulse={activeStep === i + 1} isMobile={true} />
                </div>
            ))}
        </>
    );
}

// Sub-component for Paths: faint base line + animated colored overlay
function CircuitPath({
  d,
  isActive,
  color,
  strokeWidth = 3,
  filterId,
}: {
  d: string;
  isActive: boolean;
  color: string;
  strokeWidth?: number;
  filterId: string;
}) {
  return (
    <>
      {/* Base path (always visible, dim) */}
      <path
        d={d}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Active overlay (colored) */}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{
          filter: isActive ? `url(#${filterId})` : "none",
        }}
      />
    </>
  );
}

// Circuit Node Component
function CircuitNode({ node, isActive, isPulse, isMobile = false }: { node: any, isActive: boolean, isPulse: boolean, isMobile?: boolean }) {
  const Icon = node.icon;
  
  return (
    <motion.div
      animate={{ scale: isPulse ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-2 relative group"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{ 
          opacity: isActive ? 0.5 : 0,
          scale: isActive ? 1.2 : 0.8
        }}
        className={`absolute inset-0 rounded-xl ${node.color} blur-xl transition-all duration-500`}
      />
      
      {/* Main node box */}
      <div className={`
        relative ${isMobile ? 'w-14 h-14' : 'w-16 h-16 md:w-20 md:h-20'} 
        bg-black
        border-2 ${isActive ? node.borderColor : 'border-white/10'}
        rounded-xl
        flex items-center justify-center
        transition-all duration-500
        z-10
        ${isActive ? 'shadow-[0_0_15px_rgba(255,255,255,0.1)]' : ''}
      `}>
        <Icon className={`${isMobile ? 'w-6 h-6' : 'w-6 h-6 md:w-8 md:h-8'} transition-colors duration-500 ${
          isActive ? 'text-white' : 'text-gray-700'
        }`} />
        
        {/* Technical corner markers */}
        <div className={`absolute -top-1 -left-1 w-1.5 h-1.5 bg-black border border-gray-700 ${isActive ? node.borderColor : ''}`} />
        <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 bg-black border border-gray-700 ${isActive ? node.borderColor : ''}`} />
        <div className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-black border border-gray-700 ${isActive ? node.borderColor : ''}`} />
        <div className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-black border border-gray-700 ${isActive ? node.borderColor : ''}`} />
      </div>
      
      {/* Label */}
      <div className={`
        absolute top-full mt-2
        text-[10px] md:text-xs font-sans tracking-wide
        px-2 py-1 rounded-full bg-black border ${isActive ? node.borderColor : 'border-white/10'}
        transition-all duration-500 whitespace-nowrap z-20
        ${isActive ? 'text-white opacity-100 translate-y-0' : 'text-gray-600 opacity-50 -translate-y-1'}
      `}>
        {node.label}
      </div>
    </motion.div>
  );
}

// Helper to wrap sections in standard layout
// Mobile: content starts a bit below top, full-width; Desktop: centered "slide" feel
const SectionWrapper = ({
  id,
  children,
  className = "",
  style = {},
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <section
    id={id}
    style={{ ...style, width: '100vw' }}
    className={`
      shrink-0 h-screen
      flex flex-col
      items-stretch justify-start
      py-20
      md:px-24 md:py-24
      md:items-center md:justify-center
      relative overflow-hidden
      ${className}
    `}
  >
    <div className="w-full h-full px-4 md:px-0 flex flex-col items-stretch justify-start md:items-center md:justify-center">
      {children}
    </div>
  </section>
);

// Investment Carousel Component
function InvestmentCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 0,
      tag: "Agency Acquisition",
      tagColor: "bg-white/10 text-white",
      title: "BLQ Acquisition",
      amount: "5",
      unit: "Cr",
      unitColor: "text-gray-400",
      borderColor: "border-white/20 hover:border-white/40",
      glowColor: "",
      description: "Acquisition of BrandLogiq to become BLQ Agency, consolidating monetization capabilities across OTT, TV, and sports.",
      highlights: ["BrandLogiq", "BLQ Agency"],
      breakdown: [
        { label: "Acquisition Stake", value: "51%", bold: true },
        { label: "Investor Payout", value: "NPR 3 Cr", bold: false },
        { label: "Existing Shareholders", value: "NPR 2 Cr", bold: false }
      ],
      advantages: [
        { label: "Consolidation", desc: <>Full Agency<br/>Integration</>, icon: Briefcase },
        { label: "Monetization", desc: <>Cross-Platform<br/>Revenue</>, icon: TrendingUp },
        { label: "Existing", desc: <>Proven Track<br/>Record</>, icon: CheckCircle2 },
        { label: "Control", desc: <>51% Majority<br/>Stake</>, icon: Zap }
      ]
    },
    {
      id: 1,
      tag: "Build-Out",
      tagColor: "bg-primary/20 text-primary",
      title: "Infrastructure",
      amount: "19.2",
      unit: "Cr",
      unitColor: "text-primary",
      borderColor: "border-primary/30 hover:border-primary/60",
      glowColor: "hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]",
      description: "To build the infrastructure, content pipeline, and platforms for DishHome OTT and production ecosystem.",
      highlights: ["infrastructure", "content pipeline", "platforms"],
      breakdown: [
        "Equipment: 8.5 Cr",
        "Studios: 3 Cr",
        "Content: 5.5 Cr",
        "Platform: 1.2 Cr",
        "Marketing: 1 Cr"
      ],
      advantages: [
        { label: "First Mover", desc: <>Integrated<br/>Ecosystem</>, icon: Layers },
        { label: "Control", desc: <>End-to-End<br/>Ownership</>, icon: Server },
        { label: "Model", desc: <>Recurring<br/>Revenue</>, icon: TrendingUp },
        { label: "Asset", desc: <>Sports IP<br/>Rights</>, icon: Video }
      ]
    }
  ];

  const currentSlide = slides[activeSlide];

  return (
    <div className="relative z-10 w-full px-4 md:px-6 text-center flex flex-col items-center justify-center h-full gap-4 md:gap-8">
      
      {/* Header - Compact */}
      <div className="shrink-0 relative w-full">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl md:text-5xl font-bold font-serif text-white mb-2">Two Strategic Asks</h2>

            {/* Carousel Dots - desktop only (arrows on mobile) */}
            <div className="hidden md:flex items-center justify-center gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all duration-300 ${
                    activeSlide === idx 
                      ? 'w-8 h-2 bg-primary rounded-full' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50 rounded-full'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Page Indicator - Top Right on desktop */}
          <div className="hidden md:block absolute top-0 right-0 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <span className="text-primary text-xs md:text-sm font-mono font-bold">
              {activeSlide + 1} / {slides.length}
            </span>
          </div>
      </div>

      {/* Carousel Slide - Side by side layout with side arrows */}
      <div className="flex-1 w-full flex items-center justify-between gap-2 md:gap-4 lg:gap-12 min-h-0 px-1 md:px-4">
        {/* Left Arrow */}
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
          disabled={activeSlide === 0}
          className="shrink-0 p-2.5 md:p-4 lg:p-5 rounded-full border-2 border-white/20 hover:border-primary hover:bg-primary/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRight className="rotate-180 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 items-center"
          >
            {/* Left: Big Number */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className={`inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full ${currentSlide.tagColor} text-[10px] md:text-xs font-sans tracking-widest uppercase mb-2 md:mb-4`}>
                {currentSlide.tag}
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif text-white mb-2 md:mb-6">{currentSlide.title}</h3>
              
              <div className="inline-block">
                <h4 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white tracking-tight leading-none">
                  <span className="text-lg md:text-2xl lg:text-3xl text-gray-500 font-light mr-1 md:mr-2 align-baseline relative -bottom-0.5 md:-bottom-1">NPR</span>
                  {currentSlide.amount}
                  <span className={`text-3xl md:text-4xl lg:text-5xl ${currentSlide.unitColor} ml-1 md:ml-2`}>{currentSlide.unit}</span>
                </h4>
              </div>
            </div>

            {/* Right: Details */}
            <div className={`lg:col-span-3 border-2 ${currentSlide.borderColor} bg-black/50 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-5 lg:p-8 transition-all duration-500 ${currentSlide.glowColor} text-left`}>
              <p className="text-gray-300 text-xs md:text-sm lg:text-base font-light leading-relaxed mb-3 md:mb-5">
                {currentSlide.description.split(new RegExp(`(${currentSlide.highlights.join('|')})`, 'gi')).map((part, i) => 
                  currentSlide.highlights.some((h: string) => h.toLowerCase() === part.toLowerCase()) 
                    ? <span key={i} className="text-white font-medium">{part}</span>
                    : part
                )}
              </p>
              
              <div className="h-px w-full bg-white/10 mb-3 md:mb-4"></div>
              
              {/* Breakdown Section */}
              <div className="space-y-2 md:space-y-2.5">
                {currentSlide.breakdown.map((item: any, i: number) => (
                  typeof item === 'string' ? (
                    <div key={i} className="flex items-center gap-2 text-[11px] md:text-xs lg:text-sm text-gray-400">
                      <div className={`w-1 md:w-1.5 h-1 md:h-1.5 ${activeSlide === 1 ? 'bg-primary' : 'bg-white/50'} rounded-full shrink-0`}></div>
                      <span>{item}</span>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-between items-center text-[11px] md:text-xs lg:text-sm gap-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className={`text-white ${item.bold ? 'font-bold text-xs md:text-sm lg:text-base' : ''}`}>{item.value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={() => setActiveSlide((prev) => (prev === 1 ? 0 : 1))}
          disabled={activeSlide === 1}
          className="shrink-0 p-2.5 md:p-4 lg:p-5 rounded-full border-2 border-white/20 hover:border-primary hover:bg-primary/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
        </button>
        </div>

      {/* Bottom Grid - compact 2x2 on mobile, 4 across on desktop */}
      <div className="shrink-0 w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`advantages-${activeSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {currentSlide.advantages.map((item: any, i: number) => (
              <div
                key={i}
                className="group border border-white/10 hover:border-primary/50 bg-white/5 hover:bg-primary/10 px-3 py-3 md:px-4 md:py-4 rounded-lg md:rounded-xl transition-all duration-500 flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm"
              >
                <item.icon className="text-gray-500 group-hover:text-white w-4 h-4 md:w-5 md:h-5 transition-colors" />
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-primary text-[9px] md:text-[11px] font-sans tracking-widest uppercase group-hover:text-white transition-colors font-bold">
                    {item.label}
                  </span>
                  <span className="text-white text-[11px] md:text-xs lg:text-sm font-serif font-medium text-center leading-tight">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile page indicator under content */}
      <div className="md:hidden flex items-center justify-center -mt-1">
        <span className="text-primary text-xs font-mono font-bold">
          {activeSlide + 1} / {slides.length}
        </span>
      </div>

    </div>
  );
}

// --- Main Page Component ---

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [activeActionIndex, setActiveActionIndex] = useState<number | null>(0);
  const [vpWidth, setVpWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setVpWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Disable scroll when sidebar or modal is open
  useEffect(() => {
    if (isSidebarOpen || manifestoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, manifestoOpen]);
  
  // Native scroll hook from Framer Motion
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll (0 to 1) to horizontal translation
  // We use vw units directly to ensure perfect alignment regardless of device pixel width or scrollbar quirks.
  // The container width is exactly SECTIONS.length * 100vw.
  // We want to move from 0 to -((SECTIONS.length - 1) * 100)vw.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(SECTIONS.length - 1) * 100}vw`]);
  
  // STICKY SNAPPING LOGIC (Desktop)
  const smoothX = useSpring(x, { 
    stiffness: 150, 
    damping: 25,    
    mass: 0.5         
  });

  // MOBILE LOGIC: Driven strictly by index for perfect alignment
  // We decouple this from scroll pixels to avoid address-bar drift issues.
  const targetIndex = useMotionValue(0);
  const smoothIndex = useSpring(targetIndex, { stiffness: 150, damping: 25, mass: 0.5 });
  const mobileX = useTransform(smoothIndex, (v) => `-${v * 100}vw`);

  useEffect(() => {
    if (isMobile) {
      targetIndex.set(currentSectionIndex);
    }
  }, [currentSectionIndex, isMobile, targetIndex]);

  // Snap logic on scroll end
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScrollEnd = () => {
      const viewportHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      const sectionIndex = Math.round(currentScroll / viewportHeight);
      
      // Snap to the nearest section if we're not already there
      const targetScroll = sectionIndex * viewportHeight;
      
      // Only snap if we're close enough (avoid snapping when user intended to scroll past)
      if (Math.abs(currentScroll - targetScroll) > 5) {
         window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    };

    const onScroll = () => {
      clearTimeout(timeoutId);
      // Wait for scroll to stop (100ms) before snapping
      timeoutId = setTimeout(handleScrollEnd, 100);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const viewportHeight = window.innerHeight;
      const index = Math.round(latest / viewportHeight);
      if (index !== currentSectionIndex && index < SECTIONS.length) {
        setCurrentSectionIndex(index);
      }
    });
    return () => unsubscribe();
  }, [scrollY, currentSectionIndex]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // If we are inside a scrollable element, allow propagation (so inner content scrolls)
      // Otherwise prevent default to stop the whole page from scrolling vertically
      let target = e.target as HTMLElement;
      let isScrollable = false;
      
      while (target && target !== document.body) {
        // Check if element is vertically scrollable
        if (target.scrollHeight > target.clientHeight) {
          const overflowY = window.getComputedStyle(target).overflowY;
          if (overflowY === 'auto' || overflowY === 'scroll') {
            isScrollable = true;
            break;
          }
        }
        target = target.parentElement as HTMLElement;
      }

      if (!isScrollable) {
         e.preventDefault(); // Block native vertical scroll on the page root
      }
    };
    
    // Use passive: false to allow preventDefault
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // --- Mobile Swipe Handler ---
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigating) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      // If horizontal swipe is dominant and significant
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        const direction = diffX > 0 ? 1 : -1; // 1 = next (swipe left), -1 = prev (swipe right)
        const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), SECTIONS.length - 1);
        
        if (nextIndex !== currentSectionIndex) {
            setIsNavigating(true);
            
            // Calculate exact scroll target based on strict viewport height units
            // Using window.innerHeight ensures we match the browser's current visible height calculation
            const targetScroll = nextIndex * window.innerHeight;
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });

            // Reset navigation lock after animation duration approx
            setTimeout(() => setIsNavigating(false), 600);
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSectionIndex, isNavigating]);

  return (
    <div 
      ref={containerRef} 
      className="bg-black text-foreground font-sans selection:bg-primary selection:text-white relative"
      style={{ touchAction: 'none' }} // Disable native browser scrolling/zooming
    >
      
      {/* --- Fixed UI Elements --- */}
      
      <ProgressBar progress={scrollYProgress} />

      {/* Top Bar (Logo + Menu Trigger) */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 md:px-8 md:pt-8 md:pb-12 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto"
        >
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif font-bold text-white tracking-tighter mix-blend-difference hover:opacity-80 transition-opacity flex flex-col items-start leading-none">
             <span className="text-xl md:text-2xl">BLQ<span className="text-primary">.</span></span>
             <span className="text-[6px] md:text-[8px] text-gray-400 tracking-wider">VENTURES</span>
           </button>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setSidebarOpen(true)}
          className="pointer-events-auto bg-white/10 hover:bg-primary hover:text-white backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 group border border-white/5"
        >
          <Menu size={24} className="group-hover:rotate-180 transition-transform duration-500" />
        </motion.button>
      </header>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} currentSection={currentSectionIndex} />

      {/* Manifesto Modal */}
      <AnimatePresence>
        {manifestoOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setManifestoOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-100"
            />
            
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[85vh] bg-black border-2 border-primary/30 rounded-2xl z-101 overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.3)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setManifestoOpen(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
              >
                <X size={32} />
              </button>

              {/* Content */}
              <div className="p-8 md:p-16 overflow-y-auto max-h-[85vh] no-scrollbar" style={{ touchAction: 'pan-y' }}>
                {/* Header */}
                <div className="mb-8 md:mb-12">
                  <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-sans tracking-wide mb-4">
                    Our Manifesto
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-4 leading-tight">
                    Beyond Borders.<br/>
                    United by Language.
                  </h2>
                  <div className="h-1 w-24 bg-primary"></div>
                </div>

                {/* Body */}
                <div className="space-y-6 md:space-y-8 text-gray-300 leading-relaxed">
                  <p className="text-lg md:text-xl font-light">
                    Algorithms have shattered our borders. Geography no longer defines culture. <span className="text-white font-normal">Language does</span>.
                  </p>

                  <p className="text-base md:text-lg">
                    The Nepali language and its culture are ready to be exported. The signs are everywhere. Our music is crossing continents, our stories resonate globally. We are on the cusp of becoming a <span className="text-primary font-semibold">soft power and content powerhouse</span>.
                  </p>

                  <p className="text-base md:text-lg">
                    The younger generation is not in a saving mindset anymore. <span className="text-white font-semibold">They are spreading their wings</span>. They are out there, consuming, creating, connecting. This is the <span className="text-white">coming of age moment for Nepal</span>, and we are going to be part of it.
                  </p>

                  <p className="text-base md:text-lg">
                    But if we don't capitalize on this moment, <span className="text-white">someone else will</span>. Or worse, the conversation never takes off. <span className="text-white font-semibold">Both are unacceptable</span>.
                  </p>

                  <div className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r">
                    <p className="text-base md:text-lg italic font-serif text-white">
                      "We need to forget about arbitrary lines and unite around language."
                    </p>
                  </div>

                  <p className="text-base md:text-lg">
                    This is not just about Nepal within its borders. This is about <span className="text-white">the entire diaspora</span>. Sikkim, Darjeeling, Bhutan, and every Nepali-speaking expat abroad. We share cultural resemblance, linguistic identity, and creative potential.
                  </p>

                  <p className="text-base md:text-lg">
                    <span className="text-white font-semibold">DishHome OTT</span> will be the platform that brings this vision to life. Content created by Nepalis, for Nepalis. <span className="text-white">Wherever they are</span>.
                  </p>

                  <div className="pt-6 mt-8 border-t border-white/10">
                    <p className="text-sm md:text-base text-gray-500 font-sans">
                      The time is now. The infrastructure is being built. The ecosystem is uniting.
                    </p>
                    <p className="text-lg md:text-xl text-white font-serif mt-4">
                      This is our moment to define the future of Nepali content. Globally.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navigation Dots (Right Side) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {SECTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSectionIndex ? 'bg-primary h-6' : 'bg-white/20 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* --- Horizontal Scroll Container --- */}
      <div className="fixed top-0 left-0 h-screen w-full overflow-hidden bg-black">
        <motion.div 
          style={{ 
            x: isMobile ? mobileX : smoothX, 
            width: `${SECTIONS.length * 100}vw`,
          } as any} 
          className="flex h-full"
        >
          
          {/* 1. Hero */}
          <SectionWrapper id="hero" className="bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-30 animate-pulse"></div>
            
            {/* 3D Interactive Element - Centered and Large */}
            <div className="relative w-full h-full flex items-center justify-center perspective-1000 z-20">
               <div className="w-full h-full md:w-[80vw] md:h-[80vh] relative">
                  <ThreeDLogo />
                  
                  {/* Overlay Floating Text */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      {/* Top Left - Create (Higher, wider) */}
                      <div className="absolute top-[15%] left-[5%] md:left-[15%] animate-float-slow">
                          <span className="text-white font-serif text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl">Create</span>
                      </div>
                      
                      {/* Top Right - Produce (Lower, tighter) */}
                      <div className="absolute top-[30%] right-[5%] md:right-[12%] animate-float-medium">
                          <span className="text-white font-serif text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl">Produce</span>
                      </div>

                      {/* Bottom Left - Distribute (Higher, wider) */}
                      <div className="absolute bottom-[30%] left-[2%] md:left-[8%] animate-float-fast">
                          <span className="text-white font-serif text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl">Distribute</span>
                      </div>

                      {/* Bottom Right - Monetise (Lower, tighter) */}
                      <div className="absolute bottom-[15%] right-[8%] md:right-[18%] animate-float-delayed">
                          <span className="text-white font-serif text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl">Monetise</span>
                      </div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 w-full text-center px-4 pt-8 md:pt-0">
                <p className="text-xl md:text-2xl text-gray-400 font-serif italic font-light tracking-wide">
                    "No middlemen. No leakage. No dependency."
                </p>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
                <button onClick={() => window.scrollTo({ top: 1 * window.innerHeight, behavior: 'smooth' })} className="group flex flex-row items-center gap-2 text-white/50 hover:text-white text-xs font-sans tracking-wide transition-colors">
                  <span className="md:hidden">Drag to Explore</span>
                  <span className="hidden md:inline">Scroll to Explore</span>
                  <ArrowRight className="md:rotate-90 group-hover:translate-x-1 md:group-hover:translate-x-0 md:group-hover:translate-y-1 transition-transform" size={16} />
                </button>
            </div>
          </SectionWrapper>

          {/* 2. Problem */}
          <SectionWrapper id="problem" className="bg-[#050505] border-l border-white/5">
            <div className="max-w-[90vw] w-full h-full flex flex-col justify-center">
               <div className="mb-8 md:mb-20 border-b border-white/10 pb-4 md:pb-8">
                  <h2 className="text-4xl md:text-8xl font-serif font-bold text-white">The Problem</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 overflow-y-auto md:overflow-visible pr-2 md:pr-0 no-scrollbar flex-1" style={{ touchAction: 'pan-y' }}>
                  {[
                    { title: "Foreign Dependence", desc: "Relying on expensive foreign production.", icon: Globe },
                    { title: "Fragmentation", desc: "Disconnected OTT, TV, and Agency.", icon: Layers },
                    { title: "Missing Infra", desc: "Sports growing, but tech is missing.", icon: Video },
                    { title: "No Dominant OTT", desc: "Rising consumption, no local leader.", icon: Tv },
                    { title: "Broken Distribution", desc: "Nepali content inaccessible globally with delayed, fragmented releases.", icon: Film },
                    { title: "Inefficient Buying", desc: "Brands forced to buy separately.", icon: DollarSign },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 p-6 md:p-12 group hover:bg-primary transition-colors duration-500 cursor-default shrink-0">
                       <item.icon size={32} className="text-gray-500 group-hover:text-white mb-4 md:mb-8 transition-colors md:w-12 md:h-12" />
                       <h3 className="text-xl md:text-3xl font-serif font-bold text-white mb-2 md:mb-4">{item.title}</h3>
                       <p className="text-gray-400 group-hover:text-white/90 text-sm md:text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </SectionWrapper>

          {/* 2.5. Vision (New) */}
          <SectionWrapper id="vision" className="bg-black border-l border-white/5 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-primary/10 via-black to-black"></div>
             <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
             
             {/* Huge Watermark */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 font-sans pointer-events-none select-none whitespace-nowrap">
                VISION
             </div>

            <div className="max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-16 items-center overflow-y-auto md:overflow-visible no-scrollbar h-full md:h-auto py-8" style={{ touchAction: 'pan-y' }}>
               
               {/* Visual Abstract - First on Mobile, Second on Desktop */}
               <div className="lg:col-span-5 relative flex justify-center order-1 lg:order-2">
                    <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] relative">
                       {/* Central Hub - Clickable Globe */}
                       <motion.button
                          onClick={() => setManifestoOpen(true)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center z-20 shadow-[0_0_50px_rgba(255,255,255,0.2)] cursor-pointer animate-pulse active:animate-none md:hover:animate-none transition-all"
                       >
                          <Globe className="text-black w-8 h-8 md:w-12 md:h-12" />
                       </motion.button>
                       
                       {/* Orbit Ring */}
                       <div className="absolute inset-0 border border-white/10 rounded-full"></div>
                       <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
                       
                       {/* Rotating Container for Satellites */}
                       <motion.div 
                          className="absolute inset-0"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       >
                          {[
                             { icon: Tv, label: "OTT", top: 0, left: '50%' },
                             { icon: Film, label: "Studios", top: '50%', left: '100%' },
                             { icon: Briefcase, label: "Agency", top: '100%', left: '50%' },
                             { icon: Activity, label: "Sports", top: '50%', left: 0 },
                          ].map((item, i) => (
                             <div 
                                key={i}
                                className="absolute w-16 h-16 md:w-24 md:h-24 -ml-8 -mt-8 md:-ml-12 md:-mt-12 flex items-center justify-center"
                                style={{ top: item.top, left: item.left }}
                             >
                                <motion.div 
                                   className="w-12 h-12 md:w-20 md:h-20 bg-black/80 border border-white/20 backdrop-blur-md rounded-xl flex flex-col items-center justify-center shadow-2xl"
                                   animate={{ rotate: -360 }}
                                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                   <item.icon className="text-white mb-1 md:mb-2 w-3 h-3 md:w-5 md:h-5" />
                                   <span className="text-[7px] md:text-[10px] font-sans tracking-wide text-gray-400">{item.label}</span>
                                </motion.div>
                             </div>
                          ))}
                       </motion.div>
                    </div>
                </div>

               {/* Text Content - Second on Mobile, First on Desktop */}
               <div className="lg:col-span-7 order-2 lg:order-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                  >
                     <div className="flex items-center gap-4 mb-4 md:mb-8 justify-center lg:justify-start">
                        <div className="w-16 h-[2px] bg-primary"></div>
                        <span className="text-primary font-sans tracking-[0.3em] text-sm">The Masterplan</span>
                     </div>
                     <h2 className="text-4xl md:text-8xl font-bold font-serif text-white mb-6 md:mb-10 leading-[0.9]">
                         Nepal's<br/>
                         Next-Gen <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-600">Media Infrastructure.</span>
                      </h2>
                     <p className="text-lg md:text-2xl text-gray-400 leading-relaxed mb-8 md:mb-12 font-light max-w-2xl mx-auto lg:mx-0">
                        We are building the <span className="text-white font-normal">backbone</span> of the industry. A unified ecosystem eliminating fragmentation and foreign dependency forever.
                     </p>
                     
                     <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
                        {["Unified Pipeline", "Self-Sufficient", "Global Scale"].map((tag, i) => (
                           <div key={i} className="px-4 py-2 md:px-6 md:py-3 border border-white/10 rounded-full text-xs md:text-sm font-sans tracking-wide text-gray-400 hover:border-primary hover:text-white transition-colors bg-white/5 backdrop-blur-sm cursor-default">
                              {tag}
                           </div>
                        ))}
                     </div>
                  </motion.div>
               </div>

             </div>
          </SectionWrapper>

          {/* 3. Synergy */}
          <SectionWrapper id="synergy" className="bg-black border-l border-white/5">
             <div className="max-w-6xl w-full text-center relative h-full flex flex-col justify-start md:justify-center items-center px-4 md:px-8 gap-8 md:gap-12 overflow-y-auto md:overflow-visible no-scrollbar py-8" style={{ touchAction: 'pan-y' }}>
                <div className="shrink-0">
                   <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-3 md:mb-4">The Circular Engine</h2>
                   <p className="text-base md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                      Capital and talent are transformed by <span className="text-white">Studios</span>, <span className="text-white">OTT</span>, <span className="text-white">TV</span>, and <span className="text-white">Agency</span> into IP and revenue.
                   </p>
                </div>
                
                <SynergyEngine />
                
                <div className="text-[10px] md:text-xs font-mono text-gray-600 uppercase tracking-widest shrink-0">
                   Click "Input" to watch the engine process capital into value
                </div>
             </div>
          </SectionWrapper>

          {/* 4. Ecosystem */}
          <SectionWrapper id="ecosystem" className="bg-black border-l border-white/5">
             <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[80vw] h-[80vw] border border-white/10 rounded-full"></div>
                <div className="absolute w-[60vw] h-[60vw] border border-white/10 rounded-full"></div>
             </div>
             <div className="max-w-7xl w-full h-full flex flex-col justify-center relative z-10 text-center px-4 md:px-0">
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6">The Ecosystem</h2>
                <p className="text-xl md:text-2xl text-gray-500 mb-10 md:mb-20 font-light">Four pillars. One powerhouse.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 overflow-y-auto md:overflow-visible flex-1 md:flex-none pb-4" style={{ touchAction: 'pan-y' }}>
                   {[
                      { title: "DishHome OTT", sub: "Hub", icon: Tv, bg: "hover:bg-blue-900/20 hover:border-blue-500", img: `${BASE_PATH}/dishome.png`, sectionIndex: 5 },
                      { title: "BLQ Studios", sub: "Production", icon: Film, bg: "hover:bg-orange-900/20 hover:border-orange-500", img: `${BASE_PATH}/blqstudios.png`, sectionIndex: 6 },
                      { title: "BLQ Agency", sub: "Monetisation", icon: Briefcase, bg: "hover:bg-green-900/20 hover:border-green-500", img: `${BASE_PATH}/blqagency.png`, sectionIndex: 7 },
                      { title: "Action Sports", sub: "Broadcast", icon: Activity, bg: "hover:bg-red-900/20 hover:border-red-500", img: `${BASE_PATH}/actionsports.png`, sectionIndex: 8 },
                   ].map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => window.scrollTo({ top: item.sectionIndex * window.innerHeight, behavior: 'smooth' })}
                        className={`aspect-4/5 border border-white/10 bg-white/5 p-4 md:p-8 flex flex-col justify-between transition-all duration-300 group cursor-pointer ${item.bg} relative overflow-hidden`}
                      >
                         {/* Background Image */}
                         <div 
                           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                           style={{ backgroundImage: `url('${item.img}')` }}
                         />
                         <div className="relative z-10 flex justify-between items-start">
                            <span className="font-mono text-xs text-gray-500">0{idx+1}</span>
                            <item.icon className="text-gray-400 group-hover:text-white transition-colors w-6 h-6 md:w-8 md:h-8" />
                         </div>
                         <div className="text-left relative z-10">
                            <h3 className="text-xl md:text-3xl font-bold font-serif text-white mb-1 md:mb-2">{item.title}</h3>
                            <p className="text-[10px] md:text-xs font-sans tracking-wide text-gray-500 group-hover:text-primary transition-colors">{item.sub}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </SectionWrapper>

          {/* 5. DishHome OTT */}
          <SectionWrapper id="dishhome-ott" className="bg-[#0a0a0a] border-l border-white/5 relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 h-full items-center relative z-10 overflow-y-auto md:overflow-visible no-scrollbar py-8" style={{ touchAction: 'pan-y' }}>
                {/* Left Content */}
                <div className="space-y-6 md:space-y-12">
                   <div>
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                         <div className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-sans tracking-wide">
                            The Super-App
                         </div>
                      </div>
                      <h2 className="text-5xl md:text-8xl font-serif font-bold text-white leading-none mb-4 md:mb-6">
                         DishHome <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">OTT</span>
                      </h2>
                      <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-md">
                         Transforming from DTH to a Netflix-style ecosystem with 11 content verticals driving recurring revenue.
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-4 md:pt-8">
                      {[
                         { label: "Revenue", value: "Subscription + Ads" },
                         { label: "Growth", value: "11 Verticals" },
                         { label: "Exclusive", value: "Originals & Sports" },
                         { label: "Tech", value: "Data-Driven" },
                      ].map((stat, i) => (
                         <div key={i}>
                            <div className="text-xs md:text-sm text-gray-500 font-sans tracking-wide mb-1">{stat.label}</div>
                            <div className="text-white font-serif text-lg md:text-xl">{stat.value}</div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Right Grid - Modern Cards */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 relative pb-8 md:pb-0">
                   {/* Decorative backdrop element */}
                   <div className="absolute -inset-4 bg-white/5 rounded-3xl -z-10 rotate-3 scale-105 opacity-50"></div>
                   
                   {[
                      { name: "Sports", icon: Activity, col: "text-primary" },
                      { name: "Movies", icon: Film, col: "text-blue-400" }, 
                      { name: "News", icon: Globe, col: "text-white" },
                      { name: "Kids", icon: Zap, col: "text-yellow-400" },
                      { name: "Music", icon: Radio, col: "text-purple-400" },
                      { name: "Gaming", icon: Zap, col: "text-green-400" },
                      { name: "Learning", icon: Server, col: "text-pink-400" },
                      { name: "Regional", icon: Globe, col: "text-orange-400" },
                      { name: "Lifestyle", icon: Camera, col: "text-teal-400" },
                   ].map((item, i) => (
                      <div key={i} className="aspect-square bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-4 transition-all duration-300 group cursor-default backdrop-blur-sm p-2">
                         <item.icon size={24} className={`${item.col} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 md:w-8 md:h-8`} />
                         <span className="text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-white font-sans tracking-wide text-center">{item.name}</span>
                      </div>
                   ))}
                </div>
             </div>
          </SectionWrapper>

          {/* 6. BLQ Studios */}
          <SectionWrapper id="blq-studios" className="bg-black border-l border-white/5">
             <div className="max-w-7xl w-full flex flex-col h-full justify-center px-4 md:px-0">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-12">
                   <div className="w-full md:w-auto">
                      <div className="flex items-center gap-3 mb-2 md:mb-4">
                         <div className="w-12 h-1 bg-primary"></div>
                         <span className="text-primary font-sans tracking-wide text-sm md:text-base">Production Powerhouse</span>
                      </div>
                      <h2 className="text-5xl md:text-9xl font-bold text-white font-serif">BLQ Studios</h2>
                   </div>
                   <div className="text-left md:text-right mt-4 md:mt-0 w-full md:w-auto">
                      <div className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest mb-1">Capacity</div>
                      <div className="text-xl md:text-3xl text-primary font-bold">3 Specialized Units</div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[60vh] overflow-y-auto md:overflow-visible no-scrollbar pb-4" style={{ touchAction: 'pan-y' }}>
                   {[
                      { 
                        name: "Studio A", 
                        use: "Info Shows & Podcasts", 
                        size: "800 sq ft",
                        desc: "LED Walls • PTZ Ecosystem • Talk Sets",
                        img: `${BASE_PATH}/StudioA.png`
                      },
                      { 
                        name: "Studio B", 
                        use: "Comedy & Reality", 
                        size: "1500 sq ft",
                        desc: "Modular Sets • RGB Lighting • Multi-Format",
                        img: `${BASE_PATH}/StudioB.png`
                      },
                      { 
                        name: "Studio C", 
                        use: "Soundstage", 
                        size: "3000 sq ft",
                        desc: "Acoustic Treatment • Full Set Construction • Cinema Grade",
                        img: `${BASE_PATH}/StudioC.png`
                      },
                   ].map((studio, idx) => (
                      <div key={idx} className="relative group overflow-hidden rounded-sm border border-white/10 bg-white/5 h-64 md:h-auto shrink-0">
                         {/* Background Image */}
                         <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-70 grayscale group-hover:grayscale-0"
                            style={{ backgroundImage: `url('${studio.img}')` }}
                         />
                         
                         {/* Gradient Overlay */}
                         <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                         {/* Content */}
                         <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                               <span className="text-3xl md:text-4xl font-serif font-bold text-white/20 group-hover:text-primary transition-colors">0{idx+1}</span>
                               <div className="px-2 py-1 md:px-3 md:py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] md:text-xs font-mono text-white">
                                  {studio.size}
                               </div>
                            </div>
                            
                            <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                               <h3 className="text-2xl md:text-3xl font-bold text-white font-serif mb-1 md:mb-2">{studio.name}</h3>
                               <div className="h-1 w-12 bg-primary mb-2 md:mb-4 transition-all duration-500 group-hover:w-full"></div>
                               <p className="text-white font-medium text-base md:text-lg mb-1">{studio.use}</p>
                               <p className="text-gray-400 text-xs md:text-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{studio.desc}</p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </SectionWrapper>

          {/* 8. BLQ Agency */}
          <SectionWrapper id="blq-agency" className="bg-white text-black border-l border-black/5">
             <div className="max-w-6xl w-full text-center flex flex-col h-full justify-center px-4 md:px-0">
                <div className="mb-8 md:mb-16 shrink-0">
                   <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`${BASE_PATH}/blq-agency-logo.png`}
                        alt="BLQ Agency Logo" 
                        className="w-full h-full object-contain"
                      />
                   </div>
                   <h2 className="text-5xl md:text-9xl font-bold font-serif mb-4 md:mb-6">BLQ Agency</h2>
                   <p className="text-lg md:text-2xl text-gray-600 italic font-serif">"Turning Attention into Revenue"</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 overflow-y-auto md:overflow-visible no-scrollbar pb-4" style={{ touchAction: 'pan-y' }}>
                   {["Sponsorship", "Ad Sales", "Brand Mgmt", "Integration", "Creative", "Influencers"].map((item, i) => (
                      <div key={i} className="border-t border-black p-4 md:p-8 text-left hover:bg-black hover:text-white transition-colors duration-500 group cursor-default shrink-0">
                         <div className="text-[10px] md:text-xs font-mono mb-2 md:mb-4 text-gray-400 group-hover:text-primary">0{i+1}</div>
                         <div className="text-xl md:text-3xl font-bold font-serif">{item}</div>
                      </div>
                   ))}
                </div>
             </div>
          </SectionWrapper>

          {/* 9. Action Sports */}
          <SectionWrapper id="action-sports" className="bg-primary border-l border-black/5 relative">
             {/* Background Image */}
             <div 
               className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
               style={{ backgroundImage: `url('${BASE_PATH}/Action-sports-bg.jpeg')` }}
             />
             <div className="max-w-[95vw] w-full relative z-10 h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-6 md:p-12 hidden md:block">
                   <div className="text-9xl font-black text-black/10 font-sans">24/7</div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center h-full overflow-y-auto md:overflow-visible no-scrollbar py-8" style={{ touchAction: 'pan-y' }}>
                   <div className="shrink-0">
                      <div className="inline-flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full text-xs font-bold mb-4 md:mb-8">
                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> LIVE
                      </div>
                      <h2 className="text-6xl md:text-[10rem] font-black text-black leading-[0.85] tracking-tighter mb-4 md:mb-8">
                         ACTION <br/> SPORTS
                      </h2>
                     <p className="text-xl md:text-2xl font-bold text-black/60 font-serif mb-4 md:mb-6">
                        Nepal's Premier National <span className="whitespace-nowrap">Sports Channel.</span>
                     </p>
                   </div>

                   <div className="space-y-2 md:space-y-4 shrink-0">
                      {[
                         {
                           title: "TV Advertising",
                           desc: "Mass Reach",
                           body: "Sports is one of the last true appointment-viewing formats. Ads cannot be skipped, families watch together, and brands still plan GRPs around live telecasts. A national sports channel gives Nepali brands a premium, time-bound inventory they cannot get on digital alone."
                         },
                         {
                           title: "OTT Funnel",
                           desc: "Conversion",
                           body: "Linear drives awareness, OTT captures depth. Every broadcast can point to extended highlights, behind-the-scenes, and second-screen experiences on DishHome OTT. The channel becomes a free top-of-funnel that constantly pushes viewers into a measurable, subscription-first product."
                         },
                         {
                           title: "Live Events",
                           desc: "Engagement",
                           body: "A dedicated sports channel justifies producing and owning more local tournaments – schools, colleges, districts, and franchise leagues. This creates new IP, new ticketing and sponsorship revenue, and gives fans a reason to tune in every week."
                         }
                      ].map((card, i) => {
                        const isOpen = activeActionIndex === i;
                        return (
                          <motion.div
                            key={i}
                            onClick={() => setActiveActionIndex(isOpen ? null : i)}
                            className="bg-black text-white cursor-pointer rounded-lg md:rounded-xl overflow-hidden"
                            initial={false}
                          >
                            <div className="flex justify-between items-center px-6 md:px-8 py-4 md:py-5">
                              <div>
                                <h3 className="text-lg md:text-2xl font-bold font-serif">{card.title}</h3>
                                <p className="text-gray-400 text-xs md:text-sm font-sans">{card.desc}</p>
                              </div>
                              <motion.div
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ArrowRight className="text-primary w-4 h-4 md:w-5 md:h-5" />
                              </motion.div>
                            </div>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="content"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25, ease: "easeOut" }}
                                  className="px-6 md:px-8 pb-4 md:pb-6 text-xs md:text-sm text-gray-200 font-sans leading-relaxed border-t border-white/10"
                                >
                                  {card.body}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                   </div>
                </div>
             </div>
          </SectionWrapper>

          {/* 10. Sports Infra */}
          <SectionWrapper id="sports-infra" className="bg-[#080808] border-l border-white/5">
             <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
                {/* Left Visual - Equipment Image */}
                <div className="relative aspect-square lg:aspect-auto lg:h-full w-full flex items-center justify-center bg-black shrink-0 overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img 
                      src={`${BASE_PATH}/Equipment.png`}
                      alt="Broadcast Equipment Stack" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                   />
                   <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50"></div>
                   <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-10">
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">Sports Infrastructure</h2>
                      <p className="text-base md:text-xl text-primary font-sans tracking-wide">Professional Grade Equipment</p>
                   </div>
                </div>
                
                {/* Right Specs */}
                <div className="p-6 md:p-24 flex flex-col justify-center bg-black overflow-y-auto no-scrollbar" style={{ touchAction: 'pan-y' }}>
                   <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 md:mb-12">Broadcast Stack</h3>
                   <div className="space-y-0">
                      {[
                         { l: "Replay", r: "EVS XT-VIA" },
                         { l: "Graphics", r: "Vizrt / WASP 3D" },
                         { l: "Cameras", r: "Sony HDC-4300" },
                         { l: "Lenses", r: "95x Box Lens" },
                         { l: "Audio", r: "Field Mics + Booth" },
                      ].map((spec, i) => (
                         <div key={i} className="flex justify-between py-4 md:py-6 border-b border-white/10 hover:pl-4 transition-all cursor-default">
                            <span className="text-gray-500 font-sans text-xs md:text-sm">{spec.l}</span>
                            <span className="text-white font-serif text-lg md:text-xl text-right pl-4">{spec.r}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </SectionWrapper>

          {/* 11. Financials */}
          <SectionWrapper id="financials" className="bg-[#050505] border-l border-white/5">
             <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 overflow-y-auto md:overflow-visible no-scrollbar h-full py-8 items-center" style={{ touchAction: 'pan-y' }}>
                <div className="shrink-0">
                   <h2 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 md:mb-12">Financials</h2>
                   <div className="flex gap-8 md:gap-16 mb-8 md:mb-16">
                      <div>
                         <div className="text-5xl md:text-7xl font-bold text-white font-serif mb-2">30</div>
                         <div className="text-xs md:text-sm text-gray-500 font-sans tracking-wide">Month Break-even</div>
                      </div>
                      <div>
                         <div className="text-5xl md:text-7xl font-bold text-primary font-serif mb-2">40%</div>
                         <div className="text-xs md:text-sm text-gray-500 font-sans tracking-wide">Margin</div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 md:gap-8">
                      {["Subscription", "Ads", "Sponsorship", "Production"].map((rev, i) => (
                         <div key={i} className="flex items-center gap-3 text-base md:text-xl text-gray-300 font-serif">
                            <div className="w-2 h-2 bg-primary rounded-full"></div> {rev}
                         </div>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col justify-center space-y-4 md:space-y-8 shrink-0 pb-8 md:pb-0">
                   <h3 className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest border-b border-white/10 pb-4">CapEx Allocation</h3>
                   {[
                      { l: "Equipment", w: "100%", v: "NPR 8.5 Cr" },
                      { l: "Studios", w: "35%", v: "NPR 3 Cr" },
                      { l: "Content", w: "65%", v: "NPR 5.5 Cr" },
                      { l: "Platform", w: "14%", v: "NPR 1.2 Cr" },
                      { l: "Marketing", w: "12%", v: "NPR 1 Cr" },
                   ].map((item, i) => (
                      <div key={i} className="group">
                         <div className="flex justify-between mb-2 text-white font-serif text-base md:text-lg">
                            <span>{item.l}</span>
                            <span className="text-gray-500 text-xs md:text-sm font-mono group-hover:text-primary transition-colors">{item.v}</span>
                         </div>
                         <div className="h-px w-full bg-white/10">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: item.w }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-primary"
                            />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </SectionWrapper>

          {/* 12. Team */}
          <SectionWrapper id="team" className="bg-black border-l border-white/5">
             <div className="max-w-6xl w-full h-full flex flex-col justify-center px-4 md:px-0">
                <h2 className="text-4xl md:text-6xl font-bold text-white font-serif mb-2 md:mb-6 text-center">Talent Structure</h2>
                <p className="text-sm md:text-lg text-gray-500 font-sans mb-6 md:mb-12 text-center">
                  The people that power studios, OTT, agency and sports.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 bg-transparent md:bg-transparent border-none md:border-none overflow-y-auto md:overflow-visible no-scrollbar flex-1 md:flex-none pb-4" style={{ touchAction: 'pan-y' }}>
                   {[
                      { role: "Technical", icon: Camera, img: `${BASE_PATH}/technical.png`, ppl: ["Director", "Camera", "Audio"] },
                      { role: "Creative", icon: Mic, img: `${BASE_PATH}/creative.png`, ppl: ["Producer", "Writer", "Editor"] },
                      { role: "Quants", icon: Server, img: `${BASE_PATH}/quants.png`, ppl: ["Backend", "UX", "Analyst"] },
                      { role: "Agency", icon: Briefcase, img: `${BASE_PATH}/agency.png`, ppl: ["Sales", "Strategy", "Creative"] },
                   ].map((dept, i) => (
                      <motion.div
                        key={i}
                        className="relative overflow-hidden bg-white/5 md:bg-black p-4 md:p-6 lg:p-8 hover:bg-white/5 transition-colors group aspect-3/4 md:aspect-auto md:h-80 flex flex-col justify-between border border-white/10 md:border-none"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.4 }}
                      >
                         {/* Background image */}
                         <div 
                           className="absolute inset-0 opacity-40 group-hover:opacity-60 bg-cover bg-center transition-opacity duration-500"
                           style={{ backgroundImage: `url('${dept.img}')` }}
                         />
                         <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

                         <div className="relative flex items-center justify-between mb-3 md:mb-4">
                           <dept.icon className="text-gray-300 group-hover:text-primary transition-colors w-5 h-5 md:w-7 md:h-7" />
                         </div>
                         <div className="relative">
                            <h3 className="text-sm md:text-2xl font-bold text-white font-serif mb-1 md:mb-3">{dept.role}</h3>
                            <ul className="space-y-0.5 md:space-y-2">
                               {dept.ppl.map((p, j) => (
                                  <li key={j} className="text-[10px] md:text-sm text-gray-500 font-sans tracking-wide">
                                    {p}
                                  </li>
                               ))}
                            </ul>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </div>
          </SectionWrapper>

          {/* 13. Edge & Ask - Carousel */}
          <SectionWrapper id="edge-ask" className="bg-black border-l border-white/5 relative flex items-center justify-center">
             {/* Stronger Red Glow */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-60"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

             <InvestmentCarousel />
          </SectionWrapper>

        </motion.div>
        </div>

      {/* --- Scroll Spacer --- */}
      {/* This invisible div creates the scrollable height that drives the horizontal animation */}
      <div style={{ height: `${SECTIONS.length * 100}vh` }} />
      
    </div>
  );
}
