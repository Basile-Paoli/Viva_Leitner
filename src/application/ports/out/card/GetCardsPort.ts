import { Card } from "../../../../domain/models/Card";

export interface GetCardsPort {
  getCards(userId: string, tag?: string): Promise<Card[]>;
}
export const GetCardsPort = "GetCardsPort";
