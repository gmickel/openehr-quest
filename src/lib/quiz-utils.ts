import type { ParsedQuestion } from './markdownParser';

export function isCorrectAnswer(question: ParsedQuestion, selectedIndex: number): boolean {
  if (question.correctAnswer !== undefined) {
    return selectedIndex + 1 === question.correctAnswer;
  }
  if (question.correctAnswers !== undefined) {
    return question.correctAnswers.includes(selectedIndex + 1);
  }
  throw new Error('Question has no correct answer defined');
}
