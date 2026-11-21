import React from 'react';
import { Hash, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function HashTableVisualizer({
  table = [],
  capacity = 10,
  activeSlot = null,
  highlightAction = 'idle', // 'insert' | 'collision' | 'search_match' | 'probe' | 'idle'
  searchSlot = null,
  className = ''
}) {
  const occupiedCount = table.filter(slot => slot !== null && slot !== undefined).length;
  const loadFactor = (occupiedCount / capacity).toFixed(2);

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-between min-h-[360px] select-none', className)}>
      {/* Header Info */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-brand-primary" />
          <span className="text-white font-bold">Open Addressing Hash Table (Capacity: {capacity})</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Occupied: <strong className="text-brand-accent">{occupiedCount}</strong> / {capacity}</span>
          <span className="text-slate-500">|</span>
          <span>Load Factor (α): <strong className={cn(Number(loadFactor) > 0.7 ? 'text-amber-400' : 'text-emerald-400')}>{loadFactor}</strong></span>
        </div>
      </div>

      {/* Hash Buckets Grid */}
      <div className="my-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Array.from({ length: capacity }).map((_, slotIdx) => {
            const item = table[slotIdx];
            const hasKey = item !== null && item !== undefined;
            const isMatch = searchSlot === slotIdx;
            const isActive = activeSlot === slotIdx;
            const hadCollision = hasKey && item.probed && item.probed > 0;

            return (
              <div
                key={slotIdx}
                className={cn(
                  'p-3 rounded-xl border flex flex-col justify-between min-h-[90px] font-mono transition-all duration-300 relative',
                  isMatch
                    ? 'border-emerald-400 ring-2 ring-emerald-400 bg-emerald-950/30 scale-105 shadow-glow-accent'
                    : isActive && highlightAction === 'collision'
                    ? 'border-rose-400 ring-2 ring-rose-400 bg-rose-950/30 scale-105'
                    : isActive && highlightAction === 'probe'
                    ? 'border-amber-400 ring-2 ring-amber-400 bg-amber-950/30 scale-105'
                    : hasKey
                    ? 'bg-brand-card border-brand-borderLight text-white shadow-sm'
                    : 'bg-brand-bg/50 border-dashed border-slate-800 text-slate-600'
                )}
              >
                {/* Bucket Header */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 select-none">
                  <span>Slot [{slotIdx}]</span>
                  {hadCollision && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold" title={`Probed ${item.probed} step(s)`}>
                      +{item.probed} probe
                    </span>
                  )}
                </div>

                {/* Stored Key */}
                <div className="my-1 text-center font-bold text-lg">
                  {hasKey ? (
                    <span className="text-white font-mono tracking-tight">{item.key}</span>
                  ) : (
                    <span className="text-slate-700 text-sm italic font-sans">Empty</span>
                  )}
                </div>

                {/* Bucket Subtitle */}
                <div className="text-[10px] text-center font-mono text-brand-muted/80">
                  {hasKey ? (
                    <span className="text-cyan-400">h(k) = {item.hashVal}</span>
                  ) : (
                    <span className="text-slate-700">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Collision Status */}
      <div className="pt-3 border-t border-brand-border/60 flex flex-wrap items-center justify-between text-xs font-mono text-brand-muted">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Found Key</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Linear Probing Step</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>Collision Detected</span>
          </div>
        </div>

        <div className="text-[11px] text-cyan-400">
          Linear Probing formula: h(k, i) = (h(k) + i) mod {capacity}
        </div>
      </div>
    </div>
  );
}
