import { Inject, Service } from "typedi";
import { CreateCardDTO, CreateCardUseCase } from "../ports/in/CreateCardUseCase";
import { SaveCardPort } from "../ports/out/SaveCardPort";
import { Card } from "../models/Card";

@Service(CreateCardUseCase)
export class CreateCardService implements CreateCardUseCase {
  constructor(@Inject(SaveCardPort) private saveCardPort: SaveCardPort) {}
  
  async createCard(userId: string, card: CreateCardDTO): Promise<Card> {
    const cardToCreate: Omit<Card, "id"> = {
      createdAt: new Date(),
      question: card.question,
      answer: card.answer,
      reviews: [],
      tag: card.tag,
    };

    const { id } = await this.saveCardPort.createCard(userId,cardToCreate);

    return {
      id,
      ...cardToCreate,
    };
  }
}
