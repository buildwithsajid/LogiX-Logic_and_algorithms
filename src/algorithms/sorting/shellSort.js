import { SHELL_SORT_JAVA } from '../../java/sorting/shellSort.java.js';

export function generateShellSortSteps(initialArray) {
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
    javaLine: SHELL_SORT_JAVA.lineMap.GAP_LOOP,
    explanation: 'Ready to begin Shell Sort with diminishing gap sequence.'
  });

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    pass++;

    steps.push({
      array: [...arr],
      highlightIndices: [],
      highlightType: 'standby',
      sortedIndices: [],
      comparisons,
      swaps,
      arrayAccesses,
      pass,
      currentIndices: { gap },
      javaLine: SHELL_SORT_JAVA.lineMap.GAP_LOOP,
      explanation: `Starting pass with gap = ${gap}. Comparing elements separated by ${gap} positions.`
    });

    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      arrayAccesses++;
      let j = i;

      steps.push({
        array: [...arr],
        highlightIndices: [i],
        highlightType: 'select',
        sortedIndices: [],
        comparisons,
        swaps,
        arrayAccesses,
        pass,
        currentIndices: { gap, i, temp },
        javaLine: SHELL_SORT_JAVA.lineMap.STORE_TEMP,
        explanation: `Picked arr[${i}] (${temp}) for gapped insertion.`
      });

      while (j >= gap) {
        comparisons++;
        arrayAccesses++;

        steps.push({
          array: [...arr],
          highlightIndices: [j - gap, j],
          highlightType: 'compare',
          sortedIndices: [],
          comparisons,
          swaps,
          arrayAccesses,
          pass,
          currentIndices: { gap, i, j },
          javaLine: SHELL_SORT_JAVA.lineMap.COMPARE,
          explanation: `Comparing arr[${j - gap}] (${arr[j - gap]}) with temp (${temp}) at gap ${gap}.`
        });

        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          swaps++;
          arrayAccesses += 2;

          steps.push({
            array: [...arr],
            highlightIndices: [j - gap, j],
            highlightType: 'swap',
            sortedIndices: [],
            comparisons,
            swaps,
            arrayAccesses,
            pass,
            currentIndices: { gap, i, j },
            javaLine: SHELL_SORT_JAVA.lineMap.SHIFT,
            explanation: `Shifted arr[${j - gap}] forward by gap ${gap} to index ${j}.`
          });

          j -= gap;
        } else {
          break;
        }
      }

      arr[j] = temp;
      arrayAccesses++;

      steps.push({
        array: [...arr],
        highlightIndices: [j],
        highlightType: 'element_sorted',
        sortedIndices: [],
        comparisons,
        swaps,
        arrayAccesses,
        pass,
        currentIndices: { gap, j, temp },
        javaLine: SHELL_SORT_JAVA.lineMap.INSERT,
        explanation: `Placed temp (${temp}) at index ${j}.`
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
    javaLine: SHELL_SORT_JAVA.lineMap.FINISHED,
    explanation: `Shell Sort completed with ${comparisons} comparisons and ${swaps} gapped shifts.`
  });

  return steps;
}
