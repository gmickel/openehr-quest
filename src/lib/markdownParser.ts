import YAML from 'yaml';

export interface ParsedQuestion {
  title: string;
  description: string;
  level: number;
  context: {
    introduction: string;
    question: string;
    outro: string;
  };
  answers: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  timeLimit?: number;
  difficulty?: string;
  explanation: string;
  hint: string;
}

function parseFrontMatter(content: string): { frontMatter: any; remainingContent: string } {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = frontMatterRegex.exec(content);

  if (!match) {
    throw new Error('Invalid front matter');
  }

  const [, frontMatterContent, remainingContent] = match;
  const frontMatter = YAML.parse(frontMatterContent);

  return { frontMatter, remainingContent };
}

function parseContent(content: string): Omit<ParsedQuestion, 'title' | 'description' | 'level' | 'correctAnswer' | 'timeLimit' | 'difficulty'> {
  const parsedContent: Omit<ParsedQuestion, 'title' | 'description' | 'level' | 'correctAnswer' | 'timeLimit' | 'difficulty'> = {
    context: {
      introduction: '',
      question: '',
      outro: '',
    },
    answers: [],
    explanation: '',
    hint: '',
  };

  let currentSection = '';
  let currentSubSection = '';
  let buffer = '';

  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (buffer) {
        addToSection(currentSection, currentSubSection, buffer.trim());
        buffer = '';
      }
      currentSection = line.slice(3).toLowerCase();
      currentSubSection = '';
    }
    else if (line.startsWith('### ') && currentSection === 'context') {
      if (buffer) {
        addToSection(currentSection, currentSubSection, buffer.trim());
        buffer = '';
      }
      currentSubSection = line.slice(4).toLowerCase();
    }
    else {
      buffer += `${line}\n`;
    }
  }

  if (buffer) {
    addToSection(currentSection, currentSubSection, buffer.trim());
  }

  function addToSection(section: string, subSection: string, content: string) {
    switch (section) {
      case 'context':
        if (subSection in parsedContent.context) {
          parsedContent.context[subSection as keyof typeof parsedContent.context] += content;
        }
        break;
      case 'answers':
        parsedContent.answers = content.split('\n- ').filter(Boolean).map((answer, index) => {
          // Remove list markers from the first answer
          return index === 0 ? answer.replace(/^[-*]\s*/, '').trim() : answer.trim();
        });
        break;
      case 'explanation':
        parsedContent.explanation += content;
        break;
      case 'hint':
        parsedContent.hint += content;
        break;
    }
  }

  return parsedContent;
}

export function parseQuestionContent(content: string): ParsedQuestion {
  const { frontMatter, remainingContent } = parseFrontMatter(content);

  if (!frontMatter.title || !frontMatter.description || !frontMatter.level) {
    throw new Error('Invalid front matter: missing required fields');
  }

  const parsedContent = parseContent(remainingContent);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    level: frontMatter.level,
    correctAnswer: frontMatter.correctAnswer,
    correctAnswers: frontMatter.correctAnswers,
    timeLimit: frontMatter.timeLimit,
    difficulty: frontMatter.difficulty,
    ...parsedContent,
  };
}

export async function loadAllQuestions(): Promise<ParsedQuestion[]> {
  const questionModules = import.meta.glob('/src/questions/*.md', { query: 'raw', import: 'default' });
  const questions: ParsedQuestion[] = [];

  for (const path in questionModules) {
    try {
      const content = await questionModules[path]() as string;
      const question = parseQuestionContent(content);
      questions.push(question);
    }
    catch (error) {
      console.error(`Error parsing question file ${path}:`, error);
    }
  }

  return questions.sort((a, b) => a.level - b.level);
}
