import { Token } from "typedi";
import { Card } from "../../models/Card";

export type CreateCardDTO = {
  question: string;
  answer: string;
  tag?: string;
};

export interface CreateCardUseCase {
  createCard(userId: string, card: CreateCardDTO): Promise<Card>;
}
export const CreateCardUseCase = new Token<CreateCardUseCase>(
  "CreateCardUseCase"
);
