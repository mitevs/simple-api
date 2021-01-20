import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { Body, JsonController, Post } from "routing-controllers";
import { User } from "./../entities";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    const { id } = await this.userService.createUser(user);
    return { id };
  }
}
