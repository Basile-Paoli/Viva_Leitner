import { Token } from "typedi";
import { Card, PublicCard } from "../../models/Card";
import z from "zod";

export const CreateCardDTO = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  tag: z.string().optional(),
});
export type CreateCardDTO = z.infer<typeof CreateCardDTO>;

export interface CreateCardUseCase {
  createCard(userId: string, card: CreateCardDTO): Promise<PublicCard>;
}

export const CreateCardUseCase = new Token<CreateCardUseCase>(
  "CreateCardUseCase"
);
