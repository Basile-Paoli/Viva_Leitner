import { Inject, Service } from "typedi";
import {
  CreateCardDTO,
  CreateCardUseCase,
} from "../ports/in/CreateCardUseCase";
import { CreateCardPort } from "../ports/out/CreateCardPort";
import { Card } from "../models/Card";

@Service(CreateCardUseCase)
export class CreateCardService implements CreateCardUseCase {
  constructor(@Inject(CreateCardPort) private saveCardPort: CreateCardPort) {
    console.log("CreateCardService initialized");
  }

  async createCard(userId: string, card: CreateCardDTO): Promise<Card> {
    const cardToCreate: Omit<Card, "id"> = {
      createdAt: new Date(),
      question: card.question,
      answer: card.answer,
      reviews: [],
      tag: card.tag,
    };

    const { id } = await this.saveCardPort.createCard(userId, cardToCreate);

    return {
      id,
      ...cardToCreate,
    };
  }
}
