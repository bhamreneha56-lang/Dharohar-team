import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Search, FileScan, Network, BookOpen, Clock, ShieldCheck, FolderHeart, PlayCircle, Bot, Settings, Library, ClipboardCheck, Eye, Accessibility, Map as MapIcon, Database, Mic, PieChart, Activity, Monitor, Image as ImageIcon, Briefcase } from 'lucide-react';
import { useWorkspaceStore } from './store/workspaceStore';

import Home from './pages/Home';
import AIAssistant from './pages/modules/AIAssistant';
import SearchEngine from './pages/modules/SearchEngine';
import OCRStudio from './pages/modules/OCRStudio';
import KnowledgeGraph from './pages/modules/KnowledgeGraph';
import DebateExplorer from './pages/modules/DebateExplorer';
import TimelineStory from './pages/modules/TimelineStory';
import ProvenanceVault from './pages/modules/ProvenanceVault';
import ResearchWorkspace from './pages/modules/ResearchWorkspace';
import MediaSync from './pages/modules/MediaSync';
import AdminDashboard from './pages/modules/AdminDashboard';
import HeritageMap from './pages/modules/HeritageMap';
import Collections from './pages/modules/Collections';
import ArchiveIngestion from './pages/modules/ArchiveIngestion';
import DigitalExhibitions from './pages/modules/DigitalExhibitions';
import StoryMode from './pages/modules/StoryMode';
import OralHistory from './pages/modules/OralHistory';
import KioskMode from './pages/modules/KioskMode';
import Analytics from './pages/modules/Analytics';
import SourceManager from './pages/modules/SourceManager';
import SystemHealth from './pages/modules/SystemHealth';
import ReadingDesk from './pages/modules/ReadingDesk';
import VerificationQueue from './pages/modules/VerificationQueue';


