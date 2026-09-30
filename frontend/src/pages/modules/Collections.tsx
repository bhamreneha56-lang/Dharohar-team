import { useState } from 'react';
import { Briefcase, Search, ArrowRight, ShieldCheck, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllRecords } from '../../data/seedData';

interface ArchivalCollection {
  id: string;
  title: string;
  badge: string;
  itemCount: number;
  period: string;
  description: string;
  curatorNote: string;
  filterType: string;
  tags: string[];
}

const collectionsList: ArchivalCollection[] = [
  {
    id: 'constituent-assembly',
    title: 'Constituent Assembly Volumes & Drafting Records',
    badge: 'State Archive',
    itemCount: 142,
    period: '1946 - 1950',
    description: 'Official verbatim debates, amendments, draft articles, and committee reports leading to the Constitution of India.',
    curatorNote: 'Includes original typed transcripts with Dr. Ambedkar\'s margin notes on Fundamental Rights and Directive Principles.',
    filterType: 'debate',
    tags: ['Constitution', 'Democracy', 'Article 32', 'Drafting Committee']
  },
  {
    id: 'economic-works',
    title: 'Monetary & Economic Treatises',
    badge: 'Academic Repository',
    itemCount: 38,
    period: '1915 - 1928',
    description: 'Landmark economic inquiries including "The Problem of the Rupee" and "Administration and Finance of the East India Company".',
    curatorNote: 'The analytical foundation that directly guided the Hilton Young Royal Commission and inspired the establishment of the RBI.',
    filterType: 'book',
    tags: ['Economics', 'RBI', 'Currency Standard', 'LSE Thesis']
  },
  {
    id: 'social-reform',
    title: 'Satyagraha & Human Rights Campaigns',
    badge: 'Civil Rights Vault',
    itemCount: 64,
    period: '1924 - 1935',
    description: 'Historic agitation records including Mahad Chavadar Tank water rights, Kalaram Temple entry, and Bahishkrit Hitakarini Sabha declarations.',
    curatorNote: 'Preserved leaflets, police dispatches, and handwritten telegrams documenting the battle for civil dignity.',
    filterType: 'event',
    tags: ['Mahad', 'Chavadar Tank', 'Nashik Satyagraha', 'Human Rights']
  },
  {
    id: 'buddhist-philosophy',
    title: 'Navayana & Philosophical Inquiries',
    badge: 'Philosophical Corpus',
    itemCount: 52,
    period: '1950 - 1956',
    description: 'The Buddha and His Dhamma manuscripts, 22 Vows of Deekshabhoomi, and comparative analyses of Marxist and Buddhist ethics.',
    curatorNote: 'Final typed manuscripts with blue ink editorial revisions finalized weeks before December 1956.',
    filterType: 'book',
    tags: ['Buddhism', 'Navayana', 'Deekshabhoomi', 'Ethics']
  },
  {
    id: 'parliamentary-addresses',
    title: 'Parliamentary & Ministerial Addresses',
    badge: 'Legislative Hansard',
    itemCount: 89,
    period: '1942 - 1952',
    description: 'Speeches as Labour Member of Viceroy\'s Council, Law Minister\'s debates on the Hindu Code Bill, and resignation declarations.',
    curatorNote: 'Key historical debates championing women\'s property rights, divorce reform, and labour security legislation.',
    filterType: 'speech',
    tags: ['Hindu Code Bill', 'Labour Rights', 'Law Ministry', 'Women Emancipation']
  },
  {
    id: 'rare-manuscripts',
    title: 'Rare Letters & International Correspondence',
    badge: 'Diplomatic Papers',
    itemCount: 45,
    period: '1916 - 1956',
    description: 'Personal correspondence with W.E.B. Du Bois, Mahatma Gandhi, Jawaharlal Nehru, John Dewey, and British administrators.',
    curatorNote: 'High-resolution archival scans highlighting international alliances against racial and caste oppression.',
    filterType: 'manuscript',
    tags: ['Du Bois', 'Letters', 'John Dewey', 'Correspondence']
  }
];

export default function Collections() {
  const [selectedCol, setSelectedCol] = useState<ArchivalCollection>(collectionsList[0]);
  const [search, setSearch] = useState('');
  const allRecords = getAllRecords();

  const matchingRecords = allRecords.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#FF9933]" />
            Curated Archival Collections
          </h2>
          <p className="text-sm text-gray-600">
            Thematic repositories cataloged according to international archival standards (ISAD-G).
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records in collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/80 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF9933]/30 outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Grid of collections + Detail inspect */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Left Collections List */}
        <div className="lg:col-span-2 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectionsList.map((col) => {
              const isSelected = selectedCol.id === col.id;
              return (
                <div
                  key={col.id}
                  onClick={() => setSelectedCol(col)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#000080] shadow-md ring-2 ring-[#000080]/10 scale-[1.01]'
                      : 'bg-white/80 border-gray-200 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-[#000080] text-[10px] font-bold uppercase rounded-full border border-blue-200">
                        {col.badge}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        {col.period}
                      </span>
                    </div>

                    <h3 className="font-bold font-serif text-lg text-gray-900 mb-2 leading-snug">
                      {col.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FF9933] flex items-center gap-1">
                      <FileText size={13} /> {col.itemCount} Digitized Items
                    </span>
                    <span className="text-xs font-bold text-[#000080] flex items-center gap-1">
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Collection Inspector */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-orange-100 text-[#8B4513] text-xs font-bold rounded-full border border-orange-200">
                {selectedCol.period}
              </span>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                <ShieldCheck size={12} /> Verified Holdings
              </span>
            </div>

            <h3 className="text-2xl font-bold font-serif text-[#000080] mb-2 leading-tight">
              {selectedCol.title}
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {selectedCol.description}
            </p>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl mb-4 text-xs">
              <div className="font-bold text-[#8B4513] uppercase tracking-wider mb-1 flex items-center gap-1">
                <CheckCircle2 size={13} /> Curator\'s Archival Appraisal
              </div>
              <p className="text-gray-700 italic">
                "{selectedCol.curatorNote}"
              </p>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Tag size={12} /> Classification Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCol.tags.map(t => (
                  <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 text-[11px] font-semibold rounded-md border border-gray-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Matching sample items from seed records */}
            <div className="mt-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Sample Cataloged Records
              </div>
              <div className="space-y-2">
                {matchingRecords.slice(0, 3).map(rec => (
                  <Link
                    key={rec.id}
                    to={`/reading-desk?recordId=${rec.id}`}
                    className="p-3 bg-gray-50 hover:bg-orange-50/50 rounded-xl border border-gray-200 flex items-center justify-between transition-colors block group"
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-900 group-hover:text-[#000080]">
                        {rec.title}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {rec.date} • {rec.creator}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-[#FF9933]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <Link
              to="/search"
              className="w-full py-3 bg-[#000080] hover:bg-blue-900 text-white font-bold rounded-xl text-center block text-sm shadow-md transition-all"
            >
              Open Full Collection in Search Engine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
