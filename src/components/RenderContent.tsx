import React from 'react';
import { marked } from 'marked';
import CodeHighlight from '@/components/CodeHighlight';

interface RenderContentProps {
  content: string | undefined | null;
  isInline?: boolean;
}

export function renderContent({ content, isInline = false }: RenderContentProps) {
  if (!content)
    return null;

  const tokens = marked.lexer(content);

  return tokens.map((token, index) => {
    if (token.type === 'space') {
      return <br key={`br-${index}`} />;
    }
    if (token.type === 'paragraph') {
      // Handle inline code within paragraphs
      const parts = token.text.split(/(```[^`\n]+```|`[^`\n]+`)/);
      return (
        <p key={`para-${index}`}>
          {parts.map((part: string, i: any) => {
            if (part.startsWith('```') || part.startsWith('`')) {
              // This is inline code
              const code = part.replace(/(^`+)|(`+$)/g, '');
              return (
                <CodeHighlight
                  key={`inline-code-${i}`}
                  code={code}
                  language="text"
                  variant="inline"
                />
              );
            }
            else {
              // This is regular text
              return (
                <span
                  key={`text-${index}-${i}`}
                  dangerouslySetInnerHTML={{ __html: marked.parseInline(part) }}
                />
              );
            }
          })}
        </p>
      );
    }
    else if (token.type === 'code') {
      return (
        <CodeHighlight
          key={`code-${index}`}
          code={token.text}
          language={token.lang || 'text'}
          variant={isInline ? 'inline' : 'block'}
        />
      );
    }
    else {
      // This is regular text
      return (
        <span
          key={`text-other-${index}`}
          dangerouslySetInnerHTML={{ __html: marked.parser([token]) }}
        />
      );
    }
  });
}

const RenderContent: React.FC<RenderContentProps> = ({ content, isInline }) => {
  return <>{renderContent({ content, isInline })}</>;
};

export default RenderContent;
