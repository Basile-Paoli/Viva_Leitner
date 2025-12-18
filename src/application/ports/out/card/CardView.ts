import { Category } from "../../../../domain/models/Category";

export type CardView = {
  id: string;
  question: string;
  answer: string;
  category: Category
  tag?: string;
}