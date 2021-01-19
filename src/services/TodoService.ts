import { Service } from "typedi";
import { TodoRepository } from "../repositories";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Todo } from "./../entities/Todo";

@Service()
export class TodoService {
  constructor(
    @InjectRepository()
    private readonly todoRepository: TodoRepository
  ) {}

  createTodo(todo: Todo) {
    return this.todoRepository.save(todo);
  }

  getTodos(userId: number) {
    return this.todoRepository.find({ where: { userId } });
  }
}
