import React from 'react';
import { ArrowRight, ArrowLeft, ArrowDown, ArrowUp, RefreshCw, GitCommit } from 'lucide-react';
import { cn } from '../utils/cn';

export default function LinkedListVisualizer({
  nodes = [],
  mode = 'singly-ll', // 'singly-ll' | 'doubly-ll' | 'circular-ll' | 'polynomial-addition'
  activeNodeIndex = null,
  highlightAction = 'idle', // 'insert' | 'delete' | 'search_match' | 'traverse' | 'reverse' | 'idle'
  searchIndex = null,
  polynomialData = null,
  className = ''
}) {
  // If rendering polynomial addition
  if (mode === 'polynomial-addition' && polynomialData) {
    const { p1, p2, result } = polynomialData;

    return (
      <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col gap-6 select-none', className)}>
        {/* Polynomial 1 */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Polynomial P₁(x) (Linked List):</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto p-2 bg-brand-card/40 rounded-xl border border-brand-border">
            {p1.map((term, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-2 rounded-lg bg-brand-card border border-brand-borderLight text-center font-mono">
                  <div className="text-white font-bold text-sm">{term.coeff > 0 && i > 0 ? `+${term.coeff}` : term.coeff}x<sup className="text-cyan-400">{term.exp}</sup></div>
                  <div className="text-[9px] text-slate-500 mt-0.5">c:{term.coeff} | e:{term.exp}</div>
                </div>
                {i < p1.length - 1 ? <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> : <span className="text-[10px] text-slate-600 font-mono">➔ NULL</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Polynomial 2 */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Polynomial P₂(x) (Linked List):</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto p-2 bg-brand-card/40 rounded-xl border border-brand-border">
            {p2.map((term, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-2 rounded-lg bg-brand-card border border-brand-borderLight text-center font-mono">
                  <div className="text-white font-bold text-sm">{term.coeff > 0 && i > 0 ? `+${term.coeff}` : term.coeff}x<sup className="text-amber-400">{term.exp}</sup></div>
                  <div className="text-[9px] text-slate-500 mt-0.5">c:{term.coeff} | e:{term.exp}</div>
                </div>
                {i < p2.length - 1 ? <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> : <span className="text-[10px] text-slate-600 font-mono">➔ NULL</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Sum Result */}
        <div className="space-y-2 pt-2 border-t border-brand-border/60">
          <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Result Sum = P₁(x) + P₂(x):</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30">
            {result.map((term, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="px-3.5 py-2.5 rounded-lg bg-brand-card border border-emerald-500/40 text-center font-mono shadow-sm">
                  <div className="text-emerald-300 font-bold text-base">{term.coeff > 0 && i > 0 ? `+${term.coeff}` : term.coeff}x<sup className="text-emerald-400">{term.exp}</sup></div>
                  <div className="text-[9px] text-emerald-400/70 mt-0.5">c:{term.coeff} | e:{term.exp}</div>
                </div>
                {i < result.length - 1 ? <ArrowRight className="w-4 h-4 text-emerald-500" /> : <span className="text-[10px] text-emerald-500 font-mono">➔ NULL</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Standard Linked Lists (Singly, Doubly, Circular)
  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-between min-h-[320px] select-none', className)}>
      {/* Top Header Information */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-brand-primary" />
          <span className="text-white font-bold">
            {mode === 'doubly-ll' ? 'Doubly Linked List (DLL)' :
             mode === 'circular-ll' ? 'Circular Linked List (CLL)' :
             'Singly Linked List (SLL)'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>Nodes Count: <strong className="text-brand-accent">{nodes.length}</strong></span>
          <span className="text-slate-500">|</span>
          <span>HEAD: <strong className="text-indigo-400">{nodes.length > 0 ? `[${nodes[0]}]` : 'NULL'}</strong></span>
          {mode === 'doubly-ll' && (
            <span>TAIL: <strong className="text-amber-400">{nodes.length > 0 ? `[${nodes[nodes.length - 1]}]` : 'NULL'}</strong></span>
          )}
        </div>
      </div>

      {/* Linked Nodes Visual Canvas */}
      <div className="my-8 flex items-center justify-start overflow-x-auto py-6 px-2 gap-2 relative">
        {/* HEAD Pointer */}
        <div className="flex flex-col items-center shrink-0 mr-1">
          <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono text-[11px] font-bold">
            HEAD
          </span>
          <ArrowRight className="w-4 h-4 text-indigo-400 mt-1" />
        </div>

        {nodes.map((val, idx) => {
          const isMatch = searchIndex === idx;
          const isActive = activeNodeIndex === idx;

          return (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              {/* Node Box */}
              <div
                className={cn(
                  'flex rounded-xl border overflow-hidden transition-all duration-300 font-mono shadow-md',
                  isMatch
                    ? 'border-emerald-400 ring-2 ring-emerald-400 scale-105 shadow-glow-accent'
                    : isActive
                    ? 'border-brand-accent ring-2 ring-brand-accent scale-105'
                    : 'border-brand-borderLight bg-brand-card'
                )}
              >
                {/* Prev pointer field (DLL only) */}
                {mode === 'doubly-ll' && (
                  <div className="px-2 py-3 bg-slate-900 border-r border-brand-border text-[10px] text-slate-500 flex items-center">
                    {idx === 0 ? 'NULL' : 'prev'}
                  </div>
                )}

                {/* Data value field */}
                <div className="px-4 py-3 bg-brand-card font-bold text-base text-white flex flex-col items-center justify-center min-w-[50px]">
                  <span>{val}</span>
                  <span className="text-[9px] font-normal text-slate-500 select-none">[{idx}]</span>
                </div>

                {/* Next pointer field */}
                <div className="px-2.5 py-3 bg-slate-900 border-l border-brand-border text-[10px] text-brand-accent flex items-center">
                  next
                </div>
              </div>

              {/* Connecting Pointers */}
              {idx < nodes.length - 1 ? (
                mode === 'doubly-ll' ? (
                  <div className="flex flex-col items-center gap-0.5 px-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                ) : (
                  <ArrowRight className="w-4 h-4 text-brand-accent shrink-0 px-0.5" />
                )
              ) : mode === 'circular-ll' ? (
                <div className="flex flex-col items-center shrink-0 pl-1">
                  <div className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800">
                    ➔ Loops to HEAD
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 shrink-0 pl-1">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-slate-500">
                    NULL
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {nodes.length === 0 && (
          <div className="py-10 text-center w-full text-xs font-mono text-slate-500 italic">
            Linked List is empty (HEAD points to NULL).
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-brand-border/60 flex flex-wrap items-center justify-between text-xs font-mono text-brand-muted">
        <div>Pointer changes update memory addresses dynamically in O(1) time without contiguous array reallocations.</div>
        <div className="text-cyan-400 font-medium">Auxiliary Space: O(1) for mutations</div>
      </div>
    </div>
  );
}
