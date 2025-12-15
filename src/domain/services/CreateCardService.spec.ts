import { describe, expect, test, vitest } from "vitest";
import { CreateCardService } from "./CreateCardService";
import { CreateCardPort } from "../ports/out/CreateCardPort";
import { Card } from "../models/Card";
import { Category } from "../models/Category";

class MockSaveCardPort implements CreateCardPort {
  createCard = vitest.fn(
    async (userId: string, card: Omit<Card, "id" | "reviews">): Promise<{ id: string }> => {
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
