import { Action } from "routing-controllers";
import { fromToken } from "../utils/JwtUtils";

export const authorizationChecker = async (action: Action, roles: string[]) => {
  const authHeader: string = action.request.headers["authorization"];
  const user = fromToken(authHeader);
  action.request.user = user;
  return !!user;
};
