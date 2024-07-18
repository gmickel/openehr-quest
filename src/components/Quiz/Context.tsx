import React from 'react';
import type { ParsedQuestion } from '@/lib/questionParser';
import type { renderContent as renderContentType } from '@/components/RenderContent';

interface ContextProps {
  question: ParsedQuestion;
  renderContent: typeof renderContentType;
}

const Context: React.FC<ContextProps> = ({ question, renderContent }) => {
  return (
    <div className="space-y-6">
      {question.context.introduction && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Introduction:</h2>
          <div className="text-sm text-muted-foreground">
            {renderContent({ content: question.context.introduction })}
          </div>
        </div>
      )}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Challenge:</h2>
        <div className="text-sm text-muted-foreground">
          {renderContent({ content: question.context.question })}
        </div>
      </div>
      {question.context.outro && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Additional Information:</h2>
          <div className="text-sm text-muted-foreground">
            {renderContent({ content: question.context.outro })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Context;
