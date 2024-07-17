import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeHighlightProps {
  code: string;
  language: string;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code, language }) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      setIsLoading(true);
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark', // You can change this to any theme you prefer
        });
        setHighlightedCode(html);
      }
      catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
      finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, language]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="rounded-md overflow-hidden"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeHighlight;
