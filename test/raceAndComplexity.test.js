import {
  THEORETICAL_CLASSES,
  generateTheoreticalData,
  DSA_COMPLEXITY_DIRECTORY,
  BENCHMARK_PAIRS,
  runEmpiricalBenchmark
} from '../src/algorithms/complexity/complexityData.js';
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps
} from '../src/algorithms/index.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Running LogiX Phase 5: Race Mode & Complexity Tests ---');

// 1. Theoretical Curves Generation
const theoreticalData = generateTheoreticalData(64);
assert(Array.isArray(theoreticalData) && theoreticalData.length > 5, 'Theoretical data generates multiple sample points');
const p16 = theoreticalData.find(p => p.n === 16);
assert(p16 !== undefined, 'Point n=16 exists in theoretical data');
assert(p16['O(1)'] === 1, 'O(1) value is 1');
assert(p16['O(n)'] === 16, 'O(n) value is 16');
assert(p16['O(n²)'] === 256, 'O(n²) value is 256');
assert(p16['O(log n)'] === 4, 'O(log n) value for n=16 is 4');

// 2. Master DSA Complexity Directory
assert(DSA_COMPLEXITY_DIRECTORY.length >= 15, `DSA Directory contains comprehensive syllabus items (${DSA_COMPLEXITY_DIRECTORY.length} items)`);
const bubbleEntry = DSA_COMPLEXITY_DIRECTORY.find(d => d.id === 'bubble-sort');
assert(bubbleEntry && bubbleEntry.bestTime === 'O(n)' && bubbleEntry.worstTime === 'O(n²)', 'Bubble Sort entry has accurate Big-O specs');

const bstEntry = DSA_COMPLEXITY_DIRECTORY.find(d => d.id === 'bst-ds');
assert(bstEntry && bstEntry.avgTime === 'O(log n)', 'BST entry has average O(log n)');

// 3. Syllabus Benchmark Pairs
assert(BENCHMARK_PAIRS.length >= 4, `Benchmark pairs defined (${BENCHMARK_PAIRS.length} pairs)`);
const bVsQ = BENCHMARK_PAIRS.find(p => p.id === 'bubble-vs-quick');
assert(bVsQ && bVsQ.algoA.name === 'Bubble Sort' && bVsQ.algoB.name === 'Quick Sort', 'Bubble vs Quick benchmark pair verified');

// 4. Empirical Benchmark Execution
const bubbleEmpirical = runEmpiricalBenchmark('bubble', 'random', [10, 20]);
assert(bubbleEmpirical.length === 2, 'Bubble Sort empirical benchmark completed for 2 sizes');
assert(bubbleEmpirical[0].comparisons > 0, 'Bubble Sort comparisons measured');
assert(bubbleEmpirical[1].totalOps > bubbleEmpirical[0].totalOps, 'Bubble Sort operations scale with input size');

const quickEmpirical = runEmpiricalBenchmark('quick', 'random', [10, 20]);
assert(quickEmpirical.length === 2, 'Quick Sort empirical benchmark completed');
assert(quickEmpirical[1].comparisons > 0, 'Quick Sort comparisons measured');

const linearEmpirical = runEmpiricalBenchmark('linear-search', 'random', [10, 20]);
assert(linearEmpirical.length === 2, 'Linear Search empirical benchmark completed');

// 5. Algorithm Race Simulation Consistency
const testArr = [50, 20, 80, 10, 30, 70, 40, 60];
const algos = [
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps
];

for (const algoGen of algos) {
  const steps = algoGen(testArr);
  const lastStep = steps[steps.length - 1];
  assert(lastStep.array.length === testArr.length, 'Algorithm produced full sorted array');
  // Check sorted
  for (let i = 0; i < lastStep.array.length - 1; i++) {
    assert(lastStep.array[i] <= lastStep.array[i + 1], 'Array is strictly sorted at end of race steps');
  }
}

console.log('🎉 All Phase 5 Race and Complexity Tests Passed Successfully!');
