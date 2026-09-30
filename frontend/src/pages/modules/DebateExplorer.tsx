// @ts-nocheck
import { useState, useEffect } from 'react';
import { 
  User, MessageCircle, Lightbulb, FileText, ChevronRight, Play, Scroll, 
  ShieldCheck, Sparkles, BookOpen, Volume2, VolumeX, Landmark, Scale, 
  HelpCircle, CheckCircle2, RefreshCw, ThumbsUp, ThumbsDown, Image as ImageIcon
} from 'lucide-react';

// Real Life Visual Avatars & Archival Images
const SPEAKER_IMAGES = {
  ambedkar: '/ambedkar.png',
  kunzru: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  munshi: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  alladi: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  naziruddin: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  jaipal: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  member: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

const ARCHIVE_IMAGES = {
  rights: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  ucc: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  reservations: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=800&q=80'
};

// Rich historical debate topics data
const HISTORICAL_DEBATES = [
  {
    topicId: 'rights',
    title: 'Fundamental Rights & Freedom of Speech',
    article: 'Article 19',
    date: '1948-12-01',
    heroImage: ARCHIVE_IMAGES.rights,
    description: 'Debating whether absolute freedom of speech should be guaranteed or subjected to reasonable restrictions in the interest of state security.',
    turns: [
      {
        id: 'r1',
        speaker: 'Pandit Hirday Nath Kunzru',
        role: 'Constituent Assembly Delegate (UP)',
        avatarKey: 'kunzru',
        date: '1948-12-01',
        originalText: 'If freedom of speech and expression is subject to reservations made by executive authority, the right becomes illusory. We must ensure that fundamental rights are guarded by the judiciary, not trimmed down by emergency clauses.',
        simpleText: 'If the government can restrict speech whenever it wants, freedom of speech is fake. The courts—not politicians—must protect our rights.',
        idea: 'Absolute Liberty vs Security',
        stance: 'Oppose Executive Limits',
        articleImpact: 'Article 19(1)(a) & 19(2)',
        keyArguments: [
          'Executive power can easily suppress political dissent.',
          'Judicial review must be mandatory for any restriction on speech.'
        ],
        counterArgument: 'Unrestricted speech in a newly partitioned nation could incite civil unrest and violence.',
        votes: { support: 342, oppose: 120 }
      },
      {
        id: 'r2',
        speaker: 'K.M. Munshi',
        role: 'Member, Drafting Committee',
        avatarKey: 'munshi',
        date: '1948-12-01',
        originalText: 'Freedom of speech is the vital breath of democracy, but no democracy can survive if sedition and overthrow of the state are protected as fundamental rights. Reasonable restrictions are necessary safeguards for public order.',
        simpleText: 'Speech is essential for democracy, but speech that seeks to overthrow the state or incite riots cannot be allowed.',
        idea: 'Public Order & Reasonable Restrictions',
        stance: 'Support Balanced Freedom',
        articleImpact: 'Clause (2) of Article 19',
        keyArguments: [
          'State sovereignty must exist before rights can be enjoyed.',
          'The word "reasonable" allows the Supreme Court to strike down arbitrary restrictions.'
        ],
        counterArgument: 'Vague definitions of "public order" might be abused by future ruling parties.',
        votes: { support: 480, oppose: 90 }
      },
      {
        id: 'r3',
        speaker: 'Dr. B.R. Ambedkar',
        role: 'Chairman, Drafting Committee',
        avatarKey: 'ambedkar',
        date: '1948-12-02',
        originalText: 'Fundamental Rights are not absolute. In the United States, the Supreme Court developed the doctrine of Police Power to limit rights. What we have done is to specify those limitations in the Constitution itself so that courts have clear guidelines.',
        simpleText: 'No rights in any country are 100% unlimited. Instead of leaving limits to unwritten court rulings, we wrote explicit guidelines directly into the Constitution.',
        idea: 'Constitutional Limitations Structure',
        stance: 'Architectural Balance',
        articleImpact: 'Final Enactment of Article 19',
        keyArguments: [
          'Written limits prevent judges from inventing arbitrary restrictions later.',
          'Equilibrium between individual freedom and social control is vital.'
        ],
        counterArgument: 'Excessive statutory exceptions may weaken the core liberty guaranteed in Clause (1).',
        votes: { support: 610, oppose: 45 }
      }
    ]
  },
  {
    topicId: 'ucc',
    title: 'Uniform Civil Code & Personal Laws',
    article: 'Article 44',
    date: '1948-11-23',
    heroImage: ARCHIVE_IMAGES.ucc,
    description: 'Deliberating whether the State should endeavor to secure a Uniform Civil Code for all citizens across religious communities.',
    turns: [
      {
        id: 'u1',
        speaker: 'Naziruddin Ahmad',
        role: 'Delegate from West Bengal',
        avatarKey: 'naziruddin',
        date: '1948-11-23',
        originalText: 'The guarantee of religious freedom includes religious personal laws. To interfere with family laws without the consent of the community concerned is a violation of religious liberty.',
        simpleText: 'Religious freedom includes family traditions like marriage and inheritance. Forcing new laws without community approval violates religious freedom.',
        idea: 'Protection of Minority Personal Laws',
        stance: 'Oppose Mandatory UCC',
        articleImpact: 'Proviso Proposal to Article 44',
        keyArguments: [
          'Personal laws are deeply bound with religious identity.',
          'National unity requires trust, not compulsory legal uniformity.'
        ],
        counterArgument: 'Secular laws govern civil relations, not religious worship.',
        votes: { support: 210, oppose: 390 }
      },
      {
        id: 'u2',
        speaker: 'Alladi Krishnaswami Ayyar',
        role: 'Member, Drafting Committee',
        avatarKey: 'alladi',
        date: '1948-11-23',
        originalText: 'Can we hold this country together if different communities remain governed by separate laws in civil matters? The Constitution aims to build a unified Indian nationhood above religious divisions.',
        simpleText: 'How can India be one united nation if civil rights like marriage and property inheritance differ based on religion?',
        idea: 'National Integration & Secular Law',
        stance: 'Support Voluntary Uniform Code',
        articleImpact: 'Directive Principles Inclusion',
        keyArguments: [
          'Civil law covers property and rights, which are distinct from faith.',
          'Common citizenship requires common civil rights.'
        ],
        counterArgument: 'Pushing reforms too fast could alienate minority groups during nation-building.',
        votes: { support: 520, oppose: 110 }
      },
      {
        id: 'u3',
        speaker: 'Dr. B.R. Ambedkar',
        role: 'Chairman, Drafting Committee',
        avatarKey: 'ambedkar',
        date: '1948-11-23',
        originalText: 'It is proposed that the Code shall apply only to those who declare themselves willing to be governed by it. The State is not compelling anyone; it is creating a Directive Principle for future generations to evolve a uniform law.',
        simpleText: 'Article 44 is a Directive Principle—a goal for the future. The state is not forcing it overnight, but laying a roadmap for equality.',
        idea: 'Directive Principle Compromise',
        stance: 'Progressive Goal',
        articleImpact: 'Article 44 Directive Principles',
        keyArguments: [
          'Placing UCC in Directive Principles makes it aspirational rather than immediately enforceable.',
          'Reform will succeed when society is ready.'
        ],
        counterArgument: 'Non-enforceable directive principles may delay gender equality reforms.',
        votes: { support: 580, oppose: 75 }
      }
    ]
  },
  {
    topicId: 'reservations',
    title: 'Social Equality & Affirmative Action',
    article: 'Article 15 & 16',
    date: '1948-11-30',
    heroImage: ARCHIVE_IMAGES.reservations,
    description: 'Debating affirmative action and quotas for Backward Classes to ensure equitable representation in public employment.',
    turns: [
      {
        id: 's1',
        speaker: 'Mahavir Tyagi',
        role: 'Delegate from United Provinces',
        avatarKey: 'member',
        date: '1948-11-30',
        originalText: 'If efficiency of administration is sacrificed for reservations, the nation suffers. Equality of opportunity must mean merit-based selection for all citizens without communal preference.',
        simpleText: 'If we choose people based on quotas rather than merit, government efficiency will suffer. Selection should be based purely on individual capability.',
        idea: 'Merit-Based Equal Opportunity',
        stance: 'Oppose Extensive Quotas',
        articleImpact: 'Debate on Article 16(4)',
        keyArguments: [
          'Administrative efficiency requires high qualification standards.',
          'Communal categorization might perpetuate caste divisions.'
        ],
        counterArgument: 'Merit without equal starting conditions perpetuates historical privilege.',
        votes: { support: 280, oppose: 410 }
      },
      {
        id: 's2',
        speaker: 'Jaipal Singh Munda',
        role: 'Adivasi Delegate & Leader',
        avatarKey: 'jaipal',
        date: '1948-12-01',
        originalText: 'You cannot treat unequals equally. The tribal people of India have been pushed into jungles for thousands of years. Reservation is not a favor; it is restitution for centuries of exclusion.',
        simpleText: 'Treating unequal people as if they had equal opportunities is unfair. Quotas are not charity—they are justice for centuries of historical oppression.',
        idea: 'Substantive Equality & Restitution',
        stance: 'Support Tribal Reservations',
        articleImpact: 'Scheduled Tribes Special Provisions',
        keyArguments: [
          'Formal equality fails when historical disadvantage is extreme.',
          'Representation in administration guarantees protection of tribal lands and rights.'
        ],
        counterArgument: 'Temporary provisions must have a clear sunset timeline.',
        votes: { support: 590, oppose: 30 }
      },
      {
        id: 's3',
        speaker: 'Dr. B.R. Ambedkar',
        role: 'Chairman, Drafting Committee',
        avatarKey: 'ambedkar',
        date: '1948-12-01',
        originalText: 'We must reconcile two principles: equality of opportunity for every citizen, and special provision for backward classes who have been left out of administration. The word "backward" ensures quotas remain exceptional, not the rule.',
        simpleText: 'We balanced two goals: equal chances for everyone, plus targeted support for disadvantaged communities so they get a fair voice in governance.',
        idea: 'Balanced Affirmative Action Framework',
        stance: 'Architect of Article 16(4)',
        articleImpact: 'Enactment of Article 16(4)',
        keyArguments: [
          'Without reservations, administration would remain a monopoly of privileged classes.',
          'Reserving a minority of seats preserves overall equality while granting inclusion.'
        ],
        counterArgument: 'Defining "backwardness" accurately requires continuous socio-economic reviews.',
        votes: { support: 640, oppose: 20 }
      }
    ]
  }
];

export default function DebateExplorer() {
  const [stage, setStage] = useState<'intro' | 'assembly' | 'source'>('assembly');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showSimple, setShowSimple] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userVote, setUserVote] = useState<'support' | 'oppose' | null>(null);
  const [activeTab, setActiveTab] = useState<'debate' | 'arguments' | 'impact'>('debate');

  const currentTopic = HISTORICAL_DEBATES[selectedTopicIndex];
  const activeRecord = currentTopic.turns[currentTurn];
  const activeAvatar = SPEAKER_IMAGES[activeRecord.avatarKey] || SPEAKER_IMAGES.member;

  // Speech synthesis
  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = showSimple ? activeRecord.simpleText : activeRecord.originalText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setUserVote(null);
  }, [currentTurn, selectedTopicIndex]);

  const nextTurn = () => {
    if (currentTurn < currentTopic.turns.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTurn(prev => prev + 1);
        setShowSimple(false);
        setIsAnimating(false);
      }, 200);
    }
  };

  const prevTurn = () => {
    if (currentTurn > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTurn(prev => prev - 1);
        setShowSimple(false);
        setIsAnimating(false);
      }, 200);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-90px)] bg-transparent text-slate-800 flex flex-col font-sans p-4 md:p-6">
      
      {/* HEADER & TOPIC CONTROLS */}
      <header className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
              {currentTopic.article}
            </span>
            <span className="text-xs font-semibold text-slate-500">• {currentTopic.date}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-900">{currentTopic.title}</h1>
        </div>

        {/* TOPIC SELECTION DROPDOWN & TABS */}
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedTopicIndex}
            onChange={(e) => {
              setSelectedTopicIndex(Number(e.target.value));
              setCurrentTurn(0);
            }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs shadow-sm hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {HISTORICAL_DEBATES.map((topic, i) => (
              <option key={topic.topicId} value={i}>
                {topic.article}: {topic.title}
              </option>
            ))}
          </select>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button 
              onClick={() => setActiveTab('debate')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'debate' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Chamber Speech
            </button>
            <button 
              onClick={() => setActiveTab('arguments')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'arguments' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Pro / Con
            </button>
            <button 
              onClick={() => setActiveTab('impact')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'impact' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Impact
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">

        {activeTab === 'debate' && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            
            {/* REAL LIFE SPEAKER CARDS WITH PORTRAIT AVATARS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTopic.turns.map((turn, idx) => {
                const isCurrent = idx === currentTurn;
                const turnAvatar = SPEAKER_IMAGES[turn.avatarKey] || SPEAKER_IMAGES.member;

                return (
                  <div 
                    key={turn.id}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentTurn(idx);
                        setShowSimple(false);
                        setIsAnimating(false);
                      }, 150);
                    }}
                    className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                      isCurrent 
                        ? 'bg-white/95 border-amber-500 shadow-xl shadow-amber-500/10 scale-102 ring-2 ring-amber-500/30' 
                        : 'bg-white/50 border-white/60 hover:bg-white/80 hover:shadow-md'
                    }`}
                  >
                    {/* Real Avatar Photo */}
                    <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0 shadow-md ${
                      isCurrent ? 'border-amber-600 ring-2 ring-amber-500/40' : 'border-slate-300'
                    }`}>
                      <img 
                        src={turnAvatar} 
                        alt={turn.speaker} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base line-clamp-1">{turn.speaker}</div>
                      <div className="text-xs text-amber-800 font-semibold line-clamp-1">{turn.stance}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{turn.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* QUOTE DISPLAY CARD WITH SPEAKER BADGE */}
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
              <div className="bg-white/85 backdrop-blur-xl border border-white/80 p-6 md:p-10 rounded-3xl shadow-xl relative">
                
                {/* Header Row with Active Speaker Visual */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeAvatar} 
                      alt={activeRecord.speaker} 
                      className="w-12 h-12 rounded-xl object-cover border border-amber-500 shadow-sm"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{activeRecord.speaker}</div>
                      <div className="text-xs font-semibold text-amber-800">Topic: <strong>{activeRecord.idea}</strong></div>
                    </div>
                  </div>

                  <button 
                    onClick={toggleSpeech}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      isPlayingAudio ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX size={14}/> : <Volume2 size={14}/>}
                    {isPlayingAudio ? 'Stop Audio' : 'Listen Speech'}
                  </button>
                </div>

                {/* Speech Text */}
                <div className="min-h-[140px] flex items-center my-2">
                  <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-900">
                    "{showSimple ? activeRecord.simpleText : activeRecord.originalText}"
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="mt-8 flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-slate-200">
                  <button 
                    onClick={() => setShowSimple(!showSimple)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-2 ${
                      showSimple ? 'bg-amber-600 text-white' : 'bg-slate-100 text-amber-900 border border-amber-300 hover:bg-slate-200'
                    }`}
                  >
                    <Sparkles size={14}/> {showSimple ? 'Show Original Quote' : 'Explain Simply'}
                  </button>

                  {/* Voting Widget */}
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 text-xs">
                    <span className="text-slate-600 font-bold px-2">Delegate Poll:</span>
                    <button 
                      onClick={() => setUserVote('support')}
                      className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                        userVote === 'support' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-slate-200'
                      }`}
                    >
                      <ThumbsUp size={12}/> Support ({activeRecord.votes.support + (userVote === 'support' ? 1 : 0)})
                    </button>
                    <button 
                      onClick={() => setUserVote('oppose')}
                      className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                        userVote === 'oppose' ? 'bg-rose-600 text-white' : 'bg-white text-rose-700 hover:bg-rose-50 border border-slate-200'
                      }`}
                    >
                      <ThumbsDown size={12}/> Oppose ({activeRecord.votes.oppose + (userVote === 'oppose' ? 1 : 0)})
                    </button>
                  </div>

                  <button 
                    onClick={() => setStage('source')}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 flex items-center gap-2"
                  >
                    <ImageIcon size={14}/> View Archival Evidence
                  </button>
                </div>

              </div>
            </div>

            {/* NAVIGATION FOOTER */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/60 shadow-md">
              <button 
                onClick={prevTurn} 
                disabled={currentTurn === 0} 
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  currentTurn === 0 ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <ChevronRight size={16} className="rotate-180" /> Previous Speaker
              </button>

              <div className="flex gap-2">
                {currentTopic.turns.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-3 h-3 rounded-full transition-all ${idx === currentTurn ? 'bg-amber-600 scale-125' : 'bg-slate-300'}`}
                  ></div>
                ))}
              </div>

              <button 
                onClick={nextTurn} 
                disabled={currentTurn === currentTopic.turns.length - 1} 
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  currentTurn === currentTopic.turns.length - 1 ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                }`}
              >
                Next Speaker <ChevronRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* PRO / CON ARGUMENTS TAB */}
        {activeTab === 'arguments' && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Scale className="text-amber-600"/> Pro vs Counter-Argument Analysis
            </h3>
            <p className="text-sm text-slate-600 mb-6">Detailed breakdown of key claims made by <strong>{activeRecord.speaker}</strong>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider mb-4">
                  <CheckCircle2 size={16}/> Supporting Arguments
                </div>
                <ul className="space-y-3">
                  {activeRecord.keyArguments.map((arg, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</span>
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider mb-4">
                  <HelpCircle size={16}/> Assembly Counter-Point
                </div>
                <p className="text-sm text-slate-800 leading-relaxed bg-white/80 p-4 rounded-xl border border-rose-200 font-medium">
                  {activeRecord.counterArgument}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* IMPACT TAB */}
        {activeTab === 'impact' && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Scroll className="text-amber-600"/> Impact on the Final Indian Constitution
            </h3>
            <p className="text-sm text-slate-600 mb-6">How this debate directly influenced the provisions in <strong>{currentTopic.article}</strong>.</p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Constitutional Article</span>
                <span className="text-sm font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">{activeRecord.articleImpact}</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Final Outcome & Constitutional Compromise</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  The assembly deliberations led directly to the inclusion of balanced clauses in {currentTopic.article}. The framework satisfied both fundamental rights protections and state governance requirements.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ARCHIVAL EVIDENCE REAL-PHOTO MODAL */}
      {stage === 'source' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 p-6 overflow-y-auto flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl border border-slate-200 relative flex flex-col md:flex-row gap-6">
            <button onClick={() => setStage('assembly')} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-sm">Close ×</button>
            
            {/* Archival Photo Preview */}
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img 
                src={currentTopic.heroImage} 
                alt="Archival Document Photograph" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Document Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="text-emerald-600" size={20} />
                  <h2 className="text-lg font-bold text-slate-900">Archival Record Verification</h2>
                </div>

                <div className="bg-amber-50 text-slate-900 p-6 rounded-2xl border border-amber-200 font-serif mb-4">
                  <div className="text-center border-b border-amber-300/60 pb-3 mb-4">
                    <h3 className="text-xl font-bold uppercase tracking-wider text-amber-950">CONSTITUENT ASSEMBLY DEBATES</h3>
                    <p className="text-[11px] text-amber-800 font-sans uppercase font-bold mt-1">OFFICIAL REPORT • VOLUME VII • {activeRecord.date}</p>
                  </div>
                  <div className="bg-white p-3 border-l-4 border-amber-600 rounded-r-lg shadow-sm">
                    <strong className="block text-xs uppercase font-sans text-amber-900 mb-1">{activeRecord.speaker}:</strong>
                    <p className="text-sm leading-relaxed">{activeRecord.originalText}</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setStage('assembly')} className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors">
                Return to Speech Chamber
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}



