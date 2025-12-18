import { Token } from "typedi";
import z from "zod";
import { CardView } from "../out/card/CardView";

export const CreateCardDTO = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  tag: z.string().optional(),
});
export type CreateCardDTO = z.infer<typeof CreateCardDTO>;

export interface CreateCardUseCase {
  createCard(userId: string, card: CreateCardDTO): Promise<CardView>;
}

export const CreateCardUseCase = new Token<CreateCardUseCase>(
  "CreateCardUseCase"
);
