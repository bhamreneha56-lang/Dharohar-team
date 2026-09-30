import { useState } from 'react';
import { Image as ImageIcon, Volume2, ArrowRight, Eye, Calendar, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  curator: string;
  yearSpan: string;
  roomName: string;
  description: string;
  quote: string;
  highlightCount: number;
  tags: string[];
  docId: string;
}

const exhibitions: Exhibition[] = [
  {
    id: 'mahad-1927',
    title: 'The Waters of Liberty: Mahad Satyagraha 1927',
    subtitle: 'The Inaugural Moment of the Dalit Human Rights Revolution',
    curator: 'National Heritage Archival Commission',
    yearSpan: 'March 1927 - December 1927',
    roomName: 'Gallery Hall I: Civil Defiance',
    description: 'A transformative watershed in modern Indian history. Dr. Ambedkar led tens of thousands to Chavadar Tank in Mahad to drink water, not for physical nourishment, but to establish fundamental human equality.',
    quote: 'We are not going to the tank to drink water. We are going to assert our right to live as human beings.',
    highlightCount: 18,
    tags: ['Water Rights', 'Human Dignity', 'Chavadar Tank', 'Satyagraha'],
    docId: 'rec-003'
  },
  {
    id: 'constitution-1949',
    title: 'Architect of the Republic: Framing the Indian Constitution',
    subtitle: 'The Mastermind of Modern Democratic Pluralism',
    curator: 'Parliamentary Digital Heritage Trust',
    yearSpan: '1946 - 1950',
    roomName: 'Gallery Hall II: Central Constitution Hall',
    description: 'Step inside Constitution Hall as the Drafting Committee navigates intense debates on Fundamental Rights, abolition of untouchability (Article 17), and the ultimate safeguard of judicial remedies (Article 32).',
    quote: 'Democracy in India is only a top-dressing on an Indian soil, which is essentially undemocratic. We must make our political democracy a social democracy as well.',
    highlightCount: 34,
    tags: ['Drafting Committee', 'Fundamental Rights', 'Article 32', 'Democracy'],
    docId: 'rec-002'
  },
  {
    id: 'intellectual-odyssey',
    title: 'The Scholar-Rebel: Columbia & London School of Economics',
    subtitle: 'Global Academic Inquiries into Economics and Caste',
    curator: 'International Academic Heritage Society',
    yearSpan: '1913 - 1923',
    roomName: 'Gallery Hall III: The Global Academy',
    description: 'Tracing young Bhimrao\'s revolutionary scholarship in New York and London. Discover his original handwritten theses on monetary economics and anthropology that astonished the global intellectual vanguard.',
    quote: 'My student life was characterized by severe self-discipline and relentless labor in the British Museum and Columbia libraries.',
    highlightCount: 22,
    tags: ['Columbia University', 'LSE', 'Economics', 'John Dewey'],
    docId: 'rec-005'
  },
  {
    id: 'deekshabhoomi-1956',
    title: 'The Great Awakening: Navayana Buddhism at Nagpur',
    subtitle: 'The Moral Transformation of Half a Million Seekers',
    curator: 'Deekshabhoomi Archival Preservation Group',
    yearSpan: 'October 1956',
    roomName: 'Gallery Hall IV: Spiritual Emancipation',
    description: 'An unprecedented peaceful spiritual revolution. Dr. Ambedkar and half a million followers took the 22 vows, shedding caste oppression in favor of a rationalist, compassionate humanist Buddhist path.',
    quote: 'Today I am reborn. I have broken the chains of inequality and entered into the sanctuary of universal compassion.',
    highlightCount: 26,
    tags: ['Buddhism', 'Navayana', '22 Vows', 'Nagpur'],
    docId: 'rec-011'
  }
];

export default function DigitalExhibitions() {
  const [selectedEx, setSelectedEx] = useState<Exhibition>(exhibitions[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-[#FF9933]" />
            Curated Digital Exhibitions
          </h2>
          <p className="text-sm text-gray-600">
            Immersive thematic exhibition halls exploring pivotal moments of India\'s social renaissance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-100 text-[#8B4513] text-xs font-bold rounded-full border border-amber-200">
            🏛️ 4 Active Exhibition Galleries
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Exhibition Selector Cards */}
        <div className="lg:col-span-2 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {exhibitions.map((ex) => {
            const isSelected = selectedEx.id === ex.id;
            return (
              <div
                key={ex.id}
                onClick={() => {
                  setSelectedEx(ex);
                  setIsPlayingAudio(false);
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-50/90 via-white to-orange-50/60 border-[#000080] shadow-md ring-2 ring-[#000080]/15'
                    : 'bg-white/80 border-gray-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 bg-[#000080]/10 text-[#000080] font-bold text-xs rounded-full">
                    {ex.roomName}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <Calendar size={13} /> {ex.yearSpan}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif text-gray-900 mb-1">
                  {ex.title}
                </h3>
                <h4 className="text-xs font-bold text-[#FF9933] uppercase tracking-wider mb-3">
                  {ex.subtitle}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                  {ex.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    {ex.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-[#000080] flex items-center gap-1">
                    Enter Hall <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Exhibition Detail / Audio Guide Showcase */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                {selectedEx.roomName}
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                {selectedEx.highlightCount} Curated Artifacts
              </span>
            </div>

            <h3 className="text-2xl font-bold font-serif text-[#000080] mb-2 leading-tight">
              {selectedEx.title}
            </h3>

            <p className="text-xs font-semibold text-gray-500 mb-4">
              Curated by: {selectedEx.curator}
            </p>

            {/* Audio Guide Player */}
            <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl mb-6 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold tracking-wider text-orange-300 uppercase flex items-center gap-1.5">
                  <Volume2 size={14} /> Curated Audio Guide
                </span>
                <span className="text-[10px] text-gray-300">Duration: 3m 45s</span>
              </div>
              
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={toggleAudio}
                  className="w-12 h-12 rounded-full bg-[#FF9933] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                  {isPlayingAudio ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white mb-1">
                    {isPlayingAudio ? 'Playing Exhibition Narration' : 'Listen to Audio Tour'}
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#FF9933] transition-all duration-300 ${isPlayingAudio ? 'w-2/3 animate-pulse' : 'w-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Spotlight */}
            <div className="p-4 bg-amber-50/70 border-l-4 border-[#FF9933] rounded-r-xl mb-4 font-serif italic text-sm text-[#3E2723]">
              "{selectedEx.quote}"
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {selectedEx.description}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link
              to={`/reading-desk?recordId=${selectedEx.docId}`}
              className="w-full py-3 bg-[#000080] hover:bg-blue-900 text-white font-bold rounded-xl text-center block text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Eye size={16} /> View Featured Exhibition Document
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
