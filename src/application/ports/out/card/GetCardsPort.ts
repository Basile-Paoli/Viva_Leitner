import { Token } from "typedi";
import { Card } from "../../../../domain/models/Card";

export interface GetCardsPort {
  getCards(userId: string, tag?: string): Promise<Card[]>;
  getCardById(userId: string, cardId: string): Promise<Card | null>;
}
export const GetCardsPort = new Token<GetCardsPort>("GetCardsPort");
