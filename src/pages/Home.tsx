// @ts-nocheck
import { Link } from 'react-router-dom';
import { Book, Scale, Video, Clock, ChevronRight } from 'lucide-react';
import { useState, useRef, MouseEvent, ReactNode } from 'react';

// Reusable 3D Interactive Card Component
function InteractiveModuleCard({ mod }: { mod: { name: string, icon: ReactNode, path: string, desc: string } }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setTilt({
      x: -(y / (rect.height / 2)) * 25,
      y: (x / (rect.width / 2)) * 25
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-container w-full h-full">
      <Link to={mod.path} className="block w-full h-full">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="preserve-3d relative w-full h-full bg-white/20 backdrop-blur-xl border border-white/50 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-200 ease-out shadow-2xl overflow-visible aspect-square md:aspect-auto md:h-48"
          style={{
            transform: isHovered 
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.08, 1.08, 1.08)` 
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            boxShadow: isHovered 
              ? `${-tilt.y * 1}px ${tilt.x * 1 + 20}px 40px rgba(0,0,128,0.4)` 
              : '0 10px 25px rgba(0,0,0,0.2)'
          }}
        >
          <div className="text-[#000080] transition-transform duration-300 drop-shadow-xl mb-3" style={{ transform: isHovered ? 'translateZ(50px) scale(1.15)' : 'translateZ(20px) scale(1)' }}>
            {mod.icon}
          </div>
          
          <h3 className="text-lg md:text-xl font-bold text-[#000080] tracking-wide transition-transform duration-300 drop-shadow-md leading-tight" style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(10px)' }}>
            {mod.name}
          </h3>
          
          <p className="text-xs md:text-sm text-[#000080]/80 mt-2 font-bold transition-transform duration-300" style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(5px)' }}>
            {mod.desc}
          </p>
          
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
            style={{
              transform: 'translateZ(1px)',
              background: `radial-gradient(circle at ${isHovered ? (tilt.y + 25)*2 : 50}% ${isHovered ? (tilt.x + 25)*2 : 50}%, rgba(255,255,255,0.6) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0
            }}
          ></div>
        </div>
      </Link>
    </div>
  );
}


export default function Home() {
  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-hidden w-full h-screen bg-black select-none">
      
      {/* FULL SCREEN HIGH-CLARITY ARTWORK WITH AMBIENT ANIMATION */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {/* Crisp Image with Slow Ambient Breathing Zoom Animation */}
        <img 
          src="/ambedkar.png" 
          alt="Dr. B.R. Ambedkar Heritage" 
          className="w-full h-full object-cover object-center contrast-[1.08] saturate-[1.12] brightness-[1.03] scale-100 hover:scale-105 transition-transform duration-[3000ms] ease-out"
          style={{ filter: 'url(#flag-wave)' }}
        />

        {/* Ambient Shimmer Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10 pointer-events-none animate-pulse duration-[4000ms]"></div>
        
        {/* Vignette Gradient for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30 pointer-events-none"></div>
      </div>

      {/* GLOWING ANIMATED OVERLAY & TAP TO EXPLORE BUTTON */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end pb-16 px-6 pointer-events-none animate-fade-in">
        <Link to="/search" className="pointer-events-auto">
          <div className="relative group cursor-pointer">
            
            {/* Expanding Pulsing Aura Rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FF9933] via-amber-400 to-orange-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 group-hover:scale-110 animate-pulse transition-all duration-700"></div>
            <div className="absolute -inset-4 bg-orange-500/30 rounded-full blur-3xl animate-ping duration-[3000ms]"></div>

            {/* Glowing CTA Button */}
            <button className="relative bg-gradient-to-r from-[#FF9933] via-orange-500 to-amber-600 text-white font-black text-2xl md:text-3xl px-14 py-6 rounded-full shadow-[0_20px_60px_rgba(255,153,51,0.6)] group-hover:shadow-[0_25px_80px_rgba(255,153,51,0.95)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-5 border-2 border-white/60 backdrop-blur-md">
              <span className="tracking-wide drop-shadow-md">Tap to Explore</span>
              <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center group-hover:translate-x-3 group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 shadow-md">
                <ChevronRight className="w-8 h-8 text-white group-hover:text-orange-600 transition-colors" strokeWidth={3} />
              </div>
            </button>
          </div>
        </Link>
      </div>

    </div>
  );
}
