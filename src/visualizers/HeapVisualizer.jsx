import React from 'react';
import { Layers, ArrowDownUp } from 'lucide-react';
import { cn } from '../utils/cn';

export default function HeapVisualizer({
  heap = [],
  isMinHeap = true,
  highlightIndices = [],
  highlightAction = 'idle', // 'insert' | 'extract' | 'reheap_up' | 'reheap_down' | 'idle'
  className = ''
}) {
  // Pre-calculated coordinates for 3 levels (up to 7 nodes)
  const coords = [
    { x: 200, y: 35 },  // index 0 (Root)
    { x: 120, y: 90 },  // index 1
    { x: 280, y: 90 },  // index 2
    { x: 80, y: 150 },  // index 3
    { x: 160, y: 150 }, // index 4
    { x: 240, y: 150 }, // index 5
    { x: 320, y: 150 }  // index 6
  ];

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-between min-h-[360px] select-none', className)}>
      {/* Header Info */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <ArrowDownUp className="w-4 h-4 text-brand-primary" />
          <span className="text-white font-bold">
            {isMinHeap ? 'Binary Min-Heap (Parent ≤ Children)' : 'Binary Max-Heap (Parent ≥ Children)'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>Heap Size: <strong className="text-cyan-400">{heap.length}</strong> / 7</span>
          {heap.length > 0 && (
            <span>ROOT ({isMinHeap ? 'MIN' : 'MAX'}): <strong className="text-emerald-400">[{heap[0]}]</strong></span>
          )}
        </div>
      </div>

      {/* Heap Tree SVG Canvas */}
      <div className="w-full h-44 flex items-center justify-center my-2">
        {heap.length > 0 ? (
          <svg className="w-full h-full" viewBox="0 0 400 180">
            {/* Draw Parent-Child Edges */}
            {heap.map((_, i) => {
              if (i === 0) return null;
              const parentIdx = Math.floor((i - 1) / 2);
              if (parentIdx < coords.length && i < coords.length) {
                return (
                  <line
                    key={`edge-${i}`}
                    x1={coords[parentIdx].x}
                    y1={coords[parentIdx].y}
                    x2={coords[i].x}
                    y2={coords[i].y}
                    stroke="#334155"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              }
              return null;
            })}

            {/* Draw Heap Nodes */}
            {heap.slice(0, 7).map((val, idx) => {
              const isHighlighted = highlightIndices.includes(idx);
              const { x, y } = coords[idx];

              return (
                <g key={`node-${idx}`} className="transition-all duration-300">
                  <circle
                    cx={x}
                    cy={y}
                    r="17"
                    className={cn(
                      'transition-colors duration-300',
                      isHighlighted
                        ? 'fill-amber-500 stroke-amber-200 stroke-2 ring-4 ring-amber-400'
                        : idx === 0
                        ? 'fill-emerald-600 stroke-emerald-300 stroke-2 shadow-glow-accent'
                        : 'fill-brand-card stroke-brand-primary stroke-2'
                    )}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    fill="#FFFFFF"
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {val}
                  </text>
                  <text
                    x={x + 19}
                    y={y - 6}
                    fill="#64748B"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    className="select-none"
                  >
                    [{idx}]
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="text-center text-xs font-mono text-slate-500 italic">
            Heap is empty. Insert elements to observe reheap operations.
          </div>
        )}
      </div>

      {/* Heap Underlying Array Representation */}
      <div className="pt-3 border-t border-brand-border/60 space-y-2">
        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Array Representation: heap[i], left = 2i+1, right = 2i+2</span>
          <span className="text-brand-accent">Formula-mapped indices</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, idx) => {
            const hasVal = idx < heap.length;
            const isHighlighted = highlightIndices.includes(idx);

            return (
              <div
                key={idx}
                className={cn(
                  'p-2 rounded-lg border text-center font-mono text-xs transition-all',
                  hasVal
                    ? isHighlighted
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/50'
                      : idx === 0
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold'
                      : 'bg-brand-card border-brand-borderLight text-white'
                    : 'border-dashed border-slate-800 bg-slate-950/20 text-slate-700'
                )}
              >
                <div className="text-[9px] text-slate-500">[{idx}]</div>
                <div className="text-sm font-bold mt-0.5">{hasVal ? heap[idx] : '—'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
