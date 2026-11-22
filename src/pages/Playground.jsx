import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Trash2,
  Search,
  Shuffle,
  Layers,
  ArrowRight,
  Sparkles,
  GitCommit,
  Network,
  Hash
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import ArrayVisualizer from '../visualizers/ArrayVisualizer';
import StackVisualizer from '../visualizers/StackVisualizer';
import LinkedListVisualizer from '../visualizers/LinkedListVisualizer';
import TreeVisualizer from '../visualizers/TreeVisualizer';
import HashTableVisualizer from '../visualizers/HashTableVisualizer';

import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps
} from '../algorithms/index.js';

const PLAYGROUND_MODES = [
  { id: 'sorting', name: 'Custom Array Sorting', icon: Layers, desc: 'Sort arbitrary numbers with live visual execution' },
  { id: 'stack', name: 'Stack Sandbox (LIFO)', icon: Layers, desc: 'Interactive Push, Pop, Peek, and script execution' },
  { id: 'linked-list', name: 'Linked List Sandbox', icon: GitCommit, desc: 'Dynamic node insertions, deletions, search, and reversal' },
  { id: 'bst', name: 'BST Tree Builder', icon: Network, desc: 'Build dynamic binary search trees from custom key sequences' },
  { id: 'hashing', name: 'Hash Collision Sandbox', icon: Hash, desc: 'Test custom key hashing and observe linear probing collisions' }
];

