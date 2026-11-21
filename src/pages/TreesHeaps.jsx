import React, { useState } from 'react';
import { Network, Plus, Trash2, Search, ArrowDownUp, RefreshCw, Terminal, Eye, Layers, ArrowDown, ArrowUp } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import CodeEditor from '../components/common/CodeEditor';
import TreeVisualizer from '../visualizers/TreeVisualizer';
import HeapVisualizer from '../visualizers/HeapVisualizer';
import { BST_JAVA } from '../java/trees/binarySearchTree.java.js';
import { HEAP_JAVA } from '../java/heaps/minMaxHeap.java.js';

export default function TreesHeaps() {
  const modes = [
    { id: 'bst', name: 'Binary Search Tree (BST)', category: 'Trees', time: 'O(log n) Avg', space: 'O(h)', desc: 'Hierarchical node tree maintaining invariant: left < parent < right.' },
    { id: 'min-heap', name: 'Binary Min-Heap', category: 'Heaps', time: 'O(log n) Push/Pop', space: 'O(n)', desc: 'Complete binary tree where parent is less than or equal to children with Reheap Up/Down.' },
    { id: 'max-heap', name: 'Binary Max-Heap', category: 'Heaps', time: 'O(log n) Push/Pop', space: 'O(n)', desc: 'Complete binary tree where parent is greater than or equal to children with Reheap Up/Down.' }
  ];

  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [inputValue, setInputValue] = useState('');
  const [statusMsg, setStatusMsg] = useState('Select an operation to modify or traverse the structure.');
  const [activeJavaLine, setActiveJavaLine] = useState(null);

  // BST Tree State (Linked Node Object)
  const initialBST = {
    key: 50,
    left: {
      key: 30,
      left: { key: 20, left: null, right: null },
      right: { key: 40, left: null, right: null }
    },
    right: {
      key: 70,
      left: { key: 60, left: null, right: null },
      right: { key: 80, left: null, right: null }
    }
  };

  const [bstRoot, setBstRoot] = useState(initialBST);
  const [activeKey, setActiveKey] = useState(null);
  const [highlightAction, setHighlightAction] = useState('idle');
  const [traversalOrder, setTraversalOrder] = useState([]);

  // Heap State (Array of numbers)
  const [minHeap, setMinHeap] = useState([10, 20, 30, 40, 50, 60]);
  const [maxHeap, setMaxHeap] = useState([90, 80, 70, 40, 30, 20]);
  const [heapHighlight, setHeapHighlight] = useState([]);

  // BST Insert Helper
  const insertNode = (root, key) => {
    if (!root) return { key, left: null, right: null };
    if (key < root.key) return { ...root, left: insertNode(root.left, key) };
    if (key > root.key) return { ...root, right: insertNode(root.right, key) };
    return root; // Duplicate ignored
  };

  // BST Delete Helper
  const deleteNode = (root, key) => {
    if (!root) return null;
    if (key < root.key) return { ...root, left: deleteNode(root.left, key) };
    if (key > root.key) return { ...root, right: deleteNode(root.right, key) };

    // Node to delete found:
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node with 2 children: find inorder successor (min in right subtree)
    let curr = root.right;
    while (curr.left) curr = curr.left;
    const successorKey = curr.key;
    return {
      ...root,
      key: successorKey,
      right: deleteNode(root.right, successorKey)
    };
  };

  // BST Operations Handlers
  const handleBstInsert = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    const newRoot = insertNode(bstRoot, val);
    setBstRoot(newRoot);
    setInputValue('');
    setActiveKey(val);
    setHighlightAction('insert');
    setActiveJavaLine(val < (bstRoot?.key || 0) ? BST_JAVA.lineMap.INSERT_LEFT : BST_JAVA.lineMap.INSERT_RIGHT);
    setStatusMsg(`Inserted key ${val} into BST maintaining binary search invariant.`);
  };

  const handleBstDelete = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : 30;
    const newRoot = deleteNode(bstRoot, val);
    setBstRoot(newRoot);
    setInputValue('');
    setActiveKey(null);
    setHighlightAction('idle');
    setStatusMsg(`Deleted node ${val} from BST.`);
  };

  const handleBstSearch = () => {
    const target = inputValue.trim() ? parseInt(inputValue, 10) : 40;
    let curr = bstRoot;
    let found = false;
    while (curr) {
      if (curr.key === target) { found = true; break; }
      curr = target < curr.key ? curr.left : curr.right;
    }

    if (found) {
      setActiveKey(target);
      setHighlightAction('search_match');
      setActiveJavaLine(BST_JAVA.lineMap.SEARCH_FOUND);
      setStatusMsg(`Key ${target} found in BST in logarithmic search path!`);
    } else {
      setActiveKey(null);
      setHighlightAction('idle');
      setActiveJavaLine(BST_JAVA.lineMap.SEARCH_RECURSE);
      setStatusMsg(`Key ${target} does not exist in the BST.`);
    }
  };

  const handleFindMin = () => {
    if (!bstRoot) return;
    let curr = bstRoot;
    while (curr.left) curr = curr.left;
    setActiveKey(curr.key);
    setHighlightAction('min');
    setActiveJavaLine(BST_JAVA.lineMap.FIND_MIN);
    setStatusMsg(`Smallest node in BST is ${curr.key} (leftmost leaf node).`);
  };

  const handleFindMax = () => {
    if (!bstRoot) return;
    let curr = bstRoot;
    while (curr.right) curr = curr.right;
    setActiveKey(curr.key);
    setHighlightAction('max');
    setActiveJavaLine(BST_JAVA.lineMap.FIND_MAX);
    setStatusMsg(`Largest node in BST is ${curr.key} (rightmost leaf node).`);
  };

  const handleInorder = () => {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.key);
      traverse(node.right);
    };
    traverse(bstRoot);
    setTraversalOrder(result);
    setActiveJavaLine(BST_JAVA.lineMap.INORDER);
    setStatusMsg(`Inorder Traversal (Left-Root-Right): yields sorted order [ ${result.join(', ')} ].`);
  };

  const handlePreorder = () => {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push(node.key);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(bstRoot);
    setTraversalOrder(result);
    setActiveJavaLine(BST_JAVA.lineMap.PREORDER);
    setStatusMsg(`Preorder Traversal (Root-Left-Right): [ ${result.join(', ')} ].`);
  };

  const handlePostorder = () => {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.key);
    };
    traverse(bstRoot);
    setTraversalOrder(result);
    setActiveJavaLine(BST_JAVA.lineMap.POSTORDER);
    setStatusMsg(`Postorder Traversal (Left-Right-Root): [ ${result.join(', ')} ].`);
  };

  // Heap Operations (Min / Max)
  const isMin = selectedMode.id === 'min-heap';
  const currentHeap = isMin ? minHeap : maxHeap;

  const handleHeapInsert = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    if (currentHeap.length >= 7) {
      setStatusMsg('Heap display limit of 7 elements reached.');
      return;
    }
    const h = [...currentHeap, val];
    let i = h.length - 1;

    // Reheap Up
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      const violates = isMin ? h[i] < h[p] : h[i] > h[p];
      if (violates) {
        const temp = h[i];
        h[i] = h[p];
        h[p] = temp;
        i = p;
      } else break;
    }

    if (isMin) setMinHeap(h);
    else setMaxHeap(h);

    setInputValue('');
    setHeapHighlight([i]);
    setActiveJavaLine(HEAP_JAVA.lineMap.REHEAP_UP_SWAP);
    setStatusMsg(`Inserted ${val} and executed Reheap Up to restore heap invariant.`);
  };

  const handleHeapExtract = () => {
    if (currentHeap.length === 0) {
      setStatusMsg('Heap is empty.');
      return;
    }
    const rootVal = currentHeap[0];
    const h = [...currentHeap];
    const last = h.pop();

    if (h.length > 0) {
      h[0] = last;
      let i = 0;

      // Reheap Down
      while (2 * i + 1 < h.length) {
        let target = 2 * i + 1;
        const right = 2 * i + 2;
        if (right < h.length) {
          const preferRight = isMin ? h[right] < h[target] : h[right] > h[target];
          if (preferRight) target = right;
        }
        const violates = isMin ? h[target] < h[i] : h[target] > h[i];
        if (violates) {
          const temp = h[i];
          h[i] = h[target];
          h[target] = temp;
          i = target;
        } else break;
      }
    }

    if (isMin) setMinHeap(h);
    else setMaxHeap(h);

    setHeapHighlight([0]);
    setActiveJavaLine(HEAP_JAVA.lineMap.REHEAP_DOWN_SWAP);
    setStatusMsg(`Extracted root element ${rootVal} and executed Reheap Down sink.`);
  };

  const handleReset = () => {
    if (selectedMode.id === 'bst') {
      setBstRoot(initialBST);
      setActiveKey(null);
      setTraversalOrder([]);
      setActiveJavaLine(null);
      setStatusMsg('BST reset to default tree.');
    } else {
      setMinHeap([10, 20, 30, 40, 50, 60]);
      setMaxHeap([90, 80, 70, 40, 30, 20]);
      setHeapHighlight([]);
      setActiveJavaLine(null);
      setStatusMsg('Heap reset to default elements.');
    }
  };

  const activeJavaRef = selectedMode.id === 'bst' ? BST_JAVA : HEAP_JAVA;

  return (
    <PageContainer
      title="Trees & Heaps Lab"
      subtitle="Binary Search Tree properties, Inorder/Preorder/Postorder traversals, and Binary Min/Max Heaps with Reheap Up/Down."
      badge="Phase 4 Complete"
    >
      {/* Mode Pills */}
      <div className="flex flex-wrap gap-2 pb-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedMode(m);
              setActiveJavaLine(null);
              setStatusMsg(`Switched to ${m.name}.`);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all select-none border ${
              selectedMode.id === m.id
                ? 'bg-brand-primary/20 text-brand-accent border-brand-accent shadow-sm'
                : 'bg-brand-card hover:bg-brand-cardHover text-brand-muted border-brand-border'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="bg-brand-card/90">
            <CardHeader
              title={selectedMode.name}
              subtitle={selectedMode.desc}
              badge={<ComplexityBadge complexity={selectedMode.time} label="Time" />}
              action={<ComplexityBadge complexity={selectedMode.space} label="Space" />}
            />

            {/* Tree Canvas */}
            {selectedMode.id === 'bst' ? (
              <TreeVisualizer
                tree={bstRoot}
                activeKey={activeKey}
                highlightAction={highlightAction}
                traversalOrder={traversalOrder}
              />
            ) : (
              <HeapVisualizer
                heap={currentHeap}
                isMinHeap={isMin}
                highlightIndices={heapHighlight}
              />
            )}

            {/* Interactive Operations Bar */}
            {selectedMode.id === 'bst' ? (
              <div className="space-y-3 mt-4 pt-4 border-t border-brand-border/60">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Key..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-primary"
                    />
                    <Button variant="primary" size="sm" onClick={handleBstInsert} icon={Plus}>
                      Insert
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleBstSearch} icon={Search}>
                      Search
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleBstDelete} icon={Trash2}>
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleFindMin}>
                      Find Min
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleFindMax}>
                      Find Max
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-brand-muted">Traversals:</span>
                    <Button variant="secondary" size="sm" onClick={handleInorder}>
                      Inorder
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handlePreorder}>
                      Preorder
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handlePostorder}>
                      Postorder
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" onClick={handleReset} icon={RefreshCw}>
                    Reset Tree
                  </Button>
                </div>
              </div>
            ) : (
              /* Heap Operations Bar */
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-brand-border/60">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Val..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-20 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-primary"
                  />
                  <Button variant="primary" size="sm" onClick={handleHeapInsert} icon={Plus}>
                    Insert (Reheap Up)
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleHeapExtract} icon={Trash2}>
                    Extract Root (Reheap Down)
                  </Button>
                </div>

                <Button variant="ghost" size="sm" onClick={handleReset} icon={RefreshCw}>
                  Reset Heap
                </Button>
              </div>
            )}

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
                subtitle="Authentic textbook Java implementation"
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
                  <span>Recursive Invariant Sync</span>
                </div>
                {activeJavaLine && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
                    Line {activeJavaLine}
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                When you trigger a traversal or heap insertion, notice how the code editor jumps to highlight the exact Java recursive method or reheaping loop.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
