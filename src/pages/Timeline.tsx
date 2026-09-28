export default function Timeline() {
  const events = [
    { year: 1891, title: "Birth at Mhow", desc: "Born on April 14 in the town and military cantonment of Mhow in the Central Provinces." },
    { year: 1927, title: "Mahad Satyagraha", desc: "Led a satyagraha in Mahad to fight for the right of the untouchable community to draw water from the main water tank." },
    { year: 1936, title: "Independent Labour Party", desc: "Founded the Independent Labour Party, which won 15 seats in the 1937 elections." },
    { year: 1947, title: "Law Minister & Drafting Committee", desc: "Appointed as India's first Law Minister and Chairman of the Constitution Drafting Committee." },
    { year: 1956, title: "Embracing Buddhism", desc: "Converted to Buddhism with hundreds of thousands of followers, a movement known as the Dalit Buddhist movement." }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-primary text-center">Interactive Timeline</h2>
      
      <div className="relative border-l-4 border-primary/20 ml-6 pl-8 space-y-12">
        {events.map((ev) => (
          <div key={ev.year} className="relative">
            <div className="absolute -left-[41px] top-1 w-6 h-6 bg-primary rounded-full border-4 border-white shadow"></div>
            <div className="bg-card border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <span className="text-primary font-bold text-xl mb-1 block">{ev.year}</span>
              <h3 className="text-2xl font-bold mb-2">{ev.title}</h3>
              <p className="text-gray-600 text-lg">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