export default function Playground() {
  const [activeMode, setActiveMode] = useState('sorting');

  // ==========================================
  // 1. SORTING STATE & CONTROLS
  // ==========================================
  const [sortingInput, setSortingInput] = useState('45, 12, 89, 23, 7, 56, 34, 90, 15');
  const [selectedAlgo, setSelectedAlgo] = useState('bubble');
  const [sortSteps, setSortSteps] = useState([]);
  const [currentSortStep, setCurrentSortStep] = useState(0);
  const [isSortPlaying, setIsSortPlaying] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(120);
  const [sortError, setSortError] = useState('');
  const sortTimerRef = useRef(null);

  const initSorting = (inputStr = sortingInput, algo = selectedAlgo) => {
    try {
      setSortError('');
      const nums = inputStr.split(',').map(s => {
        const val = Number(s.trim());
        if (isNaN(val)) throw new Error(`Invalid number: "${s.trim()}"`);
        return val;
      });
      if (nums.length < 2) throw new Error('Please enter at least 2 numbers.');
      if (nums.length > 25) throw new Error('Maximum 25 numbers for clear visualization.');

      let steps = [];
      if (algo === 'bubble') steps = generateBubbleSortSteps(nums);
      else if (algo === 'insertion') steps = generateInsertionSortSteps(nums);
      else if (algo === 'selection') steps = generateSelectionSortSteps(nums);
      else if (algo === 'shell') steps = generateShellSortSteps(nums);
      else if (algo === 'quick') steps = generateQuickSortSteps(nums);
      else if (algo === 'radix') steps = generateRadixSortSteps(nums);
      else steps = generateBubbleSortSteps(nums);

      setSortSteps(steps);
      setCurrentSortStep(0);
      setIsSortPlaying(false);
    } catch (err) {
      setSortError(err.message);
    }
  };

  useEffect(() => {
    initSorting();
  }, [selectedAlgo]);

  useEffect(() => {
    if (!isSortPlaying) {
      if (sortTimerRef.current) clearInterval(sortTimerRef.current);
      return;
    }
    sortTimerRef.current = setInterval(() => {
      setCurrentSortStep((prev) => {
        if (prev >= sortSteps.length - 1) {
          setIsSortPlaying(false);
          clearInterval(sortTimerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, sortSpeed);

    return () => {
      if (sortTimerRef.current) clearInterval(sortTimerRef.current);
    };
  }, [isSortPlaying, sortSpeed, sortSteps]);

  // ==========================================
  // 2. STACK STATE & CONTROLS
  // ==========================================
  const [stackItems, setStackItems] = useState([10, 25, 40]);
  const [stackPushVal, setStackPushVal] = useState('55');
  const [stackCapacity, setStackCapacity] = useState(6);
  const [stackAction, setStackAction] = useState('idle');
  const [stackScript, setStackScript] = useState('push 15, push 30, pop, push 75');
  const [stackMessage, setStackMessage] = useState('Stack initialized.');

  const handleStackPush = () => {
    const val = Number(stackPushVal);
    if (isNaN(val)) return;
    if (stackItems.length >= stackCapacity) {
      setStackAction('overflow');
      setStackMessage(`Stack Overflow! Maximum capacity (${stackCapacity}) reached.`);
      setTimeout(() => setStackAction('idle'), 1500);
      return;
    }
    setStackItems([...stackItems, val]);
    setStackAction('push');
    setStackMessage(`Pushed element: ${val}`);
    setTimeout(() => setStackAction('idle'), 800);
  };

  const handleStackPop = () => {
    if (stackItems.length === 0) {
      setStackAction('underflow');
      setStackMessage('Stack Underflow! Cannot pop from empty stack.');
      setTimeout(() => setStackAction('idle'), 1500);
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setStackAction('pop');
    setStackMessage(`Popped element: ${popped}`);
    setTimeout(() => setStackAction('idle'), 800);
  };

  const handleStackPeek = () => {
    if (stackItems.length === 0) {
      setStackMessage('Stack is empty. No top element.');
      return;
    }
    const top = stackItems[stackItems.length - 1];
    setStackAction('peek');
    setStackMessage(`Top element is: ${top}`);
    setTimeout(() => setStackAction('idle'), 800);
  };

  const handleExecuteStackScript = () => {
    try {
      const cmds = stackScript.split(',').map(s => s.trim().toLowerCase());
      let cur = [...stackItems];
      let lastMsg = '';

      for (const cmd of cmds) {
        if (cmd.startsWith('push')) {
          const parts = cmd.split(' ');
          const val = Number(parts[1]);
          if (isNaN(val)) throw new Error(`Invalid push argument: "${parts[1]}"`);
          if (cur.length >= stackCapacity) {
            lastMsg = `Overflow on push ${val}`;
            break;
          }
          cur.push(val);
          lastMsg = `Pushed ${val}`;
        } else if (cmd === 'pop') {
          if (cur.length === 0) {
            lastMsg = 'Underflow on pop';
            break;
          }
          const popped = cur.pop();
          lastMsg = `Popped ${popped}`;
        } else if (cmd === 'peek') {
          lastMsg = cur.length > 0 ? `Peeked ${cur[cur.length - 1]}` : 'Empty stack';
        }
      }
      setStackItems(cur);
      setStackMessage(`Script executed: ${lastMsg}`);
    } catch (err) {
      setStackMessage(`Script error: ${err.message}`);
    }
  };

  // ==========================================
  // 3. LINKED LIST STATE & CONTROLS
  // ==========================================
  const [llNodes, setLlNodes] = useState([10, 20, 30, 40]);
  const [llInputVal, setLlInputVal] = useState('50');
  const [llActiveIndex, setLlActiveIndex] = useState(null);
  const [llAction, setLlAction] = useState('idle');
  const [llMessage, setLlMessage] = useState('Singly Linked List initialized.');

  const handleLlInsertHead = () => {
    const val = Number(llInputVal);
    if (isNaN(val)) return;
    setLlNodes([val, ...llNodes]);
    setLlActiveIndex(0);
    setLlAction('insert');
    setLlMessage(`Inserted ${val} at Head. New head node created.`);
    setTimeout(() => { setLlActiveIndex(null); setLlAction('idle'); }, 1000);
  };

  const handleLlInsertTail = () => {
    const val = Number(llInputVal);
    if (isNaN(val)) return;
    setLlNodes([...llNodes, val]);
    setLlActiveIndex(llNodes.length);
    setLlAction('insert');
    setLlMessage(`Inserted ${val} at Tail.`);
    setTimeout(() => { setLlActiveIndex(null); setLlAction('idle'); }, 1000);
  };

  const handleLlDelete = () => {
    const val = Number(llInputVal);
    if (isNaN(val)) return;
    const idx = llNodes.indexOf(val);
    if (idx === -1) {
      setLlMessage(`Value ${val} not found in linked list.`);
      return;
    }
    setLlActiveIndex(idx);
    setLlAction('delete');
    setLlMessage(`Deleting node with value ${val} at index ${idx}...`);
    setTimeout(() => {
      setLlNodes(llNodes.filter((_, i) => i !== idx));
      setLlActiveIndex(null);
      setLlAction('idle');
      setLlMessage(`Node ${val} deleted successfully.`);
    }, 800);
  };

  const handleLlSearch = () => {
    const val = Number(llInputVal);
    if (isNaN(val)) return;
    const idx = llNodes.indexOf(val);
    if (idx !== -1) {
      setLlActiveIndex(idx);
      setLlAction('search_match');
      setLlMessage(`Target ${val} found at node index ${idx}!`);
    } else {
      setLlActiveIndex(null);
      setLlAction('idle');
      setLlMessage(`Target ${val} was NOT found in the list.`);
    }
  };

  const handleLlReverse = () => {
    setLlNodes([...llNodes].reverse());
    setLlAction('reverse');
    setLlMessage('List reversed in-place (pointers reversed).');
    setTimeout(() => setLlAction('idle'), 1000);
  };

  // ==========================================
  // 4. BST STATE & CONTROLS
  // ==========================================
  const [bstSequence, setBstSequence] = useState('50, 30, 70, 20, 40, 60, 80');
  const [bstTree, setBstTree] = useState(null);
  const [bstActiveKey, setBstActiveKey] = useState(null);
  const [bstMessage, setBstMessage] = useState('BST ready.');

  // Helper to build BST
  const insertBSTNode = (root, key) => {
    if (!root) return { key, left: null, right: null };
    if (key < root.key) root.left = insertBSTNode(root.left, key);
    else if (key > root.key) root.right = insertBSTNode(root.right, key);
    return root;
  };

  const buildBSTFromSequence = (seq = bstSequence) => {
    try {
      const keys = seq.split(',').map(s => {
        const num = Number(s.trim());
        if (isNaN(num)) throw new Error(`Invalid key: "${s.trim()}"`);
        return num;
      });
      let root = null;
      for (const k of keys) {
        root = insertBSTNode(root, k);
      }
      setBstTree(root);
      setBstMessage(`BST created with ${keys.length} keys.`);
    } catch (err) {
      setBstMessage(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    buildBSTFromSequence();
  }, []);

  const handleBstInsertSingle = (val) => {
    const key = Number(val);
    if (isNaN(key)) return;
    setBstTree((prev) => insertBSTNode(JSON.parse(JSON.stringify(prev || null)), key));
    setBstActiveKey(key);
    setBstMessage(`Inserted key ${key} into BST.`);
    setTimeout(() => setBstActiveKey(null), 1200);
  };

  // ==========================================
  // 5. HASH TABLE STATE & CONTROLS
  // ==========================================
  const [hashCapacity, setHashCapacity] = useState(10);
  const [hashKeysInput, setHashKeysInput] = useState('12, 22, 32, 45, 55, 62');
  const [hashTable, setHashTable] = useState([]);
  const [hashActiveSlot, setHashActiveSlot] = useState(null);
  const [hashHighlightAction, setHashHighlightAction] = useState('idle');
  const [hashMessage, setHashMessage] = useState('Hash table ready.');

  const buildHashTable = (keysStr = hashKeysInput, cap = hashCapacity) => {
    try {
      const keys = keysStr.split(',').map(s => {
        const num = Number(s.trim());
        if (isNaN(num)) throw new Error(`Invalid key: "${s.trim()}"`);
        return num;
      });
      const table = new Array(cap).fill(null);

      keys.forEach((key) => {
        const originalSlot = key % cap;
        let slot = originalSlot;
        let probes = 0;

        while (table[slot] !== null && probes < cap) {
          probes++;
          slot = (slot + 1) % cap;
        }

        if (probes < cap) {
          table[slot] = {
            key,
            val: `V_${key}`,
            originalSlot,
            probed: probes
          };
        }
      });

      setHashTable(table);
      setHashMessage(`Inserted ${keys.length} keys with linear probing.`);
    } catch (err) {
      setHashMessage(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    buildHashTable();
  }, [hashCapacity]);

  const activeSortStepData = sortSteps[currentSortStep] || { array: [] };

  return (
    <PageContainer
      title="Custom Input Playground"
      subtitle="Experiment with custom datasets, edge-case numbers, and custom operation sequences with instant visual feedback."
    >
      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pb-2">
        {PLAYGROUND_MODES.map((mode) => {
          const isSelected = activeMode === mode.id;
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`p-3 rounded-xl border text-left transition-all select-none flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                  : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-accent' : 'text-slate-400'}`} />
                <span className="font-bold text-xs text-white">{mode.name}</span>
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{mode.desc}</div>
            </button>
          );
        })}
      </div>

      {/* 1. CUSTOM ARRAY SORTING PLAYGROUND */}
      {activeMode === 'sorting' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader
                title="Input Custom Array"
                subtitle="Supply comma-separated integers to sort"
                badge={<ComplexityBadge complexity={selectedAlgo === 'quick' ? 'O(n log n)' : 'O(n²)'} />}
              />

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-brand-muted block mb-1">Numbers:</label>
                  <textarea
                    value={sortingInput}
                    onChange={(e) => setSortingInput(e.target.value)}
                    rows={3}
                    className="w-full bg-[#090D1A] border border-brand-border rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-brand-accent resize-none"
                    placeholder="e.g. 45, 12, 89, 23, 7, 56"
                  />
                </div>

                {sortError && (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{sortError}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-mono text-brand-muted block mb-1">Algorithm:</label>
                  <select
                    value={selectedAlgo}
                    onChange={(e) => setSelectedAlgo(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-brand-accent cursor-pointer"
                  >
                    <option value="bubble">Bubble Sort — O(n²)</option>
                    <option value="insertion">Insertion Sort — O(n²)</option>
                    <option value="selection">Selection Sort — O(n²)</option>
                    <option value="shell">Shell Sort — O(n^(3/2))</option>
                    <option value="quick">Quick Sort — O(n log n)</option>
                    <option value="radix">Radix Sort (LSD) — O(d·(n+k))</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const rand = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 10).join(', ');
                      setSortingInput(rand);
                      initSorting(rand, selectedAlgo);
                    }}
                    icon={Shuffle}
                  >
                    Randomize
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => initSorting(sortingInput, selectedAlgo)}
                    icon={Play}
                  >
                    Load & Sort
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between border-b border-brand-border/60 pb-1.5">
                  <span className="text-brand-muted">Step Progress:</span>
                  <span className="text-cyan-400 font-bold">{currentSortStep + 1} / {sortSteps.length}</span>
                </div>
                <div className="flex justify-between border-b border-brand-border/60 pb-1.5">
                  <span className="text-brand-muted">Comparisons:</span>
                  <span className="text-amber-400">{activeSortStepData.comparisons || 0}</span>
                </div>
                <div className="flex justify-between border-b border-brand-border/60 pb-1.5">
                  <span className="text-brand-muted">Swaps / Shifts:</span>
                  <span className="text-emerald-400">{activeSortStepData.swaps || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Array Accesses:</span>
                  <span className="text-indigo-400">{activeSortStepData.arrayAccesses || 0}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader
                title="Custom Array Visualization"
                subtitle={activeSortStepData.explanation || 'Ready for playback'}
                action={
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setCurrentSortStep(0)}
                      icon={RotateCcw}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setCurrentSortStep(prev => Math.max(0, prev - 1))}
                      icon={SkipBack}
                      disabled={currentSortStep <= 0}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setCurrentSortStep(prev => Math.min(sortSteps.length - 1, prev + 1))}
                      icon={SkipForward}
                      disabled={currentSortStep >= sortSteps.length - 1}
                    />
                    <Button
                      variant={isSortPlaying ? 'accent' : 'primary'}
                      size="sm"
                      onClick={() => setIsSortPlaying(!isSortPlaying)}
                      icon={isSortPlaying ? Pause : Play}
                    >
                      {isSortPlaying ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                }
              />

              <ArrayVisualizer
                array={activeSortStepData.array || []}
                highlightIndices={activeSortStepData.highlightIndices || []}
                highlightType={activeSortStepData.highlightType || 'standby'}
                sortedIndices={activeSortStepData.sortedIndices || []}
                searchRange={activeSortStepData.searchRange || null}
              />
            </Card>
          </div>
        </div>
      )}

      {/* 2. STACK SANDBOX PLAYGROUND */}
      {activeMode === 'stack' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader
                title="Stack Controls (LIFO)"
                subtitle="Direct operations and script runner"
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stackPushVal}
                    onChange={(e) => setStackPushVal(e.target.value)}
                    placeholder="Val"
                    className="w-24 bg-[#090D1A] border border-brand-border rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                  />
                  <Button variant="primary" size="sm" onClick={handleStackPush} icon={Plus}>
                    Push
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleStackPop}>
                    Pop
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleStackPeek}>
                    Peek
                  </Button>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <label className="text-xs font-mono text-brand-muted block mb-1">
                    Execute Command Script:
                  </label>
                  <input
                    type="text"
                    value={stackScript}
                    onChange={(e) => setStackScript(e.target.value)}
                    placeholder="push 10, push 20, pop, peek"
                    className="w-full bg-[#090D1A] border border-brand-border rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">e.g. push 10, pop, push 30</span>
                    <Button variant="secondary" size="sm" onClick={handleExecuteStackScript} icon={Play}>
                      Run Script
                    </Button>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-muted">Capacity:</span>
                  <select
                    value={stackCapacity}
                    onChange={(e) => setStackCapacity(Number(e.target.value))}
                    className="bg-brand-bg border border-brand-border rounded px-2 py-1 text-xs text-white font-mono cursor-pointer"
                  >
                    <option value={4}>4 elements</option>
                    <option value={6}>6 elements</option>
                    <option value={8}>8 elements</option>
                  </select>
                </div>

                <div className="p-2.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-cyan-300">
                  {stackMessage}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader
                title="Visual LIFO Chamber"
                subtitle="Elements pushed at top, popped from top"
                badge={<ComplexityBadge complexity="O(1) all ops" />}
              />
              <StackVisualizer
                items={stackItems}
                capacity={stackCapacity}
                highlightAction={stackAction}
              />
            </Card>
          </div>
        </div>
      )}

      {/* 3. LINKED LIST SANDBOX PLAYGROUND */}
      {activeMode === 'linked-list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader
                title="Linked List Actions"
                subtitle="Dynamic node pointer manipulations"
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={llInputVal}
                    onChange={(e) => setLlInputVal(e.target.value)}
                    placeholder="Val"
                    className="w-24 bg-[#090D1A] border border-brand-border rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                  />
                  <Button variant="primary" size="sm" onClick={handleLlInsertHead}>
                    Insert Head
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleLlInsertTail}>
                    Insert Tail
                  </Button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button variant="secondary" size="sm" onClick={handleLlDelete} icon={Trash2}>
                    Delete Val
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleLlSearch} icon={Search}>
                    Search Val
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleLlReverse}>
                    Reverse
                  </Button>
                </div>

                <div className="p-2.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-emerald-300">
                  {llMessage}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader
                title="Node Pointer Chain"
                subtitle="Dynamic memory nodes connected via next references"
                badge={<ComplexityBadge complexity="O(1) Head / O(n) Search" />}
              />
              <LinkedListVisualizer
                nodes={llNodes}
                mode="singly-ll"
                activeNodeIndex={llActiveIndex}
                highlightAction={llAction}
              />
            </Card>
          </div>
        </div>
      )}

      {/* 4. BST TREE BUILDER PLAYGROUND */}
      {activeMode === 'bst' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader
                title="BST Sequence Input"
                subtitle="Build binary search tree from key sequence"
                badge={<ComplexityBadge complexity="O(log n) avg" />}
              />

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-brand-muted block mb-1">Key Sequence:</label>
                  <input
                    type="text"
                    value={bstSequence}
                    onChange={(e) => setBstSequence(e.target.value)}
                    className="w-full bg-[#090D1A] border border-brand-border rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                    placeholder="50, 30, 70, 20, 40"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" onClick={() => buildBSTFromSequence(bstSequence)} icon={Play}>
                    Build Tree
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const rand = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 10).join(', ');
                      setBstSequence(rand);
                      buildBSTFromSequence(rand);
                    }}
                    icon={Shuffle}
                  >
                    Random Keys
                  </Button>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <label className="text-xs font-mono text-brand-muted block mb-1">Insert Single Key:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="singleKeyInput"
                      placeholder="e.g. 42"
                      className="w-24 bg-[#090D1A] border border-brand-border rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const el = document.getElementById('singleKeyInput');
                        if (el && el.value) {
                          handleBstInsertSingle(el.value);
                          el.value = '';
                        }
                      }}
                      icon={Plus}
                    >
                      Insert
                    </Button>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-cyan-300">
                  {bstMessage}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader
                title="Dynamic SVG Binary Search Tree"
                subtitle="Root, branch, and leaf node hierarchy adhering to BST invariant"
              />
              <TreeVisualizer
                tree={bstTree}
                activeKey={bstActiveKey}
              />
            </Card>
          </div>
        </div>
      )}

      {/* 5. HASH COLLISION SANDBOX PLAYGROUND */}
      {activeMode === 'hashing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader
                title="Hash Table Setup"
                subtitle="Linear Probing Collision Resolution"
                badge={<ComplexityBadge complexity="O(1) avg / O(n) worst" />}
              />

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-brand-muted block mb-1">Keys to Insert:</label>
                  <input
                    type="text"
                    value={hashKeysInput}
                    onChange={(e) => setHashKeysInput(e.target.value)}
                    className="w-full bg-[#090D1A] border border-brand-border rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-brand-accent"
                    placeholder="12, 22, 32, 45, 55"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-muted">Bucket Capacity (M):</span>
                  <select
                    value={hashCapacity}
                    onChange={(e) => setHashCapacity(Number(e.target.value))}
                    className="bg-brand-bg border border-brand-border rounded px-2 py-1 text-xs text-white font-mono cursor-pointer"
                  >
                    <option value={7}>7 buckets</option>
                    <option value={10}>10 buckets</option>
                    <option value={12}>12 buckets</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button variant="primary" size="sm" onClick={() => buildHashTable(hashKeysInput, hashCapacity)} icon={Play}>
                    Populate Table
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const rand = Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10).join(', ');
                      setHashKeysInput(rand);
                      buildHashTable(rand, hashCapacity);
                    }}
                    icon={Shuffle}
                  >
                    Random Keys
                  </Button>
                </div>

                <div className="p-2.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-cyan-300">
                  {hashMessage}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader
                title="Open Addressing Hash Buckets"
                subtitle="Notice how keys with identical modulo values resolve via sequential linear probes"
              />
              <HashTableVisualizer
                table={hashTable}
                capacity={hashCapacity}
                activeSlot={hashActiveSlot}
                highlightAction={hashHighlightAction}
              />
            </Card>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
