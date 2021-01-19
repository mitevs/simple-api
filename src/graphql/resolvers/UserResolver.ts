import { Todo } from "./../../entities/Todo";
import { Service } from "typedi";
import { UserService } from "./../../services/UserService";
import { Arg, Query, Resolver, FieldResolver, Root } from "type-graphql";
import { User } from "../../entities";

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @Query((returns) => User, { nullable: true })
  getUser(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    return this.userService.getUserByUsernameAndPassword(username, password);
  }

  @FieldResolver((returns) => [Todo])
  todos(@Root() user: User) {
    return user.todos;
  }
}
