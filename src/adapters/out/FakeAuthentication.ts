import { AuthenticateUserPort } from "@/core/ports/out/AuthenticateUserPort";
import { Service } from "typedi";

@Service(AuthenticateUserPort)
export class FakeAuthentication implements AuthenticateUserPort {
  async authenticate(
    username: string,
    password: string
  ): Promise<{ userId: string | null }> {
    return { userId: "fake-user-id" };
  }
}
