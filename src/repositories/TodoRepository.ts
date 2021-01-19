import { Service } from "typedi";
import { Repository, EntityRepository } from "typeorm";
import { Todo } from "./../entities/Todo";

@Service()
@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {}
