import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpDown,
  Search,
  Sparkles,
  Shuffle,
  Sliders,
  Terminal,
  BookOpen,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import ControlPanel from '../components/common/ControlPanel';
import CodeEditor from '../components/common/CodeEditor';
import ArrayVisualizer from '../visualizers/ArrayVisualizer';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

// Import Manual Algorithm Step Generators
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps,
  generateLinearSearchSteps,
  generateBinarySearchSteps
} from '../algorithms';

// Import Real Java Reference Implementations
import { getJavaCodeForAlgorithm } from '../java';

export default function SortingSearching() {
  const algorithms = [
    { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting', time: 'O(n²)', space: 'O(1)', desc: 'Repeatedly steps through the list, compares adjacent elements and swaps them if out of order.' },
    { id: 'insertion-sort', name: 'Insertion Sort', category: 'Sorting', time: 'O(n²)', space: 'O(1)', desc: 'Incrementally builds a sorted subarray by shifting larger elements right and inserting the key.' },
    { id: 'selection-sort', name: 'Selection Sort', category: 'Sorting', time: 'O(n²)', space: 'O(1)', desc: 'Finds the minimum element from the unsorted segment and places it at the beginning.' },
    { id: 'shell-sort', name: 'Shell Sort', category: 'Sorting', time: 'O(n log² n)', space: 'O(1)', desc: 'Gapped insertion sort that compares distant elements to reduce total inversion distance.' },
    { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting', time: 'O(n log n)', space: 'O(log n)', desc: 'Divides array around a pivot element so that smaller elements move left and larger elements move right.' },
    { id: 'radix-sort', name: 'Radix Sort', category: 'Sorting', time: 'O(nk)', space: 'O(n + k)', desc: 'Non-comparative sorting algorithm distributing elements into 10 buckets by individual digits.' },
    { id: 'linear-search', name: 'Linear Search', category: 'Searching', time: 'O(n)', space: 'O(1)', desc: 'Sequentially checks each element until the target is found or the array ends.' },
    { id: 'binary-search', name: 'Binary Search', category: 'Searching', time: 'O(log n)', space: 'O(1)', desc: 'Halves the sorted search space in each iteration by comparing the middle element to target.' }
  ];

  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);
  const [dataset, setDataset] = useState([45, 18, 62, 29, 83, 12, 54, 37, 71, 23]);
  const [searchTarget, setSearchTarget] = useState(54);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customInputText, setCustomInputText] = useState('45, 18, 62, 29, 83, 12, 54, 37, 71, 23');
  const [inputError, setInputError] = useState('');

  const isSearchAlgo = selectedAlgo.category === 'Searching';

  // Retrieve Real Java Reference Code
  const javaRef = useMemo(() => {
    return getJavaCodeForAlgorithm(selectedAlgo.id);
  }, [selectedAlgo.id]);

  // Generate Authentic Step Sequence based on actual algorithm logic
  const steps = useMemo(() => {
    switch (selectedAlgo.id) {
      case 'bubble-sort':
        return generateBubbleSortSteps(dataset);
      case 'insertion-sort':
        return generateInsertionSortSteps(dataset);
      case 'selection-sort':
        return generateSelectionSortSteps(dataset);
      case 'shell-sort':
        return generateShellSortSteps(dataset);
      case 'quick-sort':
        return generateQuickSortSteps(dataset);
      case 'radix-sort':
        return generateRadixSortSteps(dataset);
      case 'linear-search':
        return generateLinearSearchSteps(dataset, searchTarget);
      case 'binary-search':
        return generateBinarySearchSteps(dataset, searchTarget);
      default:
        return generateBubbleSortSteps(dataset);
    }
  }, [selectedAlgo.id, dataset, searchTarget]);

  // Hook driving step-by-step playback, pause, and speed
  const {
    currentStepIndex,
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    reset,
    stepForward,
    stepBackward
  } = useAlgorithmPlayer(steps, 1);

  // Reset player whenever algorithm or dataset changes
  useEffect(() => {
    reset();
  }, [selectedAlgo.id, dataset, searchTarget]);

  // Generate new random array
  const handleRandomize = () => {
    const size = Math.floor(Math.random() * 4) + 8; // 8 to 11 elements for optimal visualization
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 12);
    setDataset(newArr);
    setCustomInputText(newArr.join(', '));
    // If search algorithm, pick a random element or outside value
    if (isSearchAlgo) {
      setSearchTarget(newArr[Math.floor(Math.random() * newArr.length)]);
    }
  };

  // Apply custom array input
  const handleApplyCustomData = () => {
    try {
      if (!customInputText.trim()) {
        setInputError('Please enter at least 2 comma-separated numbers.');
        return;
      }
      const numbers = customInputText
        .split(',')
        .map((s) => {
          const num = Number(s.trim());
          if (isNaN(num)) throw new Error(`"${s.trim()}" is not a valid number.`);
          return num;
        })
        .filter((n) => !isNaN(n));

      if (numbers.length < 2) {
        throw new Error('Please enter at least 2 numbers.');
      }
      if (numbers.length > 20) {
        throw new Error('Please enter at most 20 numbers for clear visualization.');
      }

      setDataset(numbers);
      if (isSearchAlgo && !numbers.includes(searchTarget)) {
        setSearchTarget(numbers[0]);
      }
      setInputError('');
      setIsCustomModalOpen(false);
    } catch (err) {
      setInputError(err.message);
    }
  };

  // Active state extracted from current step
  const activeArray = currentStep ? currentStep.array : dataset;
  const activeHighlights = currentStep ? currentStep.highlightIndices : [];
  const activeHighlightType = currentStep ? currentStep.highlightType : 'standby';
  const activeSortedIndices = currentStep ? currentStep.sortedIndices : [];
  const activeSearchRange = currentStep ? currentStep.searchRange : null;
  const activeJavaLine = currentStep ? currentStep.javaLine : null;
  const comparisons = currentStep ? currentStep.comparisons : 0;
  const swaps = currentStep ? currentStep.swaps : 0;
  const arrayAccesses = currentStep ? currentStep.arrayAccesses : 0;
  const pass = currentStep ? currentStep.pass : 0;
  const statusExplanation = currentStep ? currentStep.explanation : 'Ready to start. Click Play or Step Forward.';

  return (
    <PageContainer
      title="Sorting & Searching Lab"
      subtitle="Interactive step-by-step visual exploration of classic algorithms with real-time operation counters and synchronized Java reference code."
      badge="Full Interactive Engine"
    >
      {/* Algorithm Selection Navigation Pills */}
      <div className="flex flex-wrap gap-2 pb-1">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => {
              pause();
              setSelectedAlgo(algo);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all select-none flex items-center gap-2 border ${
              selectedAlgo.id === algo.id
                ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
            }`}
          >
            <span>{algo.name}</span>
            <span className="text-[10px] font-mono opacity-80">{algo.time}</span>
          </button>
        ))}
      </div>

      {/* Main Algorithm Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer & Controls Column (7 cols on large screens) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-brand-card/90">
            <CardHeader
              title={selectedAlgo.name}
              subtitle={selectedAlgo.desc}
              badge={<ComplexityBadge complexity={selectedAlgo.time} label="Time" />}
              action={<ComplexityBadge complexity={selectedAlgo.space} label="Space" />}
            />

            {/* Target input for searching algorithms */}
            {isSearchAlgo && (
              <div className="mb-4 p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono text-brand-text font-semibold">Search Target:</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(Number(e.target.value))}
                    className="w-24 px-3 py-1 bg-brand-card border border-brand-borderLight rounded-lg text-sm font-mono text-white text-center focus:outline-none focus:border-brand-accent"
                  />
                  <span className="text-[11px] font-mono text-brand-muted">
                    {dataset.includes(searchTarget) ? '(Present in array)' : '(Not present)'}
                  </span>
                </div>
              </div>
            )}

            {/* Visualizer Display Canvas */}
            <ArrayVisualizer
              array={activeArray}
              highlightIndices={activeHighlights}
              highlightType={activeHighlightType}
              sortedIndices={activeSortedIndices}
              searchRange={activeSearchRange}
            />

            {/* Live Metrics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">Comparisons</div>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">{comparisons}</div>
              </div>
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">
                  {isSearchAlgo ? 'Search Scope' : 'Swaps / Shifts'}
                </div>
                <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                  {isSearchAlgo ? (activeSearchRange ? `${activeSearchRange[1] - activeSearchRange[0] + 1}` : '1') : swaps}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">Array Accesses</div>
                <div className="text-xl font-bold font-mono text-indigo-400 mt-0.5">{arrayAccesses}</div>
              </div>
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">Iteration / Pass</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{pass}</div>
              </div>
            </div>

            {/* Playback Control Panel */}
            <div className="mt-4">
              <ControlPanel
                isPlaying={isPlaying}
                onPlay={play}
                onPause={pause}
                onStepForward={stepForward}
                onStepBack={stepBackward}
                onReset={reset}
                onRandomize={handleRandomize}
                onCustomInput={() => setIsCustomModalOpen(true)}
                currentStep={currentStepIndex}
                totalSteps={totalSteps}
                speed={speed}
                onSpeedChange={setSpeed}
                statusMessage={statusExplanation}
              />
            </div>
          </Card>
        </div>

        {/* Java Reference Code & Line Synchronization Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader
                title={javaRef.fileName}
                subtitle="Genuine textbook Java reference code"
                badge={<span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">Java 21 LTS</span>}
              />

              <CodeEditor
                code={javaRef.code}
                language="java"
                activeLine={activeJavaLine}
                title={javaRef.fileName}
              />
            </div>

            {/* Educational Synchronization Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-brand-bg border border-brand-border text-xs text-brand-muted space-y-2">
              <div className="font-semibold text-brand-text flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Java Source Synchronization</span>
                </div>
                {activeJavaLine && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
                    Line {activeJavaLine} Active
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                As the JavaScript visualization engine executes each step, the corresponding Java statement is highlighted in real time above. Notice how comparisons and swaps in the visualizer reflect exact loop and conditional branch execution in Java.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Custom Dataset Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-brand-borderLight rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-accent" />
                Custom Array Input
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="text-brand-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-brand-muted">
                Enter numbers separated by commas (2 to 20 numbers):
              </label>
              <textarea
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                rows={3}
                className="w-full bg-[#0B1020] border border-brand-border rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-brand-primary"
                placeholder="40, 20, 10, 50, 30"
              />
              {inputError && (
                <div className="text-xs text-rose-400 font-mono mt-1">
                  {inputError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setIsCustomModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleApplyCustomData}>
                Apply & Reset Visualizer
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
