import { useState } from 'react';
import { Search as SearchIcon, FileText, Send } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am the AI Research Assistant. Ask me any question about Dr. Ambedkar\'s works, speeches, or constitutional debates, and I will search the digital heritage archive for you.' }
  ]);

  const handleSearch = () => {
    if(!query) return;
    setChat(prev => [...prev, { role: 'user', text: query }]);
    setQuery('');
    
    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'ai', text: "Based on the archive, Dr. Ambedkar presented this idea in his speech on the adoption of the Constitution on November 25, 1949. He emphasized that political democracy cannot last unless there lies at the base of it social democracy." }]);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
        <SearchIcon className="w-8 h-8" />
        AI Research Assistant
      </h2>
      
      <div className="flex-1 bg-card border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-lg ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-white border border-gray-200 rounded-tl-none'
              }`}>
                {msg.text}
                {msg.role === 'ai' && i > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-200">
                      <FileText className="w-4 h-4" />
                      Constituent Assembly Debates Vol XI
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-200 flex gap-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-gray-100 border-none outline-none rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-primary/20"
            placeholder="Type your question here (e.g. 'What were Dr. Ambedkar's views on equality?')"
          />
          <button onClick={handleSearch} className="bg-primary text-primary-foreground px-8 py-4 rounded-xl shadow hover:bg-primary/90 flex items-center gap-2 font-bold text-lg transition-colors">
            <Send className="w-6 h-6" />
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
