import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps,
  generateLinearSearchSteps,
  generateBinarySearchSteps
} from '../index.js';

/**
 * Theoretical Asymptotic Big-O Growth Curves
 */
export const THEORETICAL_CLASSES = [
  { id: 'O(1)', label: 'O(1) - Constant', color: '#22C55E', fn: () => 1 },
  { id: 'O(log n)', label: 'O(log n) - Logarithmic', color: '#06B6D4', fn: (n) => Math.max(1, Math.round(Math.log2(n) * 10) / 10) },
  { id: 'O(n)', label: 'O(n) - Linear', color: '#3B82F6', fn: (n) => n },
  { id: 'O(n log n)', label: 'O(n log n) - Linearithmic', color: '#6366F1', fn: (n) => Math.round(n * Math.log2(n) * 10) / 10 },
  { id: 'O(n²)', label: 'O(n²) - Quadratic', color: '#F59E0B', fn: (n) => n * n },
  { id: 'O(n³)', label: 'O(n³) - Cubic', color: '#EC4899', fn: (n) => n * n * n },
  { id: 'O(2^n)', label: 'O(2ⁿ) - Exponential', color: '#EF4444', fn: (n) => Math.pow(2, Math.min(n, 20)) }
];

export function generateTheoreticalData(maxN = 64) {
  const points = [];
  // Sample sensible points from n=1 to maxN
  const sampleNs = [1, 2, 4, 8, 16, 24, 32, 48, 64];
  if (maxN > 64) {
    if (!sampleNs.includes(80)) sampleNs.push(80);
    if (!sampleNs.includes(100)) sampleNs.push(100);
  }

  const validNs = sampleNs.filter(n => n <= maxN);
  if (!validNs.includes(maxN)) validNs.push(maxN);
  validNs.sort((a, b) => a - b);

  for (const n of validNs) {
    points.push({
      n,
      'O(1)': 1,
      'O(log n)': Math.round(Math.log2(n) * 100) / 100,
      'O(n)': n,
      'O(n log n)': Math.round(n * Math.log2(n) * 10) / 10,
      'O(n²)': n * n,
      'O(n³)': n <= 32 ? n * n * n : null,
      'O(2^n)': n <= 16 ? Math.pow(2, n) : null
    });
  }

  return points;
}

/**
 * Master DSA Complexity Reference Directory
 */
