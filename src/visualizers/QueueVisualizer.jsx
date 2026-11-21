import React from 'react';
import { ArrowDown, ArrowUp, RotateCcw, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function QueueVisualizer({
  items = [],
  capacity = 6,
  front = 0,
  rear = -1,
  count = 0,
  isCircular = false,
  highlightAction = 'idle', // 'enqueue' | 'dequeue' | 'overflow' | 'underflow' | 'idle'
  className = ''
}) {
  const isFull = isCircular ? count === capacity : rear === capacity - 1;
  const isEmpty = isCircular ? count === 0 : front > rear;

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-between min-h-[360px] select-none', className)}>
      {/* Queue Header Status */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          {isCircular ? (
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <RotateCcw className="w-4 h-4 animate-spin-slow" />
              Circular Ring Buffer
            </span>
          ) : (
            <span className="text-white font-bold">Ordinary FIFO Queue</span>
          )}
          <span className="text-slate-500">(Capacity: {capacity})</span>
        </div>

        <div className="flex items-center gap-3">
          <span>FRONT: <strong className="text-cyan-400">{isEmpty ? '—' : front}</strong></span>
          <span>REAR: <strong className="text-amber-400">{isEmpty ? '—' : rear}</strong></span>
          <span className={cn(
            'px-2 py-0.5 rounded text-[11px] font-semibold',
            isFull ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
            isEmpty ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          )}>
            {isFull ? 'QUEUE FULL' : isEmpty ? 'QUEUE EMPTY' : 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Main Queue Buffer Slots */}
      <div className="my-8 flex flex-col items-center justify-center">
        {/* Top Pointers Indicator (FRONT) */}
        <div className="grid grid-cols-6 gap-3 w-full max-w-xl mb-2">
          {Array.from({ length: capacity }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center h-8 justify-end">
              {!isEmpty && idx === front && (
                <div className="flex flex-col items-center text-cyan-400 font-mono text-[11px] font-bold animate-pulse">
                  <span>FRONT</span>
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* The Buffer Slots Array */}
        <div className="grid grid-cols-6 gap-3 w-full max-w-xl">
          {Array.from({ length: capacity }).map((_, idx) => {
            const hasItem = items[idx] !== undefined && items[idx] !== null;
            const val = hasItem ? items[idx] : null;
            const isFrontSlot = !isEmpty && idx === front;
            const isRearSlot = !isEmpty && idx === rear;

            return (
              <div
                key={idx}
                className={cn(
                  'h-20 rounded-xl border flex flex-col items-center justify-between p-2 font-mono transition-all duration-300 relative shadow-sm',
                  hasItem
                    ? isFrontSlot && highlightAction === 'dequeue'
                      ? 'bg-rose-500 text-white border-rose-300 scale-105 shadow-glow-primary'
                      : isRearSlot && highlightAction === 'enqueue'
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400 scale-105'
                      : 'bg-brand-card text-brand-text border-brand-border'
                    : 'border-dashed border-slate-800 bg-slate-950/20 text-slate-700'
                )}
              >
                <span className="text-[10px] text-slate-500 select-none">[{idx}]</span>
                <span className="text-lg font-bold text-white font-mono">
                  {hasItem ? val : '—'}
                </span>
                <div className="text-[9px] font-mono tracking-tighter">
                  {isFrontSlot && isRearSlot ? (
                    <span className="text-purple-400 font-bold">F & R</span>
                  ) : isFrontSlot ? (
                    <span className="text-cyan-400">FRONT</span>
                  ) : isRearSlot ? (
                    <span className="text-amber-400">REAR</span>
                  ) : (
                    <span className="text-slate-600">{hasItem ? 'ITEM' : 'FREE'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pointers Indicator (REAR) */}
        <div className="grid grid-cols-6 gap-3 w-full max-w-xl mt-2">
          {Array.from({ length: capacity }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center h-8 justify-start">
              {!isEmpty && idx === rear && (
                <div className="flex flex-col items-center text-amber-400 font-mono text-[11px] font-bold animate-pulse">
                  <ArrowUp className="w-4 h-4" />
                  <span>REAR</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overflow / Underflow alerts */}
      {(highlightAction === 'overflow' || highlightAction === 'underflow') && (
        <div className="w-full p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2 animate-bounce">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>
            {highlightAction === 'overflow'
              ? 'Queue Overflow: Cannot enqueue into a full queue!'
              : 'Queue Underflow: Cannot dequeue from an empty queue!'}
          </span>
        </div>
      )}
    </div>
  );
}
