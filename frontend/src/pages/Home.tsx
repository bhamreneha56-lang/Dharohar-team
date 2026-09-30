// @ts-nocheck
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 2;

  useEffect(() => {
    // Auto slide every 5 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden w-full h-screen bg-black select-none font-sans">
      
      {/* FADE SLIDER CONTAINER */}
      <div className="absolute inset-0 z-0 h-full w-full">
        
        {/* SLIDE 1: Flag Background */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src="/flag-vibrant.png" 
            alt="Indian Flag Background" 
            className="absolute inset-0 w-full h-full object-cover object-center scale-100"
            onError={(e) => { e.currentTarget.src = '/flag.jpg'; }}
          />
          {/* Removed the dark bg-slate-900/60 and black gradient overlays so the flag is fully visible! */}
          
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center w-full h-full pt-16">
            <div className="flex flex-col items-center justify-center h-full w-full relative">
              
              {/* Text Overlay */}
              <div className="z-20 flex flex-col items-center justify-center mt-8">
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white tracking-wider drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mb-4">
                  DHAROHAR
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-2xl mb-12 bg-black/30 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
                  "Constitutional morality is not a natural sentiment. It has to be cultivated."
                </p>
              </div>
              
            </div>
          </div>
        </div>

        {/* SLIDE 2: Ambedkar Image */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden bg-slate-900 transition-opacity duration-1000 ease-in-out ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src="/ambedkar.png" 
            alt="Dr. B.R. Ambedkar Heritage" 
            className="absolute inset-0 w-full h-full object-cover object-[70%_center] scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent pointer-events-none"></div>
        </div>

      </div>

      {/* FLOATING ACTION BUTTON AND DOTS - Visible on all slides */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center z-40 pointer-events-none gap-6">
        <Link 
          to="/search" 
          className="pointer-events-auto px-10 py-4 bg-[#FF9933] text-white rounded-full font-bold text-2xl hover:bg-orange-600 transition-all shadow-[0_8px_20px_rgba(255,153,51,0.5)] hover:shadow-[0_12px_25px_rgba(255,153,51,0.7)] hover:-translate-y-1 active:translate-y-0"
        >
          Tap to Start
        </Link>

        {/* Pagination Circles */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                  : 'bg-white/40 hover:bg-white/70 cursor-pointer'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* INVISIBLE NAVIGATION (Left/Right clicking areas instead of visible buttons) */}
      <div className="absolute inset-0 z-30 flex justify-between pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-1/6 h-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-start pl-4"
        >
          <div className="w-12 h-12 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-sm">
            <ChevronLeft size={32} />
          </div>
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto w-1/6 h-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-end pr-4"
        >
          <div className="w-12 h-12 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-sm">
            <ChevronRight size={32} />
          </div>
        </button>
      </div>

    </div>
  );
}
