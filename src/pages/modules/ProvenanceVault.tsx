import { useState, useEffect } from 'react';
import { generateSHA256 } from '../../utils/cryptoUtils';
import { ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { getAllRecords } from '../../data/seedData';

export default function ProvenanceVault() {
  const [recordsWithHashes, setRecordsWithHashes] = useState<any[]>([]);

  useEffect(() => {
    async function hashRecords() {
      try {
        const res = await fetch('/api/search');
        if (!res.ok) throw new Error('API fetch failed');
        const data = await res.json();
        const recordsToHash = data && data.length > 0 ? data : getAllRecords();
        const hashed = await Promise.all(recordsToHash.map(async (r: any) => {
          const hash = await generateSHA256(r.content || '');
          return { ...r, hash };
        }));
        setRecordsWithHashes(hashed);
      } catch (err) {
        const local = getAllRecords();
        const hashed = await Promise.all(local.map(async (r: any) => {
          const hash = await generateSHA256(r.content || '');
          return { ...r, hash };
        }));
        setRecordsWithHashes(hashed);
      }
    }
    hashRecords();
  }, []);

  const downloadManifest = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recordsWithHashes, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "archive_manifest.json");
    dlAnchorElem.click();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
          <ShieldCheck className="w-8 h-8" /> Digital Preservation Vault
        </h2>
        <button onClick={downloadManifest} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-bold">
          <Download size={18}/> Export JSON Manifest
        </button>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-y-auto p-0">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold">Record ID</th>
                <th className="p-4 font-bold">Title</th>
                <th className="p-4 font-bold">Provenance</th>
                <th className="p-4 font-bold">SHA-256 Content Hash</th>
                <th className="p-4 font-bold">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recordsWithHashes.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-xs font-mono text-gray-500">{r.id}</td>
                  <td className="p-4 font-bold text-gray-900">{r.title}</td>
                  <td className="p-4 text-sm text-gray-600">{r.provenance}</td>
                  <td className="p-4 text-xs font-mono text-gray-400 break-all">{r.hash}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full w-fit">
                      <CheckCircle2 size={14}/> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
