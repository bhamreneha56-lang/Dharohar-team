// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, BookOpen, Calendar, Filter, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Real GPS Coordinates for all Ambedkar Heritage Sites ───────────────────
const landmarks = [
  {
    id: 'mhow',
    name: 'Mhow Cantonment — Birthplace',
    city: 'Dr. Ambedkar Nagar (Mhow)',
    country: 'Madhya Pradesh, India',
    lat: 22.5557,
    lng: 75.7613,
    year: '1891',
    category: 'birth',
    color: '#FF9933',
    significance: 'Born on April 14, 1891 — the 14th child of Subedar Ramji Sakpal of the Mahar Regiment.',
    description: 'The Military Cantonment of Mhow is where Bhimrao Ramji Ambedkar was born. Despite his father\'s military rank, young Bhimrao faced untouchability in local schools — forced to sit outside classrooms on gunny sacks and denied access to drinking water. The site now hosts the grand Bhim Janmabhoomi memorial open to millions of pilgrims annually.',
    relatedDocId: 'rec-event-001',
    relatedDocTitle: 'Birth of Bhimrao Ramji Ambedkar (1891)',
    connections: ['bombay', 'baroda']
  },
  {
    id: 'bombay',
    name: 'Elphinstone High School & College',
    city: 'Mumbai (Bombay)',
    country: 'Maharashtra, India',
    lat: 18.9387,
    lng: 72.8353,
    year: '1904–1912',
    category: 'education',
    color: '#3B82F6',
    significance: 'First Dalit student admitted to Elphinstone. Received biography of Gautama Buddha from teacher Keluskar — a life-changing moment.',
    description: 'In Bombay, Ambedkar enrolled in Elphinstone High School — one of the first untouchables ever admitted. His teacher Krishnaji Arjun Keluskar gifted him the first Marathi biography of Gautama Buddha, planting the seed of Buddhism that would bloom 45 years later at Nagpur. He later earned his B.A. from Elphinstone College before receiving his Baroda scholarship.',
    relatedDocId: 'rec-event-002',
    relatedDocTitle: 'Admission to Elphinstone High School (1904)',
    connections: ['mhow', 'baroda', 'mahad', 'nagpur_chaity']
  },
  {
    id: 'baroda',
    name: 'Baroda State — Sayajirao Gaekwad Palace',
    city: 'Vadodara (Baroda)',
    country: 'Gujarat, India',
    lat: 22.3072,
    lng: 73.1812,
    year: '1907 & 1917',
    category: 'scholarship',
    color: '#8B5CF6',
    significance: 'Maharaja Sayajirao Gaekwad III provided the pivotal scholarship that sent Ambedkar to Columbia University, New York.',
    description: 'Maharaja Sayajirao Gaekwad III of Baroda was the enlightened ruler who broke all caste barriers by awarding the young Ambedkar a scholarship of £11.50 per month to study at Columbia University. Ambedkar returned to Baroda briefly after his studies — but was denied lodging due to his caste, an experience he documented in "Waiting for a Visa." His bond with Baroda state was crucial to launching his global academic career.',
    relatedDocId: 'rec-event-003',
    relatedDocTitle: 'Columbia University Scholarship (1913)',
    connections: ['mhow', 'bombay', 'new_york']
  },
  {
    id: 'new_york',
    name: 'Columbia University — Morningside Heights',
    city: 'New York City',
    country: 'United States of America',
    lat: 40.8075,
    lng: -73.9626,
    year: '1913–1916',
    category: 'academic',
    color: '#10B981',
    significance: 'Earned M.A. (1915) and Ph.D. (1917) in Economics. Studied under John Dewey, Edwin Seligman, and Alexander Goldenweiser.',
    description: 'Columbia University transformed Ambedkar. For the first time he breathed the air of genuine intellectual equality — no one asked his caste, only his ideas. Under Professor John Dewey he absorbed pragmatic philosophy: that ideas must be tested by real-world consequences. Under Edwin Seligman he wrote his Ph.D. on "Evolution of Provincial Finance in British India." He later presented the seminal paper "Castes in India: Their Mechanism, Genesis and Development" at Goldenweiser\'s anthropology seminar in 1916. Columbia awarded him an honorary LL.D. in 1952. He called Columbia "the centre of my life."',
    relatedDocId: 'rec-book-003',
    relatedDocTitle: 'Castes in India: Their Mechanism (1916)',
    connections: ['baroda', 'london_lse', 'du_bois_location']
  },
  {
    id: 'london_lse',
    name: 'London School of Economics & Gray\'s Inn',
    city: 'London',
    country: 'United Kingdom',
    lat: 51.5144,
    lng: -0.1171,
    year: '1916–1923',
    category: 'academic',
    color: '#10B981',
    significance: 'Completed D.Sc. in Economics (1923) with thesis "The Problem of the Rupee" — foundation of the Reserve Bank of India. Called to the Bar at Gray\'s Inn.',
    description: 'Ambedkar spent formative years at the London School of Economics under Professor Edwin Cannan. His D.Sc. thesis "The Problem of the Rupee: Its Origin and Its Solution" (1923) remains a landmark in monetary economics, directly influencing the Hilton Young Commission (1926) that led to the establishment of the Reserve Bank of India in 1935. He simultaneously qualified as a barrister at Gray\'s Inn. He also attended the First Round Table Conference at St. James\'s Palace in London (1930), demanding equal rights for Scheduled Castes.',
    relatedDocId: 'rec-book-002',
    relatedDocTitle: 'The Problem of the Rupee (1923)',
    connections: ['new_york', 'london_rnd_table', 'bombay']
  },
  {
    id: 'london_rnd_table',
    name: "St. James's Palace — Round Table Conference",
    city: 'London',
    country: 'United Kingdom',
    lat: 51.5036,
    lng: -0.1394,
    year: '1930–1932',
    category: 'politics',
    color: '#F59E0B',
    significance: 'Represented Depressed Classes at all three Round Table Conferences (1930, 1931, 1932), demanding separate electorates and political safeguards.',
    description: 'At St. James\'s Palace, Ambedkar confronted British imperial power and Congress party domination on the world stage. He argued that the Depressed Classes were a distinct political entity separate from caste Hindus and deserved their own representation. At the Second Round Table Conference in 1931, he had his famous confrontation with Gandhi, who refused to accept Ambedkar as a separate representative of untouchables. The British Government\'s subsequent Communal Award (1932) granting separate electorates was the direct result of Ambedkar\'s advocacy — leading to the fateful Poona Pact.',
    relatedDocId: 'rec-speech-003',
    relatedDocTitle: 'First Round Table Conference Address (1930)',
    connections: ['london_lse', 'pune_yerwada']
  },
  {
    id: 'mahad',
    name: 'Chavadar Tank — Mahad Satyagraha Ground',
    city: 'Mahad, Raigad District',
    country: 'Maharashtra, India',
    lat: 18.0865,
    lng: 73.4175,
    year: '1927',
    category: 'movement',
    color: '#EF4444',
    significance: 'Led 10,000 people to drink water from the Chavadar Tank on March 20, 1927 — the Magna Carta of Dalit Human Rights. Burned Manusmriti on December 25, 1927.',
    description: 'The Mahad Satyagraha of 1927 was Dr. Ambedkar\'s first and most dramatic civil rights action. On March 20, 1927, ten thousand people from Dalit communities marched through the streets of Mahad and drank water publicly from the Chavadar Tank — a civic tank that Dalits had been forbidden to touch for centuries despite a municipal resolution permitting access. Upper-caste Hindus rioted and later "purified" the tank with Ganges water and cow dung. Undeterred, at the December 1927 Mahad Conference, Ambedkar publicly burned the Manusmriti — the ancient text that codified caste hierarchy — declaring: "We burn the Manusmriti because it symbolises slavery."',
    relatedDocId: 'rec-event-004',
    relatedDocTitle: 'Mahad Chavadar Tank Water Satyagraha (1927)',
    connections: ['bombay', 'nashik']
  },
  {
    id: 'nashik',
    name: 'Kalaram Temple — Nashik Satyagraha Site',
    city: 'Nashik',
    country: 'Maharashtra, India',
    lat: 19.9975,
    lng: 73.7898,
    year: '1930–1935',
    category: 'movement',
    color: '#EF4444',
    significance: '15,000 Dalits marched for temple entry on March 2, 1930. Six-year non-violent struggle demanding equal rights of worship.',
    description: 'The Kalaram Temple Satyagraha (1930-1935) was a five-year peaceful struggle demanding the unconditional right of Dalits to enter and worship at the famous Kalaram Temple in Nashik. Despite holding a municipal resolution supporting entry, the temple trustees and caste Hindus physically blocked the gates. Ambedkar used the campaign to expose the hypocrisy of Hindu society to an international audience. Though the campaign did not achieve temple entry, it was a powerful demonstration of organised, disciplined non-violent resistance that inspired the later civil rights movement globally.',
    relatedDocId: 'rec-event-005',
    relatedDocTitle: 'Kalaram Temple Entry Satyagraha (1930)',
    connections: ['mahad', 'bombay']
  },
  {
    id: 'pune_yerwada',
    name: 'Yerwada Jail — Poona Pact Site',
    city: 'Pune',
    country: 'Maharashtra, India',
    lat: 18.5464,
    lng: 73.9114,
    year: '1932',
    category: 'politics',
    color: '#F59E0B',
    significance: 'The Poona Pact was signed here on September 24, 1932, after Gandhi\'s fast. Ambedkar sacrificed separate electorates for increased reserved seats.',
    description: 'Yerwada Jail was where Gandhi began his fast-unto-death on September 20, 1932, to oppose the British Communal Award granting Scheduled Castes separate electorates. Ambedkar was placed in a moral trap: if Gandhi died, violent pogroms against Dalits across India would follow. After four days of agonising negotiations, the Poona Pact was signed on September 24, 1932. Ambedkar surrendered separate electorates in exchange for increased reserved seats in legislatures. He later called the day he signed it the worst day of his life. He wrote: "Gandhi has done an irreparable harm to the Scheduled Castes by depriving them of their political independence."',
    relatedDocId: 'rec-event-006',
    relatedDocTitle: 'Poona Pact Negotiations with Gandhi (1932)',
    connections: ['london_rnd_table', 'bombay', 'delhi_const']
  },
  {
    id: 'delhi_const',
    name: 'Constitution Hall — Central Hall of Parliament',
    city: 'New Delhi',
    country: 'India',
    lat: 28.6179,
    lng: 77.2082,
    year: '1947–1950',
    category: 'constitution',
    color: '#000080',
    significance: 'Appointed Chairman of Drafting Committee, August 29, 1947. Framed the world\'s longest democratic constitution over 2 years 11 months and 18 days.',
    description: 'At the Central Hall of Parliament, Dr. Ambedkar led the Constituent Assembly\'s seven-member Drafting Committee. Despite crippling diabetes that hospitalised him multiple times, he worked 18-hour days. He read every constitution in the world — US, Australian, Canadian, Irish, German, French — before crafting India\'s. He personally drafted the sections on Fundamental Rights (Part III), Directive Principles (Part IV), and the federal structure. His November 25, 1949 valedictory speech, warning of the contradiction between political equality and social inequality, remains one of the greatest political speeches ever delivered.',
    relatedDocId: 'rec-speech-001',
    relatedDocTitle: 'Valedictory Address on Constitution Adoption (1949)',
    connections: ['pune_yerwada', 'nagpur_deesha', 'delhi_alipur', 'du_bois_location']
  },
  {
    id: 'nagpur_deesha',
    name: 'Deekshabhoomi — Mass Conversion Ground',
    city: 'Nagpur',
    country: 'Maharashtra, India',
    lat: 21.1348,
    lng: 79.0747,
    year: '1956',
    category: 'spiritual',
    color: '#F97316',
    significance: 'Historic conversion of Dr. Ambedkar and 500,000–600,000 followers to Navayana Buddhism on October 14, 1956 — the largest peaceful mass conversion in human history.',
    description: 'Deekshabhoomi ("Initiation Ground") in Nagpur is among the holiest sites in Navayana Buddhism. On October 14, 1956 — Vijayadashami, the anniversary of Emperor Ashoka\'s conversion — Dr. Ambedkar and approximately 600,000 followers took the Three Refuges and administered the 22 Vows, formally leaving Hinduism and entering Buddhism. The 22 Vows explicitly reject Hindu gods, texts, priests, and untouchability. They affirm equality, compassion, and the path of Prajna (wisdom). Deekshabhoomi today is a massive stupa visited by millions of pilgrims annually on October 14 (Dhamma Chakra Pravartan Din) and December 6 (Mahaparinirvan Din).',
    relatedDocId: 'rec-event-009',
    relatedDocTitle: 'Mass Conversion at Deekshabhoomi (1956)',
    connections: ['delhi_const', 'bombay']
  },
  {
    id: 'nagpur_chaity',
    name: 'Chaityabhoomi — Cremation Memorial, Mumbai',
    city: 'Dadar, Mumbai',
    country: 'Maharashtra, India',
    lat: 19.0178,
    lng: 72.8450,
    year: '1956',
    category: 'memorial',
    color: '#6B7280',
    significance: 'Cremation site of Dr. B.R. Ambedkar on December 7, 1956. Now a major Buddhist pilgrimage destination visited by millions on December 6 (Mahaparinirvan Din).',
    description: 'Chaityabhoomi at Dadar Beach in Mumbai is where Dr. B.R. Ambedkar was cremated on December 7, 1956, with full Buddhist rites. He passed away at 26 Alipur Road, New Delhi, in the early hours of December 6, 1956. His body was flown to Mumbai. More than one million people lined the streets of Mumbai to pay their last respects. Every year on December 6, which is observed as Mahaparinirvan Din (Day of Great Passing into Nirvana), two to three million followers make a pilgrimage to Chaityabhoomi. A grand white stupa now marks the spot.',
    relatedDocId: 'rec-event-010',
    relatedDocTitle: 'Death of Dr. B.R. Ambedkar (December 6, 1956)',
    connections: ['bombay', 'nagpur_deesha']
  },
  {
    id: 'delhi_alipur',
    name: '26 Alipur Road — Ambedkar\'s Final Home',
    city: 'New Delhi',
    country: 'India',
    lat: 28.6357,
    lng: 77.2205,
    year: '1951–1956',
    category: 'memorial',
    color: '#6B7280',
    significance: 'Dr. Ambedkar\'s residence in Delhi during his final years. Here he completed "The Buddha and His Dhamma" and passed away on December 6, 1956.',
    description: '26 Alipur Road housed Dr. Ambedkar during his final years as Law Minister and beyond. The rooms were lined with over 50,000 books — one of the largest private libraries in Asia. He completed the manuscript of "The Buddha and His Dhamma" here just two days before his death. His secretary Nanak Chand Rattu recalled that Ambedkar worked until 3 a.m. every night, surrounded by books, driven by a desperate urgency to complete his life\'s intellectual work before illness overcame him. The house is now the Dr. Ambedkar National Memorial, inaugurated in 2018.',
    relatedDocId: 'rec-event-010',
    relatedDocTitle: 'Death of Dr. B.R. Ambedkar (December 6, 1956)',
    connections: ['delhi_const', 'nagpur_chaity']
  },
  {
    id: 'du_bois_location',
    name: 'NAACP Headquarters — W.E.B. Du Bois Exchange',
    city: 'New York City',
    country: 'United States of America',
    lat: 40.7282,
    lng: -74.0776,
    year: '1946',
    category: 'international',
    color: '#8B5CF6',
    significance: 'In 1946, Dr. Ambedkar wrote to Dr. W.E.B. Du Bois drawing explicit parallels between Dalits and African Americans — one of the earliest transnational solidarity connections between anti-caste and anti-racist movements.',
    description: 'The correspondence between Dr. Ambedkar and Dr. W.E.B. Du Bois in 1946 represents a landmark moment in global civil rights history. Ambedkar wrote to Du Bois recognising the parallel struggles of Dalits in India and African Americans in the United States, both subjected to racial apartheid and structured degradation by birth. Du Bois responded with enthusiasm. Both were attending to the United Nations in 1946 — Ambedkar submitted a memorandum on the conditions of Untouchables to the UN Human Rights Commission, while Du Bois submitted the famous "An Appeal to the World" petition on behalf of Black Americans.',
    relatedDocId: 'rec-ms-001',
    relatedDocTitle: 'Letter to W.E.B. Du Bois (1946)',
    connections: ['new_york', 'delhi_const']
  }
];

