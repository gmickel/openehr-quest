import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface GameOverProps {
  score: number;
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onReset }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Game Over</h1>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">Your OpenEHR journey has come to an end.</p>
        <p className="text-center mb-4">
          Final Score:
          {score}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full">
          Try Again
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default GameOver;
