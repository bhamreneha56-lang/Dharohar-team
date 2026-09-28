// @ts-nocheck
import { useState } from 'react';
import { ClipboardCheck, FileText, CheckCircle, AlertCircle, Bot, Shield, ArrowRight } from 'lucide-react';

export default function VerificationQueue() {
  const [queue] = useState([
    { id: 'Q-001', title: 'Letter to British Parliament', stage: 'TEXT_REVIEW', ocrConfidence: 89, assigned: 'Unassigned', source: 'London Archives' },
    { id: 'Q-002', title: 'Mahad Satyagraha Pamphlet', stage: 'METADATA_REVIEW', ocrConfidence: 95, assigned: 'Dr. Kamble', source: 'Regional Press' },
    { id: 'Q-003', title: 'Constituent Assembly Vol 3', stage: 'OCR_COMPLETE', ocrConfidence: 72, assigned: 'System', source: 'National Archives' },
    { id: 'Q-004', title: 'Personal Diary Entry (1932)', stage: 'INGESTED', ocrConfidence: 0, assigned: 'System', source: 'Private Donor' }
  ]);

  const stages = [
    { key: 'INGESTED', label: 'Ingested', color: 'bg-gray-100 text-gray-600' },
    { key: 'OCR_COMPLETE', label: 'OCR Complete', color: 'bg-purple-100 text-purple-700' },
    { key: 'METADATA_REVIEW', label: 'Metadata Review', color: 'bg-yellow-100 text-yellow-700' },
    { key: 'TEXT_REVIEW', label: 'Text Review', color: 'bg-blue-100 text-blue-700' },
    { key: 'APPROVED', label: 'Approved', color: 'bg-green-100 text-green-700' }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold font-serif text-[#000080] flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8" /> Human Verification Queue
          </h2>
          <p className="text-gray-500 mt-2">Where raw data becomes verified archival knowledge.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-2xl font-black text-[#000080]">1,240</div>
            <div className="text-xs font-bold text-gray-400 uppercase">Awaiting Review</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-green-600">8,932</div>
            <div className="text-xs font-bold text-gray-400 uppercase">Human Verified</div>
          </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl p-6 flex gap-6 overflow-x-auto">
        {stages.map((stage, idx) => {
          const items = queue.filter(q => q.stage === stage.key);
          
          return (
            <div key={stage.key} className="flex-none w-[300px] flex flex-col bg-gray-50/50 rounded-xl border border-gray-200/50 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">{stage.label}</h3>
                <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm text-gray-500">{items.length}</span>
              </div>
              
              <div className="flex-1 space-y-3 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#000080]/30 transition-all cursor-pointer group relative overflow-hidden">
                    {stage.key === 'OCR_COMPLETE' && item.ocrConfidence < 80 && (
                       <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">{item.id}</span>
                      {stage.key !== 'INGESTED' && (
                        <span className={`flex items-center gap-1 text-[10px] font-bold ${item.ocrConfidence > 85 ? 'text-green-500' : 'text-orange-500'}`}>
                          <Bot size={10}/> {item.ocrConfidence}% Conf
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm mb-3 leading-tight">{item.title}</h4>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-xs text-gray-500">{item.source}</div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#000080] opacity-0 group-hover:opacity-100 transition-opacity">
                        Review <ArrowRight size={12}/>
                      </div>
                    </div>
                  </div>
                ))}
                
                {items.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm p-4 text-center border-2 border-dashed border-gray-200 rounded-xl">
                    No items in this stage
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
