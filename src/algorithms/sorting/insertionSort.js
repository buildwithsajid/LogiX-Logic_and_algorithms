import { INSERTION_SORT_JAVA } from '../../java/sorting/insertionSort.java.js';

export function generateInsertionSortSteps(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];
  const sortedIndices = [0];

  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 1; // Reading first element as initially sorted

  steps.push({
    array: [...arr],
    highlightIndices: [0],
    highlightType: 'element_sorted',
    sortedIndices: [0],
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 1,
    pass: 0,
    currentIndices: {},
    javaLine: INSERTION_SORT_JAVA.lineMap.OUTER_LOOP,
    explanation: 'First element arr[0] is trivially sorted on its own.'
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    arrayAccesses++; // Read key
    let j = i - 1;

    steps.push({
      array: [...arr],
      highlightIndices: [i],
      highlightType: 'select',
      sortedIndices: [...sortedIndices],
      comparisons,
      swaps,
      arrayAccesses,
      pass: i,
      currentIndices: { i, key },
      javaLine: INSERTION_SORT_JAVA.lineMap.SELECT_KEY,
      explanation: `Selected key = ${key} at index ${i} to insert into sorted prefix arr[0..${i - 1}].`
    });

    while (j >= 0) {
      comparisons++;
      arrayAccesses++; // Read arr[j]

      steps.push({
        array: [...arr],
        highlightIndices: [j, j + 1],
        highlightType: 'compare',
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        arrayAccesses,
        pass: i,
        currentIndices: { i, j, key },
        javaLine: INSERTION_SORT_JAVA.lineMap.COMPARE,
        explanation: `Comparing key (${key}) with arr[${j}] (${arr[j]}).`
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++; // Treating shift as element movement
        arrayAccesses += 2; // Read & write arr[j + 1]

        steps.push({
          array: [...arr],
          highlightIndices: [j, j + 1],
          highlightType: 'swap',
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          arrayAccesses,
          pass: i,
          currentIndices: { i, j, key },
          javaLine: INSERTION_SORT_JAVA.lineMap.SHIFT,
          explanation: `Shifted arr[${j}] (${arr[j + 1]}) rightward to position ${j + 1}.`
        });

        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    arrayAccesses++; // Write key
    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      highlightIndices: [j + 1],
      highlightType: 'element_sorted',
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      comparisons,
      swaps,
      arrayAccesses,
      pass: i,
      currentIndices: { i, insertedAt: j + 1 },
      javaLine: INSERTION_SORT_JAVA.lineMap.INSERT_KEY,
      explanation: `Inserted key ${key} into correct position [${j + 1}].`
    });
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
    pass: n,
    currentIndices: {},
    javaLine: INSERTION_SORT_JAVA.lineMap.FINISHED,
    explanation: `Insertion Sort completed with ${comparisons} comparisons and ${swaps} shifts.`
  });

  return steps;
}
