import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Brain, Shield, Terminal, Volume2, VolumeX, Zap } from 'lucide-react';
import GameOver from './GameOver.tsx';
import Completion from './Completion.tsx';
import Context from './Context.tsx';
import Answers from './Answers.tsx';
import Result from './Result.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import HealthBar from '@/components/HealthBar';
import useSoundEffects from '@/hooks/useSoundEffects';
import type { ParsedQuestion } from '@/lib/questionParser';
import { loadAllQuestions } from '@/lib/questionParser';
import { renderContent } from '@/components/RenderContent';
import './styles.css';

interface GameState {
  currentLevel: number;
  score: number;
  playerHealth: number;
  badges: string[];
  hintUsed: boolean;
  answerSelected: boolean;
  isCorrect: boolean;
  answeredWithoutHint: boolean;
}

const Quiz: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    playerHealth: 100,
    badges: [],
    hintUsed: false,
    answerSelected: false,
    isCorrect: false,
    answeredWithoutHint: false,
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playCorrectSound, playWrongSound, playCompletionSound } = useSoundEffects();
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const loadedQuestions = await loadAllQuestions();
        setQuestions(loadedQuestions);
      }
      catch (error) {
        console.error('Error loading questions:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (
      gameState.currentLevel >= questions.length
      && questions.length > 0
      && soundEnabled
    ) {
      playCompletionSound();
    }
  }, [gameState.currentLevel, questions.length, soundEnabled, playCompletionSound]);

  const handleAnswer = useCallback((selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    const currentQuestion = questions[gameState.currentLevel];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    setGameState((prevState) => {
      const incrementScoreBy = prevState.hintUsed ? 50 : 100;
      return ({
        ...prevState,
        score: isCorrect ? prevState.score + incrementScoreBy : prevState.score,
        playerHealth: isCorrect ? prevState.playerHealth : Math.max(0, prevState.playerHealth - 20),
        answerSelected: true,
        isCorrect,
        answeredWithoutHint: isCorrect && !prevState.hintUsed,
      });
    });

    if (soundEnabled) {
      if (isCorrect) {
        playCorrectSound();
      }
      else {
        playWrongSound();
      }
    }
  }, [gameState.currentLevel, questions, soundEnabled, playCorrectSound, playWrongSound]);

  const nextLevel = useCallback(() => {
    setGameState((prevState) => {
      const newBadges = [...prevState.badges];
      if (prevState.isCorrect && prevState.answeredWithoutHint) {
        newBadges.push(`Level ${prevState.currentLevel + 1} Master`);
      }
      return {
        ...prevState,
        currentLevel: prevState.currentLevel + 1,
        hintUsed: false,
        answerSelected: false,
        isCorrect: false,
        answeredWithoutHint: false,
        badges: newBadges,
      };
    });
  }, []);

  const useHint = useCallback(() => {
    setGameState(prevState => ({ ...prevState, hintUsed: true }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      currentLevel: 0,
      score: 0,
      playerHealth: 100,
      badges: [],
      hintUsed: false,
      answerSelected: false,
      isCorrect: false,
      answeredWithoutHint: false,
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const currentQuestion = useMemo(() => questions[gameState.currentLevel], [questions, gameState.currentLevel]);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (gameState.playerHealth <= 0) {
    return <GameOver score={gameState.score} onReset={resetGame} />;
  }

  if (gameState.currentLevel >= questions.length && questions.length > 0) {
    return <Completion score={gameState.score} badges={gameState.badges} onReset={resetGame} />;
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">{currentQuestion.title}</h1>
          <Button onClick={toggleSound} variant="ghost" size="icon">
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">
            Level
            {' '}
            {gameState.currentLevel + 1}
            {' '}
            of
            {' '}
            {questions.length}
          </p>
          <Progress
            value={((gameState.currentLevel + 1) / questions.length) * 100}
            className="w-full mb-4"
          />
          <Alert className="my-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Mission Briefing</AlertTitle>
            <AlertDescription>{currentQuestion.description}</AlertDescription>
          </Alert>
          <Context question={currentQuestion} renderContent={renderContent} />
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl mt-4">
        <CardContent>
          <Answers
            answers={currentQuestion.answers}
            onAnswer={handleAnswer}
            disabled={gameState.answerSelected}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            answered={gameState.answerSelected}
          />
          {gameState.answerSelected && (
            <Result
              isCorrect={gameState.isCorrect}
              explanation={currentQuestion.explanation}
              onNext={nextLevel}
            />
          )}
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={useHint}
                      disabled={gameState.hintUsed || gameState.answerSelected}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      {' '}
                      Use Hint
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {gameState.hintUsed
                        ? 'Hint already used'
                        : 'Click to reveal a hint (reduces points for this level)'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex gap-2">
                {gameState.badges.slice(-3).map(badge => (
                  <Badge key={`recent-badge-${badge}`} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            {gameState.hintUsed && !gameState.answerSelected && (
              <Alert>
                <AlertTitle>Hint</AlertTitle>
                <AlertDescription>{currentQuestion.hint}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex justify-between w-full mb-2">
            <div className="flex items-center">
              <Brain className="mr-2" />
              <span>
                Score:
                {gameState.score}
              </span>
            </div>
            <div className="flex items-center">
              <Shield className="mr-2" />
              <span>
                Health:
                {gameState.playerHealth}
                %
              </span>
            </div>
          </div>
          <HealthBar health={gameState.playerHealth} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
