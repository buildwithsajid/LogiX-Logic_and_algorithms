/**
 * Complete LogiX Data Structures & Algorithms Syllabus Catalog
 */

export const SYLLABUS_MODULES = [
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    description: 'Internal & external sorting techniques and element search algorithms.',
    path: '/sorting-searching',
    category: 'Foundations',
    icon: 'ArrowUpDown',
    topics: [
      { id: 'bubble-sort', name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', stable: true },
      { id: 'insertion-sort', name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', stable: true },
      { id: 'selection-sort', name: 'Selection Sort', time: 'O(n²)', space: 'O(1)', stable: false },
      { id: 'shell-sort', name: 'Shell Sort', time: 'O(n log² n)', space: 'O(1)', stable: false },
      { id: 'quick-sort', name: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)', stable: false },
      { id: 'radix-sort', name: 'Radix Sort', time: 'O(nk)', space: 'O(n + k)', stable: true },
      { id: 'linear-search', name: 'Linear Search', time: 'O(n)', space: 'O(1)', stable: true },
      { id: 'binary-search', name: 'Binary Search', time: 'O(log n)', space: 'O(1)', stable: true }
    ]
  },
  {
    id: 'hashing',
    title: 'Hashing Techniques',
    description: 'Hash functions, collision resolution methods, probing, and folding schemes.',
    path: '/hashing',
    category: 'Search & Tables',
    icon: 'Hash',
    topics: [
      { id: 'modulo-division', name: 'Modulo Division', time: 'O(1)', space: 'O(n)' },
      { id: 'digit-extraction', name: 'Digit Extraction', time: 'O(1)', space: 'O(n)' },
      { id: 'linear-probing', name: 'Linear Probing', time: 'O(1) avg / O(n) worst', space: 'O(n)' },
      { id: 'direct-hashing', name: 'Direct Hashing', time: 'O(1)', space: 'O(n)' },
      { id: 'subtraction-hashing', name: 'Subtraction Hashing', time: 'O(1)', space: 'O(n)' },
      { id: 'fold-shift', name: 'Fold Shift', time: 'O(1)', space: 'O(n)' },
      { id: 'fold-boundary', name: 'Fold Boundary', time: 'O(1)', space: 'O(n)' }
    ]
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO linear structures, circular buffers, and double-ended queues.',
    path: '/stack-queue',
    category: 'Linear Structures',
    icon: 'Layers',
    topics: [
      { id: 'array-stack', name: 'Stack (Array)', time: 'O(1)', space: 'O(n)' },
      { id: 'linked-stack', name: 'Stack (Linked List)', time: 'O(1)', space: 'O(n)' },
      { id: 'ordinary-queue', name: 'Ordinary Queue', time: 'O(1)', space: 'O(n)' },
      { id: 'circular-queue', name: 'Circular Queue', time: 'O(1)', space: 'O(n)' },
      { id: 'priority-queue', name: 'Priority Queue', time: 'O(log n)', space: 'O(n)' },
      { id: 'deque', name: 'Double-Ended Queue (Deque)', time: 'O(1)', space: 'O(n)' }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Dynamic pointer-linked node sequences, reversals, and polynomial arithmetic.',
    path: '/linked-lists',
    category: 'Dynamic Structures',
    icon: 'GitCommit',
    topics: [
      { id: 'singly-ll', name: 'Singly Linked List', time: 'O(n)', space: 'O(n)' },
      { id: 'doubly-ll', name: 'Doubly Linked List', time: 'O(n)', space: 'O(n)' },
      { id: 'circular-ll', name: 'Circular Linked List', time: 'O(n)', space: 'O(n)' },
      { id: 'reverse-ll', name: 'Reverse Singly Linked List', time: 'O(n)', space: 'O(1)' },
      { id: 'dll-traversal', name: 'Forward & Backward Traversal', time: 'O(n)', space: 'O(1)' },
      { id: 'poly-addition', name: 'Polynomial Addition via Linked List', time: 'O(m + n)', space: 'O(m + n)' }
    ]
  },
  {
    id: 'trees-heaps',
    title: 'Trees & Heaps',
    description: 'Hierarchical node trees, Binary Search Trees, Min/Max heaps, and reheap operations.',
    path: '/trees-heaps',
    category: 'Hierarchical',
    icon: 'Network',
    topics: [
      { id: 'bst-ops', name: 'BST (Insert, Delete, Search)', time: 'O(log n)', space: 'O(h)' },
      { id: 'bst-traversals', name: 'Traversals (Inorder, Preorder, Postorder)', time: 'O(n)', space: 'O(h)' },
      { id: 'bst-min-max', name: 'Find Smallest / Largest Node', time: 'O(h)', space: 'O(1)' },
      { id: 'min-heap', name: 'Min Heap & Reheap Up/Down', time: 'O(log n)', space: 'O(n)' },
      { id: 'max-heap', name: 'Max Heap & Reheap Up/Down', time: 'O(log n)', space: 'O(n)' }
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs & Networks',
    description: 'Adjacency matrices, BFS, DFS, Dijkstra shortest path, and Prim/Kruskal MST.',
    path: '/graphs',
    category: 'Non-Linear Networks',
    icon: 'Share2',
    topics: [
      { id: 'adjacency-matrix', name: 'Adjacency Matrix Representation', time: 'O(1)', space: 'O(V²)' },
      { id: 'bfs', name: 'Breadth-First Search (BFS)', time: 'O(V + E)', space: 'O(V)' },
      { id: 'dfs', name: 'Depth-First Search (DFS)', time: 'O(V + E)', space: 'O(V)' },
      { id: 'dijkstra', name: "Dijkstra's Shortest Path", time: 'O(E + V log V)', space: 'O(V)' },
      { id: 'prims', name: "Prim's Minimum Spanning Tree", time: 'O(E log V)', space: 'O(V)' },
      { id: 'kruskals', name: "Kruskal's Minimum Spanning Tree", time: 'O(E log E)', space: 'O(V)' }
    ]
  }
];

export const REAL_WORLD_SIMULATIONS = [
  {
    id: 'hospital-er',
    title: 'Hospital Emergency Room Triage',
    dataStructure: 'Priority Queue / Min-Heap',
    description: 'Patient admissions are prioritized by acuity score rather than arrival time. Critical triage patients preempt normal checkups.',
    icon: 'Activity'
  },
  {
    id: 'music-playlist',
    title: 'Music Player Infinite Loop',
    dataStructure: 'Circular Linked List',
    description: 'Next track after the final song seamlessly jumps back to the head node, supporting looping playback and instant song deletion.',
    icon: 'Music'
  },
  {
    id: 'browser-history',
    title: 'Browser Tab Navigation (Back / Forward)',
    dataStructure: 'Two Stacks / Doubly Linked List',
    description: 'Back navigation pops visited pages from History stack and pushes to Forward stack, while new navigation clears forward history.',
    icon: 'Globe'
  },
  {
    id: 'printer-spooler',
    title: 'Network Printer Job Scheduling',
    dataStructure: 'FIFO Queue',
    description: 'Print jobs submitted across campus are spooled and processed strictly in the order received with buffer overflow protection.',
    icon: 'Printer'
  },
  {
    id: 'city-routes',
    title: 'GPS City Route Finder',
    dataStructure: "Weighted Graph & Dijkstra's Algorithm",
    description: 'Calculates the optimal driving route between road intersections accounting for traffic distance and travel cost.',
    icon: 'MapPin'
  }
];
