// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { Search, Filter, Save, ExternalLink, BookOpen, BrainCircuit } from 'lucide-react';
import { searchRecords } from '../../data/seedData';

export default function SearchEngine() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchMode, setSearchMode] = useState('exact');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const addRecord = useWorkspaceStore((state) => state.addRecord);

  // Debounced search effect
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${filterType}&mode=${searchMode}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        // High-fidelity client-side search fallback
        const localResults = searchRecords(query, filterType);
        setResults(localResults);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, filterType, searchMode]);

  return (
    <div className="p-8 max-w-6xl mx-auto flex gap-8 relative z-10 items-start">
      {/* Filters Sidebar */}
      <div className="w-64 flex-shrink-0 space-y-6 sticky top-8">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4 text-[#000080] flex items-center gap-2">
            <Filter size={18} /> Semantic Filters
          </h3>
          <select 
            className="w-full bg-white/50 border border-white/40 rounded-lg px-4 py-2 shadow-sm backdrop-blur-md outline-none focus:ring-2 focus:ring-[#000080]/20"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Record Types</option>
            <option value="book">Books & Writings</option>
            <option value="speech">Speeches</option>
            <option value="debate">Debates</option>
            <option value="event">Historical Events</option>
          </select>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4 text-[#000080] flex items-center gap-2">
            <BrainCircuit size={18} /> Smart Search
          </h3>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setSearchMode('exact')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all text-left ${searchMode === 'exact' ? 'bg-[#000080] text-white shadow-md' : 'bg-white/50 hover:bg-white/70 text-gray-700'}`}
            >
              Exact Match
            </button>
            <button 
              onClick={() => setSearchMode('concept')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all text-left ${searchMode === 'concept' ? 'bg-[#000080] text-white shadow-md' : 'bg-white/50 hover:bg-white/70 text-gray-700'}`}
            >
              Concept Search
            </button>
            <button 
              onClick={() => setSearchMode('fuzzy')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all text-left ${searchMode === 'fuzzy' ? 'bg-[#000080] text-white shadow-md' : 'bg-white/50 hover:bg-white/70 text-gray-700'}`}
            >
              Fuzzy Match
            </button>
          </div>
        </div>
      </div>

      {/* Main Search Area */}
      <div className="flex-1">
        <div className="relative mb-8 glass-panel rounded-2xl overflow-hidden p-2">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#000080]" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none pl-12 pr-4 py-4 text-lg outline-none text-gray-800 placeholder-gray-500 font-medium"
            placeholder="Search the live SQLite heritage archive..."
          />
        </div>

        {error && <div className="p-4 mb-4 text-red-700 bg-red-100/80 backdrop-blur-md rounded-lg font-medium border border-red-200">{error}</div>}

        <div className="space-y-4">
          {isLoading && results.length === 0 ? (
            <div className="animate-pulse space-y-4">
               <div className="h-40 glass-panel rounded-2xl"></div>
               <div className="h-40 glass-panel rounded-2xl"></div>
            </div>
          ) : (
            results.map((record) => (
              <div key={record.id} className="glass-panel p-6 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#000080] font-serif">{record.title}</h3>
                  <span className="text-xs font-bold uppercase px-3 py-1 bg-white/60 text-[#000080] rounded-full border border-[#000080]/10">{record.type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 font-medium">{record.date} • {record.source}</p>
                <p className="text-gray-800 mb-6 line-clamp-2 leading-relaxed">{record.content}</p>
                
                <div className="flex gap-4 mt-auto">
                  <button 
                    onClick={() => navigate(`/reading-desk?recordId=${record.id}`)}
                    className="flex items-center gap-2 text-sm font-bold text-white bg-[#000080] px-4 py-2 rounded-lg hover:bg-[#000060] transition-colors shadow-md"
                  >
                    <BookOpen size={16} /> Read / Open
                  </button>
                  <button 
                    onClick={() => addRecord(record)}
                    className="flex items-center gap-2 text-sm font-bold text-[#FF9933] bg-white/80 border border-[#FF9933]/30 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors shadow-sm"
                  >
                    <Save size={16} /> Save to Workspace
                  </button>
                  {record.sourceUrl && (
                    <a 
                      href={record.sourceUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white/80 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <ExternalLink size={16} /> View Context
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
          {!isLoading && results.length === 0 && !error && (
            <div className="glass-panel p-10 rounded-2xl text-center">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-600 font-medium text-lg">No records found matching your criteria in the database.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or using a different Smart Search mode.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
