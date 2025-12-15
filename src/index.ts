import "reflect-metadata";
import "./adapters"
import {
  createExpressServer,
  Get,
  JsonController,
  useContainer,
} from "routing-controllers";
import Container, { Inject, Service, Token } from "typedi";
import { AuthenticateUserPort } from "./domain/ports/out/AuthenticateUserPort";

function server() {
  useContainer(Container);
  return createExpressServer({
    controllers: [],
  });
}

function main() {
  const app = server();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
