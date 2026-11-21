import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const JAVA_KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'static', 'void', 'int',
  'boolean', 'double', 'float', 'char', 'String', 'new', 'return',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
  'continue', 'import', 'package', 'this', 'super', 'null', 'true', 'false'
]);

const TOKEN_REGEX = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|(\b\d+\b)|(\b[a-zA-Z_]\w*\b)|(\s+)|([^\s\w]+)/g;

function tokenizeLine(line) {
  const tokens = [];
  let match;
  TOKEN_REGEX.lastIndex = 0;
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

export default function CodeEditor({
  code = '',
  language = 'java',
  activeLine = null,
  title = 'Java Reference Code',
  readOnly = true,
  onChange,
  className = '',
  highlightLines = []
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn('bg-[#0d1322] border border-brand-border rounded-xl overflow-hidden shadow-card font-mono text-sm flex flex-col', className)}>
      {/* Editor Header Bar */}
      <div className="bg-[#111827] px-4 py-2.5 border-b border-brand-border flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-brand-muted flex items-center gap-1.5 font-medium">
            <Code2 className="w-3.5 h-3.5 text-brand-primary" />
            {title}
          </span>
          <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary text-[10px] font-semibold uppercase tracking-wider">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-brand-card hover:bg-brand-cardHover text-brand-muted hover:text-white transition-colors border border-brand-border/80"
          title="Copy pure Java code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-sans">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="overflow-x-auto p-3 max-h-[500px] overflow-y-auto leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((lineContent, idx) => {
              const lineNum = idx + 1;
              const isCurrentActive = activeLine === lineNum || highlightLines.includes(lineNum);
              const tokens = tokenizeLine(lineContent);

              return (
                <tr
                  key={lineNum}
                  className={cn(
                    'transition-colors duration-150',
                    isCurrentActive
                      ? 'bg-brand-primary/20 border-l-2 border-brand-accent'
                      : 'hover:bg-slate-800/30'
                  )}
                >
                  {/* Line Number */}
                  <td className="w-10 pr-4 pl-2 text-right text-slate-600 select-none text-xs align-top">
                    <span className={cn(isCurrentActive && 'text-brand-accent font-bold')}>
                      {lineNum}
                    </span>
                  </td>

                  {/* Code Line Content */}
                  <td className="text-brand-text whitespace-pre font-mono text-[13px] py-0.5 pr-4">
                    {tokens.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      tokens.map((token, tIdx) => {
                        if (token.type === 'comment') {
                          return <span key={tIdx} className="text-slate-500 italic">{token.text}</span>;
                        }
                        if (token.type === 'string') {
                          return <span key={tIdx} className="text-emerald-400">{token.text}</span>;
                        }
                        if (token.type === 'number') {
                          return <span key={tIdx} className="text-amber-400 font-semibold">{token.text}</span>;
                        }
                        if (token.type === 'keyword') {
                          return <span key={tIdx} className="text-indigo-400 font-semibold">{token.text}</span>;
                        }
                        if (token.type === 'type') {
                          return <span key={tIdx} className="text-cyan-400">{token.text}</span>;
                        }
                        if (token.type === 'symbol') {
                          return <span key={tIdx} className="text-slate-400">{token.text}</span>;
                        }
                        return <span key={tIdx} className="text-brand-text">{token.text}</span>;
                      })
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
