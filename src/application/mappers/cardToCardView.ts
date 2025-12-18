import { Service } from "typedi";
import { Card } from "../../domain/models/Card";
import { CardView } from "../ports/out/card/CardView";
import { LeitnerSchedulingService } from "../../domain/services/LeitnerSchedulingService";

@Service()
export class CardToCardViewMapper {
  constructor(private computeReviewsService: LeitnerSchedulingService) {}
  map(card: Card): CardView {
    return {
      id: card.id,
      question: card.question,
      answer: card.answer,
      category: this.computeReviewsService.getCardCategory(card),
      tag: card.tag,
    };
  }
}
