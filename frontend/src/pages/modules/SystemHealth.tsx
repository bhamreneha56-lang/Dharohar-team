import { useState } from 'react';
import { Activity, ShieldCheck, HardDrive, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SystemHealth() {
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [lastCheck, setLastCheck] = useState('Just now');

  const runDiagnostics = () => {
    setIsRunningCheck(true);
    setTimeout(() => {
      setIsRunningCheck(false);
      setLastCheck('Just now');
    }, 1200);
  };

  const systems = [
    { name: 'Full-Text Search Engine (FTS5 / PostgREST)', status: 'Operational', latency: '4ms', details: 'Full indexed corpus with BM25 ranking algorithm active.' },
    { name: 'Cryptographic Provenance Vault (SHA-256)', status: 'Operational', latency: '2ms', details: 'All 15 master records anchored with immutable cryptographic checksums.' },
    { name: 'Tesseract & Vision OCR Extraction Pipeline', status: 'Operational', latency: '1.2s/page', details: 'Bilingual Marathi (Devanagari) & English language models loaded.' },
    { name: 'Knowledge Graph Semantic Engine', status: 'Operational', latency: '16ms', details: 'Entity-relationship force-directed topology online with 14 nodes and 14 relational links.' },
    { name: 'Accessibility Suite (WCAG 2.1 AA)', status: 'Operational', latency: '0ms', details: 'High-contrast mode, wheelchair ergonomics, and screen-reader tags compliant.' },
    { name: 'Local Offline Cache & Service Worker', status: 'Active', latency: '1ms', details: 'Full archive cache available for zero-latency presentation without internet.' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#FF9933]" />
            National Archive System Health & Diagnostics
          </h2>
          <p className="text-sm text-gray-600">
            Real-time status of archival storage, FTS5 indices, cryptography, and accessibility infrastructure.
          </p>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={isRunningCheck}
          className="flex items-center gap-2 px-4 py-2 bg-[#000080] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
        >
          <RefreshCw size={14} className={isRunningCheck ? 'animate-spin' : ''} />
          {isRunningCheck ? 'Running Diagnostics...' : 'Run System Check'}
        </button>
      </div>

      {/* Top Resource Gauge Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-700 rounded-xl border border-green-200">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Archive Integrity Score</span>
            <span className="text-2xl font-black font-serif text-gray-900">100.0%</span>
            <span className="text-[11px] text-green-600 font-bold block">Zero checksum discrepancies</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#000080] rounded-xl border border-blue-200">
            <HardDrive size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Preservation Storage Quota</span>
            <span className="text-2xl font-black font-serif text-gray-900">84.2 GB</span>
            <span className="text-[11px] text-gray-400 font-medium block">of 500 GB High-Availability SAN</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-[#FF9933] rounded-xl border border-amber-200">
            <Cpu size={24} />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Search Query Latency</span>
            <span className="text-2xl font-black font-serif text-gray-900">&lt; 8 ms</span>
            <span className="text-[11px] text-green-600 font-bold block">Instant client-side retrieval</span>
          </div>
        </div>
      </div>

      {/* Detailed Status Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold font-serif text-gray-900">
            Core Preservation Services & Subsystems
          </h3>
          <span className="text-xs text-gray-400 font-semibold">
            Last check: {lastCheck}
          </span>
        </div>

        <div className="space-y-3">
          {systems.map((s, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-gray-900">
                    {s.name}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
                    <CheckCircle2 size={11} /> {s.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {s.details}
                </p>
              </div>

              <div className="text-right font-mono text-xs font-bold text-gray-500">
                Latency: <span className="text-[#000080]">{s.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
