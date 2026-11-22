import React, { useState } from 'react';
import { Share2, Route, Play, RefreshCw, Terminal, Layers, Table2, GitBranch, MapPin } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import CodeEditor from '../components/common/CodeEditor';
import GraphVisualizer from '../visualizers/GraphVisualizer';
import { GRAPH_TRAVERSALS_JAVA } from '../java/graphs/graphTraversals.java.js';
import { DIJKSTRA_JAVA } from '../java/graphs/dijkstraAlgorithm.java.js';
import { SPANNING_TREES_JAVA } from '../java/graphs/spanningTrees.java.js';

export default function Graphs() {
  const algorithms = [
    { id: 'bfs', name: 'Breadth-First Search (BFS)', time: 'O(V + E)', space: 'O(V)', desc: 'Level-order graph exploration using a queue.' },
    { id: 'dfs', name: 'Depth-First Search (DFS)', time: 'O(V + E)', space: 'O(V)', desc: 'Backtracking graph traversal exploring down each branch before backtracking.' },
    { id: 'dijkstra', name: "Dijkstra's Shortest Path", time: 'O(E + V log V)', space: 'O(V)', desc: 'Finds single-source shortest paths on non-negative weighted graphs.' },
    { id: 'prims', name: "Prim's MST", time: 'O(E log V)', space: 'O(V)', desc: 'Grows a Minimum Spanning Tree from a starting vertex adding minimum-weight edges.' },
    { id: 'kruskals', name: "Kruskal's MST", time: 'O(E log E)', space: 'O(V)', desc: 'Sorts all edges and unifies disjoint sets without creating cycles.' }
  ];

  const vertices = [0, 1, 2, 3, 4];
  const graphEdges = [
    { u: 0, v: 1, weight: 4 },
    { u: 0, v: 2, weight: 2 },
    { u: 1, v: 2, weight: 1 },
    { u: 1, v: 3, weight: 5 },
    { u: 2, v: 3, weight: 8 },
    { u: 2, v: 4, weight: 10 },
    { u: 3, v: 4, weight: 2 }
  ];

  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);
  const [viewMode, setViewMode] = useState('canvas'); // 'canvas' | 'matrix'
  const [activeVertex, setActiveVertex] = useState(null);
  const [visitedVertices, setVisitedVertices] = useState([]);
  const [traversedEdges, setTraversedEdges] = useState([]);
  const [mstEdges, setMstEdges] = useState([]);
  const [distances, setDistances] = useState(null);
  const [activeQueue, setActiveQueue] = useState([]);
  const [activeStack, setActiveStack] = useState([]);
  const [statusMsg, setStatusMsg] = useState('Select an algorithm to run on the graph network.');
  const [activeJavaLine, setActiveJavaLine] = useState(null);

  // Run BFS
  const handleRunBFS = () => {
    setActiveVertex(0);
    setVisitedVertices([0, 1, 2, 3, 4]);
    setTraversedEdges([
      { u: 0, v: 2, weight: 2 },
      { u: 0, v: 1, weight: 4 },
      { u: 1, v: 3, weight: 5 },
      { u: 2, v: 4, weight: 10 }
    ]);
    setActiveQueue([0, 2, 1, 3, 4]);
    setActiveStack([]);
    setMstEdges([]);
    setDistances(null);
    setActiveJavaLine(GRAPH_TRAVERSALS_JAVA.lineMap.BFS_QUEUE_POLL);
    setStatusMsg('BFS Traversal from source vertex 0: Explored neighbors level-by-level [0 ➔ 2 ➔ 1 ➔ 3 ➔ 4].');
  };

  // Run DFS
  const handleRunDFS = () => {
    setActiveVertex(4);
    setVisitedVertices([0, 1, 2, 3, 4]);
    setTraversedEdges([
      { u: 0, v: 1, weight: 4 },
      { u: 1, v: 2, weight: 1 },
      { u: 2, v: 3, weight: 8 },
      { u: 3, v: 4, weight: 2 }
    ]);
    setActiveQueue([]);
    setActiveStack([0, 1, 2, 3, 4]);
    setMstEdges([]);
    setDistances(null);
    setActiveJavaLine(GRAPH_TRAVERSALS_JAVA.lineMap.DFS_VISIT);
    setStatusMsg('DFS Traversal from source vertex 0: Visited deepest path [0 ➔ 1 ➔ 2 ➔ 3 ➔ 4] before backtracking.');
  };

  // Run Dijkstra
  const handleRunDijkstra = () => {
    setActiveVertex(0);
    setVisitedVertices([0, 1, 2, 3, 4]);
    setDistances({ 0: 0, 1: 3, 2: 2, 3: 8, 4: 10 });
    setTraversedEdges([
      { u: 0, v: 2, weight: 2 },
      { u: 2, v: 1, weight: 1 },
      { u: 1, v: 3, weight: 5 },
      { u: 3, v: 4, weight: 2 }
    ]);
    setMstEdges([]);
    setActiveQueue([]);
    setActiveStack([]);
    setActiveJavaLine(DIJKSTRA_JAVA.lineMap.RELAXATION);
    setStatusMsg("Dijkstra's Shortest Path from vertex 0: Relaxed distances: [0:0, 1:3, 2:2, 3:8, 4:10].");
  };

  // Run Prim's / Kruskal's MST
  const handleRunMST = () => {
    const mst = [
      { u: 1, v: 2, weight: 1 },
      { u: 0, v: 2, weight: 2 },
      { u: 3, v: 4, weight: 2 },
      { u: 1, v: 3, weight: 5 }
    ];
    setMstEdges(mst);
    setTraversedEdges([]);
    setVisitedVertices([0, 1, 2, 3, 4]);
    setDistances(null);
    setActiveQueue([]);
    setActiveStack([]);
    setActiveJavaLine(SPANNING_TREES_JAVA.lineMap.ADD_MST_EDGE);
    const totalCost = mst.reduce((sum, e) => sum + e.weight, 0);
    setStatusMsg(`Minimum Spanning Tree identified! 4 edges selected with total minimum weight = ${totalCost}. Zero cycles.`);
  };

  const handleReset = () => {
    setActiveVertex(null);
    setVisitedVertices([]);
    setTraversedEdges([]);
    setMstEdges([]);
    setDistances(null);
    setActiveQueue([]);
    setActiveStack([]);
    setActiveJavaLine(null);
    setStatusMsg('Graph visualization reset.');
  };

  const activeJavaRef =
    selectedAlgo.id === 'dijkstra'
      ? DIJKSTRA_JAVA
      : selectedAlgo.id === 'prims' || selectedAlgo.id === 'kruskals'
      ? SPANNING_TREES_JAVA
      : GRAPH_TRAVERSALS_JAVA;

  return (
    <PageContainer
      title="Graphs & Network Algorithms"
      subtitle="Adjacency matrix representations, BFS queue state, DFS recursion stacks, Dijkstra shortest paths, and Minimum Spanning Trees."
    >
      {/* Algorithm Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex flex-wrap gap-2">
          {algorithms.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setSelectedAlgo(a);
                handleReset();
                setStatusMsg(`Selected ${a.name}. Click "Execute Algorithm" below.`);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all select-none border ${
                selectedAlgo.id === a.id
                  ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                  : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-brand-border text-xs">
          <button
            onClick={() => setViewMode('canvas')}
            className={`px-3 py-1 rounded-lg transition-colors font-mono ${
              viewMode === 'canvas' ? 'bg-brand-primary text-white font-bold' : 'text-brand-muted hover:text-white'
            }`}
          >
            Graph Canvas
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1 rounded-lg transition-colors font-mono ${
              viewMode === 'matrix' ? 'bg-brand-primary text-white font-bold' : 'text-brand-muted hover:text-white'
            }`}
          >
            Adjacency Matrix
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-brand-card/90">
            <CardHeader
              title={selectedAlgo.name}
              subtitle={selectedAlgo.desc}
              badge={<ComplexityBadge complexity={selectedAlgo.time} label="Time" />}
              action={<ComplexityBadge complexity={selectedAlgo.space} label="Space" />}
            />

            {/* Visualizer Canvas / Matrix */}
            <GraphVisualizer
              vertices={vertices}
              edges={graphEdges}
              activeVertex={activeVertex}
              visitedVertices={visitedVertices}
              traversedEdges={traversedEdges}
              mstEdges={mstEdges}
              distances={distances}
              activeQueue={activeQueue}
              activeStack={activeStack}
              viewMode={viewMode}
            />

            {/* Execution Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-brand-border/60">
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    if (selectedAlgo.id === 'bfs') handleRunBFS();
                    else if (selectedAlgo.id === 'dfs') handleRunDFS();
                    else if (selectedAlgo.id === 'dijkstra') handleRunDijkstra();
                    else handleRunMST();
                  }}
                  icon={Play}
                >
                  Execute {selectedAlgo.name}
                </Button>
              </div>

              <Button variant="ghost" size="sm" onClick={handleReset} icon={RefreshCw}>
                Reset Graph
              </Button>
            </div>

            {/* Live Status Message */}
            <div className="mt-3 p-3 rounded-lg bg-brand-bg border border-brand-border/80 flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shrink-0" />
              <span className="font-mono text-brand-text">{statusMsg}</span>
            </div>
          </Card>
        </div>

        {/* Java Reference Code Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader
                title={activeJavaRef.fileName}
                subtitle="Authentic textbook Java graph algorithm"
                badge={<span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">Java 21</span>}
              />

              <CodeEditor
                code={activeJavaRef.code}
                language="java"
                activeLine={activeJavaLine}
                title={activeJavaRef.fileName}
              />
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-brand-bg border border-brand-border text-xs text-brand-muted space-y-1.5">
              <div className="font-semibold text-brand-text flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Algorithm Mechanics Mapping</span>
                </div>
                {activeJavaLine && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
                    Line {activeJavaLine} Active
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                Watch how edge relaxation, queue polling, or edge disjoint union checks highlight the exact matching lines in the Java implementation.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
