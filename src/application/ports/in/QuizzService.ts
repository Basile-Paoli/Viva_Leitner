import { Inject, Service } from "typedi";
import { CardView } from "../out/card/CardView";
import { QuizzUseCase } from "./QuizzUseCase";
import { GetCardsPort } from "../out/card/GetCardsPort";
import { LeitnerSchedulingService } from "../../../domain/services/LeitnerSchedulingService";
import { CardToCardViewMapper } from "../../mappers/cardToCardView";

@Service(QuizzUseCase)
export class QuizzService implements QuizzUseCase {
  constructor(
    @Inject(GetCardsPort) private getCardsPort: GetCardsPort,
    private leitnerService: LeitnerSchedulingService,
    private cardMapper: CardToCardViewMapper
  ) {}
  async getCardsForQuizz(userId: string, day?: Date): Promise<CardView[]> {
    const allCards = await this.getCardsPort.getCards(userId);
    const targetDate = day || new Date();
    const cardsForQuizz = allCards.filter((card) =>
      this.leitnerService.shouldReviewCard(card, targetDate)
    );
    return cardsForQuizz.map((card) => this.cardMapper.map(card));
  }

  answerCard(
    userId: string,
    cardId: string,
    isCorrect: boolean
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
