import { useState } from 'react';
import { Database, UploadCloud, CheckCircle2, RefreshCw, Cpu, ShieldCheck } from 'lucide-react';
import { generateSHA256 } from '../../utils/cryptoUtils';

interface IngestionItem {
  id: string;
  filename: string;
  sourceRepo: string;
  format: string;
  size: string;
  status: 'completed' | 'processing' | 'queued';
  ocrAccuracy: string;
  hash: string;
  timestamp: string;
}

const initialHistory: IngestionItem[] = [
  {
    id: 'ING-1092',
    filename: 'CAD_Vol_XI_Final_Adoption_Nov1949.pdf',
    sourceRepo: 'Parliamentary Archives of India',
    format: 'PDF / OCR Layer',
    size: '14.8 MB',
    status: 'completed',
    ocrAccuracy: '99.4%',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    timestamp: '10 mins ago'
  },
  {
    id: 'ING-1091',
    filename: 'Bahishkrit_Bharat_Issue_01_March1927.tiff',
    sourceRepo: 'State Central Library Mumbai',
    format: 'Multi-page TIFF',
    size: '42.1 MB',
    status: 'completed',
    ocrAccuracy: '97.8%',
    hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    timestamp: '42 mins ago'
  },
  {
    id: 'ING-1090',
    filename: 'LSE_Thesis_Problem_of_the_Rupee_1923.pdf',
    sourceRepo: 'London School of Economics Archives',
    format: 'Searchable PDF',
    size: '28.3 MB',
    status: 'completed',
    ocrAccuracy: '99.1%',
    hash: '7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c6527baf665d4da9a',
    timestamp: '2 hours ago'
  },
  {
    id: 'ING-1089',
    filename: 'Mooknayak_Editorial_Bound_Volume_1920.pdf',
    sourceRepo: 'Dr. Ambedkar Memorial Society',
    format: 'Scanned Manuscript',
    size: '64.5 MB',
    status: 'processing',
    ocrAccuracy: 'Extracting (84%)...',
    hash: 'Calculating SHA-256...',
    timestamp: 'Just now'
  }
];

export default function ArchiveIngestion() {
  const [history, setHistory] = useState<IngestionItem[]>(initialHistory);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSimulatedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    const hash = await generateSHA256(file.name + Date.now().toString());

    setTimeout(() => {
      const newItem: IngestionItem = {
        id: `ING-${Math.floor(1093 + Math.random() * 50)}`,
        filename: file.name,
        sourceRepo: 'Local Ingestion Station',
        format: file.type || 'Digitized Document',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'completed',
        ocrAccuracy: '98.9%',
        hash: hash.slice(0, 32) + '...',
        timestamp: 'Just now'
      };

      setHistory(prev => [newItem, ...prev]);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col relative z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <Database className="w-8 h-8 text-[#FF9933]" />
            Archive Ingestion & Digitization Pipeline
          </h2>
          <p className="text-sm text-gray-600">
            Automated multi-stage OCR extraction, cryptographic hashing, and archival ingestion.
          </p>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1 border border-green-200">
            <Cpu size={14} /> Pipeline Engine: Online
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Upload Zone */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-serif text-gray-900 mb-2">
              Ingest Primary Manuscript
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Drop scanned PDFs, TIFFs, or historical gazette images to run through the optical character recognition and metadata parsing pipeline.
            </p>

            {/* Drop Box */}
            <label className="border-2 border-dashed border-[#FF9933]/50 hover:border-[#FF9933] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-amber-50/30 hover:bg-amber-50 transition-all text-center group">
              <UploadCloud size={48} className="text-[#FF9933] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm text-gray-800 mb-1">
                {isUploading ? 'Processing & OCR Extracting...' : 'Select or Drop Archival File'}
              </span>
              <span className="text-xs text-gray-500">
                Supports PDF, TIFF, PNG up to 150MB
              </span>
              <input
                type="file"
                className="hidden"
                disabled={isUploading}
                onChange={handleSimulatedUpload}
              />
            </label>

            {isUploading && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 animate-pulse">
                <RefreshCw size={18} className="text-[#000080] animate-spin" />
                <div className="text-xs">
                  <div className="font-bold text-[#000080]">Ingestion Pipeline Running</div>
                  <div className="text-gray-500">Extracting text & generating cryptographic SHA-256 seal...</div>
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-600" />
                <div className="text-xs">
                  <div className="font-bold text-green-800">Successfully Ingested & Indexed</div>
                  <div className="text-green-600">Document is now searchable across the digital archive.</div>
                </div>
              </div>
            )}
          </div>

          {/* Standards Info */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mt-4 text-xs text-gray-600 space-y-1">
            <div className="font-bold text-gray-800 uppercase tracking-wider text-[10px]">
              Archival Integrity Standards
            </div>
            <div>• FADGI 4-Star Digitization Compliance</div>
            <div>• Dublin Core & METS / ALTO XML Export</div>
            <div>• Automatic Marathi & English Bilingual OCR</div>
          </div>
        </div>

        {/* Live Ingestion History Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold font-serif text-lg text-gray-900">
              Live Ingestion Log & Provenance Audit
            </h3>
            <span className="text-xs font-semibold text-gray-500">
              Total Ingested: {history.length} Files
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50/80 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#000080]">
                      {item.id}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                      item.status === 'completed'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {item.timestamp}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    {item.filename}
                  </h4>

                  <div className="text-xs text-gray-500 flex flex-wrap items-center gap-3">
                    <span>Source: <strong className="text-gray-700">{item.sourceRepo}</strong></span>
                    <span>Format: {item.format}</span>
                    <span>Size: {item.size}</span>
                  </div>

                  <div className="font-mono text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <ShieldCheck size={11} className="text-green-600" />
                    SHA-256: {item.hash}
                  </div>
                </div>

                <div className="text-right flex md:flex-col items-center md:items-end justify-between w-full md:w-auto">
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    OCR: {item.ocrAccuracy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
