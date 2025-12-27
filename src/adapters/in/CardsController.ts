import { Inject, Service } from "typedi";
import {
  CreateCardDTO,
  ManageCardsUseCase,
} from "../../application/ports/in/ManageCardsUseCase";
import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { CardView } from "../../application/ports/out/card/CardView";

@JsonController("/cards")
@Service()
export class CardsController {
  constructor(
    @Inject(ManageCardsUseCase) private createCardUseCase: ManageCardsUseCase
  ) {}

  @Post("")
  async createCard(
    @Body() body: unknown,
    @CurrentUser() userId: string
  ): Promise<CardView> {
    const createCardDTO = CreateCardDTO.parse(body);
    return this.createCardUseCase.createCard(userId, createCardDTO);
  }

  @Get("")
  async getCards(@CurrentUser() userId: string): Promise<CardView[]> {
    return this.createCardUseCase.getCards(userId);
  }
}
