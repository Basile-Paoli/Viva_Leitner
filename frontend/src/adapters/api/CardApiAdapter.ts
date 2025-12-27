import axios, { AxiosInstance } from 'axios';
import type { CardRepository } from '../../domain/ports/CardRepository';
import type { Card, AnswerResult, CreateCardDTO, SubmitAnswerDTO } from '../../types';

export class CardApiAdapter implements CardRepository {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createCard(card: CreateCardDTO): Promise<Card> {
    const response = await this.api.post<Card>('/cards', card);
    return response.data;
  }

  async getCards(tags?: string[]): Promise<Card[]> {
    const params = tags && tags.length > 0 ? { tags: tags.join(',') } : {};
    const response = await this.api.get<Card[]>('/cards', { params });
    return response.data;
  }

  async getQuizz(): Promise<Card[]> {
    const response = await this.api.get<Card[]>('/cards/quizz');
    return response.data;
  }

  async submitAnswer(cardId: string, answer: SubmitAnswerDTO): Promise<AnswerResult> {
    await this.api.patch(`/cards/${cardId}/answer`, {isValid: answer.isValid});

    return {
      cardId,
      previousCategory: 'FIRST',
      newCategory: answer.isValid ? 'SECOND' : 'FIRST',
      isCorrect: answer.isValid,
      message: answer.isValid ? 'Correct!' : 'Incorrect',
      needsManualConfirmation: false
    };
  }
}
