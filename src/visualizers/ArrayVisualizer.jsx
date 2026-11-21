import React from 'react';
import { cn } from '../utils/cn';

export default function ArrayVisualizer({
  array = [],
  highlightIndices = [],
  highlightType = 'standby', // 'compare' | 'swap' | 'select' | 'pivot' | 'element_sorted' | 'sorted' | 'found' | 'range_update'
  sortedIndices = [],
  searchRange = null, // [low, high] for binary search
  className = ''
}) {
  const maxVal = Math.max(...array, 1);

  const getBarColor = (index) => {
    const isHighlighted = highlightIndices.includes(index);
    const isSorted = sortedIndices.includes(index);

    if (highlightType === 'found' && isHighlighted) {
      return 'bg-emerald-400 border-emerald-300 ring-2 ring-emerald-400 shadow-glow-accent';
    }

    if (highlightType === 'pivot' && isHighlighted) {
      return 'bg-purple-500 border-purple-400 ring-2 ring-purple-400';
    }

    if (highlightType === 'swap' && isHighlighted) {
      return 'bg-amber-500 border-amber-300 ring-2 ring-amber-400 scale-[1.02] shadow-lg';
    }

    if (highlightType === 'compare' && isHighlighted) {
      return 'bg-cyan-400 border-cyan-200 ring-2 ring-cyan-400 shadow-glow-accent';
    }

    if (highlightType === 'select' && isHighlighted) {
      return 'bg-indigo-400 border-indigo-200 ring-2 ring-indigo-400';
    }

    if (isSorted || highlightType === 'sorted') {
      return 'bg-emerald-500/80 border-emerald-400/50';
    }

    // Default bar state
    return 'bg-gradient-to-t from-indigo-700 to-indigo-500 border-indigo-400/40 hover:from-indigo-600 hover:to-indigo-400';
  };

  const isDimmed = (index) => {
    if (searchRange && Array.isArray(searchRange) && searchRange.length === 2) {
      const [low, high] = searchRange;
      return index < low || index > high;
    }
    return false;
  };

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-end min-h-[300px] select-none', className)}>
      {/* Bars display area */}
      <div className="flex items-end justify-center gap-2 sm:gap-3 h-52 w-full px-2">
        {array.map((value, idx) => {
          const heightPercent = Math.max(12, Math.round((value / maxVal) * 100));
          const dimmed = isDimmed(idx);
          const isHighlighted = highlightIndices.includes(idx);

          return (
            <div
              key={idx}
              className={cn(
                'flex flex-col items-center flex-1 max-w-[48px] transition-all duration-200',
                dimmed && 'opacity-25'
              )}
            >
              {/* Value label on top */}
              <span
                className={cn(
                  'text-xs font-mono mb-1.5 transition-colors font-bold',
                  isHighlighted ? 'text-white scale-110' : 'text-slate-400'
                )}
              >
                {value}
              </span>

              {/* Bar */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={cn(
                  'w-full rounded-t-md transition-all duration-200 border-t border-x relative group',
                  getBarColor(idx)
                )}
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow border border-brand-border pointer-events-none whitespace-nowrap z-10 transition-opacity">
                  val: {value} | idx: [{idx}]
                </div>
              </div>

              {/* Index label on bottom */}
              <span className="text-[10px] font-mono text-slate-500 mt-2">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Visual Legend */}
      <div className="mt-4 pt-4 border-t border-brand-border/60 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-500" />
          <span className="text-brand-muted">Unsorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-cyan-400" />
          <span className="text-cyan-400 font-medium">Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-500" />
          <span className="text-amber-400 font-medium">Swapping / Moving</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span className="text-emerald-400 font-medium">Sorted / Found</span>
        </div>
      </div>
    </div>
  );
}
