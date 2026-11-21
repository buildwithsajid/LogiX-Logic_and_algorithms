import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Terminal,
  Copy,
  Check,
  BookOpen,
  ExternalLink,
  Info,
  Code2,
  Search,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  ChevronRight,
  Layers,
  Cpu,
  FileCode,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import CodeEditor from '../components/common/CodeEditor';
import ComplexityBadge from '../components/common/ComplexityBadge';
import { JAVA_LAB_CATALOG, JAVA_CATEGORIES } from '../java/javaLabCatalog.js';

export default function JavaLab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState(JAVA_LAB_CATALOG[0]);
  const [copied, setCopied] = useState(false);

  // Line-by-line Trace Stepper State
  const [traceStep, setTraceStep] = useState(0);
  const [isTracing, setIsTracing] = useState(false);
  const traceTimerRef = useRef(null);

  // Filter Catalog
  const filteredCatalog = useMemo(() => {
    return JAVA_LAB_CATALOG.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.className.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // When active item changes, reset trace stepper
  const handleSelectItem = (item) => {
    setActiveItem(item);
    setTraceStep(0);
    setIsTracing(false);
    if (traceTimerRef.current) clearInterval(traceTimerRef.current);
  };

  // Trace timer effect
  useEffect(() => {
    if (!isTracing) {
      if (traceTimerRef.current) clearInterval(traceTimerRef.current);
      return;
    }

    const demo = activeItem.demoTrace || [];
    if (demo.length === 0) {
      setIsTracing(false);
      return;
    }

    traceTimerRef.current = setInterval(() => {
      setTraceStep((prev) => {
        if (prev >= demo.length - 1) {
          setIsTracing(false);
          clearInterval(traceTimerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);

    return () => {
      if (traceTimerRef.current) clearInterval(traceTimerRef.current);
    };
  }, [isTracing, activeItem]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeItem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextTraceStep = () => {
    const demo = activeItem.demoTrace || [];
    if (traceStep < demo.length - 1) {
      setTraceStep(traceStep + 1);
    }
  };

  const handleResetTrace = () => {
    setTraceStep(0);
    setIsTracing(false);
    if (traceTimerRef.current) clearInterval(traceTimerRef.current);
  };

  const currentDemo = activeItem.demoTrace || [];
  const currentTraceStepData = currentDemo[traceStep] || currentDemo[0] || {};
  const currentActiveLine = currentTraceStepData.activeLine || activeItem.defaultLine || 1;

  return (
    <PageContainer
      title="Java Reference Code Lab"
      subtitle="Examine textbook-accurate Java 21 LTS reference implementations for all syllabus data structures and algorithms, synchronized line-by-line with interactive operational tracing."
      badge="Java 21 LTS Library"
    >
      {/* Category Filter & Search Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-brand-card/90 rounded-xl border border-brand-border">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {JAVA_CATEGORIES.map((cat) => (
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

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-brand-muted" />
          <input
            type="text"
            placeholder="Search Java class or method..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-brand-bg border border-brand-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent w-64 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Java Class Catalog */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs font-mono text-brand-muted uppercase tracking-wider">
            <span>Java Reference Files</span>
            <span className="text-brand-accent font-bold">({filteredCatalog.length})</span>
          </div>

          <div className="space-y-1.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredCatalog.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                      : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                      <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-accent' : 'text-slate-500'}`} />
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-bg text-slate-400 border border-brand-border/60">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono mt-1.5 text-brand-muted">
                    <span>{item.className}</span>
                    <span className="text-cyan-400 font-semibold">{item.time}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Educational Note on Java Reference */}
          <div className="p-3.5 rounded-xl bg-brand-card/60 border border-brand-border text-xs text-brand-muted space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-brand-text">
              <Info className="w-3.5 h-3.5 text-brand-accent" />
              <span>Textbook-Accurate Java 21</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every class is fully formed, standard university-grade Java code with class declarations, proper access modifiers, and static main methods.
            </p>
          </div>
        </div>

        {/* Right Area: Code Editor, Trace Stepper, and Terminal Output */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader
              title={activeItem.title}
              subtitle={activeItem.desc}
              badge={<ComplexityBadge complexity={activeItem.time} label="Time" />}
              action={
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyCode}
                    icon={copied ? Check : Copy}
                  >
                    {copied ? 'Copied' : 'Copy Code'}
                  </Button>

                  <Link to={activeItem.visLink}>
                    <Button variant="primary" size="sm" icon={ExternalLink} iconPosition="right">
                      Visualizer
                    </Button>
                  </Link>
                </div>
              }
            />

            {/* Interactive Trace Stepper Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-brand-bg rounded-xl border border-brand-border mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Line Trace Stepper:
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  Line {currentActiveLine}
                </span>
                <span className="text-[11px] font-mono text-brand-muted">
                  ({traceStep + 1} of {currentDemo.length} trace states)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleResetTrace}
                  icon={RotateCcw}
                  title="Reset trace step"
                >
                  Reset
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleNextTraceStep}
                  icon={SkipForward}
                  disabled={traceStep >= currentDemo.length - 1 || isTracing}
                >
                  Step
                </Button>

                <Button
                  variant={isTracing ? 'accent' : 'primary'}
                  size="sm"
                  onClick={() => setIsTracing(!isTracing)}
                  icon={isTracing ? Pause : Play}
                >
                  {isTracing ? 'Pause Trace' : 'Play Trace'}
                </Button>
              </div>
            </div>

            {/* Live Trace Explanation Banner */}
            {currentTraceStepData.log && (
              <div className="mb-4 p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Step {traceStep + 1}:</strong> {currentTraceStepData.log}
                </span>
              </div>
            )}

            {/* Code Display with Active Line Highlight */}
            <CodeEditor
              code={activeItem.code}
              language="java"
              activeLine={currentActiveLine}
              title={activeItem.title}
            />

            {/* Algorithm Mechanics & Invariants */}
            <div className="mt-4 p-4 rounded-xl bg-brand-bg border border-brand-border">
              <h4 className="text-xs font-semibold text-brand-text mb-1.5 flex items-center gap-1.5 font-mono">
                <BookOpen className="w-3.5 h-3.5 text-brand-accent" />
                Algorithm Invariants & Architectural Rationale
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                {activeItem.explanation}
              </p>
            </div>

            {/* Key Methods Table */}
            {activeItem.methods && activeItem.methods.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">
                  Important Class Methods ({activeItem.methods.length})
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-brand-bg text-brand-muted border-b border-brand-border">
                      <tr>
                        <th className="p-2.5">Method Signature</th>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Function & Logic</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60">
                      {activeItem.methods.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="p-2.5 text-brand-accent font-semibold">{m.signature}</td>
                          <td className="p-2.5 text-emerald-400">{m.complexity}</td>
                          <td className="p-2.5 text-slate-300">{m.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Simulated Terminal Console (JDK 21 LTS Execution) */}
            <div className="mt-4 rounded-xl bg-[#090D1A] border border-brand-border overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#0E1528] border-b border-brand-border text-xs font-mono text-brand-muted">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-300 font-semibold">Simulated JDK Execution Terminal</span>
                  <span className="text-[10px] text-slate-500">openjdk version "21.0.2"</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] text-emerald-400">Exit Code: 0</span>
                </div>
              </div>

              <div className="p-4 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-slate-500">
                  $ javac {activeItem.className}.java && java {activeItem.className}
                </div>
                <div className="text-cyan-400">
                  // Sample Input: {activeItem.sampleInput}
                </div>
                <div className="text-emerald-400 font-bold">
                  {activeItem.expectedOutput}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
