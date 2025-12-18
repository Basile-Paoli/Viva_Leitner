import { Inject, Service } from "typedi";
import { CreateCardDTO, CreateCardUseCase } from "./CreateCardUseCase";
import { CreateCardPort } from "../out/card/CreateCardPort";
import { Card } from "../../../domain/models/Card";
import { CardView } from "../out/card/CardView";
import { CardToCardViewMapper } from "../../mappers/cardToCardView";

@Service(CreateCardUseCase)
export class CreateCardService implements CreateCardUseCase {
  constructor(
    @Inject(CreateCardPort) private saveCardPort: CreateCardPort,
    private cardToCardViewMapper: CardToCardViewMapper
  ) {}

  async createCard(userId: string, card: CreateCardDTO): Promise<CardView> {
    const cardToCreate: Omit<Card, "id" | "reviews"> = {
      createdAt: new Date(),
      question: card.question,
      answer: card.answer,
      tag: card.tag,
    };

    const createdCard = await this.saveCardPort.createCard(
      userId,
      cardToCreate
    );

    return this.cardToCardViewMapper.map(createdCard);
  }
}
