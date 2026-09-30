import { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { FolderHeart, Trash2, Download, Search, Tag, Share2, FileText, Sparkles, Plus, BookOpen, Layers, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResearchWorkspace() {
  const { savedRecords, removeRecord } = useWorkspaceStore();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'collection' | 'notes' | 'export'>('collection');

  const getTags = (r: any): string[] => {
    if (Array.isArray(r.tags)) return r.tags;
    if (typeof r.tags === 'string') return r.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    return [];
  };

  // Extract all unique tags across saved records
  const allTags = Array.from(new Set(savedRecords.flatMap(r => getTags(r))));

  // Filter records based on search and tag
  const filteredRecords = savedRecords.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.content.toLowerCase().includes(searchQuery.toLowerCase());
    const tags = getTags(r);
    const matchesTag = selectedTag ? tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleNoteChange = (recordId: string, noteText: string) => {
    setNotes(prev => ({ ...prev, [recordId]: noteText }));
  };

  const exportTextBundle = () => {
    const text = savedRecords.map(r => 
      `==================================================\nTITLE: ${r.title}\nCREATOR: ${r.creator || 'Dr. B.R. Ambedkar'}\nDATE: ${r.date}\nSOURCE: ${r.source}\nTAGS: ${getTags(r).join(', ')}\n\nCONTENT:\n${r.content}\n\nMY RESEARCH NOTE:\n${notes[r.id] || 'No custom note attached.'}\n==================================================\n\n`
    ).join('\n');

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `heritage_research_bundle_${new Date().toISOString().slice(0, 10)}.txt`);
    dlAnchorElem.click();
  };

  const exportJSONBundle = () => {
    const bundleData = savedRecords.map(r => ({
      ...r,
      userScholarNote: notes[r.id] || ''
    }));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bundleData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `heritage_research_dataset_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-full bg-slate-50 min-h-screen">
      
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <FolderHeart className="w-7 h-7 text-[#FF9933]" /> Digital Research Workspace
          </h2>
          <p className="text-xs text-slate-500 mt-1">Organize saved archival records, write scholar notes, and export bibliography bundles</p>
        </div>

        <div className="flex items-center gap-3">
          {savedRecords.length > 0 && (
            <>
              <button onClick={exportTextBundle} className="flex items-center gap-2 bg-[#000080] hover:bg-[#000060] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors">
                <Download size={15}/> Export TXT Bibliography
              </button>
              <button onClick={exportJSONBundle} className="flex items-center gap-2 bg-[#FF9933] hover:bg-[#e68a2e] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors">
                <FileText size={15}/> Export JSON Dataset
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* Left Sidebar: Workspace Filters & Navigation */}
        <div className="w-1/4 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-6 shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Workspace Quick Search</div>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search saved records..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#000080]"
              />
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Filter by Topic Tag</div>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedTag === null ? 'bg-[#000080] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({savedRecords.length})
                </button>
                {allTags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedTag === tag ? 'bg-[#FF9933] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats Summary Card */}
          <div className="mt-auto bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-[#000080] flex justify-between">
              <span>Saved Records:</span>
              <span className="font-mono text-slate-900">{savedRecords.length}</span>
            </div>
            <div className="font-bold text-[#000080] flex justify-between">
              <span>Custom Notes:</span>
              <span className="font-mono text-slate-900">{Object.keys(notes).length}</span>
            </div>
          </div>
        </div>

        {/* Right Main Grid */}
        <div className="w-3/4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col overflow-y-auto shadow-sm">
          {filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
              <FolderHeart size={64} className="mb-4 opacity-30 text-[#000080]" />
              <p className="text-lg font-bold text-slate-700">No saved research records found.</p>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Save records from the Search Engine, Reading Desk, or Media Sync to build your personal collection.
              </p>
              <button 
                onClick={() => navigate('/search')}
                className="mt-6 px-4 py-2 bg-[#000080] text-white rounded-xl text-xs font-bold shadow hover:bg-[#000060] transition-colors"
              >
                Browse Search Engine
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="flex justify-between items-center border-b pb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Research Collection ({filteredRecords.length} Items)</span>
                <span>Click record to edit scholar notes</span>
              </div>

              {filteredRecords.map(r => (
                <div key={r.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative group hover:border-[#000080]/40 transition-all">
                  {/* Delete Button */}
                  <button 
                    onClick={() => removeRecord(r.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                    title="Remove from Workspace"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#000080]/10 text-[#000080] rounded text-[11px] font-bold uppercase">
                      {r.type || 'Record'}
                    </span>
                    <span className="text-xs text-slate-400">{r.date}</span>
                    <span className="text-xs text-[#FF9933] font-bold">• {r.source}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                  <p className="text-xs text-slate-700 italic border-l-3 border-[#FF9933] pl-3 py-1 bg-white rounded my-3">
                    "{r.content?.slice(0, 240)}..."
                  </p>

                  {/* Scholar Note TextArea */}
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <label className="text-[11px] font-bold text-[#000080] uppercase mb-1 block">Scholar Note / Commentary:</label>
                    <textarea 
                      placeholder="Add personal research commentary or reference tags..."
                      value={notes[r.id] || ''}
                      onChange={(e) => handleNoteChange(r.id, e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-[#000080]"
                      rows={2}
                    />
                  </div>

                  {/* Quick Action Link */}
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={() => navigate(`/reading-desk?recordId=${r.id}`)}
                      className="text-xs text-[#000080] font-bold hover:underline flex items-center gap-1"
                    >
                      Open in Reading Desk <BookOpen size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
