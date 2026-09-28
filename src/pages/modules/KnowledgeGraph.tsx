// @ts-nocheck
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { 
  Network, Sparkles, Clock, MapPin, User, BookOpen, 
  Bot, FileText, ChevronRight, Layers, Fingerprint, 
  ExternalLink, Play, Globe, Maximize, 
  Search, ShieldCheck, HelpCircle, Archive, Map as MapIcon,
  Compass, Zap, RefreshCcw, Filter, Eye
} from 'lucide-react';
import { getAllRecords } from '../../data/seedData';

// Preset Constellation Topics
const PRESET_CONSTELLATIONS = [
  { id: 'ambedkar', label: 'Dr. B. R. Ambedkar', type: 'person', icon: '👤', category: 'Leader' },
  { id: 'equality', label: 'Equality & Civil Rights', type: 'idea', icon: '💡', category: 'Principle' },
  { id: 'constitution', label: 'Constitution of India', type: 'document', icon: '📜', category: 'Document' },
  { id: 'assembly', label: 'Constituent Assembly', type: 'debate', icon: '🗣️', category: 'Assembly' },
  { id: 'mahad', label: 'Mahad Satyagraha', type: 'event', icon: '📍', category: 'Movement' },
  { id: 'education', label: 'Higher Education & LSE', type: 'place', icon: '🏫', category: 'Institution' }
];

// Real Life Visuals Mapping for Knowledge Graph Entities
const ENTITY_REAL_VISUALS: Record<string, string> = {
  ambedkar: '/ambedkar.png',
  equality: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  constitution: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
  assembly: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80',
  mahad: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
  education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
  default: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80'
};

