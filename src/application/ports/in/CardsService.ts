import { Inject, Service } from "typedi";
import { CreateCardDTO, ManageCardsUseCase } from "./ManageCardsUseCase";
import { CreateCardPort } from "../out/card/CreateCardPort";
import { Card } from "../../../domain/models/Card";
import { CardView } from "../out/card/CardView";
import { CardToCardViewMapper } from "../../mappers/cardToCardView";
import { GetCardsPort } from "../out/card/GetCardsPort";

@Service(ManageCardsUseCase)
export class CardsService implements ManageCardsUseCase {
  constructor(
    @Inject(CreateCardPort) private saveCardPort: CreateCardPort,
    @Inject(GetCardsPort) private getCardsPort: GetCardsPort,
    private cardToCardViewMapper: CardToCardViewMapper
  ) {}

  getCards(userId: string, tag?: string): Promise<CardView[]> {
    return this.getCardsPort.getCards(userId, tag).then(cards =>
      cards.map(card => this.cardToCardViewMapper.map(card))
    );
  }

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
