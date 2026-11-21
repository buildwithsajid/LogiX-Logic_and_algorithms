import { LINEAR_SEARCH_JAVA } from '../../java/searching/linearSearch.java.js';

export function generateLinearSearchSteps(initialArray, target = 30) {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];

  let comparisons = 0;
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
    javaLine: LINEAR_SEARCH_JAVA.lineMap.LOOP,
    explanation: `Starting Linear Search for target = ${target}.`
  });

  let foundIndex = -1;

  for (let i = 0; i < n; i++) {
    comparisons++;
    arrayAccesses++;

    steps.push({
      array: [...arr],
      highlightIndices: [i],
      highlightType: 'compare',
      sortedIndices: [],
      comparisons,
      swaps: 0,
      arrayAccesses,
      pass: i + 1,
      currentIndices: { i, target },
      javaLine: LINEAR_SEARCH_JAVA.lineMap.COMPARE,
      explanation: `Checking arr[${i}] (${arr[i]}) against target ${target}.`
    });

    if (arr[i] === target) {
      foundIndex = i;

      steps.push({
        array: [...arr],
        highlightIndices: [i],
        highlightType: 'found',
        sortedIndices: [i],
        comparisons,
        swaps: 0,
        arrayAccesses,
        pass: i + 1,
        currentIndices: { i, target },
        javaLine: LINEAR_SEARCH_JAVA.lineMap.FOUND,
        explanation: `Target value ${target} found at index [${i}] in ${comparisons} comparisons!`
      });

      break;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      highlightIndices: [],
      highlightType: 'not_found',
      sortedIndices: [],
      comparisons,
      swaps: 0,
      arrayAccesses,
      pass: n,
      currentIndices: {},
      javaLine: LINEAR_SEARCH_JAVA.lineMap.NOT_FOUND,
      explanation: `Target value ${target} was not found in the entire array.`
    });
  }

  return steps;
}
