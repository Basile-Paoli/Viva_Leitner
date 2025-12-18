import { Inject, Service } from "typedi";
import {
  CreateCardDTO,
  CreateCardUseCase,
} from "./CreateCardUseCase";
import { CreateCardPort } from "../out/card/CreateCardPort";
import { Card } from "../../../domain/models/Card";
import { Category } from "../../../domain/models/Category";
import { CardView } from "../out/card/CardView";

@Service(CreateCardUseCase)
export class CreateCardService implements CreateCardUseCase {
  constructor(@Inject(CreateCardPort) private saveCardPort: CreateCardPort) {}

  async createCard(userId: string, card: CreateCardDTO): Promise<CardView> {
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
