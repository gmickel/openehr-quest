import React, { useState } from 'react';
import { Terminal, Brain, Shield, Zap } from 'lucide-react';
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

interface Level {
  title: string;
  description: string;
  challenge: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

interface GameState {
  currentLevel: number;
  score: number;
  playerHealth: number;
  badges: string[];
  hintUsed: boolean;
}

const OpenEHRQuest: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    playerHealth: 100,
    badges: [],
    hintUsed: false,
  });

  const levels: Level[] = [
    {
      title: 'The Template Tavern',
      description:
        'Welcome to The Template Tavern! Your first quest is to decipher a mysterious web template. Choose the correct interpretation to proceed.',
      challenge:
        "You encounter a web template with the following structure:\n\n<composition>\n  <content>\n    <observation archetype_id='openEHR-EHR-OBSERVATION.blood_pressure.v1'>\n      <data>\n        <events xsi:type='POINT_EVENT'>\n          <data>\n            <items id='at0004'>\n              <value xsi:type='DV_QUANTITY'>\n                <magnitude>120</magnitude>\n                <units>mm[Hg]</units>\n              </value>\n            </items>\n          </data>\n        </events>\n      </data>\n    </observation>\n  </content>\n</composition>",
      options: [
        "It's a recipe for a health potion",
        "It's a map to the hidden treasure of OpenEHR",
        "It's a blood pressure measurement of 120 mm[Hg]",
        "It's the secret code to unlock the next dungeon",
      ],
      correctAnswer: 2,
      explanation:
        "This template represents a blood pressure measurement. The 'observation' element with the archetype ID 'openEHR-EHR-OBSERVATION.blood_pressure.v1' indicates it's for blood pressure, and the value 120 mm[Hg] is clearly visible in the structure.",
      hint: 'Look for the archetype ID and the value within the structure.',
    },
    {
      title: 'The Composition Conjurer',
      description:
        "You've made it to the Composition Conjurer's lair! Your task is to craft a composition that will impress the Conjurer.",
      challenge:
        "Create a composition for a patient's body temperature. The archetype ID is 'openEHR-EHR-OBSERVATION.body_temperature.v2'. The temperature is 37.5°C.",
      options: [
        `{
  "composition": {
    "content": [
      {
        "observation": {
          "archetype_id": "openEHR-EHR-OBSERVATION.body_temperature.v2",
          "data": {
            "events": [
              {
                "data": {
                  "items": [
                    {
                      "value": {
                        "magnitude": 37.5,
                        "units": "°C"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  }
}`,
        `{
  "patient": {
    "vitals": {
      "temperature": 37.5,
      "unit": "celsius"
    }
  }
}`,
        `{
  "openEHR": {
    "body_temperature": {
      "value": 37.5,
      "unit": "C"
    }
  }
}`,
        `{
  "composition": {
    "archetype": "openEHR-EHR-OBSERVATION.body_temperature.v2",
    "temperature": "37.5°C"
  }
}`,
      ],
      correctAnswer: 0,
      explanation:
        'The correct composition follows the OpenEHR structure, including the proper archetype ID, and nests the temperature value within the expected data structure.',
      hint: 'Consider the hierarchical structure of OpenEHR compositions and how data is typically represented.',
    },
    {
      title: 'The Integration Inquisitor',
      description:
        'The Integration Inquisitor will test your knowledge of posting compositions to an OpenEHR system.',
      challenge:
        'Which HTTP method and content type should you use when posting a composition to an OpenEHR system?',
      options: [
        'GET request with application/json content type',
        'POST request with application/xml content type',
        'PUT request with text/plain content type',
        'POST request with application/json content type',
      ],
      correctAnswer: 3,
      explanation:
        "When posting a new composition to an OpenEHR system, you typically use a POST request with application/json content type. This allows you to send structured data in a format that's widely supported and easy to work with.",
      hint: 'Think about which HTTP method is typically used for creating new resources.',
    },
    {
      title: 'The AQL Alchemist',
      description:
        'Enter the laboratory of the AQL Alchemist, where queries are brewed to extract the essence of clinical data!',
      challenge:
        "Which AQL query will retrieve all blood pressure measurements for a specific patient with EHR ID 'abc123'?",
      options: [
        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude AS systolic, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude AS diastolic FROM EHR e CONTAINS COMPOSITION c CONTAINS OBSERVATION o[openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE e/ehr_id/value='abc123'",
        "SELECT * FROM EHR WHERE patient_id = 'abc123' AND observation_type = 'blood_pressure'",
        "GET blood_pressure FROM patient WHERE id = 'abc123'",
        "FIND 'blood pressure' IN EHR 'abc123'",
      ],
      correctAnswer: 0,
      explanation:
        'This AQL query correctly navigates the openEHR structure to retrieve systolic and diastolic blood pressure values from the specific archetype, filtering for the given EHR ID.',
      hint: 'AQL uses a structure similar to SQL, but with paths that navigate the openEHR data model.',
    },
    {
      title: 'The Versioning Vault',
      description:
        'Welcome to the Versioning Vault, where the history of health records is preserved through the ages!',
      challenge:
        'When retrieving a specific version of a composition, which of the following is true?',
      options: [
        'You must always retrieve the latest version',
        'You can specify a version number or time to get a specific historical version',
        'Versioning is not supported in OpenEHR',
        'You need to retrieve all versions and manually find the one you want',
      ],
      correctAnswer: 1,
      explanation:
        'OpenEHR supports versioning of compositions. You can retrieve a specific version by specifying either a version number or a timestamp, allowing access to the historical state of a composition at a particular point in time.',
      hint: 'Think about how you might want to access historical data in a medical record system.',
    },
    {
      title: 'The Binding Bard',
      description:
        'The Binding Bard challenges you to understand the intricacies of binding terminologies in OpenEHR!',
      challenge:
        'Which method is used to bind external terminologies to archetype nodes?',
      options: [
        'Direct insertion of codes into archetypes',
        "Using the 'term_bindings' section in archetypes",
        'Creating separate terminology archetypes',
        'Modifying the reference model to include terminologies',
      ],
      correctAnswer: 1,
      explanation:
        "OpenEHR uses the 'term_bindings' section in archetypes to bind external terminologies. This allows for flexible integration of various coding systems while maintaining the archetype structure.",
      hint: 'Think about how OpenEHR maintains separation between its structure and external vocabularies.',
    },
    {
      title: 'The Operational Template Oracle',
      description:
        'The Operational Template Oracle tests your knowledge of OPTs in the OpenEHR ecosystem!',
      challenge:
        'What is the primary purpose of an Operational Template (OPT) in OpenEHR?',
      options: [
        'To replace archetypes in modern OpenEHR implementations',
        'To provide a fully specialized and flattened form of a template for direct use in systems',
        'To create new archetypes based on existing ones',
        'To define the operational procedures in a healthcare setting',
      ],
      correctAnswer: 1,
      explanation:
        "An Operational Template (OPT) in OpenEHR is a fully specialized and flattened form of a template. It's designed for direct use in systems, containing all the necessary information from archetypes and templates in a readily usable format.",
      hint: 'Consider what form of templates would be most immediately usable by EHR systems.',
    },
    {
      title: 'The Composition Composer',
      description:
        'The Composition Composer challenges you to orchestrate the elements of an OpenEHR composition!',
      challenge:
        'Which of the following is NOT typically found at the root level of an OpenEHR composition?',
      options: ['context', 'category', 'content', 'observation'],
      correctAnswer: 3,
      explanation:
        "In an OpenEHR composition, 'observation' is not typically found at the root level. The root level usually includes 'context', 'category', and 'content'. Observations and other clinical entry types are usually nested within the 'content' section.",
      hint: 'Think about the high-level structure of a composition and what elements define its overall properties.',
    },
    {
      title: 'The Constraint Connoisseur',
      description:
        'The Constraint Connoisseur tests your ability to understand and apply constraints in OpenEHR archetypes!',
      challenge:
        'Which of the following is a valid way to constrain a quantity data type in an archetype?',
      options: [
        'Setting a specific value that must be used',
        'Defining a range of allowed values',
        'Specifying a list of allowed units',
        'All of the above',
      ],
      correctAnswer: 3,
      explanation:
        'In OpenEHR archetypes, quantity data types can be constrained in multiple ways. You can set a specific value, define a range of allowed values, or specify a list of allowed units. Often, a combination of these constraints is used to precisely define the acceptable values for a quantity.',
      hint: 'Consider the various ways you might want to limit or specify how a quantity can be recorded in a clinical context.',
    },
    {
      title: 'The Persistence Pilgrim',
      description:
        'The Persistence Pilgrim challenges your understanding of data storage in OpenEHR systems!',
      challenge:
        'Which statement best describes how data is typically stored in an OpenEHR system?',
      options: [
        'Data is stored in relational tables matching the structure of archetypes',
        'Each composition is stored as a single document in a NoSQL database',
        'Data is stored in a node + path + value format, preserving the hierarchical structure',
        'Archetypes themselves store the data values directly',
      ],
      correctAnswer: 2,
      explanation:
        'In many OpenEHR implementations, data is typically stored in a node + path + value format. This approach preserves the hierarchical structure defined by archetypes and templates, while allowing for efficient storage and querying of the data.',
      hint: 'Think about a storage method that would allow for flexible querying while maintaining the structure defined by archetypes.',
    },
  ];

  const handleAnswer = (selectedIndex: number) => {
    const currentLevel = levels[gameState.currentLevel];
    if (selectedIndex === currentLevel.correctAnswer) {
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + (prevState.hintUsed ? 50 : 100),
        currentLevel: prevState.currentLevel + 1,
        hintUsed: false,
        badges: [
          ...prevState.badges,
          `Level ${prevState.currentLevel + 1} Master`,
        ],
      }));
    } else {
      setGameState((prevState) => ({
        ...prevState,
        playerHealth: prevState.playerHealth - 20,
        hintUsed: false,
      }));
    }
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
    });
  };

  if (gameState.playerHealth <= 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-4xl">
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

  if (gameState.currentLevel >= levels.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
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
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            {currentLevel.title}
          </h1>
          <p className="text-center text-gray-600">
            Level {gameState.currentLevel + 1} of {levels.length}
          </p>
        </CardHeader>
        <CardContent>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Mission Briefing</AlertTitle>
            <AlertDescription>{currentLevel.description}</AlertDescription>
          </Alert>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Challenge:</h2>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
              <code>{currentLevel.challenge}</code>
            </pre>
          </div>
          <div className="space-y-2">
            {currentLevel.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full justify-start text-left whitespace-normal h-auto"
                variant="outline"
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={useHint} disabled={gameState.hintUsed}>
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
            {gameState.hintUsed && (
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
          <Progress
            value={((gameState.currentLevel + 1) / levels.length) * 100}
            className="w-full"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OpenEHRQuest;