export const DSA_COMPLEXITY_DIRECTORY = [
  // Sorting Algorithms
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    inPlace: 'Yes',
    stable: 'Yes',
    summary: 'Iteratively compares adjacent elements and swaps them if disordered. Adaptive with early termination flag.',
    pros: 'Minimal code complexity, O(n) best-case on already sorted arrays, stable.',
    cons: 'Excessive swaps and O(n²) quadratic comparisons make it unviable for large inputs.'
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    bestTime: 'O(n²)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    inPlace: 'Yes',
    stable: 'No',
    summary: 'Finds the minimum element from the unsorted sublist and moves it to the beginning in each pass.',
    pros: 'Guarantees at most O(n) total swaps (ideal when memory writes are extremely expensive).',
    cons: 'Always executes n(n-1)/2 comparisons regardless of input distribution. Unstable.'
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    inPlace: 'Yes',
    stable: 'Yes',
    summary: 'Builds the sorted array one element at a time by shifting larger items to the right.',
    pros: 'O(n) on nearly sorted data, negligible overhead on small lists (n < 16), stable, in-place.',
    cons: 'O(n²) worst-case shifts on reverse-ordered arrays.'
  },
  {
    id: 'shell-sort',
    name: 'Shell Sort (Diminishing Increment)',
    category: 'Sorting',
    bestTime: 'O(n log n)',
    avgTime: 'O(n^(3/2))',
    worstTime: 'O(n²)',
    space: 'O(1)',
    inPlace: 'Yes',
    stable: 'No',
    summary: 'Generalization of insertion sort using diminishing gaps (e.g. n/2, n/4, ... 1) to swap distant items.',
    pros: 'Breaks quadratic barrier without recursion, in-place with O(1) auxiliary space.',
    cons: 'Exact performance depends heavily on the gap sequence chosen; unstable.'
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort (Lomuto / Hoare)',
    category: 'Sorting',
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n²)',
    space: 'O(log n)',
    inPlace: 'Yes',
    stable: 'No',
    summary: 'Divide-and-conquer partitioning around a selected pivot element.',
    pros: 'Cache-friendly sequential memory access, fastest general in-memory comparison sort in practice.',
    cons: 'Degrades to O(n²) if pivot choices are consistently skewed (e.g. sorted input with last-element pivot).'
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort (LSD)',
    category: 'Sorting',
    bestTime: 'O(d · (n + k))',
    avgTime: 'O(d · (n + k))',
    worstTime: 'O(d · (n + k))',
    space: 'O(n + k)',
    inPlace: 'No',
    stable: 'Yes',
    summary: 'Non-comparative integer sort that groups digits from Least Significant to Most Significant using counting buckets.',
    pros: 'Beats O(n log n) comparison limit when key length d is small and bounded.',
    cons: 'Requires auxiliary bucket memory; restricted to fixed-width keys (integers, strings).'
  },

  // Searching Algorithms
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    bestTime: 'O(1)',
    avgTime: 'O(n)',
    worstTime: 'O(n)',
    space: 'O(1)',
    inPlace: 'Yes',
    stable: 'N/A',
    summary: 'Scans array sequentially from index 0 to n-1 until target is found or end is reached.',
    pros: 'Requires no prior ordering or preprocessing; works on arbitrary streams and linked lists.',
    cons: 'Inefficient for large arrays: O(n) scan time.'
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    bestTime: 'O(1)',
    avgTime: 'O(log n)',
    worstTime: 'O(log n)',
    space: 'O(1)',
    inPlace: 'Yes',
    stable: 'N/A',
    summary: 'Halves the search interval repeatedly in a monotonically ordered array.',
    pros: 'Exponentially fast: searching 1,000,000 items takes at most ~20 comparisons.',
    cons: 'Requires strictly sorted random-accessible data structure (not suitable for singly linked lists).'
  },

  // Linear Data Structures
  {
    id: 'array-ds',
    name: 'Dynamic Array',
    category: 'Linear DS',
    bestTime: 'O(1) Access',
    avgTime: 'O(1) Access, O(n) Insert/Delete',
    worstTime: 'O(n) Resize / Shift',
    space: 'O(n)',
    inPlace: 'Yes',
    stable: 'N/A',
    summary: 'Contiguous memory block providing instantaneous constant-time index arithmetic.',
    pros: 'O(1) random access, hardware cache locality.',
    cons: 'Resizing requires reallocation and copying; middle insertion requires O(n) shifting.'
  },
  {
    id: 'singly-linked-list',
    name: 'Singly Linked List',
    category: 'Linear DS',
    bestTime: 'O(1) Head Insert/Delete',
    avgTime: 'O(n) Search / Index Access',
    worstTime: 'O(n) Tail Delete (without tail ref)',
    space: 'O(n)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Chained nodes each carrying data and a single next reference.',
    pros: 'Dynamic size with zero reallocation waste; O(1) prepend and post-insert.',
    cons: 'No random access (sequential traversal required); pointer overhead per node.'
  },
  {
    id: 'doubly-linked-list',
    name: 'Doubly Linked List',
    category: 'Linear DS',
    bestTime: 'O(1) Head/Tail Insert/Delete',
    avgTime: 'O(n) Search',
    worstTime: 'O(n) Search',
    space: 'O(n)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Bidirectional nodes with prev and next pointers.',
    pros: 'Bidirectional traversal; O(1) node deletion given direct node reference.',
    cons: 'Double pointer overhead (prev + next) per node.'
  },
  {
    id: 'stack-ds',
    name: 'Stack (Array / Linked LIFO)',
    category: 'Linear DS',
    bestTime: 'O(1) Push / Pop / Peek',
    avgTime: 'O(1) Push / Pop / Peek',
    worstTime: 'O(n) Dynamic Array Resize',
    space: 'O(n)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Last-In First-Out container essential for recursion call stacks, parsing, and undo history.',
    pros: 'Strict O(1) Push and Pop operations, simple semantics.',
    cons: 'No arbitrary access to internal elements without popping.'
  },
  {
    id: 'queue-ds',
    name: 'Ordinary / Circular Queue (FIFO)',
    category: 'Linear DS',
    bestTime: 'O(1) Enqueue / Dequeue',
    avgTime: 'O(1) Enqueue / Dequeue',
    worstTime: 'O(1) Modulo Circular Buffer',
    space: 'O(n)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'First-In First-Out container implemented via circular ring buffer modulo pointers.',
    pros: 'Prevents false overflow via index wrapping ((rear + 1) % capacity).',
    cons: 'Fixed capacity in static arrays; requires dynamic resize policy.'
  },
  {
    id: 'deque-ds',
    name: 'Double-Ended Queue (Deque)',
    category: 'Linear DS',
    bestTime: 'O(1) All Ends',
    avgTime: 'O(1) Insert/Delete at Front/Rear',
    worstTime: 'O(1)',
    space: 'O(n)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Permits insertion and deletion at both ends in constant time.',
    pros: 'Versatile: can function as both a Stack and a Queue simultaneously.',
    cons: 'Slightly higher index management complexity than ordinary queue.'
  },

  // Trees and Heaps
  {
    id: 'bst-ds',
    name: 'Binary Search Tree (BST)',
    category: 'Trees & Heaps',
    bestTime: 'O(log n) Search/Insert/Delete',
    avgTime: 'O(log n)',
    worstTime: 'O(n) Degenerate Skewed Line',
    space: 'O(n)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Binary tree adhering to BST invariant: left < node < right. Supports in-order sorted traversal.',
    pros: 'Dynamic sorted ordering; average O(log n) search, insertion, and deletion.',
    cons: 'Degrades to O(n) linked list when items are inserted in sorted order (requires AVL/Red-Black balance).'
  },
  {
    id: 'binary-heap',
    name: 'Binary Heap (Min / Max)',
    category: 'Trees & Heaps',
    bestTime: 'O(1) Peek Root',
    avgTime: 'O(log n) Insert / Extract',
    worstTime: 'O(log n) Reheap Down / Up',
    space: 'O(n)',
    inPlace: 'Yes (Array backing)',
    stable: 'N/A',
    summary: 'Complete binary tree mapped onto flat array where parent index i has children at 2i+1 and 2i+2.',
    pros: 'Guaranteed O(log n) worst-case insertion and extraction; zero pointer overhead.',
    cons: 'O(n) search for arbitrary non-root elements.'
  },

  // Graphs
  {
    id: 'graph-bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'Graphs',
    bestTime: 'O(V + E)',
    avgTime: 'O(V + E)',
    worstTime: 'O(V + E)',
    space: 'O(V)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Level-order graph traversal using a FIFO queue. Guarantees shortest path on unweighted graphs.',
    pros: 'Finds optimal minimum-edge path; visits closest vertices first.',
    cons: 'High queue memory usage O(V) in high-branching-factor graphs.'
  },
  {
    id: 'graph-dfs',
    name: 'Depth-First Search (DFS)',
    category: 'Graphs',
    bestTime: 'O(V + E)',
    avgTime: 'O(V + E)',
    worstTime: 'O(V + E)',
    space: 'O(V)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Explores as deep as possible along each branch before backtracking using recursion or LIFO stack.',
    pros: 'Low memory footprint along deep paths; naturally suited for cycle detection and topological sorting.',
    cons: 'Does not guarantee shortest path; can get trapped in deep branches.'
  },
  {
    id: 'dijkstra-sp',
    name: "Dijkstra's Shortest Path",
    category: 'Graphs',
    bestTime: 'O((V + E) log V)',
    avgTime: 'O((V + E) log V)',
    worstTime: 'O(V²)',
    space: 'O(V)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: 'Greedy single-source shortest path algorithm using a min-priority queue for non-negative weights.',
    pros: 'Mathematically proven optimal distance for positive-weight edges.',
    cons: 'Fails and loops infinitely with negative edge weights (requires Bellman-Ford).'
  },
  {
    id: 'mst-prim-kruskal',
    name: "MST (Prim's & Kruskal's)",
    category: 'Graphs',
    bestTime: 'O(E log V)',
    avgTime: 'O(E log V)',
    worstTime: 'O(E log V)',
    space: 'O(V + E)',
    inPlace: 'N/A',
    stable: 'N/A',
    summary: "Connects all vertices with minimum total edge weight. Prim grows tree; Kruskal sorts edges with Disjoint Set Union.",
    pros: 'Computes global minimum spanning tree with greedy local choices.',
    cons: 'Requires connected undirected graphs.'
  },

  // Hashing
  {
    id: 'hash-table',
    name: 'Hash Table (Linear Probing)',
    category: 'Hashing',
    bestTime: 'O(1) Insert/Search/Delete',
    avgTime: 'O(1)',
    worstTime: 'O(n) Collision Clustering',
    space: 'O(n)',
    inPlace: 'Yes',
    stable: 'N/A',
    summary: 'Direct index computation via hashFunction(key) % capacity, resolving collisions via sequential probe (h + i) % M.',
    pros: 'Average O(1) instantaneous lookup; excellent cache locality in open addressing.',
    cons: 'Primary clustering as load factor α approaches 1.0; deletion requires tombstone marking.'
  }
];

