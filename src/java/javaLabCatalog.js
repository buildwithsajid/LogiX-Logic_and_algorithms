import { JAVA_ALGORITHM_CATALOG } from './index.js';

export const JAVA_CATEGORIES = [
  'All',
  'Sorting',
  'Searching',
  'Stacks & Queues',
  'Linked Lists',
  'Trees & Heaps',
  'Graphs',
  'Hashing'
];

export const JAVA_LAB_CATALOG = [
  // 1. SORTING
  {
    id: 'bubble-sort',
    title: 'BubbleSort.java',
    className: 'BubbleSort',
    category: 'Sorting',
    time: 'O(n²)',
    space: 'O(1)',
    visLink: '/sorting-searching',
    desc: 'Optimized Bubble Sort with boolean swapped flag for early termination.',
    explanation: 'Iteratively compares adjacent elements (arr[j] > arr[j+1]) and swaps them if out of order. With the swapped flag, already sorted arrays complete in O(n) linear best-case time.',
    code: JAVA_ALGORITHM_CATALOG['bubble-sort'].code,
    defaultLine: 9,
    sampleInput: 'int[] arr = {64, 34, 25, 12, 22, 11, 90};',
    expectedOutput: '[11, 12, 22, 25, 34, 64, 90]',
    methods: [
      { name: 'bubbleSort(int[] arr)', signature: 'public static void bubbleSort(int[] arr)', complexity: 'O(n²)', desc: 'Performs outer passes and inner adjacent comparisons with early break if no swaps occurred.' }
    ],
    demoTrace: [
      { line: 5, log: 'Pass 0 begins. swapped set to false.', activeLine: 5 },
      { line: 9, log: 'Comparing arr[0] (64) with arr[1] (34). Since 64 > 34, swap needed.', activeLine: 9 },
      { line: 11, log: 'Swapped 64 and 34. Array: [34, 64, 25, 12, 22, 11, 90]. swapped = true.', activeLine: 11 },
      { line: 18, log: 'Inner pass completed. Largest element 90 placed at final position.', activeLine: 18 }
    ]
  },
  {
    id: 'insertion-sort',
    title: 'InsertionSort.java',
    className: 'InsertionSort',
    category: 'Sorting',
    time: 'O(n²)',
    space: 'O(1)',
    visLink: '/sorting-searching',
    desc: 'Incremental insertion into sorted prefix array.',
    explanation: 'Picks elements one by one from unsorted partition, shifts all elements greater than key to the right, and drops key into its correct sorted slot.',
    code: JAVA_ALGORITHM_CATALOG['insertion-sort'].code,
    defaultLine: 8,
    sampleInput: 'int[] arr = {12, 11, 13, 5, 6};',
    expectedOutput: '[5, 6, 11, 12, 13]',
    methods: [
      { name: 'insertionSort(int[] arr)', signature: 'public static void insertionSort(int[] arr)', complexity: 'O(n²)', desc: 'Maintains sorted prefix arr[0..i-1], shifting larger elements rightwards.' }
    ],
    demoTrace: [
      { line: 5, log: 'Outer loop: i = 1, key = arr[1] (11).', activeLine: 5 },
      { line: 8, log: 'While loop: arr[0] (12) > key (11), shifting 12 to arr[1].', activeLine: 8 },
      { line: 13, log: 'Inserted key (11) into arr[0]. Sorted prefix: [11, 12].', activeLine: 13 }
    ]
  },
  {
    id: 'selection-sort',
    title: 'SelectionSort.java',
    className: 'SelectionSort',
    category: 'Sorting',
    time: 'O(n²)',
    space: 'O(1)',
    visLink: '/sorting-searching',
    desc: 'Unconditional minimum search with maximum n-1 total memory swaps.',
    explanation: 'Divides array into sorted and unsorted partitions. Finds minimum element in unsorted partition and swaps it once into the current pass boundary.',
    code: JAVA_ALGORITHM_CATALOG['selection-sort'].code,
    defaultLine: 8,
    sampleInput: 'int[] arr = {64, 25, 12, 22, 11};',
    expectedOutput: '[11, 12, 22, 25, 64]',
    methods: [
      { name: 'selectionSort(int[] arr)', signature: 'public static void selectionSort(int[] arr)', complexity: 'O(n²)', desc: 'Scans unsorted slice, updates min_idx, and executes at most one swap per pass.' }
    ],
    demoTrace: [
      { line: 5, log: 'Pass 0: Assume min_idx = 0 (64).', activeLine: 5 },
      { line: 8, log: 'Found new minimum 11 at index 4.', activeLine: 8 },
      { line: 13, log: 'Swapped arr[0] (64) with arr[4] (11). Array: [11, 25, 12, 22, 64].', activeLine: 13 }
    ]
  },
  {
    id: 'shell-sort',
    title: 'ShellSort.java',
    className: 'ShellSort',
    category: 'Sorting',
    time: 'O(n^(3/2))',
    space: 'O(1)',
    visLink: '/sorting-searching',
    desc: 'Diminishing increment gap sort overcoming quadratic inversion barrier.',
    explanation: 'Compares distant elements with decreasing gaps (gap = n/2, n/4, ... 1). Quickly moves small elements leftwards before finishing with gap 1.',
    code: JAVA_ALGORITHM_CATALOG['shell-sort'].code,
    defaultLine: 10,
    sampleInput: 'int[] arr = {12, 34, 54, 2, 3};',
    expectedOutput: '[2, 3, 12, 34, 54]',
    methods: [
      { name: 'shellSort(int[] arr)', signature: 'public static void shellSort(int[] arr)', complexity: 'O(n log n) - O(n²)', desc: 'Gapped insertion sort using Knuth/Shell halving intervals.' }
    ],
    demoTrace: [
      { line: 5, log: 'Initial gap = arr.length / 2 = 2.', activeLine: 5 },
      { line: 10, log: 'Comparing arr[i] with arr[i - gap] across stride of 2.', activeLine: 10 },
      { line: 16, log: 'Halving gap to 1. Final pass behaves like fine-grained insertion sort.', activeLine: 16 }
    ]
  },
  {
    id: 'quick-sort',
    title: 'QuickSort.java',
    className: 'QuickSort',
    category: 'Sorting',
    time: 'O(n log n)',
    space: 'O(log n)',
    visLink: '/sorting-searching',
    desc: 'Recursive divide-and-conquer with Lomuto partitioning.',
    explanation: 'Selects the rightmost element as pivot, arranges all elements smaller than pivot to the left, larger to the right, and recursively conquers sub-arrays.',
    code: JAVA_ALGORITHM_CATALOG['quick-sort'].code,
    defaultLine: 17,
    sampleInput: 'int[] arr = {10, 80, 30, 90, 40, 50, 70};',
    expectedOutput: '[10, 30, 40, 50, 70, 80, 90]',
    methods: [
      { name: 'partition(int[] arr, int low, int high)', signature: 'public static int partition(int[] arr, int low, int high)', complexity: 'O(n)', desc: 'Places pivot at correct position, partitioning smaller elements left and larger right.' },
      { name: 'quickSort(int[] arr, int low, int high)', signature: 'public static void quickSort(int[] arr, int low, int high)', complexity: 'O(n log n)', desc: 'Recursive divide and conquer.' }
    ],
    demoTrace: [
      { line: 15, log: 'partition() called: pivot = arr[high] (70).', activeLine: 15 },
      { line: 19, log: 'arr[j] <= pivot: swapping arr[i] with arr[j].', activeLine: 19 },
      { line: 26, log: 'Pivot placed at partition index 4. Sub-arrays [0..3] and [5..6] recursively sorted.', activeLine: 26 }
    ]
  },
  {
    id: 'radix-sort',
    title: 'RadixSort.java',
    className: 'RadixSort',
    category: 'Sorting',
    time: 'O(d · (n + k))',
    space: 'O(n + k)',
    visLink: '/sorting-searching',
    desc: 'LSD non-comparative integer sort using stable counting sub-routines.',
    explanation: 'Sorts keys digit by digit starting from Least Significant Digit (1s) to Most Significant Digit (10s, 100s) using auxiliary count buckets.',
    code: JAVA_ALGORITHM_CATALOG['radix-sort'].code,
    defaultLine: 23,
    sampleInput: 'int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};',
    expectedOutput: '[2, 24, 45, 66, 75, 90, 170, 802]',
    methods: [
      { name: 'countSort(int[] arr, int n, int exp)', signature: 'public static void countSort(int[] arr, int n, int exp)', complexity: 'O(n)', desc: 'Stable bucket count for digit position 10^exp.' },
      { name: 'radixSort(int[] arr, int n)', signature: 'public static void radixSort(int[] arr, int n)', complexity: 'O(d · n)', desc: 'Extracts max, iterates exp from 1 to max/exp > 0.' }
    ],
    demoTrace: [
      { line: 22, log: 'countSort for exp = 1 (1s units place). Counting digit frequencies.', activeLine: 22 },
      { line: 29, log: 'Transforming count array into cumulative prefix sums for stability.', activeLine: 29 },
      { line: 34, log: 'Building output array from right to left to preserve relative order.', activeLine: 34 }
    ]
  },

  // 2. SEARCHING
  {
    id: 'linear-search',
    title: 'LinearSearch.java',
    className: 'LinearSearch',
    category: 'Searching',
    time: 'O(n)',
    space: 'O(1)',
    visLink: '/sorting-searching',
    desc: 'Sequential scan on arbitrary unsorted collections.',
    explanation: 'Inspects each item sequentially from index 0 to n-1. Returns immediately upon match or -1 if target is absent.',
    code: JAVA_ALGORITHM_CATALOG['linear-search'].code,
    defaultLine: 4,
    sampleInput: 'arr = {10, 50, 30, 70, 80, 20}, target = 30',
    expectedOutput: 'Element found at index: 2',
    methods: [
      { name: 'linearSearch(int[] arr, int target)', signature: 'public static int linearSearch(int[] arr, int target)', complexity: 'O(n)', desc: 'Scans array linearly, comparing each element to target.' }
    ],
    demoTrace: [
      { line: 3, log: 'Loop i = 0: arr[0] (10) != target (30). Continue.', activeLine: 3 },
      { line: 4, log: 'Loop i = 2: arr[2] (30) == target (30). Match found!', activeLine: 4 },
      { line: 5, log: 'Returning matched index 2.', activeLine: 5 }
    ]
  },
  {
    id: 'binary-search',
    title: 'BinarySearch.java',
    className: 'BinarySearch',
    category: 'Searching',
    time: 'O(log n)',
    space: 'O(1)',
    visLink: '/sorting-searching',
    desc: 'Logarithmic divide-and-conquer search on sorted arrays.',
    explanation: 'Maintains low and high bounds, evaluates middle = low + (high - low)/2. Eliminates half of the remaining elements in each step.',
    code: JAVA_ALGORITHM_CATALOG['binary-search'].code,
    defaultLine: 7,
    sampleInput: 'sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, target = 23',
    expectedOutput: 'Element found at index: 5',
    methods: [
      { name: 'binarySearch(int[] arr, int target)', signature: 'public static int binarySearch(int[] arr, int target)', complexity: 'O(log n)', desc: 'Iterative halving of search window.' }
    ],
    demoTrace: [
      { line: 6, log: 'Initial window: low = 0, high = 9. mid = 4 (arr[4] = 16).', activeLine: 6 },
      { line: 11, log: 'target (23) > arr[mid] (16): discard left half, low = mid + 1 = 5.', activeLine: 11 },
      { line: 8, log: 'New mid = 5 (arr[5] = 23). arr[mid] == target. Match returned!', activeLine: 8 }
    ]
  },

  // 3. STACKS & QUEUES
  {
    id: 'array-stack',
    title: 'ArrayStack.java',
    className: 'ArrayStack',
    category: 'Stacks & Queues',
    time: 'O(1) all ops',
    space: 'O(n)',
    visLink: '/stack-queue',
    desc: 'Array-based LIFO stack with top pointer and overflow/underflow checks.',
    explanation: 'Uses a fixed-capacity array with integer top index initialized to -1. Push increments top before assigning, Pop returns arr[top--].',
    code: JAVA_ALGORITHM_CATALOG['array-stack'].code,
    defaultLine: 28,
    sampleInput: 'push(10), push(20), push(30), pop()',
    expectedOutput: 'Popped element: 30',
    methods: [
      { name: 'push(int value)', signature: 'public void push(int value)', complexity: 'O(1)', desc: 'Verifies !isFull(), increments top, inserts value.' },
      { name: 'pop()', signature: 'public int pop()', complexity: 'O(1)', desc: 'Verifies !isEmpty(), returns top element and decrements top.' },
      { name: 'peek()', signature: 'public int peek()', complexity: 'O(1)', desc: 'Returns element at top without removing it.' }
    ],
    demoTrace: [
      { line: 24, log: 'push(10): isFull() is false. top becomes 0, arr[0] = 10.', activeLine: 24 },
      { line: 28, log: 'push(20): top becomes 1, arr[1] = 20.', activeLine: 28 },
      { line: 32, log: 'pop(): returns arr[1] (20), decrements top to 0.', activeLine: 32 }
    ]
  },
  {
    id: 'linked-stack',
    title: 'LinkedStack.java',
    className: 'LinkedStack',
    category: 'Stacks & Queues',
    time: 'O(1) dynamic',
    space: 'O(n)',
    visLink: '/stack-queue',
    desc: 'Dynamically linked LIFO stack eliminating fixed array overflow.',
    explanation: 'Nodes contain data and next reference. New items are pushed as head nodes, guaranteeing O(1) push and pop with zero preallocated waste.',
    code: JAVA_ALGORITHM_CATALOG['linked-stack'].code,
    defaultLine: 21,
    sampleInput: 'push(5), push(15), pop()',
    expectedOutput: 'Popped element: 15',
    methods: [
      { name: 'push(int value)', signature: 'public void push(int value)', complexity: 'O(1)', desc: 'Allocates new node, points next to top, updates top.' },
      { name: 'pop()', signature: 'public int pop()', complexity: 'O(1)', desc: 'Removes top node and advances top reference to top.next.' }
    ],
    demoTrace: [
      { line: 19, log: 'push(5): new Node(5, null). top points to Node(5).', activeLine: 19 },
      { line: 21, log: 'push(15): new Node(15, Node(5)). top updated to Node(15).', activeLine: 21 },
      { line: 27, log: 'pop(): extracts 15, advances top to Node(5).', activeLine: 27 }
    ]
  },
  {
    id: 'circular-queue',
    title: 'CircularQueue.java',
    className: 'CircularQueue',
    category: 'Stacks & Queues',
    time: 'O(1) all ops',
    space: 'O(n)',
    visLink: '/stack-queue',
    desc: 'Modulo ring buffer resolving false overflow in linear queues.',
    explanation: 'Uses front and rear indices wrapped modulo capacity ((rear + 1) % capacity). Allows infinite continuous enqueue/dequeue cycles within capacity.',
    code: JAVA_ALGORITHM_CATALOG['circular-queue'].code,
    defaultLine: 27,
    sampleInput: 'enqueue(10), enqueue(20), dequeue(), enqueue(30)',
    expectedOutput: 'Dequeued: 10, Queue: [20, 30]',
    methods: [
      { name: 'enqueue(int val)', signature: 'public void enqueue(int val)', complexity: 'O(1)', desc: 'rear = (rear + 1) % capacity; arr[rear] = val;' },
      { name: 'dequeue()', signature: 'public int dequeue()', complexity: 'O(1)', desc: 'val = arr[front]; front = (front + 1) % capacity;' }
    ],
    demoTrace: [
      { line: 25, log: 'enqueue(10): rear moves from -1 to 0, front = 0. arr[0] = 10.', activeLine: 25 },
      { line: 27, log: 'enqueue(20): rear = (0 + 1) % 5 = 1. arr[1] = 20.', activeLine: 27 },
      { line: 34, log: 'dequeue(): returns arr[0] (10), front wraps to (0 + 1) % 5 = 1.', activeLine: 34 }
    ]
  },
  {
    id: 'deque',
    title: 'DoubleEndedQueue.java',
    className: 'DoubleEndedQueue',
    category: 'Stacks & Queues',
    time: 'O(1) all ends',
    space: 'O(n)',
    visLink: '/stack-queue',
    desc: 'Dual-ended queue allowing insertions and deletions at both Front and Rear.',
    explanation: 'Provides insertFront, insertRear, deleteFront, and deleteRear in O(1) time using bidirectional circular index wrapping.',
    code: JAVA_ALGORITHM_CATALOG['deque'].code,
    defaultLine: 18,
    sampleInput: 'insertRear(10), insertFront(5), deleteRear()',
    expectedOutput: 'Deleted from rear: 10',
    methods: [
      { name: 'insertFront(int val)', signature: 'public void insertFront(int val)', complexity: 'O(1)', desc: 'front = (front - 1 + capacity) % capacity.' },
      { name: 'insertRear(int val)', signature: 'public void insertRear(int val)', complexity: 'O(1)', desc: 'rear = (rear + 1) % capacity.' }
    ],
    demoTrace: [
      { line: 16, log: 'insertRear(10): rear = 0, front = 0.', activeLine: 16 },
      { line: 24, log: 'insertFront(5): front wraps to (0 - 1 + 5) % 5 = 4.', activeLine: 24 },
      { line: 36, log: 'deleteRear(): returns 10, rear wraps backwards to 4.', activeLine: 36 }
    ]
  },

  // 4. LINKED LISTS
  {
    id: 'singly-ll',
    title: 'SinglyLinkedList.java',
    className: 'SinglyLinkedList',
    category: 'Linked Lists',
    time: 'O(1) head, O(n) search',
    space: 'O(n)',
    visLink: '/linked-lists',
    desc: 'Unidirectional chained node structure with insertion, deletion, and in-place reversal.',
    explanation: 'Contains nodes carrying data and next reference. Supports O(1) prepend, O(n) append/search, and classic three-pointer (prev, curr, next) in-place reversal.',
    code: JAVA_ALGORITHM_CATALOG['singly-ll'].code,
    defaultLine: 20,
    sampleInput: 'insertHead(10), insertTail(20), reverse()',
    expectedOutput: 'Reversed List: 20 -> 10 -> null',
    methods: [
      { name: 'insertHead(int data)', signature: 'public void insertHead(int data)', complexity: 'O(1)', desc: 'Creates new node pointing to current head, updates head.' },
      { name: 'deleteNode(int key)', signature: 'public void deleteNode(int key)', complexity: 'O(n)', desc: 'Finds key node, links prev.next = curr.next, freeing node.' },
      { name: 'reverse()', signature: 'public void reverse()', complexity: 'O(n)', desc: 'In-place three-pointer reversal of all next pointers.' }
    ],
    demoTrace: [
      { line: 15, log: 'insertHead(10): head = new Node(10, null).', activeLine: 15 },
      { line: 20, log: 'insertTail(20): traversed to end, tail.next = Node(20).', activeLine: 20 },
      { line: 42, log: 'reverse(): prev = null, curr = head. curr.next reversed in-place.', activeLine: 42 }
    ]
  },
  {
    id: 'doubly-ll',
    title: 'DoublyLinkedList.java',
    className: 'DoublyLinkedList',
    category: 'Linked Lists',
    time: 'O(1) head/tail',
    space: 'O(n)',
    visLink: '/linked-lists',
    desc: 'Bidirectional nodes with prev and next references.',
    explanation: 'Allows forward and backward traversals. Deletion of any node is O(1) given direct reference because node.prev.next = node.next.',
    code: JAVA_ALGORITHM_CATALOG['doubly-ll'].code,
    defaultLine: 17,
    sampleInput: 'insertTail(10), insertTail(20), traverseBackward()',
    expectedOutput: 'Backward Traversal: 20 <-> 10',
    methods: [
      { name: 'insertTail(int val)', signature: 'public void insertTail(int val)', complexity: 'O(1)', desc: 'Links tail.next = newNode and newNode.prev = tail.' },
      { name: 'deleteNode(Node target)', signature: 'public void deleteNode(Node target)', complexity: 'O(1)', desc: 'Unlinks target using bidirectional references.' }
    ],
    demoTrace: [
      { line: 14, log: 'insertTail(10): head and tail both point to Node(10).', activeLine: 14 },
      { line: 17, log: 'insertTail(20): tail.next = Node(20), Node(20).prev = tail.', activeLine: 17 }
    ]
  },
  {
    id: 'polynomial-addition',
    title: 'PolynomialAddition.java',
    className: 'PolynomialAddition',
    category: 'Linked Lists',
    time: 'O(m + n)',
    space: 'O(m + n)',
    visLink: '/linked-lists',
    desc: 'Algebraic polynomial addition using ordered exponent linked lists.',
    explanation: 'Represents polynomials as linked lists ordered by exponent. Simultaneously walks two polynomials, adding coefficients of equal powers.',
    code: JAVA_ALGORITHM_CATALOG['polynomial-addition'].code,
    defaultLine: 20,
    sampleInput: 'P1: 5x^3 + 4x^1, P2: 3x^3 + 2x^2',
    expectedOutput: 'Result: 8x^3 + 2x^2 + 4x^1',
    methods: [
      { name: 'add(Poly p1, Poly p2)', signature: 'public static Node add(Node p1, Node p2)', complexity: 'O(m + n)', desc: 'Compares exponents, sums matching powers, attaches unmatched terms.' }
    ],
    demoTrace: [
      { line: 18, log: 'Comparing exponents: p1.exp (3) == p2.exp (3).', activeLine: 18 },
      { line: 20, log: 'Summing coefficients: 5 + 3 = 8. Created term 8x^3.', activeLine: 20 },
      { line: 24, log: 'p2 exponent (2) > p1 exponent (1). Attaching term 2x^2.', activeLine: 24 }
    ]
  },

  // 5. TREES & HEAPS
  {
    id: 'bst',
    title: 'BinarySearchTree.java',
    className: 'BinarySearchTree',
    category: 'Trees & Heaps',
    time: 'O(log n) avg',
    space: 'O(n)',
    visLink: '/trees-heaps',
    desc: 'Binary Search Tree adhering to invariant left < parent < right.',
    explanation: 'Supports recursive insertion, key search, finding min/max, node deletion via in-order successor replacement, and Inorder, Preorder, and Postorder traversals.',
    code: JAVA_ALGORITHM_CATALOG['bst'].code,
    defaultLine: 16,
    sampleInput: 'insert(50), insert(30), insert(70), inorder()',
    expectedOutput: 'Inorder (Sorted): 30 50 70',
    methods: [
      { name: 'insert(Node curr, int key)', signature: 'public Node insert(Node curr, int key)', complexity: 'O(log n)', desc: 'Recursively descends left if key < curr.key or right if key > curr.key.' },
      { name: 'search(Node curr, int key)', signature: 'public boolean search(Node curr, int key)', complexity: 'O(log n)', desc: 'Returns true if key exists, false on null leaf.' },
      { name: 'inorder(Node curr)', signature: 'public void inorder(Node curr)', complexity: 'O(n)', desc: 'Left - Root - Right produces strictly sorted output.' }
    ],
    demoTrace: [
      { line: 14, log: 'insert(30): 30 < root (50), recursing left.', activeLine: 14 },
      { line: 16, log: 'root.left was null, inserted new Node(30).', activeLine: 16 },
      { line: 43, log: 'inorder(): visits 30, then 50, then 70.', activeLine: 43 }
    ]
  },
  {
    id: 'min-heap',
    title: 'BinaryHeap.java',
    className: 'BinaryHeap',
    category: 'Trees & Heaps',
    time: 'O(log n) insert/extract',
    space: 'O(n)',
    visLink: '/trees-heaps',
    desc: 'Complete binary tree mapped onto flat array with Reheap Up/Down.',
    explanation: 'Maintains heap invariant where parent at index i has children at 2i+1 and 2i+2. Provides guaranteed O(1) root access and O(log n) extract/insert.',
    code: JAVA_ALGORITHM_CATALOG['min-heap'].code,
    defaultLine: 24,
    sampleInput: 'insert(15), insert(10), insert(20), extractRoot()',
    expectedOutput: 'Extracted Min: 10',
    methods: [
      { name: 'reheapUp(int idx)', signature: 'private void reheapUp(int idx)', complexity: 'O(log n)', desc: 'Bubbles newly appended leaf upward while violating parent priority.' },
      { name: 'reheapDown(int idx)', signature: 'private void reheapDown(int idx)', complexity: 'O(log n)', desc: 'Pushes replacement root downward, swapping with smaller/larger child.' }
    ],
    demoTrace: [
      { line: 20, log: 'insert(10): appended at index 1. Parent at index 0 has value 15.', activeLine: 20 },
      { line: 24, log: 'reheapUp(): child (10) < parent (15). Swapped indices 1 and 0.', activeLine: 24 },
      { line: 36, log: 'extractMin(): root 10 removed. Last element moved to root, reheapDown() called.', activeLine: 36 }
    ]
  },

  // 6. GRAPHS
  {
    id: 'graph-traversals',
    title: 'GraphTraversals.java',
    className: 'GraphTraversals',
    category: 'Graphs',
    time: 'O(V + E)',
    space: 'O(V)',
    visLink: '/graphs',
    desc: 'Breadth-First Search (Queue) and Depth-First Search (Recursion/Stack).',
    explanation: 'BFS explores graph level by level using a FIFO queue, finding shortest hop paths. DFS explores branch paths deeply using the recursive JVM call stack.',
    code: JAVA_ALGORITHM_CATALOG['bfs'].code,
    defaultLine: 27,
    sampleInput: 'addEdge(0, 1), addEdge(0, 2), addEdge(1, 3), BFS(0)',
    expectedOutput: 'BFS Traversal: 0 1 2 3',
    methods: [
      { name: 'BFS(int startVertex)', signature: 'public void BFS(int startVertex)', complexity: 'O(V + E)', desc: 'Iterative level traversal using visited array and Queue.' },
      { name: 'DFS(int startVertex)', signature: 'public void DFS(int startVertex)', complexity: 'O(V + E)', desc: 'Recursive branch traversal.' }
    ],
    demoTrace: [
      { line: 26, log: 'BFS: startVertex 0 marked visited and added to Queue.', activeLine: 26 },
      { line: 30, log: 'Dequeued vertex 0. Visiting unvisited neighbors: 1 and 2.', activeLine: 30 },
      { line: 35, log: 'Neighbors 1 and 2 marked visited and enqueued.', activeLine: 35 }
    ]
  },
  {
    id: 'dijkstra',
    title: 'DijkstraAlgorithm.java',
    className: 'DijkstraAlgorithm',
    category: 'Graphs',
    time: 'O((V + E) log V)',
    space: 'O(V)',
    visLink: '/graphs',
    desc: 'Greedy single-source shortest path using Min-Priority Queue.',
    explanation: 'Initializes source distance to 0 and all other vertices to infinity. Continually relaxes adjacent edges from the minimum unvisited vertex candidate.',
    code: JAVA_ALGORITHM_CATALOG['dijkstra'].code,
    defaultLine: 24,
    sampleInput: 'Graph with 5 vertices, Source = 0',
    expectedOutput: 'Distances from 0: [0, 4, 2, 7, 8]',
    methods: [
      { name: 'dijkstra(int V, List<List<Edge>> adj, int src)', signature: 'public static int[] dijkstra(int V, List<List<Edge>> adj, int src)', complexity: 'O((V + E) log V)', desc: 'Relaxes dist[v] = min(dist[v], dist[u] + weight) using Min-Priority Queue.' }
    ],
    demoTrace: [
      { line: 20, log: 'dist[src] initialized to 0; all others set to Integer.MAX_VALUE.', activeLine: 20 },
      { line: 24, log: 'Poll vertex 0 (dist 0). Examining outgoing edges.', activeLine: 24 },
      { line: 28, log: 'Edge (0 -> 2, weight 2): relaxed dist[2] from infinity to 2.', activeLine: 28 }
    ]
  },
  {
    id: 'spanning-trees',
    title: 'SpanningTrees.java',
    className: 'SpanningTrees',
    category: 'Graphs',
    time: 'O(E log V)',
    space: 'O(V + E)',
    visLink: '/graphs',
    desc: "Minimum Spanning Tree algorithms: Prim's Greedy Cut & Kruskal's DSU.",
    explanation: "Computes tree connecting all vertices with minimum possible total edge weight. Prim grows tree from vertex; Kruskal sorts edges and unions disjoint sets.",
    code: JAVA_ALGORITHM_CATALOG['prims'].code,
    defaultLine: 18,
    sampleInput: 'Connected undirected graph with 5 vertices',
    expectedOutput: 'MST Weight: 10, Edges count: 4',
    methods: [
      { name: 'primsMST()', signature: 'public int primsMST()', complexity: 'O(E log V)', desc: 'Grows MST using priority queue over crossing edges.' },
      { name: 'kruskalsMST()', signature: 'public int kruskalsMST()', complexity: 'O(E log V)', desc: 'Sorts edges by weight, adds non-cyclic edges via DisjointSet.' }
    ],
    demoTrace: [
      { line: 15, log: 'Prim MST: starts at vertex 0 with key 0.', activeLine: 15 },
      { line: 18, log: 'Extract min key vertex, include edge in MST.', activeLine: 18 },
      { line: 24, log: 'Updated neighboring keys for remaining vertices.', activeLine: 24 }
    ]
  },

  // 7. HASHING
  {
    id: 'hash-table-probing',
    title: 'HashTableLinearProbing.java',
    className: 'HashTableLinearProbing',
    category: 'Hashing',
    time: 'O(1) avg',
    space: 'O(n)',
    visLink: '/hashing',
    desc: 'Open addressing hash table with linear collision probing (h + i) % M.',
    explanation: 'Maps keys to bucket index via hash(key) % capacity. If slot is occupied, probes sequentially to the next open slot.',
    code: JAVA_ALGORITHM_CATALOG['hash-table-probing'].code,
    defaultLine: 20,
    sampleInput: 'insert(12), insert(22), insert(32) with capacity 10',
    expectedOutput: '12 at slot 2, 22 probes to slot 3, 32 probes to slot 4',
    methods: [
      { name: 'insert(int key, String val)', signature: 'public void insert(int key, String val)', complexity: 'O(1) avg', desc: 'Computes hash, probes sequentially on collision.' },
      { name: 'get(int key)', signature: 'public String get(int key)', complexity: 'O(1) avg', desc: 'Probes bucket until match or empty slot encountered.' }
    ],
    demoTrace: [
      { line: 16, log: 'insert(12): hash(12) % 10 = 2. Slot 2 is empty -> stored.', activeLine: 16 },
      { line: 18, log: 'insert(22): hash(22) % 10 = 2. Collision at slot 2!', activeLine: 18 },
      { line: 20, log: 'Linear probe: (2 + 1) % 10 = 3. Slot 3 is empty -> stored 22 at slot 3.', activeLine: 20 }
    ]
  },
  {
    id: 'hash-functions',
    title: 'HashFunctions.java',
    className: 'HashFunctions',
    category: 'Hashing',
    time: 'O(1)',
    space: 'O(1)',
    visLink: '/hashing',
    desc: 'University syllabus hash functions: Modulo, Digit Extraction, Fold Shift & Boundary.',
    explanation: 'Comprehensive utility class implementing Modulo Division, Digit Extraction, Subtraction, Direct, Fold Shift, and Fold Boundary hashing.',
    code: JAVA_ALGORITHM_CATALOG['hash-functions'].code,
    defaultLine: 14,
    sampleInput: 'key = 98765432, tableSize = 100',
    expectedOutput: 'Modulo: 32, FoldShift: 56, DigitExtraction: 86',
    methods: [
      { name: 'moduloDivision(int key, int tableSize)', signature: 'public static int moduloDivision(int key, int tableSize)', complexity: 'O(1)', desc: 'Math.abs(key) % tableSize' },
      { name: 'foldShift(int key, int parts, int tableSize)', signature: 'public static int foldShift(int key, int parts, int tableSize)', complexity: 'O(1)', desc: 'Splits key into chunks and sums them.' }
    ],
    demoTrace: [
      { line: 5, log: 'moduloDivision: 98765432 % 100 = 32.', activeLine: 5 },
      { line: 14, log: 'foldShift: chunks 98 + 76 + 54 + 32 = 260 % 100 = 60.', activeLine: 14 }
    ]
  }
];
