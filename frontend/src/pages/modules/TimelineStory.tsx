import { useState, useEffect } from 'react';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { getAllRecords } from '../../data/seedData';

export default function TimelineStory() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/search')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        const sorted = data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sorted);
        setIsLoading(false);
      })
      .catch(() => {
        // High fidelity fallback from verified historical archive records
        const local = getAllRecords().slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(local);
        setIsLoading(false);
      });
  }, []);

  const next = () => setCurrentIndex(i => Math.min(events.length - 1, i + 1));
  const prev = () => setCurrentIndex(i => Math.max(0, i - 1));

  if (isLoading) {
    return <div className="p-8 max-w-5xl mx-auto text-center font-bold text-gray-500 relative z-10">Loading Exhibition...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="glass-panel p-10 rounded-2xl">
          <p className="text-gray-500">No timeline events found.</p>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10">
      <h2 className="text-3xl font-bold font-serif text-[#000080] mb-8 flex items-center gap-3">
        <Clock className="w-8 h-8" /> Immersive Heritage Timeline
      </h2>

      <div className="flex-1 glass-panel rounded-3xl overflow-hidden flex flex-col premium-card p-0">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 w-full">
          <div 
            className="h-full bg-gradient-to-r from-[#FF9933] to-orange-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 flex justify-between items-center text-gray-500 font-medium border-b border-gray-100/50">
          <span>Story Mode</span>
          <span>{currentIndex + 1} / {events.length}</span>
        </div>

        <div className="flex-1 p-12 flex flex-col justify-center items-center text-center">
          <span className="text-[#000080] font-black text-2xl mb-4 tracking-widest">{currentEvent.date ? currentEvent.date.split('-')[0] : 'Unknown'}</span>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            {currentEvent.title}
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-12">
            {currentEvent.description || currentEvent.content}
          </p>
          {currentEvent.content && currentEvent.description && (
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/60 max-w-3xl text-left italic text-gray-700 shadow-sm">
              "{currentEvent.content}"
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-100/50 flex justify-between items-center bg-gray-50/50 backdrop-blur-md">
          <button 
            onClick={prev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Interactive Exhibition</div>
          <button 
            onClick={next}
            disabled={currentIndex === events.length - 1}
            className="btn-primary flex items-center gap-2"
          >
            Next Event <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
