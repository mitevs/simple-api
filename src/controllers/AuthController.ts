import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { BodyParam, JsonController, Post } from "routing-controllers";
import { toToken } from "../utils/JwtUtils";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("/token")
  async getToken(
    @BodyParam("username") u: string,
    @BodyParam("password") p: string
  ) {
    const user = await this.userService.getUserByUsernameAndPassword(u, p);
    const token = toToken(user);
    return { token };
  }
}
