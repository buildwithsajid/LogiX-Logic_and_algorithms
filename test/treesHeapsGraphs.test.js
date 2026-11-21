function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Running LogiX Phase 4 Trees, Heaps & Graphs Tests ---');

// 1. BST Inorder Traversal yields Sorted Sequence
class BSTNode {
  constructor(val) {
    this.key = val;
    this.left = null;
    this.right = null;
  }
}

function insertBST(root, key) {
  if (!root) return new BSTNode(key);
  if (key < root.key) root.left = insertBST(root.left, key);
  else if (key > root.key) root.right = insertBST(root.right, key);
  return root;
}

function inorderBST(root, result = []) {
  if (!root) return result;
  inorderBST(root.left, result);
  result.push(root.key);
  inorderBST(root.right, result);
  return result;
}

let bst = null;
[50, 30, 70, 20, 40, 60, 80].forEach(k => { bst = insertBST(bst, k); });
const bstOrder = inorderBST(bst);
assert(JSON.stringify(bstOrder) === JSON.stringify([20, 30, 40, 50, 60, 70, 80]), 'BST Inorder traversal produces strictly sorted numbers');

// 2. Binary Min-Heap Invariant
function reheapUpMin(heap, index) {
  while (index > 0) {
    const p = Math.floor((index - 1) / 2);
    if (heap[index] < heap[p]) {
      const temp = heap[index];
      heap[index] = heap[p];
      heap[p] = temp;
      index = p;
    } else break;
  }
}

const minHeap = [];
[50, 30, 20, 15, 8].forEach(val => {
  minHeap.push(val);
  reheapUpMin(minHeap, minHeap.length - 1);
});
assert(minHeap[0] === 8, 'Min-Heap maintains smallest element at root (Index 0)');

// 3. Dijkstra Shortest Path Verification
function testDijkstra() {
  const dist = { 0: 0, 1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity };
  const adj = {
    0: [{ v: 1, w: 4 }, { v: 2, w: 2 }],
    1: [{ v: 0, w: 4 }, { v: 2, w: 1 }, { v: 3, w: 5 }],
    2: [{ v: 0, w: 2 }, { v: 1, w: 1 }, { v: 3, w: 8 }, { v: 4, w: 10 }],
    3: [{ v: 1, w: 5 }, { v: 2, w: 8 }, { v: 4, w: 2 }],
    4: [{ v: 2, w: 10 }, { v: 3, w: 2 }]
  };

  const pq = [{ u: 0, d: 0 }];
  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { u, d } = pq.shift();
    if (d > dist[u]) continue;
    for (const edge of adj[u] || []) {
      if (dist[u] + edge.w < dist[edge.v]) {
        dist[edge.v] = dist[u] + edge.w;
        pq.push({ u: edge.v, d: dist[edge.v] });
      }
    }
  }
  return dist;
}

const dijkstraDist = testDijkstra();
assert(dijkstraDist[0] === 0, 'Dijkstra distance to source is 0');
assert(dijkstraDist[2] === 2, 'Dijkstra distance to vertex 2 is 2');
assert(dijkstraDist[1] === 3, 'Dijkstra relaxes distance to vertex 1 via vertex 2 (0->2->1 = 3)');
assert(dijkstraDist[3] === 8, 'Dijkstra distance to vertex 3 is 8');
assert(dijkstraDist[4] === 10, 'Dijkstra distance to vertex 4 is 10');

// 4. Kruskal's Minimum Spanning Tree Weight
const edges = [
  { u: 1, v: 2, weight: 1 },
  { u: 0, v: 2, weight: 2 },
  { u: 3, v: 4, weight: 2 },
  { u: 0, v: 1, weight: 4 },
  { u: 1, v: 3, weight: 5 }
];
const parent = [0, 1, 2, 3, 4];
function find(i) { while (parent[i] !== i) i = parent[i]; return i; }
const mst = [];
edges.forEach(e => {
  const rootU = find(e.u);
  const rootV = find(e.v);
  if (rootU !== rootV) {
    mst.push(e);
    parent[rootU] = rootV;
  }
});
const totalMstWeight = mst.reduce((acc, e) => acc + e.weight, 0);
assert(mst.length === 4, 'MST connects 5 vertices with exactly 4 edges');
assert(totalMstWeight === 10, 'MST calculates minimum total tree weight = 10');

console.log('--- All Phase 4 Trees, Heaps & Graphs Tests Passed! ---');
