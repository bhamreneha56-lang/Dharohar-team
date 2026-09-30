// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { 
  Monitor, ChevronLeft, ChevronRight, BookOpen, Quote, MapPin, Calendar, 
  Volume2, VolumeX, Play, Pause, RefreshCw, Sparkles, Image as ImageIcon, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  heroImage: string;
  narrative: string[];
  quote: string;
  docId: string;
  docTitle: string;
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Chapter I: The Crucible of Childhood',
    subtitle: 'Beginnings in Mhow & Early Schooling in Satara',
    year: '1891 - 1907',
    location: 'Mhow & Satara, Central India',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    narrative: [
      'Born on April 14, 1891, into a Mahar family, young Bhimrao experienced the cruel indignities of untouchability early in life. In school, he and his siblings were forced to sit on gunny sacks outside the classroom and were not allowed to touch water vessels.',
      'Yet despite severe structural hostility, his father Ramji Sakpal instilled an unwavering reverence for knowledge, reading, and self-respect, awakening an insatiable thirst for books.'
    ],
    quote: 'Knowledge is the foundation of a man\'s life. Cultivation of the mind should be the ultimate aim of human existence.',
    docId: 'rec-book-001',
    docTitle: 'Biographical Archive #1891'
  },
  {
    id: 2,
    title: 'Chapter II: The Scholar Across Two Continents',
    subtitle: 'Columbia University & London School of Economics',
    year: '1913 - 1923',
    location: 'New York & London',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    narrative: [
      'Awarded a scholarship by Maharaja Sayajirao Gaekwad III of Baroda, Ambedkar arrived in New York in 1913. At Columbia University, studying under John Dewey, Alexander Goldenweiser, and Edwin Seligman, he breathed the air of equality for the first time.',
      'He pursued dual doctorates, writing "The Evolution of Provincial Finance in British India" at Columbia and "The Problem of the Rupee" at the London School of Economics while qualifying as a barrister at Gray\'s Inn.'
    ],
    quote: 'My friends, if you want to be free, you must educate, agitate, and organize.',
    docId: 'rec-book-002',
    docTitle: 'The Problem of the Rupee (1923)'
  },
  {
    id: 3,
    title: 'Chapter III: Awakening the Voiceless',
    subtitle: 'Mahad Satyagraha & The Battle for Civil Dignity',
    year: '1927 - 1935',
    location: 'Mahad & Nashik, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    narrative: [
      'Returning to India, Dr. Ambedkar launched the journal "Bahishkrit Bharat" and founded the Bahishkrit Hitakarini Sabha. On March 20, 1927, at Mahad, he led the historic march to Chavadar Tank.',
      'This was followed by the burning of the Manusmriti in December 1927 and the six-year non-violent struggle for entry into the Kalaram Temple in Nashik.'
    ],
    quote: 'Lost rights are never regained by appeals to the conscience of the usurpers; they are won by relentless struggle.',
    docId: 'rec-speech-001',
    docTitle: 'Mahad Satyagraha Declaration (1927)'
  },
  {
    id: 4,
    title: 'Chapter IV: The Chief Architect of the Republic',
    subtitle: 'Framing the World\'s Most Comprehensive Democratic Constitution',
    year: '1947 - 1950',
    location: 'Constitution Hall, New Delhi',
    heroImage: '/ambedkar.png',
    narrative: [
      'Upon independence, Dr. Ambedkar was appointed Chairman of the Drafting Committee of the Constituent Assembly. For nearly three years, he marshaled debate on every article, ensuring fundamental equality, universal adult franchise, and abolition of untouchability.',
      'He vigorously defended Article 32 as the "Heart and Soul of the Constitution", guaranteeing citizens direct recourse to the Supreme Court for violation of fundamental rights.'
    ],
    quote: 'However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.',
    docId: 'rec-debate-001',
    docTitle: 'Speech on Adoption of Constitution (1949)'
  },
  {
    id: 5,
    title: 'Chapter V: Navayana & The Universal Dhamma',
    subtitle: 'The Great Moral Rebirth at Deekshabhoomi',
    year: '1951 - 1956',
    location: 'New Delhi & Nagpur',
    heroImage: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=800&q=80',
    narrative: [
      'After resigning as Law Minister over the delay of the progressive Hindu Code Bill for women\'s rights, Dr. Ambedkar devoted his final years to articulating a rationalist, humanist interpretation of Buddhism.',
      'On October 14, 1956, at Deekshabhoomi in Nagpur, alongside 500,000 men and women, he embraced Buddhism, giving the 22 vows that established equality, reason, and fraternity as the compass for human dignity.'
    ],
    quote: 'I like the religion that teaches liberty, equality and fraternity.',
    docId: 'rec-book-003',
    docTitle: 'The Buddha and His Dhamma (1957)'
  }
];

