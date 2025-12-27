import "reflect-metadata";
import { describe, expect, test, vitest } from "vitest";
import { CardsService } from "./CardsService";
import { CreateCardPort } from "../out/card/CreateCardPort";
import { Card } from "../../../domain/models/Card";
import { Category } from "../../../domain/models/Category";
import { CardToCardViewMapper } from "../../mappers/cardToCardView";
import Container from "typedi";

class MockSaveCardPort implements CreateCardPort {
  createCard = vitest.fn(
    async (
      userId: string,
      card: Omit<Card, "id" | "reviews">
    ): Promise<Card> => {
      return {
        id: "mock-card-id",
        question: card.question,
        answer: card.answer,
        tag: card.tag,
        createdAt: card.createdAt,
        reviews: [],
      };
    }
  );
}

describe("CreateCardService", () => {
  test("Created card matches input data", async () => {
    const mockSaveCardPort = new MockSaveCardPort();
    const createCardService = new CardsService(
      mockSaveCardPort,
      Container.get(CardToCardViewMapper)
    );

    const userId = "test-user-id";
    const cardData = {
      question: "What is the capital of France?",
      answer: "Paris",
      tag: "geography",
    };

    const createdCard = await createCardService.createCard(userId, cardData);
    expect(createdCard).toEqual({
      id: "mock-card-id",
      question: cardData.question,
      category: Category.First,
      answer: cardData.answer,
      tag: cardData.tag,
    });

    expect(mockSaveCardPort.createCard).toHaveBeenCalledWith(userId, {
      createdAt: expect.any(Date),
      question: cardData.question,
      answer: cardData.answer,
      tag: cardData.tag,
    });
  });
});
