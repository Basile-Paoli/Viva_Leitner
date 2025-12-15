import { Card } from "../../models/Card";
import { Token } from "typedi";

export interface CreateCardPort {
  createCard(userId: string, card: Omit<Card, "id">): Promise<{ id: string }>;
}
export const CreateCardPort = new Token<CreateCardPort>("CreateCardPort");