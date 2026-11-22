import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  FastForward,
  SkipForward,
  Sparkles,
  CheckCircle2,
  Sliders,
  Gauge,
  Flame,
  Award,
  Info
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps
} from '../algorithms/index.js';

const ALGO_METADATA = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    generator: generateBubbleSortSteps,
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    gradient: 'from-amber-500 to-orange-500',
    barColor: '#F59E0B'
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    generator: generateSelectionSortSteps,
    bestTime: 'O(n²)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: 'No',
    gradient: 'from-cyan-500 to-blue-500',
    barColor: '#06B6D4'
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    generator: generateInsertionSortSteps,
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    gradient: 'from-emerald-500 to-teal-500',
    barColor: '#22C55E'
  },
  shell: {
    id: 'shell',
    name: 'Shell Sort',
    generator: generateShellSortSteps,
    bestTime: 'O(n log n)',
    avgTime: 'O(n^(3/2))',
    worstTime: 'O(n²)',
    space: 'O(1)',
    stable: 'No',
    gradient: 'from-violet-500 to-purple-600',
    barColor: '#8B5CF6'
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    generator: generateQuickSortSteps,
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n²)',
    space: 'O(log n)',
    stable: 'No',
    gradient: 'from-indigo-500 to-blue-600',
    barColor: '#6366F1'
  },
  radix: {
    id: 'radix',
    name: 'Radix Sort (LSD)',
    generator: generateRadixSortSteps,
    bestTime: 'O(d·(n+k))',
    avgTime: 'O(d·(n+k))',
    worstTime: 'O(d·(n+k))',
    space: 'O(n+k)',
    stable: 'Yes',
    gradient: 'from-pink-500 to-rose-600',
    barColor: '#EC4899'
  }
};

const DATASET_DISTRIBUTIONS = [
  { id: 'random', label: 'Random', desc: 'Uniform random elements' },
  { id: 'nearly_sorted', label: 'Nearly Sorted', desc: '10% unsorted (Insertion thrives)' },
  { id: 'reversed', label: 'Reverse Sorted', desc: 'Strictly descending (Worst for Bubble)' },
  { id: 'few_unique', label: 'Few Unique', desc: 'Heavy duplicates & collisions' }
];

