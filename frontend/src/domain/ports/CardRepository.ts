import type { Card, AnswerResult, CreateCardDTO, SubmitAnswerDTO } from '../../types';

export interface CardRepository {
  createCard(card: CreateCardDTO): Promise<Card>;
  getCards(tags?: string[]): Promise<Card[]>;
  getQuizz(): Promise<Card[]>;
  submitAnswer(cardId: string, answer: SubmitAnswerDTO): Promise<AnswerResult>;
}
