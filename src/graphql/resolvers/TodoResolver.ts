import { Service } from "typedi";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { User } from "./../../entities/User";
import { Todo } from "./../../entities/Todo";

@Service()
@Resolver(Todo)
export class TodoResolver {
  @FieldResolver((returns) => User)
  user(@Root() todo: Todo) {
    return todo.user;
  }
}
