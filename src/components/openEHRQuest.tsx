import React, { useState, useEffect } from 'react';
import { Terminal, Brain, Shield, Zap, VolumeX, Volume2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
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
import ConfettiCelebration from '@/components/ConfettiCelebration';
import { levels as levelsData } from '@/lib/levels';
import CodeHighlight from '@/components/CodeHighlight';

interface GameState {
  currentLevel: number;
  score: number;
  playerHealth: number;
  badges: string[];
  hintUsed: boolean;
  answerSelected: boolean;
  isCorrect: boolean;
}

const OpenEHRQuest: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    playerHealth: 100,
    badges: [],
    hintUsed: false,
    answerSelected: false,
    isCorrect: false,
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playCorrectSound, playWrongSound, playCompletionSound } =
    useSoundEffects();

  const levels = levelsData;

  useEffect(() => {
    if (
      gameState.currentLevel >= levels.length &&
      levels.length > 0 &&
      soundEnabled
    ) {
      playCompletionSound();
    }
  }, [
    gameState.currentLevel,
    levels.length,
    soundEnabled,
    playCompletionSound,
  ]);

  const handleAnswer = (selectedIndex: number) => {
    const currentLevel = levels[gameState.currentLevel];
    const isCorrect = selectedIndex === currentLevel.correctAnswer;

    if (isCorrect) {
      if (soundEnabled) playCorrectSound();
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + (prevState.hintUsed ? 50 : 100),
        answerSelected: true,
        isCorrect: true,
      }));
    } else {
      if (soundEnabled) playWrongSound();
      setGameState((prevState) => ({
        ...prevState,
        playerHealth: Math.max(0, prevState.playerHealth - 20),
        answerSelected: true,
        isCorrect: false,
      }));
    }
  };

  const nextLevel = () => {
    setGameState((prevState) => ({
      ...prevState,
      currentLevel: prevState.currentLevel + 1,
      hintUsed: false,
      answerSelected: false,
      isCorrect: false,
      badges: [
        ...prevState.badges,
        `Level ${prevState.currentLevel + 1} Master`,
      ],
    }));
  };

  const useHint = () => {
    setGameState((prevState) => ({ ...prevState, hintUsed: true }));
  };

  const resetGame = () => {
    setGameState({
      currentLevel: 0,
      score: 0,
      playerHealth: 100,
      badges: [],
      hintUsed: false,
      answerSelected: false,
      isCorrect: false,
    });
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  if (gameState.playerHealth <= 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Game Over</h1>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">
              Your OpenEHR journey has come to an end.
            </p>
            <p className="text-center mb-4">Final Score: {gameState.score}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={resetGame} className="w-full">
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (gameState.currentLevel >= levels.length && levels.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <ConfettiCelebration />
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">
              🎉 Congratulations! 🎉
            </h1>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">
              You've become an OpenEHR Integration Master!
            </p>
            <p className="text-center mb-4">Final Score: {gameState.score}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {gameState.badges.map((badge, index) => (
                <Badge key={index} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={resetGame} className="w-full">
              Play Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentLevel = levels[gameState.currentLevel];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">{currentLevel.title}</h1>
          <Button onClick={toggleSound} variant="ghost" size="icon">
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">
            Level {gameState.currentLevel + 1} of {levels.length}
          </p>
          <Progress
            value={((gameState.currentLevel + 1) / levels.length) * 100}
            className="w-full mb-4"
          />
          <Alert className="my-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Mission Briefing</AlertTitle>
            <AlertDescription>{currentLevel.description}</AlertDescription>
          </Alert>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Challenge:</h2>
            {currentLevel.language !== 'text' ? (
              <CodeHighlight
                code={currentLevel.challenge}
                language={currentLevel.language}
              />
            ) : (
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
                <code>{currentLevel.challenge}</code>
              </pre>
            )}{' '}
          </div>
          <div className="space-y-2">
            {currentLevel.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full justify-start text-left whitespace-normal h-auto"
                variant="outline"
                disabled={gameState.answerSelected}
              >
                {option}
              </Button>
            ))}
          </div>
          {gameState.answerSelected && (
            <Alert
              className={`mt-4 ${
                gameState.isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <AlertTitle>
                {gameState.isCorrect ? 'Correct!' : 'Incorrect'}
              </AlertTitle>
              <AlertDescription>{currentLevel.explanation}</AlertDescription>
            </Alert>
          )}
          {gameState.answerSelected && (
            <Button onClick={nextLevel} className="w-full mt-4">
              Next Level
            </Button>
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
                      <Zap className="mr-2 h-4 w-4" /> Use Hint
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
                {gameState.badges.slice(-3).map((badge, index) => (
                  <Badge key={index} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            {gameState.hintUsed && !gameState.answerSelected && (
              <Alert>
                <AlertTitle>Hint</AlertTitle>
                <AlertDescription>{currentLevel.hint}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex justify-between w-full mb-2">
            <div className="flex items-center">
              <Brain className="mr-2" />
              <span>Score: {gameState.score}</span>
            </div>
            <div className="flex items-center">
              <Shield className="mr-2" />
              <span>Health: {gameState.playerHealth}%</span>
            </div>
          </div>
          <HealthBar health={gameState.playerHealth} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OpenEHRQuest;
