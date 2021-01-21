import { TodoService } from "./../services/TodoService";
import { Service } from "typedi";
import {
  Authorized,
  Body,
  JsonController,
  Post,
  CurrentUser,
  Patch,
  Delete,
  Param,
} from "routing-controllers";
import { Todo, User } from "./../entities";

@Service()
@Authorized()
@JsonController("/todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() todo: Todo, @CurrentUser() user: User) {
    todo.user = user;
    return this.todoService.createTodo(todo);
  }

  @Patch("/:id")
  async patchTodo(@Param("id") id: number, @Body() todo: Todo) {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete("/:id")
  async deleteTodo(@Param("id") id: number) {
    return this.todoService.deleteTodo(id);
  }
}
