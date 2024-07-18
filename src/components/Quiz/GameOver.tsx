import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { config } from '@/config';

interface GameOverProps {
  score: number;
  badges: string[];
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onReset, badges }) => {
  const shareResults = () => {
    const badgeText = badges.length === 1 ? 'badge' : 'badges';
    const text = `I just completed the ${config.title} with a score of ${score} and earned ${badges.length} ${badgeText}! Create your own quest here https://github.com/gmickel/codequest or try to beat my score?`;
    const url = config.url;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=CodeQuest`;
    window.open(shareUrl, '_blank');
  };

  return (
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
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={shareResults} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <Share2 className="mr-2 h-4 w-4" />
            {' '}
            Share Results
          </Button>
          <Button onClick={onReset} variant="outline" className="w-full">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOver;
