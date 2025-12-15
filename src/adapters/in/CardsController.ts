import { Inject, Service } from "typedi";
import {
  CreateCardDTO,
  CreateCardUseCase,
} from "../../domain/ports/in/CreateCardUseCase";
import { Body, CurrentUser, HeaderParam, JsonController, Post } from "routing-controllers";
import { Card } from "../../domain/models/Card";

@JsonController("/cards")
@Service()
export class CardsController {
  constructor(
    @Inject(CreateCardUseCase) private createCardUseCase: CreateCardUseCase
  ) {}

  @Post("")
  async createCard(
    @Body() body: unknown,
    @CurrentUser() userId: string
  ): Promise<Card> {
    const createCardDTO = CreateCardDTO.parse(body);
    return this.createCardUseCase.createCard(userId, createCardDTO);
  }
}
