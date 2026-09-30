// @ts-nocheck
import { useState, useEffect } from 'react';
import { Database, Activity, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [health, setHealth] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(() => setHealth({ error: "Failed to connect to backend API." }));
  }, []);

  const syncOpenLibrary = async () => {
    setIsSyncing(true);
    setSyncStatus('Connecting to Open Library API...');
    try {
      const res = await fetch('/api/sync/openlibrary', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSyncStatus(`Completed. Discovered: ${data.discovered}. Added to Archive: ${data.added}.`);
      } else {
        setSyncStatus(`Error: ${data.error}`);
      }
    } catch (e) {
      setSyncStatus('Failed to synchronize. Network error.');
    }
    setIsSyncing(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col h-full">
      <h2 className="text-3xl font-bold font-serif text-[#000080] mb-8 flex items-center gap-3">
        <Database className="w-8 h-8" /> SYSTEM / DATA SOURCES
      </h2>

      <div className="flex gap-8">
        {/* Sync Panel */}
        <div className="w-1/2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-6">
          <h3 className="font-bold text-lg border-b pb-2">Data Ingestion</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div>
                <h4 className="font-bold">Open Library (Books)</h4>
                <p className="text-xs text-gray-500">Fetch B.R. Ambedkar books metadata</p>
              </div>
              <button 
                onClick={syncOpenLibrary}
                disabled={isSyncing}
                className="bg-[#000080] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} /> 
                {isSyncing ? "SYNCING..." : "SYNC NOW"}
              </button>
            </div>
            {/* Additional mocked buttons for UI completeness */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-60">
              <div>
                <h4 className="font-bold">Wikimedia Commons</h4>
                <p className="text-xs text-gray-500">Fetch historical images (Pending config)</p>
              </div>
              <button disabled className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold">CONFIGURE</button>
            </div>
          </div>

          {syncStatus && (
            <div className="mt-4 p-4 bg-blue-50 text-[#000080] border border-blue-200 rounded-lg text-sm font-bold">
              {syncStatus}
            </div>
          )}
        </div>

        {/* API Health Report */}
        <div className="w-1/2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-6">
          <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
            <Activity size={20} /> API Health Report
          </h3>
          
          {health ? (
            <div className="space-y-4">
              {Object.entries(health).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="capitalize font-medium text-gray-600">{key.replace('_', ' ')}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${String(value).includes('CONNECTED') || String(value).includes('ONLINE') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