export default function AlgorithmRace() {
  const [selectedAlgos, setSelectedAlgos] = useState(['bubble', 'insertion', 'quick', 'radix']);
  const [arraySize, setArraySize] = useState(16);
  const [distribution, setDistribution] = useState('random');
  const [dataset, setDataset] = useState([]);

  // Race Simulation State
  const [allSteps, setAllSteps] = useState({});
  const [stepIndices, setStepIndices] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(80); // ms per tick
  const [finishOrder, setFinishOrder] = useState([]); // array of algo ids in order of completion
  const timerRef = useRef(null);

  // Generate dataset based on distribution
  const generateDataset = (size = arraySize, dist = distribution) => {
    let arr = [];
    if (dist === 'nearly_sorted') {
      arr = Array.from({ length: size }, (_, i) => Math.floor((i + 1) * (85 / size)) + 10);
      // Swap 2 random adjacent pairs
      if (size > 4) {
        const idx = Math.floor(size / 2);
        const temp = arr[idx];
        arr[idx] = arr[idx + 1];
        arr[idx + 1] = temp;
      }
    } else if (dist === 'reversed') {
      arr = Array.from({ length: size }, (_, i) => Math.floor((size - i) * (85 / size)) + 10);
    } else if (dist === 'few_unique') {
      const candidates = [15, 35, 60, 85];
      arr = Array.from({ length: size }, () => candidates[Math.floor(Math.random() * candidates.length)]);
    } else {
      arr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 12);
    }
    return arr;
  };

  // Reset & prepare race simulation steps
  const prepareRace = (newArr = dataset) => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const compiledSteps = {};
    const initialIndices = {};

    selectedAlgos.forEach((id) => {
      const meta = ALGO_METADATA[id];
      if (meta && meta.generator) {
        compiledSteps[id] = meta.generator([...newArr]);
        initialIndices[id] = 0;
      }
    });

    setAllSteps(compiledSteps);
    setStepIndices(initialIndices);
    setFinishOrder([]);
  };

  // Initial load
  useEffect(() => {
    const initialData = generateDataset(arraySize, distribution);
    setDataset(initialData);
    prepareRace(initialData);
  }, []);

  // Recalculate when selected algorithms or dataset changes
  const handleDatasetChange = (newDist = distribution, newSize = arraySize) => {
    const freshArr = generateDataset(newSize, newDist);
    setDataset(freshArr);
    prepareRace(freshArr);
  };

  // Toggle contestant
  const toggleAlgo = (id) => {
    let updated;
    if (selectedAlgos.includes(id)) {
      if (selectedAlgos.length <= 2) return; // Keep at least 2
      updated = selectedAlgos.filter(a => a !== id);
    } else {
      if (selectedAlgos.length >= 4) return; // Maximum 4
      updated = [...selectedAlgos, id];
    }
    setSelectedAlgos(updated);

    // Rebuild steps for the updated contestants
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const compiledSteps = {};
    const initialIndices = {};
    updated.forEach((aId) => {
      compiledSteps[aId] = ALGO_METADATA[aId].generator([...dataset]);
      initialIndices[aId] = 0;
    });
    setAllSteps(compiledSteps);
    setStepIndices(initialIndices);
    setFinishOrder([]);
  };

  // Step advancement loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStepIndices((prevIndices) => {
        let allDone = true;
        const newIndices = { ...prevIndices };
        const newlyFinished = [];

        selectedAlgos.forEach((algoId) => {
          const steps = allSteps[algoId] || [];
          const cur = prevIndices[algoId] || 0;

          if (cur < steps.length - 1) {
            newIndices[algoId] = cur + 1;
            allDone = false;
            if (cur + 1 === steps.length - 1) {
              newlyFinished.push(algoId);
            }
          }
        });

        if (newlyFinished.length > 0) {
          setFinishOrder((prev) => {
            const additions = newlyFinished.filter(id => !prev.includes(id));
            return [...prev, ...additions];
          });
        }

        if (allDone) {
          setIsPlaying(false);
          clearInterval(timerRef.current);
        }

        return newIndices;
      });
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, allSteps, selectedAlgos]);

  const handlePlayPause = () => {
    // If all are finished, reset first
    const isCompleted = selectedAlgos.every(
      id => stepIndices[id] !== undefined && stepIndices[id] >= (allSteps[id]?.length || 1) - 1
    );
    if (isCompleted) {
      const initialIndices = {};
      selectedAlgos.forEach(id => { initialIndices[id] = 0; });
      setStepIndices(initialIndices);
      setFinishOrder([]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setStepIndices((prev) => {
      const next = { ...prev };
      const newlyFinished = [];
      selectedAlgos.forEach((id) => {
        const steps = allSteps[id] || [];
        const cur = prev[id] || 0;
        if (cur < steps.length - 1) {
          next[id] = cur + 1;
          if (cur + 1 === steps.length - 1 && !finishOrder.includes(id)) {
            newlyFinished.push(id);
          }
        }
      });
      if (newlyFinished.length > 0) {
        setFinishOrder((prevOrder) => [...prevOrder, ...newlyFinished]);
      }
      return next;
    });
  };

  const handleInstantFinish = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const finalIndices = {};
    const finalOrder = [];

    // Order by total operations (comparisons + swaps)
    const metrics = selectedAlgos.map(id => {
      const steps = allSteps[id] || [];
      const last = steps[steps.length - 1] || {};
      const totalOps = (last.comparisons || 0) + (last.swaps || 0);
      return { id, totalOps, stepCount: steps.length };
    });

    metrics.sort((a, b) => a.totalOps - b.totalOps);
    metrics.forEach(m => finalOrder.push(m.id));

    selectedAlgos.forEach(id => {
      const steps = allSteps[id] || [];
      finalIndices[id] = Math.max(0, steps.length - 1);
    });

    setStepIndices(finalIndices);
    setFinishOrder(finalOrder);
  };

  const handleReset = () => {
    prepareRace(dataset);
  };

  // Determine race completion status
  const isRaceFinished = selectedAlgos.length > 0 && selectedAlgos.every(
    id => stepIndices[id] !== undefined && stepIndices[id] >= (allSteps[id]?.length || 1) - 1
  );

  // Calculate winner based on total operations (comparisons + swaps)
  const getLeaderboard = () => {
    return selectedAlgos.map((id) => {
      const steps = allSteps[id] || [];
      const curIdx = stepIndices[id] || 0;
      const step = steps[curIdx] || steps[steps.length - 1] || {};
      const meta = ALGO_METADATA[id];

      const comparisons = step.comparisons || 0;
      const swaps = step.swaps || 0;
      const accesses = step.arrayAccesses || 0;
      const totalOps = comparisons + swaps;
      const isFinished = steps.length > 0 && curIdx >= steps.length - 1;

      return {
        id,
        name: meta.name,
        meta,
        comparisons,
        swaps,
        accesses,
        totalOps,
        isFinished,
        totalSteps: steps.length,
        curIdx
      };
    }).sort((a, b) => {
      // Finished first, then lowest total operations
      if (a.isFinished && !b.isFinished) return -1;
      if (!a.isFinished && b.isFinished) return 1;
      return a.totalOps - b.totalOps;
    });
  };

  const leaderboard = getLeaderboard();
  const winner = leaderboard[0];

  return (
    <PageContainer
      title="Algorithm Race Arena"
      subtitle="Benchmark 2 to 4 sorting algorithms simultaneously on identical datasets with unified operation counting."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleDatasetChange(distribution, arraySize)}
            icon={Shuffle}
            disabled={isPlaying}
          >
            New Dataset
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleStepForward}
            icon={SkipForward}
            disabled={isPlaying || isRaceFinished}
          >
            Step
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleInstantFinish}
            icon={FastForward}
            disabled={isRaceFinished}
            title="Jump directly to final sorted results"
          >
            Instant
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            icon={RotateCcw}
          >
            Reset
          </Button>

          <Button
            variant={isPlaying ? 'accent' : 'primary'}
            size="sm"
            onClick={handlePlayPause}
            icon={isPlaying ? Pause : Play}
          >
            {isPlaying ? 'Pause Race' : isRaceFinished ? 'Restart Race' : 'Start Race'}
          </Button>
        </div>
      }
    >
      {/* Race Setup & Parameter Controls */}
      <Card className="bg-brand-card/90">
        <div className="space-y-4">
          {/* Algorithm Contestant Selector Chips */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-brand-border/60">
            <div>
              <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">
                Select Contestants (Pick 2 to 4):
              </span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {Object.values(ALGO_METADATA).map((algo) => {
                  const isChecked = selectedAlgos.includes(algo.id);
                  return (
                    <button
                      key={algo.id}
                      onClick={() => toggleAlgo(algo.id)}
                      disabled={isPlaying}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-2 select-none ${
                        isChecked
                          ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                          : 'bg-brand-bg text-slate-400 border-brand-border hover:border-slate-600'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isChecked ? 'bg-brand-accent shadow-glow' : 'bg-slate-600'}`} />
                      <span className="font-semibold">{algo.name}</span>
                      <span className="font-mono text-[10px] text-brand-muted">{algo.avgTime}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation Speed Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-brand-accent" /> Speed:
              </span>
              {[
                { label: '0.5x', ms: 220 },
                { label: '1x', ms: 80 },
                { label: '2x', ms: 30 },
                { label: 'Turbo', ms: 10 }
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSpeed(s.ms)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
                    speed === s.ms
                      ? 'bg-brand-accent text-slate-900 border-brand-accent font-bold'
                      : 'bg-brand-bg text-slate-300 border-brand-border hover:border-slate-500'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Distribution & Size Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-brand-muted uppercase">Distribution:</span>
              {DATASET_DISTRIBUTIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDistribution(d.id);
                    handleDatasetChange(d.id, arraySize);
                  }}
                  disabled={isPlaying}
                  title={d.desc}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all ${
                    distribution === d.id
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-400 font-semibold'
                      : 'bg-brand-bg text-slate-400 border-brand-border hover:border-slate-600'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-mono text-brand-muted">
                Array Size: <span className="text-brand-text font-bold">{arraySize} items</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={arraySize}
                disabled={isPlaying}
                onChange={(e) => {
                  const sz = Number(e.target.value);
                  setArraySize(sz);
                  handleDatasetChange(distribution, sz);
                }}
                className="w-32 accent-brand-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Winner Podium & Analysis Banner */}
      {isRaceFinished && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-emerald-500/15 border border-amber-500/30 shadow-lg animate-fadeIn flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Race Finished — Champion
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Rank #1
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {winner.name} won with only <span className="text-emerald-400 font-mono">{winner.totalOps}</span> operations!
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Executed {winner.comparisons} comparisons and {winner.swaps} swaps/writes across {arraySize} elements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => handleDatasetChange(distribution, arraySize)} icon={Shuffle}>
              Test New Dataset
            </Button>
            <Button variant="primary" size="sm" onClick={handleReset} icon={RotateCcw}>
              Re-run Race
            </Button>
          </div>
        </div>
      )}

      {/* Side-by-side Contestant Visualizer Cards */}
      <div
        className={`grid grid-cols-1 ${
          selectedAlgos.length === 2
            ? 'md:grid-cols-2'
            : selectedAlgos.length === 3
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2 xl:grid-cols-4'
        } gap-4`}
      >
        {selectedAlgos.map((algoId) => {
          const meta = ALGO_METADATA[algoId];
          const steps = allSteps[algoId] || [];
          const curIdx = stepIndices[algoId] || 0;
          const currentStep = steps[curIdx] || steps[0] || { array: dataset };

          const array = currentStep.array || dataset;
          const highlights = currentStep.highlightIndices || [];
          const highlightType = currentStep.highlightType || 'standby';
          const sorted = currentStep.sortedIndices || [];

          const comparisons = currentStep.comparisons || 0;
          const swaps = currentStep.swaps || 0;
          const accesses = currentStep.arrayAccesses || 0;
          const totalOps = comparisons + swaps;

          const isFinished = steps.length > 0 && curIdx >= steps.length - 1;
          const progressPercent = steps.length > 1 ? Math.round((curIdx / (steps.length - 1)) * 100) : 0;

          // Rank determination
          let rankBadge = null;
          if (isFinished) {
            const rankIndex = leaderboard.findIndex(item => item.id === algoId);
            if (rankIndex === 0) {
              rankBadge = (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  🥇 1st Place
                </span>
              );
            } else if (rankIndex === 1) {
              rankBadge = (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-300/20 text-slate-200 border border-slate-300/40 flex items-center gap-1">
                  🥈 2nd Place
                </span>
              );
            } else if (rankIndex === 2) {
              rankBadge = (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-700/20 text-amber-400 border border-amber-700/40 flex items-center gap-1">
                  🥉 3rd Place
                </span>
              );
            } else {
              rankBadge = (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-700/30 text-slate-400 border border-slate-600">
                  4th Place
                </span>
              );
            }
          } else if (isPlaying) {
            rankBadge = (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 animate-pulse">
                🏎️ Racing
              </span>
            );
          } else {
            rankBadge = (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-800/40 border border-slate-700">
                Standby
              </span>
            );
          }

          return (
            <Card key={meta.id} className="flex flex-col justify-between">
              <div>
                {/* Header with Title & Rank */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-brand-border/60">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {meta.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <ComplexityBadge complexity={meta.avgTime} />
                      <span className="text-[10px] font-mono text-brand-muted">Space: {meta.space}</span>
                    </div>
                  </div>
                  <div>{rankBadge}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted mb-1">
                    <span>Progress ({progressPercent}%)</span>
                    <span>Step {curIdx + 1} / {steps.length}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-75 ${
                        isFinished ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-primary to-brand-accent'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Animated Bars Visualizer */}
                <div className="bg-[#0B1020] rounded-lg border border-brand-border p-2.5 h-36 flex items-end justify-center gap-0.5 relative overflow-hidden">
                  {array.map((val, idx) => {
                    const isComparing = highlights.includes(idx) && (highlightType === 'compare' || highlightType === 'pivot');
                    const isSwapping = highlights.includes(idx) && (highlightType === 'swap' || highlightType === 'shift' || highlightType === 'write');
                    const isSorted = sorted.includes(idx) || isFinished;

                    let barColorClass = 'bg-gradient-to-t from-indigo-700 to-cyan-500';
                    if (isSorted) {
                      barColorClass = 'bg-gradient-to-t from-emerald-600 to-emerald-400';
                    } else if (isSwapping) {
                      barColorClass = 'bg-gradient-to-t from-rose-600 to-rose-400 shadow-glow';
                    } else if (isComparing) {
                      barColorClass = 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-glow';
                    }

                    return (
                      <div
                        key={idx}
                        style={{ height: `${Math.max(12, (val / 100) * 100)}%` }}
                        className={`flex-1 rounded-t-sm transition-all duration-75 ${barColorClass}`}
                        title={`arr[${idx}] = ${val}`}
                      />
                    );
                  })}
                </div>

                {/* Live Operation Stats Counters */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                  <div className="bg-brand-bg/80 p-2 rounded-lg border border-brand-border">
                    <div className="text-[10px] font-mono text-brand-muted uppercase">Comparisons</div>
                    <div className="text-sm font-bold font-mono text-cyan-400">{comparisons}</div>
                  </div>
                  <div className="bg-brand-bg/80 p-2 rounded-lg border border-brand-border">
                    <div className="text-[10px] font-mono text-brand-muted uppercase">Swaps / Shifts</div>
                    <div className="text-sm font-bold font-mono text-amber-400">{swaps}</div>
                  </div>
                  <div className="bg-brand-bg/80 p-2 rounded-lg border border-brand-border">
                    <div className="text-[10px] font-mono text-brand-muted uppercase">Array Accesses</div>
                    <div className="text-sm font-bold font-mono text-indigo-400">{accesses}</div>
                  </div>
                  <div className="bg-brand-bg/80 p-2 rounded-lg border border-brand-border">
                    <div className="text-[10px] font-mono text-brand-muted uppercase">Total Ops (C+S)</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">{totalOps}</div>
                  </div>
                </div>
              </div>

              {/* Status & Step Explanation */}
              <div className="mt-3 pt-2 border-t border-brand-border/40 text-[11px] font-mono text-slate-400 line-clamp-1 text-center">
                {currentStep.explanation || 'Ready for race'}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Head-to-Head Performance Benchmark Table */}
      <Card>
        <CardHeader
          title="Head-to-Head Benchmark Table"
          subtitle="Rankings determined by total operation count (comparisons + swaps), independent of hardware execution environment."
          badge={<Trophy className="w-4 h-4 text-amber-400" />}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-brand-bg/80 text-brand-muted border-b border-brand-border">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Contestant Algorithm</th>
                <th className="p-3">Comparisons</th>
                <th className="p-3">Swaps / Shifts</th>
                <th className="p-3">Array Accesses</th>
                <th className="p-3 font-semibold text-white">Total Operations</th>
                <th className="p-3">Time Complexity</th>
                <th className="p-3">Space Complexity</th>
                <th className="p-3">Stability</th>
                <th className="p-3">Efficiency Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {leaderboard.map((item, idx) => {
                const ratio = winner.totalOps > 0 ? (item.totalOps / winner.totalOps).toFixed(2) + 'x' : '1.00x';
                const isChampion = idx === 0 && item.isFinished;

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isChampion
                        ? 'bg-amber-500/10 hover:bg-amber-500/15 font-semibold'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="p-3 font-bold">
                      {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                    </td>
                    <td className="p-3 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.meta.barColor }} />
                      {item.name}
                    </td>
                    <td className="p-3 text-cyan-400">{item.comparisons}</td>
                    <td className="p-3 text-amber-400">{item.swaps}</td>
                    <td className="p-3 text-indigo-400">{item.accesses}</td>
                    <td className="p-3 text-emerald-400 font-bold">{item.totalOps}</td>
                    <td className="p-3 text-slate-300">{item.meta.avgTime}</td>
                    <td className="p-3 text-slate-400">{item.meta.space}</td>
                    <td className="p-3 text-slate-400">{item.meta.stable}</td>
                    <td className="p-3 font-bold text-slate-300">
                      {idx === 0 && item.isFinished ? (
                        <span className="text-emerald-400">1.00x (Champion)</span>
                      ) : (
                        <span className="text-amber-400/90">{ratio} ops</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-brand-bg border border-brand-border text-xs text-brand-muted flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Why Unified Operation Counting Matters:</strong> In modern web and mobile apps, CPU frequency scaling, background garbage collection, and browser UI rendering introduce unpredictable latency fluctuations. Benchmarking algorithms strictly by discrete operation count ($comparisons + swaps/writes$) yields invariant mathematical comparisons that reflect true textbook asymptotic complexity regardless of processor speed.
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
