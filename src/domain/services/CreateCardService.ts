import { Inject, Service } from "typedi";
import {
  CreateCardDTO,
  CreateCardUseCase,
} from "../ports/in/CreateCardUseCase";
import { CreateCardPort } from "../ports/out/CreateCardPort";
import { Card, PublicCard } from "../models/Card";
import { Category } from "../models/Category";

@Service(CreateCardUseCase)
export class CreateCardService implements CreateCardUseCase {
  constructor(@Inject(CreateCardPort) private saveCardPort: CreateCardPort) {}

  async createCard(userId: string, card: CreateCardDTO): Promise<PublicCard> {
    const cardToCreate: Omit<Card, "id" | "reviews"> = {
      createdAt: new Date(),
      question: card.question,
      answer: card.answer,
      tag: card.tag,
    };

    const { id } = await this.saveCardPort.createCard(userId, cardToCreate);

    return {
      id,
      category: Category.First,
      question: card.question,
      answer: card.answer,
      tag: card.tag,
    };
  }
}
