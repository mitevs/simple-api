import { sign, verify } from "jsonwebtoken";
import { User } from "../entities";

const TOKEN_PREFIX = /^Bearer\s*/i;
const TOKEN_SECRET = "some secret"; // not safe! but ok for testing

export const toToken = (user: User): string => {
  const { id, username } = user;
  return sign({ id, username }, TOKEN_SECRET, { expiresIn: "1d" });
};

export const fromToken = (rawToken: string): Partial<User> | null => {
  if (rawToken) {
    const token = rawToken.replace(TOKEN_PREFIX, "");
    const user = verify(token, TOKEN_SECRET) as Partial<User>;
    return user;
  }

  return null;
};
