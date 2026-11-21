import { BUBBLE_SORT_JAVA } from '../../java/sorting/bubbleSort.java.js';

export function generateBubbleSortSteps(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];
  const sortedIndices = [];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;

  // Initial Standby Step
  steps.push({
    array: [...arr],
    highlightIndices: [],
    highlightType: 'standby',
    sortedIndices: [],
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0,
    pass: 0,
    currentIndices: {},
    javaLine: BUBBLE_SORT_JAVA.lineMap.OUTER_LOOP,
    explanation: 'Initial array loaded. Ready to begin Bubble Sort.'
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Comparison operation
      comparisons++;
      arrayAccesses += 2; // Reading arr[j] and arr[j + 1]

      steps.push({
        array: [...arr],
        highlightIndices: [j, j + 1],
        highlightType: 'compare',
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        arrayAccesses,
        pass: i + 1,
        currentIndices: { i, j },
        javaLine: BUBBLE_SORT_JAVA.lineMap.COMPARE,
        explanation: `Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]}).`
      });

      if (arr[j] > arr[j + 1]) {
        // Swap operation
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;
        arrayAccesses += 4; // Read/write temp, arr[j], arr[j+1]
        swapped = true;

        steps.push({
          array: [...arr],
          highlightIndices: [j, j + 1],
          highlightType: 'swap',
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          arrayAccesses,
          pass: i + 1,
          currentIndices: { i, j },
          javaLine: BUBBLE_SORT_JAVA.lineMap.SWAP,
          explanation: `Swapped: ${temp} > ${arr[j]} at positions ${j} and ${j + 1}.`
        });
      }
    }

    // Element at n - i - 1 is now in its permanent sorted place
    sortedIndices.push(n - i - 1);

    steps.push({
      array: [...arr],
      highlightIndices: [n - i - 1],
      highlightType: 'element_sorted',
      sortedIndices: [...sortedIndices],
      comparisons,
      swaps,
      arrayAccesses,
      pass: i + 1,
      currentIndices: { i },
      javaLine: BUBBLE_SORT_JAVA.lineMap.OUTER_LOOP,
      explanation: `Pass ${i + 1} completed. Element ${arr[n - i - 1]} placed in sorted position.`
    });

    if (!swapped) {
      // Early exit if array is already sorted
      break;
    }
  }

  // All elements are sorted
  const allSorted = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    highlightIndices: [],
    highlightType: 'sorted',
    sortedIndices: allSorted,
    comparisons,
    swaps,
    arrayAccesses,
    pass: n,
    currentIndices: {},
    javaLine: BUBBLE_SORT_JAVA.lineMap.FINISHED,
    explanation: `Array is fully sorted in ${comparisons} comparisons and ${swaps} swaps.`
  });

  return steps;
}
