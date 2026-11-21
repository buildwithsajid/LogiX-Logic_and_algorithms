import React from 'react';
import { Menu, X, Sparkles, BookOpen, Layers, Terminal, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B1020]/90 backdrop-blur-md border-b border-brand-border px-4 lg:px-8 flex items-center justify-between">
      {/* Brand logo & mobile toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-brand-muted hover:text-white hover:bg-brand-card transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent p-0.5 flex items-center justify-center shadow-glow-primary/50 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-brand-bg rounded-[10px] flex items-center justify-center font-mono font-extrabold text-brand-accent text-base">
              LX
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-accent bg-clip-text text-transparent">
              LogiX
            </span>
            <span className="text-[10px] font-mono text-brand-muted tracking-wider uppercase -mt-1 hidden sm:block">
              Interactive DSA Lab
            </span>
          </div>
        </Link>
      </div>

      {/* Center status / educational banner */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card border border-brand-borderLight text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-brand-muted font-medium">Java DSA Syllabus Engine</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">v1.0</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <Link to="/algorithm-race" className="hidden sm:block">
          <Button variant="secondary" size="sm" icon={Sparkles}>
            Algorithm Race
          </Button>
        </Link>
        <Link to="/java-lab">
          <Button variant="primary" size="sm" icon={Terminal}>
            Java Lab
          </Button>
        </Link>
      </div>
    </header>
  );
}
