import React from 'react';
import { Network } from 'lucide-react';
import { cn } from '../utils/cn';

export default function TreeVisualizer({
  tree = null,
  activeKey = null,
  highlightAction = 'idle', // 'insert' | 'search_match' | 'traverse' | 'min' | 'max' | 'idle'
  traversalOrder = [],
  className = ''
}) {
  // Helper to compute node coordinates (x, y) dynamically
  const layoutNodes = (node, depth = 0, x = 200, offset = 90) => {
    if (!node) return [];
    const current = { key: node.key, x, y: 40 + depth * 55, left: null, right: null };

    const leftChildren = node.left ? layoutNodes(node.left, depth + 1, x - offset, offset / 1.8) : [];
    const rightChildren = node.right ? layoutNodes(node.right, depth + 1, x + offset, offset / 1.8) : [];

    return [
      current,
      ...leftChildren,
      ...rightChildren
    ];
  };

  const getEdges = (node, depth = 0, x = 200, offset = 90) => {
    if (!node) return [];
    const edges = [];
    const y = 40 + depth * 55;

    if (node.left) {
      edges.push({ x1: x, y1: y, x2: x - offset, y2: 40 + (depth + 1) * 55 });
      edges.push(...getEdges(node.left, depth + 1, x - offset, offset / 1.8));
    }
    if (node.right) {
      edges.push({ x1: x, y1: y, x2: x + offset, y2: 40 + (depth + 1) * 55 });
      edges.push(...getEdges(node.right, depth + 1, x + offset, offset / 1.8));
    }
    return edges;
  };

  const renderedNodes = layoutNodes(tree);
  const renderedEdges = getEdges(tree);

  return (
    <div className={cn('bg-[#0B1020] rounded-xl border border-brand-border p-6 flex flex-col justify-between min-h-[360px] select-none relative', className)}>
      {/* Header Info */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-brand-primary" />
          <span className="text-white font-bold">Binary Search Tree (BST) Canvas</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Total Nodes: <strong className="text-cyan-400">{renderedNodes.length}</strong></span>
          {tree && (
            <span>ROOT: <strong className="text-brand-accent">[{tree.key}]</strong></span>
          )}
        </div>
      </div>

      {/* Main SVG Tree Canvas */}
      <div className="w-full h-64 flex items-center justify-center my-4">
        {renderedNodes.length > 0 ? (
          <svg className="w-full h-full" viewBox="0 0 400 240">
            {/* Draw Branches */}
            {renderedEdges.map((edge, i) => (
              <line
                key={i}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}

            {/* Draw Nodes */}
            {renderedNodes.map((n) => {
              const isMatch = activeKey === n.key && highlightAction === 'search_match';
              const isMinMax = activeKey === n.key && (highlightAction === 'min' || highlightAction === 'max');
              const isVisited = traversalOrder.includes(n.key);
              const isInserted = activeKey === n.key && highlightAction === 'insert';

              return (
                <g key={n.key} className="transition-all duration-300">
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="18"
                    className={cn(
                      'transition-colors duration-300',
                      isMatch
                        ? 'fill-emerald-500 stroke-emerald-300 stroke-2 ring-4'
                        : isMinMax
                        ? 'fill-amber-500 stroke-amber-200 stroke-2'
                        : isInserted
                        ? 'fill-brand-accent stroke-cyan-200 stroke-2'
                        : isVisited
                        ? 'fill-indigo-600 stroke-indigo-400 stroke-2'
                        : 'fill-brand-card stroke-brand-primary stroke-2'
                    )}
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    fill="#FFFFFF"
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {n.key}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="text-center text-xs font-mono text-slate-500 italic">
            Tree is empty. Insert nodes to begin building the BST.
          </div>
        )}
      </div>

      {/* Traversal Order / Inspection Bar */}
      <div className="pt-3 border-t border-brand-border/60 flex flex-wrap items-center justify-between text-xs font-mono text-brand-muted">
        <div className="flex items-center gap-2">
          <span>Active Traversal Order:</span>
          {traversalOrder.length > 0 ? (
            <span className="text-brand-accent font-bold">
              [ {traversalOrder.join(' ➔ ')} ]
            </span>
          ) : (
            <span className="text-slate-600">None</span>
          )}
        </div>
        <div className="text-[11px] text-cyan-400">
          Invariants: Left &lt; Root &lt; Right
        </div>
      </div>
    </div>
  );
}
