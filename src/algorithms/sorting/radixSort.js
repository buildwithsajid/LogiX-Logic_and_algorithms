import { RADIX_SORT_JAVA } from '../../java/sorting/radixSort.java.js';

export function generateRadixSortSteps(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;
  let pass = 0;

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
    javaLine: RADIX_SORT_JAVA.lineMap.GET_MAX,
    explanation: 'Ready to begin LSD (Least Significant Digit) Radix Sort.'
  });

  // Find max
  let max = arr[0];
  arrayAccesses++;
  for (let i = 1; i < n; i++) {
    comparisons++;
    arrayAccesses++;
    if (arr[i] > max) max = arr[i];
  }

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    pass++;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    const digitName = exp === 1 ? "1's units" : exp === 10 ? "10's tens" : `${exp}'s`;

    steps.push({
      array: [...arr],
      highlightIndices: [],
      highlightType: 'standby',
      sortedIndices: [],
      comparisons,
      swaps,
      arrayAccesses,
      pass,
      currentIndices: { exp },
      javaLine: RADIX_SORT_JAVA.lineMap.EXP_LOOP,
      explanation: `Pass ${pass}: Sorting elements according to ${digitName} place digit.`
    });

    // Count occurrences
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      arrayAccesses++;

      steps.push({
        array: [...arr],
        highlightIndices: [i],
        highlightType: 'select',
        sortedIndices: [],
        comparisons,
        swaps,
        arrayAccesses,
        pass,
        currentIndices: { i, digit, exp },
        javaLine: RADIX_SORT_JAVA.lineMap.COUNT_BUCKET,
        explanation: `Inspecting arr[${i}] (${arr[i]}): digit at ${digitName} place is ${digit}. Bucket count: ${count[digit]}.`
      });
    }

    // Cumulative sum
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      const targetPos = count[digit] - 1;
      output[targetPos] = arr[i];
      count[digit]--;
      arrayAccesses += 2;
    }

    // Copy back to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      swaps++;
      arrayAccesses += 2;

      steps.push({
        array: [...arr],
        highlightIndices: [i],
        highlightType: 'swap',
        sortedIndices: [],
        comparisons,
        swaps,
        arrayAccesses,
        pass,
        currentIndices: { i },
        javaLine: RADIX_SORT_JAVA.lineMap.COPY_BACK,
        explanation: `Replaced index ${i} with bucket-sorted value ${arr[i]}.`
      });
    }
  }

  const allSorted = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    highlightIndices: [],
    highlightType: 'sorted',
    sortedIndices: allSorted,
    comparisons,
    swaps,
    arrayAccesses,
    pass,
    currentIndices: {},
    javaLine: RADIX_SORT_JAVA.lineMap.FINISHED,
    explanation: `Radix Sort completed in ${pass} digit passes.`
  });

  return steps;
}
