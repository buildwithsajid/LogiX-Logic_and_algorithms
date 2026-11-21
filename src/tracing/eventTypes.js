/**
 * LogiX Structured Event Types
 * Defines the standard protocol between the JavaScript Visualization Engine
 * and the Java Reference Code Highlighter.
 */

export const EventType = {
  // Comparison & Swapping (Sorting & Searching)
  COMPARE: 'COMPARE',
  SWAP: 'SWAP',
  OVERWRITE: 'OVERWRITE',
  SELECT: 'SELECT',
  MARK_SORTED: 'MARK_SORTED',
  MARK_FOUND: 'MARK_FOUND',
  MARK_NOT_FOUND: 'MARK_NOT_FOUND',

  // Stacks & Queues
  PUSH: 'PUSH',
  POP: 'POP',
  PEEK: 'PEEK',
  ENQUEUE: 'ENQUEUE',
  DEQUEUE: 'DEQUEUE',
  OVERFLOW: 'OVERFLOW',
  UNDERFLOW: 'UNDERFLOW',

  // Linked Lists
  INSERT_NODE: 'INSERT_NODE',
  DELETE_NODE: 'DELETE_NODE',
  POINTER_CHANGE: 'POINTER_CHANGE',
  TRAVERSE_NODE: 'TRAVERSE_NODE',

  // Trees & Heaps
  INSERT_TREE_NODE: 'INSERT_TREE_NODE',
  DELETE_TREE_NODE: 'DELETE_TREE_NODE',
  REHEAP_UP: 'REHEAP_UP',
  REHEAP_DOWN: 'REHEAP_DOWN',
  VISIT_NODE: 'VISIT_NODE',

  // Graphs
  VISIT_VERTEX: 'VISIT_VERTEX',
  TRAVERSE_EDGE: 'TRAVERSE_EDGE',
  UPDATE_DISTANCE: 'UPDATE_DISTANCE',
  ADD_MST_EDGE: 'ADD_MST_EDGE',

  // General Line Highlighting & Execution Status
  HIGHLIGHT_LINE: 'HIGHLIGHT_LINE',
  STEP_INFO: 'STEP_INFO',
  COMPLETED: 'COMPLETED'
};

/**
 * Creates a standard LogiX operation event
 * @param {string} type - from EventType
 * @param {Object} payload - custom data for the visualization state
 * @param {number|number[]} javaLine - corresponding line number(s) in Java code
 * @param {string} explanation - human-readable explanation of this step
 */
export function createTraceEvent(type, payload = {}, javaLine = null, explanation = '') {
  return {
    type,
    payload,
    javaLine,
    explanation,
    timestamp: Date.now()
  };
}
