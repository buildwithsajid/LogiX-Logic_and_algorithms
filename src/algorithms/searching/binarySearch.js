import { BINARY_SEARCH_JAVA } from '../../java/searching/binarySearch.java.js';

export function generateBinarySearchSteps(initialArray, target = 30) {
  // Binary search requires sorted array
  const arr = [...initialArray].sort((a, b) => a - b);
  const n = arr.length;
  const steps = [];

  let comparisons = 0;
  let arrayAccesses = 0;
  let low = 0;
  let high = n - 1;
  let foundIndex = -1;

  steps.push({
    array: [...arr],
    highlightIndices: [],
    searchRange: [low, high],
    highlightType: 'standby',
    sortedIndices: [],
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0,
    pass: 0,
    currentIndices: { low, high, target },
    javaLine: BINARY_SEARCH_JAVA.lineMap.INIT_RANGE,
    explanation: `Array sorted for Binary Search. Target = ${target}. Range: [${low}..${high}].`
  });

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    comparisons++;
    arrayAccesses++;

    steps.push({
      array: [...arr],
      highlightIndices: [mid],
      searchRange: [low, high],
      highlightType: 'compare',
      sortedIndices: [],
      comparisons,
      swaps: 0,
      arrayAccesses,
      pass: 0,
      currentIndices: { low, high, mid, target },
      javaLine: BINARY_SEARCH_JAVA.lineMap.CALC_MID,
      explanation: `Calculated mid = ${mid}. Comparing arr[${mid}] (${arr[mid]}) with target ${target}.`
    });

    if (arr[mid] === target) {
      foundIndex = mid;

      steps.push({
        array: [...arr],
        highlightIndices: [mid],
        searchRange: [mid, mid],
        highlightType: 'found',
        sortedIndices: [mid],
        comparisons,
        swaps: 0,
        arrayAccesses,
        pass: 0,
        currentIndices: { mid, target },
        javaLine: BINARY_SEARCH_JAVA.lineMap.FOUND,
        explanation: `Target value ${target} found at middle index [${mid}] in ${comparisons} comparison(s)!`
      });

      break;
    } else if (arr[mid] < target) {
      low = mid + 1;

      steps.push({
        array: [...arr],
        highlightIndices: [mid],
        searchRange: [low, high],
        highlightType: 'range_update',
        sortedIndices: [],
        comparisons,
        swaps: 0,
        arrayAccesses,
        pass: 0,
        currentIndices: { low, high, mid },
        javaLine: BINARY_SEARCH_JAVA.lineMap.SHIFT_RIGHT,
        explanation: `arr[${mid}] (${arr[mid]}) < ${target}. Discarding left half; new search range is [${low}..${high}].`
      });
    } else {
      high = mid - 1;

      steps.push({
        array: [...arr],
        highlightIndices: [mid],
        searchRange: [low, high],
        highlightType: 'range_update',
        sortedIndices: [],
        comparisons,
        swaps: 0,
        arrayAccesses,
        pass: 0,
        currentIndices: { low, high, mid },
        javaLine: BINARY_SEARCH_JAVA.lineMap.SHIFT_LEFT,
        explanation: `arr[${mid}] (${arr[mid]}) > ${target}. Discarding right half; new search range is [${low}..${high}].`
      });
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      highlightIndices: [],
      searchRange: [],
      highlightType: 'not_found',
      sortedIndices: [],
      comparisons,
      swaps: 0,
      arrayAccesses,
      pass: 0,
      currentIndices: {},
      javaLine: BINARY_SEARCH_JAVA.lineMap.NOT_FOUND,
      explanation: `Target value ${target} does not exist in the array.`
    });
  }

  return steps;
}
