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
  correctAnswer: number;
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

function parseContent(content: string): Omit<ParsedQuestion, 'title' | 'description' | 'level'> {
  const parsedContent: Omit<ParsedQuestion, 'title' | 'description' | 'level'> = {
    context: {
      introduction: '',
      question: '',
      outro: '',
    },
    answers: [],
    correctAnswer: 0,
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
        parsedContent.answers = content.split('\n- ').filter(Boolean).map(answer => answer.trim());
        break;
      case 'answer':
        parsedContent.correctAnswer = Number(content) - 1;
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
