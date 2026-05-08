'use client'

import * as React from 'react'
import { Copy, Check } from 'lucide-react'

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showCopy?: boolean
  maxHeight?: string
}

const KEYWORDS = [
  'const',
  'let',
  'var',
  'function',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'new',
  'this',
  'class',
  'extends',
  'import',
  'export',
  'default',
  'from',
  'async',
  'await',
  'try',
  'catch',
  'finally',
  'throw',
  'typeof',
  'instanceof',
  'true',
  'false',
  'null',
  'undefined',
  'void',
  'type',
  'interface',
  'enum',
  'namespace',
  'public',
  'private',
  'protected',
  'readonly',
  'static',
  'abstract',
  'implements',
  'of',
  'in',
]

function highlight(code: string): string {
  // Escape HTML first
  let result = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Comments (line)
  result = result.replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>')

  // Comments (block)
  result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>')

  // Strings (double, single, template)
  result = result.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span class="tok-string">$1</span>',
  )

  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>')

  // Keywords (only outside already-wrapped spans)
  const keywordRegex = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g')
  // Only apply keyword highlighting to text not already inside a span
  result = result.replace(/>([^<]*)</g, (match, text) => {
    return '>' + text.replace(keywordRegex, '<span class="tok-keyword">$1</span>') + '<'
  })

  return result
}

export function CodeBlock({
  code,
  language,
  filename,
  showCopy = true,
  maxHeight,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const hasHeader = filename || language || showCopy

  return (
    <div className="ui-code-block">
      {hasHeader && (
        <div className="ui-code-header">
          <span className="ui-code-filename">{filename ?? ''}</span>
          <div className="ui-code-header-right">
            {language && <span className="ui-code-lang">{language}</span>}
            {showCopy && (
              <button className="ui-code-copy" onClick={handleCopy} aria-label="Copy code">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            )}
          </div>
        </div>
      )}
      <div
        className="ui-code-body"
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>
    </div>
  )
}
