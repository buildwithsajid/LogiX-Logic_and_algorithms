import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import SortingSearching from './pages/SortingSearching';
import Hashing from './pages/Hashing';
import StackQueue from './pages/StackQueue';
import LinkedLists from './pages/LinkedLists';
import TreesHeaps from './pages/TreesHeaps';
import Graphs from './pages/Graphs';
import AlgorithmRace from './pages/AlgorithmRace';
import ComplexityAnalyzer from './pages/ComplexityAnalyzer';
import CodeAnalyzer from './pages/CodeAnalyzer';
import JavaLab from './pages/JavaLab';
import Playground from './pages/Playground';
import Simulations from './pages/Simulations';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col antialiased selection:bg-brand-primary/30 selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Layout Area with Sticky Sidebar */}
      <div className="flex-1 flex max-w-full">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Content Viewport */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0B1020] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sorting-searching" element={<SortingSearching />} />
            <Route path="/hashing" element={<Hashing />} />
            <Route path="/stack-queue" element={<StackQueue />} />
            <Route path="/linked-lists" element={<LinkedLists />} />
            <Route path="/trees-heaps" element={<TreesHeaps />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/algorithm-race" element={<AlgorithmRace />} />
            <Route path="/complexity-analyzer" element={<ComplexityAnalyzer />} />
            <Route path="/code-analyzer" element={<CodeAnalyzer />} />
            <Route path="/java-lab" element={<JavaLab />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
