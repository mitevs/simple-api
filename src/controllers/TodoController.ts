import { UserService } from "./../services/UserService";
import { TodoService } from "./../services/TodoService";
import { Service } from "typedi";
import { Body, JsonController, Post, Param } from "routing-controllers";
import { Todo } from "./../entities";

@Service()
@JsonController("/todos")
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService
  ) {}

  @Post("/:userId")
  async createTodo(@Param("userId") userId: number, @Body() todo: Todo) {
    todo.user = await this.userService.getUser(userId);
    return this.todoService.createTodo(todo);
  }
}
