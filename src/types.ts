export type Term = {
  term: string;
  definition: string;
  section?: string;
};

export type QuizQuestion = {
  definition: string;
  options: string[]; // candidate terms
  correctIndex: number;
};
