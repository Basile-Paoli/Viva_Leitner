import { Inject, Service } from "typedi";
import { CardView } from "../out/card/CardView";
import { QuizzUseCase } from "./QuizzUseCase";
import { GetCardsPort } from "../out/card/GetCardsPort";
import { LeitnerSchedulingService } from "../../../domain/services/LeitnerSchedulingService";
import { CardToCardViewMapper } from "../../mappers/cardToCardView";
import { HttpError } from "routing-controllers";
import { SaveReviewPort } from "../out/card/SaveReviewPort";

@Service(QuizzUseCase)
export class QuizzService implements QuizzUseCase {
  constructor(
    @Inject(GetCardsPort) private getCardsPort: GetCardsPort,
    @Inject(SaveReviewPort) private saveReviewPort: SaveReviewPort,
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

  async answerCard(
    userId: string,
    cardId: string,
    isCorrect: boolean
  ): Promise<void> {
    if (!(await this.doesCardExist(userId, cardId))) {
      throw new HttpError(404, "Card not found");
    }

    await this.saveReviewPort.saveReview(userId, cardId, isCorrect, new Date());
  }

  private doesCardExist(userId: string, cardId: string): Promise<boolean> {
    return this.getCardsPort
      .getCardById(userId, cardId)
      .then((card) => card !== null);
  }
}
