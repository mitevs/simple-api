import { Service } from "typedi";
import { Query, Resolver, FieldResolver, Root, Ctx } from "type-graphql";
import { Todo } from "./../../entities/Todo";
import { UserService } from "./../../services/UserService";
import { User } from "../../entities";

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User, { nullable: true })
  me(@Ctx() ctx: any) {
    return this.userService.getUser(ctx.user?.id);
  }

  @FieldResolver((returns) => [Todo])
  todos(@Root() user: User) {
    return user.todos;
  }
}
