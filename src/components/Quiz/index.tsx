import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Brain, Github, Shield, Terminal, Volume2, VolumeX, Zap } from 'lucide-react';
import GameOver from '@/components/Quiz/GameOver';
import Completion from '@/components/Quiz/Completion';
import Context from '@/components/Quiz/Context';
import Answers from '@/components/Quiz/Answers';
import Result from '@/components/Quiz/Result';
import LoadingScreen from '@/components/LoadingScreen';
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
import HealthBar from '@/components/Quiz/HealthBar';
import useSoundEffects from '@/hooks/useSoundEffects';
import type { ParsedQuestion } from '@/lib/markdownParser.ts';
import { loadAllQuestions } from '@/lib/markdownParser.ts';
import { isCorrectAnswer } from '@/lib/quiz-utils';
import { renderContent } from '@/components/RenderContent';
import { config } from '@/config';
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
  const [isAdditionalInformationOpen, setIsAdditionalInformationOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = useMemo(() => questions[gameState.currentLevel], [questions, gameState.currentLevel]);
  const isLastQuestion = gameState.currentLevel === questions.length - 1;

  const handleAnswer = useCallback((selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    const currentQuestion = questions[gameState.currentLevel];
    const isCorrect = isCorrectAnswer(currentQuestion, selectedIndex);
    const isTimedOut = selectedIndex === -1;

    setGameState((prevState) => {
      const incrementScoreBy = prevState.hintUsed ? 50 : 100;
      return {
        ...prevState,
        score: isCorrect ? prevState.score + incrementScoreBy : prevState.score,
        playerHealth: isCorrect ? prevState.playerHealth : Math.max(0, prevState.playerHealth - 20),
        answerSelected: true,
        isCorrect,
        answeredWithoutHint: isCorrect && !prevState.hintUsed,
      };
    });

    if (soundEnabled) {
      if (isCorrect) {
        playCorrectSound();
      }
      else {
        playWrongSound();
      }
    }

    if (isTimedOut) {
      // Handle timed out scenario for both single and multiple correct answers
      if (currentQuestion.correctAnswer !== undefined) {
        setSelectedAnswer(currentQuestion.correctAnswer - 1);
      }
      else if (currentQuestion.correctAnswers !== undefined && currentQuestion.correctAnswers.length > 0) {
        // If multiple correct answers, select the first one
        setSelectedAnswer(currentQuestion.correctAnswers[0] - 1);
      }
      else {
        // Fallback if no correct answer is defined (shouldn't happen, but just in case)
        console.error('No correct answer defined for the current question');
        setSelectedAnswer(null);
      }
    }
  }, [gameState.currentLevel, questions, soundEnabled, playCorrectSound, playWrongSound]);

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

  useEffect(() => {
    if (currentQuestion?.timeLimit && !gameState.answerSelected) {
      setTimeRemaining(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === null || prevTime <= 1) {
            clearInterval(timer);
            handleAnswer(-1); // -1 indicates time's up
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    else {
      setTimeRemaining(null);
    }
  }, [currentQuestion, gameState.answerSelected, handleAnswer]);

  const nextLevel = useCallback(() => {
    setGameState((prevState) => {
      const newBadges = [...prevState.badges];
      if (prevState.isCorrect && prevState.answeredWithoutHint) {
        newBadges.push(`Level ${prevState.currentLevel + 1} Master`);
      }
      const newLevel = prevState.currentLevel + 1;
      if (isLastQuestion) {
        setIsQuizComplete(true);
        return prevState; // Don't update the state if it's the last question
      }
      return {
        ...prevState,
        currentLevel: newLevel,
        hintUsed: false,
        answerSelected: false,
        isCorrect: false,
        answeredWithoutHint: false,
        badges: newBadges,
      };
    });
  }, [questions.length, isLastQuestion]);

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
    setIsQuizComplete(false);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const getBorderDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'border-green-500';
      case 'intermediate':
        return 'border-yellow-500';
      case 'expert':
        return 'border-red-500';
      default:
        return 'border-border';
    }
  };

  const getTextDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'expert':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading questions..." />;
  }

  if (gameState.playerHealth <= 0) {
    return <GameOver score={gameState.score} badges={gameState.badges} onReset={resetGame} />;
  }

  if (isQuizComplete) {
    return <Completion score={gameState.score} badges={gameState.badges} onReset={resetGame} />;
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  const TimerDisplay = ({ timeRemaining }: { timeRemaining: number | null }) => {
    if (timeRemaining === null)
      return null;

    return (
      <div className="flex items-center space-x-2 text-yellow-600">
        <AlertCircle className="h-5 w-5" />
        <span>
          Time remaining:&nbsp;
          {timeRemaining}
          s
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">{currentQuestion.title}</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={toggleSound} variant="ghost" size="icon">
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            {config.github && (
              <a
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4 flex items-center justify-between">
            <span>
              Level
              {' '}
              {gameState.currentLevel + 1}
              {' '}
              of
              {' '}
              {questions.length}
            </span>
            {currentQuestion.difficulty && (
              <span>
                Difficulty:
                {' '}
                <span className={`${getTextDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
              </span>
            )}

          </p>
          <Progress
            value={((gameState.currentLevel + 1) / questions.length) * 100}
            className="w-full mb-4"
          />
          <Alert className={`my-4 ${getBorderDifficultyColor(currentQuestion.difficulty ?? '')}`}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>
              <div className="flex items-center justify-between space-x-1">
                Mission Briefing
                <TimerDisplay timeRemaining={timeRemaining} />
              </div>
            </AlertTitle>
            <AlertDescription>
              {currentQuestion.description}
            </AlertDescription>
          </Alert>
          <Context
            question={currentQuestion}
            renderContent={renderContent}
            isAdditionalInformationOpen={isAdditionalInformationOpen}
            setIsAdditionalInformationOpen={setIsAdditionalInformationOpen}
          />
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl mt-4">
        <CardContent>
          <Answers
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={gameState.answerSelected}
            selectedAnswer={selectedAnswer}
            answered={gameState.answerSelected}
          />
          {gameState.answerSelected && (
            <Result
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              isLastQuestion={isLastQuestion}
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
