import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ParsedQuestion } from '@/lib/markdownParser';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import type { renderContent as renderContentType } from '@/components/RenderContent';

interface ContextProps {
  question: ParsedQuestion;
  renderContent: typeof renderContentType;
  isAdditionalInformationOpen: boolean;
  setIsAdditionalInformationOpen: (isOpen: boolean) => void;
}

const Context: React.FC<ContextProps> = ({ question, renderContent, isAdditionalInformationOpen, setIsAdditionalInformationOpen }) => {
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
        <Collapsible open={isAdditionalInformationOpen} onOpenChange={setIsAdditionalInformationOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isAdditionalInformationOpen
                ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Hide Additional Information
                    </>
                  )
                : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Show Additional Information
                    </>
                  )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4 mt-4">
              <h2 className="text-lg font-semibold">Additional Information:</h2>
              <div className="text-sm text-muted-foreground">
                {renderContent({ content: question.context.outro })}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default Context;
