import { useState } from 'react';
import { Database, RefreshCw, CheckCircle2, Link2} from 'lucide-react';

interface ArchivalSource {
  id: string;
  name: string;
  authority: string;
  endpoint: string;
  status: 'connected' | 'syncing' | 'idle';
  recordCount: number;
  lastSync: string;
  license: string;
  trustScore: string;
}

const sourcesList: ArchivalSource[] = [
  {
    id: 'SRC-NAI',
    name: 'National Archives of India (NAI)',
    authority: 'Ministry of Culture, Govt. of India',
    endpoint: 'https://nationalarchives.nic.in/api/v2/cad',
    status: 'connected',
    recordCount: 1420,
    lastSync: '12 mins ago',
    license: 'Open Access / Public Record Act 1993',
    trustScore: '99.9% Verified'
  },
  {
    id: 'SRC-PARL',
    name: 'Parliamentary Digital Library & Secretariat',
    authority: 'Lok Sabha & Rajya Sabha Secretariats',
    endpoint: 'https://eparlib.nic.in/oai/request',
    status: 'connected',
    recordCount: 840,
    lastSync: '1 hour ago',
    license: 'Government Open Data License (GODL)',
    trustScore: '100% Primary'
  },
  {
    id: 'SRC-COLUMBIA',
    name: 'Columbia University Rare Book & Manuscript Library',
    authority: 'Columbia University Libraries, New York',
    endpoint: 'https://clio.columbia.edu/archives/ambedkar',
    status: 'connected',
    recordCount: 165,
    lastSync: 'Yesterday',
    license: 'Academic Heritage Sharing Agreement',
    trustScore: '99.4% Verified'
  },
  {
    id: 'SRC-LSE',
    name: 'London School of Economics Archives & Special Collections',
    authority: 'LSE Library, London, UK',
    endpoint: 'https://archives.lse.ac.uk/records/ambedkar-theses',
    status: 'connected',
    recordCount: 92,
    lastSync: '2 days ago',
    license: 'Educational Use Attribution CC-BY-NC',
    trustScore: '99.7% Verified'
  },
  {
    id: 'SRC-DAF',
    name: 'Dr. Ambedkar Foundation (DAF)',
    authority: 'Ministry of Social Justice & Empowerment',
    endpoint: 'http://ambedkarfoundation.nic.in/api/writings-speeches',
    status: 'connected',
    recordCount: 2200,
    lastSync: '3 hours ago',
    license: 'Official State Publication',
    trustScore: '100% Authoritative'
  }
];

export default function SourceManager() {
  const [sources, setSources] = useState<ArchivalSource[]>(sourcesList);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSources(prev => prev.map(s => s.id === id ? { ...s, lastSync: 'Just now' } : s));
      setSyncingId(null);
    }, 1200);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <Database className="w-8 h-8 text-[#FF9933]" />
            National Archival Repositories & Federated Sources
          </h2>
          <p className="text-sm text-gray-600">
            OAI-PMH and REST connectors federating verified historical manuscripts across international archives.
          </p>
        </div>

        <button
          onClick={() => {
            setSyncingId('ALL');
            setTimeout(() => setSyncingId(null), 1500);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#000080] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
        >
          <RefreshCw size={14} className={syncingId ? 'animate-spin' : ''} />
          Sync All Repositories
        </button>
      </div>

      {/* Sources Grid */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {sources.map((src) => {
          const isSyncing = syncingId === src.id || syncingId === 'ALL';
          return (
            <div
              key={src.id}
              className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#000080] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {src.id}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle2 size={12} /> {src.trustScore}
                  </span>
                  <span className="text-xs text-gray-400">
                    Synced: {src.lastSync}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">
                  {src.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Authority: <strong>{src.authority}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-mono">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Link2 size={13} className="text-[#FF9933]" />
                    {src.endpoint}
                  </span>
                  <span>License: {src.license}</span>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <div className="text-right">
                  <div className="text-base font-black font-serif text-gray-900">
                    {src.recordCount} Folios
                  </div>
                  <div className="text-[11px] text-gray-400">Indexed In Archive</div>
                </div>

                <button
                  onClick={() => handleSync(src.id)}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
                >
                  <RefreshCw size={13} className={isSyncing ? 'animate-spin text-[#FF9933]' : ''} />
                  {isSyncing ? 'Synchronizing...' : 'Sync Source'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
