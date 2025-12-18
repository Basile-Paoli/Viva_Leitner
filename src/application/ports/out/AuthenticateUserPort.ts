import { Token } from "typedi";

export interface AuthenticateUserPort {
  authenticate(authHeader: string): Promise<{ userId: string | null }>;
}
export const AuthenticateUserPort = new Token<AuthenticateUserPort>(
  "AuthenticateUserPort"
);