export default function StoryMode() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const chapter = chapters[currentStep];

  // Live Speech Synthesis for Audio Story
  const toggleAudioNarration = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const textToRead = `${chapter.title}. ${chapter.subtitle}. ${chapter.narrative.join(' ')} Quote: ${chapter.quote}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = speechRate;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert('Speech Synthesis is not supported in this browser.');
    }
  };

  // Stop audio narration when chapter changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [currentStep]);

  const next = () => setCurrentStep(prev => Math.min(chapters.length - 1, prev + 1));
  const prev = () => setCurrentStep(prev => Math.max(0, prev - 1));

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-[calc(100vh-90px)] flex flex-col justify-between relative z-10 font-sans text-slate-900">
      
      {/* Top Header & Controls */}
      <header className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-white shadow-md">
            <Monitor size={22} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-black text-slate-900">Interactive Audio-Visual Storytelling</h1>
            <p className="text-xs font-semibold text-slate-500">A narrated documentary across 5 monumental eras of India's history.</p>
          </div>
        </div>

        {/* Audio Narration Control Bar */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={toggleAudioNarration}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
              isPlayingAudio ? 'bg-rose-600 text-white animate-pulse' : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {isPlayingAudio ? <VolumeX size={16}/> : <Volume2 size={16}/>}
            {isPlayingAudio ? 'Stop Narration' : 'Play Audio Story'}
          </button>

          <select 
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 shadow-sm"
          >
            <option value={0.85}>0.85x Speed</option>
            <option value={0.95}>1.0x Normal</option>
            <option value={1.15}>1.15x Speed</option>
          </select>
        </div>
      </header>

      {/* Chapter Progress Tracker */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => setCurrentStep(idx)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              idx === currentStep
                ? 'bg-amber-600 text-white border-amber-600 shadow-lg scale-102 font-bold'
                : idx < currentStep
                ? 'bg-white/80 text-amber-900 border-amber-300 font-semibold'
                : 'bg-white/40 text-slate-500 border-white/60 hover:bg-white/70'
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider mb-0.5 opacity-80">Era {ch.id}</div>
            <div className="text-xs truncate">{ch.year}</div>
          </button>
        ))}
      </div>

      {/* Main Interactive Chapter Card */}
      <div className="flex-1 bg-white/85 backdrop-blur-xl rounded-3xl border border-white/80 shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8 justify-between overflow-hidden">
        
        {/* Left Side: Real Life Image */}
        <div className="w-full md:w-2/5 flex flex-col justify-between">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md relative group mb-4">
            <img 
              src={chapter.heroImage} 
              alt={chapter.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-bold flex items-center gap-1">
                <ImageIcon size={14}/> Archival Photograph • {chapter.year}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-amber-600"/> Timeline Period</span>
              <span>{chapter.year}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-rose-600"/> Geographic Region</span>
              <span className="truncate max-w-[180px]">{chapter.location}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative & Quote */}
        <div className="w-full md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
                {chapter.subtitle}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Chapter {chapter.id} of {chapters.length}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-black text-slate-900 mb-4 leading-tight">
              {chapter.title}
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed font-sans mb-6">
              {chapter.narrative.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Quote Card */}
            <div className="p-5 bg-amber-50/80 border-l-4 border-amber-600 rounded-r-2xl mb-6 shadow-sm">
              <Quote size={18} className="text-amber-800 mb-1 opacity-70" />
              <p className="font-serif italic text-base md:text-lg text-slate-900 leading-relaxed">
                "{chapter.quote}"
              </p>
            </div>
          </div>

          {/* Primary Source Document Footnote */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="text-xs text-slate-500 font-medium">
              Primary Evidence: <strong className="text-slate-900">{chapter.docTitle}</strong>
            </div>
            <Link
              to={`/reading-desk?recordId=${chapter.docId}`}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors"
            >
              <BookOpen size={13} /> Inspect Document
            </Link>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <footer className="flex justify-between items-center mt-6 bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/60 shadow-md">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
            currentStep === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
          }`}
        >
          <ChevronLeft size={16} /> Previous Chapter
        </button>

        <span className="text-xs font-bold text-slate-600">
          Era {currentStep + 1} of {chapters.length}
        </span>

        <button
          onClick={next}
          disabled={currentStep === chapters.length - 1}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
            currentStep === chapters.length - 1
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
          }`}
        >
          Next Chapter <ChevronRight size={16} />
        </button>
      </footer>

    </div>
  );
}

