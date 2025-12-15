export type Card = {
  id: string;
  createdAt: Date;
  question: string;
  answer: string;
  reviews: Review[];
  tag?: string;
};

export type Review = {
  isCorrect: boolean;
  reviewedAt: Date;
};
