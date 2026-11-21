import React, { useState } from 'react';
import {
  Cpu,
  Play,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileCode,
  Layers,
  ArrowRight,
  GitBranch,
  Info,
  Sparkles,
  ExternalLink,
  Loader2,
  Clock,
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import CodeEditor from '../components/common/CodeEditor';
import { analyzeJavaScriptComplexity } from '../analysis/javascript/complexityAnalyzer.js';
import { JAVA_ALGORITHM_CATALOG } from '../java/index.js';

const EXAMPLE_PROGRAMS = [
  {
    name: 'Linear Search — O(n)',
    tag: 'Single Loop',
    javaKey: 'linear-search',
    code: `function findElement(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`
  },
  {
    name: 'Binary Search — O(log n)',
    tag: 'Logarithmic Halving',
    javaKey: 'binary-search',
    code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
  },
  {
    name: 'Bubble Sort — O(n²)',
    tag: 'Nested Loops',
    javaKey: 'bubble-sort',
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
  },
  {
    name: 'Triple Loop 3-Sum — O(n³)',
    tag: 'Cubic Nesting',
    javaKey: null,
    code: `function threeSum(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (arr[i] + arr[j] + arr[k] === 0) {
          return true;
        }
      }
    }
  }
  return false;
}`
  },
  {
    name: 'Sequential Loops — O(n)',
    tag: 'Additive O(n)+O(n)',
    javaKey: null,
    code: `function sequentialProcessing(arr) {
  let sum = 0;
  // First sequential loop: O(n)
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  // Second sequential loop: O(n) (Additive O(n)+O(n) = O(n))
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] > sum / arr.length) {
      console.log(arr[j]);
    }
  }
  return sum;
}`
  },
  {
    name: 'Recursive Fibonacci — O(2ⁿ)',
    tag: 'Branching Recursion',
    javaKey: null,
    code: `function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  // Branching recursive calls create binary tree of depth n
  return fibonacci(n - 1) + fibonacci(n - 2);
}`
  },
  {
    name: 'Logarithmic Loop — O(log n)',
    tag: 'Multiply Stride (i *= 2)',
    javaKey: null,
    code: `function logLoop(n) {
  let count = 0;
  for (let i = 1; i < n; i *= 2) {
    count++;
  }
  return count;
}`
  },
  {
    name: 'Matrix Allocation — Space O(n²)',
    tag: 'Dynamic Allocations',
    javaKey: null,
    code: `function createMatrix(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(i * j);
    }
    matrix.push(row);
  }
  return matrix;
}`
  },
  {
    name: 'Constant Time Swap — O(1)',
    tag: 'Zero Loops / O(1)',
    javaKey: null,
    code: `function swapElements(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`
  }
];

export default function CodeAnalyzer() {
  const [selectedExample, setSelectedExample] = useState(EXAMPLE_PROGRAMS[0]);
  const [activeCode, setActiveCode] = useState(EXAMPLE_PROGRAMS[0].code);
  const [analysisResult, setAnalysisResult] = useState(() => analyzeJavaScriptComplexity(EXAMPLE_PROGRAMS[0].code));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnostics'); // 'diagnostics' | 'ast'
  const [showJavaComparison, setShowJavaComparison] = useState(false);

  const handleSelectExample = (ex) => {
    setSelectedExample(ex);
    setActiveCode(ex.code);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(analyzeJavaScriptComplexity(ex.code));
      setIsAnalyzing(false);
    }, 280);
  };

  const handleClear = () => {
    setActiveCode('');
    setAnalysisResult(null);
  };

  const handleAnalyze = () => {
    if (!activeCode.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeJavaScriptComplexity(activeCode);
      setAnalysisResult(res);
      setIsAnalyzing(false);
    }, 320);
  };

  const javaReference = selectedExample.javaKey && JAVA_ALGORITHM_CATALOG[selectedExample.javaKey]
    ? JAVA_ALGORITHM_CATALOG[selectedExample.javaKey]
    : null;

  return (
    <PageContainer
      title="Static Code Complexity Analyzer"
      subtitle="Acorn AST-based static source inspector detecting loop nesting depth, stride patterns, recursion trees, and auxiliary memory allocations to estimate Big-O bounds."
      badge="Acorn AST Engine"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Code Input & Examples */}
        <div className="space-y-4">
          <Card className="flex flex-col h-full justify-between">
            <div>
              <CardHeader
                title="Source Code Input"
                subtitle="JavaScript AST Static Analysis"
                badge={
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800 flex items-center gap-1">
                    <Code2 className="w-3 h-3" /> Acorn 8.14 AST
                  </span>
                }
              />

              {/* Example Programs Carousel */}
              <div className="mb-3">
                <span className="text-xs font-mono text-brand-muted uppercase block mb-1.5">
                  Select Educational Example:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  {EXAMPLE_PROGRAMS.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectExample(ex)}
                      disabled={isAnalyzing}
                      className={`px-2.5 py-1 rounded text-xs font-mono border transition-all ${
                        selectedExample.name === ex.name
                          ? 'bg-brand-primary/20 text-brand-accent border-brand-accent font-semibold shadow-sm'
                          : 'bg-brand-bg text-slate-400 border-brand-border hover:border-slate-600'
                      }`}
                    >
                      <span>{ex.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Textarea Editor */}
              <div className="relative">
                <textarea
                  value={activeCode}
                  onChange={(e) => setActiveCode(e.target.value)}
                  placeholder="Paste JavaScript function or algorithm here..."
                  rows={13}
                  className="w-full bg-[#090D1A] border border-brand-border rounded-xl p-4 text-xs font-mono text-brand-text focus:outline-none focus:border-brand-accent leading-relaxed resize-none selection:bg-brand-primary/30"
                  spellCheck={false}
                />
                <div className="absolute right-3 bottom-3 text-[10px] font-mono text-brand-muted">
                  {activeCode ? activeCode.split('\n').length : 0} lines · {activeCode.length} chars
                </div>
              </div>

              {/* Java Reference Toggle (if available) */}
              {javaReference && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowJavaComparison(!showJavaComparison)}
                    className="text-xs font-mono text-brand-accent hover:underline flex items-center gap-1.5"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    {showJavaComparison ? 'Hide Java Reference' : 'View Equivalent Java Reference Code'}
                  </button>

                  {showJavaComparison && (
                    <div className="mt-2.5">
                      <CodeEditor
                        code={javaReference.code}
                        language="java"
                        title={javaReference.fileName}
                        activeLine={5}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand-border/60">
              <Button variant="ghost" size="sm" onClick={handleClear} icon={Trash2} disabled={isAnalyzing}>
                Clear
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !activeCode.trim()}
                icon={isAnalyzing ? Loader2 : Play}
                className={isAnalyzing ? 'animate-pulse' : ''}
              >
                {isAnalyzing ? 'Analyzing AST...' : 'Analyze Code AST'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Side: Static Analysis Diagnostics Dashboard */}
        <div className="space-y-4">
          <Card className="h-full flex flex-col justify-between relative overflow-hidden">
            {/* Analyzing Laser Scanline Animation */}
            {isAnalyzing && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 animate-pulse" />
            )}

            <div>
              <CardHeader
                title="Static Analysis Diagnostics"
                subtitle="AST Syntax Tree Classification & Confidence Metrics"
                badge={
                  analysisResult?.success ? (
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded border flex items-center gap-1.5 ${
                        analysisResult.confidence === 'High'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {analysisResult.confidence} Confidence
                    </span>
                  ) : null
                }
              />

              {/* View Switcher Tabs (Diagnostics vs Raw AST JSON) */}
              <div className="flex items-center gap-2 mb-4 p-1 bg-brand-bg rounded-lg border border-brand-border w-fit">
                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                    activeTab === 'diagnostics'
                      ? 'bg-brand-primary text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Complexity Diagnostics
                </button>
                <button
                  onClick={() => setActiveTab('ast')}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeTab === 'ast'
                      ? 'bg-brand-primary text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  Acorn AST Tree (JSON)
                </button>
              </div>

              {/* Execution Feedback Indicator */}
              {analysisResult?.success && (
                <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted bg-brand-bg/80 px-3 py-1.5 rounded-lg border border-brand-border/60 mb-4">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    AST Parsed: {analysisResult.astNodeCount || 38} nodes inspected
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" /> {analysisResult.parsedAt || 'Just now'}
                  </span>
                </div>
              )}

              {/* Tab 1: Complexity Diagnostics */}
              {activeTab === 'diagnostics' && (
                <>
                  {isAnalyzing ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                      <div className="text-xs font-mono text-cyan-300 font-semibold">
                        Parsing AST & Evaluating Recursion Trees...
                      </div>
                      <div className="text-[11px] font-mono text-brand-muted">
                        Inspecting loops, step strides, and allocation patterns
                      </div>
                    </div>
                  ) : analysisResult && analysisResult.success ? (
                    <div className="space-y-4">
                      {/* Estimated Complexities Hero Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border">
                          <div className="text-[10px] font-mono text-brand-muted uppercase">Estimated Time Complexity</div>
                          <div className="mt-1 flex items-center gap-2">
                            <ComplexityBadge complexity={analysisResult.estimatedTime} className="text-sm font-bold" />
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border">
                          <div className="text-[10px] font-mono text-brand-muted uppercase">Auxiliary Space Complexity</div>
                          <div className="mt-1 flex items-center gap-2">
                            <ComplexityBadge complexity={analysisResult.estimatedSpace} className="text-sm font-bold" />
                          </div>
                        </div>
                      </div>

                      {/* AST Syntactic Metrics Summary */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                        <div className="p-2.5 rounded-lg bg-brand-bg/80 border border-brand-border">
                          <div className="text-[10px] text-brand-muted uppercase">Max Nesting</div>
                          <div className="text-base font-bold text-cyan-400 mt-0.5">{analysisResult.maxLoopDepth}</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-brand-bg/80 border border-brand-border">
                          <div className="text-[10px] text-brand-muted uppercase">Detected Loops</div>
                          <div className="text-base font-bold text-white mt-0.5">{analysisResult.loopCount}</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-brand-bg/80 border border-brand-border">
                          <div className="text-[10px] text-brand-muted uppercase">Recursion</div>
                          <div className="text-base font-bold text-amber-400 mt-0.5">
                            {analysisResult.detectedRecursion.length > 0 ? 'Yes' : 'No'}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-brand-bg/80 border border-brand-border">
                          <div className="text-[10px] text-brand-muted uppercase">Allocations</div>
                          <div className="text-base font-bold text-indigo-400 mt-0.5">
                            {analysisResult.spaceAllocations.length}
                          </div>
                        </div>
                      </div>

                      {/* Detected Loops Breakdown Table (if loops exist) */}
                      {analysisResult.detectedLoops.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="text-xs font-mono text-brand-muted uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-brand-accent" />
                            Detected Loops Breakdown
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-brand-border bg-brand-bg/60">
                            <table className="w-full text-left text-xs font-mono">
                              <thead className="bg-brand-bg text-brand-muted border-b border-brand-border text-[11px]">
                                <tr>
                                  <th className="p-2">Loop ID</th>
                                  <th className="p-2">Type</th>
                                  <th className="p-2">Line</th>
                                  <th className="p-2">Depth</th>
                                  <th className="p-2">Stride Pattern</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-brand-border/60">
                                {analysisResult.detectedLoops.map((loop) => (
                                  <tr key={loop.id} className="hover:bg-slate-800/30">
                                    <td className="p-2 text-cyan-400 font-semibold">{loop.id}</td>
                                    <td className="p-2 text-white">{loop.type}</td>
                                    <td className="p-2 text-slate-300">Line {loop.line}</td>
                                    <td className="p-2 text-amber-400 font-bold">Level {loop.depth}</td>
                                    <td className="p-2 text-emerald-400 text-[11px]">{loop.stepType}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Recursion Breakdown (if detected) */}
                      {analysisResult.detectedRecursion.length > 0 && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs font-mono">
                          <div className="font-bold text-amber-400 flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4" />
                            Recursive Tree Characteristics
                          </div>
                          {analysisResult.detectedRecursion.map((rec, idx) => (
                            <div key={idx} className="text-slate-300 text-[11px] leading-relaxed">
                              Function <strong className="text-white">{rec.name}()</strong> performs {rec.calls.length} recursive call(s).
                              {rec.hasSubtraction && ' Subtractive parameter reduction (n-1) produces a branching recursion tree.'}
                              {rec.hasDivision && ' Divisive parameter reduction (n/2) produces a divide-and-conquer logarithmic tree.'}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Syntactic Analysis Explanation */}
                      <div className="p-4 rounded-xl bg-brand-bg border border-brand-border">
                        <div className="text-xs font-semibold text-brand-text mb-1.5 flex items-center gap-1.5 font-mono">
                          <Cpu className="w-3.5 h-3.5 text-brand-accent" />
                          AST Analysis Explanation & Rationale
                        </div>
                        <p className="text-xs text-brand-muted leading-relaxed font-mono">
                          {analysisResult.explanation}
                        </p>
                      </div>
                    </div>
                  ) : analysisResult && !analysisResult.success ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Acorn AST Parser Error:
                      </div>
                      <div>{analysisResult.error}</div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {analysisResult.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-brand-muted text-xs font-mono">
                      Enter or select code on the left and click "Analyze Code AST"
                    </div>
                  )}
                </>
              )}

              {/* Tab 2: Raw AST JSON Inspector */}
              {activeTab === 'ast' && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-brand-muted flex items-center justify-between">
                    <span>Parsed Acorn Abstract Syntax Tree (JSON representation):</span>
                    <span className="text-cyan-400">{analysisResult?.astNodeCount || 0} nodes</span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#080C17] border border-brand-border text-[11px] font-mono text-slate-300 max-h-96 overflow-y-auto leading-relaxed select-all">
                    {analysisResult?.rawAst || '// No AST generated yet'}
                  </pre>
                </div>
              )}
            </div>

            {/* Static Analysis Disclaimer Alert */}
            <div className="mt-4 p-3 rounded-lg bg-brand-bg border border-brand-border text-[11px] text-brand-muted flex items-start gap-2.5 font-mono">
              <Info className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-300">Theoretical Static Estimation Note:</strong> By Rice's Theorem and the Halting Problem, finding exact computational complexity of arbitrary Turing-complete code is undecidable. This analyzer uses AST pattern parsing without executing code using <code className="text-white font-mono">eval()</code>, providing mathematically rigorous bounds for common DSA programming patterns.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
