import * as acorn from 'acorn';
import {
  COMPLEXITY_CLASSES,
  LOOP_NODE_TYPES,
  STEP_TYPES
} from './astRules.js';

/**
 * Static Complexity Analyzer for JavaScript source code using Acorn AST parsing.
 * Analyzes loop nesting depths, loop step patterns, recursive call branching, and space allocations.
 */
export function analyzeJavaScriptComplexity(codeString) {
  if (!codeString || typeof codeString !== 'string' || !codeString.trim()) {
    return {
      success: false,
      error: 'Empty code input',
      explanation: 'Please provide valid JavaScript code to analyze.'
    };
  }

  try {
    const ast = acorn.parse(codeString, {
      ecmaVersion: 2020,
      locations: true,
      sourceType: 'module'
    });

    const detectedLoops = [];
    const detectedRecursion = [];
    const spaceAllocations = [];
    const ambiguousPatterns = [];

    let loopCounter = 0;
    let maxNestingDepth = 0;
    let astNodeCount = 0;

    // Helper to determine step type for a ForStatement
    function inspectLoopStep(node) {
      if (node.type === 'ForOfStatement' || node.type === 'ForInStatement') {
        return STEP_TYPES.LINEAR_INCREMENT;
      }

      if (node.type === 'ForStatement' && node.update) {
        const u = node.update;
        if (u.type === 'UpdateExpression' && (u.operator === '++' || u.operator === '--')) {
          return STEP_TYPES.LINEAR_INCREMENT;
        }
        if (u.type === 'AssignmentExpression') {
          if (u.operator === '+=' || u.operator === '-=') return STEP_TYPES.LINEAR_INCREMENT;
          if (u.operator === '*=') return STEP_TYPES.LOGARITHMIC_MULTIPLY;
          if (u.operator === '/=') return STEP_TYPES.LOGARITHMIC_DIVIDE;
          if (u.right && u.right.type === 'BinaryExpression') {
            if (u.right.operator === '*' || u.right.operator === '<<') return STEP_TYPES.LOGARITHMIC_MULTIPLY;
            if (u.right.operator === '/' || u.right.operator === '>>') return STEP_TYPES.LOGARITHMIC_DIVIDE;
          }
        }
      }

      // Check if while loop body has binary division / halving
      const codeSubstring = codeString.slice(node.start, node.end);
      if (/Math\.floor\s*\([^)]*\/\s*2\)/.test(codeSubstring) ||
          /(?:low|left)\s*=\s*(?:mid|middle)\s*\+\s*1/.test(codeSubstring) ||
          /(?:high|right)\s*=\s*(?:mid|middle)\s*-\s*1/.test(codeSubstring) ||
          /\w+\s*>>=\s*1/.test(codeSubstring) ||
          /\w+\s*\/=\s*2/.test(codeSubstring)) {
        return STEP_TYPES.LOGARITHMIC_DIVIDE;
      }

      if (node.type === 'WhileStatement' && node.test?.value === true) {
        ambiguousPatterns.push('Unbounded while(true) loop with dynamic break condition.');
        return STEP_TYPES.UNKNOWN;
      }

      return STEP_TYPES.LINEAR_INCREMENT;
    }

    // AST Walker tracking loop parent hierarchy and functions
    function walk(node, currentLoopParent = null, currentLoopDepth = 0, currentFunc = null) {
      if (!node) return;
      astNodeCount++;

      // Track Function Declarations & Expressions
      let funcContext = currentFunc;
      if (node.type === 'FunctionDeclaration' && node.id?.name) {
        funcContext = {
          name: node.id.name,
          loc: node.loc,
          calls: [],
          hasDivision: false,
          hasSubtraction: false
        };
      } else if (node.type === 'VariableDeclarator' && node.id?.name &&
                 (node.init?.type === 'FunctionExpression' || node.init?.type === 'ArrowFunctionExpression')) {
        funcContext = {
          name: node.id.name,
          loc: node.loc,
          calls: [],
          hasDivision: false,
          hasSubtraction: false
        };
      }

      // Detect Recursive Calls
      if (funcContext && node.type === 'CallExpression' && node.callee?.name === funcContext.name) {
        const line = node.loc?.start?.line || 0;
        const callArgs = codeString.slice(node.start, node.end);
        const isDivision = callArgs.includes('/ 2') || callArgs.includes('>> 1') || callArgs.includes('Math.floor');
        const isDecrement = callArgs.includes('- 1') || callArgs.includes('- 2') || callArgs.includes('--');

        funcContext.calls.push({ line, callArgs, isDivision, isDecrement });
        if (isDivision) funcContext.hasDivision = true;
        if (isDecrement) funcContext.hasSubtraction = true;
      }

      // Detect Space Allocations
      if (node.type === 'ArrayExpression') {
        spaceAllocations.push({
          type: 'Array Literal []',
          line: node.loc?.start?.line || 0,
          inLoopDepth: currentLoopDepth
        });
      } else if (node.type === 'NewExpression' && node.callee?.name) {
        spaceAllocations.push({
          type: `new ${node.callee.name}()`,
          line: node.loc?.start?.line || 0,
          inLoopDepth: currentLoopDepth
        });
      }

      // Detect Loops
      const isLoop = LOOP_NODE_TYPES.includes(node.type);
      let nextLoopDepth = currentLoopDepth;
      let loopId = null;

      if (isLoop) {
        loopCounter++;
        nextLoopDepth = currentLoopDepth + 1;
        if (nextLoopDepth > maxNestingDepth) {
          maxNestingDepth = nextLoopDepth;
        }

        const stepType = inspectLoopStep(node);
        loopId = `loop_${loopCounter}`;

        detectedLoops.push({
          id: loopId,
          type: node.type.replace('Statement', '').toLowerCase(),
          line: node.loc?.start?.line || 0,
          depth: nextLoopDepth,
          parentId: currentLoopParent,
          stepType
        });
      }

      // Traverse children
      for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
          if (Array.isArray(node[key])) {
            node[key].forEach(child => walk(child, isLoop ? loopId : currentLoopParent, nextLoopDepth, funcContext));
          } else if (node[key].type) {
            walk(node[key], isLoop ? loopId : currentLoopParent, nextLoopDepth, funcContext);
          }
        }
      }

      // Collect recursion if exiting function root
      if (funcContext && funcContext !== currentFunc && funcContext.calls.length > 0) {
        detectedRecursion.push(funcContext);
      }
    }

    walk(ast);

    // Synthesis: Determine Time & Space Complexity
    let estimatedTime = COMPLEXITY_CLASSES.CONSTANT;
    let estimatedSpace = COMPLEXITY_CLASSES.CONSTANT;
    let confidence = 'High';
    const explanations = [];

    // Evaluate Recursion first
    if (detectedRecursion.length > 0) {
      const rec = detectedRecursion[0];
      const callCount = rec.calls.length;

      if (callCount === 1) {
        if (rec.hasDivision) {
          estimatedTime = COMPLEXITY_CLASSES.LOGARITHMIC;
          estimatedSpace = COMPLEXITY_CLASSES.LOGARITHMIC;
          explanations.push(`Divide-and-conquer recursion detected in function "${rec.name}". Each level halves the problem space: O(log n) time, O(log n) call stack space.`);
        } else {
          estimatedTime = COMPLEXITY_CLASSES.LINEAR;
          estimatedSpace = COMPLEXITY_CLASSES.LINEAR;
          explanations.push(`Linear recursion detected in function "${rec.name}". Single recursive call reducing problem size: O(n) time and O(n) auxiliary call stack space.`);
        }
      } else if (callCount >= 2) {
        if (rec.hasSubtraction) {
          estimatedTime = COMPLEXITY_CLASSES.EXPONENTIAL;
          estimatedSpace = COMPLEXITY_CLASSES.LINEAR;
          confidence = 'High';
          explanations.push(`Multiple branching recursive calls (${callCount}) with linear reduction detected in "${rec.name}" (e.g. Fibonacci pattern): generates binary recursion tree of depth n yielding O(2ⁿ) time complexity with O(n) max call stack depth.`);
        } else if (rec.hasDivision) {
          estimatedTime = COMPLEXITY_CLASSES.LINEARITHMIC;
          estimatedSpace = COMPLEXITY_CLASSES.LOGARITHMIC;
          explanations.push(`Binary divide-and-conquer recursion detected in "${rec.name}" (e.g. Merge/Quick sort): O(n log n) time with O(log n) call stack.`);
        }
      }
    } else if (maxNestingDepth === 0) {
      // No loops, no recursion
      estimatedTime = COMPLEXITY_CLASSES.CONSTANT;
      estimatedSpace = COMPLEXITY_CLASSES.CONSTANT;
      explanations.push('No loops or recursive functions detected. Direct statement sequence executes in O(1) constant time with O(1) auxiliary space.');
    } else if (maxNestingDepth === 1) {
      const loop = detectedLoops[0];
      if (loop.stepType === STEP_TYPES.LOGARITHMIC_MULTIPLY || loop.stepType === STEP_TYPES.LOGARITHMIC_DIVIDE) {
        estimatedTime = COMPLEXITY_CLASSES.LOGARITHMIC;
        explanations.push(`Single loop detected at line ${loop.line} with logarithmic stride (stride halving/doubling): executes in O(log n) time.`);
      } else {
        estimatedTime = COMPLEXITY_CLASSES.LINEAR;
        if (detectedLoops.length > 1) {
          explanations.push(`${detectedLoops.length} sequential loops detected at nesting depth 1. Sequential loops execute consecutively (O(n) + O(n) = O(n)), preserving overall O(n) linear time.`);
        } else {
          explanations.push(`Single loop traverses the input at line ${loop.line}. Each iteration performs constant-time work: O(n) linear time complexity.`);
        }
      }
    } else if (maxNestingDepth === 2) {
      const hasLogLoop = detectedLoops.some(l => l.stepType === STEP_TYPES.LOGARITHMIC_DIVIDE || l.stepType === STEP_TYPES.LOGARITHMIC_MULTIPLY);
      if (hasLogLoop) {
        estimatedTime = COMPLEXITY_CLASSES.LINEARITHMIC;
        explanations.push('Nested loop hierarchy detected with one linear loop and one logarithmic halving/doubling loop: O(n log n) linearithmic time.');
      } else {
        estimatedTime = COMPLEXITY_CLASSES.QUADRATIC;
        explanations.push(`Double nested loop detected with maximum nesting depth of 2 (e.g., Bubble/Selection/Insertion sort). Outer loop runs n times and inner loop runs n times: O(n²) quadratic time.`);
      }
    } else if (maxNestingDepth === 3) {
      estimatedTime = COMPLEXITY_CLASSES.CUBIC;
      explanations.push('Triple nested loop hierarchy detected with depth 3 (e.g., Matrix Multiplication or 3-Sum): O(n³) cubic time.');
    } else if (maxNestingDepth >= 4) {
      estimatedTime = COMPLEXITY_CLASSES.POLYNOMIAL;
      explanations.push(`Deeply nested loops detected with depth ${maxNestingDepth}: O(n^${maxNestingDepth}) polynomial time.`);
    }

    // Evaluate Space Complexity based on allocations
    const inLoopAllocations = spaceAllocations.filter(s => s.inLoopDepth > 0);
    if (inLoopAllocations.length > 0) {
      if (maxNestingDepth >= 2) {
        estimatedSpace = COMPLEXITY_CLASSES.QUADRATIC;
        explanations.push(`Dynamic array/object allocation detected inside nested loop at line ${inLoopAllocations[0].line}: auxiliary space grows as O(n²).`);
      } else {
        estimatedSpace = COMPLEXITY_CLASSES.LINEAR;
        explanations.push(`Dynamic allocation inside loop at line ${inLoopAllocations[0].line}: auxiliary space scales linearly with input size O(n).`);
      }
    } else if (spaceAllocations.length > 0 && estimatedSpace === COMPLEXITY_CLASSES.CONSTANT) {
      estimatedSpace = COMPLEXITY_CLASSES.LINEAR;
      explanations.push(`Auxiliary memory allocated for data structure at line ${spaceAllocations[0].line}: O(n) auxiliary space.`);
    } else if (estimatedSpace === COMPLEXITY_CLASSES.CONSTANT) {
      explanations.push('Variables are primitive scalar registers; no dynamic auxiliary data structures scale with input size: O(1) auxiliary space.');
    }

    // Confidence adjustment
    if (ambiguousPatterns.length > 0) {
      confidence = 'Moderate';
    } else if (maxNestingDepth > 3) {
      confidence = 'Moderate';
    }

    return {
      success: true,
      estimatedTime,
      estimatedSpace,
      loopCount: detectedLoops.length,
      maxLoopDepth: maxNestingDepth,
      astNodeCount,
      parsedAt: new Date().toLocaleTimeString(),
      detectedLoops,
      detectedRecursion,
      spaceAllocations,
      ambiguousPatterns,
      confidence,
      explanation: explanations.join(' '),
      rawAst: JSON.stringify(ast, (k, v) => (k === 'loc' || k === 'start' || k === 'end' ? undefined : v), 2)
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      explanation: 'Failed to parse JavaScript syntax with Acorn AST parser. Please check for syntax errors.'
    };
  }
}
