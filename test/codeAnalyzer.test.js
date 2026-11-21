import { analyzeJavaScriptComplexity } from '../src/analysis/javascript/complexityAnalyzer.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('--- Running LogiX Phase 7: JavaScript Code Analyzer AST Tests ---');

// 1. Single Loop Linear Search -> O(n)
const linearCode = `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
`;
const linearRes = analyzeJavaScriptComplexity(linearCode);
assert(linearRes.success, 'Linear Search parsed successfully');
assert(linearRes.estimatedTime === 'O(n)', `Linear Search estimated as O(n) (got: ${linearRes.estimatedTime})`);
assert(linearRes.maxLoopDepth === 1, 'Max loop depth is 1');
assert(linearRes.loopCount === 1, 'Loop count is 1');

// 2. Double Nested Loop Bubble Sort -> O(n²)
const bubbleCode = `
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}
`;
const bubbleRes = analyzeJavaScriptComplexity(bubbleCode);
assert(bubbleRes.success, 'Bubble Sort parsed successfully');
assert(bubbleRes.estimatedTime === 'O(n²)', `Bubble Sort estimated as O(n²) (got: ${bubbleRes.estimatedTime})`);
assert(bubbleRes.maxLoopDepth === 2, 'Max loop depth is 2');
assert(bubbleRes.loopCount === 2, 'Loop count is 2');

// 3. Triple Nested Loop -> O(n³)
const cubicCode = `
function threeSum(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === 0) return true;
      }
    }
  }
  return false;
}
`;
const cubicRes = analyzeJavaScriptComplexity(cubicCode);
assert(cubicRes.success, 'Triple loop parsed successfully');
assert(cubicRes.estimatedTime === 'O(n³)', `Triple loop estimated as O(n³) (got: ${cubicRes.estimatedTime})`);
assert(cubicRes.maxLoopDepth === 3, 'Max loop depth is 3');

// 4. Sequential Independent Loops -> O(n) (Additive, not Multiplicative)
const seqCode = `
function processTwoPasses(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[j]);
  }
}
`;
const seqRes = analyzeJavaScriptComplexity(seqCode);
assert(seqRes.success, 'Sequential loops parsed successfully');
assert(seqRes.estimatedTime === 'O(n)', `Sequential loops recognized as additive O(n) (got: ${seqRes.estimatedTime})`);
assert(seqRes.maxLoopDepth === 1, 'Max loop depth is 1 for sequential loops');
assert(seqRes.loopCount === 2, 'Loop count is 2');

// 5. Logarithmic Halving / Multiplication Loop -> O(log n)
const logCode = `
function logLoop(n) {
  for (let i = 1; i < n; i *= 2) {
    console.log(i);
  }
}
`;
const logRes = analyzeJavaScriptComplexity(logCode);
assert(logRes.success, 'Logarithmic loop parsed successfully');
assert(logRes.estimatedTime === 'O(log n)', `Logarithmic loop estimated as O(log n) (got: ${logRes.estimatedTime})`);

// 6. Branching Recursion Fibonacci -> O(2ⁿ)
const fibCode = `
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
`;
const fibRes = analyzeJavaScriptComplexity(fibCode);
assert(fibRes.success, 'Fibonacci parsed successfully');
assert(fibRes.estimatedTime === 'O(2ⁿ)', `Branching Fibonacci recognized as O(2ⁿ) (got: ${fibRes.estimatedTime})`);
assert(fibRes.detectedRecursion.length > 0, 'Recursion detected in Fibonacci');

// 7. Constant-Time Statement Block -> O(1)
const constCode = `
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
`;
const constRes = analyzeJavaScriptComplexity(constCode);
assert(constRes.success, 'Constant swap parsed successfully');
assert(constRes.estimatedTime === 'O(1)', `Constant block estimated as O(1) (got: ${constRes.estimatedTime})`);
assert(constRes.maxLoopDepth === 0, 'Max loop depth is 0');

// 8. Space Complexity Allocation -> O(n²)
const spaceCode = `
function makeMatrix(n) {
  let mat = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    mat.push(row);
  }
}
`;
const spaceRes = analyzeJavaScriptComplexity(spaceCode);
assert(spaceRes.success, 'Matrix allocation parsed');
assert(spaceRes.estimatedSpace === 'O(n²)', `Matrix allocation recognized as O(n²) space (got: ${spaceRes.estimatedSpace})`);

// 9. Syntax Error Handling
const errRes = analyzeJavaScriptComplexity('function broken( {');
assert(!errRes.success, 'Syntax error caught gracefully');
assert(errRes.error !== undefined, 'Error message populated');

console.log('🎉 All Phase 7 JavaScript Code Analyzer Tests Passed Successfully!');
