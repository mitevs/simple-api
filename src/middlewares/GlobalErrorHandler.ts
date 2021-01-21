import { Context, Next } from "koa";
import { Service } from "typedi";
import { KoaMiddlewareInterface, Middleware } from "routing-controllers";
import { handleGlobalError } from "../utils/ErrorUtils";

@Service()
@Middleware({ type: "before" })
export class GlobalErrorHandler implements KoaMiddlewareInterface {
  public async use(context: Context, next: Next) {
    try {
      await next();
    } catch (error) {
      const { status, body } = handleGlobalError(error);
      context.status = status;
      context.body = body;
    }
  }
}
