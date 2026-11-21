import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowUpDown,
  Hash,
  Layers,
  GitCommit,
  Network,
  Share2,
  Trophy,
  Gauge,
  Cpu,
  Terminal,
  Code2,
  Sparkles,
  Compass
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Sidebar({ isOpen, onClose }) {
  const navigationGroups = [
    {
      title: 'DASHBOARD',
      items: [
        { name: 'Overview', path: '/', icon: LayoutDashboard }
      ]
    },
    {
      title: 'LEARN',
      items: [
        { name: 'Sorting & Searching', path: '/sorting-searching', icon: ArrowUpDown, count: '8' },
        { name: 'Hashing', path: '/hashing', icon: Hash, count: '7' },
        { name: 'Stack & Queue', path: '/stack-queue', icon: Layers, count: '6' },
        { name: 'Linked Lists', path: '/linked-lists', icon: GitCommit, count: '8' },
        { name: 'Trees & Heaps', path: '/trees-heaps', icon: Network, count: '10' },
        { name: 'Graphs', path: '/graphs', icon: Share2, count: '6' }
      ]
    },
    {
      title: 'ANALYZE',
      items: [
        { name: 'Algorithm Race', path: '/algorithm-race', icon: Trophy, highlight: true },
        { name: 'Complexity Analyzer', path: '/complexity-analyzer', icon: Gauge },
        { name: 'Code Analyzer', path: '/code-analyzer', icon: Cpu, badge: 'AST' }
      ]
    },
    {
      title: 'PLAYGROUND & LAB',
      items: [
        { name: 'Java Reference Lab', path: '/java-lab', icon: Terminal, badge: 'Java' },
        { name: 'Custom Playground', path: '/playground', icon: Code2 },
        { name: 'Real-World Sims', path: '/simulations', icon: Compass, count: '5' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-16 z-50 lg:z-20 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-[#0B1020] border-r border-brand-border flex flex-col transition-transform duration-200 ease-in-out select-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <h4 className="px-3 text-[11px] font-mono font-semibold tracking-wider text-brand-muted/70 uppercase">
                {group.title}
              </h4>

              <div className="mt-1.5 space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group',
                          isActive
                            ? 'bg-brand-primary/15 text-brand-accent border-l-2 border-brand-accent shadow-sm'
                            : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/60'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={cn(
                                'w-4 h-4 transition-colors',
                                isActive ? 'text-brand-accent' : 'text-slate-400 group-hover:text-brand-text'
                              )}
                            />
                            <span>{item.name}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {item.badge && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-medium">
                                {item.badge}
                              </span>
                            )}
                            {item.count && (
                              <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
                                {item.count}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 border-t border-brand-border bg-brand-secondary/40">
          <div className="p-2.5 rounded-lg bg-brand-card border border-brand-border/60 text-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-brand-muted">
              <span>Primary Lang:</span>
              <span className="text-amber-400 font-semibold">Java</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-brand-muted mt-1">
              <span>Engine:</span>
              <span className="text-brand-accent font-semibold">JS Tracing</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
