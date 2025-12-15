import { Card } from "../../models/Card";
import { Token } from "typedi";

export interface SaveCardPort {
  createCard(userId: string, card: Omit<Card, "id">): Promise<{ id: string }>;
}
export const SaveCardPort = new Token<SaveCardPort>("SaveCardPort");