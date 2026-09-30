import { useState } from 'react';
import { Monitor, Globe, BookOpen, QrCode, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function KioskMode() {
  const [lang, setLang] = useState<'EN' | 'HI' | 'MR'>('EN');
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const kioskTopics = [
    {
      titleEn: 'Constitution of India (1949)',
      titleHi: 'भारत का संविधान (1949)',
      titleMr: 'भारताचे संविधान (1949)',
      descEn: 'Discover how Dr. Ambedkar shaped fundamental rights, abolished untouchability, and instituted social democracy.',
      descHi: 'जानें कैसे डॉ. आंबेडकर ने मौलिक अधिकारों को गढ़ा और सामाजिक लोकतंत्र की नींव रखी।',
      descMr: 'डॉ. आंबेडकरांनी मूलभूत हक्क, अस्पृश्यता निवारण आणि सामाजिक लोकशाहीची रचना कशी केली ते जाणून घ्या.',
      quoteEn: 'Constitutional morality is not a natural sentiment. It has to be cultivated.',
      quoteHi: 'संवैधानिक नैतिकता कोई स्वाभाविक भावना नहीं है। इसे विकसित करना पड़ता है।',
      quoteMr: 'घटनात्मक नैतिकता ही नैसर्गिक भावना नाही, ती विकसित करावी लागते.',
      docId: 'rec-002',
      tag: 'Constituent Assembly'
    },
    {
      titleEn: 'Annihilation of Caste (1936)',
      titleHi: 'जाति का विनाश (1936)',
      titleMr: 'जातीचे निर्मूलन (1936)',
      descEn: 'The monumental philosophical manifesto demanding total social equality and ethical transformation.',
      descHi: 'सामाजिक समानता और नैतिक परिवर्तन का आह्वान करने वाला ऐतिहासिक घोषणापत्र।',
      descMr: 'संपूर्ण सामाजिक समता आणि नैतिक क्रांतीची मागणी करणारा अद्वितीय जाहीरनामा.',
      quoteEn: 'You cannot build anything on the foundations of caste. You cannot build up a nation.',
      quoteHi: 'जाति की नींव पर आप कुछ भी नहीं बना सकते। आप किसी राष्ट्र का निर्माण नहीं कर सकते।',
      quoteMr: 'जातीच्या पायावर तुम्ही काहीही उभे करू शकत नाही. तुम्ही राष्ट्र उभारू शकत नाही.',
      docId: 'rec-001',
      tag: 'Social Reform'
    },
    {
      titleEn: 'Mahad Water Satyagraha (1927)',
      titleHi: 'महाड जल सत्याग्रह (1927)',
      titleMr: 'महाड चवदार तळे सत्याग्रह (1927)',
      descEn: 'The historic assertion of human dignity at Chavadar Tank—the Magna Carta of human rights.',
      descHi: 'चवदार तालाब पर मानवीय गरिमा की ऐतिहासिक उद्घोषणा—मानवाधिकारों का महाधिकारपत्र।',
      descMr: 'चवदार तळ्यावर मानवी हक्कांची ऐतिहासिक घोषणा—मानवी प्रतिष्ठेचा जाहीरनामा.',
      quoteEn: 'We are going to the tank to establish that we are human beings just like others.',
      quoteHi: 'हम तालाब पर यह स्थापित करने जा रहे हैं कि हम भी दूसरों की तरह इंसान हैं।',
      quoteMr: 'आम्ही हे सिद्ध करण्यासाठी चाललो आहोत की आम्हीही इतरांप्रमाणेच माणूस आहोत.',
      docId: 'rec-003',
      tag: 'Civil Rights'
    }
  ];

  const current = kioskTopics[selectedTopic];

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col justify-between relative z-10 font-sans">
      {/* Kiosk Header with Big Language Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-gray-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF9933] to-orange-600 flex items-center justify-center text-white shadow-lg">
            <Monitor size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif text-[#000080]">
              National Memorial Interactive Kiosk
            </h1>
            <p className="text-xs text-gray-500 font-semibold">
              Touch-Optimized Public Archival Station • SIH Problem Statement #96
            </p>
          </div>
        </div>

        {/* Big tactile language pills */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          <Globe size={16} className="text-gray-500 ml-2" />
          {[
            { id: 'EN', label: 'English' },
            { id: 'HI', label: 'हिन्दी' },
            { id: 'MR', label: 'मराठी' },
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setLang(l.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                lang === l.id
                  ? 'bg-[#000080] text-white shadow-md scale-105'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Touch Explorer */}
      <div className="flex-1 my-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        {/* Left Topic Selector */}
        <div className="space-y-4 flex flex-col justify-center">
          {kioskTopics.map((topic, i) => {
            const isSelected = selectedTopic === i;
            return (
              <button
                key={i}
                onClick={() => setSelectedTopic(i)}
                className={`p-6 rounded-3xl text-left border transition-all transform flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50/80 border-[#FF9933] shadow-lg ring-4 ring-[#FF9933]/20 scale-105'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:scale-[1.02]'
                }`}
              >
                <span className="text-[11px] font-bold text-[#FF9933] uppercase tracking-wider mb-1">
                  {topic.tag}
                </span>
                <h3 className="text-lg font-bold font-serif text-gray-900 leading-snug">
                  {lang === 'EN' ? topic.titleEn : lang === 'HI' ? topic.titleHi : topic.titleMr}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Central Showcase Board */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-[#D2B48C]/50 shadow-xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF9933]/15 to-transparent rounded-bl-full pointer-events-none"></div>

          <div>
            <span className="px-3.5 py-1.5 bg-blue-50 text-[#000080] text-xs font-bold rounded-full border border-blue-200 mb-4 inline-block">
              {current.tag} • Official Memorial Showcase
            </span>

            <h2 className="text-3xl font-bold font-serif text-[#000080] mb-4 leading-tight">
              {lang === 'EN' ? current.titleEn : lang === 'HI' ? current.titleHi : current.titleMr}
            </h2>

            <p className="text-base text-gray-700 leading-relaxed mb-6 font-sans">
              {lang === 'EN' ? current.descEn : lang === 'HI' ? current.descHi : current.descMr}
            </p>

            <div className="p-6 bg-amber-50/80 border-l-4 border-[#000080] rounded-r-2xl mb-6 shadow-sm">
              <p className="font-serif italic text-lg text-[#3E2723] leading-relaxed">
                "{lang === 'EN' ? current.quoteEn : lang === 'HI' ? current.quoteHi : current.quoteMr}"
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <QrCode size={36} className="text-[#000080] p-1 border rounded-lg bg-gray-50" />
              <div>
                <strong className="text-gray-900 block">Scan to Read on Phone</strong>
                Instant offline PDF download
              </div>
            </div>

            <Link
              to={`/reading-desk?recordId=${current.docId}`}
              className="px-6 py-3 bg-[#FF9933] hover:bg-orange-600 text-white font-bold rounded-2xl shadow-md transition-transform hover:scale-105 flex items-center gap-2 text-sm"
            >
              <BookOpen size={16} /> Open in Reading Desk <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Kiosk Status Bar */}
      <div className="bg-white/80 p-4 rounded-2xl border border-gray-200 flex justify-between items-center text-xs font-semibold text-gray-500">
        <span className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-green-600" />
          Kiosk Terminal #01 • Memorial Central Pavilion
        </span>
        <span>Touch any item to inspect primary manuscripts</span>
      </div>
    </div>
  );
}
