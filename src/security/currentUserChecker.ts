import { Action } from "routing-controllers";

export const currentUserChecker = async (action: Action) => {
  return action.request.user;
};
