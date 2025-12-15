import { Card } from "domain/models/Card";
import { Token } from "typedi";

export type CreateCardDTO = {
  question: string;
  answer: string;
  tag?: string;
};

export interface CreateCardUseCase {
  createCard(card: CreateCardDTO): Promise<Card>;
}
export const CreateCardUseCase = new Token<CreateCardUseCase>(
  "CreateCardUseCase"
);
