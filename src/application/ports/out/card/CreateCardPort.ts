import { Card } from "../../../../domain/models/Card";
import { Token } from "typedi";

export interface CreateCardPort {
  createCard(userId: string, card: Omit<Card, "id" | "reviews">): Promise<{ id: string }>;
}
export const CreateCardPort = new Token<CreateCardPort>("CreateCardPort");