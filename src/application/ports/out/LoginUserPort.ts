import { Token } from "typedi";

export interface LoginUserPort {
  login(
    username: string,
    password: string
  ): Promise<{ userId: string | null }>;
}
export const LoginUserPort = new Token<LoginUserPort>(
  "AuthenticateUserPort"
);