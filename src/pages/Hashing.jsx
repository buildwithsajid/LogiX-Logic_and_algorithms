import React, { useState } from 'react';
import { Hash, Sparkles, Plus, Search, RefreshCw, Terminal, Sliders, AlertTriangle } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import CodeEditor from '../components/common/CodeEditor';
import HashTableVisualizer from '../visualizers/HashTableVisualizer';
import { HASH_TABLE_PROBING_JAVA } from '../java/hashing/hashTableLinearProbing.java.js';
import { HASH_FUNCTIONS_JAVA } from '../java/hashing/hashFunctions.java.js';

export default function Hashing() {
  const tableCapacity = 10;

  const hashFunctions = [
    {
      id: 'modulo',
      name: 'Modulo Division',
      formula: 'h(k) = k mod 10',
      calc: (k) => Math.abs(k) % tableCapacity,
      javaLine: HASH_FUNCTIONS_JAVA.lineMap.MODULO,
      desc: 'Standard division method dividing key by table capacity 10 and taking remainder.'
    },
    {
      id: 'digit-extraction',
      name: 'Digit Extraction',
      formula: 'Extract digits 1 & 3 mod 10',
      calc: (k) => {
        const s = String(Math.abs(k));
        if (s.length < 3) return Math.abs(k) % tableCapacity;
        return (parseInt(s[0], 10) + parseInt(s[2], 10)) % tableCapacity;
      },
      javaLine: HASH_FUNCTIONS_JAVA.lineMap.DIGIT_EXTRACT,
      desc: 'Extracts pre-selected digit positions to avoid skewed numerical patterns.'
    },
    {
      id: 'subtraction',
      name: 'Subtraction Hashing',
      formula: 'h(k) = (k - 1000) mod 10',
      calc: (k) => Math.abs(k - 1000) % tableCapacity,
      javaLine: HASH_FUNCTIONS_JAVA.lineMap.SUBTRACTION,
      desc: 'Subtracts fixed offset from dense high-value keys into compact index space.'
    },
    {
      id: 'fold-shift',
      name: 'Fold Shift',
      formula: 'h(k) = (k₁ + k₂) mod 10',
      calc: (k) => {
        const absK = Math.abs(k);
        const part1 = Math.floor(absK / 100);
        const part2 = absK % 100;
        return (part1 + part2) % tableCapacity;
      },
      javaLine: HASH_FUNCTIONS_JAVA.lineMap.FOLD_SHIFT,
      desc: 'Partitions key digits into equal segments and adds them up directly.'
    },
    {
      id: 'fold-boundary',
      name: 'Fold Boundary',
      formula: 'h(k) = (rev(k₁) + k₂) mod 10',
      calc: (k) => {
        const absK = Math.abs(k);
        let part1 = Math.floor(absK / 100);
        const part2 = absK % 100;
        // reverse part 1 (e.g. 47 -> 74)
        part1 = (part1 % 10) * 10 + Math.floor(part1 / 10);
        return (part1 + part2) % tableCapacity;
      },
      javaLine: HASH_FUNCTIONS_JAVA.lineMap.FOLD_BOUNDARY,
      desc: 'Reverses outermost digit segments like an accordion before summation.'
    }
  ];

  const [selectedFunc, setSelectedFunc] = useState(hashFunctions[0]);
  const [table, setTable] = useState(() => {
    const initial = new Array(tableCapacity).fill(null);
    // Initial seeded keys: 23 (slot 3), 45 (slot 5), 12 (slot 2)
    initial[3] = { key: 23, hashVal: 3, probed: 0 };
    initial[5] = { key: 45, hashVal: 5, probed: 0 };
    initial[2] = { key: 12, hashVal: 2, probed: 0 };
    return initial;
  });

  const [inputKey, setInputKey] = useState('');
  const [searchTarget, setSearchTarget] = useState('');
  const [activeSlot, setActiveSlot] = useState(null);
  const [searchSlot, setSearchSlot] = useState(null);
  const [highlightAction, setHighlightAction] = useState('idle');
  const [totalCollisions, setTotalCollisions] = useState(0);
  const [totalProbes, setTotalProbes] = useState(0);
  const [statusMsg, setStatusMsg] = useState('Hash table loaded with initial keys. Enter a key to insert or search.');
  const [activeJavaLine, setActiveJavaLine] = useState(null);

  // Insert Key with Linear Probing
  const handleInsert = () => {
    const key = inputKey.trim() ? parseInt(inputKey, 10) : Math.floor(Math.random() * 890) + 100;
    const occupiedCount = table.filter(s => s !== null).length;
    if (occupiedCount >= tableCapacity) {
      setStatusMsg('Hash Table Overflow! All 10 bucket slots are full.');
      setActiveJavaLine(HASH_TABLE_PROBING_JAVA.lineMap.CHECK_FULL);
      return;
    }

    const initialHash = selectedFunc.calc(key);
    let slot = initialHash;
    let probes = 0;
    let collisionOccurred = false;

    // Check duplicate
    if (table.some(s => s && s.key === key)) {
      setStatusMsg(`Key ${key} already exists in the table. Duplicate keys are disallowed.`);
      return;
    }

    // Linear Probing loop
    while (table[slot] !== null) {
      collisionOccurred = true;
      probes++;
      slot = (slot + 1) % tableCapacity;
    }

    const updated = [...table];
    updated[slot] = { key, hashVal: initialHash, probed: probes };
    setTable(updated);
    setInputKey('');
    setActiveSlot(slot);
    setSearchSlot(null);

    if (collisionOccurred) {
      setHighlightAction('collision');
      setTotalCollisions(prev => prev + 1);
      setTotalProbes(prev => prev + probes);
      setActiveJavaLine(HASH_TABLE_PROBING_JAVA.lineMap.PROBE_ADVANCE);
      setStatusMsg(`Collision at slot [${initialHash}]! Probed ${probes} step(s) forward to insert key ${key} at slot [${slot}].`);
    } else {
      setHighlightAction('insert');
      setActiveJavaLine(HASH_TABLE_PROBING_JAVA.lineMap.INSERT_SLOT);
      setStatusMsg(`Inserted key ${key} cleanly into bucket slot [${slot}] with zero collisions (h(k)=${initialHash}).`);
    }
  };

  // Search Key
  const handleSearch = () => {
    const target = searchTarget.trim() ? parseInt(searchTarget, 10) : 45;
    const initialHash = selectedFunc.calc(target);
    let slot = initialHash;
    let probes = 0;
    let found = false;

    for (let i = 0; i < tableCapacity; i++) {
      if (table[slot] === null) {
        break; // Empty slot found, key cannot exist
      }
      if (table[slot].key === target) {
        found = true;
        break;
      }
      probes++;
      slot = (slot + 1) % tableCapacity;
    }

    if (found) {
      setSearchSlot(slot);
      setActiveSlot(slot);
      setHighlightAction('search_match');
      setActiveJavaLine(HASH_TABLE_PROBING_JAVA.lineMap.SEARCH_FOUND);
      setStatusMsg(`Key ${target} found at slot [${slot}] in ${probes + 1} probe lookup(s)!`);
    } else {
      setSearchSlot(null);
      setActiveSlot(null);
      setHighlightAction('idle');
      setActiveJavaLine(HASH_TABLE_PROBING_JAVA.lineMap.SEARCH_NOT_FOUND);
      setStatusMsg(`Key ${target} was not found in the hash table after probing.`);
    }
  };

  // Seed Collision Cluster (keys that map to same bucket to observe clustering)
  const handleSeedCollisions = () => {
    const freshTable = new Array(tableCapacity).fill(null);
    // Keys: 12, 22, 32, 42, 52 all have (k mod 10) = 2
    const clusterKeys = [12, 22, 32, 42];
    let collisions = 0;
    let probesCount = 0;

    clusterKeys.forEach((k) => {
      let slot = 2;
      let p = 0;
      while (freshTable[slot] !== null) {
        p++;
        slot = (slot + 1) % tableCapacity;
      }
      if (p > 0) collisions++;
      probesCount += p;
      freshTable[slot] = { key: k, hashVal: 2, probed: p };
    });

    setTable(freshTable);
    setTotalCollisions(collisions);
    setTotalProbes(probesCount);
    setActiveSlot(null);
    setSearchSlot(null);
    setActiveJavaLine(HASH_TABLE_PROBING_JAVA.lineMap.PROBE_LOOP);
    setStatusMsg('Loaded primary clustering test: Keys {12, 22, 32, 42} all collide at slot [2] and probe sequentially.');
  };

  const handleReset = () => {
    setTable(new Array(tableCapacity).fill(null));
    setTotalCollisions(0);
    setTotalProbes(0);
    setActiveSlot(null);
    setSearchSlot(null);
    setActiveJavaLine(null);
    setStatusMsg('Hash table cleared.');
  };

  return (
    <PageContainer
      title="Hashing Techniques & Collision Resolution"
      subtitle="Explore hash functions, open addressing linear probing, primary clustering, and dynamic load factor tracking."
      badge="Phase 3 Ready"
    >
      {/* Hash Functions Tabs */}
      <div className="flex flex-wrap gap-2 pb-1">
        {hashFunctions.map((hf) => (
          <button
            key={hf.id}
            onClick={() => {
              setSelectedFunc(hf);
              setActiveJavaLine(hf.javaLine);
              setStatusMsg(`Active Hash Function changed to ${hf.name} (${hf.formula}).`);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all select-none border ${
              selectedFunc.id === hf.id
                ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
            }`}
          >
            <span>{hf.name}</span>
            <span className="text-[10px] font-mono opacity-80 ml-1">({hf.formula})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-brand-card/90">
            <CardHeader
              title={selectedFunc.name}
              subtitle={selectedFunc.desc}
              badge={<ComplexityBadge complexity="O(1) Avg" label="Lookup" />}
              action={<span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800">{selectedFunc.formula}</span>}
            />

            {/* Visualizer Canvas */}
            <HashTableVisualizer
              table={table}
              capacity={tableCapacity}
              activeSlot={activeSlot}
              searchSlot={searchSlot}
              highlightAction={highlightAction}
            />

            {/* Metrics Counters */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">Occupied Buckets</div>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
                  {table.filter(s => s !== null).length} / {tableCapacity}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">Collisions Encountered</div>
                <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">{totalCollisions}</div>
              </div>
              <div className="p-3 rounded-lg bg-brand-bg border border-brand-border text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase">Total Linear Probes</div>
                <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">{totalProbes}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-4 pt-4 border-t border-brand-border/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Key..."
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-24 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-primary"
                  />
                  <Button variant="primary" size="sm" onClick={handleInsert} icon={Plus}>
                    Insert Key
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Search Key..."
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    className="w-24 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-accent"
                  />
                  <Button variant="accent" size="sm" onClick={handleSearch} icon={Search}>
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={handleSeedCollisions} icon={AlertTriangle}>
                  Test Clustering (Colliding Keys)
                </Button>
                <Button variant="ghost" size="sm" onClick={handleReset} icon={RefreshCw}>
                  Clear Table
                </Button>
              </div>
            </div>

            {/* Live Status Message */}
            <div className="mt-3 p-3 rounded-lg bg-brand-bg border border-brand-border/80 flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shrink-0" />
              <span className="font-mono text-brand-text">{statusMsg}</span>
            </div>
          </Card>
        </div>

        {/* Java Reference Code Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader
                title={HASH_TABLE_PROBING_JAVA.fileName}
                subtitle="Authentic Open Addressing Linear Probing implementation"
                badge={<span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">Java 21</span>}
              />

              <CodeEditor
                code={HASH_TABLE_PROBING_JAVA.code}
                language="java"
                activeLine={activeJavaLine}
                title={HASH_TABLE_PROBING_JAVA.fileName}
              />
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-brand-bg border border-brand-border text-xs text-brand-muted space-y-1.5">
              <div className="font-semibold text-brand-text flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Collision Resolution Invariant</span>
                </div>
                {activeJavaLine && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
                    Line {activeJavaLine}
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                When two keys produce the identical hash index (e.g. 12 and 22 mod 10 = 2), the while loop at line 27 advances <code className="text-cyan-300 font-mono">index = (index + 1) % capacity</code> until finding the next unoccupied slot.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