function Sidebar() {
  const location = useLocation();
  const { wheelchairMode, highContrast, toggleHighContrast, toggleWheelchairMode } = useWorkspaceStore();
  
  const navGroups = [
    {
      title: 'EXPLORE',
      items: [
        { name: 'Home', icon: <HomeIcon size={18} />, path: '/' },
        { name: 'Search', icon: <Search size={18} />, path: '/search' },
        { name: 'Knowledge Graph', icon: <Network size={18} />, path: '/graph' },
        { name: 'Debates', icon: <BookOpen size={18} />, path: '/debates' },
        { name: 'Timeline', icon: <Clock size={18} />, path: '/timeline' },
        { name: 'Heritage Map', icon: <MapIcon size={18} />, path: '/map' },
        { name: 'Media Archive', icon: <PlayCircle size={18} />, path: '/media' },
      ]
    },
    {
      title: 'RESEARCH',
      items: [
        { name: 'Reading Desk', icon: <Library size={18} />, path: '/reading-desk' },
        { name: 'AI Assistant', icon: <Bot size={18} />, path: '/ai' },
        { name: 'Research Workspace', icon: <FolderHeart size={18} />, path: '/workspace' },
        { name: 'Collections', icon: <Briefcase size={18} />, path: '/collections' },
      ]
    },
    {
      title: 'PRESERVE',
      items: [
        { name: 'OCR Studio', icon: <FileScan size={18} />, path: '/ocr' },
        { name: 'Verify Queue', icon: <ClipboardCheck size={18} />, path: '/verification' },
        { name: 'Vault', icon: <ShieldCheck size={18} />, path: '/vault' },
        { name: 'Archive Ingestion', icon: <Database size={18} />, path: '/ingestion' },
      ]
    },
    {
      title: 'EXPERIENCE',
      items: [
        { name: 'Digital Exhibitions', icon: <ImageIcon size={18} />, path: '/exhibitions' },
        { name: 'Story Mode', icon: <Monitor size={18} />, path: '/story' },
        { name: 'Oral History', icon: <Mic size={18} />, path: '/oral-history' },
        { name: 'Kiosk Mode', icon: <Monitor size={18} />, path: '/kiosk' },
      ]
    },
    {
      title: 'INSTITUTION',
      items: [
        { name: 'Analytics', icon: <PieChart size={18} />, path: '/analytics' },
        { name: 'Source Manager', icon: <Database size={18} />, path: '/source-manager' },
        { name: 'System Health', icon: <Activity size={18} />, path: '/health' },
        { name: 'Settings', icon: <Settings size={18} />, path: '/settings' },
      ]
    }
  ];

  if(location.pathname === '/') {
    return null; 
  }

  // Wheelchair mode layout: Bottom horizontal nav bar
  if (wheelchairMode) {
    return (
      <div className={`fixed bottom-0 left-0 w-full ${highContrast ? 'bg-black border-t-4 border-yellow-400 text-white' : 'bg-white/40 backdrop-blur-md border-t border-white/20 text-slate-900'} p-4 z-50 flex flex-col shadow-[0_-10px_30px_rgb(0,0,0,0.2)]`}>
        <div className="flex items-center justify-between overflow-x-auto custom-scrollbar gap-2 pb-2">
          {navGroups.flatMap(g => g.items).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex flex-col items-center justify-center min-w-[80px] p-2 rounded-xl transition-all ${isActive ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-white/60 text-[#FF9933] shadow-inner') : (highContrast ? 'text-gray-300' : 'text-slate-700 hover:bg-white/30')}`}
              >
                <div>{item.icon}</div>
                <span className="text-[10px] mt-1 whitespace-nowrap text-center font-bold">{item.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-2 px-2 border-t border-white/20 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">Accessibility Suite Active</span>
          </div>
          <div className="flex gap-4">
            <button onClick={toggleHighContrast} className={`flex items-center gap-1 text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-slate-800'}`}>
              <Eye size={16} /> High Contrast
            </button>
            <button onClick={toggleWheelchairMode} className="flex items-center gap-1 text-xs font-bold text-[#FF9933]">
              <Accessibility size={16} /> Standard Layout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard vertical sidebar
  return (
    <div className={`w-72 ${highContrast ? 'bg-black border-r-4 border-yellow-400 text-white' : 'bg-white/40 backdrop-blur-md border-r border-white/20 text-slate-900'} min-h-screen p-6 flex flex-col gap-3 shadow-[10px_0_30px_rgb(0,0,0,0.15)] z-50 relative transition-colors`}>
      {/* Decorative gradient orb */}
      {!highContrast && <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>}

      <div className="flex items-center gap-4 mb-6 mt-4 px-2 relative z-10">
        <div className={`w-10 h-10 rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-gradient-to-br from-[#FF9933] to-orange-600 text-white'} flex items-center justify-center shadow-lg border border-white/20`}>
          <span className="font-black text-xl">A</span>
        </div>
        <h1 className="font-serif font-bold text-xl leading-tight tracking-wide drop-shadow-md">Ambedkar<br/><span className={highContrast ? 'text-yellow-400' : 'text-[#FF9933]'}>Archive</span></h1>
      </div>
      
      {/* Accessibility Controls */}
      <div className="flex gap-2 mb-4 bg-white/10 p-2 rounded-xl relative z-10 border border-white/20">
        <button onClick={toggleHighContrast} className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-bold transition-all ${highContrast ? 'bg-yellow-400 text-black' : 'hover:bg-white/30 text-slate-700'}`} title="High Contrast Mode">
          <Eye size={16} /> Contrast
        </button>
        <button onClick={toggleWheelchairMode} className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-bold transition-all ${highContrast ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-white/30 text-slate-700'}`} title="Wheelchair Accessible UI">
          <Accessibility size={16} /> Lower UI
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar relative z-10">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 px-4 ${highContrast ? 'text-gray-400' : 'text-slate-600'}`}>{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 relative group
                      ${isActive 
                        ? (highContrast ? 'bg-yellow-400 text-black shadow-[4px_4px_0_white]' : 'bg-white/80 text-[#000080] shadow-[0_8px_20px_rgb(0,0,0,0.08)] border border-white/80 backdrop-blur-md scale-105 z-10')
                        : `hover:bg-white/40 hover:shadow-md hover:translate-x-1 ${highContrast ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}`}
                  >
                    {isActive && !highContrast && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FF9933] rounded-r-full shadow-[0_0_12px_#FF9933]"></div>}
                    <div className={isActive ? (highContrast ? 'text-black' : 'text-[#FF9933]') : `transition-colors ${highContrast ? 'text-gray-400 group-hover:text-white' : 'text-slate-500 group-hover:text-[#000080]'}`}>
                      {item.icon}
                    </div>
                    <span className="tracking-wide text-[14px]">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const { wheelchairMode, highContrast } = useWorkspaceStore();
  
  return (
    <Router>
      <div className={`flex ${wheelchairMode ? 'flex-col' : ''} min-h-screen ${highContrast ? 'bg-black text-white contrast-150 saturate-200' : 'bg-indian-flag text-slate-900'} overflow-hidden transition-all duration-300`}>
        
        <Sidebar />

        <main className={`flex-1 h-screen overflow-y-auto ${wheelchairMode ? 'pb-32' : ''}`}>
          <Routes>
            {/* EXPLORE */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchEngine />} />
            <Route path="/graph" element={<KnowledgeGraph />} />
            <Route path="/debates" element={<DebateExplorer />} />
            <Route path="/timeline" element={<TimelineStory />} />
            <Route path="/map" element={<HeritageMap />} />
            <Route path="/media" element={<MediaSync />} />

            {/* RESEARCH */}
            <Route path="/reading-desk" element={<ReadingDesk />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/workspace" element={<ResearchWorkspace />} />
            <Route path="/collections" element={<Collections />} />

            {/* PRESERVE */}
            <Route path="/ocr" element={<OCRStudio />} />
            <Route path="/verification" element={<VerificationQueue />} />
            <Route path="/vault" element={<ProvenanceVault />} />
            <Route path="/ingestion" element={<ArchiveIngestion />} />

            {/* EXPERIENCE */}
            <Route path="/exhibitions" element={<DigitalExhibitions />} />
            <Route path="/story" element={<StoryMode />} />
            <Route path="/oral-history" element={<OralHistory />} />
            <Route path="/kiosk" element={<KioskMode />} />

            {/* INSTITUTION */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/source-manager" element={<SourceManager />} />
            <Route path="/health" element={<SystemHealth />} />
            <Route path="/settings" element={<AdminDashboard />} />

            {/* FALLBACKS */}
            <Route path="/archive" element={<SearchEngine />} />
            <Route path="*" element={<SearchEngine />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
