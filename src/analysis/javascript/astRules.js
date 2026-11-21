/**
 * Acorn AST Complexity Analysis Rules & Constants
 * Formulates classification rules for loop nesting, step patterns, and recursion.
 */

export const COMPLEXITY_CLASSES = {
  CONSTANT: 'O(1)',
  LOGARITHMIC: 'O(log n)',
  LINEAR: 'O(n)',
  LINEARITHMIC: 'O(n log n)',
  QUADRATIC: 'O(n²)',
  CUBIC: 'O(n³)',
  POLYNOMIAL: 'O(n^k)',
  EXPONENTIAL: 'O(2ⁿ)',
  FACTORIAL: 'O(n!)'
};

export const LOOP_NODE_TYPES = [
  'ForStatement',
  'WhileStatement',
  'DoWhileStatement',
  'ForOfStatement',
  'ForInStatement'
];

export const ALLOCATION_PATTERNS = [
  'ArrayExpression',
  'NewExpression'
];

export const STEP_TYPES = {
  LINEAR_INCREMENT: 'linear_increment', // i++, i += 1, i--
  LOGARITHMIC_MULTIPLY: 'logarithmic_multiply', // i *= 2, i = i * 2
  LOGARITHMIC_DIVIDE: 'logarithmic_divide', // i /= 2, i >>= 1, mid = (low+high)/2
  UNKNOWN: 'unknown'
};
