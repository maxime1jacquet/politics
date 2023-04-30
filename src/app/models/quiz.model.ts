export interface Entity<T> {
  [key: string]: T;
}

export interface QuizList {
  categories: Entity<string>;
  data: QuizItem[];
}

export interface QuizItem {
  id: string;
  category: number[];
  title: string;
  imgs: string[];
  visible: boolean;
}

export interface QuizQuestion {
  type: string;
  title: string;
  options: string[];
  responses: string[];
  source: string;
  comment: string;
}
