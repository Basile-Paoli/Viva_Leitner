import { Token } from "typedi";

export interface SaveReviewPort {
  saveReview(
    userId: string,
    cardId: string,
    isCorrect: boolean,
    reviewedAt: Date
  ): Promise<void>;
}

export const SaveReviewPort = new Token<SaveReviewPort>("SaveReviewPort");