import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  BarChart2,
  Info,
  Search,
  Zap,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  Cpu
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import {
  THEORETICAL_CLASSES,
  generateTheoreticalData,
  DSA_COMPLEXITY_DIRECTORY,
  BENCHMARK_PAIRS,
  runEmpiricalBenchmark
} from '../algorithms/complexity/complexityData.js';

export default function ComplexityAnalyzer() {
  // Theoretical Chart Controls
  const [maxN, setMaxN] = useState(64);
  const [useLogScale, setUseLogScale] = useState(false);
  const [visibleClasses, setVisibleClasses] = useState({
    'O(1)': true,
    'O(log n)': true,
    'O(n)': true,
    'O(n log n)': true,
    'O(n²)': true,
    'O(n³)': false,
    'O(2^n)': false
  });

  // Empirical Benchmarking Controls
  const [selectedAlgo, setSelectedAlgo] = useState('bubble');
  const [selectedDistribution, setSelectedDistribution] = useState('random');
  const [empiricalResults, setEmpiricalResults] = useState(() =>
    runEmpiricalBenchmark('bubble', 'random', [5, 10, 20, 30, 50])
  );

  // Syllabus Comparative Pair
  const [selectedPairId, setSelectedPairId] = useState('bubble-vs-quick');

  // Master Directory Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedDirectoryItem, setExpandedDirectoryItem] = useState(null);

  // Compute theoretical data points
  const theoreticalData = useMemo(() => {
    return generateTheoreticalData(maxN);
  }, [maxN]);

  // Toggle visible complexity curves
  const toggleClassVisibility = (id) => {
    setVisibleClasses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Run live empirical benchmark
  const handleRunBenchmark = () => {
    const res = runEmpiricalBenchmark(selectedAlgo, selectedDistribution, [5, 10, 20, 30, 50, 75]);
    setEmpiricalResults(res);
  };

  // Filtered Directory
  const categories = ['All', 'Sorting', 'Searching', 'Linear DS', 'Trees & Heaps', 'Graphs', 'Hashing'];

  const filteredDirectory = useMemo(() => {
    return DSA_COMPLEXITY_DIRECTORY.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.bestTime.toLowerCase().includes(q) ||
        item.worstTime.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activePair = BENCHMARK_PAIRS.find(p => p.id === selectedPairId) || BENCHMARK_PAIRS[0];

  return (
    <PageContainer
      title="Complexity Analyzer & Growth Curves"
      subtitle="Analyze theoretical asymptotic bounds, compare growth classes O(1) through O(2ⁿ), run live empirical operation counting, and inspect the master syllabus matrix."
      badge="Phase 5"
    >
      {/* 1. Theoretical Asymptotic Growth Curves */}
      <Card>
        <CardHeader
          title="Theoretical Big-O Growth Curves"
          subtitle="Visualize how computational operations scale as input size n increases towards infinity."
          badge={<TrendingUp className="w-4 h-4 text-brand-accent" />}
        />

        {/* Chart Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-brand-bg rounded-xl border border-brand-border mb-4">
          {/* Curve Toggle Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-brand-muted uppercase">Toggle Curves:</span>
            {THEORETICAL_CLASSES.map((cls) => {
              const isVisible = visibleClasses[cls.id];
              return (
                <button
                  key={cls.id}
                  onClick={() => toggleClassVisibility(cls.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all flex items-center gap-1.5 ${
                    isVisible
                      ? 'bg-slate-800 text-white border-slate-600'
                      : 'bg-brand-bg/40 text-slate-500 border-brand-border/60 hover:text-slate-400'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: isVisible ? cls.color : '#475569' }}
                  />
                  <span>{cls.id}</span>
                </button>
              );
            })}
          </div>

          {/* Scale & N Sliders */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setUseLogScale(!useLogScale)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                useLogScale
                  ? 'bg-brand-primary/20 text-brand-accent border-brand-accent font-semibold'
                  : 'bg-brand-bg text-slate-400 border-brand-border hover:border-slate-600'
              }`}
            >
              Scale: {useLogScale ? 'Logarithmic (log₁₀)' : 'Linear'}
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
              <span>Max n:</span>
              <select
                value={maxN}
                onChange={(e) => setMaxN(Number(e.target.value))}
                className="bg-brand-card border border-brand-border rounded px-2 py-1 text-white text-xs cursor-pointer focus:outline-none focus:border-brand-accent"
              >
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={64}>64</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recharts Theoretical Line Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={theoreticalData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="n" stroke="#64748B" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis
                scale={useLogScale ? 'log' : 'auto'}
                domain={useLogScale ? [1, 'auto'] : [0, 'auto']}
                stroke="#64748B"
                tick={{ fontSize: 11, fontFamily: 'monospace' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
              {THEORETICAL_CLASSES.map((cls) => {
                if (!visibleClasses[cls.id]) return null;
                return (
                  <Line
                    key={cls.id}
                    type="monotone"
                    dataKey={cls.id}
                    stroke={cls.color}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: cls.color }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Live Empirical Benchmark & Measured Operations Overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader
              title="Empirical Operation Counting Analyzer"
              subtitle="Execute real JavaScript/Java algorithm logic across varying input sizes to measure exact operation counts."
              badge={<Zap className="w-4 h-4 text-emerald-400" />}
            />

            {/* Benchmark Setup Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-brand-bg rounded-xl border border-brand-border">
              <div className="flex flex-wrap items-center gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-brand-muted uppercase block">Algorithm</label>
                  <select
                    value={selectedAlgo}
                    onChange={(e) => setSelectedAlgo(e.target.value)}
                    className="bg-brand-card border border-brand-border rounded px-2.5 py-1 text-white text-xs cursor-pointer focus:outline-none focus:border-brand-accent font-mono"
                  >
                    <option value="bubble">Bubble Sort — O(n²)</option>
                    <option value="insertion">Insertion Sort — O(n²)</option>
                    <option value="selection">Selection Sort — O(n²)</option>
                    <option value="shell">Shell Sort — O(n^(3/2))</option>
                    <option value="quick">Quick Sort — O(n log n)</option>
                    <option value="radix">Radix Sort — O(d·(n+k))</option>
                    <option value="linear-search">Linear Search — O(n)</option>
                    <option value="binary-search">Binary Search — O(log n)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-brand-muted uppercase block">Input Dataset</label>
                  <select
                    value={selectedDistribution}
                    onChange={(e) => setSelectedDistribution(e.target.value)}
                    className="bg-brand-card border border-brand-border rounded px-2.5 py-1 text-white text-xs cursor-pointer focus:outline-none focus:border-brand-accent font-mono"
                  >
                    <option value="random">Random Uniform</option>
                    <option value="sorted">Already Sorted (Best Case)</option>
                    <option value="reversed">Reverse Sorted (Worst Case)</option>
                    <option value="few_unique">Duplicates / Few Unique</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <Button variant="primary" size="sm" onClick={handleRunBenchmark} icon={Zap}>
                  Run Benchmark
                </Button>
              </div>
            </div>

            {/* Empirical Chart */}
            <div className="h-64 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={empiricalResults} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="n" stroke="#64748B" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                  <YAxis stroke="#64748B" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      borderColor: '#1E293B',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      fontFamily: 'monospace',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
                  <Bar dataKey="comparisons" name="Comparisons" fill="#06B6D4" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="swaps" name="Swaps / Shifts" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="totalOps" name="Total Operations (C+S)" fill="#22C55E" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Empirical Metrics Table */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-brand-bg text-brand-muted border-b border-brand-border">
                  <tr>
                    <th className="p-2.5">Input Size (n)</th>
                    <th className="p-2.5">Comparisons</th>
                    <th className="p-2.5">Swaps / Shifts</th>
                    <th className="p-2.5">Array Accesses</th>
                    <th className="p-2.5 text-emerald-400 font-bold">Total Operations</th>
                    <th className="p-2.5">T(n) / n Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {empiricalResults.map((r) => {
                    const ratio = (r.totalOps / r.n).toFixed(2);
                    return (
                      <tr key={r.n} className="hover:bg-slate-800/30">
                        <td className="p-2.5 font-bold text-white">n = {r.n}</td>
                        <td className="p-2.5 text-cyan-400">{r.comparisons}</td>
                        <td className="p-2.5 text-amber-400">{r.swaps}</td>
                        <td className="p-2.5 text-indigo-400">{r.accesses}</td>
                        <td className="p-2.5 font-bold text-emerald-400">{r.totalOps}</td>
                        <td className="p-2.5 text-slate-300 font-mono">{ratio}x</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* 3. Syllabus Benchmark Pairs */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Comparative Syllabus Pairs"
              subtitle="In-depth theoretical breakdown"
              badge={<Sparkles className="w-4 h-4 text-brand-accent" />}
            />

            {/* Pair Selector Tabs */}
            <div className="space-y-2 mb-4">
              {BENCHMARK_PAIRS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPairId(p.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs font-mono ${
                    selectedPairId === p.id
                      ? 'bg-brand-primary/20 text-brand-accent border-brand-accent font-semibold shadow-sm'
                      : 'bg-brand-bg text-slate-400 border-brand-border hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-white text-xs">{p.title}</div>
                  <div className="text-[10px] text-brand-muted mt-0.5">{p.tag}</div>
                </button>
              ))}
            </div>

            {/* Detailed Head-to-Head Card */}
            <div className="p-3 bg-brand-bg rounded-xl border border-brand-border space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-brand-card border border-brand-border/80">
                  <div className="font-bold text-cyan-400">{activePair.algoA.name}</div>
                  <div className="text-[11px] text-slate-300 mt-1">Avg: {activePair.algoA.avg}</div>
                  <div className="text-[10px] text-brand-muted">Worst: {activePair.algoA.worst}</div>
                  <div className="text-[10px] text-brand-muted mt-0.5">Space: {activePair.algoA.space}</div>
                </div>

                <div className="p-2 rounded bg-brand-card border border-brand-border/80">
                  <div className="font-bold text-emerald-400">{activePair.algoB.name}</div>
                  <div className="text-[11px] text-slate-300 mt-1">Avg: {activePair.algoB.avg}</div>
                  <div className="text-[10px] text-brand-muted">Worst: {activePair.algoB.worst}</div>
                  <div className="text-[10px] text-brand-muted mt-0.5">Space: {activePair.algoB.space}</div>
                </div>
              </div>

              <div className="text-xs text-brand-muted leading-relaxed border-t border-brand-border/60 pt-2.5">
                <strong className="text-white block mb-1">Pedagogical Analysis:</strong>
                {activePair.analysis}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. Master DSA Complexity Reference Matrix */}
      <Card>
        <CardHeader
          title="Master DSA Complexity Reference Directory"
          subtitle="Comprehensive, syllabus-aligned reference guide covering Time (Best, Average, Worst) and Auxiliary Space for all topics in LogiX."
          badge={<Layers className="w-4 h-4 text-brand-accent" />}
        />

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-primary text-white border-brand-primary font-bold shadow-sm'
                    : 'bg-brand-bg text-slate-400 border-brand-border hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-brand-muted" />
            <input
              type="text"
              placeholder="Search algorithm or DS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-bg border border-brand-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent w-60 font-mono"
            />
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-brand-bg/80 text-brand-muted border-b border-brand-border">
              <tr>
                <th className="p-3">Data Structure / Algorithm</th>
                <th className="p-3">Category</th>
                <th className="p-3">Best Time</th>
                <th className="p-3">Average Time</th>
                <th className="p-3">Worst Time</th>
                <th className="p-3">Space Complexity</th>
                <th className="p-3">In-Place</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {filteredDirectory.map((item) => {
                const isExpanded = expandedDirectoryItem === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-slate-800/25 transition-colors">
                      <td className="p-3 font-semibold text-white">{item.name}</td>
                      <td className="p-3 text-brand-muted">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-brand-bg border border-brand-border">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 text-emerald-400 font-mono">{item.bestTime}</td>
                      <td className="p-3 text-cyan-400 font-mono">{item.avgTime}</td>
                      <td className="p-3 text-amber-400 font-mono">{item.worstTime}</td>
                      <td className="p-3 text-indigo-400 font-mono">{item.space}</td>
                      <td className="p-3 text-slate-300">{item.inPlace}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setExpandedDirectoryItem(isExpanded ? null : item.id)}
                          className="text-brand-accent hover:underline text-[11px] font-mono flex items-center gap-1"
                        >
                          {isExpanded ? 'Hide' : 'Inspect'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-brand-bg/60">
                        <td colSpan={8} className="p-4 space-y-2 border-t border-brand-border/40">
                          <div className="text-xs text-slate-300">
                            <strong className="text-white">Summary:</strong> {item.summary}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            <div className="p-2.5 rounded bg-brand-card border border-emerald-500/30 text-xs">
                              <span className="font-bold text-emerald-400 block mb-0.5">Strengths (Pros):</span>
                              <span className="text-slate-300">{item.pros}</span>
                            </div>
                            <div className="p-2.5 rounded bg-brand-card border border-amber-500/30 text-xs">
                              <span className="font-bold text-amber-400 block mb-0.5">Limitations (Cons):</span>
                              <span className="text-slate-300">{item.cons}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. Educational Guide: Why Wall-Clock Latency Lies in Benchmarking */}
      <Card className="bg-gradient-to-r from-brand-card via-[#151D30] to-brand-card">
        <CardHeader
          title="Why Wall-Clock Time Lies in Algorithm Benchmarking"
          subtitle="Essential theoretical distinction between hardware-dependent latency and mathematical Big-O bounds."
          badge={<Cpu className="w-4 h-4 text-cyan-400" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
          <div className="p-3.5 rounded-xl bg-brand-bg/80 border border-brand-border space-y-1.5">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span>1. CPU Frequency & Throttling</span>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Modern processors dynamically shift clock frequencies between 800MHz and 5GHz based on thermals and power limits. Measuring elapsed wall-clock milliseconds on two separate runs can yield a 300% variance purely due to thermal throttling.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-bg/80 border border-brand-border space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <span>2. Garbage Collection & JIT Pauses</span>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              In Java (JVM) and JavaScript (V8), background garbage collector cycles pause application execution unpredictably. JIT compilation also warms up hot loops, distorting early iterations compared to later iterations.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-bg/80 border border-brand-border space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>3. Discrete Operation Invariants</span>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Big-O analysis counts fundamental discrete operations: Comparisons, Swaps/Writes, and Pointer traversals. A sorting run that takes 45 comparisons on an Intel i9 takes precisely 45 comparisons on an ARM Raspberry Pi.
            </p>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
