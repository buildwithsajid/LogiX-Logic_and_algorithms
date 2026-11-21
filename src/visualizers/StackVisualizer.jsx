import React from 'react';
import { ArrowLeft, Layers, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function StackVisualizer({
  items = [],
  capacity = 6,
  highlightIndex = null,
  highlightAction = 'idle', // 'push' | 'pop' | 'peek' | 'overflow' | 'underflow' | 'idle'
  className = ''
}) {
  const topIndex = items.length - 1;
  const isFull = items.length >= capacity;
  const isEmpty = items.length === 0;

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col items-center justify-between min-h-[360px] select-none relative', className)}>
      {/* Top Status Bar */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-primary" />
          <span>LIFO Stack (Capacity: {capacity})</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Size: <strong className="text-white">{items.length}</strong> / {capacity}</span>
          <span className={cn(
            'px-2 py-0.5 rounded text-[11px] font-semibold',
            isFull ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
            isEmpty ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          )}>
            {isFull ? 'STACK FULL' : isEmpty ? 'STACK EMPTY' : 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Vertical Stack Chamber */}
      <div className="my-6 relative flex items-end justify-center w-full max-w-xs">
        {/* Pointer Column */}
        <div className="absolute -left-20 inset-y-0 flex flex-col-reverse justify-start">
          {Array.from({ length: capacity }).map((_, idx) => (
            <div key={idx} className="h-12 flex items-center justify-end pr-2">
              {idx === topIndex && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-brand-accent font-bold animate-pulse">
                  <span>TOP</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* The Stack Bucket (Closed on bottom and sides) */}
        <div className="w-56 flex flex-col-reverse justify-start border-b-4 border-x-4 border-slate-700 rounded-b-xl p-2 bg-slate-900/30 min-h-[300px] gap-2 shadow-inner">
          {Array.from({ length: capacity }).map((_, slotIdx) => {
            const hasItem = slotIdx < items.length;
            const val = hasItem ? items[slotIdx] : null;
            const isTop = slotIdx === topIndex;
            const isHighlighted = highlightIndex === slotIdx;

            return (
              <div
                key={slotIdx}
                className={cn(
                  'h-11 rounded-lg border flex items-center justify-between px-4 font-mono text-sm transition-all duration-300',
                  hasItem
                    ? isHighlighted && highlightAction === 'pop'
                      ? 'bg-rose-500 text-white border-rose-300 scale-105 shadow-glow-primary'
                      : isHighlighted && highlightAction === 'peek'
                      ? 'bg-cyan-500 text-slate-950 font-extrabold border-cyan-300 ring-2 ring-cyan-400'
                      : isTop
                      ? 'bg-gradient-to-r from-brand-primary to-indigo-600 text-white border-brand-accent shadow-md'
                      : 'bg-brand-card text-brand-text border-brand-border'
                    : 'border-dashed border-slate-800 bg-slate-950/20 text-slate-700'
                )}
              >
                <span className="text-xs text-slate-500 select-none">[{slotIdx}]</span>
                <span className="font-bold text-base tracking-wide">
                  {hasItem ? val : '—'}
                </span>
                <span className="text-[10px] text-slate-500 font-sans">
                  {isTop ? 'TOP' : hasItem ? 'ITEM' : 'EMPTY'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overflow/Underflow Alert Banner */}
      {(highlightAction === 'overflow' || highlightAction === 'underflow') && (
        <div className="w-full p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2 animate-bounce">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>
            {highlightAction === 'overflow'
              ? 'Stack Overflow: Cannot push onto a full stack (limit reached)!'
              : 'Stack Underflow: Cannot pop from an empty stack!'}
          </span>
        </div>
      )}
    </div>
  );
}
