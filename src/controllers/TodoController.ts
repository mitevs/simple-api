import { TodoService } from "./../services/TodoService";
import { Service } from "typedi";
import {
  Authorized,
  Body,
  JsonController,
  Post,
  CurrentUser,
} from "routing-controllers";
import { Todo, User } from "./../entities";

@Service()
@Authorized()
@JsonController("/todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@CurrentUser() user: User, @Body() todo: Todo) {
    todo.user = user;
    return this.todoService.createTodo(todo);
  }
}
