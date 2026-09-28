// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { 
  PlayCircle, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, 
  Search, Filter, Languages, Download, Share2, Sparkles, FileText, 
  Video, Mic, Image as ImageIcon, Bookmark, CheckCircle2, Clock, 
  Sliders, ShieldCheck, RefreshCw, Eye
} from 'lucide-react';

// Comprehensive Media Archive Items (10 Historical Recordings)
const MEDIA_PLAYLIST = [
  {
    id: 'media-01',
    title: 'Speech on Adoption of the Constitution',
    type: 'audio',
    category: 'Historical Speech',
    date: '1949-11-25',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Constituent Assembly, New Delhi',
    duration: '04:15',
    thumbnail: '/ambedkar.png',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Dr. Ambedkar warns the nation about entering a life of contradictions—political equality alongside economic and social inequality.',
    tags: ['Constitution', 'Democracy', 'Equality', 'Assembly'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'We must begin by acknowledging that there is complete absence of two things in Indian Society.', textHindi: 'हमें यह स्वीकार करके शुरुआत करनी होगी कि भारतीय समाज में दो चीजों का पूरी तरह से अभाव है।', textMarathi: 'आपण हे मान्य करून सुरुवात केली पाहिजे की भारतीय समाजात दोन गोष्टींचा पूर्णपणे अभाव आहे.' },
      { id: 2, time: '0:15', timestampSeconds: 15, text: 'One of these is equality. On the social plane, we have in India a society based on the principle of graded inequality.', textHindi: 'इनमें से एक है समानता। सामाजिक धरातल पर, हमारे पास भारत में क्रमिक असमानता के सिद्धांत पर आधारित समाज है।', textMarathi: 'यातील एक म्हणजे समता. सामाजिक पातळीवर, आपल्याकडे भारतामध्ये श्रेणीबद्ध विषमतेच्या तत्त्वावर आधारित समाज आहे.' },
      { id: 3, time: '0:35', timestampSeconds: 35, text: 'On the economic plane, we have a society in which there are some who have immense wealth as against many who live in abject poverty.', textHindi: 'आर्थिक धरातल पर, हमारे पास एक ऐसा समाज है जिसमें कुछ लोगों के पास अपार धन है जबकि कई लोग घोर गरीबी में जीते हैं।', textMarathi: 'आर्थिक पातळीवर, आपल्याकडे असा समाज आहे ज्यामध्ये काही लोकांकडे अफाट संपत्ती आहे तर अनेकजण अत्यंत गरिबीत जगतात.' },
      { id: 4, time: '0:55', timestampSeconds: 55, text: 'On the 26th of January 1950, we are going to enter into a life of contradictions.', textHindi: '26 जनवरी 1950 को हम विरोधाभासों के जीवन में प्रवेश करने जा रहे हैं।', textMarathi: '26 जानेवारी 1950 रोजी आपण विरोधाभासांच्या आयुष्यात प्रवेश करणार आहोत.' },
      { id: 5, time: '1:15', timestampSeconds: 75, text: 'In politics we will have equality and in social and economic life we will have inequality.', textHindi: 'राजनीति में हमारे पास समानता होगी और सामाजिक तथा आर्थिक जीवन में असमानता होगी।', textMarathi: 'राजकारणात आपल्याला समता मिळेल आणि सामाजिक व आर्थिक जीवनात विषमता राहील.' },
      { id: 6, time: '1:40', timestampSeconds: 100, text: 'We must remove this contradiction at the earliest possible moment or else those who suffer from inequality will blow up the structure of political democracy.', textHindi: 'हमें यथाशीघ्र इस विरोधाभास को दूर करना होगा अन्यथा जो असमानता से पीड़ित हैं वे राजनीतिक लोकतंत्र के ढांचे को ध्वस्त कर देंगे।', textMarathi: 'आपण हा विरोधाभास लवकरात लवकर दूर केला पाहिजे अन्यथा जे विषमतेने पीडित आहेत ते राजकीय लोकशाहीची रचना उडवून देतील.' }
    ]
  },
  {
    id: 'media-02',
    title: 'Historic Proclamation of Republic Day',
    type: 'video',
    category: 'Newsreel Footage',
    date: '1950-01-26',
    speaker: 'Dr. Rajendra Prasad & Assembly Members',
    location: 'Durbar Hall, Rashtrapati Bhavan',
    duration: '03:40',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Archival newsreel capturing the solemn moment when India was officially declared a Sovereign Democratic Republic.',
    tags: ['Republic Day', 'Proclamation', '1950', 'Archive'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'Whereas the Constitution of India enacted by the Constituent Assembly has come into effect.', textHindi: 'संविधान सभा द्वारा अधिनियमित भारत का संविधान लागू हो गया है।', textMarathi: 'घटनासमितीने संमत केलेले भारताचे संविधान अंमलात आले आहे.' },
      { id: 2, time: '0:20', timestampSeconds: 20, text: 'India is hereby proclaimed a Sovereign Democratic Republic.', textHindi: 'भारत को एतद्द्वारा एक संप्रभु लोकतांत्रिक गणराज्य घोषित किया जाता है।', textMarathi: 'भारत याद्वारे सार्वभौम लोकशाही प्रजासत्ताक म्हणून घोषित करण्यात आला आहे.' },
      { id: 3, time: '0:45', timestampSeconds: 45, text: 'The President of India takes the oath of office amidst 31-gun salute.', textHindi: 'भारत के राष्ट्रपति ने 31 तोपों की सलामी के बीच पद की शपथ ली।', textMarathi: 'भारताच्या राष्ट्रपतींनी ३१ तोफांच्या सलामीच्या नादात पदाची शपथ घेतली.' }
    ]
  },
  {
    id: 'media-03',
    title: 'Address at Mahad Satyagraha Conference',
    type: 'audio',
    category: 'Oral Record',
    date: '1927-03-20',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Mahad, Maharashtra',
    duration: '05:10',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'Historic rally speech establishing equal access to public water resources at Chavdar Tank as a fundamental human right.',
    tags: ['Mahad', 'Civil Rights', 'Satyagraha', '1927'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'We are not going to the Tank merely to drink water. We are going to establish our equal right to public resources.', textHindi: 'हम केवल पानी पीने के लिए तालाब पर नहीं जा रहे हैं। हम सार्वजनिक संसाधनों पर अपने समान अधिकार की स्थापना करने जा रहे हैं।', textMarathi: 'आपण केवळ पाणी पिण्यासाठी तळ्यावर जात नाही आहोत. आपण सार्वजनिक संसाधनांवर आपला समान अधिकार प्रस्थापित करणार आहोत.' },
      { id: 2, time: '0:30', timestampSeconds: 30, text: 'It is not a battle for water; it is a battle for human dignity and equality.', textHindi: 'यह पानी की लड़ाई नहीं है; यह मानव गरिमा और समानता की लड़ाई है।', textMarathi: 'ही पाण्यासाठीची लढाई नाही; ही मानवी प्रतिष्ठा आणि समतेची लढाई आहे.' }
    ]
  },
  {
    id: 'media-04',
    title: 'Columbia University Special Convocation Address',
    type: 'audio',
    category: 'Academic Address',
    date: '1952-06-05',
    speaker: 'Dr. B.R. Ambedkar & Faculty',
    location: 'New York, USA',
    duration: '02:50',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'Conferral of LL.D. Degree honoris causa recognizing contributions as constitutional architect and legal scholar.',
    tags: ['Columbia', 'Economics', 'Degree', 'New York'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'Conferring upon Bhimrao Ramji Ambedkar the Degree of Doctor of Laws for framing the Constitution of India.', textHindi: 'भारत के संविधान का निर्माण करने के लिए भीमराव रामजी अंबेडकर को डॉक्टर ऑफ लॉज़ की उपाधि प्रदान की जाती है।', textMarathi: 'भारताचे संविधान तयार केल्याबद्दल भीमराव रामजी आंबेडकर यांना डॉक्टर ऑफ लॉज पदवी बहाल करण्यात येत आहे.' }
    ]
  },
  {
    id: 'media-05',
    title: 'Defence of Fundamental Remedies (Article 32)',
    type: 'audio',
    category: 'Historical Speech',
    date: '1948-12-09',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Constituent Assembly Hall',
    duration: '03:15',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    description: 'Dr. Ambedkar declares Article 32 as the very heart and soul of the Indian Constitution.',
    tags: ['Article 32', 'Supreme Court', 'Fundamental Rights'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'If I was asked to name any particular article in this Constitution as the most important, I could not specify any other than Article 32.', textHindi: 'यदि मुझसे इस संविधान में किसी एक अनुच्छेद को सबसे महत्वपूर्ण बताने के लिए कहा जाए, तो मैं अनुच्छेद 32 के अलावा किसी और का नाम नहीं ले सकता।', textMarathi: 'या संविधानातील सर्वात महत्त्वाचे कलम कोणते असे मला विचारले तर मी ३२ व्या कलमाव्यतिरिक्त इतर कशाचाही उल्लेख करू शकणार नाही.' },
      { id: 2, time: '0:25', timestampSeconds: 25, text: 'It is the very soul of the Constitution and the very heart of it.', textHindi: 'यह संविधान की आत्मा और इसका हृदय है।', textMarathi: 'हा संविधानाचा आत्मा आणि हृदय आहे.' }
    ]
  },
  {
    id: 'media-06',
    title: 'Poona Pact Agreement Statement',
    type: 'audio',
    category: 'Oral Record',
    date: '1932-09-24',
    speaker: 'Dr. B.R. Ambedkar & Leaders',
    location: 'Yerwada Central Jail, Pune',
    duration: '04:05',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    description: 'Joint declaration granting guaranteed legislative seats for Depressed Classes in provincial assemblies.',
    tags: ['Poona Pact', 'Elections', '1932', 'Representation'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'There shall be seats reserved for the Depressed Classes in the Provincial Legislatures.', textHindi: 'प्रांतीय विधानमंडलों में वंचित वर्गों के लिए सीटें आरक्षित रहेंगी।', textMarathi: 'प्रांतीय विधिमंडळांमध्ये वंचित वर्गासाठी जागा राखीव ठेवल्या जातील.' },
      { id: 2, time: '0:30', timestampSeconds: 30, text: 'Educational and public service guarantees shall be upheld without discrimination.', textHindi: 'शैक्षिक और सार्वजनिक सेवा गारंटी बिना किसी भेदभाव के बनी रहेगी।', textMarathi: 'शैक्षणिक आणि सार्वजनिक सेवांची हमी कोणत्याही भेदभावाशिवाय पाळली जाईल.' }
    ]
  },
  {
    id: 'media-07',
    title: 'Deekshabhoomi Mass Conversion Address',
    type: 'audio',
    category: 'Historical Speech',
    date: '1956-10-14',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Deekshabhoomi, Nagpur',
    duration: '06:00',
    thumbnail: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    description: 'Historic address embracing Buddhism and issuing the 22 vows for liberty, equality, and fraternity.',
    tags: ['Deekshabhoomi', 'Nagpur', '1956', 'Equality'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'By embracing Navayana, we enter a path of moral self-respect, reason, and universal brotherhood.', textHindi: 'नवायान को अपनाकर हम नैतिक आत्म-सम्मान, तर्क और सार्वभौमिक भाईचारे के मार्ग पर प्रवेश करते हैं।', textMarathi: 'नवयानाचा स्वीकार करून आपण नैतिक आत्मसन्मान, बुद्धी आणि सार्वत्रिक बंधुत्वाच्या मार्गावर प्रवेश करतो.' },
      { id: 2, time: '0:35', timestampSeconds: 35, text: 'I like the religion that teaches liberty, equality, and fraternity.', textHindi: 'मुझे वह धर्म पसंद है जो स्वतंत्रता, समानता और बंधुत्व सिखाता है।', textMarathi: 'मला तेच धर्म आवडते जे स्वातंत्र्य, समता आणि बंधुता शिकवते.' }
    ]
  },
  {
    id: 'media-08',
    title: 'Simon Commission Testimony & Memorandum',
    type: 'audio',
    category: 'Academic Address',
    date: '1928-10-23',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Indian Statutory Commission, Mumbai',
    duration: '03:50',
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    description: 'Pioneering testimony advocating universal adult franchise regardless of property or education qualifications.',
    tags: ['Franchise', 'Voting Rights', 'Simon Commission'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'Universal adult suffrage is the only true guarantee for democratic equality in India.', textHindi: 'सर्वभौमिक वयस्क मताधिकार भारत में लोकतांत्रिक समानता की एकमात्र सच्ची गारंटी है।', textMarathi: 'सार्वत्रिक प्रौढ मताधिकार हीच भारतातील लोकशाही समतेची एकमेव खरी हमी आहे.' }
    ]
  },
  {
    id: 'media-09',
    title: 'Resignation Statement on the Hindu Code Bill',
    type: 'audio',
    category: 'Historical Speech',
    date: '1951-09-27',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Parliament House, New Delhi',
    duration: '04:30',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    description: 'Resignation speech explaining principled withdrawal as Law Minister over delays in enacting women\'s legal rights.',
    tags: ['Resignation', 'Women Rights', 'Hindu Code Bill'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'To leave women\'s property and inheritance rights uncodified is to deny half our population fundamental fairness.', textHindi: 'महिलाओं के संपत्ति और उत्तराधिकार अधिकारों को असंहिताबद्ध छोड़ना हमारी आधी आबादी को मौलिक निष्पक्षता से वंचित करना है।', textMarathi: 'महिलांच्या मालमत्ता आणि वारसा हक्कांची संहिता न करणे म्हणजे आपल्या अर्ध्या लोकसंख्येला मूलभूत न्याय नाकारणे आहे.' }
    ]
  },
  {
    id: 'media-10',
    title: 'All-India Depressed Classes Conference Keynote',
    type: 'audio',
    category: 'Oral Record',
    date: '1930-08-08',
    speaker: 'Dr. B.R. Ambedkar',
    location: 'Nagpur, Central Provinces',
    duration: '04:50',
    thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    description: 'Famous call urging self-reliance, education, and organized political action.',
    tags: ['Educate Agitate Organize', 'Nagpur', '1930'],
    transcript: [
      { id: 1, time: '0:00', timestampSeconds: 0, text: 'My friends, if you want to be free, you must educate, agitate, and organize.', textHindi: 'मेरे मित्रों, यदि आप स्वतंत्र होना चाहते हैं, तो आपको शिक्षित होना होगा, संघर्ष करना होगा और संगठित होना होगा।', textMarathi: 'माझ्या मित्रांनो, जर तुम्हाला स्वतंत्र व्हायचे असेल तर तुम्ही शिकले पाहिजे, संघर्ष केला पाहिजे आणि संघटित झाले पाहिजे.' }
    ]
  }
];

