import { Service } from "typedi";
import { CreateCardPort } from "../../application/ports/out/card/CreateCardPort";
import { Card } from "../../domain/models/Card";
import { db } from "./drizzle/db";
import { cardsTable, reviewsTable } from "./drizzle/schema";
import { Review } from "../../domain/models/Review";

@Service(CreateCardPort)
export class CreateCardRepository implements CreateCardPort {
  async createCard(
    userId: string,
    card: Omit<Card, "id" | "reviews">
  ): Promise<{ id: string }> {
    const [insertedCard] = await db
      .insert(cardsTable)
      .values({
        question: card.question,
        answer: card.answer,
        tag: card.tag,
        createdAt: card.createdAt,
      })
      .returning({ id: cardsTable.id });

    return { id: insertedCard.id.toString() };
  }
}
