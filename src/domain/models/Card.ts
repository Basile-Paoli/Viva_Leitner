import { Category } from "./Category";
import { Review } from "./Review";

export type Card = {
  id: string;
  createdAt: Date;
  question: string;
  answer: string;
  reviews: Review[];
  tag?: string;
};


export type PublicCard = {
  id: string;
  question: string;
  answer: string;
  category: Category
  tag?: string;
}