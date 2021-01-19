import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { Body, JsonController, Post } from "routing-controllers";
import { User } from "./../entities";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
