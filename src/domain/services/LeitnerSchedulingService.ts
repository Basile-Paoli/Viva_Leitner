import { Service } from "typedi";
import { Card } from "../models/Card";
import { Category } from "../models/Category";
import { Review } from "../models/Review";

const CORRECT_REVIEW_COUNT_CATEGORY_MAP: Record<number, Category> = {
  0: Category.First,
  1: Category.Second,
  2: Category.Third,
  3: Category.Fourth,
  4: Category.Fifth,
  5: Category.Sixth,
  6: Category.Seventh,
  7: Category.Done,
};

const CATEGORY_DAYS_INTERVAL_MAP: Record<Category, number> = {
  [Category.First]: 1,
  [Category.Second]: 2,
  [Category.Third]: 4,
  [Category.Fourth]: 8,
  [Category.Fifth]: 16,
  [Category.Sixth]: 32,
  [Category.Seventh]: 64,
  [Category.Done]: 0,
};

@Service()
export class LeitnerSchedulingService {
  getCardCategory(card: Card): Category {
    const sortedReviews = this.getSortedReviews(card);
    const consecutiveCorrectReviews = sortedReviews.reduce((count, review) => {
      if (review.isCorrect) {
        return count + 1;
      } else {
        return 0;
      }
    }, 0);

    const category =
      CORRECT_REVIEW_COUNT_CATEGORY_MAP[consecutiveCorrectReviews];
    if (!category) {
      throw new Error(
        `Invalid consecutive correct reviews count: ${consecutiveCorrectReviews}`
      );
    }
    return category;
  }

  shouldReviewCard(card: Card, onDate: Date): boolean {
    const nextReviewDate = this.getNextReviewDate(card);
    if (!nextReviewDate) {
      return false;
    }
    return nextReviewDate <= onDate;
  }

  private getNextReviewDate(card: Card): Date | null {
    const category = this.getCardCategory(card);
    if (category === Category.Done) {
      return null;
    }
    const intervalDays = CATEGORY_DAYS_INTERVAL_MAP[category];
    const lastReviewDate =
      this.getSortedReviews(card).pop()?.reviewedAt || card.createdAt;
    const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
    return new Date(lastReviewDate.getTime() + intervalMs);
  }

  private getSortedReviews(card: Card): Review[] {
    return [...card.reviews].sort(
      (a, b) => a.reviewedAt.getTime() - b.reviewedAt.getTime()
    );
  }
}
