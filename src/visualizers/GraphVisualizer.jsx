import React from 'react';
import { Share2, Route, Table2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function GraphVisualizer({
  vertices = [0, 1, 2, 3, 4],
  edges = [],
  activeVertex = null,
  visitedVertices = [],
  traversedEdges = [],
  mstEdges = [],
  distances = null,
  activeQueue = [],
  activeStack = [],
  viewMode = 'canvas', // 'canvas' | 'matrix'
  className = ''
}) {
  // Vertex positions in 400x240 SVG viewbox
  const vertexCoords = {
    0: { x: 70, y: 120 },
    1: { x: 190, y: 50 },
    2: { x: 190, y: 190 },
    3: { x: 320, y: 70 },
    4: { x: 320, y: 180 }
  };

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-between min-h-[380px] select-none', className)}>
      {/* Header Info */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-brand-primary" />
          <span className="text-white font-bold">Weighted Graph Network (V = 5, E = {edges.length})</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Visited: <strong className="text-cyan-400">[{visitedVertices.join(', ')}]</strong></span>
          <span className="text-slate-500">|</span>
          <span>Active: <strong className="text-amber-400">{activeVertex !== null ? `Vertex ${activeVertex}` : 'None'}</strong></span>
        </div>
      </div>

      {/* Main Viewport: Canvas vs Adjacency Matrix */}
      {viewMode === 'canvas' ? (
        <div className="w-full h-64 flex items-center justify-center my-2">
          <svg className="w-full h-full" viewBox="0 0 400 240">
            {/* Draw Edges */}
            {edges.map((e, idx) => {
              const u = vertexCoords[e.u];
              const v = vertexCoords[e.v];
              const isTraversed = traversedEdges.some(te => (te.u === e.u && te.v === e.v) || (te.u === e.v && te.v === e.u));
              const isMst = mstEdges.some(me => (me.u === e.u && me.v === e.v) || (me.u === e.v && me.v === e.u));

              const midX = (u.x + v.x) / 2;
              const midY = (u.y + v.y) / 2;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={u.x}
                    y1={u.y}
                    x2={v.x}
                    y2={v.y}
                    stroke={isMst ? '#22C55E' : isTraversed ? '#06B6D4' : '#334155'}
                    strokeWidth={isMst ? '3.5' : isTraversed ? '2.5' : '1.5'}
                    strokeLinecap="round"
                    className="transition-colors duration-300"
                  />
                  {/* Weight Badge */}
                  <rect
                    x={midX - 10}
                    y={midY - 8}
                    width="20"
                    height="16"
                    rx="4"
                    fill="#111827"
                    stroke={isMst ? '#22C55E' : '#1E293B'}
                    strokeWidth="1"
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    fill={isMst ? '#86EFAC' : '#94A3B8'}
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    {e.weight}
                  </text>
                </g>
              );
            })}

            {/* Draw Vertices */}
            {vertices.map((v) => {
              const { x, y } = vertexCoords[v];
              const isVisited = visitedVertices.includes(v);
              const isActive = activeVertex === v;

              return (
                <g key={`vertex-${v}`} className="transition-all duration-300">
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    className={cn(
                      'transition-colors duration-300',
                      isActive
                        ? 'fill-amber-500 stroke-amber-200 stroke-2 ring-4 ring-amber-400'
                        : isVisited
                        ? 'fill-indigo-600 stroke-indigo-400 stroke-2 shadow-glow-primary'
                        : 'fill-brand-card stroke-brand-primary stroke-2'
                    )}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    fill="#FFFFFF"
                    textAnchor="middle"
                    fontSize="12"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {v}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        /* Adjacency Matrix View */
        <div className="my-4 overflow-x-auto flex justify-center">
          <table className="border-collapse font-mono text-xs">
            <thead>
              <tr>
                <th className="p-2 border border-brand-border bg-brand-bg text-slate-500">V</th>
                {vertices.map(v => (
                  <th key={v} className="p-2 border border-brand-border bg-brand-card text-brand-accent">
                    [{v}]
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vertices.map(rowV => (
                <tr key={rowV}>
                  <td className="p-2 border border-brand-border bg-brand-card text-brand-accent font-bold text-center">
                    [{rowV}]
                  </td>
                  {vertices.map(colV => {
                    const edge = edges.find(e => (e.u === rowV && e.v === colV) || (e.u === colV && e.v === rowV));
                    const isConnected = !!edge;
                    return (
                      <td
                        key={colV}
                        className={cn(
                          'p-2.5 border border-brand-border text-center font-bold',
                          isConnected ? 'text-emerald-400 bg-emerald-950/20' : 'text-slate-600 bg-brand-bg/40'
                        )}
                      >
                        {isConnected ? edge.weight : '0'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Auxiliary Runtime State Bar (Queue / Stack / Dijkstra Distances) */}
      <div className="pt-3 border-t border-brand-border/60 flex flex-wrap items-center justify-between text-xs font-mono text-brand-muted gap-2">
        {distances ? (
          <div className="flex items-center gap-2">
            <span>Dijkstra Distances:</span>
            <div className="flex items-center gap-1.5 text-white">
              {Object.entries(distances).map(([v, d]) => (
                <span key={v} className="px-1.5 py-0.5 rounded bg-brand-card border border-brand-border">
                  [{v}]: <strong className="text-cyan-400">{d === Infinity ? '∞' : d}</strong>
                </span>
              ))}
            </div>
          </div>
        ) : activeQueue.length > 0 ? (
          <div className="flex items-center gap-2">
            <span>BFS Queue State:</span>
            <span className="text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800">
              [ {activeQueue.join(', ')} ]
            </span>
          </div>
        ) : activeStack.length > 0 ? (
          <div className="flex items-center gap-2">
            <span>DFS Call Stack:</span>
            <span className="text-purple-400 font-bold bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800">
              [ {activeStack.join(' ➔ ')} ]
            </span>
          </div>
        ) : (
          <div className="text-slate-500">Standby. Choose an algorithm below.</div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>MST Edge</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Traversed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
