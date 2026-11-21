import { JAVA_LAB_CATALOG, JAVA_CATEGORIES } from '../src/java/javaLabCatalog.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Running LogiX Phase 6: Java Reference Code Lab Tests ---');

// 1. Catalog completeness
assert(JAVA_LAB_CATALOG.length >= 18, `Catalog contains all major syllabus topics (${JAVA_LAB_CATALOG.length} items)`);

// 2. All items have valid required fields
for (const item of JAVA_LAB_CATALOG) {
  assert(item.id && typeof item.id === 'string', `Item ${item.title} has valid id`);
  assert(item.title.endsWith('.java'), `Item ${item.title} has .java extension`);
  assert(item.code && item.code.includes('public class'), `Item ${item.title} contains valid Java public class declaration`);
  assert(item.time && item.time.startsWith('O('), `Item ${item.title} contains standard Big-O time complexity`);
  assert(item.methods && item.methods.length > 0, `Item ${item.title} contains method explanations`);
  assert(item.demoTrace && item.demoTrace.length > 0, `Item ${item.title} has line-by-line trace steps`);
}

// 3. Category coverage
const presentCategories = new Set(JAVA_LAB_CATALOG.map(i => i.category));
const requiredCategories = ['Sorting', 'Searching', 'Stacks & Queues', 'Linked Lists', 'Trees & Heaps', 'Graphs', 'Hashing'];

for (const reqCat of requiredCategories) {
  assert(presentCategories.has(reqCat), `Required syllabus category "${reqCat}" is represented in Java Lab`);
}

// 4. Sample trace verification
const bubble = JAVA_LAB_CATALOG.find(i => i.id === 'bubble-sort');
assert(bubble !== undefined, 'Bubble sort entry found');
assert(bubble.demoTrace[0].activeLine > 0, 'Bubble sort trace has activeLine > 0');
assert(bubble.expectedOutput.includes('['), 'Bubble sort has expected array output format');

const bst = JAVA_LAB_CATALOG.find(i => i.id === 'bst');
assert(bst !== undefined, 'BST entry found');
assert(bst.code.includes('insert'), 'BST code contains insert method');

const dijkstra = JAVA_LAB_CATALOG.find(i => i.id === 'dijkstra');
assert(dijkstra !== undefined, 'Dijkstra entry found');
assert(dijkstra.code.includes('dijkstra'), 'Dijkstra code contains dijkstra method');

console.log('🎉 All Phase 6 Java Reference Code Lab Tests Passed Successfully!');
