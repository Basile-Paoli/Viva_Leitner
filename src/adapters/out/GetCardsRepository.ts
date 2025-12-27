import { eq } from "drizzle-orm";
import { GetCardsPort } from "../../application/ports/out/card/GetCardsPort";
import { Card } from "../../domain/models/Card";
import { db } from "./drizzle/db";
import { cardsTable, reviewsTable } from "./drizzle/schema";
import { Review } from "../../domain/models/Review";
import { Service } from "typedi";

@Service(GetCardsPort)
export class GetCardsRepository implements GetCardsPort {
  async getCards(userId: string, tag?: string): Promise<Card[]> {
    let query = db
      .select({ cardsTable, reviewsTable })
      .from(cardsTable)
      .leftJoin(reviewsTable, eq(cardsTable.id, reviewsTable.cardId))
      .$dynamic();

    if (tag) {
      query = query.where(eq(cardsTable.tag, tag));
    }

    const cards = await query;

    const cardsMap = cards.reduce<Record<string, Card>>((map, row) => {
      const cardId = row.cardsTable.id;
      if (!map[cardId]) {
        map[cardId] = {
          id: row.cardsTable.id.toString(),
          createdAt: row.cardsTable.createdAt,
          question: row.cardsTable.question,
          answer: row.cardsTable.answer,
          tag: row.cardsTable.tag || undefined,
          reviews: [],
        };
      }
      if (row.reviewsTable) {
        const review: Review = {
          isCorrect: row.reviewsTable.success,
          reviewedAt: row.reviewsTable.reviewDate,
        };
        map[cardId].reviews.push(review);
      }
      return map;
    }, {});

    return Object.values(cardsMap);
  }
}