const CATEGORY_CONFIG = {
  birth:       { label: 'Birthplace',     color: '#FF9933', bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  education:   { label: 'Education',      color: '#3B82F6', bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-300' },
  scholarship: { label: 'Scholarship',    color: '#8B5CF6', bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  academic:    { label: 'Academic',       color: '#10B981', bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300' },
  politics:    { label: 'Politics',       color: '#F59E0B', bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-300' },
  movement:    { label: 'Movement',       color: '#EF4444', bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-300' },
  constitution:{ label: 'Constitution',   color: '#000080', bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
  spiritual:   { label: 'Spiritual',      color: '#F97316', bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-300' },
  memorial:    { label: 'Memorial',       color: '#6B7280', bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-300' },
  international:{ label: 'International', color: '#8B5CF6', bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
};

export default function HeritageMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selected, setSelected] = useState(landmarks[0]);
  const [filter, setFilter] = useState('all');
  const [mapReady, setMapReady] = useState(false);

  const filtered = filter === 'all' ? landmarks : landmarks.filter(l => l.category === filter);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then(L => {
      // Fix default icon paths
      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      // Create map centered on India
      const map = L.default.map(mapRef.current, {
        center: [22, 79],
        zoom: 4,
        zoomControl: true,
      });

      // OpenStreetMap tiles — FREE, no API key needed
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dr. B.R. Ambedkar Heritage Atlas'
      }).addTo(map);

      mapInstanceRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;

    import('leaflet').then(L => {
      const map = mapInstanceRef.current;

      // Clear previous layers (except tile layer)
      map.eachLayer(layer => {
        if (!(layer instanceof L.default.TileLayer)) {
          map.removeLayer(layer);
        }
      });

      // Draw connection polylines first (so markers appear above)
      const drawnPairs = new Set();
      filtered.forEach(landmark => {
        landmark.connections.forEach(targetId => {
          const pairKey = [landmark.id, targetId].sort().join('--');
          if (drawnPairs.has(pairKey)) return;
          drawnPairs.add(pairKey);

          const target = landmarks.find(l => l.id === targetId);
          if (!target) return;

          L.default.polyline(
            [[landmark.lat, landmark.lng], [target.lat, target.lng]],
            {
              color: '#FF9933',
              weight: 2,
              opacity: 0.55,
              dashArray: '8 6',
              lineJoin: 'round'
            }
          ).addTo(map);
        });
      });

      // Place custom circular SVG markers
      filtered.forEach(landmark => {
        const cfg = CATEGORY_CONFIG[landmark.category] || CATEGORY_CONFIG.memorial;
        const isSelected = landmark.id === selected?.id;

        const svgIcon = L.default.divIcon({
          className: '',
          iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
          iconAnchor: [isSelected ? 19 : 15, isSelected ? 38 : 30],
          popupAnchor: [0, -30],
          html: `
            <div style="
              width:${isSelected ? 38 : 30}px;
              height:${isSelected ? 38 : 30}px;
              border-radius:50%;
              background:${cfg.color};
              border:${isSelected ? '4px' : '2.5px'} solid white;
              box-shadow:0 2px 12px rgba(0,0,0,0.35);
              display:flex;
              align-items:center;
              justify-content:center;
              cursor:pointer;
              transition:all 0.2s;
              ${isSelected ? 'animation: pulse-ring 1.5s infinite;' : ''}
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `
        });

        const marker = L.default.marker([landmark.lat, landmark.lng], { icon: svgIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:260px;max-width:320px;font-family:serif;">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${cfg.color};margin-bottom:4px;">${cfg.label} · ${landmark.year}</div>
              <div style="font-size:15px;font-weight:700;color:#1e293b;margin-bottom:4px;line-height:1.3;">${landmark.name}</div>
              <div style="font-size:12px;color:#64748b;margin-bottom:8px;">📍 ${landmark.city}, ${landmark.country}</div>
              <div style="font-size:12px;font-style:italic;color:#374151;background:#fffbeb;border-left:3px solid ${cfg.color};padding:8px 10px;border-radius:0 6px 6px 0;line-height:1.5;margin-bottom:8px;">"${landmark.significance}"</div>
              <div style="font-size:11px;color:#6b7280;line-height:1.5;">${landmark.description.slice(0, 200)}...</div>
            </div>
          `, { maxWidth: 340 })
          .on('click', () => {
            setSelected(landmark);
          });
      });
    });
  }, [mapReady, filter, selected]);

  const handlePinClick = (landmark) => {
    setSelected(landmark);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([landmark.lat, landmark.lng], 7, { duration: 1.2 });
    }
  };

  const cfg = selected ? (CATEGORY_CONFIG[selected.category] || CATEGORY_CONFIG.memorial) : CATEGORY_CONFIG.birth;

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col relative z-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 pt-5 pb-3 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#000080] flex items-center gap-2">
            <MapPin className="text-[#FF9933]" size={26} />
            Geo-Spatial Heritage Atlas — Dr. B.R. Ambedkar
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {landmarks.length} verified heritage sites · Real GPS coordinates · OpenStreetMap tiles (no API key) · Connection lines show historical journeys
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['all', 'birth', 'education', 'academic', 'movement', 'constitution', 'spiritual', 'politics', 'memorial', 'international'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all capitalize ${
                filter === f
                  ? 'bg-[#000080] text-white border-[#000080] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {f === 'all' ? '🗺 All Sites' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Map + Detail split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">

        {/* ── Leaflet Map ──────────────────────────────────────── */}
        <div className="lg:col-span-2 relative">
          {/* Leaflet CSS injected dynamically */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          />
          <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-md z-[999] text-xs">
            <div className="font-bold text-gray-700 mb-2 flex items-center gap-1"><Info size={12}/> Legend</div>
            <div className="space-y-1">
              {Object.entries(CATEGORY_CONFIG).filter(([k]) => ['birth','academic','movement','constitution','spiritual','memorial','international'].includes(k)).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ background: v.color }} />
                  <span className="text-gray-600">{v.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-5 h-px border-t-2 border-dashed border-[#FF9933]" />
                <span className="text-gray-500">Historical Connection</span>
              </div>
            </div>
          </div>

          {/* Quick Pin Selector Bar */}
          <div className="absolute bottom-4 right-4 z-[999] flex flex-col gap-1 max-h-60 overflow-y-auto">
            {filtered.map(l => (
              <button
                key={l.id}
                onClick={() => handlePinClick(l)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap border transition-all shadow-sm text-left ${
                  selected?.id === l.id
                    ? 'bg-[#FF9933] text-white border-[#FF9933]'
                    : 'bg-white/90 text-gray-700 border-gray-200 hover:bg-white'
                }`}
              >
                📍 {l.city} ({l.year})
              </button>
            ))}
          </div>
        </div>

        {/* ── Detail Panel ─────────────────────────────────────── */}
        <div className="bg-white border-l border-gray-200 shadow-inner flex flex-col overflow-y-auto">
          {selected ? (
            <>
              {/* Top badge */}
              <div className={`p-4 ${cfg.bg} border-b ${cfg.border}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full border ${cfg.border} ${cfg.text} ${cfg.bg}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <Calendar size={12} /> {selected.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-[#000080] leading-tight mt-1">
                  {selected.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <MapPin size={12} className="text-[#FF9933]" />
                  {selected.city}, {selected.country}
                </p>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4 flex-1">
                {/* Significance quote */}
                <div className="p-3 bg-amber-50/70 border-l-4 rounded-r-xl" style={{ borderColor: cfg.color }}>
                  <p className="text-xs font-serif italic text-[#3E2723] leading-relaxed">
                    "{selected.significance}"
                  </p>
                </div>

                {/* Full description */}
                <p className="text-xs text-gray-700 leading-relaxed">
                  {selected.description}
                </p>

                {/* Connections */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                    <ChevronRight size={12} /> Connected Heritage Sites
                  </h4>
                  <div className="space-y-1.5">
                    {selected.connections.map(connId => {
                      const conn = landmarks.find(l => l.id === connId);
                      if (!conn) return null;
                      const connCfg = CATEGORY_CONFIG[conn.category] || CATEGORY_CONFIG.memorial;
                      return (
                        <button
                          key={connId}
                          onClick={() => handlePinClick(conn)}
                          className="w-full flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-left transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: connCfg.color }} />
                            <div>
                              <div className="text-xs font-bold text-gray-800 group-hover:text-[#000080]">
                                {conn.city}
                              </div>
                              <div className="text-[10px] text-gray-400">{conn.year} · {connCfg.label}</div>
                            </div>
                          </div>
                          <MapPin size={12} className="text-gray-400 group-hover:text-[#FF9933]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer — link to primary document */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Primary Archival Document
                </div>
                <Link
                  to={`/reading-desk?recordId=${selected.relatedDocId}`}
                  className="flex items-center justify-between p-3 bg-[#000080] hover:bg-blue-900 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-white/80" />
                    <span className="text-xs font-bold text-white leading-tight">
                      {selected.relatedDocTitle}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-white/60 group-hover:text-white" />
                </Link>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a site on the map or from the list
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
