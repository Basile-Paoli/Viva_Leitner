import { Service } from "typedi";
import { AuthenticateUserPort } from "../../application/ports/out/AuthenticateUserPort";

@Service(AuthenticateUserPort)
export class FakeAuthVerifier implements AuthenticateUserPort {
  async authenticate(authHeader: string): Promise<{ userId: string | null }> {
    return { userId: "fake-user-id" };
  }
}
