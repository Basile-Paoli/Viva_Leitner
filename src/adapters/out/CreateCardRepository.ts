import { Service } from "typedi";
import { CreateCardPort } from "../../application/ports/out/card/CreateCardPort";
import { Card } from "../../domain/models/Card";
import { db } from "./drizzle/db";
import { cardsTable } from "./drizzle/schema";

@Service(CreateCardPort)
export class CreateCardRepository implements CreateCardPort {
  async createCard(
    userId: string,
    card: Omit<Card, "id" | "reviews">
  ): Promise<Card> {
    const [insertedCard] = await db
      .insert(cardsTable)
      .values({
        question: card.question,
        answer: card.answer,
        tag: card.tag,
        createdAt: card.createdAt,
      })
      .returning();

    if (!insertedCard) {
      throw new Error("Failed to insert card");
    }

    return {
      id: insertedCard.id.toString(),
      question: insertedCard.question,
      answer: insertedCard.answer,
      tag: insertedCard.tag ?? undefined,
      createdAt: insertedCard.createdAt,
      reviews: [],
    };
  }
}
