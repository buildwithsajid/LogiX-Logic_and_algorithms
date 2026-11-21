import { SELECTION_SORT_JAVA } from '../../java/sorting/selectionSort.java.js';

export function generateSelectionSortSteps(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];
  const sortedIndices = [];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;

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
    javaLine: SELECTION_SORT_JAVA.lineMap.OUTER_LOOP,
    explanation: 'Ready to begin Selection Sort.'
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    arrayAccesses++;

    steps.push({
      array: [...arr],
      highlightIndices: [minIdx],
      highlightType: 'select',
      sortedIndices: [...sortedIndices],
      comparisons,
      swaps,
      arrayAccesses,
      pass: i + 1,
      currentIndices: { i, minIdx },
      javaLine: SELECTION_SORT_JAVA.lineMap.INIT_MIN,
      explanation: `Pass ${i + 1}: Initialized minimum index at arr[${i}] (${arr[i]}).`
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      arrayAccesses += 2;

      steps.push({
        array: [...arr],
        highlightIndices: [minIdx, j],
        highlightType: 'compare',
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        arrayAccesses,
        pass: i + 1,
        currentIndices: { i, minIdx, j },
        javaLine: SELECTION_SORT_JAVA.lineMap.COMPARE,
        explanation: `Comparing current min arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]}).`
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;

        steps.push({
          array: [...arr],
          highlightIndices: [minIdx],
          highlightType: 'select',
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          arrayAccesses,
          pass: i + 1,
          currentIndices: { i, minIdx, j },
          javaLine: SELECTION_SORT_JAVA.lineMap.UPDATE_MIN,
          explanation: `New minimum candidate found: arr[${minIdx}] (${arr[minIdx]}).`
        });
      }
    }

    // Swap minimum into position i
    if (minIdx !== i) {
      const temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
      swaps++;
      arrayAccesses += 4;

      steps.push({
        array: [...arr],
        highlightIndices: [i, minIdx],
        highlightType: 'swap',
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        arrayAccesses,
        pass: i + 1,
        currentIndices: { i, minIdx },
        javaLine: SELECTION_SORT_JAVA.lineMap.SWAP,
        explanation: `Swapped minimum element ${temp} into sorted position [${i}].`
      });
    }

    sortedIndices.push(i);
  }

  sortedIndices.push(n - 1);
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
    javaLine: SELECTION_SORT_JAVA.lineMap.FINISHED,
    explanation: `Selection Sort completed with ${comparisons} comparisons and ${swaps} swaps.`
  });

  return steps;
}
