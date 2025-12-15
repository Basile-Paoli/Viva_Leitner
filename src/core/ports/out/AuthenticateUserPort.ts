import { Token } from "typedi";

export interface AuthenticateUserPort {
  authenticate(
    username: string,
    password: string
  ): Promise<{ userId: string | null }>;
}
export const AuthenticateUserPort = new Token<AuthenticateUserPort>(
  "AuthenticateUserPort"
);