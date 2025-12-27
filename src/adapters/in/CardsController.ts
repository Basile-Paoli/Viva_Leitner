import { Inject, Service } from "typedi";
import {
  CreateCardDTO,
  ManageCardsUseCase,
} from "../../application/ports/in/ManageCardsUseCase";
import {
  Body,
  BodyParam,
  CurrentUser,
  Get,
  HttpCode,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  QueryParam,
} from "routing-controllers";
import { CardView } from "../../application/ports/out/card/CardView";
import { QuizzUseCase } from "../../application/ports/in/QuizzUseCase";

@JsonController("/cards")
@Service()
export class CardsController {
  constructor(
    @Inject(ManageCardsUseCase) private createCardUseCase: ManageCardsUseCase,
    @Inject(QuizzUseCase) private quizzUseCase: QuizzUseCase
  ) {}

  @Post("")
  @HttpCode(201)
  async createCard(
    @Body() body: unknown,
    @CurrentUser() userId: string
  ): Promise<CardView> {
    const createCardDTO = CreateCardDTO.parse(body);
    return this.createCardUseCase.createCard(userId, createCardDTO);
  }

  @Get("")
  async getCards(
    @CurrentUser() userId: string,
    @QueryParam("tag", { type: String }) tag?: string
  ): Promise<CardView[]> {
    return this.createCardUseCase.getCards(userId, tag);
  }

  @Get("/quizz")
  async getCardsForQuizz(
    @CurrentUser() userId: string,
    @QueryParam("day", { type: Date }) day?: Date
  ): Promise<CardView[]> {
    return this.quizzUseCase.getCardsForQuizz(userId, day);
  }

  @Patch("/:cardId/answer")
  @OnUndefined(204)
  async answerCard(
    @CurrentUser() userId: string,
    @Param("cardId") cardId: string,
    @BodyParam("isValid", { type: Boolean,required: true }) isCorrect: boolean
  ): Promise<void> {
    this.quizzUseCase.answerCard(userId, cardId, isCorrect);
  }
}
