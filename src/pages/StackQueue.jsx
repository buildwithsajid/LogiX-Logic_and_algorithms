import React, { useState } from 'react';
import { Layers, ArrowRight, ArrowDown, ArrowUp, RefreshCw, Terminal, Eye, Plus, Trash2, Sliders, ShieldAlert } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import ComplexityBadge from '../components/common/ComplexityBadge';
import CodeEditor from '../components/common/CodeEditor';
import StackVisualizer from '../visualizers/StackVisualizer';
import QueueVisualizer from '../visualizers/QueueVisualizer';
import { ARRAY_STACK_JAVA } from '../java/stacks/arrayStack.java.js';
import { LINKED_STACK_JAVA } from '../java/stacks/linkedStack.java.js';
import { ORDINARY_QUEUE_JAVA } from '../java/queues/ordinaryQueue.java.js';
import { CIRCULAR_QUEUE_JAVA } from '../java/queues/circularQueue.java.js';
import { LINKED_QUEUE_JAVA } from '../java/queues/linkedQueue.java.js';
import { DEQUE_JAVA } from '../java/queues/deque.java.js';
import { PRIORITY_QUEUE_JAVA } from '../java/queues/priorityQueue.java.js';

export default function StackQueue() {
  const modes = [
    { id: 'array-stack', name: 'Stack (Array / LIFO)', type: 'stack', time: 'O(1)', space: 'O(n)', desc: 'Fixed-capacity Last-In First-Out structure with top pointer.' },
    { id: 'linked-stack', name: 'Stack (Linked List)', type: 'stack', time: 'O(1)', space: 'O(n)', desc: 'Dynamic LIFO stack without capacity bounds using head node pointer.' },
    { id: 'ordinary-queue', name: 'Ordinary Queue (FIFO)', type: 'queue', time: 'O(1)', space: 'O(n)', desc: 'First-In First-Out linear buffer with front and rear pointers.' },
    { id: 'circular-queue', name: 'Circular Queue (Ring Buffer)', type: 'circular-queue', time: 'O(1)', space: 'O(n)', desc: 'Ring buffer utilizing modulo arithmetic to prevent memory drift.' },
    { id: 'deque', name: 'Double-Ended Queue (Deque)', type: 'deque', time: 'O(1)', space: 'O(n)', desc: 'Supports insertions and deletions at both Front and Rear ends.' },
    { id: 'priority-queue', name: 'Priority Queue', type: 'priority-queue', time: 'O(n) Insert / O(1) Pop', space: 'O(n)', desc: 'Elements dequeued strictly according to priority rank (1 = Highest).' }
  ];

  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [inputValue, setInputValue] = useState('');
  const [priorityVal, setPriorityVal] = useState('1');
  const [statusMsg, setStatusMsg] = useState('Select an operation to begin.');
  const [activeJavaLine, setActiveJavaLine] = useState(null);

  // Stack State
  const [stackItems, setStackItems] = useState([10, 20, 30]);
  const [stackAction, setStackAction] = useState('idle');

  // Queue State
  const [queueCapacity] = useState(6);
  const [queueItems, setQueueItems] = useState([10, 20, 30, null, null, null]);
  const [queueFront, setQueueFront] = useState(0);
  const [queueRear, setQueueRear] = useState(2);
  const [queueCount, setQueueCount] = useState(3);
  const [queueAction, setQueueAction] = useState('idle');

  // Priority Queue State (Array of { data, priority })
  const [pqItems, setPqItems] = useState([
    { data: 99, priority: 1 },
    { data: 45, priority: 2 },
    { data: 12, priority: 3 }
  ]);

  // Stack Operations
  const handlePush = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    const isLinked = selectedMode.id === 'linked-stack';

    if (!isLinked && stackItems.length >= 6) {
      setStackAction('overflow');
      setActiveJavaLine(ARRAY_STACK_JAVA.lineMap.CHECK_OVERFLOW);
      setStatusMsg(`Stack Overflow! Capacity of 6 reached. Cannot push ${val}.`);
      return;
    }

    const newItems = [...stackItems, val];
    setStackItems(newItems);
    setInputValue('');
    setStackAction('push');
    setActiveJavaLine(isLinked ? LINKED_STACK_JAVA.lineMap.PUSH_UPDATE_TOP : ARRAY_STACK_JAVA.lineMap.EXEC_PUSH);
    setStatusMsg(`Pushed ${val} onto top of stack at index [${newItems.length - 1}].`);
  };

  const handlePop = () => {
    if (stackItems.length === 0) {
      setStackAction('underflow');
      setActiveJavaLine(selectedMode.id === 'linked-stack' ? LINKED_STACK_JAVA.lineMap.POP_CHECK : ARRAY_STACK_JAVA.lineMap.CHECK_UNDERFLOW);
      setStatusMsg('Stack Underflow! Cannot pop from an empty stack.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setStackAction('pop');
    setActiveJavaLine(selectedMode.id === 'linked-stack' ? LINKED_STACK_JAVA.lineMap.POP_UNLINK : ARRAY_STACK_JAVA.lineMap.EXEC_POP);
    setStatusMsg(`Popped top element ${popped} from the stack.`);
  };

  const handlePeek = () => {
    if (stackItems.length === 0) {
      setStackAction('underflow');
      setStatusMsg('Stack is empty. Peek returned null.');
      return;
    }
    const topVal = stackItems[stackItems.length - 1];
    setStackAction('peek');
    setActiveJavaLine(ARRAY_STACK_JAVA.lineMap.PEEK);
    setStatusMsg(`Peek inspected top element: ${topVal} at index [${stackItems.length - 1}].`);
  };

  // Queue Operations
  const handleEnqueue = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;

    if (selectedMode.id === 'circular-queue') {
      if (queueCount >= queueCapacity) {
        setQueueAction('overflow');
        setActiveJavaLine(CIRCULAR_QUEUE_JAVA.lineMap.ENQUEUE_CHECK);
        setStatusMsg(`Circular Queue Overflow! Cannot enqueue ${val}.`);
        return;
      }
      const newRear = (queueRear + 1) % queueCapacity;
      const newBuf = [...queueItems];
      newBuf[newRear] = val;
      setQueueItems(newBuf);
      setQueueRear(newRear);
      setQueueCount(queueCount + 1);
      setInputValue('');
      setQueueAction('enqueue');
      setActiveJavaLine(CIRCULAR_QUEUE_JAVA.lineMap.ENQUEUE_STORE);
      setStatusMsg(`Enqueued ${val} at circular rear index [${newRear}]. Modulo wrap-around applied.`);
    } else {
      if (queueRear >= queueCapacity - 1) {
        setQueueAction('overflow');
        setActiveJavaLine(ORDINARY_QUEUE_JAVA.lineMap.ENQUEUE_CHECK);
        setStatusMsg(`Ordinary Queue Overflow! Rear pointer at boundary [${queueRear}].`);
        return;
      }
      const newRear = queueRear + 1;
      const newBuf = [...queueItems];
      newBuf[newRear] = val;
      setQueueItems(newBuf);
      setQueueRear(newRear);
      setQueueCount(queueCount + 1);
      setInputValue('');
      setQueueAction('enqueue');
      setActiveJavaLine(ORDINARY_QUEUE_JAVA.lineMap.ENQUEUE_EXEC);
      setStatusMsg(`Enqueued ${val} at rear index [${newRear}].`);
    }
  };

  const handleDequeue = () => {
    if (selectedMode.id === 'circular-queue') {
      if (queueCount === 0) {
        setQueueAction('underflow');
        setActiveJavaLine(CIRCULAR_QUEUE_JAVA.lineMap.DEQUEUE_CHECK);
        setStatusMsg('Circular Queue Underflow! Cannot dequeue from empty queue.');
        return;
      }
      const item = queueItems[queueFront];
      const newBuf = [...queueItems];
      newBuf[queueFront] = null;
      setQueueItems(newBuf);
      setQueueFront((queueFront + 1) % queueCapacity);
      setQueueCount(queueCount - 1);
      setQueueAction('dequeue');
      setActiveJavaLine(CIRCULAR_QUEUE_JAVA.lineMap.DEQUEUE_MODULO);
      setStatusMsg(`Dequeued element ${item} from front index [${queueFront}].`);
    } else {
      if (queueFront > queueRear || queueCount === 0) {
        setQueueAction('underflow');
        setActiveJavaLine(ORDINARY_QUEUE_JAVA.lineMap.DEQUEUE_CHECK);
        setStatusMsg('Ordinary Queue Underflow! Queue is completely empty.');
        return;
      }
      const item = queueItems[queueFront];
      const newBuf = [...queueItems];
      newBuf[queueFront] = null;
      setQueueItems(newBuf);
      setQueueFront(queueFront + 1);
      setQueueCount(queueCount - 1);
      setQueueAction('dequeue');
      setActiveJavaLine(ORDINARY_QUEUE_JAVA.lineMap.DEQUEUE_EXEC);
      setStatusMsg(`Dequeued element ${item} from front index [${queueFront}].`);
    }
  };

  // Priority Queue Operations
  const handleEnqueuePQ = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    const p = parseInt(priorityVal, 10) || 1;
    if (pqItems.length >= 6) {
      setStatusMsg('Priority Queue visual capacity of 6 reached.');
      return;
    }
    const updated = [...pqItems, { data: val, priority: p }].sort((a, b) => a.priority - b.priority);
    setPqItems(updated);
    setInputValue('');
    setActiveJavaLine(PRIORITY_QUEUE_JAVA.lineMap.ENQUEUE_INSERT);
    setStatusMsg(`Enqueued element ${val} with Priority P${p}. Sorted into correct priority order.`);
  };

  const handleDequeuePQ = () => {
    if (pqItems.length === 0) {
      setStatusMsg('Priority Queue Underflow! Queue is empty.');
      return;
    }
    const item = pqItems[0];
    setPqItems(pqItems.slice(1));
    setActiveJavaLine(PRIORITY_QUEUE_JAVA.lineMap.DEQUEUE_REMOVE);
    setStatusMsg(`Dequeued highest priority element ${item.data} (Priority P${item.priority}).`);
  };

  // Deque Operations
  const handleInsertFrontDeque = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    if (queueCount >= queueCapacity) {
      setStatusMsg('Deque Overflow! Capacity reached.');
      return;
    }
    const newBuf = [val, ...queueItems.slice(0, queueCapacity - 1)];
    setQueueItems(newBuf);
    setQueueCount(queueCount + 1);
    setInputValue('');
    setActiveJavaLine(DEQUE_JAVA.lineMap.INSERT_FRONT);
    setStatusMsg(`Inserted ${val} at FRONT of Deque.`);
  };

  const handleInsertRearDeque = () => {
    const val = inputValue.trim() ? parseInt(inputValue, 10) : Math.floor(Math.random() * 85) + 10;
    if (queueCount >= queueCapacity) {
      setStatusMsg('Deque Overflow! Capacity reached.');
      return;
    }
    const newBuf = [...queueItems];
    newBuf[queueCount] = val;
    setQueueItems(newBuf);
    setQueueCount(queueCount + 1);
    setInputValue('');
    setActiveJavaLine(DEQUE_JAVA.lineMap.INSERT_REAR);
    setStatusMsg(`Inserted ${val} at REAR of Deque.`);
  };

  const handleDeleteFrontDeque = () => {
    if (queueCount === 0) {
      setStatusMsg('Deque Underflow! Cannot delete from empty deque.');
      return;
    }
    const item = queueItems[0];
    const newBuf = [...queueItems.slice(1), null];
    setQueueItems(newBuf);
    setQueueCount(queueCount - 1);
    setActiveJavaLine(DEQUE_JAVA.lineMap.DELETE_FRONT);
    setStatusMsg(`Deleted ${item} from FRONT of Deque.`);
  };

  const handleDeleteRearDeque = () => {
    if (queueCount === 0) {
      setStatusMsg('Deque Underflow! Cannot delete from empty deque.');
      return;
    }
    const item = queueItems[queueCount - 1];
    const newBuf = [...queueItems];
    newBuf[queueCount - 1] = null;
    setQueueItems(newBuf);
    setQueueCount(queueCount - 1);
    setActiveJavaLine(DEQUE_JAVA.lineMap.DELETE_REAR);
    setStatusMsg(`Deleted ${item} from REAR of Deque.`);
  };

  const handleReset = () => {
    setStackItems([10, 20, 30]);
    setQueueItems([10, 20, 30, null, null, null]);
    setQueueFront(0);
    setQueueRear(2);
    setQueueCount(3);
    setPqItems([
      { data: 99, priority: 1 },
      { data: 45, priority: 2 },
      { data: 12, priority: 3 }
    ]);
    setActiveJavaLine(null);
    setStatusMsg('Data structure reset to initial elements.');
  };

  // Determine active Java reference
  const activeJavaRef =
    selectedMode.id === 'linked-stack'
      ? LINKED_STACK_JAVA
      : selectedMode.id === 'circular-queue'
      ? CIRCULAR_QUEUE_JAVA
      : selectedMode.id === 'deque'
      ? DEQUE_JAVA
      : selectedMode.id === 'priority-queue'
      ? PRIORITY_QUEUE_JAVA
      : selectedMode.type === 'stack'
      ? ARRAY_STACK_JAVA
      : ORDINARY_QUEUE_JAVA;

  return (
    <PageContainer
      title="Stacks & Queues Lab"
      subtitle="Interactive LIFO and FIFO memory structures, pointer movements, and real-time overflow/underflow handling."
      
    >
      {/* Structure Mode Selector Tabs */}
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

            {/* Visualizer Canvas based on Mode */}
            {selectedMode.type === 'stack' ? (
              <StackVisualizer
                items={stackItems}
                capacity={selectedMode.id === 'linked-stack' ? 8 : 6}
                highlightIndex={stackItems.length - 1}
                highlightAction={stackAction}
              />
            ) : selectedMode.type === 'priority-queue' ? (
              <div className="bg-[#0B1020] rounded-xl border border-brand-border p-6 min-h-[360px] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between text-xs font-mono text-brand-muted border-b border-brand-border/60 pb-3">
                  <span className="font-bold text-white">Priority Queue (Min-Priority at Head)</span>
                  <span className="text-emerald-400">{pqItems.length} Waiting</span>
                </div>

                <div className="space-y-2.5 my-4">
                  {pqItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between font-mono transition-all ${
                        idx === 0
                          ? 'bg-rose-950/30 border-rose-500/60 text-white shadow-glow-primary'
                          : 'bg-brand-card border-brand-border text-brand-text'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          item.priority === 1 ? 'bg-rose-500 text-white' :
                          item.priority === 2 ? 'bg-amber-500 text-slate-950' :
                          'bg-blue-500 text-white'
                        }`}>
                          P{item.priority}
                        </span>
                        <div>
                          <span className="text-base font-bold text-white">{item.data}</span>
                          <span className="text-[10px] text-slate-500 ml-2">Slot [{idx}]</span>
                        </div>
                      </div>

                      {idx === 0 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          Next Dequeued (HEAD)
                        </span>
                      )}
                    </div>
                  ))}

                  {pqItems.length === 0 && (
                    <div className="text-center py-12 text-slate-500 font-mono text-xs">
                      Priority Queue is empty.
                    </div>
                  )}
                </div>

                <div className="text-xs font-mono text-brand-muted pt-2 border-t border-brand-border/60">
                  Higher priority (P1) preempts lower priority (P2, P3) regardless of insertion timestamp.
                </div>
              </div>
            ) : (
              <QueueVisualizer
                items={queueItems}
                capacity={queueCapacity}
                front={queueFront}
                rear={queueRear}
                count={queueCount}
                isCircular={selectedMode.id === 'circular-queue'}
                highlightAction={queueAction}
              />
            )}

            {/* Interactive Operations Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-brand-border/60">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  placeholder="Value..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-20 px-2.5 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white text-center focus:outline-none focus:border-brand-primary"
                />

                {selectedMode.type === 'stack' ? (
                  <>
                    <Button variant="primary" size="sm" onClick={handlePush} icon={Plus}>
                      Push()
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handlePop} icon={Trash2}>
                      Pop()
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePeek} icon={Eye}>
                      Peek()
                    </Button>
                  </>
                ) : selectedMode.type === 'priority-queue' ? (
                  <>
                    <select
                      value={priorityVal}
                      onChange={(e) => setPriorityVal(e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-mono text-white focus:outline-none"
                    >
                      <option value="1">P1 (Critical)</option>
                      <option value="2">P2 (Normal)</option>
                      <option value="3">P3 (Low)</option>
                    </select>
                    <Button variant="primary" size="sm" onClick={handleEnqueuePQ} icon={Plus}>
                      Enqueue(val, P)
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleDequeuePQ} icon={Trash2}>
                      Dequeue()
                    </Button>
                  </>
                ) : selectedMode.id === 'deque' ? (
                  <>
                    <Button variant="primary" size="sm" onClick={handleInsertFrontDeque}>
                      Insert Front
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleInsertRearDeque}>
                      Insert Rear
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDeleteFrontDeque}>
                      Delete Front
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDeleteRearDeque}>
                      Delete Rear
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" size="sm" onClick={handleEnqueue} icon={Plus}>
                      Enqueue()
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleDequeue} icon={Trash2}>
                      Dequeue()
                    </Button>
                  </>
                )}
              </div>

              <Button variant="ghost" size="sm" onClick={handleReset} icon={RefreshCw}>
                Reset
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
                subtitle="Authentic Java implementation with boundary checks"
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
                  <span>State to Java Mapping</span>
                </div>
                {activeJavaLine && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
                    Line {activeJavaLine}
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                Notice how operations directly trigger the corresponding Java logic statements above.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
