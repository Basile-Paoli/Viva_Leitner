import { Service } from "typedi";
import { CreateCardPort } from "../../domain/ports/out/CreateCardPort";
import { Card } from "../../domain/models/Card";
import { db } from "./drizzle/db";
import { cardsTable, reviewsTable } from "./drizzle/schema";
import { Review } from "../../domain/models/Review";

@Service(CreateCardPort)
export class CreateCardRepository implements CreateCardPort {
  async createCard(
    userId: string,
    card: Omit<Card, "id">
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

    if (card.reviews.length > 0) {
      await this.createReviewsForCard(insertedCard.id, card.reviews);
    }

    return { id: insertedCard.id.toString() };
  }

  private async createReviewsForCard(cardId: number, reviews: Review[]) {
    db.insert(reviewsTable).values(
      reviews.map((review) => ({
        cardId,
        reviewDate: review.reviewedAt,
        success: review.isCorrect,
      }))
    );
  }
}
