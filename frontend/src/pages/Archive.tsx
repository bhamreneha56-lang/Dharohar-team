export default function Archive() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Library & Archive</h2>
      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-64 bg-card border border-gray-200 rounded-xl p-4 shadow-sm h-fit">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Categories</h3>
          <ul className="space-y-3">
            <li className="font-medium text-primary cursor-pointer hover:underline">All Documents</li>
            <li className="text-muted cursor-pointer hover:underline">Speeches</li>
            <li className="text-muted cursor-pointer hover:underline">Constituent Assembly</li>
            <li className="text-muted cursor-pointer hover:underline">Rare Manuscripts</li>
          </ul>
        </aside>

        {/* Content grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock items */}
          <div className="bg-card border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer">
            <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center text-gray-400">PDF Document</div>
            <h4 className="font-bold text-lg mb-2">Annihilation of Caste</h4>
            <p className="text-sm text-muted">1936 • Original English Text</p>
          </div>
          <div className="bg-card border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer">
            <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center text-gray-400">Audio Record</div>
            <h4 className="font-bold text-lg mb-2">Speech at Constituent Assembly</h4>
            <p className="text-sm text-muted">1949 • Audio & Transcript</p>
          </div>
        </div>
      </div>
    </div>
  );
}
