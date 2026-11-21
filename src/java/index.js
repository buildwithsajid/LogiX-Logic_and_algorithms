import { BUBBLE_SORT_JAVA } from './sorting/bubbleSort.java.js';
import { INSERTION_SORT_JAVA } from './sorting/insertionSort.java.js';
import { SELECTION_SORT_JAVA } from './sorting/selectionSort.java.js';
import { SHELL_SORT_JAVA } from './sorting/shellSort.java.js';
import { QUICK_SORT_JAVA } from './sorting/quickSort.java.js';
import { RADIX_SORT_JAVA } from './sorting/radixSort.java.js';
import { LINEAR_SEARCH_JAVA } from './searching/linearSearch.java.js';
import { BINARY_SEARCH_JAVA } from './searching/binarySearch.java.js';

// Phase 3 Basic Data Structures
import { ARRAY_STACK_JAVA } from './stacks/arrayStack.java.js';
import { LINKED_STACK_JAVA } from './stacks/linkedStack.java.js';
import { ORDINARY_QUEUE_JAVA } from './queues/ordinaryQueue.java.js';
import { CIRCULAR_QUEUE_JAVA } from './queues/circularQueue.java.js';
import { LINKED_QUEUE_JAVA } from './queues/linkedQueue.java.js';
import { DEQUE_JAVA } from './queues/deque.java.js';
import { PRIORITY_QUEUE_JAVA } from './queues/priorityQueue.java.js';
import { SINGLY_LINKED_LIST_JAVA } from './linkedLists/singlyLinkedList.java.js';
import { DOUBLY_LINKED_LIST_JAVA } from './linkedLists/doublyLinkedList.java.js';
import { CIRCULAR_LINKED_LIST_JAVA } from './linkedLists/circularLinkedList.java.js';
import { POLYNOMIAL_ADDITION_JAVA } from './linkedLists/polynomialAddition.java.js';
import { HASH_TABLE_PROBING_JAVA } from './hashing/hashTableLinearProbing.java.js';
import { HASH_FUNCTIONS_JAVA } from './hashing/hashFunctions.java.js';

// Phase 4 Trees, Heaps & Graphs
import { BST_JAVA } from './trees/binarySearchTree.java.js';
import { HEAP_JAVA } from './heaps/minMaxHeap.java.js';
import { GRAPH_TRAVERSALS_JAVA } from './graphs/graphTraversals.java.js';
import { DIJKSTRA_JAVA } from './graphs/dijkstraAlgorithm.java.js';
import { SPANNING_TREES_JAVA } from './graphs/spanningTrees.java.js';

export const JAVA_ALGORITHM_CATALOG = {
  // Sorting & Searching
  'bubble-sort': BUBBLE_SORT_JAVA,
  'insertion-sort': INSERTION_SORT_JAVA,
  'selection-sort': SELECTION_SORT_JAVA,
  'shell-sort': SHELL_SORT_JAVA,
  'quick-sort': QUICK_SORT_JAVA,
  'radix-sort': RADIX_SORT_JAVA,
  'linear-search': LINEAR_SEARCH_JAVA,
  'binary-search': BINARY_SEARCH_JAVA,

  // Stacks & Queues
  'array-stack': ARRAY_STACK_JAVA,
  'linked-stack': LINKED_STACK_JAVA,
  'ordinary-queue': ORDINARY_QUEUE_JAVA,
  'circular-queue': CIRCULAR_QUEUE_JAVA,
  'linked-queue': LINKED_QUEUE_JAVA,
  'deque': DEQUE_JAVA,
  'priority-queue': PRIORITY_QUEUE_JAVA,

  // Linked Lists
  'singly-ll': SINGLY_LINKED_LIST_JAVA,
  'doubly-ll': DOUBLY_LINKED_LIST_JAVA,
  'circular-ll': CIRCULAR_LINKED_LIST_JAVA,
  'polynomial-addition': POLYNOMIAL_ADDITION_JAVA,

  // Hashing
  'hash-table-probing': HASH_TABLE_PROBING_JAVA,
  'hash-functions': HASH_FUNCTIONS_JAVA,

  // Trees & Heaps
  'bst': BST_JAVA,
  'min-heap': HEAP_JAVA,
  'max-heap': HEAP_JAVA,

  // Graphs
  'bfs': GRAPH_TRAVERSALS_JAVA,
  'dfs': GRAPH_TRAVERSALS_JAVA,
  'dijkstra': DIJKSTRA_JAVA,
  'prims': SPANNING_TREES_JAVA,
  'kruskals': SPANNING_TREES_JAVA
};

export function getJavaCodeForAlgorithm(algoId) {
  return JAVA_ALGORITHM_CATALOG[algoId] || BUBBLE_SORT_JAVA;
}
