export type Category =
  | "FIRST"
  | "SECOND"
  | "THIRD"
  | "FOURTH"
  | "FIFTH"
  | "SIXTH"
  | "SEVENTH"
  | "DONE";

export interface Card {
  id: string;
  question: string;
  answer: string;
  category: Category;
  tag?: string;
}

export interface AnswerResult {
  cardId: string;
  previousCategory: Category;
  newCategory: Category;
  isCorrect: boolean;
  message: string;
  correctAnswer?: string;
  userAnswer?: string;
  needsManualConfirmation?: boolean;
}

export interface CreateCardDTO {
  question: string;
  answer: string;
  tag?: string;
}

export interface SubmitAnswerDTO {
  isValid: boolean;
}
