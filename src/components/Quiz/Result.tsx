import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import RenderContent from '@/components/RenderContent';
import type { ParsedQuestion } from '@/lib/markdownParser';
import { isCorrectAnswer } from '@/lib/quiz-utils';

interface ResultProps {
  question: ParsedQuestion;
  selectedAnswer: number | null;
  isLastQuestion: boolean;
  onNext: () => void;
}

const Result: React.FC<ResultProps> = ({ question, selectedAnswer, isLastQuestion, onNext }) => {
  const isCorrect = selectedAnswer !== null && isCorrectAnswer(question, selectedAnswer);
  const correctAnswers = question.correctAnswers || [question.correctAnswer];

  return (
    <>
      <Alert className={`mt-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
        <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
        <AlertDescription>
          {correctAnswers.length === 1 && (
            <p className="mb-4">
              The correct answer is:
              {' '}
              {correctAnswers.map(a => `Answer ${a}`).join(', ')}
            </p>
          )}

          {correctAnswers.length > 1 && (
            <p className="mb-4">
              The correct answers are:
              {' '}
              {correctAnswers.map(a => `Answer ${a}`).join(', ')}
            </p>
          )}
          {selectedAnswer !== null
            ? (
                ''
              )
            : (
                <p>You didn't select an answer</p>
              )}
          <RenderContent content={question.explanation} />
        </AlertDescription>
      </Alert>
      <Button onClick={onNext} className="w-full mt-4">
        {isLastQuestion ? 'Show Results' : 'Next Level'}
      </Button>
    </>
  );
};

export default Result;
