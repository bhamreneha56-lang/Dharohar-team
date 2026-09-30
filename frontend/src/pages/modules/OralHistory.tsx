// @ts-nocheck
import { useState, useEffect } from 'react';
import { Mic, Play, Pause, User, Clock, FileText, Volume2, VolumeX, ShieldCheck, Sparkles } from 'lucide-react';

interface OralRecording {
  id: string;
  speaker: string;
  relationship: string;
  recordingYear: string;
  location: string;
  title: string;
  duration: string;
  language: string;
  transcript: { time: string; text: string }[];
}

const recordings: OralRecording[] = [
  {
    id: 'ORAL-001',
    speaker: 'Nanak Chand Rattu',
    relationship: 'Personal Secretary & Scribe (1940-1956)',
    recordingYear: '1974',
    location: 'New Delhi',
    title: 'Recollections of Dr. Ambedkar\'s Final Days and Writing Process',
    duration: '14m 20s',
    language: 'Hindi & English',
    transcript: [
      { time: '00:00', text: 'Dr. Saheb would sit at his desk in 26 Alipur Road until 3 o\'clock in the morning, surrounded by towering stacks of books.' },
      { time: '01:15', text: 'When writing "The Buddha and His Dhamma", his health was failing, but his mental clarity was like a diamond.' },
      { time: '02:40', text: 'He would ask me to verify citations across Pali texts, English law reports, and European philosophy.' },
      { time: '04:10', text: 'He often said: "Rattu, whatever I have achieved, I have achieved through relentless study. My books are my dearest companions."' }
    ]
  },
  {
    id: 'ORAL-002',
    speaker: 'B.C. Kamble',
    relationship: 'Associate & Member of Parliament',
    recordingYear: '1982',
    location: 'Mumbai',
    title: 'Eyewitness Account of the Mahad Water Satyagraha 1927',
    duration: '22m 10s',
    language: 'Marathi & English',
    transcript: [
      { time: '00:00', text: 'The atmosphere in Mahad was electrified. People had gathered from the Konkan villages with bare feet.' },
      { time: '01:30', text: 'Babasaheb walked purposefully toward Chavadar Tale. There was absolute silence as he knelt and cupped the water.' },
      { time: '03:00', text: 'It was not just water—it was the assertion that centuries of humiliation were broken forever.' }
    ]
  },
  {
    id: 'ORAL-003',
    speaker: 'Savita Ambedkar (Mai)',
    relationship: 'Wife & Close Companion',
    recordingYear: '1988',
    location: 'New Delhi',
    title: 'Personal Reflections on the Framing of the Constitution',
    duration: '18m 45s',
    language: 'Marathi',
    transcript: [
      { time: '00:00', text: 'During 1948 and 1949, he worked 18 hours a day on the Draft Constitution despite suffering from severe diabetes.' },
      { time: '02:10', text: 'Every evening, delegates and members of the drafting committee would visit our residence to debate clauses.' },
      { time: '04:00', text: 'His greatest concern was always ensuring that the downtrodden had guaranteed constitutional rights that no future government could take away.' }
    ]
  }
];

export default function OralHistory() {
  const [activeRec, setActiveRec] = useState<OralRecording>(recordings[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [activeSegment, setActiveSegment] = useState(0);

  // Real Speech Narration
  const togglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const currentSegment = activeRec.transcript[activeSegment] || activeRec.transcript[0];
        const textToRead = `Testimony by ${activeRec.speaker}. ${currentSegment.text}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = speed;
        utterance.onend = () => {
          if (activeSegment < activeRec.transcript.length - 1) {
            setActiveSegment(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        };
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [activeRec, activeSegment]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-90px)] flex flex-col relative z-10 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Mic size={14}/> Living Testimonials Vault
            </span>
            <span className="text-xs font-semibold text-slate-500">• {recordings.length} Restored Recordings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-900">Oral History Archive</h1>
        </div>

        <span className="px-3.5 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow">
          🎙️ High-Fidelity Audio Preservation
        </span>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Left Recordings Selector */}
        <div className="overflow-y-auto space-y-3 custom-scrollbar pr-1">
          {recordings.map((rec) => {
            const isSelected = activeRec.id === rec.id;
            return (
              <div
                key={rec.id}
                onClick={() => {
                  setActiveRec(rec);
                  setIsPlaying(false);
                  setActiveSegment(0);
                }}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-xl ring-2 ring-amber-500/30 scale-102'
                    : 'bg-white/50 border-white/60 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs font-bold text-amber-700">
                    {rec.id}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                    <Clock size={12} /> {rec.duration}
                  </span>
                </div>

                <h4 className="font-bold font-serif text-base text-slate-900 mb-1 leading-snug">
                  {rec.title}
                </h4>

                <div className="text-xs text-slate-600 mb-2 flex items-center gap-1.5">
                  <User size={13} className="text-amber-700" />
                  <strong>{rec.speaker}</strong> ({rec.relationship})
                </div>

                <div className="text-[11px] text-slate-500">
                  Recorded: {rec.recordingYear} • {rec.location}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Player & Live Synchronized Transcript */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-xl rounded-3xl border border-white/80 shadow-xl p-6 flex flex-col justify-between overflow-hidden">
          {/* Top Audio Player Widget */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-md mb-6 border border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Oral Testimonial • {activeRec.language}
                </span>
                <h3 className="text-lg font-bold font-serif text-white mt-1">
                  {activeRec.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Speaker: {activeRec.speaker} ({activeRec.relationship})
                </p>
              </div>

              {/* Playback speed toggle */}
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-xl text-xs">
                <span className="text-slate-400 font-bold">Speed:</span>
                {[1, 1.25, 1.5].map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                      speed === s ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Play controls and timeline */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className={`w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg ${
                  isPlaying ? 'bg-rose-600 text-white animate-pulse' : 'bg-amber-600 text-white'
                }`}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>

              <div className="flex-1">
                {/* Stylized Audio Waveform */}
                <div className="flex items-end gap-1 h-8 mb-2">
                  {[20, 45, 60, 80, 40, 90, 70, 85, 30, 65, 95, 45, 75, 50, 80, 60, 90, 40, 70, 50, 85, 90, 60, 75, 40, 30].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: isPlaying ? `${h}%` : '25%' }}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>{isPlaying ? 'Live Audio Narration Active' : '00:00'}</span>
                  <span>{activeRec.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Synchronized Transcript */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText size={14} className="text-amber-600" />
              Archival Synchronized Verbatim Transcript
            </h4>

            <div className="space-y-3">
              {activeRec.transcript.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveSegment(idx);
                    if (!isPlaying) togglePlay();
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeSegment === idx
                      ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-700">
                      [{item.time}]
                    </span>
                    {activeSegment === idx && isPlaying && (
                      <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                        Speaking Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-900 font-serif leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