export default function MediaSync() {
  const [selectedMedia, setSelectedMedia] = useState(MEDIA_PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [progress, setProgress] = useState(0);

  const currentTranscriptLine = selectedMedia.transcript[activeTranscriptIndex] || selectedMedia.transcript[0];

  // Filtered Playlist
  const filteredPlaylist = MEDIA_PLAYLIST.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.type === filterCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Speak a specific transcript line using Web Speech Synthesis
  const speakLine = (index: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const lineObj = selectedMedia.transcript[index];
      if (!lineObj) return;

      const textToSpeak = language === 'hi' ? lineObj.textHindi : (language === 'mr' ? lineObj.textMarathi : lineObj.text);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = playbackSpeed;

      // Select voice matching language if available
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-US';

      utterance.onend = () => {
        if (index < selectedMedia.transcript.length - 1) {
          const nextIdx = index + 1;
          setActiveTranscriptIndex(nextIdx);
          setProgress(((nextIdx + 1) / selectedMedia.transcript.length) * 100);
          speakLine(nextIdx);
        } else {
          setIsPlaying(false);
          setProgress(100);
        }
      };

      utterance.onerror = () => setIsPlaying(false);

      setActiveTranscriptIndex(index);
      setProgress(((index + 1) / selectedMedia.transcript.length) * 100);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  // Toggle Play / Pause Speech Narration
  const togglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        speakLine(activeTranscriptIndex);
      }
    }
  };

  // Jump to specific line on click
  const handleSeekLine = (index: number) => {
    setActiveTranscriptIndex(index);
    speakLine(index);
  };

  // Reset speech when changing media or language
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setActiveTranscriptIndex(0);
      setProgress(0);
    }
  }, [selectedMedia, language]);

  return (
    <div className="w-full min-h-[calc(100vh-90px)] bg-transparent text-slate-900 flex flex-col font-sans p-4 md:p-6">
      
      {/* HEADER & CONTROLS */}
      <header className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <PlayCircle size={14}/> Synchronized Media Vault
            </span>
            <span className="text-xs font-semibold text-slate-500">• {MEDIA_PLAYLIST.length} Primary Archives</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-900">Multimedia Audio-Visual Archive</h1>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search recordings, speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/90 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button 
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterCategory === 'all' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All Media
            </button>
            <button 
              onClick={() => setFilterCategory('audio')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${filterCategory === 'audio' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Mic size={14}/> Audio
            </button>
            <button 
              onClick={() => setFilterCategory('video')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${filterCategory === 'video' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Video size={14}/> Video
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        
        {/* LEFT 7 COLS: MEDIA PLAYER & VISUALIZER */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* PLAYER CONTAINER CARD */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/80 p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Visual Display Screen */}
            <div className="w-full aspect-video bg-slate-900 rounded-2xl relative overflow-hidden shadow-inner flex items-center justify-center mb-6 border border-slate-800">
              
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 p-6">
                <img 
                  src={selectedMedia.thumbnail} 
                  alt={selectedMedia.title}
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-amber-500 shadow-2xl mb-4"
                />
                  
                  {/* Simulated Sound Wave Animation when playing */}
                  <div className="flex items-center gap-1 h-8 mb-2">
                    {[40, 70, 30, 90, 60, 80, 50, 100, 45, 75, 35].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: isPlaying ? `${h}%` : '20%' }}
                        className="w-1.5 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                      ></div>
                    ))}
                  </div>

                  <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">
                    {isPlaying ? '▶ Audio Streaming Live' : '⏸ Audio Ready'}
                  </span>
                </div>

              {/* Overlay Play/Pause Button */}
              <button 
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 backdrop-blur-sm z-10"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </button>
            </div>

            {/* SEEK BAR */}
            <div className="space-y-2 mb-6">
              <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 cursor-pointer">
                <div 
                  style={{ width: `${progress}%` }} 
                  className="h-full bg-amber-600 rounded-full transition-all duration-150"
                ></div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>{selectedMedia.duration} Duration</span>
                <span>Sync Status: Live</span>
              </div>
            </div>

            {/* MEDIA DETAILS & ACTIONS */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
                    {selectedMedia.category}
                  </span>
                  <h2 className="text-xl font-serif font-bold text-slate-900 mt-2">{selectedMedia.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">{selectedMedia.speaker} • {selectedMedia.location} ({selectedMedia.date})</p>
                </div>

                {/* Speed Selector */}
                <select 
                  value={playbackSpeed}
                  onChange={(e) => {
                    const speed = parseFloat(e.target.value);
                    setPlaybackSpeed(speed);
                    if (mediaRef.current) mediaRef.current.playbackRate = speed;
                  }}
                  className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value={0.75}>0.75x Speed</option>
                  <option value={1.0}>1.0x Normal</option>
                  <option value={1.25}>1.25x Speed</option>
                  <option value={1.5}>1.5x Speed</option>
                </select>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {selectedMedia.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedMedia.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* PLAYLIST SELECTION GRID */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-xl">
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Bookmark className="text-amber-600" size={18}/> Select Archival Recording ({filteredPlaylist.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPlaylist.map(item => {
                const isSelected = selectedMedia.id === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedMedia(item);
                      setIsPlaying(false);
                      setProgress(0);
                      setActiveTranscriptId(1);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30' 
                        : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-amber-800 font-semibold">{item.speaker}</p>
                      <span className="text-[10px] text-slate-500">{item.duration} • {item.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: SYNCHRONIZED TRANSCRIPT & MULTI-LANGUAGE */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          <div className="bg-white/85 backdrop-blur-xl border border-white/80 p-6 rounded-3xl shadow-xl flex flex-col h-full min-h-[500px]">
            
            {/* Header & Language Toggle */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="text-amber-600" size={20} />
                <h3 className="font-serif font-bold text-base text-slate-900">Live Transcript</h3>
              </div>

              {/* Language Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${language === 'en' ? 'bg-amber-600 text-white shadow' : 'text-slate-600'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('hi')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${language === 'hi' ? 'bg-amber-600 text-white shadow' : 'text-slate-600'}`}
                >
                  हिन्दी
                </button>
                <button 
                  onClick={() => setLanguage('mr')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${language === 'mr' ? 'bg-amber-600 text-white shadow' : 'text-slate-600'}`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Clickable Synchronized Sentences */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {selectedMedia.transcript.map((line, idx) => {
                const isActive = activeTranscriptIndex === idx;
                const textToShow = language === 'hi' ? line.textHindi : (language === 'mr' ? line.textMarathi : line.text);

                return (
                  <div 
                    key={line.id}
                    onClick={() => handleSeekLine(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20 scale-102 border-amber-600' 
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {line.time}
                      </span>
                      {isActive && <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Speaking...</span>}
                    </div>
                    <p className="text-sm leading-relaxed font-serif">{textToShow}</p>
                  </div>
                );
              })}
            </div>

            {/* Transcript Download Actions */}
            <div className="pt-4 mt-4 border-t border-slate-200 flex gap-3">
              <button 
                onClick={() => alert(`Downloading ${selectedMedia.title} transcript in ${language.toUpperCase()}...`)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={14}/> Download Text
              </button>
              <button 
                onClick={() => alert(`Archival share link generated for ${selectedMedia.title}`)}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 size={14}/> Share Recording
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

