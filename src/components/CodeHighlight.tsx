import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeHighlightProps {
  code: string;
  language: string;
  variant?: 'block' | 'inline';
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code, language, variant = 'block' }) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      setIsLoading(true);
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: variant === 'inline' ? 'github-light' : 'night-owl',
        });
        setHighlightedCode(html);
      }
      catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(`<code>${code}</code>`);
      }
      finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, language, variant]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (variant === 'inline') {
    // For inline, we'll strip the pre and code tags and just return the highlighted content

    /*
    const strippedHtml = highlightedCode
      .replace(/<pre.*?>/g, '')
      .replace(/<\/pre>/g, '')
      .replace(/<code.*?>/g, '')
      .replace(/<\/code>/g, '');
    */
    return <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
  }

  return (
    <div
      className="overflow-hidden"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeHighlight;
