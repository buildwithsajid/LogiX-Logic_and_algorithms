import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateSelectionSortSteps,
  generateShellSortSteps,
  generateQuickSortSteps,
  generateRadixSortSteps,
  generateLinearSearchSteps,
  generateBinarySearchSteps
} from '../src/algorithms/index.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

console.log('--- Running LogiX Algorithm Correctness Tests ---');

const input = [64, 34, 25, 12, 22, 11, 90, 5];

// 1. Bubble Sort
const bubbleSteps = generateBubbleSortSteps(input);
const bubbleFinal = bubbleSteps[bubbleSteps.length - 1].array;
assert(isSorted(bubbleFinal), 'Bubble Sort produces sorted output');
assert(bubbleSteps.length > 5, 'Bubble Sort generates discrete operational steps');

// 2. Insertion Sort
const insertSteps = generateInsertionSortSteps(input);
const insertFinal = insertSteps[insertSteps.length - 1].array;
assert(isSorted(insertFinal), 'Insertion Sort produces sorted output');

// 3. Selection Sort
const selectSteps = generateSelectionSortSteps(input);
const selectFinal = selectSteps[selectSteps.length - 1].array;
assert(isSorted(selectFinal), 'Selection Sort produces sorted output');

// 4. Shell Sort
const shellSteps = generateShellSortSteps(input);
const shellFinal = shellSteps[shellSteps.length - 1].array;
assert(isSorted(shellFinal), 'Shell Sort produces sorted output');

// 5. Quick Sort
const quickSteps = generateQuickSortSteps(input);
const quickFinal = quickSteps[quickSteps.length - 1].array;
assert(isSorted(quickFinal), 'Quick Sort produces sorted output');

// 6. Radix Sort
const radixSteps = generateRadixSortSteps(input);
const radixFinal = radixSteps[radixSteps.length - 1].array;
assert(isSorted(radixFinal), 'Radix Sort produces sorted output');

// 7. Linear Search
const linearFound = generateLinearSearchSteps(input, 25);
assert(linearFound[linearFound.length - 1].highlightType === 'found', 'Linear search finds present key');
const linearNotFound = generateLinearSearchSteps(input, 999);
assert(linearNotFound[linearNotFound.length - 1].highlightType === 'not_found', 'Linear search reports missing key');

// 8. Binary Search
const binaryFound = generateBinarySearchSteps(input, 25);
assert(binaryFound[binaryFound.length - 1].highlightType === 'found', 'Binary search finds present key in sorted array');
const binaryNotFound = generateBinarySearchSteps(input, 999);
assert(binaryNotFound[binaryNotFound.length - 1].highlightType === 'not_found', 'Binary search reports missing key');

console.log('--- All 8 DSA Algorithm Correctness Tests Passed! ---');
