const JAVA_KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'static', 'void', 'int',
  'boolean', 'double', 'float', 'char', 'String', 'new', 'return',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
  'continue', 'import', 'package', 'this', 'super', 'null', 'true', 'false'
]);

const TOKEN_REGEX = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|(\b\d+\b)|(\b[a-zA-Z_]\w*\b)|(\s+)|([^\s\w]+)/g;

function tokenize(line) {
  const tokens = [];
  let match;
  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [full, comment, str, num, word, space, symbol] = match;
    if (comment) tokens.push({ text: comment, type: 'comment' });
    else if (str) tokens.push({ text: str, type: 'string' });
    else if (num) tokens.push({ text: num, type: 'number' });
    else if (word) {
      if (JAVA_KEYWORDS.has(word)) tokens.push({ text: word, type: 'keyword' });
      else if (/^[A-Z]/.test(word)) tokens.push({ text: word, type: 'type' });
      else tokens.push({ text: word, type: 'identifier' });
    } else if (space) tokens.push({ text: space, type: 'space' });
    else tokens.push({ text: symbol, type: 'symbol' });
  }
  return tokens;
}

const lines = [
  'for (int i = 0; i < n - 1; i++) {',
  '    if (arr[j] > arr[j + 1]) {',
  '        // Swap elements',
  '        int temp = arr[j];',
  '        arr[j] = arr[j + 1];',
  '        arr[j + 1] = temp;',
  '    }',
  '}'
];

for (const line of lines) {
  const tokens = tokenize(line);
  const reconstructed = tokens.map(t => t.text).join('');
  if (reconstructed !== line) {
    console.error('MISMATCH!');
    process.exit(1);
  }
}

console.log('Lexer test passed 100%! All lines reconstructed cleanly without any artifacts.');
