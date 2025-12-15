import { Review } from "./Review";

export type Card = {
  id: string;
  createdAt: Date;
  question: string;
  answer: string;
  reviews: Review[];
  tag?: string;
};

