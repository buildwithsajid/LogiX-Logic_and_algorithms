import React, { useState, useEffect } from 'react';
import {
  Activity,
  Music,
  Globe,
  Printer,
  MapPin,
  Play,
  Pause,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  Navigation
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import { REAL_WORLD_SIMULATIONS } from '../constants/syllabus.js';

export default function Simulations() {
  const [selectedSim, setSelectedSim] = useState(REAL_WORLD_SIMULATIONS[0]);

  // ==========================================
  // 1. HOSPITAL ER PRIORITY QUEUE / MIN-HEAP STATE
  // ==========================================
  const [erPatients, setErPatients] = useState([
    { id: 1, name: 'Alice Jenkins', condition: 'Acute Myocardial Infarction', priority: 1, time: '10:02 AM' },
    { id: 2, name: 'Robert Chen', condition: 'Compound Femur Fracture', priority: 2, time: '10:14 AM' },
    { id: 3, name: 'Elena Gomez', condition: 'Severe Laceration', priority: 3, time: '10:19 AM' },
    { id: 4, name: 'David Smith', condition: 'High Fever & Dehydration', priority: 4, time: '10:25 AM' }
  ]);
  const [erLog, setErLog] = useState('Triage system initialized. Priority 1 patients automatically bubble to heap root.');

  const admitPatient = (priority = null) => {
    const candidates = [
      { name: 'Michael Scott', condition: 'Respiratory Distress', p: 1 },
      { name: 'Sarah Connor', condition: 'Cranial Trauma', p: 1 },
      { name: 'Walter White', condition: 'Severe Asthma Attack', p: 2 },
      { name: 'Bruce Wayne', condition: 'Dislocated Shoulder', p: 3 },
      { name: 'Peter Parker', condition: 'Mild Concussion', p: 4 }
    ];
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    const pVal = priority !== null ? priority : picked.p;

    const newPt = {
      id: Date.now(),
      name: picked.name,
      condition: picked.condition,
      priority: pVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Priority Queue: sorted primarily by acuity score (Priority 1 > 2 > 3 > 4)
    const updated = [...erPatients, newPt].sort((a, b) => a.priority - b.priority);
    setErPatients(updated);
    setErLog(`Admitted ${newPt.name} with Priority ${pVal} (${newPt.condition}). Reheap operation executed.`);
  };

  const treatTopPatient = () => {
    if (erPatients.length === 0) return;
    const top = erPatients[0];
    setErPatients(erPatients.slice(1));
    setErLog(`Treated top priority patient: ${top.name} (Priority ${top.priority}). Heap root extracted.`);
  };

  // ==========================================
  // 2. MUSIC PLAYLIST CIRCULAR LINKED LIST STATE
  // ==========================================
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Midnight City', artist: 'M83', duration: '4:03', color: '#6366F1' },
    { id: 2, title: 'Starboy', artist: 'The Weeknd', duration: '3:50', color: '#EC4899' },
    { id: 3, title: 'Get Lucky', artist: 'Daft Punk', duration: '4:08', color: '#06B6D4' },
    { id: 4, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', color: '#F59E0B' }
  ]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicProgress, setMusicProgress] = useState(35);

  const nextTrack = () => {
    // Circular link: (current + 1) % playlist.length
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setMusicProgress(0);
  };

  const prevTrack = () => {
    // Circular link backwards: (current - 1 + length) % length
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setMusicProgress(0);
  };

  const addSong = () => {
    const samples = [
      { title: 'Clair de Lune', artist: 'Flight Facilities', duration: '4:15', color: '#10B981' },
      { title: 'Resonance', artist: 'HOME', duration: '3:32', color: '#8B5CF6' },
      { title: 'Nightcall', artist: 'Kavinsky', duration: '4:19', color: '#EF4444' }
    ];
    const song = samples[playlist.length % samples.length];
    setPlaylist([...playlist, { ...song, id: Date.now() }]);
  };

  // ==========================================
  // 3. BROWSER DUAL-STACK NAVIGATION STATE
  // ==========================================
  const [currentUrl, setCurrentUrl] = useState('https://github.com/torvalds/linux');
  const [backStack, setBackStack] = useState([
    'https://google.com',
    'https://stackoverflow.com/questions/dsa'
  ]);
  const [forwardStack, setForwardStack] = useState([]);
  const [browserLog, setBrowserLog] = useState('Browser session ready.');

  const navigateTo = (url) => {
    if (!url || url === currentUrl) return;
    // Push current to backStack, set new URL, CLEAR forwardStack
    setBackStack([...backStack, currentUrl]);
    setCurrentUrl(url);
    setForwardStack([]);
    setBrowserLog(`Navigated to ${url}. Pushed previous to Back Stack; cleared Forward Stack.`);
  };

  const handleBrowserBack = () => {
    if (backStack.length === 0) return;
    const prevUrl = backStack[backStack.length - 1];
    setBackStack(backStack.slice(0, -1));
    setForwardStack([currentUrl, ...forwardStack]);
    setCurrentUrl(prevUrl);
    setBrowserLog(`Back button: popped from Back Stack to visit ${prevUrl}. Pushed to Forward Stack.`);
  };

  const handleBrowserForward = () => {
    if (forwardStack.length === 0) return;
    const nextUrl = forwardStack[0];
    setForwardStack(forwardStack.slice(1));
    setBackStack([...backStack, currentUrl]);
    setCurrentUrl(nextUrl);
    setBrowserLog(`Forward button: popped from Forward Stack to visit ${nextUrl}. Pushed to Back Stack.`);
  };

  // ==========================================
  // 4. NETWORK PRINTER FIFO QUEUE STATE
  // ==========================================
  const [printQueue, setPrintQueue] = useState([
    { id: 101, doc: 'CS301_Final_Exam.pdf', pages: 12, owner: 'Prof. Miller', status: 'Printing', progress: 45 },
    { id: 102, doc: 'Software_Engineering_Spec.docx', pages: 6, owner: 'Sarah K.', status: 'Queued', progress: 0 },
    { id: 103, doc: 'Algorithmic_Proofs_Draft.pdf', pages: 18, owner: 'David L.', status: 'Queued', progress: 0 }
  ]);
  const [printerLog, setPrinterLog] = useState('Print spooler online. FIFO policy active.');

  const addPrintJob = () => {
    const docs = [
      { doc: 'Research_Paper_Final.pdf', pages: 14, owner: 'Alex M.' },
      { doc: 'Lab_Assignment_3.java', pages: 4, owner: 'Jordan T.' },
      { doc: 'Graduation_Thesis.pdf', pages: 35, owner: 'Elena R.' }
    ];
    const picked = docs[Math.floor(Math.random() * docs.length)];
    const newJob = {
      id: Date.now(),
      doc: picked.doc,
      pages: picked.pages,
      owner: picked.owner,
      status: printQueue.length === 0 ? 'Printing' : 'Queued',
      progress: 0
    };
    setPrintQueue([...printQueue, newJob]);
    setPrinterLog(`Enqueued "${picked.doc}" at rear of FIFO queue.`);
  };

  const finishTopPrintJob = () => {
    if (printQueue.length === 0) return;
    const finished = printQueue[0];
    const remaining = printQueue.slice(1);
    if (remaining.length > 0) {
      remaining[0].status = 'Printing';
    }
    setPrintQueue(remaining);
    setPrinterLog(`Dequeued finished job "${finished.doc}" (${finished.pages} pages). Next job promoted to front.`);
  };

  // ==========================================
  // 5. GPS CITY ROUTE FINDER (WEIGHTED GRAPH & DIJKSTRA)
  // ==========================================
  const CITY_LANDMARKS = [
    { id: 0, name: 'Central Station', x: 80, y: 150 },
    { id: 1, name: 'City Hospital', x: 220, y: 60 },
    { id: 2, name: 'University Campus', x: 220, y: 240 },
    { id: 3, name: 'Tech Park', x: 380, y: 70 },
    { id: 4, name: 'Downtown Plaza', x: 380, y: 230 },
    { id: 5, name: 'Harbor Port', x: 500, y: 150 }
  ];

  const CITY_EDGES = [
    { u: 0, v: 1, weight: 4 },
    { u: 0, v: 2, weight: 7 },
    { u: 1, v: 3, weight: 6 },
    { u: 1, v: 4, weight: 5 },
    { u: 2, v: 4, weight: 3 },
    { u: 3, v: 5, weight: 5 },
    { u: 4, v: 5, weight: 4 },
    { u: 3, v: 4, weight: 2 }
  ];

  const [routeStart, setRouteStart] = useState(0);
  const [routeEnd, setRouteEnd] = useState(5);
  const [shortestPathEdges, setShortestPathEdges] = useState([]);
  const [totalRouteDistance, setTotalRouteDistance] = useState(11);
  const [routePathNames, setRoutePathNames] = useState([]);

  // Compute Dijkstra Shortest Path
  const computeCityRoute = (src = routeStart, dest = routeEnd) => {
    const V = CITY_LANDMARKS.length;
    const dist = new Array(V).fill(Infinity);
    const parent = new Array(V).fill(-1);
    const visited = new Array(V).fill(false);

    dist[src] = 0;

    for (let count = 0; count < V - 1; count++) {
      let min = Infinity;
      let u = -1;
      for (let v = 0; v < V; v++) {
        if (!visited[v] && dist[v] < min) {
          min = dist[v];
          u = v;
        }
      }
      if (u === -1) break;
      visited[u] = true;

      // Relax neighbors
      CITY_EDGES.forEach((edge) => {
        let neighbor = -1;
        if (edge.u === u) neighbor = edge.v;
        else if (edge.v === u) neighbor = edge.u;

        if (neighbor !== -1 && !visited[neighbor]) {
          if (dist[u] + edge.weight < dist[neighbor]) {
            dist[neighbor] = dist[u] + edge.weight;
            parent[neighbor] = u;
          }
        }
      });
    }

    // Reconstruct path
    const pathNodes = [];
    let curr = dest;
    while (curr !== -1) {
      pathNodes.unshift(curr);
      curr = parent[curr];
    }

    // Reconstruct edges
    const edgesUsed = [];
    for (let i = 0; i < pathNodes.length - 1; i++) {
      const u = pathNodes[i];
      const v = pathNodes[i + 1];
      edgesUsed.push({ u, v });
    }

    setShortestPathEdges(edgesUsed);
    setTotalRouteDistance(dist[dest]);
    setRoutePathNames(pathNodes.map(id => CITY_LANDMARKS[id].name));
  };

  useEffect(() => {
    computeCityRoute(routeStart, routeEnd);
  }, [routeStart, routeEnd]);

  return (
    <PageContainer
      title="Real-World Software Engineering Simulations"
      subtitle="Discover how classical data structures power production systems in healthcare, media streaming, web browsers, and logistics."
    >
      {/* Simulation Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {REAL_WORLD_SIMULATIONS.map((sim) => {
          const isSelected = selectedSim.id === sim.id;
          return (
            <button
              key={sim.id}
              onClick={() => setSelectedSim(sim)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                  : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-white mb-1">{sim.title}</div>
                <div className="text-[10px] font-mono text-cyan-400 line-clamp-1">{sim.dataStructure}</div>
              </div>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 font-mono">
                <span>Open Scenario</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader
              title={selectedSim.title}
              subtitle={selectedSim.description}
              badge={<span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800">{selectedSim.dataStructure}</span>}
            />

            {/* SCENARIO 1: HOSPITAL ER TRIAGE (PRIORITY QUEUE) */}
            {selectedSim.id === 'hospital-er' && (
              <div className="space-y-4">
                <div className="bg-[#0B1020] rounded-xl border border-brand-border p-4">
                  <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-3">
                    <span>Priority Queue Heap Order (Priority 1 = Critical Triage)</span>
                    <span className="text-amber-400 font-bold">{erPatients.length} Waiting in Heap</span>
                  </div>

                  <div className="space-y-2">
                    {erPatients.map((pt, idx) => (
                      <div
                        key={pt.id}
                        className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                          idx === 0
                            ? 'bg-rose-950/30 border-rose-500/50 text-white shadow-sm'
                            : 'bg-brand-card/70 border-brand-border text-brand-text'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                              pt.priority === 1
                                ? 'bg-rose-500 text-white animate-pulse'
                                : pt.priority === 2
                                ? 'bg-amber-500 text-slate-950 font-bold'
                                : 'bg-blue-500 text-white'
                            }`}
                          >
                            P{pt.priority}
                          </span>
                          <div>
                            <div className="font-semibold text-xs text-white">{pt.name}</div>
                            <div className="text-[10px] font-mono text-brand-muted">{pt.condition} · Admitted {pt.time}</div>
                          </div>
                        </div>

                        {idx === 0 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">
                            Heap Root [Index 0] — Next Treated
                          </span>
                        )}
                      </div>
                    ))}

                    {erPatients.length === 0 && (
                      <div className="text-center py-8 text-xs font-mono text-emerald-400">
                        All patients treated! Priority queue heap is empty.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Button variant="primary" size="sm" onClick={() => admitPatient()} icon={Plus}>
                      Admit Patient
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => admitPatient(1)} icon={Activity} className="text-rose-400 border-rose-500/40">
                      Emergency (P1)
                    </Button>
                    <Button variant="secondary" size="sm" onClick={treatTopPatient} disabled={erPatients.length === 0} icon={CheckCircle2}>
                      Treat Root Patient
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-cyan-300">
                  {erLog}
                </div>
              </div>
            )}

            {/* SCENARIO 2: MUSIC PLAYLIST (CIRCULAR LINKED LIST) */}
            {selectedSim.id === 'music-playlist' && (
              <div className="space-y-4">
                <div className="bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <div
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mb-3 transition-transform duration-1000 ${
                      isPlayingMusic ? 'rotate-180 shadow-glow-primary' : ''
                    }`}
                    style={{ borderColor: playlist[currentTrackIndex].color, backgroundColor: `${playlist[currentTrackIndex].color}20` }}
                  >
                    <Music className="w-10 h-10" style={{ color: playlist[currentTrackIndex].color }} />
                  </div>

                  <div className="text-base font-bold text-white text-center">{playlist[currentTrackIndex].title}</div>
                  <div className="text-xs font-mono text-brand-muted text-center mt-0.5">
                    {playlist[currentTrackIndex].artist} • {playlist[currentTrackIndex].duration}
                  </div>

                  {/* Circular Node Indicators */}
                  <div className="flex items-center gap-2 mt-5 overflow-x-auto p-2 bg-brand-bg rounded-xl border border-brand-border max-w-full">
                    {playlist.map((track, idx) => (
                      <div
                        key={track.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 shrink-0 ${
                          idx === currentTrackIndex
                            ? 'bg-brand-primary/20 text-brand-accent border-brand-accent font-bold'
                            : 'bg-brand-card text-slate-400 border-brand-border/60'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
                        <span>{track.title}</span>
                      </div>
                    ))}
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0">➔ Circular Link to Head</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button variant="secondary" size="sm" onClick={prevTrack} icon={ArrowLeft}>
                    Prev Node
                  </Button>
                  <Button
                    variant={isPlayingMusic ? 'accent' : 'primary'}
                    size="md"
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    icon={isPlayingMusic ? Pause : Play}
                  >
                    {isPlayingMusic ? 'Pause' : 'Play'}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={nextTrack} icon={SkipForward}>
                    Next Node (Loop)
                  </Button>
                  <Button variant="secondary" size="sm" onClick={addSong} icon={Plus}>
                    Add Song
                  </Button>
                </div>
              </div>
            )}

            {/* SCENARIO 3: BROWSER HISTORY (TWO STACKS) */}
            {selectedSim.id === 'browser-history' && (
              <div className="space-y-4">
                {/* Browser URL Bar */}
                <div className="bg-[#0B1020] rounded-xl border border-brand-border p-3 flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBrowserBack}
                    disabled={backStack.length === 0}
                    icon={ArrowLeft}
                    title="Pop from Back Stack"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBrowserForward}
                    disabled={forwardStack.length === 0}
                    icon={ArrowRight}
                    title="Pop from Forward Stack"
                  />
                  <div className="flex-1 bg-brand-bg border border-brand-border rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-400 truncate flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{currentUrl}</span>
                  </div>
                </div>

                {/* Dual Stack Chambers */}
                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  {/* Back Stack */}
                  <div className="p-3.5 rounded-xl bg-brand-bg/80 border border-brand-border">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border text-brand-muted text-[11px]">
                      <span>Back Stack ({backStack.length})</span>
                      <span className="text-cyan-400">LIFO History</span>
                    </div>
                    <div className="space-y-1.5 mt-2 max-h-36 overflow-y-auto">
                      {backStack.slice().reverse().map((url, i) => (
                        <div key={i} className="p-2 rounded bg-brand-card border border-brand-border text-[11px] truncate text-slate-300">
                          {url}
                        </div>
                      ))}
                      {backStack.length === 0 && (
                        <div className="text-center py-4 text-[10px] text-slate-500">Back Stack Empty</div>
                      )}
                    </div>
                  </div>

                  {/* Forward Stack */}
                  <div className="p-3.5 rounded-xl bg-brand-bg/80 border border-brand-border">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border text-brand-muted text-[11px]">
                      <span>Forward Stack ({forwardStack.length})</span>
                      <span className="text-amber-400">LIFO Forward</span>
                    </div>
                    <div className="space-y-1.5 mt-2 max-h-36 overflow-y-auto">
                      {forwardStack.map((url, i) => (
                        <div key={i} className="p-2 rounded bg-brand-card border border-brand-border text-[11px] truncate text-slate-300">
                          {url}
                        </div>
                      ))}
                      {forwardStack.length === 0 && (
                        <div className="text-center py-4 text-[10px] text-slate-500">Forward Stack Empty</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preset Navigation URL Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-brand-muted">Navigate to:</span>
                  {[
                    'https://stackoverflow.com/questions',
                    'https://en.wikipedia.org/wiki/Dijkstra',
                    'https://news.ycombinator.com',
                    'https://developer.mozilla.org'
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => navigateTo(preset)}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-brand-card hover:bg-slate-800 text-slate-300 border border-brand-border transition-colors truncate max-w-[200px]"
                    >
                      {preset.replace('https://', '')}
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-cyan-300">
                  {browserLog}
                </div>
              </div>
            )}

            {/* SCENARIO 4: PRINTER JOB SPOOLER (FIFO QUEUE) */}
            {selectedSim.id === 'printer-spooler' && (
              <div className="space-y-4">
                <div className="bg-[#0B1020] rounded-xl border border-brand-border p-4">
                  <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-3">
                    <span className="flex items-center gap-1.5">
                      <Printer className="w-4 h-4 text-brand-primary" />
                      FIFO Spooler Conveyor (Front ➔ Rear)
                    </span>
                    <span className="text-emerald-400 font-bold">{printQueue.length} Jobs in Buffer</span>
                  </div>

                  <div className="space-y-2">
                    {printQueue.map((job, idx) => (
                      <div
                        key={job.id}
                        className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                          idx === 0
                            ? 'bg-indigo-950/30 border-indigo-500/50 text-white'
                            : 'bg-brand-card/70 border-brand-border text-brand-text'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            idx === 0 ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx === 0 ? 'FRONT (ACTIVE)' : `REAR #${idx}`}
                          </span>
                          <div>
                            <div className="font-semibold text-xs text-white">{job.doc}</div>
                            <div className="text-[10px] font-mono text-brand-muted">{job.pages} pages · Owner: {job.owner}</div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          job.status === 'Printing'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    ))}

                    {printQueue.length === 0 && (
                      <div className="text-center py-8 text-xs font-mono text-emerald-400">
                        Print queue empty. All jobs processed in FIFO order.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="primary" size="sm" onClick={addPrintJob} icon={Plus}>
                    Enqueue Print Job
                  </Button>
                  <Button variant="secondary" size="sm" onClick={finishTopPrintJob} disabled={printQueue.length === 0} icon={CheckCircle2}>
                    Dequeue (Print Complete)
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-cyan-300">
                  {printerLog}
                </div>
              </div>
            )}

            {/* SCENARIO 5: GPS CITY ROUTE FINDER (DIJKSTRA) */}
            {selectedSim.id === 'city-routes' && (
              <div className="space-y-4">
                {/* Route Selector Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-brand-bg rounded-xl border border-brand-border font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-muted">Origin:</span>
                    <select
                      value={routeStart}
                      onChange={(e) => setRouteStart(Number(e.target.value))}
                      className="bg-brand-card border border-brand-border rounded px-2.5 py-1 text-white text-xs cursor-pointer focus:outline-none focus:border-brand-accent"
                    >
                      {CITY_LANDMARKS.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-brand-muted">Destination:</span>
                    <select
                      value={routeEnd}
                      onChange={(e) => setRouteEnd(Number(e.target.value))}
                      className="bg-brand-card border border-brand-border rounded px-2.5 py-1 text-white text-xs cursor-pointer focus:outline-none focus:border-brand-accent"
                    >
                      {CITY_LANDMARKS.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>

                  <Button variant="primary" size="sm" onClick={() => computeCityRoute(routeStart, routeEnd)} icon={Navigation}>
                    Calculate Shortest Route
                  </Button>
                </div>

                {/* 2D City Landmark Graph SVG Canvas */}
                <div className="bg-[#070B16] rounded-xl border border-brand-border p-4 relative overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 580 300" className="w-full h-64 select-none">
                    {/* Render Graph Edges */}
                    {CITY_EDGES.map((edge, idx) => {
                      const u = CITY_LANDMARKS[edge.u];
                      const v = CITY_LANDMARKS[edge.v];
                      const isShortestPath = shortestPathEdges.some(
                        e => (e.u === edge.u && e.v === edge.v) || (e.u === edge.v && e.v === edge.u)
                      );

                      const midX = (u.x + v.x) / 2;
                      const midY = (u.y + v.y) / 2;

                      return (
                        <g key={idx}>
                          <line
                            x1={u.x}
                            y1={u.y}
                            x2={v.x}
                            y2={v.y}
                            stroke={isShortestPath ? '#22C55E' : '#334155'}
                            strokeWidth={isShortestPath ? 4 : 2}
                            strokeDasharray={isShortestPath ? 'none' : '4 4'}
                            className="transition-all duration-500"
                          />
                          <rect
                            x={midX - 10}
                            y={midY - 8}
                            width={20}
                            height={16}
                            fill="#0B1020"
                            rx={4}
                          />
                          <text
                            x={midX}
                            y={midY + 4}
                            textAnchor="middle"
                            fill={isShortestPath ? '#22C55E' : '#94A3B8'}
                            fontSize="10"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {edge.weight}k
                          </text>
                        </g>
                      );
                    })}

                    {/* Render City Landmark Nodes */}
                    {CITY_LANDMARKS.map((node) => {
                      const isOrigin = node.id === routeStart;
                      const isDest = node.id === routeEnd;
                      const isIntermediate = routePathNames.includes(node.name) && !isOrigin && !isDest;

                      return (
                        <g key={node.id}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isOrigin || isDest ? 16 : 13}
                            fill={
                              isOrigin ? '#06B6D4' :
                              isDest ? '#22C55E' :
                              isIntermediate ? '#6366F1' :
                              '#151D30'
                            }
                            stroke={isOrigin || isDest || isIntermediate ? '#F8FAFC' : '#475569'}
                            strokeWidth={2}
                            className="transition-all duration-300"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="10"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            {node.id}
                          </text>
                          <text
                            x={node.x}
                            y={node.y + 28}
                            textAnchor="middle"
                            fill="#CBD5E1"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight={isOrigin || isDest ? 'bold' : 'normal'}
                          >
                            {node.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Optimal Route Summary Banner */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-emerald-400 font-bold block">
                      Shortest Path Found: {routePathNames.join(' ➔ ')}
                    </span>
                    <span className="text-brand-muted text-[11px] mt-0.5 block">
                      Calculated via Dijkstra Single-Source Greedy Edge Relaxation
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-brand-muted">Total Distance:</span>
                    <span className="text-base font-bold text-emerald-400 block">{totalRouteDistance} km</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Side: Architectural Engineering Insights */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Architectural Insight"
              subtitle="Data structure selection rationale"
            />
            <div className="space-y-3 text-xs text-brand-muted leading-relaxed font-mono">
              <p>
                In high-reliability software engineering, data structure choice directly determines scalability and algorithmic guarantees.
              </p>
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-[11px] text-cyan-300">
                Active Structure: <strong className="text-white">{selectedSim.dataStructure}</strong>
              </div>
              <p>
                By avoiding artificial mock logic and executing genuine algorithm primitives, students see how real-world frameworks (such as Linux task schedulers, V8 call stacks, and GPS systems) leverage these exact structures.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
