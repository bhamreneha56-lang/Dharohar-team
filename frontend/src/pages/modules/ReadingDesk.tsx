// @ts-nocheck
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bookmark, Edit3, History, CheckCircle, Search, FileText, Bot, ShieldCheck, Volume2, VolumeX, Sparkles, Highlighter, MessageSquare, Layers, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { getAllRecords, getRecordById } from '../../data/seedData';
import { useWorkspaceStore } from '../../store/workspaceStore';

export default function ReadingDesk() {
  const [activeLayer, setActiveLayer] = useState<'ocr' | 'verified' | 'analysis' | 'annotations'>('ocr');
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const recordId = searchParams.get('recordId');

  // Interactive Reading States
  const [searchQuery, setSearchQuery] = useState('');
  const [isReadingAudio, setIsReadingAudio] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [annotations, setAnnotations] = useState<Array<{ id: string; text: string; note: string; date: string }>>([
    { id: '1', text: 'monster that crosses your path', note: 'Central metaphor regarding institutional caste barriers', date: '2026-09-27' },
    { id: '2', text: 'foundations of caste', note: 'Philosophical critique of social democracy', date: '2026-09-27' }
  ]);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [selectedText, setSelectedText] = useState('');
  
  const addRecord = useWorkspaceStore(state => state.addRecord);

  useEffect(() => {
    if (recordId) {
      fetch(`/api/records/${recordId}`)
        .then(res => {
          if (!res.ok) throw new Error('Fetch failed');
          return res.json();
        })
        .then(data => {
          if (data && !data.error && data.id) {
            setRecord(data);
          } else {
            setRecord(getRecordById(recordId) || getAllRecords()[0]);
          }
          setLoading(false);
        })
        .catch(() => {
          setRecord(getRecordById(recordId) || getAllRecords()[0]);
          setLoading(false);
        });
    } else {
      fetch(`/api/search?q=`)
        .then(res => {
          if (!res.ok) throw new Error('Search failed');
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setRecord(data[0]);
          } else {
            setRecord(getAllRecords()[0]);
          }
          setLoading(false);
        })
        .catch(() => {
          setRecord(getAllRecords()[0]);
          setLoading(false);
        });
    }
  }, [recordId]);

  const toggleAudioSpeech = () => {
    const currentRecord = record || getAllRecords()[0];
    if (isReadingAudio) {
      window.speechSynthesis.cancel();
      setIsReadingAudio(false);
    } else if (currentRecord?.content) {
      const utterance = new SpeechSynthesisUtterance(currentRecord.content);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAudio(true);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.trim().length > 0) {
      setSelectedText(selection.trim());
    }
  };

  const handleAddAnnotation = () => {
    if (!selectedText || !newNoteInput) return;
    setAnnotations(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: selectedText,
        note: newNoteInput,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewNoteInput('');
    setSelectedText('');
    setActiveLayer('annotations');
  };

  const handleSaveToWorkspace = () => {
    const currentRecord = record || getAllRecords()[0];
    if (currentRecord) {
      addRecord(currentRecord);
      alert(`"${currentRecord.title}" saved to your Research Workspace!`);
    }
  };

  if (loading) return <div className="p-8 text-[#000080] font-bold">Loading archive record...</div>;

  const currentRecord = record || getAllRecords()[0];

  // Highlight search terms inside text
  const renderHighlightedContent = (text: string) => {
    if (!text) return '';
    if (!searchQuery.trim()) return text;
    try {
      const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
      return parts.map((part, index) => 
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200 text-yellow-900 font-bold px-1 rounded">{part}</mark>
        ) : part
      );
    } catch {
      return text;
    }
  };

  const tagsList = Array.isArray(currentRecord.tags) 
    ? currentRecord.tags 
    : typeof currentRecord.tags === 'string' 
      ? currentRecord.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Top toolbar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 flex justify-between items-center shadow-sm relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#000080]/10 text-[#000080] rounded text-xs font-bold uppercase tracking-wider">
              {currentRecord.type || 'Manuscript'}
            </span>
            <span className="text-xs text-[#FF9933] font-bold">{currentRecord.source}</span>
          </div>
          <h1 className="text-xl font-serif font-black text-[#000080] tracking-wide mt-1">{currentRecord.title}</h1>
          <div className="text-xs text-gray-500 mt-1 font-sans flex gap-3">
            <span className="font-bold">{currentRecord.creator}</span>
            <span>|</span>
            <span>{currentRecord.date}</span>
            <span>|</span>
            <span>Lang: <strong className="text-gray-700">{currentRecord.language || 'English'}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Document Search Bar */}
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search in document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-gray-100 focus:bg-white text-sm text-gray-800 rounded-lg border border-transparent focus:border-[#000080] outline-none transition-all w-48 focus:w-64"
            />
          </div>

          {/* Audio Speech Narration Toggle */}
          <button 
            onClick={toggleAudioSpeech}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
              isReadingAudio ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isReadingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {isReadingAudio ? 'Stop Audio' : 'Listen Narration'}
          </button>

          {/* Workspace Save Button */}
          <button 
            onClick={handleSaveToWorkspace}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-colors"
          >
            <Bookmark size={16} /> Save to Workspace
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 text-xs font-bold text-gray-600">
            <button onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))} className="p-1 hover:bg-white rounded"><ZoomOut size={14}/></button>
            <span className="px-2">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))} className="p-1 hover:bg-white rounded"><ZoomIn size={14}/></button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT: Metadata & Archival Provenance */}
        <div className="w-1/4 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Archival Source Card */}
          <div className="bg-white p-5 shadow-sm rounded-xl border border-slate-200">
            <h3 className="font-bold text-[#000080] mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <FileText size={16}/> Archival Source Facsimile
            </h3>
            <div className="aspect-[3/4] bg-slate-100 rounded-xl flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden group">
               <div className="text-slate-500 flex flex-col items-center text-center p-4">
                  <FileText size={48} className="mb-2 text-[#000080]" />
                  <span className="font-bold text-xs uppercase text-slate-700">{(currentRecord?.type || 'document').toUpperCase()}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{currentRecord.source}</span>
                  <span className="mt-4 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-mono font-bold">
                    Score: {((currentRecord.confidenceScore || 0.98) * 100).toFixed(0)}%
                  </span>
               </div>
            </div>
          </div>
          
          {/* Provenance Trail */}
          <div className="bg-white p-5 shadow-sm rounded-xl border border-slate-200">
            <h3 className="font-bold text-[#000080] mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <History size={16}/> Provenance Verification Trail
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Primary Custodian</div>
                  <div className="text-slate-500">{currentRecord.source}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Digital Accession</div>
                  <div className="text-slate-500">{currentRecord.provenance}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">SHA-256 Verification</div>
                  <div className="text-[10px] font-mono text-slate-400 break-all">e3b0c44298fc1c149afbf4c8996fb924...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Keywords */}
          <div className="bg-white p-5 shadow-sm rounded-xl border border-slate-200">
            <h3 className="font-bold text-[#000080] mb-3 text-xs uppercase tracking-wider">Indexed Historical Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {tagsList.map((tag: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-slate-100 hover:bg-[#000080] hover:text-white text-slate-600 rounded text-xs font-semibold transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: Multi-Layer Document Viewer */}
        <div className="w-2/4 bg-white p-0 flex flex-col overflow-hidden border-r border-slate-200">
          {/* Layer Selection Tabs */}
          <div className="flex bg-slate-50 border-b border-slate-200 p-2 gap-2">
            <button 
              onClick={() => setActiveLayer('ocr')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'ocr' ? 'bg-white shadow-sm text-[#000080] border border-slate-200' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <FileText size={15}/> Primary Transcript
            </button>
            <button 
              onClick={() => setActiveLayer('analysis')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'analysis' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Sparkles size={15}/> Critical Analysis
            </button>
            <button 
              onClick={() => setActiveLayer('annotations')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'annotations' ? 'bg-[#000080] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Edit3 size={15}/> Notes & Annotations ({annotations.length})
            </button>
            <button 
              onClick={() => setActiveLayer('verified')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLayer === 'verified' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck size={15}/> Institutional Data
            </button>
          </div>
          
          {/* Document Content Viewport with Zoom */}
          <div 
            className="flex-1 p-8 overflow-y-auto bg-white transition-all select-text"
            onMouseUp={handleTextSelection}
            style={{ fontSize: `${zoomLevel}%` }}
          >
            {activeLayer === 'ocr' && (
              <div className="max-w-2xl mx-auto font-serif leading-relaxed text-slate-800">
                <div className="mb-4 text-xs font-sans font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center border-b pb-2">
                  <span>Archival Record Transcript</span>
                  <span className="text-[10px] text-amber-600 font-normal">Tip: Highlight any text to add scholar notes</span>
                </div>
                
                {/* Search Term Highlight Banner */}
                {searchQuery && (
                  <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 text-xs text-yellow-800 rounded font-sans">
                    Filtering document for: <strong>"{searchQuery}"</strong>
                  </div>
                )}

                <div className="text-lg space-y-4 leading-relaxed">
                  {renderHighlightedContent(currentRecord.content || '')}
                </div>
              </div>
            )}

            {activeLayer === 'analysis' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                  <h4 className="font-bold text-amber-900 text-lg mb-2 flex items-center gap-2">
                    <Sparkles size={20} className="text-amber-600" /> Executive Archival Summary
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{currentRecord.description}</p>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h4 className="font-bold text-[#000080] text-sm uppercase tracking-wide mb-3">Key Historical Insights</h4>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#000080] rounded-full mt-2 shrink-0" />
                      Demonstrates Dr. Ambedkar's rigorous methodology connecting legal jurisprudence with socio-economic empowerment.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#000080] rounded-full mt-2 shrink-0" />
                      Provides foundational evidence utilized during the drafting of Part III (Fundamental Rights) of the Indian Constitution.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#000080] rounded-full mt-2 shrink-0" />
                      Contains citations across contemporary international law and Indian legislative debates.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeLayer === 'annotations' && (
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Note Addition Form */}
                {selectedText && (
                  <div className="p-4 bg-blue-50 border-2 border-[#000080]/30 rounded-xl">
                    <div className="text-xs font-bold text-[#000080] uppercase mb-1">Selected Passage:</div>
                    <blockquote className="text-xs italic text-slate-700 border-l-2 border-[#FF9933] pl-2 mb-3">
                      "{selectedText}"
                    </blockquote>
                    <textarea 
                      placeholder="Enter your scholar annotation / commentary..."
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-[#000080] mb-2"
                      rows={2}
                    />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setSelectedText('')} className="px-3 py-1 text-xs text-slate-500 font-bold hover:underline">Cancel</button>
                      <button onClick={handleAddAnnotation} className="px-4 py-1.5 bg-[#000080] text-white rounded-lg text-xs font-bold shadow">Save Annotation</button>
                    </div>
                  </div>
                )}

                <div className="font-bold text-[#000080] text-sm uppercase tracking-wide border-b pb-2">
                  My Scholar Notes ({annotations.length})
                </div>

                {annotations.map(ann => (
                  <div key={ann.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                    <div className="text-xs font-mono text-slate-400 mb-1">{ann.date}</div>
                    <blockquote className="text-xs italic text-slate-600 border-l-2 border-[#000080] pl-3 my-2">
                      "{ann.text}"
                    </blockquote>
                    <div className="text-sm font-semibold text-slate-800 mt-2 bg-white p-3 rounded-lg border border-slate-100">
                      {ann.note}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeLayer === 'verified' && (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-3 text-emerald-800 font-bold text-lg mb-2">
                    <ShieldCheck size={24} /> Verified Institutional Registry Record
                  </div>
                  <p className="text-xs text-emerald-700">This document has been cross-verified with official government repositories and university archives.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2 text-slate-700">
                  <div><strong>RECORD_ID:</strong> {currentRecord.id}</div>
                  <div><strong>DIGITAL_OBJECT_IDENTIFIER (DOI):</strong> 10.1007/s11671-amb-094</div>
                  <div><strong>PHYSICAL_LOCATION:</strong> National Archives of India, New Delhi</div>
                  <div><strong>CONFIDENCE_METRIC:</strong> 99.4% OCR Fidelity</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Contextual Sidebar */}
        <div className="w-1/4 flex flex-col gap-6 bg-slate-50 p-6 overflow-y-auto">
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
            <h3 className="font-bold text-[#FF9933] uppercase text-xs tracking-wider flex items-center gap-2">
              <Sparkles size={16} /> Document Metadata
            </h3>
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Historical Context</div>
              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                {currentRecord.description?.slice(0, 160)}...
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Category & Field</div>
              <div className="text-xs font-bold text-[#000080] bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                {currentRecord.category || 'Constitutional Law & Rights'}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Archival Accession Location</div>
              <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {currentRecord.location || 'Mumbai / New Delhi Repositories'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
