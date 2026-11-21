function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Running LogiX Phase 3 Basic Data Structures Tests ---');

// 1. Stack Operations Invariants
class TestStack {
  constructor(cap) {
    this.cap = cap;
    this.items = [];
  }
  push(val) {
    if (this.items.length >= this.cap) throw new Error('Stack Overflow');
    this.items.push(val);
  }
  pop() {
    if (this.items.length === 0) throw new Error('Stack Underflow');
    return this.items.pop();
  }
}

const stack = new TestStack(3);
stack.push(10);
stack.push(20);
stack.push(30);
assert(stack.items.length === 3, 'Stack pushes up to capacity');
let overflowTriggered = false;
try { stack.push(40); } catch (e) { overflowTriggered = true; }
assert(overflowTriggered, 'Stack throws overflow on exceeding capacity');
assert(stack.pop() === 30, 'Stack pop obeys LIFO');

// 2. Circular Queue Modulo Wrap-Around
class TestCircularQueue {
  constructor(size) {
    this.size = size;
    this.buf = new Array(size).fill(null);
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
  enqueue(val) {
    if (this.count === this.size) throw new Error('Queue Overflow');
    this.rear = (this.rear + 1) % this.size;
    this.buf[this.rear] = val;
    this.count++;
  }
  dequeue() {
    if (this.count === 0) throw new Error('Queue Underflow');
    const val = this.buf[this.front];
    this.buf[this.front] = null;
    this.front = (this.front + 1) % this.size;
    this.count--;
    return val;
  }
}

const cq = new TestCircularQueue(3);
cq.enqueue(1);
cq.enqueue(2);
cq.enqueue(3);
assert(cq.dequeue() === 1, 'Circular Queue dequeues from front');
cq.enqueue(4); // Wraps around to slot 0!
assert(cq.rear === 0, 'Circular Queue wraps rear pointer around modulo capacity');

// 3. Singly Linked List Reversal
function reverseList(arr) {
  return [...arr].reverse();
}
const list = [10, 20, 30, 40];
const rev = reverseList(list);
assert(rev[0] === 40 && rev[3] === 10, 'Linked list reversal inverts order correctly');

// 4. Polynomial Addition Invariant
function addPolynomials(p1, p2) {
  const map = new Map();
  p1.forEach(t => map.set(t.exp, (map.get(t.exp) || 0) + t.coeff));
  p2.forEach(t => map.set(t.exp, (map.get(t.exp) || 0) + t.coeff));
  return Array.from(map.entries())
    .map(([exp, coeff]) => ({ coeff, exp }))
    .sort((a, b) => b.exp - a.exp);
}
const p1 = [{ coeff: 5, exp: 3 }, { coeff: 2, exp: 0 }];
const p2 = [{ coeff: 3, exp: 3 }, { coeff: 4, exp: 1 }];
const polySum = addPolynomials(p1, p2);
assert(polySum[0].coeff === 8 && polySum[0].exp === 3, 'Polynomial addition combines like exponents 5x^3 + 3x^3 = 8x^3');

// 5. Hash Table Linear Probing
function insertLinearProbing(table, cap, key) {
  let slot = Math.abs(key) % cap;
  while (table[slot] !== null) {
    slot = (slot + 1) % cap;
  }
  table[slot] = key;
  return slot;
}
const hashTable = new Array(10).fill(null);
const s1 = insertLinearProbing(hashTable, 10, 12);
const s2 = insertLinearProbing(hashTable, 10, 22); // Collides at 2, probes to 3
assert(s1 === 2, 'Key 12 hashes to bucket 2');
assert(s2 === 3, 'Key 22 collides at bucket 2 and probes to bucket 3');

console.log('--- All Phase 3 Data Structures Tests Passed! ---');
