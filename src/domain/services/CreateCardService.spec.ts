import { describe, expect, test, vitest } from "vitest";
import { CreateCardService } from "./CreateCardService";
import { SaveCardPort } from "../ports/out/SaveCardPort";
import { Card } from "../models/Card";

class MockSaveCardPort implements SaveCardPort {
  createCard = vitest.fn(
    async (userId: string, card: Omit<Card, "id">): Promise<{ id: string }> => {
      return { id: "mock-card-id" };
    }
  );
}
describe("CreateCardService", () => {
  test("Created card matches input data", async () => {
    const mockSaveCardPort = new MockSaveCardPort();
    const createCardService = new CreateCardService(mockSaveCardPort);

    const userId = "test-user-id";
    const cardData = {
      question: "What is the capital of France?",
      answer: "Paris",
      tag: "geography",
    };

    const createdCard = await createCardService.createCard(userId, cardData);
    expect(createdCard).toEqual({
      id: "mock-card-id",
      createdAt: expect.any(Date),
      question: cardData.question,
      answer: cardData.answer,
      reviews: [],
      tag: cardData.tag,
    });
    expect(createdCard.createdAt.getTime()).toBeCloseTo(
      new Date().getTime(),
      -2
    );

    expect(mockSaveCardPort.createCard).toHaveBeenCalledWith(userId, {
      createdAt: expect.any(Date),
      question: cardData.question,
      answer: cardData.answer,
      reviews: [],
      tag: cardData.tag,
    });
  });
});
