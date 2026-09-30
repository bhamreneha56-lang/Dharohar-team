import { useState } from 'react';
import { PieChart, TrendingUp, FileText, Search, CheckCircle} from 'lucide-react';


export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'30D' | '90D' | 'ALL'>('ALL');

  const metrics = [
    { label: 'Digitized Primary Folios', value: '48,920', change: '+12.4%', icon: <FileText size={20} className="text-[#000080]" /> },
    { label: 'Archival Search Queries', value: '184,250', change: '+24.1%', icon: <Search size={20} className="text-[#FF9933]" /> },
    { label: 'OCR Transcription Accuracy', value: '98.8%', change: '+1.2%', icon: <CheckCircle size={20} className="text-green-600" /> },
    { label: 'Verified Citation References', value: '6,412', change: '+8.7%', icon: <TrendingUp size={20} className="text-purple-600" /> },
  ];

  const categoryBreakdown = [
    { label: 'Constitutional Law & Debates', count: 184, percent: 38, color: 'bg-[#000080]' },
    { label: 'Social Reform & Satyagrahas', count: 122, percent: 25, color: 'bg-[#FF9933]' },
    { label: 'Monetary Economics & Finance', count: 78, percent: 16, color: 'bg-green-600' },
    { label: 'Philosophy & Buddhist Studies', count: 64, percent: 13, color: 'bg-amber-600' },
    { label: 'Letters & Diplomatic Papers', count: 39, percent: 8, color: 'bg-purple-600' },
  ];

  const topSearchedTerms = [
    { term: 'Article 32 remedies', hits: 1420 },
    { term: 'Annihilation of Caste', hits: 1290 },
    { term: 'Mahad water satyagraha', hits: 980 },
    { term: 'Reserve Bank of India rupee', hits: 840 },
    { term: 'Hindu Code Bill resignation', hits: 760 },
    { term: 'Deekshabhoomi 22 vows', hits: 690 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <PieChart className="w-8 h-8 text-[#FF9933]" />
            Archival Analytics & Preservation Telemetry
          </h2>
          <p className="text-sm text-gray-600">
            Real-time performance of national digitization, citation velocity, and semantic search queries.
          </p>
        </div>

        {/* Time filters */}
        <div className="flex bg-white/80 p-1 rounded-xl border border-gray-200">
          {(['30D', '90D', 'ALL'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeRange === t ? 'bg-[#000080] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 bg-white/90 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 block mb-1">
                {m.label}
              </span>
              <span className="text-2xl font-black font-serif text-gray-900">
                {m.value}
              </span>
              <span className="text-xs font-bold text-green-600 ml-2">
                {m.change}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              {m.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Distribution Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold font-serif text-[#000080] mb-1">
            Archival Distribution by Subject Classification
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Proportion of verified digital assets cataloged under international standards.
          </p>

          <div className="space-y-4">
            {categoryBreakdown.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-800">{cat.label}</span>
                  <span className="text-gray-500">{cat.count} files ({cat.percent}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Catalog Standard: Dublin Core & METS</span>
            <span>Total Cataloged: 487 Master Records</span>
          </div>
        </div>

        {/* Top Research Queries */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-serif text-[#000080] mb-1">
              Top Research Inquiries
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Most frequent Full-Text Search (FTS5) queries from academic scholars.
            </p>

            <div className="space-y-3">
              {topSearchedTerms.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl text-xs">
                  <span className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#000080]/10 text-[#000080] flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    {t.term}
                  </span>
                  <span className="font-mono text-gray-500 font-bold">{t.hits} hits</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-[#8B4513] font-medium mt-4">
            💡 <strong>Observation:</strong> Constitutional remedies & economic works represent 54% of visitor downloads.
          </div>
        </div>
      </div>
    </div>
  );
}
