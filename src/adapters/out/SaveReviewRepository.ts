import { Service } from "typedi";
import { SaveReviewPort } from "../../application/ports/out/card/SaveReviewPort";
import { db } from "./drizzle/db";
import { reviewsTable } from "./drizzle/schema";

@Service(SaveReviewPort)
export class SaveReviewRepository implements SaveReviewPort {
    async saveReview(userId: string, cardId: string, isCorrect: boolean, reviewedAt: Date): Promise<void> {
        await db.insert(reviewsTable).values({
            cardId: parseInt(cardId),
            success: isCorrect,
            reviewDate: reviewedAt,
        })
    }
}