import { describe, it, expect } from "vitest";
import { Category } from "../models/Category";
import { Card } from "../models/Card";
import { Review } from "../models/Review";
import { LeitnerSchedulingService } from "./LeitnerSchedulingService";

const createCard = (reviews: Review[]): Card => ({
  id: "1",
  createdAt: new Date(),
  question: "What is 2 + 2?",
  answer: "4",
  reviews,
});

const createReview = (isCorrect: boolean, date: string): Review => ({
  isCorrect,
  reviewedAt: new Date(date),
});

describe("computeCardCategory", () => {
  describe("category mapping", () => {
    it.each([
      [Category.First, 0],
      [Category.Second, 1],
      [Category.Third, 2],
      [Category.Fourth, 3],
      [Category.Fifth, 4],
      [Category.Sixth, 5],
      [Category.Seventh, 6],
      [Category.Done, 7],
    ])(
      "should return %s category when card has %s consecutive correct reviews",
      (expectedCategory, consecutiveCount) => {
        const reviews = Array.from({ length: consecutiveCount }, (_, i) =>
          createReview(true, `2025-01-${String(i + 1).padStart(2, "0")}`)
        );
        const card = createCard(reviews);

        const result = new LeitnerSchedulingService().getCardCategory(card);

        expect(result).toBe(expectedCategory);
      }
    );
  });

  describe("edge cases", () => {
    it("should handle empty reviews array and return First category", () => {
      const card = createCard([]);

      const result = new LeitnerSchedulingService().getCardCategory(card);

      expect(result).toBe(Category.First);
    });

    it("should handle multiple incorrect reviews correctly", () => {
      const card = createCard([
        createReview(false, "2025-01-01"),
        createReview(false, "2025-01-02"),
        createReview(false, "2025-01-03"),
      ]);

      const result = new LeitnerSchedulingService().getCardCategory(card);

      expect(result).toBe(Category.First);
    });
  });

  describe("consecutive count reset", () => {
    it("should reset consecutive count when an incorrect review is encountered", () => {
      const card = createCard([
        createReview(true, "2025-01-01"),
        createReview(true, "2025-01-02"),
        createReview(false, "2025-01-03"),
        createReview(true, "2025-01-04"),
      ]);

      const result = new LeitnerSchedulingService().getCardCategory(card);

      expect(result).toBe(Category.Second);
    });

    it("should count consecutive correct reviews from the most recent review backwards", () => {
      const card = createCard([
        createReview(true, "2025-01-04"),
        createReview(false, "2025-01-03"),
        createReview(true, "2025-01-02"),
        createReview(true, "2025-01-01"),
      ]);

      const result = new LeitnerSchedulingService().getCardCategory(card);

      expect(result).toBe(Category.Second);
    });
  });

  describe("error handling", () => {
    it("should throw error when consecutive correct reviews count exceeds maximum possible", () => {
      const card = createCard([
        createReview(true, "2025-01-01"),
        createReview(true, "2025-01-02"),
        createReview(true, "2025-01-03"),
        createReview(true, "2025-01-04"),
        createReview(true, "2025-01-05"),
        createReview(true, "2025-01-06"),
        createReview(true, "2025-01-07"),
        createReview(true, "2025-01-08"),
      ]);

      expect(() => new LeitnerSchedulingService().getCardCategory(card)).toThrow(
        "Invalid consecutive correct reviews count: 8"
      );
    });
  });
});
