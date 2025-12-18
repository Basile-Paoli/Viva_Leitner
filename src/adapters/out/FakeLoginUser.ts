import { Service } from "typedi";
import { LoginUserPort } from "../../application/ports/out/LoginUserPort";

@Service(LoginUserPort)
export class FakeLoginUser implements LoginUserPort {
  async login(
    username: string,
    password: string
  ): Promise<{ userId: string | null }> {
    return { userId: "fake-user-id" };
  }
}
