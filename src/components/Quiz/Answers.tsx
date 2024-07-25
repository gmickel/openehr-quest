import React from 'react';
import { Button } from '@/components/ui/button';
import RenderContent from '@/components/RenderContent';
import { cn } from '@/lib/utils';
import type { ParsedQuestion } from '@/lib/markdownParser';

interface AnswersProps {
  question: ParsedQuestion;
  onAnswer: (index: number) => void;
  disabled: boolean;
  selectedAnswer: number | null;
  answered: boolean;
}

const Answers: React.FC<AnswersProps> = ({
  question,
  onAnswer,
  disabled,
  selectedAnswer,
  answered,
}) => {
  const correctAnswers = question.correctAnswers || [question.correctAnswer];

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-semibold">Answers</h2>
      {question.answers.map((answer, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrect = correctAnswers.includes(index + 1);

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
              'w-full justify-start text-left h-auto whitespace-pre-wrap',
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
