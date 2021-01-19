import { Expect, Test } from "alsatian";
import { TodoRepository } from "./../src/repositories/TodoRepository";
import { Todo } from "./../src/entities/Todo";
import { TodoService } from "../src/services";

export class TodoServiceTests {
  @Test()
  createTodo() {
    const service = new TodoService({
      save: (todo: Todo) => {
        Expect(todo).toEqual({ text: "test" });
      },
    } as TodoRepository);

    service.createTodo({ text: "test" } as Todo);
  }
}
