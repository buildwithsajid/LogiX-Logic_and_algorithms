import { QUICK_SORT_JAVA } from '../../java/sorting/quickSort.java.js';

export function generateQuickSortSteps(initialArray) {
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
    javaLine: QUICK_SORT_JAVA.lineMap.RECURSE,
    explanation: 'Ready to begin Quick Sort divide-and-conquer recursion.'
  });

  function partition(low, high) {
    const pivot = arr[high];
    arrayAccesses++;
    let i = low - 1;

    steps.push({
      array: [...arr],
      highlightIndices: [high],
      highlightType: 'pivot',
      sortedIndices: [...sortedIndices],
      comparisons,
      swaps,
      arrayAccesses,
      pass: 0,
      currentIndices: { low, high, pivotIndex: high, pivotValue: pivot },
      javaLine: QUICK_SORT_JAVA.lineMap.SELECT_PIVOT,
      explanation: `Selected pivot = arr[${high}] (${pivot}) for partition range [${low}..${high}].`
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      arrayAccesses += 2;

      steps.push({
        array: [...arr],
        highlightIndices: [j, high],
        highlightType: 'compare',
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        arrayAccesses,
        pass: 0,
        currentIndices: { i, j, pivotIndex: high },
        javaLine: QUICK_SORT_JAVA.lineMap.COMPARE,
        explanation: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}).`
      });

      if (arr[j] <= pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swaps++;
        arrayAccesses += 4;

        steps.push({
          array: [...arr],
          highlightIndices: [i, j],
          highlightType: 'swap',
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          arrayAccesses,
          pass: 0,
          currentIndices: { i, j, pivotIndex: high },
          javaLine: QUICK_SORT_JAVA.lineMap.SWAP,
          explanation: `arr[${j}] <= pivot (${pivot}). Swapped arr[${i}] and arr[${j}].`
        });
      }
    }

    // Place pivot at its final position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    swaps++;
    arrayAccesses += 4;

    const pivotPos = i + 1;
    sortedIndices.push(pivotPos);

    steps.push({
      array: [...arr],
      highlightIndices: [pivotPos],
      highlightType: 'element_sorted',
      sortedIndices: [...sortedIndices],
      comparisons,
      swaps,
      arrayAccesses,
      pass: 0,
      currentIndices: { pivotPos },
      javaLine: QUICK_SORT_JAVA.lineMap.PIVOT_SWAP,
      explanation: `Pivot element ${arr[pivotPos]} placed at final partitioned position [${pivotPos}].`
    });

    return pivotPos;
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      if (!sortedIndices.includes(low)) {
        sortedIndices.push(low);
      }
    }
  }

  sort(0, n - 1);

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
    javaLine: QUICK_SORT_JAVA.lineMap.FINISHED,
    explanation: `Quick Sort completed with ${comparisons} comparisons and ${swaps} swaps.`
  });

  return steps;
}
