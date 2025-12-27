import { Token } from "typedi";
import { CardView } from "../out/card/CardView";

export interface QuizzUseCase {
  getCardsForQuizz(userId: string, day?: Date): Promise<CardView[]>;
  answerCard(
    userId: string,
    cardId: string,
    isCorrect: boolean
  ): Promise<void>;
}
export const QuizzUseCase = new Token<QuizzUseCase>("QuizzUseCase");
