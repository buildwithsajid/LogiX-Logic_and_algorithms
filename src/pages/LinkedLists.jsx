import React, { useState } from 'react';
import { GitCommit, ArrowRight, ArrowLeft, RefreshCw, Plus, Trash2, Search, RotateCcw, Terminal, Compass } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import CodeEditor from '../components/common/CodeEditor';
import LinkedListVisualizer from '../visualizers/LinkedListVisualizer';
import { SINGLY_LINKED_LIST_JAVA } from '../java/linkedLists/singlyLinkedList.java.js';
import { DOUBLY_LINKED_LIST_JAVA } from '../java/linkedLists/doublyLinkedList.java.js';
import { CIRCULAR_LINKED_LIST_JAVA } from '../java/linkedLists/circularLinkedList.java.js';
import { POLYNOMIAL_ADDITION_JAVA } from '../java/linkedLists/polynomialAddition.java.js';

export default function LinkedLists() {
  const modes = [
    { id: 'singly-ll', name: 'Singly Linked List', time: 'O(n) Traversal', space: 'O(1)', desc: 'Nodes contain integer data and a pointer link to the subsequent node.' },
    { id: 'doubly-ll', name: 'Doubly Linked List', time: 'O(1) Ends', space: 'O(1)', desc: 'Bi-directional pointer links supporting forward and backward traversals.' },
    { id: 'circular-ll', name: 'Circular Linked List', time: 'O(n) Loop', space: 'O(1)', desc: 'Tail node pointer links directly back to the head node, forming an infinite loop.' },
    { id: 'polynomial-addition', name: 'Polynomial Addition', time: 'O(m + n)', space: 'O(m + n)', desc: 'Adds two polynomials stored as linked lists by matching like exponent terms.' }
  ];

  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [nodes, setNodes] = useState([15, 28, 42, 60]);
  const [inputValue, setInputValue] = useState('');
  const [searchTarget, setSearchTarget] = useState('');
  const [searchIndex, setSearchIndex] = useState(null);
  const [activeNodeIndex, setActiveNodeIndex] = useState(null);
  const [statusMsg, setStatusMsg] = useState('Select an operation to modify or traverse the linked list.');
  const [activeJavaLine, setActiveJavaLine] = useState(null);

  // Polynomial Addition dataset
  const [polyData, setPolyData] = useState({
    p1: [{ coeff: 5, exp: 3 }, { coeff: 4, exp: 2 }, { coeff: 2, exp: 0 }],
    p2: [{ coeff: 3, exp: 3 }, { coeff: 2, exp: 1 }, { coeff: 1, exp: 0 }],
    result: [{ coeff: 8, exp: 3 }, { coeff: 4, exp: 2 }, { coeff: 2, exp: 1 }, { coeff: 3, exp: 0 }]
  });

  // Insert at Tail
  const handleInsertTail = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    if (nodes.length >= 7) {
      setStatusMsg('Maximum limit of 7 nodes reached for clear visualization.');
      return;
    }
    const updated = [...nodes, val];
    setNodes(updated);
    setInputValue('');
    setActiveNodeIndex(updated.length - 1);
    setSearchIndex(null);
    setActiveJavaLine(
      selectedMode.id === 'singly-ll'
        ? SINGLY_LINKED_LIST_JAVA.lineMap.INSERT_LINK
        : selectedMode.id === 'doubly-ll'
        ? DOUBLY_LINKED_LIST_JAVA.lineMap.APPEND_LINK_NEXT
        : CIRCULAR_LINKED_LIST_JAVA.lineMap.INSERT_CLOSE_CYCLE
    );
    setStatusMsg(`Created new Node(${val}) and linked it to the tail of the list.`);
  };

  // Insert at Head
  const handleInsertHead = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    if (nodes.length >= 7) {
      setStatusMsg('Maximum limit of 7 nodes reached for clear visualization.');
      return;
    }
    const updated = [val, ...nodes];
    setNodes(updated);
    setInputValue('');
    setActiveNodeIndex(0);
    setSearchIndex(null);
    setActiveJavaLine(SINGLY_LINKED_LIST_JAVA.lineMap.INSERT_HEAD);
    setStatusMsg(`Created new Node(${val}), set its next pointer to old HEAD, and updated HEAD.`);
  };

  // Delete Tail
  const handleDeleteTail = () => {
    if (nodes.length === 0) {
      setStatusMsg('Cannot delete: Linked list is empty.');
      return;
    }
    const removedVal = nodes[nodes.length - 1];
    setNodes(nodes.slice(0, -1));
    setActiveNodeIndex(null);
    setSearchIndex(null);
    setActiveJavaLine(SINGLY_LINKED_LIST_JAVA.lineMap.DELETE_UNLINK);
    setStatusMsg(`Traversed to end and unlinked tail node with data ${removedVal}.`);
  };

  // Delete Head
  const handleDeleteHead = () => {
    if (nodes.length === 0) {
      setStatusMsg('Cannot delete: Linked list is empty.');
      return;
    }
    const removedVal = nodes[0];
    setNodes(nodes.slice(1));
    setActiveNodeIndex(null);
    setSearchIndex(null);
    setActiveJavaLine(SINGLY_LINKED_LIST_JAVA.lineMap.DELETE_HEAD);
    setStatusMsg(`Unlinked head node (${removedVal}). New head points to previous head.next.`);
  };

  // Reverse Singly Linked List
  const handleReverse = () => {
    if (nodes.length < 2) {
      setStatusMsg('List has fewer than 2 nodes; reversal is trivial.');
      return;
    }
    const reversed = [...nodes].reverse();
    setNodes(reversed);
    setActiveNodeIndex(null);
    setSearchIndex(null);
    setActiveJavaLine(SINGLY_LINKED_LIST_JAVA.lineMap.REVERSE_STEP);
    setStatusMsg('Reversed all node pointers in-place: prev = curr; curr = next; head = prev.');
  };

  // Search Node
  const handleSearch = () => {
    const target = searchTarget.trim() ? parseInt(searchTarget, 10) : nodes[0];
    const foundIdx = nodes.indexOf(target);
    if (foundIdx !== -1) {
      setSearchIndex(foundIdx);
      setActiveNodeIndex(foundIdx);
      setActiveJavaLine(SINGLY_LINKED_LIST_JAVA.lineMap.DELETE_TRAVERSE);
      setStatusMsg(`Node with key ${target} found at index [${foundIdx}]!`);
    } else {
      setSearchIndex(null);
      setActiveNodeIndex(null);
      setStatusMsg(`Node with key ${target} does not exist in the linked list.`);
    }
  };

  // Reset
  const handleReset = () => {
    setNodes([15, 28, 42, 60]);
    setSearchIndex(null);
    setActiveNodeIndex(null);
    setActiveJavaLine(null);
    setStatusMsg('Linked list reset to default 4 nodes.');
  };

  // Active Java Reference Code
  const activeJavaRef =
    selectedMode.id === 'doubly-ll'
      ? DOUBLY_LINKED_LIST_JAVA
      : selectedMode.id === 'circular-ll'
      ? CIRCULAR_LINKED_LIST_JAVA
      : selectedMode.id === 'polynomial-addition'
      ? POLYNOMIAL_ADDITION_JAVA
      : SINGLY_LINKED_LIST_JAVA;

  return (
    <PageContainer
      title="Linked Lists & Pointer Structures"
      subtitle="Interactive node chains, pointer rewiring, bi-directional traversals, and polynomial arithmetic."
      badge="Phase 3 Ready"
    >
      {/* Structure Mode Pills */}
      <div className="flex flex-wrap gap-2 pb-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedMode(m);
              setActiveJavaLine(null);
              setSearchIndex(null);
              setActiveNodeIndex(null);
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

            {/* Visualizer Display Canvas */}
            <LinkedListVisualizer
              nodes={nodes}
              mode={selectedMode.id}
              activeNodeIndex={activeNodeIndex}
              searchIndex={searchIndex}
              polynomialData={selectedMode.id === 'polynomial-addition' ? polyData : null}
            />

            {/* Interactive Operations Bar */}
            {selectedMode.id !== 'polynomial-addition' ? (
              <div className="space-y-3 mt-4 pt-4 border-t border-brand-border/60">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Insertion controls */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Data..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-primary"
                    />
                    <Button variant="primary" size="sm" onClick={handleInsertTail} icon={Plus}>
                      Insert Tail
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleInsertHead}>
                      Insert Head
                    </Button>
                  </div>

                  {/* Deletion controls */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleDeleteTail} icon={Trash2}>
                      Delete Tail
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDeleteHead}>
                      Delete Head
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {/* Search and Reverse */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Target..."
                      value={searchTarget}
                      onChange={(e) => setSearchTarget(e.target.value)}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-accent"
                    />
                    <Button variant="accent" size="sm" onClick={handleSearch} icon={Search}>
                      Search Node
                    </Button>
                    {selectedMode.id === 'singly-ll' && (
                      <Button variant="secondary" size="sm" onClick={handleReverse} icon={RotateCcw}>
                        Reverse List
                      </Button>
                    )}
                  </div>

                  <Button variant="ghost" size="sm" onClick={handleReset} icon={RefreshCw}>
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-mono text-brand-muted">
                <span>Like exponent terms are summed: (5x³ + 3x³ = 8x³), (4x² + 0 = 4x²), (0 + 2x¹ = 2x¹).</span>
                <span className="text-emerald-400 font-bold">Linear Merge Scan O(m + n)</span>
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
                subtitle="Authentic textbook Java pointer manipulation"
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
                  <span>Pointer Rewiring Invariants</span>
                </div>
                {activeJavaLine && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
                    Line {activeJavaLine} Active
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                Watch how insertion, deletion, and reversal update references (`newNode.next = head`, `tail.next = head`). In Java, unreferenced nodes are automatically reclaimed by Garbage Collection.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
