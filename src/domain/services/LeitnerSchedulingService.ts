import { Service } from "typedi";
import { Card } from "../models/Card";
import { Category } from "../models/Category";

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

@Service()
export class LeitnerSchedulingService {
  getCardCategory(card: Card): Category {
    const sortedReviews = [...card.reviews].sort(
      (a, b) => a.reviewedAt.getTime() - b.reviewedAt.getTime()
    );
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

}
