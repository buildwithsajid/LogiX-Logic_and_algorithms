function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Running LogiX Phase 8: Playground & Simulations Tests ---');

// 1. Custom Array Input Validation
function parseCustomArray(inputStr) {
  if (!inputStr || !inputStr.trim()) throw new Error('Empty input');
  const nums = inputStr.split(',').map(s => {
    const val = Number(s.trim());
    if (isNaN(val)) throw new Error(`Invalid number: "${s.trim()}"`);
    return val;
  });
  if (nums.length < 2) throw new Error('Minimum 2 numbers required');
  return nums;
}

const parsedArr = parseCustomArray('45, 12, 89, 23, 7');
assert(parsedArr.length === 5 && parsedArr[0] === 45 && parsedArr[4] === 7, 'Custom array parsed valid numbers');
let caughtErr = false;
try {
  parseCustomArray('45, abc, 12');
} catch {
  caughtErr = true;
}
assert(caughtErr, 'Invalid non-number token correctly throws validation error');

// 2. Stack LIFO Sandbox Logic
const stack = [];
const cap = 4;
stack.push(10);
stack.push(20);
stack.push(30);
assert(stack[stack.length - 1] === 30, 'Stack peek returns top element 30');
const popped = stack.pop();
assert(popped === 30, 'Stack pop obeys LIFO returning 30');
assert(stack.length === 2, 'Stack size reduced to 2 after pop');

// 3. Linked List Sandbox In-Place Reversal
const ll = [10, 20, 30, 40];
const reversedLl = [...ll].reverse();
assert(reversedLl[0] === 40 && reversedLl[3] === 10, 'Linked list reversal inverts node order');

// 4. BST Node Insertion Invariant
function insertBST(node, key) {
  if (!node) return { key, left: null, right: null };
  if (key < node.key) node.left = insertBST(node.left, key);
  else if (key > node.key) node.right = insertBST(node.right, key);
  return node;
}

let bstRoot = null;
const bstKeys = [50, 30, 70, 20, 40, 60, 80];
for (const k of bstKeys) {
  bstRoot = insertBST(bstRoot, k);
}
assert(bstRoot.key === 50, 'BST root is 50');
assert(bstRoot.left.key === 30, 'BST left child of 50 is 30');
assert(bstRoot.right.key === 70, 'BST right child of 50 is 70');
assert(bstRoot.left.left.key === 20, 'BST left-left grandchild is 20');

// 5. Hash Table Linear Probing Collision Resolution
const M = 10;
const table = new Array(M).fill(null);
const hashKeys = [12, 22, 32]; // All hash to slot 2 (12 % 10 = 2)

for (const k of hashKeys) {
  const originalSlot = k % M;
  let slot = originalSlot;
  while (table[slot] !== null) {
    slot = (slot + 1) % M;
  }
  table[slot] = k;
}
assert(table[2] === 12, 'Key 12 occupies primary bucket 2');
assert(table[3] === 22, 'Key 22 collides at 2 and linearly probes to slot 3');
assert(table[4] === 32, 'Key 32 collides at 2 & 3 and linearly probes to slot 4');

// 6. Simulation 1: ER Priority Queue Triage
const patients = [
  { name: 'Bob', p: 3 },
  { name: 'Alice', p: 1 },
  { name: 'Charlie', p: 2 }
];
patients.sort((a, b) => a.p - b.p);
assert(patients[0].name === 'Alice' && patients[0].p === 1, 'Triage priority 1 correctly promoted to root');

// 7. Simulation 2: Music Playlist Circular Modulo Indexing
const playlistLen = 4;
let curTrack = 3; // last track
const nextTrack = (curTrack + 1) % playlistLen;
assert(nextTrack === 0, 'Circular linked list next track wraps from tail to head (0)');
const prevTrack = (0 - 1 + playlistLen) % playlistLen;
assert(prevTrack === 3, 'Circular linked list prev track wraps from head (0) to tail (3)');

// 8. Simulation 3: Browser Dual-Stack Navigation
let backStk = ['google.com', 'github.com'];
let forwardStk = ['stackoverflow.com'];
let curUrl = 'wikipedia.org';

// Navigate to new URL
backStk.push(curUrl);
curUrl = 'reddit.com';
forwardStk = []; // Browser rule: new navigation wipes forward history
assert(forwardStk.length === 0, 'New navigation clears forward stack');
assert(backStk[backStk.length - 1] === 'wikipedia.org', 'Back stack holds previous URL');

// 9. Simulation 4: Printer FIFO Queue
const printQ = ['Doc1.pdf', 'Doc2.pdf', 'Doc3.pdf'];
const printedFirst = printQ.shift();
assert(printedFirst === 'Doc1.pdf', 'Printer queue obeys First-In First-Out fairness');

// 10. Simulation 5: Dijkstra Route Finder
const edges = [
  { u: 0, v: 1, w: 4 },
  { u: 0, v: 2, w: 7 },
  { u: 1, v: 3, w: 6 },
  { u: 1, v: 4, w: 5 },
  { u: 2, v: 4, w: 3 },
  { u: 3, v: 5, w: 5 },
  { u: 4, v: 5, w: 4 },
  { u: 3, v: 4, w: 2 }
];
// Shortest path from 0 (Central Station) to 5 (Harbor Port):
// 0 -> 1 (4) -> 4 (5) = 9 -> 5 (4) = 13
// OR 0 -> 2 (7) -> 4 (3) = 10 -> 5 (4) = 14
// OR 0 -> 1 (4) -> 4 (5) -> 3 (2)? 0->1(4)->4(5)->3(2)->5(5) = 16
// OR 0 -> 1 (4) -> 3 (6) -> 5 (5) = 15
// Best path is 0 -> 1 -> 4 -> 5 with total weight 13!
function dijkstraSim(V, src, dest) {
  const dist = new Array(V).fill(Infinity);
  const vis = new Array(V).fill(false);
  dist[src] = 0;

  for (let count = 0; count < V - 1; count++) {
    let min = Infinity, u = -1;
    for (let v = 0; v < V; v++) {
      if (!vis[v] && dist[v] < min) { min = dist[v]; u = v; }
    }
    if (u === -1) break;
    vis[u] = true;

    edges.forEach(e => {
      let neighbor = -1;
      if (e.u === u) neighbor = e.v;
      else if (e.v === u) neighbor = e.u;
      if (neighbor !== -1 && !vis[neighbor] && dist[u] + e.w < dist[neighbor]) {
        dist[neighbor] = dist[u] + e.w;
      }
    });
  }
  return dist[dest];
}

const shortestDist = dijkstraSim(6, 0, 5);
assert(shortestDist === 13, `Dijkstra shortest path computed accurately = 13 km (got: ${shortestDist})`);

console.log('🎉 All Phase 8 Playground & Real-World Simulation Tests Passed Successfully!');
