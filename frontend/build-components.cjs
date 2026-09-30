const fs = require('fs');
const path = require('path');

const components = [
  { name: 'HeritageMap', icon: 'Map' },
  { name: 'Collections', icon: 'Briefcase' },
  { name: 'ArchiveIngestion', icon: 'Database' },
  { name: 'DigitalExhibitions', icon: 'Image' },
  { name: 'StoryMode', icon: 'Monitor' },
  { name: 'OralHistory', icon: 'Mic' },
  { name: 'KioskMode', icon: 'Monitor' },
  { name: 'Analytics', icon: 'PieChart' },
  { name: 'SourceManager', icon: 'Database' },
  { name: 'SystemHealth', icon: 'Activity' }
];

components.forEach(c => {
  const code = `import { ${c.icon} } from 'lucide-react';

export default function ${c.name}() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
        <${c.icon} className="text-[#FF9933]" size={32} />
        ${c.name.replace(/([A-Z])/g, ' $1').trim()}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-card border border-gray-200 p-6 rounded-2xl shadow-sm">
            <div className="h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
              Visual Element {i}
            </div>
            <h3 className="font-bold text-lg mb-2">${c.name.replace(/([A-Z])/g, ' $1').trim()} Module {i}</h3>
            <p className="text-sm text-muted">Simulated functional UI block providing interaction capabilities for ${c.name.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join('src/pages/modules', c.name + '.tsx'), code);
});

let appCode = fs.readFileSync('src/App.tsx', 'utf-8');

const imports = components.map(c => `import ${c.name} from './pages/modules/${c.name}';`).join('\n');
appCode = appCode.replace(/import AdminDashboard from '\.\/pages\/modules\/AdminDashboard';/, "import AdminDashboard from './pages/modules/AdminDashboard';\n" + imports);

appCode = appCode.replace(/<Route path="\/map" element={<Placeholder title="Heritage Map" \/>} \/>/g, '<Route path="/map" element={<HeritageMap />} />');
appCode = appCode.replace(/<Route path="\/collections" element={<Placeholder title="Collections" \/>} \/>/g, '<Route path="/collections" element={<Collections />} />');
appCode = appCode.replace(/<Route path="\/ingestion" element={<Placeholder title="Archive Ingestion" \/>} \/>/g, '<Route path="/ingestion" element={<ArchiveIngestion />} />');
appCode = appCode.replace(/<Route path="\/exhibitions" element={<Placeholder title="Digital Exhibitions" \/>} \/>/g, '<Route path="/exhibitions" element={<DigitalExhibitions />} />');
appCode = appCode.replace(/<Route path="\/story" element={<Placeholder title="Story Mode" \/>} \/>/g, '<Route path="/story" element={<StoryMode />} />');
appCode = appCode.replace(/<Route path="\/oral-history" element={<Placeholder title="Oral History" \/>} \/>/g, '<Route path="/oral-history" element={<OralHistory />} />');
appCode = appCode.replace(/<Route path="\/kiosk" element={<Placeholder title="Kiosk Mode" \/>} \/>/g, '<Route path="/kiosk" element={<KioskMode />} />');
appCode = appCode.replace(/<Route path="\/analytics" element={<Placeholder title="Analytics" \/>} \/>/g, '<Route path="/analytics" element={<Analytics />} />');
appCode = appCode.replace(/<Route path="\/source-manager" element={<Placeholder title="Source Manager" \/>} \/>/g, '<Route path="/source-manager" element={<SourceManager />} />');
appCode = appCode.replace(/<Route path="\/health" element={<Placeholder title="System Health" \/>} \/>/g, '<Route path="/health" element={<SystemHealth />} />');

fs.writeFileSync('src/App.tsx', appCode);
console.log('Done building components!');
