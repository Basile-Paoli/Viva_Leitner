import "reflect-metadata";
import "./adapters";
import {
  createExpressServer,
  Get,
  JsonController,
  useContainer,
} from "routing-controllers";
import Container, { Inject, Service, Token } from "typedi";
import { LoginUserPort } from "./domain/ports/out/LoginUserPort";
import { CardsController } from "./adapters/in/CardsController";
import { ErrorHandler } from "./adapters/in/ErrorHandler";

function server() {
  useContainer(Container);
  return createExpressServer({
    controllers: [CardsController],
    middlewares: [ErrorHandler],
    authorizationChecker: function (action, roles) {
      return true; 
    },
    currentUserChecker: async function (action) {
      const authHeader = action.request.headers["authorization"];
      const loginUserPort = Container.get<LoginUserPort>(LoginUserPort);
      const result = await loginUserPort.login("username", "password");
      return { id: result.userId };
    },
    defaultErrorHandler: false,
  });
}

function main() {
  const app = server();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