/**
 * Head-to-Head Comparative Syllabus Pairs
 */
export const BENCHMARK_PAIRS = [
  {
    id: 'linear-vs-binary',
    title: 'Linear Search vs Binary Search',
    tag: 'Searching Paradigms',
    algoA: { name: 'Linear Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', precondition: 'None (Unordered)' },
    algoB: { name: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)', precondition: 'Sorted Array Required' },
    analysis: 'Binary Search achieves an exponential speedup by eliminating half of the remaining search space with every single comparison. For n = 1,000,000, Linear Search inspects ~500,000 elements on average, while Binary Search needs at most 20 comparisons. However, Binary Search requires the collection to be strictly sorted, which incurs an upfront O(n log n) sorting cost.'
  },
  {
    id: 'bubble-vs-quick',
    title: 'Bubble Sort vs Quick Sort',
    tag: 'Quadratic vs Divide-and-Conquer',
    algoA: { name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', precondition: 'Stable, in-place' },
    algoB: { name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', precondition: 'Unstable, recursive' },
    analysis: 'Bubble Sort compares adjacent elements, resulting in n(n-1)/2 comparisons in the worst case. Quick Sort recursively partitions the array around a pivot element into two halves of roughly size n/2, producing a recursion tree of height log₂(n) with O(n) work per level, achieving O(n log n) average performance. For n = 1,000, Bubble Sort takes ~500,000 operations vs Quick Sort\'s ~10,000.'
  },
  {
    id: 'insertion-vs-selection',
    title: 'Insertion Sort vs Selection Sort',
    tag: 'Adaptive vs Unconditional Comparison',
    algoA: { name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', precondition: 'Adaptive & Stable' },
    algoB: { name: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', precondition: 'Fixed O(n) Swaps' },
    analysis: 'Insertion Sort is adaptive: if the input is already sorted or nearly sorted, its inner loop terminates immediately in O(n) comparisons. Selection Sort, conversely, always scans the entire remaining unsorted sublist regardless of ordering, executing exactly n(n-1)/2 comparisons even on a completely sorted array. Selection Sort\'s sole advantage is that it guarantees at most n-1 total swap operations.'
  },
  {
    id: 'array-vs-linkedlist',
    title: 'Dynamic Array vs Doubly Linked List',
    tag: 'Contiguous vs Pointer-Chained Memory',
    algoA: { name: 'Dynamic Array', best: 'O(1) Access', avg: 'O(n) Middle Insert', worst: 'O(n) Resize', space: 'O(n) Contiguous', precondition: 'Cache-Friendly' },
    algoB: { name: 'Doubly Linked List', best: 'O(1) Head/Tail Ops', avg: 'O(n) Middle Search', worst: 'O(n) Traverse', space: 'O(n) + 2 Pointers', precondition: 'Heap Allocated' },
    analysis: 'Arrays offer constant-time O(1) random access via index arithmetic arr[i] = base + i * size and benefit from CPU hardware prefetching and cache locality. Linked lists require O(n) pointer traversals to reach the i-th node, and each node carries pointer overhead (16-24 bytes per node in 64-bit Java). However, linked lists insert or delete in O(1) once a node pointer is held, with zero resizing or array shifting.'
  }
];

/**
 * Empirical Benchmark Execution Engine
 * Runs selected algorithm across multiple input sizes and counts exact operation events.
 */
export function runEmpiricalBenchmark(algoId, distribution = 'random', sizes = [5, 10, 20, 30, 50]) {
  const results = [];

  for (const n of sizes) {
    let dataset = [];
    if (distribution === 'sorted') {
      dataset = Array.from({ length: n }, (_, i) => (i + 1) * 3);
    } else if (distribution === 'reversed') {
      dataset = Array.from({ length: n }, (_, i) => (n - i) * 3);
    } else if (distribution === 'few_unique') {
      dataset = Array.from({ length: n }, () => [5, 12, 28, 45][Math.floor(Math.random() * 4)]);
    } else {
      // Seeded-like random
      dataset = Array.from({ length: n }, (_, i) => ((i * 37 + 19) % 90) + 10);
    }

    let steps = [];
    if (algoId === 'bubble') steps = generateBubbleSortSteps(dataset);
    else if (algoId === 'insertion') steps = generateInsertionSortSteps(dataset);
    else if (algoId === 'selection') steps = generateSelectionSortSteps(dataset);
    else if (algoId === 'shell') steps = generateShellSortSteps(dataset);
    else if (algoId === 'quick') steps = generateQuickSortSteps(dataset);
    else if (algoId === 'radix') steps = generateRadixSortSteps(dataset);
    else if (algoId === 'linear-search') {
      const target = dataset[dataset.length - 1]; // worst-case / near end
      steps = generateLinearSearchSteps(dataset, target);
    } else if (algoId === 'binary-search') {
      const sorted = [...dataset].sort((a, b) => a - b);
      const target = sorted[sorted.length - 1];
      steps = generateBinarySearchSteps(sorted, target);
    } else {
      steps = generateBubbleSortSteps(dataset);
    }

    const lastStep = steps[steps.length - 1] || {};
    const comparisons = lastStep.comparisons || 0;
    const swaps = lastStep.swaps || 0;
    const accesses = lastStep.arrayAccesses || 0;
    const totalOps = comparisons + swaps;

    results.push({
      n,
      comparisons,
      swaps,
      accesses,
      totalOps,
      stepCount: steps.length
    });
  }

  return results;
}
