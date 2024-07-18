import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConfettiCelebration from '@/components/ConfettiCelebration';

interface CompletionProps {
  score: number;
  badges: string[];
  onReset: () => void;
}

const Completion: React.FC<CompletionProps> = ({ score, badges, onReset }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <ConfettiCelebration />
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">🎉 Congratulations! 🎉</h1>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">You've become an OpenEHR Integration Master!</p>
        <p className="text-center mb-4">
          Final Score:&nbsp;
          {score}
        </p>
        <div className="mt-4">
          You've earned the following badges:&nbsp;
          <div className="flex flex-wrap gap-2 mt-4">
            {badges.map(badge => (
              <Badge key={`badge-${badge}`} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full">
          Play Again
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default Completion;
