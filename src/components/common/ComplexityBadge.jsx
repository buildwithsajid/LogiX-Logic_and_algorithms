import React from 'react';
import { cn } from '../../utils/cn';

export default function ComplexityBadge({
  complexity,
  type = 'time', // 'time' | 'space' | 'general'
  label,
  className = ''
}) {
  // Determine badge color theme based on Big-O growth rate
  const getBadgeColor = (val) => {
    if (!val) return 'bg-slate-800 text-slate-300 border-slate-700';
    const c = val.toLowerCase().replace(/\s+/g, '');
    
    if (c.includes('1')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (c.includes('logn') || c.includes('log(n)')) {
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
    if (c === 'o(n)' || c === 'n') {
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
    if (c.includes('nlogn') || c.includes('n*logn')) {
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
    if (c.includes('n^2') || c.includes('n²')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    if (c.includes('n^3') || c.includes('n³') || c.includes('2^n') || c.includes('2ⁿ') || c.includes('n!')) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
    return 'bg-brand-primary/10 text-brand-primary border-brand-primary/30';
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border', getBadgeColor(complexity), className)}>
      {label && <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-brand-muted">{label}:</span>}
      <span>{complexity}</span>
    </div>
  );
}