export default function LivingHistoricalUniverse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });
  
  // Data State
  const [rawRecords, setRawRecords] = useState<any[]>([]);
  const [isGraphReady, setIsGraphReady] = useState(false);
  
  // Interaction State - Default entry point so graph renders immediately!
  const [entryPoint, setEntryPoint] = useState<any>(PRESET_CONSTELLATIONS[0]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [hoverNode, setHoverNode] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<number>(1956);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modes & Controls
  const [viewMode, setViewMode] = useState<'universe' | 'map'>('universe');
  const [storyMode, setStoryMode] = useState(false);
  const [particleSpeed, setParticleSpeed] = useState<number>(0.006);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['person', 'idea', 'event', 'document', 'debate', 'place', 'book', 'media']));

  // Fetch real data or seed data
  useEffect(() => {
    fetch('/api/search')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRawRecords(data);
        } else {
          setRawRecords(getAllRecords());
        }
        setIsGraphReady(true);
      })
      .catch(() => {
        setRawRecords(getAllRecords());
        setIsGraphReady(true);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [entryPoint, viewMode]);

  // Construct Structured Graph Data
  const graphData = useMemo(() => {
    if (!rawRecords.length) return { nodes: [], links: [] };

    const nodes = new Map();
    const links: any[] = [];

    // Base root node
    nodes.set('ROOT', { 
      id: 'ROOT', 
      label: entryPoint.label, 
      type: entryPoint.type, 
      val: 60, 
      isRoot: true 
    });

    const innerNodes: any[] = [];
    const outerNodes: any[] = [];

    rawRecords.forEach((record) => {
      const year = record.date ? parseInt(String(record.date).split('-')[0]) : 1940;
      if (year > timeRange) return;

      const recordType = record.type || 'document';
      if (!activeFilters.has(recordType)) return;

      // Filter by search query if typed
      if (searchQuery.trim() !== '') {
        const titleMatch = record.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const tagMatch = String(record.tags).toLowerCase().includes(searchQuery.toLowerCase());
        if (!titleMatch && !tagMatch) return;
      }

      const tags = Array.isArray(record.tags) ? record.tags.join(',') : (record.tags || '');
      const isDirect = tags.toLowerCase().includes(entryPoint.id.toLowerCase()) || 
                       (record.creator && record.creator.toLowerCase().includes(entryPoint.label.toLowerCase())) ||
                       (record.title && record.title.toLowerCase().includes(entryPoint.id.toLowerCase()));

      if (isDirect) {
        innerNodes.push(record);
      } else {
        outerNodes.push(record);
      }
    });

    // Build Inner Orbit
    innerNodes.forEach((record) => {
      nodes.set(record.id, { 
        id: record.id, 
        label: record.title || record.name || 'Historical Entity', 
        type: record.type || 'document', 
        val: 24, 
        recordData: record,
        year: record.date ? parseInt(String(record.date).split('-')[0]) : 1940
      });
      links.push({ source: 'ROOT', target: record.id, type: 'DIRECT' });
    });

    // Build Outer Orbit
    outerNodes.forEach((record, idx) => {
      const parentNode = innerNodes.length > 0 ? innerNodes[idx % innerNodes.length] : { id: 'ROOT' };
      nodes.set(record.id, { 
        id: record.id, 
        label: record.title || record.name || 'Historical Record', 
        type: record.type || 'document', 
        val: 14, 
        recordData: record,
        year: record.date ? parseInt(String(record.date).split('-')[0]) : 1940
      });
      links.push({ source: parentNode.id, target: record.id, type: 'RELATED' });
    });

    return {
      nodes: Array.from(nodes.values()),
      links: links
    };
  }, [rawRecords, entryPoint, timeRange, activeFilters, searchQuery]);

  // Handle Graph Physics Setup
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge')?.strength(-600);
      graphRef.current.d3Force('link')?.distance(120);
      setTimeout(() => {
        graphRef.current?.zoomToFit(800, 80);
      }, 400);
    }
  }, [graphData]);

  // Highlight connections on hover/select
  const highlightNodes = useMemo(() => {
    const set = new Set();
    const active = hoverNode || selectedNode;
    if (active) {
      set.add(active.id);
      graphData.links.forEach((l: any) => {
        if (l.source.id === active.id) set.add(l.target.id);
        if (l.target.id === active.id) set.add(l.source.id);
      });
    }
    return set;
  }, [hoverNode, selectedNode, graphData]);

  // Render Custom Graph Canvas Nodes (Light Glass Style)
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isHighlighted = highlightNodes.has(node.id);
    const isDimmed = highlightNodes.size > 0 && !isHighlighted;
    const isRoot = node.isRoot;
    
    let radius = Math.sqrt(node.val) * 2.2;
    if (isRoot) radius *= 1.4;

    // Outer Glow Circle
    if (isHighlighted || isRoot) {
      const pulse = Math.abs(Math.sin(Date.now() / 400)) * (isRoot ? 8 : 4);
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 6 + pulse, 0, 2 * Math.PI, false);
      ctx.fillStyle = isRoot ? 'rgba(217, 119, 6, 0.25)' : 'rgba(59, 130, 246, 0.2)';
      ctx.fill();
    }

    // Node Circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = isDimmed ? '#f1f5f9' : (isRoot ? '#FFFBEB' : '#ffffff');
    ctx.fill();
    ctx.strokeStyle = isDimmed ? '#cbd5e1' : (isRoot ? '#D97706' : (isHighlighted ? '#2563EB' : '#94a3b8'));
    ctx.lineWidth = isRoot ? 3 : (isHighlighted ? 2.5 : 1.5);
    ctx.stroke();

    // Node Emojis/Icons
    const getIcon = (type: string) => {
      switch(String(type).toLowerCase()) {
        case 'person': return '👤';
        case 'idea': return '💡';
        case 'document': return '📜';
        case 'book': return '📖';
        case 'debate': return '🗣️';
        case 'event': return '⏳';
        case 'place': return '📍';
        case 'media': return '🖼️';
        default: return '📌';
      }
    };

    const icon = getIcon(node.type);
    const iconSize = radius * 1.1;
    ctx.font = `${iconSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = isDimmed ? 0.35 : 1;
    ctx.fillText(icon, node.x, node.y);
    ctx.globalAlpha = 1;

    // Node Text Label
    if (globalScale > 0.7 || isHighlighted || isRoot) {
      const fontSize = isRoot ? 13 / globalScale : (isHighlighted ? 11 / globalScale : 9 / globalScale);
      ctx.font = `${isRoot ? 'bold ' : ''}${fontSize}px system-ui, sans-serif`;
      
      const labelY = node.y + radius + (6 / globalScale);
      const textWidth = ctx.measureText(node.label).width;

      // Label background pill
      ctx.fillStyle = isRoot ? 'rgba(254, 243, 199, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.roundRect(node.x - textWidth/2 - 5, labelY - 2, textWidth + 10, fontSize + 5, 4);
      ctx.fill();
      ctx.strokeStyle = isRoot ? 'rgba(217, 119, 6, 0.5)' : 'rgba(226, 232, 240, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = isDimmed ? '#94a3b8' : (isRoot ? '#78350F' : (isHighlighted ? '#1E3A8A' : '#1E293B'));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(node.label, node.x, labelY);
    }
  }, [highlightNodes]);

  // Toggle Filters
  const toggleFilter = (type: string) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(type)) {
      newFilters.delete(type);
    } else {
      newFilters.add(type);
    }
    setActiveFilters(newFilters);
  };

  return (
    <div className="w-full h-[calc(100vh-90px)] bg-transparent flex flex-col relative font-sans text-slate-900 overflow-hidden p-4 md:p-6">
      
      {/* TOP BAR: PRESET SELECTOR & SEARCH */}
      <header className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-4 mb-4 z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Title & Presets */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md">
              <Network size={20} />
            </div>
            <h1 className="text-xl font-serif font-black text-slate-900">Living Knowledge Constellation</h1>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_CONSTELLATIONS.map(preset => (
              <button
                key={preset.id}
                onClick={() => {
                  setEntryPoint(preset);
                  setSelectedNode(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                  entryPoint.id === preset.id
                    ? 'bg-amber-600 text-white shadow-md scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{preset.icon}</span> {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & View Mode */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search graph entities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/90 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button 
              onClick={() => setViewMode('universe')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${viewMode === 'universe' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Globe size={14} /> Constellation
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${viewMode === 'map' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <MapIcon size={14} /> Spatial Map
            </button>
          </div>
        </div>
      </header>

      {/* GRAPH CONTAINER */}
      <div className="flex-1 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl relative overflow-hidden flex" ref={containerRef}>
        
        {/* Category Filters Bar */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-lg bg-white/90 p-2 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 flex items-center gap-1">
            <Filter size={12}/> Filter:
          </span>
          {['person', 'idea', 'document', 'debate', 'place', 'event', 'media'].map(type => (
            <button 
              key={type}
              onClick={() => toggleFilter(type)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                activeFilters.has(type) 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : 'bg-slate-100 text-slate-400 border border-slate-200 hover:text-slate-700'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button 
            onClick={() => {
              if (storyMode) {
                setStoryMode(false);
                setSelectedNode(null);
                graphRef.current?.zoomToFit(800, 50);
              } else {
                setStoryMode(true);
                const tourNodes = graphData.nodes.filter(n => !n.isRoot).slice(0, 5);
                let step = 0;
                const playStep = () => {
                  if (step >= tourNodes.length) {
                    setStoryMode(false);
                    return;
                  }
                  const node = tourNodes[step];
                  setSelectedNode(node);
                  graphRef.current?.centerAt(node.x, node.y, 1500);
                  graphRef.current?.zoom(2.2, 1500);
                  step++;
                  setTimeout(playStep, 5000);
                };
                playStep();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all ${
              storyMode ? 'bg-rose-600 text-white animate-pulse' : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            <Play size={14} /> {storyMode ? 'Stop Tour' : 'Cinematic Tour'}
          </button>
          
          <button 
            onClick={() => graphRef.current?.zoomToFit(800, 50)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
            title="Reset Zoom"
          >
            <RefreshCcw size={16} />
          </button>
        </div>

        {/* Interactive 2D Graph Canvas */}
        <div className={`flex-1 relative w-full h-full ${viewMode === 'map' ? 'opacity-10 pointer-events-none' : 'opacity-100'}`}>
          <ForceGraph2D
            ref={graphRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            dagMode="radialout"
            dagLevelDistance={140}
            nodeRelSize={1}
            nodeCanvasObject={paintNode}
            onNodeHover={setHoverNode}
            onNodeClick={(node) => {
              setSelectedNode(node);
              graphRef.current?.centerAt(node.x, node.y, 800);
              graphRef.current?.zoom(2.2, 800);
            }}
            linkColor={(link: any) => link.type === 'DIRECT' ? 'rgba(217, 119, 6, 0.45)' : 'rgba(148, 163, 184, 0.35)'}
            linkWidth={(link: any) => (highlightNodes.has(link.source.id) || highlightNodes.has(link.target.id)) ? 2.5 : 1.2}
            linkDirectionalParticles={(link: any) => (highlightNodes.has(link.source.id) || highlightNodes.has(link.target.id)) ? 4 : 0}
            linkDirectionalParticleSpeed={particleSpeed}
            linkDirectionalParticleWidth={3}
            linkDirectionalParticleColor={(link: any) => link.type === 'DIRECT' ? '#D97706' : '#2563EB'}
            d3AlphaDecay={0.03}
            d3VelocityDecay={0.3}
            backgroundColor="rgba(0,0,0,0)"
          />
        </div>

        {/* Time Machine Slider */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 shadow-lg rounded-2xl px-6 py-3 z-20 flex items-center gap-4 w-full max-w-xl backdrop-blur-md">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Clock size={14} className="text-amber-600"/> Timeline:
          </span>
          <input 
            type="range" 
            min="1891" 
            max="1956" 
            value={timeRange} 
            onChange={(e) => setTimeRange(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
            {timeRange}
          </span>
        </div>

        {/* RIGHT SIDE PANEL: ENTITY INSPECTOR */}
        {selectedNode && (
          <div className="w-96 bg-white border-l border-slate-200 h-full flex flex-col z-30 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
                  {selectedNode.type}
                </span>
                <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">Close ×</button>
              </div>

              {/* Real Life Archival Image Banner */}
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-3 border border-slate-200 shadow-md">
                <img 
                  src={ENTITY_REAL_VISUALS[selectedNode.id] || ENTITY_REAL_VISUALS.default} 
                  alt={selectedNode.label}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug mb-2">{selectedNode.label}</h3>
              <button 
                onClick={() => {
                  setEntryPoint({ id: selectedNode.id, label: selectedNode.label, type: selectedNode.type });
                  setSelectedNode(null);
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1 mt-1"
              >
                Center Constellation Around This <ChevronRight size={14}/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-sm">Historical Overview</h4>
                <p className="leading-relaxed text-slate-600">
                  {selectedNode.recordData?.description || `${selectedNode.label} plays a vital role in the historical evolution of social rights, constitutional law, and democratic reforms.`}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold">Creator / Author</span>
                  <span className="font-bold text-slate-900">{selectedNode.recordData?.creator || 'Historical Archive'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Date</span>
                  <span className="font-bold text-slate-900">{selectedNode.recordData?.date || '1948'}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1">
                  🖼️ Archival Photo Gallery
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=200&q=80" className="rounded-lg h-16 w-full object-cover border border-slate-200" alt="Gallery 1" />
                  <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=200&q=80" className="rounded-lg h-16 w-full object-cover border border-slate-200" alt="Gallery 2" />
                  <img src="https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=200&q=80" className="rounded-lg h-16 w-full object-cover border border-slate-200" alt="Gallery 3" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

