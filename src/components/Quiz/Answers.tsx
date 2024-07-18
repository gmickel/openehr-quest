import React from 'react';
import { Button } from '@/components/ui/button';
import RenderContent from '@/components/RenderContent';
import { cn } from '@/lib/utils';

interface AnswersProps {
  answers: string[];
  onAnswer: (index: number) => void;
  disabled: boolean;
  selectedAnswer: number | null;
  correctAnswer: number;
  answered: boolean;
}

const Answers: React.FC<AnswersProps> = ({
  answers,
  onAnswer,
  disabled,
  selectedAnswer,
  correctAnswer,
  answered,
}) => {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-semibold">Answers</h2>
      {answers.map((answer, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrect = correctAnswer === index;

        let buttonClass = '';
        if (answered) {
          if (isCorrect) {
            buttonClass = 'bg-green-100 hover:bg-green-200 border-green-500';
          }
          else if (isSelected) {
            buttonClass = 'bg-red-100 hover:bg-red-200 border-red-500';
          }
        }

        return (
          <Button
            key={`answer-${index}`}
            onClick={() => onAnswer(index)}
            className={cn(
              'w-full justify-start text-left h-auto',
              buttonClass,
            )}
            variant="outline"
            disabled={disabled}
          >
            <div className="text-sm">
              <RenderContent content={answer} isInline={true} />
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default Answers;
