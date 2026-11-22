import React from 'react';
import { Link } from 'react-router-dom';
import {
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
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import { SYLLABUS_MODULES, REAL_WORLD_SIMULATIONS } from '../constants/syllabus';

export default function Dashboard() {
  const iconMap = {
    ArrowUpDown,
    Hash,
    Layers,
    GitCommit,
    Network,
    Share2
  };

  const stats = [
    { label: 'Syllabus Modules', value: '6 Modules', desc: 'Core Data Structures' },
    { label: 'Algorithms & Structures', value: '42+ Topics', desc: 'Full College Syllabus' },
    { label: 'Primary Language', value: 'Java Reference', desc: 'Syntax-Highlighted & Mapped' },
    { label: 'Execution Model', value: 'Client-Side', desc: '100% Frontend Only' },
  ];

  const quickFeatures = [
    {
      title: 'Algorithm Race Mode',
      desc: 'Run Bubble, Selection, Insertion, and Quick Sort head-to-head on the exact same dataset to compare real comparison and swap counts.',
      link: '/algorithm-race',
      badge: 'Interactive Battle',
      icon: Trophy,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400'
    },
    {
      title: 'Java Reference Lab',
      desc: 'Browse textbook-accurate Java reference implementations with line-by-line method annotations mapped to animation operations.',
      link: '/java-lab',
      badge: 'Core Syllabus',
      icon: Terminal,
      color: 'from-indigo-500/20 to-violet-500/20 text-indigo-400'
    },
    {
      title: 'Static Code Complexity Analyzer',
      desc: 'Acorn-powered JavaScript AST parser detecting loop depth, recursion, and estimating Big-O time and space complexity.',
      link: '/code-analyzer',
      badge: 'AST Engine',
      icon: Cpu,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400'
    },
    {
      title: 'Real-World Software Simulations',
      desc: 'See how stacks power browser history, heaps drive ER hospital triage, and Dijkstra plans city routes.',
      link: '/simulations',
      badge: 'Industry Practice',
      icon: Compass,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400'
    }
  ];

  return (
    <PageContainer
      title="Interactive DSA Laboratory"
      subtitle="Master Data Structures & Algorithms visually with synchronized Java reference code, step-by-step operation tracing, and performance benchmarking."
      actions={
        <div className="flex items-center gap-2">
          <Link to="/sorting-searching">
            <Button variant="primary" icon={ArrowRight} iconPosition="right">
              Start Exploring
            </Button>
          </Link>
        </div>
      }
    >
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-secondary via-brand-card to-[#0e1628] border border-brand-border p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-accent text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Java Reference Code & JavaScript Visualization Engine</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Visualize. Compare. Analyze. Experiment.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            LogiX bridges the gap between academic theory and practical software engineering. Watch algorithm state changes, track operations step-by-step, inspect corresponding Java source code lines, and compare asymptotic complexities in real time.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/sorting-searching">
              <Button variant="primary" icon={Zap}>
                Visualizer Lab
              </Button>
            </Link>
            <Link to="/algorithm-race">
              <Button variant="secondary" icon={Trophy}>
                Algorithm Race
              </Button>
            </Link>
            <Link to="/java-lab">
              <Button variant="outline" icon={Terminal}>
                Java Code Reference
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient background glow decoration */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-20 w-60 h-60 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <Card key={idx} className="bg-brand-card/70 border-brand-border">
            <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">{item.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">{item.value}</div>
            <div className="text-xs text-brand-accent/80 mt-1 font-medium">{item.desc}</div>
          </Card>
        ))}
      </div>

      {/* Featured Feature Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Core Learning Capabilities</h2>
            <p className="text-xs text-brand-muted">Purpose-built analytical tools designed for college computer science students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link key={i} to={f.link} className="group">
                <Card hoverEffect className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-bg border border-brand-border text-brand-muted">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base text-white group-hover:text-brand-accent transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center text-xs text-brand-accent font-medium group-hover:translate-x-1 transition-transform">
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Complete Syllabus Modules Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Data Structures Syllabus Modules</h2>
            <p className="text-xs text-brand-muted">Interactive visualizations and Java reference code for every curriculum topic</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SYLLABUS_MODULES.map((module) => {
            const IconComponent = iconMap[module.icon] || BookOpen;

            return (
              <Card key={module.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                      {module.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base">
                    {module.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1.5 line-clamp-2">
                    {module.description}
                  </p>

                  {/* Syllabus Topics Pills */}
                  <div className="mt-4 space-y-1.5">
                    <div className="text-[11px] font-mono text-slate-400">Included syllabus concepts:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {module.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic.id}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-brand-bg/80 border border-brand-border text-slate-300 font-mono"
                        >
                          {topic.name}
                        </span>
                      ))}
                      {module.topics.length > 4 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-brand-card text-brand-muted font-mono">
                          +{module.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-brand-muted">
                    <span className="text-emerald-400 font-bold">{module.topics.length}</span> Topics
                  </div>

                  <Link to={module.path}>
                    <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                      Explore
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Real-World Systems Simulation Teaser */}
      <Card className="bg-brand-secondary/40 border-brand-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Applied Computer Science</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              5 Real-World Applied Engineering Simulations
            </h3>
            <p className="text-xs text-brand-muted mt-1 max-w-2xl">
              Experience authentic software engineering problems where Priority Queues govern Hospital Emergency Rooms, Circular Linked Lists power infinite music queues, and Dijkstra finds optimal delivery routes.
            </p>
          </div>
          <Link to="/simulations" className="shrink-0">
            <Button variant="accent" size="md" icon={ArrowRight} iconPosition="right">
              View Simulations
            </Button>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}
